"""Count-caliber unification (2026-09-30).

Canonical facts:
  - skills: 15 public skills under skills/ (16 dirs minus internal _contracts)
  - bug patterns: 104 (max id in references/bug-patterns.md)
  - book chapters: 13

Historical lines (changelog entries, "前次更新", "Previous (") are NOT touched:
all replacements below match only current-state phrasing.
"""
import io, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

EDITS = [
    # ---- ebook (docs/spatial-embodied-intelligence.html) ----
    ("docs/spatial-embodied-intelligence.html", "串联 872+ 方法与 16 个工程技能", "串联 872+ 方法与 15 个工程技能", 1),
    ("docs/spatial-embodied-intelligence.html", "AI_Skills-16-22c55e.svg", "AI_Skills-15-22c55e.svg", 1),
    ("docs/spatial-embodied-intelligence.html", "16 个工程技能 · 34 个 MCP 工具 · 872+ 方法浏览器", "15 个工程技能 · 34 个 MCP 工具 · 872+ 方法浏览器", 2),
    ("docs/spatial-embodied-intelligence.html", "23 类别 / 16 个 AI 技能 / 34 个 MCP 工具", "23 类别 / 15 个 AI 技能 / 34 个 MCP 工具", 1),
    ("docs/spatial-embodied-intelligence.html", "配套仓库（872+ 方法 / 16 技能）", "配套仓库（872+ 方法 / 15 技能）", 1),
    ("docs/spatial-embodied-intelligence.html", "16 个 AI 工程技能", "15 个 AI 工程技能", 1),
    ("docs/spatial-embodied-intelligence.html", "沉淀了 108+ 个已知 bug 模式", "沉淀了 104 个已知 bug 模式", 1),
    ("docs/spatial-embodied-intelligence.html", "108+ bug 模式审查", "104 bug 模式审查", 1),
    ("docs/spatial-embodied-intelligence.html", "（108+ 个已知 bug 模式）", "（104 个已知 bug 模式）", 1),
    ("docs/spatial-embodied-intelligence.html", "记录了 108+ 个静态代码 bug 模式", "记录了 104 个静态代码 bug 模式", 1),
    # ---- ebook verifier pin (swap stale expectation) ----
    ("scripts/verify_ebook.py", "(r'AI_Skills-16', '技能 16')", "(r'AI_Skills-15', '技能 15')", 1),
    ("scripts/verify_ebook.py", "(r'AI_Skills-15', '陈旧技能 15(应为0)')", "(r'AI_Skills-16', '陈旧技能 16(应为0)')", 1),
    # ---- repo metadata ----
    ("CLAUDE.md", "with 108+ known bug patterns", "with 104 known bug patterns", 1),
    ("CLAUDE.md", "Review 3DGS code for 108+ bug patterns", "Review 3DGS code for 104 bug patterns", 1),
    ("CLAUDE.md", "all 16 skills", "all 15 skills", 2),
    ("package.json", "872 methods, 16 skills, MCP Server", "872 methods, 15 skills, MCP Server", 1),
    ("mcp-server/README.md", "872 3DGS methods, 16 skills, 108+ bug patterns.", "872 3DGS methods, 15 skills, 104 bug patterns.", 1),
    # ---- docs site (skill cards) ----
    ("docs/methods.html", "Catch 108+ common 3DGS implementation bugs", "Catch 104 common 3DGS implementation bugs", 1),
    ("docs/methods.html", "捕捉 108+ 常见 3DGS 实现缺陷", "捕捉 104 常见 3DGS 实现缺陷", 1),
    ("docs/skills.html", "Catch 108+ common 3DGS implementation bugs", "Catch 104 common 3DGS implementation bugs", 1),
    ("docs/skills.html", "捕捉 108+ 常见 3DGS 实现缺陷", "捕捉 104 常见 3DGS 实现缺陷", 1),
    # ---- README_CN (current-state only) ----
    ("README_CN.md", "872 方法、23 类别、16 技能", "872 方法、23 类别、15 技能", 1),
    ("README_CN.md", "| 16 个工程技能 · 34 个 MCP 工具 · 872+ 方法浏览器", "| 15 个工程技能 · 34 个 MCP 工具 · 872+ 方法浏览器", 1),
    ("README_CN.md", "摘要和 16 个工程技能", "摘要和 15 个工程技能", 1),
    # ---- skills ----
    ("skills/3dgs-training-debugger/SKILL.md", "the code-reviewer's 108+ static code bugs", "the code-reviewer's 104 static code bugs", 1),
    # ---- promo (launch copy) ----
    ("promo/launch-runbook.md", "872 方法 / 23 分类 / 16 技能 / 34 MCP 工具", "872 方法 / 23 分类 / 15 技能 / 34 MCP 工具", 1),
    ("promo/wechat-article-final.md", "（含 108+ bug 模式与训练排错表）", "（含 104 bug 模式与训练排错表）", 1),
    ("promo/wechat-article-final.md", "872 方法 / 23 分类 / 16 技能 / 34 MCP 工具", "872 方法 / 23 分类 / 15 技能 / 34 MCP 工具", 1),
    ("promo/wechat-launch.md", "（含 108+ bug 模式与训练排错表）", "（含 104 bug 模式与训练排错表）", 1),
    ("promo/zhihu-post.md", "（含 108+ bug 模式与训练排错表）", "（含 104 bug 模式与训练排错表）", 1),
    ("promo/hackernews-showhn.md", "**11 chapters**", "**13 chapters**", 1),
    ("promo/hackernews-showhn.md", "a 108+ bug-pattern debugging table", "a 104 bug-pattern debugging table", 1),
    ("promo/reddit-post.md", "- 11 chapters:", "- 13 chapters:", 1),
    ("promo/reddit-post.md", "a 108+ bug-pattern debugging table", "a 104 bug-pattern debugging table", 1),
    ("promo/x-thread.md", "5/ 11 chapters:", "5/ 13 chapters:", 1),
    ("promo/x-thread.md", "(108+ bug-pattern table)", "(104 bug-pattern table)", 1),
]

# cache file contents (newline='' keeps original LF/CRLF exactly as-is)
cache = {}
def load(rel):
    if rel not in cache:
        with open(ROOT / rel, "r", encoding="utf-8", newline="") as f:
            cache[rel] = f.read()
    return cache[rel]

ok = 0
warn = []
for rel, old, new, expect in EDITS:
    txt = load(rel)
    n = txt.count(old)
    if n == 0:
        warn.append("MISS  %s :: %s" % (rel, old))
        continue
    if expect and n != expect:
        warn.append("COUNT %s :: %s -> found %d expected %d" % (rel, old, n, expect))
    cache[rel] = txt.replace(old, new)
    ok += 1

for rel, txt in cache.items():
    with open(ROOT / rel, "w", encoding="utf-8", newline="") as f:
        f.write(txt)

print("applied edit groups:", ok, "/", len(EDITS))
print("files written:", len(cache))
if warn:
    print("\nWARNINGS:")
    for w in warn:
        print(" ", w)
else:
    print("\nno warnings")
