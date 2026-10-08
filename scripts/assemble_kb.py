#!/usr/bin/env python3
# 将 9 份分簇研读笔记整合为统一知识库 references/paper-reading-knowledge-base.md
import os, json
ROOT = "C:/Users/Lenovo/Desktop/Project/Awesome-Gaussian-Skills"
REF = os.path.join(ROOT, "references")
CLUSTERS = [
    ("A_Found_Render_Opt_Acc", "簇一 · 基础表示 / 表面渲染 / 优化 / 加速"),
    ("B_Compression", "簇二 · 压缩与流式"),
    ("C_Dynamic4D", "簇三 · 动态与 4D"),
    ("D_FeedForward", "簇四 · 前馈式 3DGS"),
    ("E_Sparse_SLAM", "簇五 · 稀疏视角 / SLAM"),
    ("F_Embodied_Driving", "簇六 · 具身智能 / 自动驾驶"),
    ("G_Editing_Human_Gen", "簇七 · 编辑 / 人体与化身 / 生成"),
    ("H_Semantic_Cross_HDR", "簇八 · 语义 / 跨域 / HDR 重光照"),
    ("I_CAD_Large_Sim_Sec_World", "簇九 · CAD / 大场景 / 仿真 / 安全 / 世界模型"),
]

# 读取核查统计
report = open(os.path.join(REF, "verification-report.md"), encoding="utf-8").read()
import re
def grab(pat, default="-"):
    m = re.search(pat, report)
    return m.group(1).strip() if m else default
total = grab(r"唯一 arXiv ID 总数\*\*：(\d+)")
resolved = grab(r"API 核验可达（有标题）\*\*：(\d+)")
unres = grab(r"未解析 / 疑似失效（UNRESOLVED）\*\*：(\d+)")
mism = grab(r"方法名↔标题 疑似不匹配候选\*\*：(\d+)")

out = []
out.append("# 3DGS 论文研读知识库 · Paper Reading Knowledge Base\n")
out.append("> **用途**：把项目相关论文（近期 + 经典）的研读沉淀为结构化笔记，作为**撰写 3DGS 论文的基础**——"
           "覆盖 related-work 定位、方法对比、实验数据集/基线/指标速查。\n")
out.append("> **生成方式**：由 9 个并行子代理分簇 WebFetch arXiv 原文核验 + 深度研读，聚合而成。\n")
out.append("> **核查口径**：全项目 arXiv ID 已批量 arXiv API 核验——唯一 ID **%s** 个，可达 **%s** 个；"
           "原 `docs/studio.html` 中 Mip-Splatting 链接误写为 `2312.21535`，已修正为正确 ID `2311.16493`（CVPR 2024 Best Student Paper）。"
           "方法名↔标题疑似不匹配候选 **%s** 个，需人工裁定（非必然错误，见 `references/verification-report.md`）。\n" % (total, resolved, mism))
out.append("> **深度标记**：`[经典]`=2023-2024 奠基性论文深度笔记；`[2025]`=已确立论文简表；`[近期焦点]`=2026 扫描焦点详写。\n")
out.append("> **红线**：笔记只记 arXiv 摘要或确证内容，指标不确定处写「待补」；正式投稿引用前请回原始论文复核。\n")

out.append("## 目录\n")
for i, (cid, title) in enumerate(CLUSTERS, 1):
    out.append(f"{i}. [{title}](#{cid})\n")
out.append("\n---\n")

for cid, title in CLUSTERS:
    f = os.path.join(REF, f"_kb_{cid}.md")
    body = ""
    if os.path.exists(f):
        body = open(f, encoding="utf-8").read().strip()
        # 去掉子代理可能写的 H1 任务标题
        body = re.sub(r"^#\s*研读任务[^\n]*\n+", "", body)
    out.append(f"## {title} <a id=\"{cid}\"></a>\n")
    if body:
        out.append(body + "\n")
    else:
        out.append("_（本簇笔记缺失）_\n")
    out.append("\n---\n")

dest = os.path.join(REF, "paper-reading-knowledge-base.md")
open(dest, "w", encoding="utf-8").write("\n".join(out))
print("written", dest, len("\n".join(out)), "chars")
