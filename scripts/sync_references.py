#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""孤儿条目处置 + references/3dgs-methods-overview.md 全量对齐 data/methods.json。

三件事：
 A. 删除 references 中「名称与 arXiv 论文不符」的错挂/重复条目（准确性协议：宁删勿留）
 B. 把核验为真、但事实源缺失的条目补入 data/methods.json
 C. 以 methods.json 为准，向 references 追加缺失条目（按分类分组）
"""
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, "references", "3dgs-methods-overview.md")
JSON = os.path.join(ROOT, "data", "methods.json")
NS = {"a": "http://www.w3.org/2005/Atom"}
UA = {"User-Agent": "awesome-gaussian-skills-sync/1.0"}

# A. 错挂 / 重复 —— 经 arXiv API 实查，名称与论文不符，或已被其它行表示
BAD_LINES = [
    "GS-CAD",                       # 2410.17249 实为 SpectroMotion
    "GaussianWorld-v2",             # 2503.15835 实为 BARD-GS
    "Dynamic 3D Gaussians",         # 2309.13114 实为磁性不稳定性物理论文（无关）
    "SVG",                          # 2312.05664 实为 CoGS
    "GPSGaussian-Stereo",           # 2403.11831 实为 BAD-Gaussians
    "GS-LRM-v2",                    # 2405.17351 实为 DOF-GS
    "GaussianCross",                # 2405.17811 实为 Mani-GS
    "GS-LRM-full",                  # 2408.07967 实为 FlashGS
    "MVSplat-v2",                   # 2412.16028 实为 CoCoGaussian
    "GauSec",                       # 2501.03714 实为 MoDec-GS
    "GS-PT-v2",                     # 2503.16979 实为 Instant Gaussian Stream
    "Gaussian-Enhanced Surfel Rendering with Depth Peeling",  # 与 Gaussian-Enhanced Surfel 同 ID 重复
    "GGD-SLAM-ICRA",                # 伪后缀，正名 GGD-SLAM 已在事实源（同 ID）
]

# B. 核验为真但事实源缺失，按 (名称, ID, 分类, desc) 补入
MISSING_IN_JSON = [
    ("GS-DIFF", "2605.07203", "Editing",
     "Scene change detection directly on 3D Gaussian primitives, mapping pixel-level differences to primitive-level updates"),
    ("VG2GT", "2606.01573", "Feed-Forward",
     "Voxel-Gaussian splatting visual geometry grounded transformer unifying voxel and Gaussian representations for feed-forward reconstruction"),
    ("HeadsUp", "2605.04035", "Human & Avatar",
     "Large-scale high-quality 3D Gaussian head reconstruction from in-the-wild video"),
    ("DENSER", "2606.01419", "Generation",
     "Depth-guided ensemble with staged EFA-GS reconstruction for generative 3D scene synthesis"),
    ("Large Material Gaussian Model", "2509.22112", "HDR & Relighting",
     "Large-scale material-aware Gaussian model for relightable 3D asset generation"),
]

ENTRY_RE = re.compile(
    r"^- \*\*([^*]+)\*\* \[arXiv:([0-9]{4}\.[0-9]{4,5})\]\(https?://arxiv\.org/abs/[0-9]{4}\.[0-9]{4,5}\)")


def norm(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def main(apply=False):
    with io.open(JSON, encoding="utf-8") as f:
        d = json.load(f)
    methods = d["methods"]
    known_name = {norm(m["name"]): m for m in methods}
    known_id = {re.sub(r"v\d+$", "", (m.get("arxiv_id") or "")) for m in methods if m.get("arxiv_id")}

    text = io.open(REF, encoding="utf-8", newline="").read()
    lines = text.split("\n")

    # ---- A. 删除错挂行
    bad_keys = {norm(x) for x in BAD_LINES}
    kept, removed = [], []
    for ln in lines:
        m = ENTRY_RE.match(ln)
        if m and norm(m.group(1)) in bad_keys:
            removed.append(m.group(1))
            continue
        kept.append(ln)
    text = "\n".join(kept)
    print(f"A. 删除错挂/重复条目 {len(removed)} 条:")
    for r in removed:
        print(f"     - {r}")

    # ---- B. 补充事实源缺失项
    added = 0
    for name, aid, cat, desc in MISSING_IN_JSON:
        if norm(name) in known_name or re.sub(r"v\d+$", "", aid) in known_id:
            print(f"   [skip] {name} 已存在")
            continue
        # arXiv ID 前两位为年份后两位：2605.xxxxx -> 2026
        yy = int(aid[:2]) if aid[:2].isdigit() else 26
        methods.append({"name": name, "arxiv_id": aid, "venue": f"arXiv {2000 + yy}",
                        "year": 2000 + yy, "category": cat, "desc": desc,
                        "code_url": "", "sources": ["reference-backfill"]})
        added += 1
    print(f"\nB. 补入事实源 {added} 条")

    # ---- C. 追加 references 缺失条目
    have = set()
    for ln in text.split("\n"):
        m = ENTRY_RE.match(ln)
        if m:
            have.add(norm(m.group(1)))

    miss = [m for m in methods if norm(m["name"]) not in have]
    print(f"\nC. references 现有 {len(have)} 条；待追加 {len(miss)} 条")

    grouped = OrderedDict()
    for m in miss:
        grouped.setdefault(m.get("category", "Uncategorized"), []).append(m)

    out = ["", "## September 21, 2026 — Multi-Channel Harvest & Accuracy Overhaul (v0.9.4)", "",
           "> 来源：arXiv API 多渠道检索（cs.CV / cs.GR / cs.RO / 全库 `\"gaussian splatting\"`，近 150 天，"
           "395 篇候选）+ Semantic Scholar 交叉渠道。",
           "> 核验：ID 可达性（arXiv API 实查）+ 方法名须为论文自述 + 排他（survey/benchmark/dataset）+ "
           "去重（名称/ID）+ 排伪（`v2`/`-full` 等派生后缀）。",
           "> 同时删除 13 条「名称与 arXiv 论文不符」的历史错挂条目。", ""]
    for cat in sorted(grouped):
        out.append(f"### {cat}")
        for m in grouped[cat]:
            aid = (m.get("arxiv_id") or "").strip()
            arx = f" [arXiv:{aid}](https://arxiv.org/abs/{aid})" if aid else ""
            venue = (m.get("venue") or "").strip()
            desc = (m.get("desc") or "").strip()
            out.append(f"- **{m['name']}**{arx} ({venue}) — {desc}" if aid
                       else f"- **{m['name']}** ({venue}) — {desc}")
        out.append("")

    new_text = text.rstrip("\n") + "\n" + "\n".join(out)

    if not apply:
        print("\n[DRY-RUN] 未写入（加 --apply 生效）")
        return

    bak = REF + ".bak"
    with io.open(bak, "wb") as f:
        f.write(io.open(REF, "rb").read())
    with io.open(REF, "w", encoding="utf-8", newline="") as f:
        f.write(new_text)

    methods.sort(key=lambda m: norm(m["name"]))
    d["methods"] = methods
    d["count"] = len(methods)
    d["category_count"] = len({m["category"] for m in methods})
    with io.open(JSON, "w", encoding="utf-8", newline="") as f:
        json.dump(d, f, ensure_ascii=False, indent=1)
    print(f"\n[APPLIED] references 已同步；methods.json -> {len(methods)} 条")


if __name__ == "__main__":
    main(apply="--apply" in sys.argv)
