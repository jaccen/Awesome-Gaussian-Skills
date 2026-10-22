#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
校验两份「26 类 → 期刊矩阵」的逐行计数与 data/methods.json 的实际类目分布是否一致。

被校验文件：
  - references/3dgs-writing-capability.md            （§1，带 # 列）
  - skills/cg-paper-writing/references/3dgs-domain-venues.md（§1，无 # 列）

检查项：
  1. 行数 = 26
  2. 每行类目名能在 methods.json 的类目分布里找到（去 markdown 加粗与「（新增类）」后缀）
  3. 该行计数 = 实际计数
  4. 表格总和 = methods.json 的 count

用法：python scripts/check_matrix_sums.py
"""
from __future__ import annotations

import collections
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MJ = ROOT / "data" / "methods.json"

TARGETS = [
    (ROOT / "references" / "3dgs-writing-capability.md", 2),
    (ROOT / "skills" / "cg-paper-writing" / "references" / "3dgs-domain-venues.md", 1),
]


def normalize(name: str) -> str:
    s = name.replace("*", "").strip()
    s = re.sub(r"（新增类）|\(新增类\)", "", s).strip()
    return s


def parse_section1(path: Path, count_col: int) -> list[tuple[str, int]]:
    text = path.read_text(encoding="utf-8")
    m = re.search(r"^##\s*1\..*?(?=^##\s)", text, re.S | re.M)
    if not m:
        return []
    rows: list[tuple[str, int]] = []
    for line in m.group(0).split("\n"):
        if not line.strip().startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) <= count_col:
            continue
        name, cnt = cells[count_col - 1], cells[count_col]
        if not re.fullmatch(r"\d+", cnt) or name in ("细分领域",) or set(name) <= {"-", ":", " "}:
            continue
        rows.append((normalize(name), int(cnt)))
    return rows


def main() -> int:
    data = json.loads(MJ.read_text(encoding="utf-8"))
    actual = collections.Counter(x.get("category", "?") for x in data["methods"])
    total = data["count"]
    problems: list[str] = []

    print("=" * 74)
    print(f"矩阵逐行对账　methods.json count={total}｜类目 {len(actual)}")
    print("=" * 74)

    for path, col in TARGETS:
        if not path.exists():
            problems.append(f"文件不存在：{path}")
            continue
        rows = parse_section1(path, col)
        s = sum(v for _, v in rows)
        name = path.relative_to(ROOT).as_posix()
        status = "OK" if (len(rows) == 26 and s == total) else "NG"
        print(f"[{status}] {name}")
        print(f"      行数 {len(rows)}｜求和 {s}｜目标 {total}")

        if len(rows) != 26:
            problems.append(f"{name}: 行数 {len(rows)} != 26")
        if s != total:
            problems.append(f"{name}: 求和 {s} != {total}")
        seen = set()
        for cat, v in rows:
            seen.add(cat)
            if cat not in actual:
                problems.append(f"{name}: 未知类目名『{cat}』")
            elif actual[cat] != v:
                problems.append(f"{name}: {cat} 表中 {v} != 实际 {actual[cat]}")
        missing = set(actual) - seen
        if missing:
            problems.append(f"{name}: 缺少类目 {sorted(missing)}")

    print("=" * 74)
    if problems:
        print(f"[FAIL] {len(problems)} 项：")
        for p in problems:
            print("  -", p)
        return 1
    print("[OK] 两份矩阵的 26 行计数与 methods.json 完全一致")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
