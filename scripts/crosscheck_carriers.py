#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""交叉核对：methods.json / CSV / methods.html / abstracts.js 的名称集合是否完全一致。

注意：不要用 unicode_escape 解码（会把 ³ / é 等非 ASCII 二次编码成 Â³ / Ã©），
只还原反斜杠转义即可。
"""
import csv as _csv
import io
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
Q = chr(34)


def unesc(s):
    return re.sub(r"\\(.)", r"\1", s)


h = io.open(os.path.join(ROOT, "docs", "methods.html"), encoding="utf-8").read()
js = io.open(os.path.join(ROOT, "docs", "abstracts.js"), encoding="utf-8").read()
csvtxt = io.open(os.path.join(ROOT, "3dgs-methods-overview.csv"), encoding="utf-8").read()
ms = {m["name"] for m in json.load(
    io.open(os.path.join(ROOT, "data", "methods.json"), encoding="utf-8"))["methods"]}

pat_h = r"\{\s*name:\s*" + Q + "((?:[^" + Q + r"\\]|\\.)*)" + Q
pat_j = r"^  " + Q + "((?:[^" + Q + r"\\]|\\.)*)" + Q + r":"
names_h = {unesc(n) for n in re.findall(pat_h, h)}
keys_j = {unesc(k) for k in re.findall(pat_j, js, re.M)}
names_c = {r[0] for r in list(_csv.reader(io.StringIO(csvtxt)))[1:]}

print("json %d | csv %d | methods.html %d | abstracts.js %d"
      % (len(ms), len(names_c), len(names_h), len(keys_j)))
ok = True
for tag, other in [("csv", names_c), ("methods.html", names_h), ("abstracts.js", keys_j)]:
    a, b = sorted(other - ms), sorted(ms - other)
    if a or b:
        ok = False
        print("  [!!] %-14s 独有: %s | json 缺失: %s" % (tag, a[:6], b[:6]))
    else:
        print("  [OK] %-14s 名称集合与 json 完全一致" % tag)
print("结论:", "全部一致" if ok else "存在不一致")
