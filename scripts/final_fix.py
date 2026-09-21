#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""收尾修复（以 data/methods.json 为单一事实源）

 1. references 全文：删除已裁定移除的条目、同步改名、修正 Spark 2.0 的错误描述
 2. references 全文：重复条目去重（保留首次出现）
 3. methods.json 内真重名合并（保留信息更完整的一条）
 4. skills / README / docs 叙述里的陈旧计数 -> TOTAL
"""
import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, "references", "3dgs-methods-overview.md")
JSONP = os.path.join(ROOT, "data", "methods.json")
ENT = re.compile(r"^- \*\*([^*]+)\*\*(.*)$", re.M)
key = lambda s: re.sub(r"[^a-z0-9]", "", (s or "").lower())

TOTAL = 859

# 已从知识库裁定移除：arXiv 上查无此名 / 属于无法核实的派生名
DROP_NAMES = [
    "Scaffold-GS+",              # arXiv 仅 Scaffold-GS 2312.00109，无 "+" 变体
    "GaussianSplatting-SLAM-v2", # arXiv ti/all 检索均 0 篇
]
# 改名（消歧 / 去伪后缀）—— GeoGS-SLAM (v2) 对应真实论文 2607.11184，属改名而非删除
RENAME = {
    "GeoGS-SLAM (v2)": "GeoGS-SLAM (Geometric Priors)",
    "GeoGS-SLAM v2": "GeoGS-SLAM (Geometric Priors)",
    "Luminance-GS++": "Luminance-GS",
}
# Spark 2.0 实为 World Labs 开源 Web 3DGS 渲染引擎，原描述误写为 NVIDIA 机器人仿真
SPARK_OLD = "NVIDIA 3DGS-based robotic world simulation: real-time 3DGS reconstruction " \
            "for manipulation learning and physical AI interaction"
SPARK_NEW = ("Open-source Three.js/WebGL2 renderer for huge 3DGS worlds on the web; streaming "
             "Level-of-Detail splat tree, .RAD chunk format, shared GPU splat page table "
             "rendering 100M+ splats at steady frame rate on any device")

CHANGED = []


def nudeg_reference(apply):
    """删除 / 改名 / 修正 references 中的条目行。"""
    text = io.open(REF, encoding="utf-8", newline="").read()
    lines = text.split("\n")
    out, dropped, renamed, fixed = [], [], [], 0

    for ln in lines:
        m = ENT.match(ln)
        if not m:
            out.append(ln)
            continue
        nm = m.group(1).strip()
        if nm in DROP_NAMES:
            dropped.append(nm)
            continue
        if nm in RENAME:
            ln = ln.replace("**%s**" % nm, "**%s**" % RENAME[nm], 1)
            renamed.append("%s -> %s" % (nm, RENAME[nm]))
        if nm == "Spark 2.0" and SPARK_OLD in ln:
            ln = ln.replace(SPARK_OLD, SPARK_NEW)
            fixed += 1
        out.append(ln)

    print("1. references 条目处理：删除 %d，改名 %d，修正描述 %d"
          % (len(dropped), len(renamed), fixed))
    for r in renamed:
        print("   ~", r)
    for d in set(dropped):
        print("   -", d)

    if apply and (dropped or renamed or fixed):
        io.open(REF + ".bak3", "wb").write(text.encode("utf-8"))
        io.open(REF, "w", encoding="utf-8", newline="").write("\n".join(out))
        CHANGED.append("references 条目处理")
    return lines and out


def dedup_references(lines, apply):
    """同名重复条目去重（保留首次出现）。"""
    seen, out, dropped = set(), [], []
    for ln in lines:
        m = ENT.match(ln)
        if m:
            k = key(m.group(1))
            if k in seen:
                dropped.append(m.group(1))
                continue
            seen.add(k)
        out.append(ln)
    print("2. references 去重：%d -> %d 行；删除重复条目 %d 条"
          % (len(lines), len(out), len(dropped)))
    if dropped[:8]:
        print("   例：", ", ".join(dropped[:8]))
    if apply and dropped:
        io.open(REF, "w", encoding="utf-8", newline="").write("\n".join(out))
        CHANGED.append("references 去重")
    return out


def merge_dup_names(apply):
    d = json.load(io.open(JSONP, encoding="utf-8"))
    ms = d["methods"]
    groups = {}
    for m in ms:
        groups.setdefault(key(m["name"]), []).append(m)
    removed = []
    for _k, g in groups.items():
        if len(g) < 2:
            continue
        # 字面名各不相同 -> 仅规范化后相同的假重复，跳过
        if len({x["name"] for x in g}) == len(g):
            print("   [跳过] 非真重复（仅规范化后相同）: %s" % [x["name"] for x in g])
            continue
        g.sort(key=lambda x: (bool(x.get("arxiv_id")), bool(x.get("code_url")),
                              len(x.get("desc") or "")), reverse=True)
        keep, drop = g[0], g[1:]
        for x in drop:
            ms.remove(x)
            removed.append("%s -> 合并入 %s" % (x["name"], keep["name"]))
    print("3. methods.json 合并真重名 %d 条" % len(removed))
    for r in removed:
        print("   ", r)
    if apply and removed:
        io.open(JSONP + ".bak4", "wb").write(io.open(JSONP, "rb").read())
        d["methods"] = ms
        d["count"] = len(ms)
        d["category_count"] = len({m["category"] for m in ms})
        io.open(JSONP, "w", encoding="utf-8", newline="").write(
            json.dumps(d, ensure_ascii=False, indent=1))
        CHANGED.append("json 去重")


def fix_stale_counts(apply):
    targets = [
        "skills/3dgs-method-compare/SKILL.md", "skills/3dgs-paper-reader/SKILL.md",
        "skills/3dgs-spatial-agent/SKILL.md", "skills/3dgs-visualizer/SKILL.md",
        "skills/nerf-to-3dgs-migrator/SKILL.md", "skills/patent-software-ip/SKILL.md",
        "references/3dgs-methods-overview.md", "README.md", "README_CN.md",
        "docs/anthropic-pr-preparation.md", "CLAUDE.md",
        "skills/3dgs-method-compare/static/core-stance.md",
        "skills/3dgs-engineering-guide/static/industry-landscape.md",
    ]
    pats = [
        (r"\b678\+(?=\s*(?:methods?|个方法))", "%d+" % TOTAL),
        (r"Knowledge base now 678\+ methods", "Knowledge base now %d methods" % TOTAL),
        (r"678\+ methods, 23 categories", "%d methods, 23 categories" % TOTAL),
        (r"\b862\+(?=\s*(?:methods?|个方法))", "%d+" % TOTAL),
        (r"862\+ methods, 23 categories", "%d methods, 23 categories" % TOTAL),
        (r"\b862 (?:methods|个方法)", "%d methods" % TOTAL),
    ]
    print("4. 陈旧计数修复（目标 %d）：" % TOTAL)
    for rel in targets:
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p):
            print("   [miss] %s" % rel)
            continue
        s = orig = io.open(p, encoding="utf-8", newline="").read()
        n = 0
        for pat, rep in pats:
            s, k = re.subn(pat, rep, s)
            n += k
        if n:
            print("   %-54s %d 处" % (rel, n))
            if apply:
                io.open(p + ".bak4", "wb").write(orig.encode("utf-8"))
                io.open(p, "w", encoding="utf-8", newline="").write(s)
                CHANGED.append(rel)


def main():
    apply = "--apply" in sys.argv
    lines = nudeg_reference(apply)
    if lines:
        dedup_references(lines, apply)
    merge_dup_names(apply)
    fix_stale_counts(apply)
    print("\n" + ("[APPLIED] 变更：%s" % "、".join(CHANGED) if apply
                  else "[DRY-RUN] 加 --apply 生效"))


if __name__ == "__main__":
    main()
