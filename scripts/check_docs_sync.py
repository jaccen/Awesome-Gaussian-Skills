#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""对比 data/methods.json 与 docs/methods.html / docs/abstracts.js 的条目差异。"""
import io
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_json_names():
    with io.open(os.path.join(ROOT, "data", "methods.json"), encoding="utf-8") as f:
        d = json.load(f)
    return d, [m["name"] for m in d["methods"]]


def html_names():
    s = io.open(os.path.join(ROOT, "docs", "methods.html"), encoding="utf-8").read()
    i = s.find("const METHODS")
    j = s.find("\n];", i)
    body = s[i:j]
    return re.findall(r'\{\s*name:\s*"([^"]*)"', body), i, j, s


def js_names():
    s = io.open(os.path.join(ROOT, "docs", "abstracts.js"), encoding="utf-8").read()
    return re.findall(r'^  "((?:[^"\\]|\\.)*)":\s*\{', s, re.M)


def main():
    d, jn = load_json_names()
    hn, hi, hj, hs = html_names()
    an = js_names()
    sh, sa = set(hn), set(an)

    print(f"methods.json : {len(jn)}")
    print(f"methods.html : {len(hn)}   缺 {len(set(jn) - sh)}")
    print(f"abstracts.js : {len(an)}   缺 {len(set(jn) - sa)}")

    def show(title, names):
        print(f"\n=== {title} ({len(names)}) ===")
        for n in names:
            print("  ", n)

    show("json 有 / html 缺", sorted(set(jn) - sh, key=jn.index))
    show("json 有 / js 缺", sorted(set(jn) - sa, key=jn.index))
    extra_h = sorted(sh - set(jn))
    extra_a = sorted(sa - set(jn))
    if extra_h:
        show("html 有 / json 缺", extra_h)
    if extra_a:
        show("js 有 / json 缺", extra_a)


if __name__ == "__main__":
    main()
