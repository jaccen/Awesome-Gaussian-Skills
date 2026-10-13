"""Leftover count-caliber fixes (2026-09-30), same rules as unify_count_caliber.py."""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

EDITS = [
    ("docs/anthropic-pr-preparation.md", "A collection of 16 research-grade AI Agent skills", "A collection of 15 research-grade AI Agent skills", 1),
    ("docs/anthropic-pr-preparation.md", "Review code for 108+ known bug patterns", "Review code for 104 known bug patterns", 1),
    ("docs/anthropic-pr-preparation.md", "108+ static code review patterns", "104 static code review patterns", 1),
    ("README_CN.md", "# 代码审查（108+ bug 模式）", "# 代码审查（104 bug 模式）", 1),
    ("promo/zhihu-post.md", "16 个 AI 工程技能", "15 个 AI 工程技能", 1),
]

cache = {}
def load(rel):
    if rel not in cache:
        with open(ROOT / rel, "r", encoding="utf-8", newline="") as f:
            cache[rel] = f.read()
    return cache[rel]

warn = []
for rel, old, new, expect in EDITS:
    txt = load(rel)
    n = txt.count(old)
    if n == 0:
        warn.append("MISS  %s :: %s" % (rel, old)); continue
    if expect and n != expect:
        warn.append("COUNT %s :: %s found %d expected %d" % (rel, old, n, expect))
    cache[rel] = txt.replace(old, new)

for rel, txt in cache.items():
    with open(ROOT / rel, "w", encoding="utf-8", newline="") as f:
        f.write(txt)

print("files written:", len(cache))
print("warnings:", warn if warn else "none")
