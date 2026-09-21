#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把核验通过的 3DGS 新论文写入 data/methods.json（唯一事实源）。

输入：reports/harvest/auto_accept.json（规则自动通过）+ CURATED 白名单（人工裁定）
处理：
  - desc：从 arXiv 摘要提取「方法定义句」，剥离 "We present X, " 引导语，压成名词短语风格
  - category：按既有 23 类关键词映射（specific -> general 有序匹配）
  - venue/year：以 arXiv 提交年份为准，标注 `arXiv YYYY`
  - sources：统一写 ["arxiv-harvest"]
"""
import io
import json
import os
import re
import sys
from collections import Counter
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON = os.path.join(ROOT, "data", "methods.json")
ACC = os.path.join(ROOT, "reports", "harvest", "auto_accept.json")
CAND = os.path.join(ROOT, "reports", "harvest", "candidates.json")

VETO = {
    "2609.14891": "标题无自述方法名（GS ptychography，未命名方法）",
    "2609.04602": "NavArena 属 benchmark 构建流程，非方法",
    "2609.01698": "VirSqueezer 本体为 VR 形变生成，GS 相关性不可核",
    "2608.06801": "AdvTiles 为对抗伪装衣物，非 GS 方法",
    "2607.20325": "MR-Compare 为 MR 可视化对比框架，非方法",
    "2607.16362": "OmniStyle-INR 本体为 INR 风格迁移",
    "2607.15806": "HybridSim 为 mmWave 人体感知孪生，非 GS 方法",
    "2606.26985": "Vis4GS 为可视化分析工具，非方法",
}

# ---- 人工裁定白名单：规则因「标题未直接出现 Gaussian Splatting」而漏收，
#      但经逐条核查摘要确认为真实 GS 方法者。name 一律取论文自述名。
CURATED = {
    "2609.20589": ("RawSLAM", "SLAM"),
    "2609.19463": ("ParticleSplat", "Feed-Forward"),
    "2608.29106": ("Elastic Triangle Splatting", "Surface & Rendering"),
    "2608.27735": ("ABCD", "Acceleration"),
    "2608.20687": ("TopoSurfel", "Surface & Rendering"),
    "2608.05482": ("CDSeg", "Language & Semantic"),
    "2608.01726": ("G-Skin", "Human & Avatar"),
    "2608.00950": ("Swimm3R", "Cross-Domain"),
    "2608.00463": ("Scene2Sound", "Cross-Domain"),
    "2607.28164": ("S-Avatar", "Human & Avatar"),
    "2607.28049": ("TSOG", "Compression & Streaming"),
    "2607.25362": ("PanoLess", "Cross-Domain"),
    "2607.14470": ("G2SR", "Surface & Rendering"),
    "2607.14203": ("Instant NuRec", "Feed-Forward"),
    "2607.07168": ("NoDrift3R", "Feed-Forward"),
    "2607.05243": ("GUSH3R", "Feed-Forward"),
    "2606.30352": ("FastPano3D", "Feed-Forward"),
    "2606.29237": ("MoPe", "SLAM"),
    "2606.28840": ("DLGStream", "Compression & Streaming"),
    "2606.28828": ("Ground4D", "Dynamic & 4D"),
    "2606.24874": ("FLUX3D", "Generation"),
    "2606.19874": ("MMD-SLAM", "SLAM"),
    "2606.19019": ("FlowObject", "Generation"),
    "2606.15659": ("SpatialAvatar-0", "Human & Avatar"),
    "2605.19600": ("FlyMirage", "Embodied AI & Robotics"),
}

# ---- 分类规则：按 specificity 从高到低有序匹配，命中即返回
# ---- 分类规则：按 specificity 从高到低有序匹配，命中即返回。
# 词形一律用精确边界，避免 \bhand\w* 命中 "handling" 这类误判。
CAT_RULES = [
    ("Security", r"\b(watermark\w*|backdoor\w*|adversarial (attack|camouflage)|poison\w*|privacy|stealth|cryptograph\w*)\b"),
    ("CAD & Reverse Engineering", r"\b(cad|bim|reverse engineering|engineering drawing|blueprint|parametric model)\b"),
    ("World Models & Spatial Intelligence", r"\b(world model|spatial intelligence|world-action)\b"),
    ("Human & Avatar", r"\b(avatar\w*|talking head|face|facial|human bod\w*|hands?|hand-held|garment|hair|skinning)\b"),
    ("Language & Semantic", r"\b(open[- ]vocabulary|referring|language[- ]embedded|semantic segment\w*|vlm|llm|vision[- ]language|language field\w*|label transfer|instance[- ]grouped)\b"),
    ("Autonomous Driving", r"\b(driving|autonomous vehicle|street scene|traffic|autonomous parking)\b"),
    ("Embodied AI & Robotics", r"\b(robot\w*|manipulation|grasp\w*|quadrotor|drone|uav|navigation|locomanipulation|visuomotor)\b"),
    ("Cross-Domain", r"\b(underwater|medical|endoscop\w*|\bct\b|\bmri\b|radio[- ]frequency|\brf\b|wireless|beamform\w*|remote sensing|satellite|sonar|cultural heritage|astronom\w*|microscop\w*|photoacoustic|tomograph\w*)"),
    ("HDR & Relighting", r"\b(relight\w*|illumination|lighting|inverse rendering|reflect\w*|brdf|material|pbr|tone cur\w*|ray[- ]trac\w*)\b"),
    ("SLAM", r"\b(slam|odometry|relocalization|visual[- ]inertial|sim\(3\) global|mapping)\b"),
    ("Compression & Streaming", r"\b(compress\w*|codec|streaming|\bpacked?\b|packaging|quantis\w*|quantiz\w*|format for)\b"),
    ("Acceleration", r"\b(accelerat\w*|speed[- ]?up|real[- ]time|tile[- ]local|roofline|constant[- ]vram|pruning|prune\w*|block coordinate descent)\b"),
    ("Editing", r"\b(edit\w*|removal|inpainting|styliz\w*|restyl\w*|scene manipulat\w*)\b"),
    ("Simulation", r"\b(simulat\w*|digital twin|virtual environment)\b"),
    ("Generation", r"\b(generat\w*|diffusion|text-to-3d|text-to-4d|image-to-3d)\b"),
    ("Dynamic & 4D", r"\b(4d|dynamic|deformable|temporal|non[- ]rigid|screw-theoretic|lagrangian|scene flow|avatar-free)\b"),
    ("Surface & Rendering", r"\b(surface reconstruction|surface\w*|mesh\w*|geometr\w*|normal\w*|surfels|triangle splat\w*|alias\w*|rendering qualit\w*|depth map)\b"),
    ("Sparse-View", r"\b(sparse[- ]view|sparse view|few[- ]view|few[- ]shot|single[- ]view|sparse input|limited input views|sparse camera|sparse[- ]view)\b"),
    ("Feed-Forward", r"\b(feed[- ]forward|feedforward|generalizable|unposed|pose[- ]free|camera[- ]free|one forward pass|single forward|arbitrary scale)\b"),
    ("Large-Scale", r"\b(large[- ]scale|city[- ]level|kilometer|km[- ]scale|aerial|city scene)\b"),
    ("Robustness", r"\b(robust\w*|deblur\w*|derain\w*|dehaz\w*|low[- ]light|all[- ]weather|adverse condition)\b"),
    ("Optimization", r"\b(densification|adaptive density|regulariz\w*|regularis\w*|initialization|convergence)\b"),
    ("Foundation", r"\b(representation|primitive\w*|framework|coordinate|camera model|theoretical|distribution)\b"),
]
CAT_FALLBACK = "Foundation"


def clean(s):
    s = re.sub(r"\$\^?\{?([^$}{]*)\}?\$", r"\1", s or "")
    s = re.sub(r"\^\{?([0-9A-Za-z]+)\}?", r"\1", s)
    s = s.replace("{", "").replace("}", "").replace("\\emph", "").replace("\\", "")
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def strip_name(s, name):
    """删掉描述开头的方法名本身及其同位语，只留定义性描述。
    例：'VoxelTTO, a feed-forward framework for ...' -> 'a feed-forward framework for ...'
        'TSOG (Temporally and Spatially Ordered Gaussians), a format for ...' -> 'a format for ...'
        'Proposed method, AirSplan, adopts ...' -> 'adopts ...'
    名称在论文里常有略写变体（DualDiff3D -> DualDiff），故按前缀由长到短尝试。
    """
    PRE = r"(?:(?:(?:our|the|a)\s+)?proposed\s+(?:method|framework|approach),?\s*)?"
    for L in range(len(name), 4, -1):
        n = re.escape(name[:L])
        pats = [
            PRE + n + r"\s*\([^)]*\)\s*(?:,\s*)?(?:is\s+)?",
            PRE + n + r"\s*,\s*(?:is\s+)?",
            PRE + n + r"\s+is\s+",
            PRE + n + r"\s*[:-]\s*",
            PRE + n + r"\s+",
        ]
        for p in pats:
            new = re.sub(r"^" + p, "", s, count=1, flags=re.I)
            if new != s:
                return new
    return s


def make_desc(abstract, name):
    """从摘要提取方法定义句，压成名词短语风格（对齐现有 desc 写法）。"""
    a = clean(abstract)
    sents = re.split(r"(?<=[.!?])\s+", a)
    pick = None
    lead = re.compile(
        r"^(?:in this (?:paper|work),?\s+)?(?:we|the authors|here we)\s+"
        r"(?:further\s+|also\s+)?(?:introduce|present|propose|put forward|develop)\b", re.I)
    for s in sents:
        if lead.match(s.strip()):
            pick = s.strip()
            break
    if pick is None:
        # 退化：找含 <Name> 的首句
        for s in sents:
            if name.lower() in s.lower():
                pick = s.strip()
                break
    if pick is None:
        pick = sents[0].strip() if sents else ""

    # 剥离 "We present X (...), " 引导语
    pick = lead.sub("", pick).strip()
    pick = re.sub(r"^(?:,|;|:|\s)+", "", pick)
    # 去掉名称及其同位语（含括号解释），保留定义部分
    pick = strip_name(pick, name)
    pick = re.sub(r"^\s*(?:an?|the|which|that|which,)\s+", "", pick, flags=re.I)
    pick = re.sub(r"^\s*which\s+", "", pick, flags=re.I)
    pick = pick.strip().rstrip(".")
    if not pick:
        pick = clean(abstract)[:200]
    # 首字母大写
    pick = pick[0].upper() + pick[1:] if pick else pick
    # 长度控制：在句子边界/逗号处截断
    if len(pick) > 230:
        cut = pick[:230]
        for sep in ("; ", ", ", " "):
            p = cut.rfind(sep)
            if p > 140:
                cut = cut[:p]
                break
        pick = cut.rstrip(",;: ")
    return pick


def _match(text):
    for cat, pat in CAT_RULES:
        if re.search(pat, text, re.I):
            return cat
    return None


def classify(title, abstract):
    """标题优先，标题不命中再退回摘要前半段。

    摘要里 'simulation' / 'robot' 等词出现频率极高，直接用于分类会把大量方法
    误分到 Simulation / Embodied AI；而标题通常准确概括领域，故优先用标题。
    """
    t = clean(title).lower()
    c = _match(t)
    if c:
        return c
    head = clean(abstract)[:360].lower()
    c = _match(head)
    if c:
        return c
    return _match(clean(abstract).lower()) or CAT_FALLBACK


def main(apply=False):
    acc = json.load(io.open(ACC, encoding="utf-8"))
    cand = json.load(io.open(CAND, encoding="utf-8"))
    by_id = {p["id"]: p for p in cand["papers"]}

    with io.open(JSON, encoding="utf-8") as f:
        d = json.load(f)
    methods = d["methods"]
    known_id = {re.sub(r"v\d+$", "", (m.get("arxiv_id") or "")) for m in methods if m.get("arxiv_id")}
    known_name = {re.sub(r"[^a-z0-9]", "", m["name"].lower()) for m in methods}

    items = []
    vetoed = 0
    for a in acc:
        if a["id"] in VETO:
            vetoed += 1
            continue
        items.append({"id": a["id"], "name": a["name"], "title": a["title"],
                      "abstract": a["abstract"], "published": a["published"], "forced": None})
    cur_added = 0
    for pid, (nm, cat) in CURATED.items():
        p = by_id.get(pid)
        if not p:
            print(f"  [warn] 白名单条目不在候选池: {pid}")
            continue
        if any(x["id"] == pid for x in items):
            continue  # 已被规则收录
        items.append({"id": pid, "name": nm, "title": clean(p["title"]),
                      "abstract": p["abstract"], "published": p["published"], "forced": cat})
        cur_added += 1

    new = []
    seen = set()
    for it in items:
        key = re.sub(r"[^a-z0-9]", "", it["name"].lower())
        if re.sub(r"v\d+$", "", it["id"]) in known_id or key in known_name or key in seen:
            continue
        seen.add(key)
        year = int(it["published"][:4]) if it["published"] else date.today().year
        cat = it["forced"] or classify(it["title"], it["abstract"])
        new.append({
            "name": it["name"],
            "arxiv_id": it["id"],
            "venue": f"arXiv {year}",
            "year": year,
            "category": cat,
            "desc": make_desc(it["abstract"], it["name"]),
            "code_url": "",
            "sources": ["arxiv-harvest"],
        })

    print(f"规则通过 {len(acc)} - 否决 {vetoed} + 白名单补录 {cur_added} -> "
          f"去重后实收 **{len(new)}** 条")
    print("\n分类分布（新增）：")
    for k, v in Counter(x["category"] for x in new).most_common():
        print(f"  {k:<34} {v}")
    print("\n=== 抽样 12 条 ===")
    for x in new[:12]:
        print(f"  {x['name'][:26]:<28} [{x['category'][:22]:<24}] {x['desc'][:105]}")

    if not apply:
        print("\n[DRY-RUN] 未写入（加 --apply 生效）")
        return

    methods.extend(new)
    methods.sort(key=lambda m: re.sub(r"[^a-z0-9]", "", m["name"].lower()))
    d["methods"] = methods
    d["count"] = len(methods)
    d["category_count"] = len({m["category"] for m in methods})
    bak = JSON + ".bak"
    with io.open(bak, "wb") as f:
        f.write(io.open(JSON, "rb").read())
    with io.open(JSON, "w", encoding="utf-8", newline="\n") as f:
        json.dump(d, f, ensure_ascii=False, indent=1)
    print(f"\n[APPLIED] methods.json: 700 -> {len(methods)} 条；分类 {d['category_count']}")


if __name__ == "__main__":
    main(apply="--apply" in sys.argv)
