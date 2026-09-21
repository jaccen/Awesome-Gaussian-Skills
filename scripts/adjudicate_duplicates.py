# -*- coding: utf-8 -*-
"""同名/派生名条目人工裁定（单一事实源 methods.json）

裁定依据 —— 均已由 arXiv API 实查确认：
  * Scaffold-GS+            arXiv 无此名（仅 Scaffold-GS 2312.00109）     -> 删除
  * GaussianSplatting-SLAM-v2  arXiv ti/all 检索均 0 篇                    -> 删除
  * GeoGS-SLAM (v2) 无 ID     与 GeoGS-SLAM v2(2607.11184) 同文            -> 删除
  * GeoGS-SLAM 无 ID          实为 2607.07452「Geometry-Only ...」         -> 补 ID
  * GeoGS-SLAM v2 2607.11184  非续作，作者组与 07452 完全不重叠 -> 改名消歧
  * Luminance-GS++ 2602.18322 同一作者组的 TPAMI 期刊扩展版 -> 去掉 ++ 后缀
  * Spark 2.0                 实为 World Labs 开源 Web 3DGS 渲染引擎
                              （sparkjs.dev），原 desc 误写为 NVIDIA 机器人仿真 -> 改名/desc/分类/代码
"""
import io, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSONP = os.path.join(ROOT, "data", "methods.json")

DEL = ["Scaffold-GS+", "GaussianSplatting-SLAM-v2", "GeoGS-SLAM (v2)"]
PATCH = {
    "GeoGS-SLAM": {
        "arxiv_id": "2607.07452", "venue": "arXiv", "year": 2026,
    },
    "GeoGS-SLAM v2": {
        "_rename": "GeoGS-SLAM (Geometric Priors)",
        "venue": "arXiv", "year": 2026,
        "desc": ("Online monocular dense reconstruction combining a 3DGS scene map with learned "
                 "geometric priors from a feed-forward visual geometry model; Gaussian primitives "
                 "are sampled from both RGB input and priors, then jointly optimized with camera poses"),
    },
    "Luminance-GS++": {
        "_rename": "Luminance-GS",
    },
    "Spark 2.0": {
        "venue": "Open Source", "year": 2026,
        "category": "Compression & Streaming",
        "desc": ("Open-source Three.js/WebGL2 renderer for huge 3DGS worlds on the web; streaming "
                 "Level-of-Detail splat tree, .RAD chunk format, shared GPU splat page table "
                 "rendering 100M+ splats at steady frame rate on any device"),
        "code_url": "https://github.com/sparkjsdev/spark",
    },
}


def main():
    apply = "--apply" in sys.argv
    d = json.load(io.open(JSONP, encoding="utf-8"))
    ms = d["methods"]
    before = len(ms)

    removed = []
    for nm in DEL:
        hits = [m for m in ms if (m.get("name") or "") == nm]
        for h in hits:
            ms.remove(h)
            removed.append(nm)
        if not hits:
            print(f"   [warn] 未找到待删条目: {nm}")

    for old, p in PATCH.items():
        hits = [m for m in ms if (m.get("name") or "") == old]
        if not hits:
            print(f"   [warn] 未找到待改条目: {old}")
            continue
        m = hits[0]
        new = p.pop("_rename", None)
        for k, v in p.items():
            m[k] = v
        tag = f"{old} -> {new}" if new else old
        if new:
            m["name"] = new
        print(f"   [fix ] {tag:<44} id={m.get('arxiv_id') or '-':<12} "
              f"cat={m.get('category')} venue={m.get('venue') or '-'}")

    d["methods"] = ms
    d["count"] = len(ms)
    d["category_count"] = len({m["category"] for m in ms})

    print(f"\n methods.json: {before} -> {len(ms)} 条；分类 {d['category_count']}")
    print(f" 删除 {len(removed)} 条: {', '.join(removed)}")

    if apply:
        io.open(JSONP + ".bak3", "wb").write(io.open(JSONP, "rb").read())
        io.open(JSONP, "w", encoding="utf-8", newline="").write(
            json.dumps(d, ensure_ascii=False, indent=1))
        print("[APPLIED] 已写入 " + JSONP)
    else:
        print("[DRY-RUN] 加 --apply 生效")


if __name__ == "__main__":
    main()
