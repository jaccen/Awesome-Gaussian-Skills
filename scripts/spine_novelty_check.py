#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
脊柱方向（把 3DGS 训练建模为受预算约束的最优控制）的精确撞车检索 + 关键编号核验
"""
from __future__ import annotations

import re
import sys
import time
import urllib.parse
import urllib.request

API = "http://export.arxiv.org/api/query"
UA = "Awesome-Gaussian-Skills/1.0 (spine novelty check)"

# (标签, 检索词) —— 全部与 all:"gaussian splatting" 相交
QUERIES = [
    ("训练=控制问题", ["optimal schedule", "schedule optimization", "training schedule",
                   "optimization trajectory", "training dynamics"]),
    ("致密化调度", ["densification schedule", "adaptive densification",
                "densification policy", "pruning schedule"]),
    ("伴随/协态", ["adjoint", "costate", "neural ODE", "continuous-time optimization"]),
    ("预算化训练", ["compute budget", "training budget", "budget constraint",
                "resource allocation", "budgeted training"]),
    ("互相干性/压缩感知", ["mutual coherence", "incoherence", "sensing matrix",
                    "measurement design", "sparse recovery"]),
    ("次模/保证", ["submodular", "approximation guarantee", "1-1/e"]),
    ("GPU 管线", ["mesh shader", "visibility buffer", "temporal reprojection",
               "GPU-driven", "order independent transparency"]),
]

IDS = [
    "2609.30393",  # LiTe-GS  NBV
    "2602.17134",  # B3-Seg   analytic EIG
    "2604.20046",  # Gaussians on a Diet
    "2610.03162",  # Budgeted-GS
    "2604.11685",  # Unfolding 3DGS
    "2606.22525",  # Projection-Volume Fidelity Divergence
    "2506.19415",  # Virtual Memory for 3DGS
    "2408.03538",  # PRTGS
    "2507.19718",  # GSCache
    "2607.25971",  # SplatStream
    "2608.12825",  # LocusGS
    "2610.00822",  # TRACE
    "2603.19234",  # MGS
    "2606.15924",  # TurboGS
]


def q(term, n=20):
    s = f'all:"gaussian splatting" AND all:"{term}"'
    url = (f"{API}?search_query={urllib.parse.quote(s)}&max_results={n}"
           f"&sortBy=submittedDate&sortOrder=descending")
    for i in range(3):
        try:
            r = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(r, timeout=60) as f:
                xml = f.read().decode("utf-8", "ignore")
            return re.findall(r"<id>http://arxiv\.org/abs/([^<]+?)</id>.*?"
                              r"<title>(.*?)</title>", xml, re.S)
        except Exception as e:  # noqa: BLE001
            print(f"   [retry] {term}: {e}", file=sys.stderr)
            time.sleep(10 * (i + 1))
    return []


def by_id(idl):
    url = (f"{API}?id_list={','.join(idl)}&max_results={len(idl)}")
    r = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(r, timeout=90) as f:
        xml = f.read().decode("utf-8", "ignore")
    out = {}
    for m in re.finditer(r"<entry>(.*?)</entry>", xml, re.S):
        blk = m.group(1)
        aid = re.search(r"<id>http://arxiv\.org/abs/([^<]+?)</id>", blk)
        ti = re.search(r"<title>(.*?)</title>", blk, re.S)
        su = re.search(r"<summary>(.*?)</summary>", blk, re.S)
        if aid and ti:
            out[aid.group(1).strip()] = (
                re.sub(r"\s+", " ", ti.group(1)).strip(),
                re.sub(r"\s+", " ", su.group(1)).strip() if su else "")
    return out


print("=" * 76)
print("A. 脊柱方向精确撞车检索")
print("=" * 76)
for label, terms in QUERIES:
    print(f"\n### {label}")
    agg = {}
    for t in terms:
        res = q(t)
        print(f"  {t:32s} {len(res):3d}")
        for a, b in res:
            agg.setdefault(a, re.sub(r"\s+", " ", b).strip())
        time.sleep(3.5)
    print(f"  --> 去重 {len(agg)}")
    for a, b in list(agg.items())[:10]:
        print(f"     {a:14s} {b[:84]}")
    if len(agg) > 10:
        print(f"     ...另 {len(agg)-10}")

print()
print("=" * 76)
print("B. 关键编号核验（标题 + 摘要首段）")
print("=" * 76)
info = by_id(IDS)
for i in IDS:
    t, s = info.get(i, ("<未返回>", ""))
    print(f"\n{i}  {t}")
    print(f"   {s[:400]}")
