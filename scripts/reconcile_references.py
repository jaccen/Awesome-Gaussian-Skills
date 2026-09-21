# -*- coding: utf-8 -*-
"""references 与 json 的最终对齐（2026-09-21 第二轮裁定）

依据准确性协议 R2「采用论文自述的方法名」：
  * HeadsUp 2605.04035         ECCV 2026，Apple 官方项目页 apple.github.io/ml-headsup 自述该名 -> 补录入库
  * Gaussian-Enhanced Surfel 2605.25345        标题无自述方法名 -> 从 references 移除
  * View-Dependent Splatting Kernels 2605.25426 同上 -> 移除
  * Ambient-Robust Inverse Rendering 2605.30250 同上 -> 移除
  * RAF（无 arXiv ID）                v0.9.0 已判为不可核实 -> 移除
  * 3DGS\\u00B3                        转义名 -> 统一为 3DGS³
  * Large Material Gaussian Model (MGM) -> 与 json 一致，去掉别名后缀
"""
import io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, "references", "3dgs-methods-overview.md")
JSONP = os.path.join(ROOT, "data", "methods.json")
ENT = re.compile(r"^- \*\*([^*]+)\*\*", re.M)

DROP = ["RAF", "Gaussian-Enhanced Surfel",
        "View-Dependent Splatting Kernels", "Ambient-Robust Inverse Rendering"]
FIXNAME = {"3DGS\\u00B3": "3DGS³",
           "Large Material Gaussian Model (MGM)": "Large Material Gaussian Model"}

ADD = {
    "name": "HeadsUp", "arxiv_id": "2605.04035", "venue": "ECCV 2026", "year": 2026,
    "category": "Human & Avatar",
    "desc": ("Large-scale high-quality 3D Gaussian head reconstruction from multi-view captures; "
             "UV-parameterized Gaussian representation decoupling primitive count from input "
             "resolution, trained on 10,000+ subjects for feed-forward inference"),
    "code_url": "https://apple.github.io/ml-headsup/", "sources": ["references"],
}


def main():
    apply = "--apply" in sys.argv
    d = json.load(io.open(JSONP, encoding="utf-8"))
    ms = d["methods"]
    names = {m["name"] for m in ms}

    print("1. json 补录 HeadsUp:", "跳过（已存在）" if ADD["name"] in names else "待加入")
    if ADD["name"] not in names:
        ms.append(dict(ADD))
        d["methods"] = ms
        d["count"] = len(ms)
        d["category_count"] = len({m["category"] for m in ms})

    text = io.open(REF, encoding="utf-8", newline="").read()
    lines = text.split("\n")
    out, dropped, fixed = [], [], []
    for ln in lines:
        m = ENT.match(ln)
        if not m:
            out.append(ln)
            continue
        nm = m.group(1).strip()
        if nm in DROP:
            dropped.append(nm)
            continue
        if nm in FIXNAME:
            ln = ln.replace("**%s**" % nm, "**%s**" % FIXNAME[nm], 1)
            fixed.append("%s -> %s" % (nm, FIXNAME[nm]))
        out.append(ln)
    print("2. references：删除 %d 条，改别名 %d 条" % (len(dropped), len(fixed)))
    for x in dropped:
        print("   -", x)
    for x in fixed:
        print("   ~", x)
    print("3. 预计：json %d 条 / references %d 条"
          % (len(ms), len([l for l in out if ENT.match(l)])))

    if apply:
        io.open(JSONP + ".bak5", "wb").write(io.open(JSONP, "rb").read())
        io.open(JSONP, "w", encoding="utf-8", newline="").write(
            json.dumps(d, ensure_ascii=False, indent=1))
        io.open(REF + ".bak5", "wb").write(text.encode("utf-8"))
        io.open(REF, "w", encoding="utf-8", newline="").write("\n".join(out))
        print("[APPLIED] 已写入 methods.json 与 references")
    else:
        print("[DRY-RUN] 加 --apply 生效")


if __name__ == "__main__":
    main()
