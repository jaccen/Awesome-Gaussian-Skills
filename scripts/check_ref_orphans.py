#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""对比 references/3dgs-methods-overview.md 与 data/methods.json 的条目集合差异。"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAT = re.compile(
    r"-\s+\*\*([^*]+)\*\*\s*\[arXiv:([0-9]{4}\.[0-9]{4,5})\]\(https?://arxiv\.org/abs/([0-9]{4}\.[0-9]{4,5})\)"
)


def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


with open(os.path.join(ROOT, "data", "methods.json"), encoding="utf-8") as f:
    d = json.load(f)
with open(os.path.join(ROOT, "references", "3dgs-methods-overview.md"), encoding="utf-8") as f:
    text = f.read()

json_names = {norm(m["name"]): m for m in d["methods"]}
ref_items = [(m.group(1).strip(), m.group(2), m.group(3)) for m in PAT.finditer(text)]

in_ref_not_json = []
for name, shown, linked in ref_items:
    if norm(name) not in json_names:
        in_ref_not_json.append((name, shown, linked))

print(f"references 条目总数: {len(ref_items)}   json 条目总数: {len(d['methods'])}")
print(f"\n=== 在 references 中但不在 methods.json ({len(in_ref_not_json)}) ===")
for n, s, l in in_ref_not_json:
    flag = "" if s == l else "  [!!显示≠链接]"
    print(f"  {n:<45} arXiv:{s}{flag}")

# 反查：json 有但 references 没有
ref_keys = {norm(n) for n, _, _ in ref_items}
in_json_not_ref = [m["name"] for m in d["methods"] if norm(m["name"]) not in ref_keys]
print(f"\n=== 在 methods.json 中但不在 references ({len(in_json_not_ref)}) ===")
print("  " + ", ".join(in_json_not_ref[:80]))
if len(in_json_not_ref) > 80:
    print(f"  ... 共 {len(in_json_not_ref)} 条")
