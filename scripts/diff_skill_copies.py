#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
对比「工程 skills/」与「智能体 ~/.workbuddy/skills/」两份技能副本，输出差异清单。

用于同步前的判读：谁新、谁多、谁被改过。
不做任何写操作 —— 只报告，同步动作由 sync_skill_copies.py 执行。

用法：
  python scripts/diff_skill_copies.py              # 全部技能
  python scripts/diff_skill_copies.py cg-paper-writing   # 只看一个
"""
from __future__ import annotations

import hashlib
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROJECT_SKILLS = ROOT / "skills"
AGENT_SKILLS = Path.home() / ".workbuddy" / "skills"

SKIP_DIRS = {"_contracts", "__pycache__", ".git"}
SKIP_FILES = {".DS_Store"}


def md5(p: Path) -> str:
    return hashlib.md5(p.read_bytes()).hexdigest()


def collect(base: Path) -> dict[str, tuple[str, float]]:
    """{相对路径: (md5, mtime)}"""
    out: dict[str, tuple[str, float]] = {}
    if not base.exists():
        return out
    for p in base.rglob("*"):
        if not p.is_file():
            continue
        if any(part in SKIP_DIRS for part in p.relative_to(base).parts):
            continue
        if p.name in SKIP_FILES:
            continue
        rel = p.relative_to(base).as_posix()
        out[rel] = (md5(p), p.stat().st_mtime)
    return out


def ts(t: float) -> str:
    return datetime.fromtimestamp(t).strftime("%Y-%m-%d %H:%M")


def main() -> None:
    only = sys.argv[1] if len(sys.argv) > 1 else None
    if not AGENT_SKILLS.exists():
        print(f"智能体技能目录不存在：{AGENT_SKILLS}")
        return

    proj_skills = sorted(
        d.name for d in PROJECT_SKILLS.iterdir()
        if d.is_dir() and d.name not in SKIP_DIRS
    ) if PROJECT_SKILLS.exists() else []

    if only:
        targets = [only]
    else:
        targets = proj_skills

    total_new = total_diff = total_missing = 0
    print("=" * 78)
    print(f"工程 skills/ 共 {len(proj_skills)} 个技能：{', '.join(proj_skills)}")
    print("=" * 78)

    for sk in targets:
        pdir = PROJECT_SKILLS / sk
        adir = AGENT_SKILLS / sk
        if not pdir.exists():
            print(f"\n[跳过] 工程中不存在：{sk}")
            continue
        pf, af = collect(pdir), collect(adir)
        if not af:
            print(f"\n### {sk}  —— 智能体副本【不存在】（需整份新增，{len(pf)} 文件）")
            total_missing += 1
            continue

        new = sorted(set(pf) - set(af))
        gone = sorted(set(af) - set(pf))
        diff = sorted(r for r in set(pf) & set(af) if pf[r][0] != af[r][0])
        same = len(set(pf) & set(af)) - len(diff)

        if not (new or gone or diff):
            print(f"\n### {sk}  ✅ 完全一致（{same} 文件）")
            continue

        print(f"\n### {sk}  —— 一致 {same}｜新增 {len(new)}｜内容不同 {len(diff)}｜仅副本有 {len(gone)}")
        for r in new:
            print(f"    + 新增        {r}")
        for r in diff:
            pt, at = ts(pf[r][1]), ts(af[r][1])
            newer = "工程较新" if pf[r][1] > af[r][1] else ("副本较新" if af[r][1] > pf[r][1] else "时间相同")
            print(f"    ~ 内容不同    {r}   [工程 {pt} / 副本 {at} → {newer}]")
        for r in gone:
            print(f"    - 仅副本有    {r}")
        total_new += len(new)
        total_diff += len(diff)

    print("\n" + "=" * 78)
    print(f"汇总：新增文件 {total_new}｜内容不同 {total_diff}｜副本缺失技能 {total_missing}")
    print("=" * 78)


if __name__ == "__main__":
    main()
