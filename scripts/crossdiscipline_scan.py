#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
跨学科理论移植 · 白空间扫描
------------------------------------------------------------------
本脚本回答一个问题：把某个「其他学科 / 早年提出的理论」移植进 3DGS，
这个方向到底白不白？

两层证据：
  L1 本地 registry：data/methods.json（881 方法）+ .arxiv_cache.json（标题/摘要）
  L2 arXiv 全库：export.arxiv.org 实时检索（registry 只收录 881 条，
     未被收录的工作同样构成撞车，必须查全库才敢下"白"的结论）

用法：
  python scripts/crossdiscipline_scan.py            # 两层都跑
  python scripts/crossdiscipline_scan.py --local    # 只跑本地（离线、快）
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
METHODS = ROOT / "data" / "methods.json"
CACHE = ROOT / ".arxiv_cache.json"

ARXIV_API = "http://export.arxiv.org/api/query"
UA = "Awesome-Gaussian-Skills/1.0 (cross-discipline white-space scan)"

# ---------------------------------------------------------------- 候选方向
# (代号, 名称, 理论出处/年代, 本地关键词[正则], arXiv 检索词组)
DIRECTIONS = [
    ("T1", "次模优化 / 贪婪 1-1/e 保证",
     "Nemhauser 1978；信息增益 logdet 的次模性",
     [r"submodular", r"1-1/e", r"greedy.*guarantee"],
     ["submodular", "submodularity"]),

    ("T2", "率失真理论（Shannon 1948 / R-D 优化）",
     "Shannon 1948；R-D Lagrangian",
     [r"rate-?distortion", r"\bRD\b", r"bit.?allocation"],
     ["rate-distortion", "rate distortion optimization"]),

    ("T3", "压缩感知 / 稀疏恢复",
     "Candès-Romberg-Tao 2006, Donoho 2006",
     [r"compressed sensing", r"compressive sensing", r"sparse recovery",
      r"\bRIP\b", r"incoheren"],
     ["compressed sensing", "compressive sensing", "sparse recovery"]),

    ("T4", "最小描述长度 / 信息瓶颈",
     "Rissanen 1978 MDL；Tishby IB 1999",
     [r"minimum description length", r"\bMDL\b", r"information bottleneck"],
     ["minimum description length", "information bottleneck"]),

    ("T5", "渐进精化 / 可伸缩编码",
     "Shapiro EZW 1993；可伸缩视频编码",
     [r"progressive refinement", r"scalable coding", r"successive refinement",
      r"matryoshka", r"nested"],
     ["progressive refinement", "scalable coding", "matryoshka"]),

    ("T6", "最优控制 / 模型预测控制",
     "Pontryagin 1956；MPC 1970s",
     [r"optimal control", r"model predictive control", r"\bMPC\b",
      r"pontryagin", r"control.?theoretic"],
     ["optimal control", "model predictive control", "Pontryagin"]),

    ("T7", "最优传输",
     "Monge 1781 / Kantorovich 1942；Sinkhorn",
     [r"optimal transport", r"wasserstein", r"sinkhorn"],
     ["optimal transport", "Wasserstein"]),

    ("T8", "主动学习 / 贝叶斯实验设计",
     "Lindley 1956；A/D/E-optimality",
     [r"active learning", r"experimental design", r"next.?best.?view",
      r"\bNBV\b", r"bayesian.*design"],
     ["next best view", "active learning", "experimental design"]),

    ("T9", "Fisher 信息 / 最优实验设计（观测矩阵条件数）",
     "Fisher 1922；E-optimality",
     [r"fisher information", r"observability", r"condition number",
      r"e-?optimality", r"cramer.?rao"],
     ["Fisher information", "observability"]),

    ("R1", "可见性缓冲 / 延迟着色管线",
     "Burns 2005 visibility buffer；deferred shading",
     [r"visibility buffer", r"deferred"],
     ["visibility buffer", "deferred shading"]),

    ("R2", "虚拟纹理 / 流式瓦片",
     "id Software 1998 clipmap；Nanite-like streaming",
     [r"virtual texture", r"clipmap", r"streaming", r"\bLOD\b", r"tile"],
     ["virtual texture", "clipmap streaming"]),

    ("R3", "预计算辐射传输 / 重光照",
     "Sloan et al. SIGGRAPH 2002 PRT",
     [r"precomputed radiance transfer", r"\bPRT\b", r"relight"],
     ["precomputed radiance transfer", "relighting"]),

    ("R4", "辐射缓存 / 路径追踪融合",
     "Krivanek 2005 radiance cache；path guiding",
     [r"radiance cache", r"path tracing", r"path guiding", r"global illumination",
      r"irradiance cache"],
     ["radiance cache", "path tracing", "global illumination"]),

    ("R5", "Mesh shader / GPU 驱动管线",
     "Turing mesh shader 2018；GPU-driven rendering",
     [r"mesh shader", r"gpu.?driven", r"work graph", r"task shader"],
     ["mesh shader", "GPU-driven rendering", "work graphs"]),

    ("R6", "小波 / 频域表示",
     "Haar 1909 / Daubechies 1988",
     [r"wavelet", r"frequency domain", r"fourier"],
     ["wavelet", "frequency domain"]),

    ("R7", "硬件光追（RT core / BVH）",
     "RTX 2018；BVH traversal",
     [r"ray.?trac", r"\bBVH\b", r"rt core"],
     ["ray tracing", "BVH"]),

    ("R8", "时间重投影 / 帧间复用",
     "Nehab 2007；TAA / temporal reprojection",
     [r"temporal reprojection", r"\bTAA\b", r"temporal.*accumulat"],
     ["temporal reprojection", "temporal antialiasing"]),
]


# ---------------------------------------------------------------- 本地扫描
def load_local_corpus():
    """返回 [(id, name, blob)]，blob 是小写的可检索文本。"""
    items = []
    if METHODS.exists():
        data = json.loads(METHODS.read_text(encoding="utf-8"))
        for m in data.get("methods", []):
            blob = " ".join(str(m.get(k, "")) for k in
                            ("name", "desc", "category", "venue"))
            items.append((m.get("arxiv_id", ""), m.get("name", ""),
                          blob.lower()))
    if CACHE.exists():
        cache = json.loads(CACHE.read_text(encoding="utf-8"))
        if isinstance(cache, dict):
            for aid, rec in cache.items():
                if isinstance(rec, dict):
                    blob = " ".join(str(rec.get(k, "")) for k in
                                    ("title", "summary"))
                else:
                    blob = str(rec)
                items.append((aid, "", blob.lower()))
    return items


def local_scan(corpus):
    out = {}
    for code, name, origin, pats, _q in DIRECTIONS:
        hits = []
        seen = set()
        rx = [re.compile(p, re.I) for p in pats]
        for aid, nm, blob in corpus:
            if any(r.search(blob) for r in rx):
                key = nm or aid
                if key in seen:
                    continue
                seen.add(key)
                hits.append(key)
        out[code] = hits
    return out


# ---------------------------------------------------------------- arXiv 全库
def arxiv_search(term: str, max_results: int = 30, retries: int = 3):
    """检索 all:"gaussian splatting" AND all:<term>。返回 [(id, title)]。"""
    q = f'all:"gaussian splatting" AND all:"{term}"'
    url = (f"{ARXIV_API}?search_query={urllib.parse.quote(q)}"
           f"&max_results={max_results}&sortBy=submittedDate&sortOrder=descending")
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                xml = r.read().decode("utf-8", "ignore")
            entries = re.findall(
                r"<entry>.*?<id>http://arxiv\.org/abs/([^<]+?)</id>.*?"
                r"<title>(.*?)</title>", xml, re.S)
            return [(a.strip(), re.sub(r"\s+", " ", b).strip()) for a, b in entries]
        except Exception as e:  # noqa: BLE001
            wait = 8 * (attempt + 1)
            print(f"    [retry {attempt+1}] {term}: {e} -> sleep {wait}s",
                  file=sys.stderr)
            time.sleep(wait)
    return []


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--local", action="store_true", help="只跑本地扫描")
    ap.add_argument("--sleep", type=float, default=4.0, help="arXiv 请求间隔秒")
    args = ap.parse_args()

    print("=" * 78)
    print("L1  本地 registry 扫描 (methods.json + arxiv cache)")
    print("=" * 78)
    corpus = load_local_corpus()
    print(f"可检索条目：{len(corpus)}\n")
    local = local_scan(corpus)
    for code, name, origin, _p, _q in DIRECTIONS:
        h = local[code]
        flag = "空" if not h else ("稀" if len(h) <= 5 else "占")
        print(f"[{code}] {flag:2s} {len(h):4d}  {name}")
        print(f"        理论出处：{origin}")
        if h:
            print(f"        命中样本：{', '.join(h[:6])}")
    print()

    if args.local:
        return

    print("=" * 78)
    print("L2  arXiv 全库检索  all:\"gaussian splatting\" AND all:<term>")
    print("=" * 78)
    report = {}
    for code, name, origin, _p, terms in DIRECTIONS:
        print(f"\n[{code}] {name}")
        agg = {}
        for t in terms:
            res = arxiv_search(t)
            print(f"    {t:34s} -> {len(res):3d} 篇")
            for aid, ti in res:
                agg.setdefault(aid, ti)
            time.sleep(args.sleep)
        report[code] = agg
        print(f"    ---- 去重后 {len(agg)} 篇 ----")
        for i, (aid, ti) in enumerate(list(agg.items())[:8]):
            print(f"      {aid:14s} {ti[:88]}")
        if len(agg) > 8:
            print(f"      ... 另有 {len(agg)-8} 篇")

    out = ROOT / "references" / "_crossdiscipline_scan.json"
    out.write_text(json.dumps(
        {c: {"name": n, "arxiv": report.get(c, {})} for c, n, *_ in DIRECTIONS},
        ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n落盘：{out}")


if __name__ == "__main__":
    main()
