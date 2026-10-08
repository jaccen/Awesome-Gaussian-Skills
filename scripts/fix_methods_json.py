#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Focused fix for data/methods.json only (the other 4 carriers were already
correctly updated by apply_accuracy_fixes.py). Repairs the 4 genuine
name/venue/category/desc mismatches via JSON parse (field-order agnostic),
preserves CRLF, and reconciles category counts with categories.json.
"""
import json

VAST_DESC = ("VastGaussian: high-quality large-scene 3DGS reconstruction and real-time rendering "
             "via progressive partitioning and decoupled appearance modeling")
TH3D_DESC = ("Thermal3D-GS: physics-induced 3D Gaussians for thermal-infrared novel-view synthesis; "
             "models atmospheric transmission and thermal conduction with a temperature-consistency "
             "constraint; introduces TI-NSD benchmark (6,664 thermal frames)")

raw = open("data/methods.json", encoding="utf-8", newline="").read()
data = json.loads(raw)
methods = data["methods"]

fixes = {
    "2402.17427": dict(name="VastGaussian", category="Large-Scale", desc=VAST_DESC),
    "2409.08042": dict(name="Thermal3D-GS", category="Cross-Domain", venue="ECCV 2024", desc=TH3D_DESC),
    "2505.01938": dict(venue="ICML 2025"),
    "2407.14108": dict(venue="WACV 2025"),
}
# entries without arxiv_id are collapsed into "" -> skip; apply only to exact non-empty ids
applied = []
for x in methods:
    aid = x.get("arxiv_id")
    if aid in fixes:
        f = fixes[aid]
        for k, v in f.items():
            x[k] = v
        applied.append((aid, f))

out = json.dumps(data, ensure_ascii=False, indent=2)
out = out.replace("\n", "\r\n")  # restore original CRLF line endings
open("data/methods.json", "w", encoding="utf-8", newline="").write(out)

# ---- reconcile category counts with categories.json ----
cats = json.load(open("data/categories.json", encoding="utf-8"))
counts = {}
for x in methods:
    counts[x.get("category")] = counts.get(x.get("category"), 0) + 1
mism = {k: (counts.get(k), v) for k, v in cats["counts"].items() if counts.get(k) != v}
print("methods.json fixed:", applied)
print("recomputed category counts match categories.json:", not mism)
if mism:
    print("MISMATCH:", mism)
    # patch categories.json to match methods.json
    cats["counts"] = counts
    json.dump(cats, open("data/categories.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("patched categories.json counts")
