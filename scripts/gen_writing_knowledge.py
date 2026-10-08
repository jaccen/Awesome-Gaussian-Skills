#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the writing-side knowledge fragment for cg-paper-writing.

Grounded strictly in the verified registry (data/methods.json), which was
arXiv-API verified (1372 unique IDs, 1371 reachable, see references/verification-report.md).
Emits references/3dgs-paper-knowledge.md — cluster-organized method landscape
plus curated datasets/metrics per cluster.

Rule: nothing here is invented. Method rows come straight from methods.json.
"""
import json, datetime

ROOT = "."
methods = json.load(open(f"{ROOT}/data/methods.json", encoding="utf-8"))["methods"]

CLUSTERS = [
    ("A", "基础表示 / 表面渲染 / 优化 / 加速",
     ["Foundation", "Optimization", "Surface & Rendering", "Acceleration"],
     "Mip-NeRF360、Tanks and Temples、Deep Blending、Blender synthetic、ScanNet++；"
     "指标以 PSNR/SSIM/LPIPS 为主，并须同时报告 FPS、#Gaussians（显存）与训练时长——"
     "该簇 reviewer 最在意「质量与资源的权衡」，只报 PSNR 会被质疑。",
     "链条写法：以 3DGS 为原点，按「基元退化/抗锯齿 → 密度控制 → 几何正则 → 硬件防御」分层递进，"
     "每层取本簇一条代表方法作为对照；写作时应给出显存/时长表，而非只列画质分数。"),
    ("B", "压缩与流式",
     ["Compression & Streaming"],
     "沿用 Mip-NeRF360 / Tanks and Temples；核心指标是压缩倍率（×）、画质损失（ΔPSNR/ΔdB）、"
     "解码与流化时延、存储体积（MB）。审稿人期待看到 rate–distortion 曲线与端到端时延，"
     "只给单一压缩比往往被认为评测不充分。",
     "对比务必放在同一压缩倍率下比画质（或同一画质下比体积）；若方法含熵编码/量化/剪枝多个模块，"
     "需补消融证明各模块对 RD 曲线的边际贡献。"),
    ("C", "动态与 4D",
     ["Dynamic & 4D"],
     "D-NeRF（合成）、HyperNeRF、NeRF-DS、NVIDIA DyNeRF、CMU-Panoptic；"
     "在 PSNR/SSIM/LPIPS 之外必须报告时序一致性与每帧优化/渲染耗时。",
     "写作要点：明确区分「形变场建模」与「4D 时空场」两条路线并说明选型理由；"
     "实验须覆盖刚体/非刚体、单目/多目场景，缺非刚体评测是常见硬伤。"),
    ("D", "前馈式 3DGS",
     ["Feed-Forward"],
     "RealEstate10K、ACID、DTU、Objaverse、ScanNet；"
     "关键指标是**跨数据集泛化**（未在评测域上训练）的 PSNR/SSIM/LPIPS，以及推理时延；"
     "因无 per-scene 优化，务必强调「零优化时间」这一卖点。",
     "定位时抓住「是否依赖位姿」「单图/稀疏视图输入」「能否跨域泛化」三个维度；"
     "若不依赖相机位姿需显式对照依赖位姿的同类方法，这是本簇最有力的创新切口。"),
    ("E", "稀疏视角 / SLAM",
     ["Sparse-View", "SLAM"],
     "DTU、Tanks and Temples、ScanNet/ScanNet++、Replica、TUM-RGBD、mip-NeRF360；"
     "SLAM 侧核心遥测是 ATE RMSE（轨迹误差），重建侧是 Chamfer distance 与 PSNR，"
     "并须报告跟踪 FPS 与显存峰值。",
     "两条主线要分开写：纯重建（few-shot NVS）强调几何监督；SLAM 强调在线跟踪与闭环。"
     "混淆二者是常见写作错误；COLMAP-free 方法须额外声明不依赖外部位姿。"),
    ("F", "具身智能 / 自动驾驶",
     ["Embodied AI & Robotics", "Autonomous Driving"],
     "nuScenes、Waymo Open、KITTI-360、AI2-THOR / Habitat；"
     "指标随任务而异：BEV/占据分割用 IoU、mIoU，导航任务用成功率与 SPL，"
     "若含 NVS 则补 PSNR，并报告时延（自动驾驶侧硬约束）。",
     "务必把「3DGS 作为场景表示」与「下游任务收益」之间的桥写清楚——"
     "只在小规模/仿真环境验证而缺真实数据评测，是审稿常见拒稿点。"),
    ("G", "编辑 / 人体与化身 / 生成",
     ["Editing", "Human & Avatar", "Generation"],
     "Objaverse、ShapeNet、THuman、ZJU-MoCap、PeopleSnapshot；"
     "除 PSNR/SSIM/LPIPS 外，生成类须报 FID/KID 与 CLIP score，"
     "编辑/风格迁移类常配用户偏好 study 作为主观补充。",
     "工作现实的抓手：区分「编辑的局部性与一致性」和「生成的多样性与保真度」两组矛盾；"
     "若用 2D 扩散先验，须说明如何缓解多视角不一致（Janus 问题）。"),
    ("H", "语义 / 跨域 / HDR 重光照",
     ["Language & Semantic", "Cross-Domain", "HDR & Relighting"],
     "ScanNet（语义）、nuScenes（LiDAR 跨域）、以及遥感/医学/显微等跨域数据；"
     "语义侧用 mIoU 与开放词汇检索指标，成像跨域用 PSNR/SSIM 与下游任务指标，"
     "HDR 侧关注 ΔE 色差、HDR-VDP 或多曝光 PSNR。",
     "跨域是本簇最大机会：写清楚「把 GS 引入某新模态解决了该模态什么固有痛点」；"
     "语义/语言类需特别注意评测协议是否与 FEATURE-3DGS 系列对齐，否则难以公平比较。"),
    ("I", "CAD / 大场景 / 仿真 / 安全 / 世界模型",
     ["CAD & Reverse Engineering", "Large-Scale", "Simulation", "Security",
      "World Models & Spatial Intelligence", "Robustness"],
     "ABC / ShapeNet（CAD 与逆向工程）、UrbanScene3D / MatrixCity（大场景）、GSO（仿真资产）；"
     "几何重建用 Chamfer / mesh IoU，大场景强调显存峰值与分块策略，"
     "水印/对抗类报攻击成功率与不可感知性（PSNR），世界模型类则开始出现场景图/规划类涌现指标。",
     "这是最「新」也最缺标准的一簇：若选题在此，务必自己定义清楚评测协议并给出理由，"
     "同时对照邻近成熟簇（如 SLAM / 生成）的评测做交叉验证，避免审稿人质疑指标不自洽。"),
]

TOP_VENUES = ["CVPR", "ICCV", "ECCV", "SIGGRAPH", "NEURIPS", "ICML", "ICLR",
              "TPAMI", "TVCG", "TOG", "AAAI", "ACM MM", "IROS", "ICRA", "RAL", "T-RO"]

def in_top(v):
    return any(t in (v or "").upper() for t in TOP_VENUES)

lines = []
lines.append("# 3DGS 论文知识库（写作侧）· 9 簇方法格局\n")
lines.append("> **用途**：为 related-work 定位、方法对比、**基线选择**与**实验设计**提供已核验的方法格局。"
             "写作 3DGS/NeRF 论文的 related work 或实验章节时加载。")
lines.append(">\n> **数据来源与可信度**：本文件所有方法行均由脚本从技能所在工程的 `data/methods.json`"
             "（**单一事实源**）程序化提取，该库已通过 arXiv API 批量核验"
             "（唯一 ID 1372 个，可达 1371 个，见 `references/verification-report.md`）。"
             "生成日期 " + datetime.date.today().isoformat() + "。")
lines.append(">\n> **与 `<审核>` 的分工**：本文件是「写着什么/比什么」的知识面；"
             "引用是否真实由 `references/3dgs-citation-audit.md` 的方法做实时校验。")
lines.append(">\n> **深读笔记**：更细的逐篇笔记（含创新点拆解与实验分析）在工程 "
             "`references/paper-reading-knowledge-base.md`（9 簇/1678 行），本文件是其 20% 高密度提炼版。")
lines.append("\n> **红线**：本知识库只含 arXiv 已核验条目；任何表中未出现的方法/编号，"
             "如需引用必须先过 `3dgs-citation-audit.md` 的三层校验，不得凭记忆补写。\n>\n> **重要（引用前必读）**：表中「发表场所」取自 `methods.json` 的**登记值**，其中部分 venue 属待核/有误状态——历史核查已证实过实例：HybridGS 曾误标 CVPR 2025（实为 ICML 2025）、GaussianBeV 曾误标 ECCV 2024（实为 WACV 2025）、GS-Physics 实为 Thermal3D-GS 且应属 ECCV 2024（当时还误标为 CVPR 2025）。**正式引用前务必用 `3dgs-citation-audit.md` 的方法复核「方法名 ↔ arXiv 编号 ↔ venue」三者一致性**，切勿把本表 venue 直接当作已核事实写进文献列表。\n")

lines.append("\n---\n")
lines.append(f"\n## 规模口径\n")
lines.append(f"- 方法总数 **{len(methods)}**，分类 **23** 类，其中 {sum(1 for m in methods if m.get('arxiv_id'))} 条持有 arXiv 编号"
             f"（其余 {sum(1 for m in methods if not m.get('arxiv_id'))} 条为预印/项目页方法，未登记编号）。")
lines.append("- 下表每簇列出**已核验且有 arXiv 编号**的代表性方法；同簇条目可直接作为对照基线候选。\n")

for tag, title, cats, evals, hook in CLUSTERS:
    sel = [m for m in methods if m.get("category") in cats and m.get("arxiv_id")]
    # representative: top-venue first, then by year
    sel.sort(key=lambda x: (not in_top(x.get("venue", "")), x.get("year", 0), x.get("name", "")))
    shown = sel[:14]
    lines.append(f"\n## 簇 {tag} · {title}\n")
    lines.append(f"**涵盖分类**：{'、'.join(cats)}　（本簇已核验方法 **{len(sel)}** 条）\n")
    lines.append(f"\n**常用数据集与指标**：{evals}\n")
    lines.append(f"\n**写作可嫁接点**：{hook}\n")
    lines.append("\n**代表性方法（源自已核验 registry）**\n")
    lines.append("| 方法 | arXiv | 发表场所 | 核心思路（据 methods.json desc） |")
    lines.append("|---|---|---|---|")
    for m in shown:
        desc = (m.get("desc") or "").replace("|", "/")
        if len(desc) > 110:
            desc = desc[:107] + "…"
        lines.append(f"| {m.get('name','')} | `{m.get('arxiv_id','')}` | {m.get('venue','')} | {desc} |")
    if len(sel) > len(shown):
        lines.append(f"\n*（本簇另有 {len(sel)-len(shown)} 条已核验方法，未在上述表格中列出；"
                     f"需要完整清单请直接查 `data/methods.json`，或用 `scripts/audit_manuscript_citations.py` 检索。）*")
    lines.append("")

lines.append("\n---\n")
lines.append("\n## 使用约定\n")
lines.append("1. **先定位后引用**：写 related work 时先在对应簇表格里确认方法归属与编号，再落笔。")
lines.append("2. **基线要同源**：性能对照优先取同簇、同期、已核验条目；跨簇比对须说明可比性。")
lines.append("3. **指标要成套**：按各簇「常用数据集与指标」节成套报告，避免只报单一分数被质疑评测不充分。 ")
lines.append("4. **不确定即停用**：表中没有的方法/编号，先经 `3dgs-citation-audit.md` 校验；"
             "无法核实的宁可删引，不可凭印象补写（本项目核查协议第 6 条）。")

out = "\n".join(lines)
open(f"{ROOT}/skills/cg-paper-writing/references/3dgs-paper-knowledge.md", "w",
     encoding="utf-8", newline="").write(out)
print("written:", len(lines), "lines ->", "skills/cg-paper-writing/references/3dgs-paper-knowledge.md")
