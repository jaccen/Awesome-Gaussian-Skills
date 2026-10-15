#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
总路由技能包（~/.workbuddy/skills/awesome-gaussian-skills）的链路自检。

检查三件事：
  1. SKILL.md / router-map.md 里提到的 .md 知识库文件，在技能包内是否真实存在（防死链）；
  2. 路由表提到的子技能名，在智能体技能目录里是否真的安装了（防"路由到未安装技能"）；
  3. 工程 agent-router/ 与技能包内的两份自有文件是否一致（防单侧漂移）。

用法：
  python scripts/check_umbrella_links.py
"""
from __future__ import annotations

import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ROUTER = ROOT / "agent-router"
AGENT_SKILLS = Path.home() / ".workbuddy" / "skills"
PKG = AGENT_SKILLS / "awesome-gaussian-skills"
PKG_REFS = PKG / "references"

# 路由表里出现的子技能名（工程 skills/ 目录即权威清单）
SKILL_NAMES = sorted(
    p.name for p in (ROOT / "skills").iterdir()
    if p.is_dir() and not p.name.startswith("_") and (p / "SKILL.md").exists()
)

# 属于其它技能包、不在本包内的引用（不是死链，但要注明归属）
EXTERNAL_REFS = {
    "mp-3dgs.md": "research-expert-team",
    "mp-aigc.md": "research-expert-team",
    "mp-ontology.md": "research-expert-team",
    "mp-spatial.md": "research-expert-team",
    "mp-super-agents.md": "research-expert-team",
    "methodology-core.md": "research-expert-team",
}


def md5(p: Path) -> str:
    return hashlib.md5(p.read_bytes()).hexdigest()


def main() -> int:
    problems: list[str] = []

    # 1 + 2：技能包内引用与子技能安装状态
    if not PKG.exists():
        print(f"[FATAL] 技能包不存在：{PKG}")
        return 1

    docs = [PKG / "SKILL.md", PKG_REFS / "router-map.md"]
    mentioned_files: set[str] = set()
    for d in docs:
        if not d.exists():
            problems.append(f"缺少文档：{d.name}")
            continue
        text = d.read_text(encoding="utf-8", errors="ignore")
        for tok in re.findall(r"`([^`\n]+\.md)`", text) + re.findall(r"\| `([^`\n]+\.md)`", text):
            mentioned_files.add(Path(tok).name)

    external_ok = 0
    for name in sorted(mentioned_files):
        if any(ch in name for ch in "*?"):          # 通配写法（如 _kb_*.md），不逐个校验
            continue
        if name in EXTERNAL_REFS:                    # 属于别的技能包，校验归属包内是否真有
            owner = EXTERNAL_REFS[name]
            if not (AGENT_SKILLS / owner / "references" / name).exists():
                problems.append(f"跨技能引用失效：{name}（应在 {owner}/references/ 下）")
            else:
                external_ok += 1
            continue
        if not (PKG_REFS / name).exists() and not (PKG / name).exists():
            problems.append(f"SKILL/router-map 引用了包内不存在的文件：{name}")

    for d in docs:
        if not d.exists():
            continue
        text = d.read_text(encoding="utf-8", errors="ignore")
        for s in SKILL_NAMES:
            if f"`{s}`" in text and not (AGENT_SKILLS / s / "SKILL.md").exists():
                problems.append(f"路由表指向未安装的子技能：{s}")

    # 3：双副本一致性
    pairs = [
        (ROUTER / "SKILL.md", PKG / "SKILL.md"),
        (ROUTER / "references" / "router-map.md", PKG_REFS / "router-map.md"),
    ]
    for src, dst in pairs:
        if not src.exists():
            problems.append(f"工程侧源文件缺失：{src}")
        elif not dst.exists():
            problems.append(f"技能包内缺失：{dst}")
        elif md5(src) != md5(dst):
            problems.append(f"两侧不一致（需跑 sync_umbrella_refs.py）：{dst.name}")

    # 报告
    print("=" * 74)
    print(f"总路由技能包自检　{PKG}")
    print(f"工程侧子技能 {len(SKILL_NAMES)} 个｜包内 references {len(list(PKG_REFS.glob('*.md')))} 个 md")
    print("=" * 74)

    installed = [s for s in SKILL_NAMES if (AGENT_SKILLS / s / "SKILL.md").exists()]
    missing = [s for s in SKILL_NAMES if s not in installed]
    print(f"子技能安装：{len(installed)}/{len(SKILL_NAMES)}" + ("" if not missing else f"｜缺失 {missing}"))
    if external_ok:
        print(f"跨技能引用（归属其它技能包）校验通过：{external_ok} 个")

    if problems:
        print(f"\n[FAIL] {len(problems)} 项：")
        for p in problems:
            print(f"  - {p}")
        return 1
    print("\n[OK] 引用文件、子技能安装状态、双副本一致性 全部通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
