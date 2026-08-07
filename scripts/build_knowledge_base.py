#!/usr/bin/env python3
"""
build_knowledge_base.py — Awesome-Gaussian-Skills 单一数据源构建器 (P0)

功能：
  1. 合并四套历史数据载体（CSV / docs/index.html METHODS / docs/abstracts.js）为单一数据源
  2. 清除已证伪的伪造条目（黑名单）
  3. 按 (名称, arXiv ID) 双键去重
  4. 类别标签归一化到规范 taxonomy（data/categories.json）
  5. 追加经 arXiv 原文核验的前沿条目（frontier batch）
  6. 重新生成全部下游载体：data/methods.json(真源) / 3dgs-methods-overview.csv /
     docs/abstracts.js / docs/index.html 内嵌 METHODS 数组

用法：
  python3 scripts/build_knowledge_base.py --report    # 只解析并打印统计，不写文件
  python3 scripts/build_knowledge_base.py             # 执行完整构建
"""
import csv
import html as html_mod
import io
import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "3dgs-methods-overview.csv"
INDEX_HTML = ROOT / "docs" / "index.html"
ABSTRACTS_JS = ROOT / "docs" / "abstracts.js"
DATA_DIR = ROOT / "data"
METHODS_JSON = DATA_DIR / "methods.json"
CATEGORIES_JSON = DATA_DIR / "categories.json"

# ---------------------------------------------------------------- 黑名单
# 2026-08 审查确证的伪造条目：虚构方法名挂在真实 arXiv ID 上
FABRICATED_BLACKLIST = {
    "gs-lrm-v2",          # 所挂 arXiv 2405.17351 实为 DOF-GS
    "gs-lrm-full",        # 所挂 arXiv 2408.07967 实为 FlashGS
    "mvsplat-v2",         # 所挂 arXiv 2412.16028 实为 CoCoGaussian
    "gpsgaussian-stereo", # 所挂 arXiv 2403.11831 实为 BAD-Gaussians
    "gaussiancross",      # 所挂 arXiv 2405.17811 实为 Mani-GS
}

# ------------------------------------------------- 经 arXiv 原文核验的前沿条目 (2026-08)
# 每条均通过 arxiv.org/abs 页面标题比对核验，venue 经 dblp/CVF/proceedings 交叉核实
FRONTIER_BATCH = [
    {"name": "VGGT", "arxiv_id": "2503.11651", "venue": "CVPR 2025", "year": 2025, "category": "Feed-Forward", "core_innovation": "Visual Geometry Grounded Transformer：单一 Transformer 从任意多视图图像一次性前馈预测相机参数、点图、深度与 3DGS 参数（multi-task feed-forward）", "code_url": "https://github.com/facebookresearch/vggt"},
    {"name": "CUT3R", "arxiv_id": "2501.12387", "venue": "CVPR 2025", "year": 2025, "category": "Feed-Forward", "core_innovation": "具有持久状态的连续 3D 感知模型，以循环点云 token 增量更新全局状态实现视频流式几何理解（persistent state, point cloud tokens）", "code_url": "https://github.com/CUT3R/CUT3R"},
    {"name": "Spann3R", "arxiv_id": "2408.16061", "venue": "3DV 2025", "year": 2025, "category": "Feed-Forward", "core_innovation": "在 DUSt3R 基础上引入空间记忆模块，对任意长度帧序列做增量式前馈稠密重建，无需全局优化（spatial memory, incremental reconstruction）", "code_url": "https://github.com/HengyiWang/spann3r"},
    {"name": "MonST3R", "arxiv_id": "2410.03825", "venue": "ICLR 2025", "year": 2025, "category": "Feed-Forward", "core_innovation": "将 DUSt3R 范式扩展到含运动场景，直接估计动态场景几何并支持动态视频相机位姿恢复（geometry in the presence of motion）", "code_url": "https://github.com/Junyi42/monst3r"},
    {"name": "NoPoSplat", "arxiv_id": "2410.24207", "venue": "ICLR 2025", "year": 2025, "category": "Feed-Forward", "core_innovation": "无需任何相机位姿输入的稀疏视图前馈 3DGS 重建，以规范化视图对齐高斯实现无监督训练（unposed images, canonical view）", "code_url": "https://github.com/cvg/NoPoSplat"},
    {"name": "Flash3D", "arxiv_id": "2406.04343", "venue": "3DV 2025", "year": 2025, "category": "Feed-Forward", "core_innovation": "利用预训练自监督扩散先验特征做单图前馈多视图场景重建，兼顾效率与泛化（single image, pretrained diffusion prior）", "code_url": "https://github.com/eldar/flash3d"},
    {"name": "CAT3D", "arxiv_id": "2405.10314", "venue": "NeurIPS 2024", "year": 2024, "category": "Feed-Forward", "core_innovation": "多视图扩散模型迭代生成新视角 + 两阶段优化重建任意 3D 内容（multi-view diffusion prior, two-stage）", "code_url": ""},
    {"name": "Splatt3R", "arxiv_id": "2408.13912", "venue": "arXiv preprint", "year": 2024, "category": "Feed-Forward", "core_innovation": "扩展 MASt3R 从无标定图像对零样本直接前馈预测 3D Gaussian（extends MASt3R, zero-shot）", "code_url": "https://github.com/btsmart/splatt3r"},
    {"name": "ReconFusion", "arxiv_id": "2312.02981", "venue": "CVPR 2024", "year": 2024, "category": "Feed-Forward", "core_innovation": "以扩散模型为正则化先验，从 3–9 张稀疏图像推断稠密深度与新视角重建（diffusion prior, sparse-view）", "code_url": ""},
    {"name": "pixelSplat", "arxiv_id": "2312.12337", "venue": "CVPR 2024", "year": 2024, "category": "Feed-Forward", "core_innovation": "从图像对前馈学习像素对齐的 3D 高斯概率预测，epipolar transformer 支持可扩展泛化重建（pixel-aligned Gaussians）", "code_url": "https://github.com/dcharatan/pixelsplat"},
    {"name": "MVSplat", "arxiv_id": "2403.14627", "venue": "ECCV 2024", "year": 2024, "category": "Feed-Forward", "core_innovation": "交叉注意力图像融合 + 代价体素深度细化的高效稀疏视图 3DGS 前馈预测（cross-attention, cost volume）", "code_url": "https://github.com/donydchen/mvsplat"},
    {"name": "LatentSplat", "arxiv_id": "2403.16292", "venue": "ECCV 2024", "year": 2024, "category": "Feed-Forward", "core_innovation": "在压缩潜空间中以变分自编码器预测高斯，降低显存并提升泛化与重建质量（latent space, variational Gaussians）", "code_url": "https://github.com/Chrixtar/latentsplat"},
    {"name": "GS-LRM", "arxiv_id": "2404.19702", "venue": "ECCV 2024", "year": 2024, "category": "Feed-Forward", "core_innovation": "纯 Transformer 大重建模型，图像 patch token 直接回归每像素 3DGS 参数，实时可扩展（Large Reconstruction Model）", "code_url": ""},
    {"name": "PhysGaussian", "arxiv_id": "2311.12198", "venue": "CVPR 2024", "year": 2024, "category": "Dynamic", "core_innovation": "将连续介质力学 MPM 直接嵌入 3D 高斯粒子，免神经网络实现物理一致的动态场景仿真与生成（Material Point Method）", "code_url": "https://github.com/XPandora/PhysGaussian"},
    {"name": "Shape of Motion", "arxiv_id": "2407.13764", "venue": "ICCV 2025", "year": 2025, "category": "Dynamic", "core_innovation": "从单目视频以全局相机运动 + 少量刚性运动基组合表征动态场景，用 2D 高斯溅射重建 4D（motion bases, single video）", "code_url": "https://github.com/vye16/shape-of-motion"},
    {"name": "4DGen", "arxiv_id": "2312.17225", "venue": "arXiv preprint", "year": 2023, "category": "Dynamic", "core_innovation": "以锚定多视图视频为接地，用时空 2D 扩散监督实现可控、少幻觉的 4D 内容生成（grounded 4D generation）", "code_url": "https://github.com/VITA-Group/4DGen"},
    {"name": "DreamGaussian4D", "arxiv_id": "2312.17142", "venue": "arXiv preprint", "year": 2023, "category": "Dynamic", "core_innovation": "两阶段文本到 4D 框架：先生成动态视频再蒸馏为 4D 高斯，仅数分钟完成生成（video-to-4D distillation）", "code_url": "https://github.com/jiawei-ren/dreamgaussian4d"},
    {"name": "TC4D", "arxiv_id": "2403.17920", "venue": "ECCV 2024", "year": 2024, "category": "Dynamic", "core_innovation": "轨迹条件驱动的文本到 4D 生成，分段优化动态高斯场以保证时空一致性（trajectory-conditioned, text-to-4D）", "code_url": "https://github.com/sherwinbahmani/tc4d"},
    {"name": "Comp4D", "arxiv_id": "2403.16993", "venue": "WACV 2026", "year": 2026, "category": "Dynamic", "core_innovation": "LLM 规划场景布局与运动轨迹，组合多个已优化 4D 资产生成可组合 4D 场景（LLM-guided, compositional 4D）", "code_url": "https://github.com/VITA-Group/Comp4D"},
    {"name": "GSMem", "arxiv_id": "2603.19137", "venue": "arXiv preprint", "year": 2026, "category": "Embodied AI / Robotics", "core_innovation": "将 3DGS 作为具身智能体的持久空间记忆，支持零样本探索与空间推理（persistent spatial memory, zero-shot embodied exploration）", "code_url": "https://github.com/vulab-AI/GSMem"},
]

# ------------------------------------------------- 类别归一化映射
# 将历史 87 种 CSV 标签 / 44 种 explorer 标签归一到规范 taxonomy
CANONICAL_CATEGORIES = [
    "Foundation", "Antialiasing", "Optimization", "Surface & Rendering",
    "Compression & Streaming", "Acceleration", "Large-Scale", "Feed-Forward",
    "Language & Semantic", "Generation", "Autonomous Driving", "Dynamic & 4D",
    "HDR & Relighting", "SLAM", "Sparse-View", "World Models & Spatial Intelligence",
    "Human & Avatar", "Editing", "CAD & Reverse Engineering", "Cross-Domain",
    "Simulation", "Embodied AI & Robotics", "Robustness", "Security", "Event Camera",
]

CATEGORY_MAP = {
    # --- Foundation 族
    "foundation": "Foundation", "foundation methods": "Foundation",
    "core": "Foundation", "representation": "Foundation",
    "image representation": "Foundation", "2d representation": "Foundation",
    # --- Antialiasing
    "antialiasing": "Antialiasing", "anti-aliasing": "Antialiasing",
    # --- Optimization
    "optimization": "Optimization", "training": "Optimization",
    "density control": "Optimization", "regularization": "Optimization",
    "robustness & regularization": "Optimization",
    # --- Surface & Rendering
    "surface": "Surface & Rendering", "surface / rendering": "Surface & Rendering",
    "surface/rendering": "Surface & Rendering", "rendering": "Surface & Rendering",
    "rendering formulation": "Surface & Rendering", "mesh": "Surface & Rendering",
    "surface reconstruction": "Surface & Rendering", "geometry": "Surface & Rendering",
    # --- Compression & Streaming
    "compression": "Compression & Streaming", "compression / streaming": "Compression & Streaming",
    "compression/streaming": "Compression & Streaming", "streaming": "Compression & Streaming",
    "lightweight": "Compression & Streaming", "mobile": "Compression & Streaming",
    # --- Acceleration
    "acceleration": "Acceleration", "efficiency": "Acceleration",
    "hardware": "Acceleration", "real-time": "Acceleration",
    # --- Large-Scale
    "large-scale": "Large-Scale", "large scale": "Large-Scale",
    "city-scale": "Large-Scale", "unbounded": "Large-Scale",
    # --- Feed-Forward
    "feed-forward": "Feed-Forward", "feed forward": "Feed-Forward",
    "feed-forward / generalizable": "Feed-Forward", "generalizable": "Feed-Forward",
    "sparse-view feed-forward": "Feed-Forward", "lrm": "Feed-Forward",
    # --- Language & Semantic
    "language / semantic": "Language & Semantic", "language/semantic": "Language & Semantic",
    "semantic": "Language & Semantic", "segmentation": "Language & Semantic",
    "language": "Language & Semantic", "open-vocabulary": "Language & Semantic",
    "feature distillation": "Language & Semantic",
    # --- Generation
    "generation": "Generation", "generation / text-to-3d": "Generation",
    "text-to-3d": "Generation", "image-to-3d": "Generation", "video-to-3d": "Generation",
    "3d generation": "Generation", "procedural": "Generation",
    # --- Autonomous Driving
    "autonomous driving": "Autonomous Driving", "driving": "Autonomous Driving",
    "street": "Autonomous Driving",
    # --- Dynamic & 4D
    "dynamic": "Dynamic & 4D", "dynamic / 4d": "Dynamic & 4D", "4d": "Dynamic & 4D",
    "dynamic & hdr": "Dynamic & 4D", "deformation": "Dynamic & 4D",
    "video": "Dynamic & 4D",
    # --- HDR & Relighting
    "hdr": "HDR & Relighting", "hdr / dynamic": "HDR & Relighting",
    "relighting": "HDR & Relighting", "material": "HDR & Relighting",
    "inverse rendering": "HDR & Relighting", "appearance": "HDR & Relighting",
    # --- SLAM
    "slam": "SLAM", "localization": "SLAM", "tracking": "SLAM",
    # --- Sparse-View
    "sparse-view": "Sparse-View", "sparse view": "Sparse-View",
    "few-shot": "Sparse-View", "single-view": "Sparse-View",
    # --- World Models & Spatial Intelligence
    "spatial intelligence": "World Models & Spatial Intelligence",
    "spatial intelligence & world model": "World Models & Spatial Intelligence",
    "world model": "World Models & Spatial Intelligence",
    "world models": "World Models & Spatial Intelligence",
    "world models & spatial intelligence": "World Models & Spatial Intelligence",
    "scene graph": "World Models & Spatial Intelligence",
    # --- Human & Avatar
    "human / avatar": "Human & Avatar", "human/avatar": "Human & Avatar",
    "avatar": "Human & Avatar", "human": "Human & Avatar",
    "talking head": "Human & Avatar", "hand": "Human & Avatar",
    "cloth": "Human & Avatar", "hair": "Human & Avatar",
    # --- Editing
    "editing": "Editing", "scene editing": "Editing", "interactive": "Editing",
    # --- CAD & Reverse Engineering
    "cad": "CAD & Reverse Engineering", "cad / mesh": "CAD & Reverse Engineering",
    "cad/mesh": "CAD & Reverse Engineering", "b-rep": "CAD & Reverse Engineering",
    "cad / mesh / hybrid methods": "CAD & Reverse Engineering",
    "cad / mesh / hybrid": "CAD & Reverse Engineering",
    "cad / procedural 3d": "CAD & Reverse Engineering",
    "cad methods": "CAD & Reverse Engineering",
    "sfm-free": "Feed-Forward",
    # --- Cross-Domain
    "cross-domain": "Cross-Domain", "cross domain": "Cross-Domain",
    "multi-modal": "Cross-Domain", "medical": "Cross-Domain",
    "underwater": "Cross-Domain", "aerial": "Cross-Domain", "satellite": "Cross-Domain",
    "event camera & thermal": "Cross-Domain",
    # --- Simulation
    "simulation": "Simulation", "physics": "Simulation",
    "differentiable physics": "Simulation", "fluid": "Simulation",
    # --- Embodied AI & Robotics
    "simulation & robotics": "Embodied AI & Robotics",
    "simulation and robotics": "Embodied AI & Robotics",
    "robotics & simulation": "Embodied AI & Robotics",
    "embodied / autonomous driving": "Embodied AI & Robotics",
    "embodied/autonomous driving": "Embodied AI & Robotics",
    "embodied ai / robotics": "Embodied AI & Robotics",
    "embodied ai/robotics": "Embodied AI & Robotics",
    "robotics": "Embodied AI & Robotics", "embodied": "Embodied AI & Robotics",
    "navigation": "Embodied AI & Robotics", "manipulation": "Embodied AI & Robotics",
    "grasping": "Embodied AI & Robotics", "articulated / digital twin": "Embodied AI & Robotics",
    "articulated/digital twin": "Embodied AI & Robotics",
    "articulated": "Embodied AI & Robotics", "digital twin": "Embodied AI & Robotics",
    # --- Robustness
    "robustness": "Robustness", "in-the-wild": "Robustness",
    "degradation": "Robustness", "restoration": "Robustness",
    # --- Security
    "security": "Security", "watermarking": "Security", "protection": "Security",
    "copyright": "Security",
    # --- Event Camera
    "event camera": "Event Camera", "event": "Event Camera", "neuromorphic": "Event Camera",
    # --- 其他历史标签兜底
    "survey": "Foundation", "benchmark": "Foundation", "dataset": "Foundation",
    "applications": "Cross-Domain", "applications/mr": "Cross-Domain",
    "applications/deblurring": "Robustness",
    "systems": "Acceleration", "deployment": "Compression & Streaming",
    "quality": "Optimization", "uncertainty": "Optimization",
    "point cloud": "Surface & Rendering", "depth": "Sparse-View",
    "pose": "SLAM", "camera": "SLAM", "reflection": "Cross-Domain",
    "transparency": "Cross-Domain", "specular": "HDR & Relighting",
    "shadow": "HDR & Relighting", "texture": "Surface & Rendering",
    "style transfer": "Editing", "colorization": "Editing",
    "audio": "Cross-Domain", "tactile": "Embodied AI & Robotics",
    "surgical": "Cross-Domain", "endoscopy": "Cross-Domain",
    "remote sensing": "Cross-Domain", "cultural heritage": "Cross-Domain",
    "art": "Cross-Domain", "food": "Cross-Domain",
}


def norm_name(name: str) -> str:
    return re.sub(r"\s+", "", html_mod.unescape(name)).casefold()


def parse_csv():
    rows = {}
    with open(CSV_PATH, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            name = html_mod.unescape((row.get("method") or "").strip())
            if not name:
                continue
            key = norm_name(name)
            rec = {
                "name": name,
                "arxiv_id": (row.get("arxiv_id") or "").strip(),
                "venue": html_mod.unescape((row.get("venue") or "").strip()),
                "year": (row.get("year") or "").strip(),
                "category": html_mod.unescape((row.get("category") or "").strip()),
                "desc": html_mod.unescape((row.get("core_innovation") or "").strip()),
                "code_url": (row.get("code_url") or "").strip(),
                "sources": ["csv"],
            }
            if key in rows:  # CSV 内部重复，保留字段更全者
                old = rows[key]
                if len(rec["desc"]) > len(old["desc"]):
                    rec["sources"] = old["sources"] + ["csv-dup"]
                    rows[key] = rec
            else:
                rows[key] = rec
    return rows


ENTRY_START = re.compile(r'^\s*\{ name: "((?:[^"\\]|\\.)*)"')

def parse_index_html():
    text = INDEX_HTML.read_text(encoding="utf-8")
    block = text.split("const METHODS = [", 1)[1].split("\n];", 1)[0]
    entries = {}
    for line in block.split("\n"):
        m = ENTRY_START.match(line)
        if not m:
            continue
        name = m.group(1)

        def field(pat, default=""):
            mm = re.search(pat, line)
            return mm.group(1) if mm else default

        entries[norm_name(name)] = {
            "name": name,
            "short": field(r'short: "((?:[^"\\]|\\.)*)"'),
            "cat": field(r'cat: "((?:[^"\\]|\\.)*)"'),
            "venue": field(r'venue: "((?:[^"\\]|\\.)*)"'),
            "year": field(r"year: (\d{4})"),
            # desc 用贪婪匹配到最后一个 '", arxiv' 边界，容忍 desc 内未转义引号
            "desc": field(r'desc: "(.*)", arxiv: '),
            "arxiv_id": field(r'arxiv: "([^"]*)"'),
            "sources": ["explorer"],
        }
    return entries


def parse_abstracts():
    text = ABSTRACTS_JS.read_text(encoding="utf-8")
    out = {}
    for m in re.finditer(
        r'"((?:[^"\\]|\\.)*)":\s*\{\s*abstractEn:\s*"((?:[^"\\]|\\.)*)"\s*,\s*abstractCn:\s*"((?:[^"\\]|\\.)*)"\s*\}',
        text,
    ):
        name, en, cn = m.group(1), m.group(2), m.group(3)
        if "[Abstract pending]" in en or "[Abstract pending]" in cn:
            en, cn = "", ""
        out[norm_name(name)] = {"abstractEn": en, "abstractCn": cn}
    return out


def canon(cat_raw: str) -> str:
    key = html_mod.unescape(cat_raw).strip().casefold()
    key = re.sub(r"\s+", " ", key)
    if key in CATEGORY_MAP:
        return CATEGORY_MAP[key]
    # 模糊兜底：最长匹配键优先（避免 "mesh" 抢先命中 "cad / mesh / hybrid"）
    best_k, best_v = "", ""
    for k, v in CATEGORY_MAP.items():
        if k and (k in key or key in k) and len(k) > len(best_k):
            best_k, best_v = k, v
    return best_v


def merge(csv_rows, explorer_rows):
    merged = {}
    for key, rec in explorer_rows.items():
        merged[key] = dict(rec)
    for key, rec in csv_rows.items():
        if key not in merged:
            merged[key] = dict(rec)
        else:
            m = merged[key]
            m["sources"].append("csv")
            if not m.get("arxiv_id"):
                m["arxiv_id"] = rec["arxiv_id"]
            if not m.get("code_url"):
                m["code_url"] = rec["code_url"]
            # venue：CSV 更完整（含年份与奖项），优先
            if rec.get("venue") and len(rec["venue"]) > len(m.get("venue", "")):
                m["venue"] = rec["venue"]
            if not m.get("year") and rec.get("year"):
                m["year"] = rec["year"]
            # desc 取更长者
            if len(rec.get("desc", "")) > len(m.get("desc", "")):
                m["desc"] = rec["desc"]
            m["_csv_category"] = rec.get("category", "")
    return merged


def build(report_only=False):
    csv_rows = parse_csv()
    explorer_rows = parse_index_html()
    abstracts = parse_abstracts()
    print(f"[parse] CSV rows: {len(csv_rows)} | explorer entries: {len(explorer_rows)} | abstracts: {len(abstracts)}")

    merged = merge(csv_rows, explorer_rows)
    print(f"[merge] union: {len(merged)}")

    # 1) 黑名单清除
    removed = []
    for b in FABRICATED_BLACKLIST:
        if b in merged:
            removed.append(merged.pop(b)["name"])
    print(f"[blacklist] removed fabricated entries: {removed}")

    # 1.5) 同 arXiv ID 别名合并：同一 arXiv ID 的多个条目视为同一论文的重复别名
    by_id = {}
    for key, rec in merged.items():
        aid = rec.get("arxiv_id", "")
        if aid:
            by_id.setdefault(aid, []).append(key)
    alias_merged = []
    for aid, keys in by_id.items():
        if len(keys) < 2:
            continue
        recs = [(merged[k], k) for k in keys]
        # 保留：来源最多 → 名称最短 → 描述最长
        recs.sort(key=lambda t: (-len(t[0].get("sources", [])), len(t[0]["name"]), -len(t[0].get("desc", ""))))
        keep, keep_key = recs[0]
        for other, okey in recs[1:]:
            for f in ("code_url", "venue", "year", "desc", "cat", "_csv_category"):
                if not keep.get(f) and other.get(f):
                    keep[f] = other[f]
            if len(other.get("desc", "")) > len(keep.get("desc", "")):
                keep["desc"] = other["desc"]
            keep["sources"] = sorted(set(keep.get("sources", []) + other.get("sources", []) + [f"alias:{other['name']}"]))
            del merged[okey]
            alias_merged.append(f"{other['name']} -> {keep['name']}")
    print(f"[alias] 同 arXiv ID 合并: {alias_merged if alias_merged else '无'}")

    # 2) 前沿批次追加（跳过已存在的同名/同 arXiv 条目）
    existing_arxiv = {r.get("arxiv_id") for r in merged.values() if r.get("arxiv_id")}
    added = []
    for e in FRONTIER_BATCH:
        key = norm_name(e["name"])
        if key in merged or e["arxiv_id"] in existing_arxiv:
            continue
        rec = dict(e, sources=["frontier-verified-2026-08"])
        merged[key] = rec
        existing_arxiv.add(e["arxiv_id"])
        added.append(e["name"])
    print(f"[frontier] added verified entries: {added}")

    # 3) 类别归一
    unmapped = {}
    for rec in merged.values():
        # CSV 标签更细粒度（如 "Simulation & Robotics"），优先于 explorer 粗粒度 cat
        raw = rec.get("_csv_category") or rec.get("category") or rec.get("cat") or ""
        c = canon(raw)
        if not c:
            unmapped[raw] = unmapped.get(raw, 0) + 1
            c = "Foundation"  # 兜底，报告里列出待人工确认
        rec["category"] = c

    # 4) arXiv ID 冲突检测（同 ID 不同名）
    seen_id = {}
    conflicts = []
    for rec in merged.values():
        aid = rec.get("arxiv_id", "")
        if aid:
            if aid in seen_id and seen_id[aid] != rec["name"]:
                conflicts.append((aid, seen_id[aid], rec["name"]))
            else:
                seen_id[aid] = rec["name"]
    print(f"[conflicts] arXiv ID 冲突: {conflicts if conflicts else '无'}")

    # 排序：类别 → 年份降序 → 名称
    methods = sorted(
        merged.values(),
        key=lambda r: (CANONICAL_CATEGORIES.index(r["category"])
                       if r["category"] in CANONICAL_CATEGORIES else 99,
                       -(int(r["year"]) if str(r["year"]).isdigit() else 0),
                       r["name"].casefold()),
    )

    cat_counts = {}
    for r in methods:
        cat_counts[r["category"]] = cat_counts.get(r["category"], 0) + 1

    print(f"\n[result] 总方法数: {len(methods)} | 类别数: {len(cat_counts)}")
    for c, n in sorted(cat_counts.items(), key=lambda x: -x[1]):
        print(f"  {c}: {n}")
    if unmapped:
        print(f"\n[warn] 未映射类别标签（已兜底为 Foundation，请补充映射）: {unmapped}")

    if report_only:
        return

    # ============ 写出 ============
    DATA_DIR.mkdir(exist_ok=True)

    clean = []
    for r in methods:
        clean.append({
            "name": r["name"],
            "arxiv_id": r.get("arxiv_id", ""),
            "venue": r.get("venue", ""),
            "year": int(r["year"]) if str(r.get("year", "")).isdigit() else 0,
            "category": r["category"],
            "desc": r.get("desc", ""),
            "code_url": r.get("code_url", ""),
            "sources": sorted(set(r.get("sources", []))),
        })

    METHODS_JSON.write_text(json.dumps({
        "generated_at": date.today().isoformat(),
        "generator": "scripts/build_knowledge_base.py",
        "count": len(clean),
        "category_count": len(cat_counts),
        "categories": {c: cat_counts[c] for c in CANONICAL_CATEGORIES if c in cat_counts},
        "methods": clean,
    }, ensure_ascii=False, indent=1), encoding="utf-8")

    CATEGORIES_JSON.write_text(json.dumps({
        "generated_at": date.today().isoformat(),
        "canonical": [c for c in CANONICAL_CATEGORIES if c in cat_counts],
        "counts": {c: cat_counts[c] for c in CANONICAL_CATEGORIES if c in cat_counts},
    }, ensure_ascii=False, indent=1), encoding="utf-8")

    # CSV 再生成
    buf = io.StringIO()
    w = csv.writer(buf, lineterminator="\n")
    w.writerow(["method", "arxiv_id", "venue", "year", "category", "core_innovation", "code_url"])
    for r in clean:
        w.writerow([r["name"], r["arxiv_id"], r["venue"], r["year"] or "", r["category"], r["desc"], r["code_url"]])
    CSV_PATH.write_text(buf.getvalue(), encoding="utf-8")

    # abstracts.js 再生成（保留真实摘要，缺失者留空而非占位假文）
    ab_lines = ["const ABSTRACTS = {"]
    for r in clean:
        ab = abstracts.get(norm_name(r["name"]), {"abstractEn": "", "abstractCn": ""})
        en = json.dumps(ab["abstractEn"], ensure_ascii=False)
        cn = json.dumps(ab["abstractCn"], ensure_ascii=False)
        ab_lines.append(f'  {json.dumps(r["name"], ensure_ascii=False)}: {{ abstractEn: {en}, abstractCn: {cn} }},')
    ab_lines.append("};")
    ABSTRACTS_JS.write_text("\n".join(ab_lines) + "\n", encoding="utf-8")

    # index.html METHODS 块再生成
    text = INDEX_HTML.read_text(encoding="utf-8")
    head, rest = text.split("const METHODS = [", 1)
    _, tail = rest.split("\n];", 1)
    lines = []
    for r in clean:
        venue_short = (r["venue"] or "arXiv").split()[0] if r["venue"] else "arXiv"
        venue_short = venue_short.rstrip(",")
        if venue_short.lower() in ("arxiv", "arxiv."):
            venue_short = "arXiv"
        desc = r["desc"].replace('"', "'")
        lines.append(
            f'  {{ name: {json.dumps(r["name"], ensure_ascii=False)}, '
            f'short: {json.dumps(r["name"], ensure_ascii=False)}, '
            f'cat: {json.dumps(r["category"], ensure_ascii=False)}, '
            f'venue: {json.dumps(venue_short, ensure_ascii=False)}, '
            f'year: {r["year"] or 2026}, '
            f'desc: {json.dumps(desc, ensure_ascii=False)}, '
            f'arxiv: {json.dumps(r["arxiv_id"], ensure_ascii=False)} , citations: 0 }},'
        )
    INDEX_HTML.write_text(head + "const METHODS = [\n" + "\n".join(lines) + "\n];" + tail, encoding="utf-8")

    print(f"\n[write] methods.json / CSV / abstracts.js / index.html 已全部再生成：{len(clean)} 条")


if __name__ == "__main__":
    build(report_only="--report" in sys.argv)
