#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
把「工程 skills/」的最新内容同步到「智能体 ~/.workbuddy/skills/」。

设计原则（本项目长期踩坑总结）：
1. 默认 dry-run，只有加 --apply 才真正写入。
2. 写前先把被覆盖的副本**整体备份**到工程内 `.workbuddy/backups/skill-sync-<时间戳>/`，
   便于回滚；不用 rmtree，不删副本里任何文件。
3. **二进制复制**（shutil.copy2），绝不走 Path.write_text —— 后者在 Windows 上
   会把 LF 翻译成 CRLF，制造整文件假差异。
4. 写后逐个 md5 复验，不一致即报错。

用法：
  python scripts/sync_skill_copies.py              # 只看将要同步什么
  python scripts/sync_skill_copies.py --apply      # 执行同步
  python scripts/sync_skill_copies.py --apply --skill cg-paper-writing
"""
from __future__ import annotations

import argparse
import hashlib
import shutil
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROJECT_SKILLS = ROOT / "skills"
AGENT_SKILLS = Path.home() / ".workbuddy" / "skills"
BACKUP_ROOT = ROOT / ".workbuddy" / "backups"

SKIP_DIRS = {"_contracts", "__pycache__", ".git"}


def md5(p: Path) -> str:
    return hashlib.md5(p.read_bytes()).hexdigest()


def collect(base: Path) -> dict[str, str]:
    out = {}
    if not base.exists():
        return out
    for p in base.rglob("*"):
        if not p.is_file():
            continue
        if any(part in SKIP_DIRS for part in p.relative_to(base).parts):
            continue
        out[p.relative_to(base).as_posix()] = md5(p)
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="真正写入（默认 dry-run）")
    ap.add_argument("--skill", help="只同步指定技能")
    args = ap.parse_args()

    if not AGENT_SKILLS.exists():
        print(f"智能体技能目录不存在：{AGENT_SKILLS}")
        return 1

    skills = ([args.skill] if args.skill
              else sorted(d.name for d in PROJECT_SKILLS.iterdir()
                          if d.is_dir() and d.name not in SKIP_DIRS))

    todo: list[tuple[Path, Path, str]] = []   # (源, 目标, 相对路径)
    missing: list[str] = []
    for sk in skills:
        pdir, adir = PROJECT_SKILLS / sk, AGENT_SKILLS / sk
        if not pdir.exists():
            print(f"[跳过] 工程无此技能：{sk}")
            continue
        pf, af = collect(pdir), collect(adir)
        if not af:
            missing.append(sk)
            continue
        for rel, h in pf.items():
            if rel not in af:
                todo.append((pdir / rel, adir / rel, f"{sk}/{rel}"))
            elif af[rel] != h:
                todo.append((pdir / rel, adir / rel, f"{sk}/{rel}"))

    mode = "APPLY" if args.apply else "DRY-RUN"
    print("=" * 76)
    print(f"同步模式：{mode}　工程 → 智能体副本")
    print(f"需同步文件：{len(todo)}　副本缺失的技能：{len(missing)}")
    print("=" * 76)
    for _, _, rel in todo:
        print(f"  ~ {rel}")
    for sk in missing:
        print(f"  + 副本缺失技能（需整份新增）：{sk}")

    if not args.apply:
        print("\n（dry-run，未写入。加 --apply 执行）")
        return 0

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    bak = BACKUP_ROOT / f"skill-sync-{ts}"
    bak.mkdir(parents=True, exist_ok=True)
    print(f"\n备份目录：{bak}")

    ok, fail = 0, []
    for src, dst, rel in todo:
        # 备份旧副本
        if dst.exists():
            b = bak / rel
            b.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(dst, b)
        # 二进制复制，保持换行符原样
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        if md5(src) == md5(dst):
            ok += 1
        else:
            fail.append(rel)

    print(f"\n同步完成：成功 {ok}｜失败 {len(fail)}")
    for r in fail:
        print(f"  [FAIL] {r}")

    # 整份新增缺失技能
    for sk in missing:
        src, dst = PROJECT_SKILLS / sk, AGENT_SKILLS / sk
        dst.mkdir(parents=True, exist_ok=True)
        for p in src.rglob("*"):
            if p.is_file() and not any(x in SKIP_DIRS for x in p.relative_to(src).parts):
                t = dst / p.relative_to(src)
                t.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(p, t)
        print(f"  新增技能 {sk}（{len(collect(src))} 文件）")

    return 1 if fail else 0


if __name__ == "__main__":
    raise SystemExit(main())
