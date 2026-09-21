#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把全项目的方法计数 678/700 -> 862，版本 -> v0.9.4。

刻意使用「带上下文的精确模式」，避免误伤 CSS 里的 font-weight:700 / slate-700 等。
历史 changelog 叙述（如 678→692）保持不变。
"""
import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OLD_COUNT, NEW_COUNT = ("678", "700"), "862"
NEW_VER = "0.9.4"

# (相对路径, [(pattern, repl, 期望命中数 or None)])
RULES = [
    # ---- 计数：678+ -> 862+（最安全、最常见的计数写法）
    ("CLAUDE.md", [(r"\b678\+", "862+", None), (r"\b678 methods\b", "862 methods", None)]),
    ("package.json", [(r"\b678\+", "862+", None)]),
    ("README.md", [(r"\b678\+", "862+", None),
                   (r"700\+ methods, 23 Categories", "862+ methods, 23 Categories", None)]),
    ("README_CN.md", [(r"\b678\+", "862+", None),
                      (r"700\+? 方法", "862+ 方法", None),
                      (r"方法-700-", "方法-862-", None),
                      (r"秒搜 700 方法", "秒搜 862 方法", None),
                      (r"700 方法", "862 方法", None)]),
    ("3dgs-methods-overview.md", [(r"\b678\+", "862+", None)]),
    ("docs/anthropic-pr-preparation.md", [(r"\b678\+", "862+", None)]),
    ("docs/app-common.js", [(r"\b678\+", "862+", None)]),
    ("docs/index.html", [(r"\b678\+", "862+", None)]),
    ("docs/methods.html", [(r"\b678\+", "862+", None)]),
    ("docs/skills.html", [(r"\b678\+", "862+", None)]),
    ("docs/studio.html", [(r"\b678\+", "862+", None)]),
    ("promo/github-facelift.md", [(r"\b678\+", "862+", None)]),
    ("promo/hackernews-showhn.md", [(r"\b678\+", "862+", None)]),
    ("promo/reddit-post.md", [(r"\b678\+", "862+", None)]),
    ("promo/wechat-article.md", [(r"\b678\+", "862+", None)]),
    ("references/3dgs-methods-overview.md", [(r"\b678\b(?!\+)", "862", None)]),
    ("references/3dgs-spatial-intelligence-verified-references.md", [(r"\b678\+?", "862+", None)]),
    ("skills/3dgs-engineering-guide/SKILL.md", [(r"\b678\+?", "862+", None)]),
    ("skills/3dgs-experiment-planner/SKILL.md", [(r"\b678\+?", "862+", None)]),
    # ---- 版本号
    ("package.json", [(r'"version":\s*"0\.9\.\d+"', f'"version": "{NEW_VER}"', 1)]),
    ("docs/index.html", [(r"v0\.9\.\d+", f"v{NEW_VER}", None)]),
    ("docs/app-common.js", [(r"v0\.9\.\d+", f"v{NEW_VER}", None)]),
    ("CLAUDE.md", [(r'version:\s*"0\.\d+\.\d+"', f'version: "{NEW_VER}"', 1)]),
]


def main(apply=False):
    total = 0
    for rel, rules in RULES:
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p):
            print(f"  [miss] {rel}")
            continue
        s = io.open(p, encoding="utf-8", newline="").read()
        orig = s
        hits = 0
        for pat, rep, exp in rules:
            s, n = re.subn(pat, rep, s)
            hits += n
            if exp is not None and n != exp:
                print(f"  [warn] {rel}: {pat!r} 命中 {n} != 期望 {exp}")
        if s != orig:
            total += hits
            print(f"  {rel:<56} 替换 {hits} 处")
            if apply:
                bak = p + ".bak"
                if not os.path.exists(bak + ".orig"):
                    with io.open(bak, "wb") as f:
                        f.write(orig.encode("utf-8"))
                with io.open(p, "w", encoding="utf-8", newline="") as f:
                    f.write(s)
    print(f"\n合计 {total} 处" + ("" if apply else "  [DRY-RUN，加 --apply 生效]"))


if __name__ == "__main__":
    main(apply="--apply" in sys.argv)
