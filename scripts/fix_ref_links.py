#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""修正 references/3dgs-methods-overview.md 中「显示 ID 与链接 ID 不一致」的条目。

裁定规则：以 data/methods.json（单一事实源，已核验）的 arxiv_id 为准，
同时修正显示 ID 与链接 ID，保证二者一致且与事实源对齐。
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(ROOT, "data", "methods.json")
REF_PATH = os.path.join(ROOT, "references", "3dgs-methods-overview.md")

PAT = re.compile(
    r"(-\s+\*\*([^*]+)\*\*\s*\[arXiv:)([0-9]{4}\.[0-9]{4,5})(\]\(https?://arxiv\.org/abs/)([0-9]{4}\.[0-9]{4,5})(\))"
)


def norm(s):
    return re.sub(r"\s+", " ", s).strip().casefold()


def main(apply=False):
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        d = json.load(f)
    by_name = {norm(m["name"]): m for m in d["methods"]}

    with open(REF_PATH, "r", encoding="utf-8") as f:
        text = f.read()

    stats = {"mismatch": 0, "fixed": 0, "notfound": 0, "already": 0}
    details = []

    def repl(m):
        head, name, shown, mid, linked, tail = m.groups()
        key = norm(name)
        rec = by_name.get(key)
        if rec is None:
            stats["notfound"] += 1
            details.append(("NOTFOUND", name, shown, linked, "-"))
            return m.group(0)
        truth = (rec.get("arxiv_id") or "").strip()
        if shown == linked:
            stats["already"] += 1
            return m.group(0)
        stats["mismatch"] += 1
        if not truth:
            # 事实源无 ID：退化为「两者统一为显示 ID」（显示 ID 已经过核验为正确）
            truth = shown
        stats["fixed"] += 1
        details.append(("FIX", name, shown, linked, truth))
        return f"{head}{truth}{mid}{truth}{tail}"

    new_text = PAT.sub(repl, text)

    print(f"错配条目: {stats['mismatch']}  已修正: {stats['fixed']}  "
          f"名称查不到: {stats['notfound']}  本就一致: {stats['already']}")
    print("--- 前 10 条明细 ---")
    for t in details[:10]:
        print("  ", " | ".join(str(x) for x in t))

    if apply and new_text != text:
        bak = REF_PATH + ".bak"
        with open(bak, "wb") as f:
            f.write(text.encode("utf-8"))
        with open(REF_PATH, "w", encoding="utf-8", newline="\n") as f:
            f.write(new_text)
        print(f"\n[APPLIED] 已写入 {REF_PATH}（备份 {bak}）")
    else:
        print("\n[DRY-RUN] 未写入（加 --apply 生效）")


if __name__ == "__main__":
    main(apply="--apply" in sys.argv)
