#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
把工程 references/ 的最新知识库快照同步到智能体的总路由技能包
（~/.workbuddy/skills/awesome-gaussian-skills/references/）。

与 sync_skill_copies.py 同源纪律：
  - copy2 二进制拷贝，绝不转换换行符；
  - 写后 md5 复验；
  - 只覆盖/新增，绝不删除目标独有文件（router-map.md 是技能自有的工作流配方）；
  - 默认 dry-run，--apply 才写。

用法：
  python scripts/sync_umbrella_refs.py
  python scripts/sync_umbrella_refs.py --apply
"""
from __future__ import annotations

import hashlib
import shutil
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "references"
# 总路由技能的两个自有文件，以工程 agent-router/ 为单一事实源（不占 skills/ 的 18 技能计数）
ROUTER = ROOT / "agent-router"
# agent-router/references/ 是 references/ 的版本化镜像（随 git 提交，供技能包比对）
MIRROR = ROUTER / "references"
DST_BASE = Path.home() / ".workbuddy" / "skills" / "awesome-gaussian-skills"
DST = DST_BASE / "references"
BACKUP_ROOT = ROOT / ".workbuddy" / "backups"

# 非 md 或属中间产物的文件不进技能包
EXCLUDE_SUFFIX = {".txt", ".html", ".htm", ".json", ".csv"}
EXCLUDE_NAME = {"methods-extracted.txt"}

AIGC_MARKERS = ("AIGC:", "ContentProducer", "设备码", "ProducedByAI")


def md5(p: Path) -> str:
    return hashlib.md5(p.read_bytes()).hexdigest()


def scan_aigc(p: Path) -> list[str]:
    try:
        head = p.read_text(encoding="utf-8", errors="ignore")[:400]
    except Exception:
        return []
    return [m for m in AIGC_MARKERS if m in head]


def main() -> int:
    apply = "--apply" in sys.argv
    if not SRC.exists():
        print(f"源目录不存在：{SRC}")
        return 1
    if not DST.exists():
        print(f"目标目录不存在：{DST}")
        return 1

    adds, upds, sames, skipped = [], [], [], []
    for p in sorted(SRC.iterdir()):
        if not p.is_file():
            continue
        if p.suffix.lower() in EXCLUDE_SUFFIX or p.name in EXCLUDE_NAME:
            skipped.append(p.name)
            continue
        dst = DST / p.name
        if not dst.exists():
            adds.append(p)
        elif md5(dst) != md5(p):
            upds.append(p)
        else:
            sames.append(p.name)

    # 版本化镜像 agent-router/references/ 与源是否同步（它随 git 提交，供技能包比对）
    mirror_upd: list[Path] = []
    if MIRROR.exists():
        for p in sorted(SRC.iterdir()):
            if not p.is_file():
                continue
            if p.suffix.lower() in EXCLUDE_SUFFIX or p.name in EXCLUDE_NAME:
                continue
            mp = MIRROR / p.name
            if not mp.exists() or md5(mp) != md5(p):
                mirror_upd.append(p)

    print("=" * 76)
    print(f"同步模式：{'APPLY' if apply else 'DRY-RUN'}　工程 references/ → 总路由技能包")
    print(f"新增 {len(adds)}｜更新 {len(upds)}｜一致 {len(sames)}｜跳过(非 md/中间产物) {len(skipped)}")
    print(f"镜像 agent-router/references/ 落后：{len(mirror_upd)}")
    print("=" * 76)
    for p in adds:
        print(f"  + {p.name}  ({p.stat().st_size/1024:.0f} KB)")
    for p in upds:
        print(f"  ~ {p.name}  ({p.stat().st_size/1024:.0f} KB)")
    for p in mirror_upd:
        if p not in upds:
            print(f"  ^ 镜像待刷 {p.name}")
    if skipped:
        print(f"  跳过：{', '.join(skipped)}")

    # 总路由自有文件（单一事实源在工程 agent-router/）
    router_jobs: list[tuple[Path, Path, str]] = []
    for src, dst in [
        (ROUTER / "SKILL.md", DST_BASE / "SKILL.md"),
        (ROUTER / "references" / "router-map.md", DST / "router-map.md"),
    ]:
        if not src.exists():
            print(f"\n[!] 路由源文件缺失（跳过）：{src}")
            continue
        state = "add" if not dst.exists() else ("same" if md5(dst) == md5(src) else "update")
        router_jobs.append((src, dst, state))

    print("\n--- 总路由自有文件（工程 agent-router/ → 技能包）---")
    for src, dst, state in router_jobs:
        mark = {"add": "+", "update": "~", "same": "="}[state]
        print(f"  {mark} {dst.name}  ({src.stat().st_size / 1024:.0f} KB)")

    # AIGC 水印预检（公开分发前必须剥离）
    flagged = []
    for p in adds + upds + [s for s, _, _ in router_jobs]:
        marks = scan_aigc(p)
        if marks:
            flagged.append((p.name, marks))
    if flagged:
        print("\n[!] AIGC 水印嫌疑（写前检查）：")
        for n, m in flagged:
            print(f"    {n} -> {m}")

    todo = [(p, DST / p.name) for p in adds + upds]
    todo += [(p, MIRROR / p.name) for p in mirror_upd if (MIRROR / p.name) != (DST / p.name)]
    todo += [(s, d) for s, d, st in router_jobs if st in ("add", "update")]

    if not apply:
        print("\n（dry-run，未写入。加 --apply 执行）")
        return 0

    if todo:
        stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        bak = BACKUP_ROOT / f"umbrella-refs-{stamp}"
        bak.mkdir(parents=True, exist_ok=True)
        for _, dst in todo:
            if dst.exists():
                # 技能包与镜像可能同名，用父目录名区分备份
                shutil.copy2(dst, bak / f"{dst.parent.name}__{dst.name}")
        print(f"\n备份目录：{bak}")

    ok, fail = 0, []
    for src, dst in todo:
        try:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
            if md5(dst) != md5(src):
                fail.append((dst.name, "md5 复验不一致"))
            else:
                ok += 1
        except Exception as e:  # noqa: BLE001
            fail.append((dst.name, str(e)))

    print(f"\n同步完成：成功 {ok}｜失败 {len(fail)}")
    for n, why in fail:
        print(f"  [FAIL] {n}: {why}")

    # 目标侧独有文件清单（保留，不删）
    own = sorted(
        f.name for f in DST.iterdir()
        if f.is_file() and not (SRC / f.name).exists() and f.name != "router-map.md"
    )
    if own:
        print(f"\n技能包自有文件（保留未动）：{', '.join(own)}")
    return 1 if fail else 0


if __name__ == "__main__":
    raise SystemExit(main())
