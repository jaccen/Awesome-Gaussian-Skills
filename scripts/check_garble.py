#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
乱码 / 异常字符扫描 —— 检查 Markdown 文档中混入的非预期文字。

背景：本项目多次出现生成文本中混入俄语/日语假名/天城文等片段，
以及 `libcaca gì` 之类的孤立拉丁token，必须交付前扫一遍。

规则：允许出现在中文技术文档里的字符
  - ASCII、拉丁扩展（含 é ü 等）
  - 希腊字母、数学运算符、箭头、上下标、几何/杂项符号（⇒ ≥ ≤ ≈ × · ✓ 🟢 等）
  - CJK 汉字、中文标点、全角字符
其余一律报出。同时用黑名单词表捕捉"合法字符但语义错乱"的残留。

用法：
  python scripts/check_garble.py                 # 扫 references/ 下重点文件
  python scripts/check_garble.py <file> [<file>...]
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

ALLOWED_RANGES = [
    (0x0000, 0x007F),   # ASCII
    (0x00A0, 0x024F),   # Latin-1 / Latin Extended-A/B
    (0x0370, 0x03FF),   # 希腊字母
    (0x0300, 0x036F),   # 组合音标（λ̇ ẋ 等数学记号必需）
    (0x2000, 0x206F),   # 通用标点
    (0x1E00, 0x1EFF),   # Latin Extended Additional（ẋ ẍ 等导数记号）
    (0x1F300, 0x1FAFF), # emoji（🟢🟡🔴 等用于白/占标记）
    (0xFE00, 0xFE0F),   # 变体选择符
    (0x2070, 0x209F),   # 上下标
    (0x2190, 0x21FF),   # 箭头
    (0x2200, 0x22FF),   # 数学运算符
    (0x2500, 0x257F),   # 制表符
    (0x25A0, 0x25FF),   # 几何图形
    (0x2600, 0x27BF),   # 杂项符号与装饰（含 ✓ 🟢 的 BMP 部分）
    (0x3000, 0x303F),   # 中文标点
    (0x3040, 0x30FF),   # 日文平假名/片假名 —— 见 NOTE
    (0x4E00, 0x9FFF),   # CJK 汉字
    (0xFF00, 0xFFEF),   # 全角
]

# NOTE: 日语假名整体放行会让乱码漏网；实际项目几乎不写假名，
# 故在 allow() 里对 0x3040-0x30FF 单独要求"整 token 为假名且行内含日文语境"太复杂。
# 简化：把假名区从允许中剔除，出现即报（中日混排极罕见，报出来人工看一眼即可）。
ALLOWED_RANGES = [r for r in ALLOWED_RANGES if r[0] != 0x3040]

# 已知会合法出现的符号（显式放行，避免误报）
EXPLICIT_OK = set("½ΣλτΦγκρπωεμση⇒⇐≥≤≈≠±×·—–'\"…│─├└★☆✓✔✗①②③④⑤⑥⑦⑧⑨⑩₀₁₂ⁱᵀᵥ⁻¹")

# 语义错乱黑名单（字符合法但不应出现）
BLACKLIST = [
    "CURSED", "Fleming", "presencia", "elasticidades", "aquelles",
    "intestinal", "suвidha", "本部ların", " Tonight", "Whichever",
]


def allowed(ch: str) -> bool:
    if ch in EXPLICIT_OK:
        return True
    cp = ord(ch)
    return any(lo <= cp <= hi for lo, hi in ALLOWED_RANGES)


def scan(path: Path) -> list[tuple[int, str, str]]:
    problems: list[tuple[int, str, str]] = []
    for i, line in enumerate(path.read_text(encoding="utf-8").split("\n"), 1):
        stray = sorted({c for c in line if not allowed(c)})
        if stray:
            problems.append((i, "异常字符", "".join(stray)))
            continue
        for w in BLACKLIST:
            if w in line:
                problems.append((i, "黑名单词", w))
    return problems


DEFAULT_TARGETS = [
    "references/cvpr-idea-pontryagin-scene-compilation",
    "references/idea-shortlist-final",
    "references/_theory_transplant_scan.md",
    "references/_expert_E_control.md",
    "references/_expert_F_infotheory.md",
    "references/_expert_G_rendering.md",
    "references/_critic_review_round2.md",
]


def main() -> int:
    args = sys.argv[1:]
    targets = [Path(a) for a in args] if args else [ROOT / t for t in DEFAULT_TARGETS]
    total = 0
    for p in targets:
        if not p.exists():
            print(f"[skip] 不存在：{p}")
            continue
        probs = scan(p)
        flag = "OK  " if not probs else f"NG  {len(probs)} 处"
        print(f"[{flag}] {p}")
        for ln, kind, val in probs:
            print(f"    行 {ln}  {kind}: {val!r}")
        total += len(probs)
    print(f"\n合计 {total} 处")
    return 1 if total else 0


if __name__ == "__main__":
    raise SystemExit(main())
