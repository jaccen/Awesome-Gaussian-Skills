# -*- coding: utf-8 -*-
"""合并 HeadsUp 重复：删除补录副本，把原条目正名为论文自述名 HeadsUp。

2605.04035《Large-Scale High-Quality 3D Gaussian Head Reconstruction from Multi-View Captures》
  ECCV 2026，Apple 官方项目页 https://apple.github.io/ml-headsup/ 自述名为 HeadsUp。
"""
import io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSONP = os.path.join(ROOT, "data", "methods.json")
REF = os.path.join(ROOT, "references", "3dgs-methods-overview.md")

apply = "--apply" in sys.argv
d = json.load(io.open(JSONP, encoding="utf-8"))
ms = d["methods"]

dup = [m for m in ms if m["name"] == "HeadsUp" and m.get("sources") == ["references"]]
orig = [m for m in ms if m["name"] == "Large-Scale HQ 3D Gaussian Head"]
print("待删补录副本 Headsup:", len(dup), "| 原条目:", len(orig))
for m in dup:
    ms.remove(m)

for m in orig:
    m["name"] = "HeadsUp"
    m["venue"] = "ECCV 2026"
    m["desc"] = ("UV-parameterized 3D Gaussian representation decoupling primitive count from input "
                 "resolution; trained on 10,000+ subjects for large-scale, feed-forward 3D Gaussian "
                 "head reconstruction from multi-view captures")
    m["code_url"] = "https://apple.github.io/ml-headsup/"
    src = set(m.get("sources") or []) | {"references"}
    src.discard("alias:HeadsUp")
    m["sources"] = sorted(src)
    print("正名 ->", json.dumps(m, ensure_ascii=False))

d["methods"] = ms
d["count"] = len(ms)
d["category_count"] = len({m["category"] for m in ms})

text = io.open(REF, encoding="utf-8", newline="").read()
lines = text.split("\n")
out, dropped, renamed = [], [], 0
for ln in lines:
    if ln.startswith("- **Large-Scale HQ 3D Gaussian Head**"):
        dropped.append(ln[:80]); continue
    if ln.startswith("- **HeadsUp**"):
        ln = ln.replace("(Apple, arXiv 2026)", "(Apple, ECCV 2026)", 1)
        renamed += 1
    out.append(ln)
print("references：删除旧名行 %d，更新 Headsup 行 venue %d" % (len(dropped), renamed))
print("预计 json %d 条 / references %d 条" % (
    len(ms), len([l for l in out if l.startswith("- **")])))
import collections
c = collections.Counter(m.get("arxiv_id") or "" for m in ms if m.get("arxiv_id"))
dups = [k for k, v in c.items() if v > 1]
print("剩余重复 arXiv ID:", dups or "无")

if apply:
    io.open(JSONP + ".bak7", "wb").write(io.open(JSONP, "rb").read())
    io.open(JSONP, "w", encoding="utf-8", newline="").write(
        json.dumps(d, ensure_ascii=False, indent=1))
    io.open(REF + ".bak7", "wb").write(text.encode("utf-8"))
    io.open(REF, "w", encoding="utf-8", newline="").write("\n".join(out))
    print("[APPLIED]")
else:
    print("[DRY-RUN] 加 --apply")
