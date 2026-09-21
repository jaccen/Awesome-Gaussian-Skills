#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""以 data/methods.json 为唯一事实源，重建 3dgs-methods-overview.csv（701 -> 862）。"""
import csv
import io
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON = os.path.join(ROOT, "data", "methods.json")
CSV = os.path.join(ROOT, "3dgs-methods-overview.csv")

FIELDS = ["method", "arxiv_id", "venue", "year", "category", "core_innovation", "code_url"]


def main(apply=False):
    with io.open(JSON, encoding="utf-8") as f:
        d = json.load(f)
    methods = d["methods"]

    buf = io.StringIO(newline="")
    w = csv.writer(buf, lineterminator="\n")
    w.writerow(FIELDS)
    for m in methods:
        w.writerow([
            m.get("name", ""),
            m.get("arxiv_id", ""),
            m.get("venue", ""),
            m.get("year", ""),
            m.get("category", ""),
            (m.get("desc", "") or "").replace("\n", " "),
            m.get("code_url", ""),
        ])
    new = buf.getvalue()
    old = io.open(CSV, encoding="utf-8", newline="").read()
    print(f"CSV: 旧 {len(old.splitlines()) - 1} 行 -> 新 {len(methods)} 行")

    if not apply:
        print("[DRY-RUN] 未写入（加 --apply 生效）")
        return
    bak = CSV + ".bak"
    with io.open(bak, "wb") as f:
        f.write(old.encode("utf-8"))
    with io.open(CSV, "w", encoding="utf-8", newline="") as f:
        f.write(new)
    print(f"[APPLIED] 已写入 {CSV}（备份 {bak}）")


if __name__ == "__main__":
    main(apply="--apply" in sys.argv)
