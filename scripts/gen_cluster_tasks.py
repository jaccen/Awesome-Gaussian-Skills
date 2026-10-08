#!/usr/bin/env python3
# 生成 9 个主题簇的研读任务文件，供子代理并行深度研读。
# 经典=2023-2024 奠基性论文(深度全覆盖)；2025=已确立(简表)；近期焦点=2026 扫描(详写)。
import json, os
ROOT = "C:/Users/Lenovo/Desktop/Project/Awesome-Gaussian-Skills"
m = json.load(open(os.path.join(ROOT, "data", "methods.json"), encoding="utf-8"))
methods = m["methods"]

CLUSTERS = {
    "A_Found_Render_Opt_Acc": ["Foundation","Surface & Rendering","Optimization","Acceleration"],
    "B_Compression": ["Compression & Streaming"],
    "C_Dynamic4D": ["Dynamic & 4D"],
    "D_FeedForward": ["Feed-Forward"],
    "E_Sparse_SLAM": ["Sparse-View","SLAM"],
    "F_Embodied_Driving": ["Embodied AI & Robotics","Autonomous Driving"],
    "G_Editing_Human_Gen": ["Editing","Human & Avatar","Generation"],
    "H_Semantic_Cross_HDR": ["Language & Semantic","Cross-Domain","HDR & Relighting"],
    "I_CAD_Large_Sim_Sec_World": ["CAD & Reverse Engineering","Large-Scale","Simulation","Security","World Models & Spatial Intelligence"],
}
FOCAL = {
    "Feed-Forward": [("2610.09853","DeltaSplat"),("2610.07958","DensiTok"),("2610.07110","MoonGS"),("2609.36693","AESplat"),("2609.34176","AGILE-GS")],
    "Dynamic & 4D": [("2610.05289","Mobile-4DGS"),("2610.05576","SteadySplats")],
    "Compression & Streaming": [("2610.07795","GSCV"),("2609.28997","Observation-Gram")],
    "Acceleration": [("2610.09343","TileSkipper"),("2412.00578","Speedy-Splat (CVPR2025)")],
    "Cross-Domain": [("2610.07472","SURGE")],
    "Embodied AI & Robotics": [("2610.07569","OpenSplatGraph"),("2610.06171","ControlPed")],
    "Sparse-View": [("2609.31572","OC-GS"),("2609.39089","UGOD"),("2609.31509","ClearGS")],
    "Editing": [("2610.06472","MaRO-GS"),("2610.06688","GS-Pool")],
    "HDR & Relighting": [("2610.06035","Casual Flash Lighting")],
    "Language & Semantic": [("2610.08756","Post-Training Semantic Lifting")],
    "Optimization": [("2609.31248","TangoGS")],
    "CAD & Reverse Engineering": [("2610.01707","MEGA")],
    "SLAM": [("2609.30865","RRTO-CF3DGS")],
    "Large-Scale": [("2609.31339","ChronoFuseGS")],
    "Foundation": [("2610.09116","SPLATIFY")],
    "Security": [("2610.00822","TRACE")],
}
def fmt(x):
    return f"{x.get('name','?')} | `{x.get('arxiv_id','')}` | {x.get('venue','')} | {x.get('year','')}"

for cid, cats in CLUSTERS.items():
    classics = [x for x in methods if x.get("category") in cats and str(x.get("year","")).isdigit() and int(x["year"])<=2024 and x.get("arxiv_id")]
    classics.sort(key=lambda x:(int(x["year"]), x.get("name","")))
    est2025 = [x for x in methods if x.get("category") in cats and str(x.get("year","")).isdigit() and int(x["year"])==2025 and x.get("arxiv_id")]
    est2025.sort(key=lambda x:x.get("name",""))
    focal = []
    for c in cats: focal += FOCAL.get(c, [])
    L = []
    L.append(f"# 研读任务 · 簇 {cid}\n")
    L.append("你是 3DGS 领域论文研读子代理。请按下方清单对每篇论文做**深度研读**，产出结构化笔记写入 `references/_kb_{cid}.md`（若文件已存在则追加，不要覆盖）。\n")
    L.append("## 产出格式（每篇一个 `###` 块）\n")
    L.append("```\n### 方法名 (`arxiv_id`, venue year)\n- **摘要**: 1-2 句核心问题+做法+结论\n- **创新点**: 相对前作的关键区别（2-3 条）\n- **核心方法**: 技术路线（表示/优化/渲染/损失等），含关键模块名\n- **实验设计与分析**: 数据集、必比基线、核心指标、关键结果数字，并说明支撑了哪条 claim\n- **写作可嫁接点**: 本工作的 related-work/方法对比/实验基线如何引用\n- **核查**: arxiv 标题=…（一致/待核/ID失效）\n```\n")
    L.append("## 执行要求\n")
    L.append("1. 对**每篇**论文先用 WebFetch 打开 `https://arxiv.org/abs/<arxiv_id>` 核验标题可达并抓取摘要；经典(2023-2024)若你已熟知，可结合摘要补全，但仍须 WebFetch 核验 ID。")
    L.append("2. **经典论文（2023-2024，下表）须深度全覆盖**，每篇 80-150 字。")
    L.append("3. **2025 已确立论文（下表）写简表**（方法名|ID|venue|year|一句话贡献），每篇≤40 字。")
    L.append("4. **近期焦点（2026，下表）须详写且满五要素**，每篇 150-250 字。")
    L.append("5. 不编造指标；数字只写 arxiv 摘要或你确知内容，不确定写「待补」。\n")
    L.append(f"## 经典论文（2023-2024，共 {len(classics)} 篇，深度全覆盖）\n")
    for x in classics: L.append(f"- {fmt(x)}")
    L.append(f"\n## 2025 已确立（共 {len(est2025)} 篇，简表）\n")
    for x in est2025: L.append(f"- {fmt(x)}")
    L.append(f"\n## 近期焦点（2026，共 {len(focal)} 篇，详写）\n")
    for aid, nm in focal: L.append(f"- {nm} | `{aid}` | 2026 | 近期扫描焦点")
    L.append("\n## 本簇覆盖子领域\n- " + "、".join(cats))
    out = os.path.join(ROOT, "references", f"_cluster_{cid}.md")
    open(out, "w", encoding="utf-8").write("\n".join(L))
    print(f"{cid}: classics={len(classics)} 2025={len(est2025)} focal={len(focal)}")
