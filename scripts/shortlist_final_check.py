# -*- coding: utf-8 -*-
"""
为「最终候选 idea 短名单」做最后一轮撞车确认。
只查正在考虑列入短名单、但尚未验证过的方向。
"""
from __future__ import annotations

import re
import time
import urllib.parse
import urllib.request

API = "http://export.arxiv.org/api/query"
UA = "AGS/1.0"

GROUPS = {
    "Scaling law / 计算最优（Chinchilla 式移植）": [
        "scaling law", "scaling laws", "compute-optimal", "chinchilla",
        "optimal allocation of compute", "iso-compute",
    ],
    "容量-过拟合规律（2604.16747 的静态场景版）": [
        "overfitting in gaussian splatting", "number of gaussians",
        "capacity scaling", "train-test gap",
    ],
    "测试时算力分配 / 每像素自适应工作量": [
        "test-time compute", "adaptive per-pixel compute", "foveated rendering",
        "error accumulation", "recompute scheduling",
    ],
    "把 3DGS 接进真实引擎管线（逆渲染/延迟）": [
        "game engine", "rendering engine integration", "deferred rendering pipeline",
        "material decomposition real-time",
    ],
}


def q(term, n=15):
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
            print(f"   retry {term}: {e}")
            time.sleep(8 * (i + 1))
    return []


for g, terms in GROUPS.items():
    print(f"\n### {g}")
    agg, zero = {}, []
    for t in terms:
        res = q(t)
        print(f"  {t:38s} {len(res):3d}")
        if not res:
            zero.append(t)
        for a, b in res:
            agg.setdefault(a, b)
        time.sleep(3.5)
    print(f"  --> 去重 {len(agg)}；零命中 {len(zero)}/{len(terms)}")
    for a, b in list(agg.items())[:8]:
        print(f"     {a:14s} {b[:80]}")
