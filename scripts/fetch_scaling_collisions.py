#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""逐个核验「计算最优前沿」方向的潜在撞车论文。"""
from __future__ import annotations

import re
import time
import urllib.request

IDS = [
    "2602.21341",  # Scaling View Synthesis Transformers
    "2406.18533",  # On Scaling Up 3D Gaussian Splatting Training
    "2312.10034",  # SlimmeRF
    "2404.16221",  # NeRF-XL
    "2602.03538",  # Constrained Dynamic Gaussian Splatting
]
UA = "AGS/1.0"
API = "http://export.arxiv.org/api/query?id_list="

for aid in IDS:
    try:
        r = urllib.request.Request(API + aid + "&max_results=1",
                                   headers={"User-Agent": UA})
        with urllib.request.urlopen(r, timeout=60) as f:
            x = f.read().decode("utf-8", "ignore")
        body = x[x.find("<entry>"):]
        t = re.search(r"<title>(.*?)</title>", body, re.S)
        s = re.search(r"<summary>(.*?)</summary>", body, re.S)
        print(f"\n===== {aid}")
        print("T:", re.sub(r"\s+", " ", t.group(1)).strip() if t else "<无>")
        print("S:", re.sub(r"\s+", " ", s.group(1)).strip()[:640] if s else "<无>")
    except Exception as e:  # noqa: BLE001
        print(f"\n===== {aid} ERR {e}")
    time.sleep(3.5)
