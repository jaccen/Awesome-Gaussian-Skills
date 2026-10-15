#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
把某个技能重新打包成可分发的 zip（供 SkillHub / 手动安装使用）。

约定：
- 包内顶层目录名 = 技能名（如 `cg-paper-writing/`），与既有 dist 产物保持一致。
- 打包源默认取**工程 skills/**（单一事实源）；加 --from-agent 则取智能体副本。
- 排除 `_contracts/`、`__pycache__`、`.DS_Store`。
- 写完立刻读回 zip 校验条目数与 CRC，避免产出坏包。

用法：
  python scripts/package_skill_zip.py cg-paper-writing
  python scripts/package_skill_zip.py cg-paper-writing --out dist/cg-paper-writing.zip
"""
from __future__ import annotations

import argparse
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROJECT_SKILLS = ROOT / "skills"
AGENT_SKILLS = Path.home() / ".workbuddy" / "skills"
SKIP_DIRS = {"_contracts", "__pycache__", ".git"}
SKIP_FILES = {".DS_Store", "Thumbs.db"}


def build(skill: str, src_root: Path, out: Path) -> int:
    src = src_root / skill
    if not src.exists():
        print(f"源目录不存在：{src}")
        return 1
    out.parent.mkdir(parents=True, exist_ok=True)

    files = []
    for p in sorted(src.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(src)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        if p.name in SKIP_FILES:
            continue
        files.append(p)

    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for p in files:
            arc = f"{skill}/{p.relative_to(src).as_posix()}"
            z.write(p, arc)

    # 读回校验
    with zipfile.ZipFile(out) as z:
        bad = z.testzip()
        names = z.namelist()
    print(f"打包完成：{out}")
    print(f"  条目数 {len(names)}（预期 {len(files)}）｜大小 {out.stat().st_size/1024:.1f} KB")
    print(f"  CRC 校验：{'通过' if bad is None else '失败 @ ' + str(bad)}")
    for n in names[:3]:
        print(f"    {n}")
    print(f"    ... 共 {len(names)} 项")
    return 0 if bad is None and len(names) == len(files) else 1


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("skill")
    ap.add_argument("--out", help="输出 zip 路径，默认 dist/<skill>.zip")
    ap.add_argument("--from-agent", action="store_true", help="从智能体副本打包")
    args = ap.parse_args()
    src_root = AGENT_SKILLS if args.from_agent else PROJECT_SKILLS
    out = Path(args.out) if args.out else ROOT / "dist" / f"{args.skill}.zip"
    return build(args.skill, src_root, out)


if __name__ == "__main__":
    raise SystemExit(main())
