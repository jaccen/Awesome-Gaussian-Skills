#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
判读「工程 vs 智能体副本」内容不同的文件，差异到底属于哪一种：

  A. 仅换行符不同（CRLF vs LF）—— 可安全用工程覆盖
  B. 仅行尾空白不同           —— 可安全用工程覆盖
  C. 真实内容差异             —— 必须人工确认方向，不能盲目覆盖

用法：python scripts/check_copy_diff_nature.py
"""
from __future__ import annotations

import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROJECT_SKILLS = ROOT / "skills"
AGENT_SKILLS = Path.home() / ".workbuddy" / "skills"

# （技能, 相对路径）
TARGETS = [
    ("3dgs-engineering-guide", "SKILL.md"),
    ("3dgs-experiment-planner", "SKILL.md"),
    ("3dgs-method-compare", "SKILL.md"),
    ("3dgs-method-compare", "static/core-stance.md"),
    ("3dgs-paper-reader", "SKILL.md"),
    ("3dgs-spatial-agent", "SKILL.md"),
    ("3dgs-visualizer", "SKILL.md"),
    ("cg-paper-writing", "references/3dgs-citation-audit.md"),
    ("cg-paper-writing", "references/3dgs-paper-knowledge.md"),
    ("nerf-to-3dgs-migrator", "SKILL.md"),
    ("patent-software-ip", "SKILL.md"),
]


def read_bytes(p: Path) -> bytes:
    return p.read_bytes()


def norm(b: bytes, level: int) -> bytes:
    if level >= 1:
        b = b.replace(b"\r\n", b"\n")
    if level >= 2:
        b = b"\n".join(l.rstrip() for l in b.split(b"\n"))
    return b


print(f"{'文件':58s} {'原始':6s} {'归一化换行':10s} {'再剥行尾空白':12s} 判定")
print("-" * 104)

kinds = {"A": 0, "B": 0, "C": 0}
for sk, rel in TARGETS:
    p, a = PROJECT_SKILLS / sk / rel, AGENT_SKILLS / sk / rel
    if not (p.exists() and a.exists()):
        print(f"{sk + '/' + rel:58s} 缺失")
        continue
    pb, ab = read_bytes(p), read_bytes(a)
    same0 = hashlib.md5(pb).hexdigest() == hashlib.md5(ab).hexdigest()
    same1 = hashlib.md5(norm(pb, 1)).hexdigest() == hashlib.md5(norm(ab, 1)).hexdigest()
    same2 = hashlib.md5(norm(pb, 2)).hexdigest() == hashlib.md5(norm(ab, 2)).hexdigest()
    if same0:
        verdict = "完全一致"
    elif same1:
        verdict = "A · 仅换行符不同 → 可安全覆盖"
        kinds["A"] += 1
    elif same2:
        verdict = "B · 仅行尾空白不同 → 可安全覆盖"
        kinds["B"] += 1
    else:
        verdict = "C · 真实内容差异 → 需人工确认"
        kinds["C"] += 1
    name = f"{sk}/{rel}"
    print(f"{name:58s} {str(same0):6s} {str(same1):10s} {str(same2):12s} {verdict}")

    # C 类打印首个真实差异行，便于人工判读
    if verdict.startswith("C"):
        pl = norm(pb, 2).decode("utf-8", "ignore").split("\n")
        al = norm(ab, 2).decode("utf-8", "ignore").split("\n")
        for i in range(max(len(pl), len(al))):
            x = pl[i] if i < len(pl) else "<无此行>"
            y = al[i] if i < len(al) else "<无此行>"
            if x != y:
                print(f"      首处差异 @行{i+1}")
                print(f"        工程: {x[:110]}")
                print(f"        副本: {y[:110]}")
                break

print("-" * 104)
print(f"汇总：A 仅换行 {kinds['A']}｜B 仅空白 {kinds['B']}｜C 真实差异 {kinds['C']}")
