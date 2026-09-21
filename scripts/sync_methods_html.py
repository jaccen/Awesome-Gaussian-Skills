#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""以 data/methods.json 为唯一事实源，重建 docs/methods.html 中的 METHODS 数组。

保留策略：
  - 已有条目的 citations / short 沿用原值，新增条目为 0 / name
  - cat/venue/year/desc/arxiv 一律以 json 为准
"""
import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON = os.path.join(ROOT, "data", "methods.json")
HTML = os.path.join(ROOT, "docs", "methods.html")


def js_escape(s):
    return (s or "").replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")


def main(apply=False):
    with io.open(JSON, encoding="utf-8") as f:
        d = json.load(f)
    methods = d["methods"]

    html = io.open(HTML, encoding="utf-8", newline="").read()
    i = html.find("const METHODS")
    j = html.find("\n];", i)
    if i < 0 or j < 0:
        print("[err] 未定位 METHODS 数组")
        return
    body = html[i:j]

    existing = {}
    for m in re.finditer(
        r'\{\s*name:\s*"((?:[^"\\]|\\.)*)"\s*,\s*short:\s*"((?:[^"\\]|\\.)*)"\s*,\s*cat:\s*"([^"]*)"\s*,'
        r'\s*venue:\s*"([^"]*)"\s*,\s*year:\s*(\d{4})\s*,\s*desc:\s*"((?:[^"\\]|\\.)*)"\s*,'
        r'\s*arxiv:\s*"([^"]*)"\s*,\s*citations:\s*(\d+)\s*\}', body):
        nm = m.group(1).replace('\\"', '"').replace("\\\\", "\\")
        existing[nm] = {"short": m.group(2), "citations": int(m.group(8))}
    print(f"现有条目解析: {len(existing)} / 原始 {len(re.findall(r'\{\s*name:', body))}")

    lines = ["const METHODS = ["]
    added = 0
    for m in methods:
        nm = m.get("name", "")
        old = existing.get(nm)
        short = (old or {}).get("short", nm)
        cit = (old or {}).get("citations", 0)
        if old is None:
            short = nm
            added += 1
        lines.append(
            '  {{ name: "{name}", short: "{short}", cat: "{cat}", venue: "{venue}", year: {year}, '
            'desc: "{desc}", arxiv: "{arxiv}" , citations: {cit} }},'.format(
                name=js_escape(nm), short=js_escape(short),
                cat=js_escape(m.get("category", "")), venue=js_escape(m.get("venue", "")),
                year=int(m.get("year") or 0), desc=js_escape(m.get("desc", "")),
                arxiv=js_escape(m.get("arxiv_id", "")), cit=cit))
    lines.append("];")

    new_body = "\n".join(lines)
    new_html = html[:i] + new_body + html[j + 3:]
    print(f"重建 METHODS: {len(methods)} 条（新增 {added}，沿用 {len(methods) - added}）")

    if apply:
        bak = HTML + ".bak"
        with io.open(bak, "wb") as f:
            f.write(html.encode("utf-8"))
        with io.open(HTML, "w", encoding="utf-8", newline="") as f:
            f.write(new_html)
        print(f"[APPLIED] 已写入 {HTML}（备份 {bak}）")
    else:
        print("[DRY-RUN] 未写入（加 --apply 生效）")


if __name__ == "__main__":
    main(apply="--apply" in sys.argv)
