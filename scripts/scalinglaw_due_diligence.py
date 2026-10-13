#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
「计算最优前沿 / Scaling law」方向的跨领域兜底确认。

这段必须查清楚：前面一度得到 "3DGS × scaling law = 0 篇" 的结论，
但如果 NeRF / 新视图合成方向早就有人做过同样的 iso-compute 前沿拟合，
那就是假白空间。

实现纪律：
- 用 Write 落盘 .py，不用 bash heredoc（吃反斜杠）也不用 python -c（引号被 shell 破坏）；
  实测内联 -c 版本会让 arXiv 忽略检索词，直接返回最新 N 条，表现为"结果全是无关论文"。
- 每个 entry 内部单独解析 id/title，禁止跨 entry 的 <id>...<title> 正则配对（会错位）。
"""
from __future__ import annotations

import re
import time
import urllib.parse
import urllib.request

API = "http://export.arxiv.org/api/query"
UA = "AGS/1.0"

PAIRS = [
    ("neural radiance fields", "scaling law"),
    ("neural radiance fields", "compute budget"),
    ("novel view synthesis", "scaling law"),
    ("novel view synthesis", "compute-optimal"),
    ("gaussian splatting", "pareto frontier"),
    ("gaussian splatting", "scaling"),
    ("implicit neural representation", "scaling law"),
]


def q(a: str, b: str, n: int = 20):
    s = f'all:"{a}" AND all:"{b}"'
    url = (f"{API}?search_query={urllib.parse.quote(s)}&max_results={n}"
           f"&sortBy=relevance")
    for i in range(3):
        try:
            r = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(r, timeout=60) as f:
                x = f.read().decode("utf-8", "ignore")
            out = []
            for m in re.finditer(r"<entry>(.*?)</entry>", x, re.S):
                blk = m.group(1)
                aid = re.search(r"<id>http://arxiv\.org/abs/([^<]+?)</id>", blk)
                ti = re.search(r"<title>(.*?)</title>", blk, re.S)
                if aid and ti:
                    out.append((aid.group(1).strip(),
                                re.sub(r"\s+", " ", ti.group(1)).strip()))
            # 总数（用于判断 0 是真的 0 还是查询被忽略）
            tot = re.search(r"<opensearch:totalResults[^>]*>(\d+)<", x)
            return out, (int(tot.group(1)) if tot else -1)
        except Exception as e:  # noqa: BLE001
            print(f"   retry: {e}")
            time.sleep(8 * (i + 1))
    return [], -1


for a, b in PAIRS:
    res, tot = q(a, b)
    print(f'\n"{a}" AND "{b}"  -> totalResults={tot}, 返回 {len(res)}')
    for aid, ti in res[:8]:
        print(f"   {aid:14s} {ti[:82]}")
    time.sleep(4.0)
