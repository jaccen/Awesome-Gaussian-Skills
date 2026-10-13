#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
同义词兜底检索 —— 防止把「已被做烂但换了词」的方向误判为白空间。

只查一个关键词就宣布"白"是危险的：作者可能用同义词。
本脚本对每条主线换用 5~6 个同义/近义写法交叉检索，只有**全部为 0** 才敢判白。

写法注意：本项目已知 bash heredoc 会吃掉反斜杠、内联 python -c 的引号会被
shell 破坏，因此一律用 Write 工具落盘成 .py 再执行。
"""
from __future__ import annotations

import re
import sys
import time
import urllib.parse
import urllib.request

API = "http://export.arxiv.org/api/query"
UA = "Awesome-Gaussian-Skills/1.0 (synonym guard)"

GROUPS = {
    "控制论同义词": ["maximum principle", "Hamiltonian", "bang-bang",
                 "switching time", "control theory", "trajectory optimization"],
    "时间复用同义词": ["temporal reuse", "frame reuse", "temporal coherence",
                  "inter-frame", "reprojection", "temporal upsampling"],
    "GPU 驱动同义词": ["compute shader culling", "indirect draw", "cluster culling",
                  "occlusion culling", "amplification shader", "two-pass occlusion"],
    "预算同义词": ["wall-clock", "GPU-hour", "time budget", "memory budget",
               "peak memory", "under constrained compute"],
    "coreset / 近似保证": ["coreset", "epsilon-approximation", "provable guarantee",
                       "multiplicative guarantee", "sensitivity framework"],
    "稀疏视角恢复同义词": ["underdetermined inverse problem", "ill-posed inverse",
                    "few-shot reconstruction", "sparse-view recovery"],
}

SLEEP = 3.5


def q(term: str, n: int = 15):
    s = f'all:"gaussian splatting" AND all:"{term}"'
    url = (f"{API}?search_query={urllib.parse.quote(s)}&max_results={n}"
           f"&sortBy=submittedDate&sortOrder=descending")
    for i in range(3):
        try:
            r = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(r, timeout=60) as f:
                x = f.read().decode("utf-8", "ignore")
            out = []
            for m in re.finditer(r"<entry>(.*?)</entry>", x, re.S):
                b = m.group(1)
                a = re.search(r"<id>http://arxiv\.org/abs/([^<]+?)</id>", b)
                t = re.search(r"<title>(.*?)</title>", b, re.S)
                if a and t:
                    out.append((a.group(1).strip(),
                                re.sub(r"\s+", " ", t.group(1)).strip()))
            return out
        except Exception as e:  # noqa: BLE001
            print(f"   [retry {i+1}] {term}: {e}", file=sys.stderr)
            time.sleep(8 * (i + 1))
    return []


def main():
    verdict = {}
    for g, terms in GROUPS.items():
        print(f"\n### {g}")
        agg = {}
        zero = []
        for t in terms:
            res = q(t)
            print(f"  {t:34s} {len(res):3d}")
            if not res:
                zero.append(t)
            for a, b in res:
                agg.setdefault(a, b)
            time.sleep(SLEEP)
        print(f"  --> 去重 {len(agg)}；零命中词 {len(zero)}/{len(terms)}")
        verdict[g] = (len(agg), zero)
        for a, b in list(agg.items())[:9]:
            print(f"     {a:14s} {b[:82]}")
        if len(agg) > 9:
            print(f"     ...另 {len(agg)-9}")

    print("\n" + "=" * 70)
    print("白空间裁定（全组零命中才算真白）")
    print("=" * 70)
    for g, (n, zero) in verdict.items():
        tag = "真白" if n == 0 else ("需人工读" if n <= 4 else "已占")
        print(f"  {g:22s} 去重 {n:3d} 篇 -> {tag}")


if __name__ == "__main__":
    main()
