#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""核验 references/3dgs-methods-overview.md 中「不在 methods.json」的孤儿条目。

对每条按准确性协议核验：
 1. arXiv ID 是否可达（API 实查）
 2. 方法名是否为论文自述（出现在 title 或 abstract 中）
 3. 是否为伪派生后缀（-v2 / -2 / -ICRA 等）
判定：OK(可补入 json) / TITLE_ONLY(需人工定名) / DEAD(ID 不可达，须删除)
"""
import io
import json
import os
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, "references", "3dgs-methods-overview.md")
JSON = os.path.join(ROOT, "data", "methods.json")
NS = {"a": "http://www.w3.org/2005/Atom"}
UA = {"User-Agent": "awesome-gaussian-skills-verify/1.0"}

ORPHANS = [
    ("GS-CAD", "2410.17249"), ("GaussianWorld-v2", "2503.15835"),
    ("Dynamic 3D Gaussians", "2309.13114"), ("SVG", "2312.05664"),
    ("GS-DIFF", "2605.07203"), ("GPSGaussian-Stereo", "2403.11831"),
    ("GS-LRM-v2", "2405.17351"), ("GaussianCross", "2405.17811"),
    ("GS-LRM-full", "2408.07967"), ("MVSplat-v2", "2412.16028"),
    ("VG2GT", "2606.01573"), ("GauSec", "2501.03714"),
    ("Gaussian-Enhanced Surfel", "2605.25345"), ("GS-PT-v2", "2503.16979"),
    ("HeadsUp", "2605.04035"), ("View-Dependent Splatting Kernels", "2605.25426"),
    ("Gaussian-Enhanced Surfel Rendering with Depth Peeling", "2605.25345"),
    ("Ambient-Robust Inverse Rendering", "2605.30250"),
    ("DENSER", "2606.01419"), ("GGD-SLAM-ICRA", "2604.12837"),
    ("Large Material Gaussian Model (MGM)", "2509.22112"),
]

DERIVED = re.compile(r"[- ](v\d|full|ICRA|stereo)$", re.I)


def norm(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def fetch_meta(ids):
    url = "http://export.arxiv.org/api/query?" + urllib.parse.urlencode(
        {"id_list": ",".join(ids), "max_results": len(ids)})
    for i in range(3):
        try:
            raw = urllib.request.urlopen(
                urllib.request.Request(url, headers=UA), timeout=45).read().decode("utf-8", "ignore")
            break
        except Exception:
            if i == 2:
                return {}
            time.sleep(12)
    out = {}
    try:
        root = ET.fromstring(raw)
    except ET.ParseError:
        return out
    for e in root.findall("a:entry", NS):
        aid = re.sub(r"v\d+$", "", (e.findtext("a:id", "", NS) or "").rsplit("/", 1)[-1])
        out[aid] = {
            "title": re.sub(r"\s+", " ", e.findtext("a:title", "", NS) or "").strip(),
            "abstract": re.sub(r"\s+", " ", e.findtext("a:summary", "", NS) or "").strip(),
            "published": (e.findtext("a:published", "", NS) or "")[:10],
        }
    return out


def main():
    unique_ids = sorted({i for _, i in ORPHANS})
    print(f"核验 {len(ORPHANS)} 条孤儿条目（去重后 {len(unique_ids)} 个 arXiv ID）\n")
    meta = fetch_meta(unique_ids)

    print(f"{'名称':<52} {'ID':<12} {'判定':<12} 论文标题")
    for name, aid in ORPHANS:
        m = meta.get(aid)
        if not m:
            print(f"{name:<52} {aid:<12} {'DEAD':<12} <不可达>")
            continue
        hay = norm(m["title"] + " " + m["abstract"])
        if norm(name) in hay:
            verdict = "OK"
        elif DERIVED.search(name) and norm(DERIVED.sub("", name)) in hay:
            verdict = "DERIVED"
        else:
            verdict = "NAME-MISS"
        print(f"{name:<52} {aid:<12} {verdict:<12} {m['title'][:60]}")


if __name__ == "__main__":
    main()
