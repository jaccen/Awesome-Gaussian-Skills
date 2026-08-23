#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
git clean filter: 在 `git add` 时自动剥离 AIGC 水印（文本类文件）。
用法（在仓库根目录执行一次）：
  git config filter.strip-aigc.clean "python scripts/strip-aigc-gitfilter.py clean"
  git config filter.strip-aigc.smudge cat
  git config filter.strip-aigc.required true
配合 .gitattributes:  *.md filter=strip-aigc 等

该脚本从 stdin 读取文件内容，输出剥离水印后的内容到 stdout。
- clean: 剥离 YAML frontmatter 中的 AIGC 块 + 文末 "> AI生成" 标记
- smudge: 原样输出（不注入）
"""
import re
import sys

AIGC_FRONTMATTER_RE = re.compile(
    r"(?ms)^---\r?\nAIGC:.*?^---\r?\n", re.MULTILINE
)
# 兼容无结束 --- 的情况
AIGC_FRONTMATTER_RE2 = re.compile(r"(?ms)^---\r?\nAIGC:.*", re.MULTILINE)
AI_GEN_MARK_RE = re.compile(r"\r?\n>\s*AI\s*生成\s*$")
AI_GEN_MARK_RE2 = re.compile(r">\s*AI\s*生成\s*$")


def clean(data: str) -> str:
    text = data
    text = AIGC_FRONTMATTER_RE.sub("", text, count=1)
    text = AIGC_FRONTMATTER_RE2.sub("", text, count=1)
    text = AI_GEN_MARK_RE.sub("", text)
    text = AI_GEN_MARK_RE2.sub("", text)
    return text


def main() -> int:
    mode = sys.argv[1] if len(sys.argv) > 1 else "clean"
    data = sys.stdin.buffer.read()
    if mode == "smudge":
        sys.stdout.buffer.write(data)
        return 0
    # 尝试 UTF-8，失败则原样输出
    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        sys.stdout.buffer.write(data)
        return 0
    out = clean(text)
    sys.stdout.buffer.write(out.encode("utf-8"))
    return 0


if __name__ == "__main__":
    sys.exit(main())