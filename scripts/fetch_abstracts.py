#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
按 arXiv 编号逐个拉取标题 + 摘要（用于撞车判定的精细阅读）。

为什么单独写：批量检索的 ID↔标题正则配对在实践中出现过错位
（2505.13855 曾配到一篇 AI 文本检测论文），故凡是要写进稿件的编号，
一律用 id_list 逐个取回后再人工读一遍。
"""
from __future__ import annotations

import re
import sys
import time
import urllib.request

IDS = [
    "2605.15760",  # Learn2Splat: Extending the Horizon of Learned 3DGS Optimization
    "2511.19202",  # NVGS: Neural Visibility for Occlusion Culling
    "2609.30865",  # Reliability-Regulated Trajectory Optimization (COLMAP-Free 3DGS)
    "2601.17354",  # PocketGS: On-Device Training
    "2508.07372",  # DIP-GS: Deep Image Prior for Sparse View Recovery
    "2605.11489",  # 3DGS^3: Joint Super Sampling and Frame Interpolation
    "2503.01199",  # LiteGS
    "2410.17932",  # VR-Splatting
    "2604.16747",  # Incoherent Deformation (确认词义)
    "2605.06876",  # AdpSplit
]

UA = "Awesome-Gaussian-Skills/1.0 (abstract fetch)"


def fetch(aid: str):
    url = f"http://export.arxiv.org/api/query?id_list={aid}&max_results=1"
    r = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(r, timeout=60) as f:
        x = f.read().decode("utf-8", "ignore")
    body = x[x.find("<entry>"):]
    t = re.search(r"<title>(.*?)</title>", body, re.S)
    s = re.search(r"<summary>(.*?)</summary>", body, re.S)
    return (re.sub(r"\s+", " ", t.group(1)).strip() if t else "<无标题>",
            re.sub(r"\s+", " ", s.group(1)).strip() if s else "<无摘要>")


for i in IDS:
    try:
        t, s = fetch(i)
        print(f"\n===== {i}")
        print(f"T: {t}")
        print(f"S: {s[:700]}")
    except Exception as e:  # noqa: BLE001
        print(f"\n===== {i}  ERR {e}", file=sys.stderr)
    time.sleep(3.5)
