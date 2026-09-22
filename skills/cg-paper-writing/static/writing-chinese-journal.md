
---
# Chinese Core Journal Writing Guide (软件学报 / 计算机学报 / 计算机研究与发展)

Applies when the user targets a Chinese core journal (中文核心期刊 / 软件学报 / 计算机学报 / 计算机研究与发展 / 中文论文 / 中文期刊) or asks for Chinese-language academic writing guidance. Complements venue-formats.md (English venues) and top-journal-strategy.md (Nature/Science).

## Applicable Journals

| Journal | Publisher | Level | Focus | Words |
|---------|-----------|-------|-------|-------|
| 软件学报 (Journal of Software) | 中科院软件所 | RCCSE(A+), EI, CSCD核心, T1 | 软件理论/方法/技术 | 8000-15000 |
| 计算机学报 (Chinese Journal of Computers) | CCF + 中科院计算所 | EI, CSCD核心, 北大核心 | 基础理论与核心算法 | 8000-12000 (研究论文), 15000+ (综述) |
| 计算机研究与发展 | 中科院计算所 | EI, CSCD核心, 北大核心 | 计算机综合 | 6000-12000 |

## Format Requirements (Common Across All Three)

### Title
- Chinese: ≤20 characters; English: corresponding English title (not transliteration)
- Must be concise, reflect content accurately; avoid vague words like "研究" or "基于" as the sole framing

### Abstract
- Chinese: 200-300 characters, must include four elements: **目的 → 方法 → 结果 → 结论**
- English: 200+ words (计算机学报 requires 500 words), parallel structure to Chinese
- Write as a self-contained mini-paper; do NOT restate the table of contents

### Keywords
- 5-8 keywords, Chinese and English must correspond one-to-one
- Use standard terminology; avoid newly coined terms unless defined in the paper

### Body Structure (研究论文)
```
1 引言 (Introduction)
  - 研究背景与意义
  - 现有工作不足（不是罗列，而是指出现存空白）
  - 本文贡献（分点列出，3条左右）
  - 论文组织结构
2 相关工作 (Related Work)
  - 按主题分组，不是按论文列举
  - 每组末尾说明与本文的区别
3 方法 (Method)
  - 总体框架图 → 逐模块展开
  - 每个新符号首次出现必须定义
  - 公式连续编号，引用格式: 式(1)、式(2)
4 实验 (Experiments)
  - 数据集、评价指标、基线方法
  - 主实验对比（表格）
  - 消融实验
  - 效率分析 / 可视化分析
5 结论 (Conclusion)
```

### References
- 一般不少于15篇，近5年文献占比建议>50%
- 引用该刊近3年论文3-5篇（体现对期刊的了解）
- 格式遵循 GB/T 7714-2015 标准
- 中文文献用中文著录，英文文献用英文著录

## Language Style (中文期刊 vs 英文会议的关键差异)

### Tone and Register
- 使用"本文"而非"我们"作为主语（部分期刊接受"我们"，但"本文"更正式）
- 避免口语化表达：用"由此可得"替代"所以我们得到"；用"表明"替代"说明"
- 避免感叹号、反问句
- 段落首句必须是该段的核心论点（topic sentence先行）

### Technical Expression
- 术语首次出现时给出中文全称+英文全称+缩写，如"三维高斯泼溅(3D Gaussian Splatting, 3DGS)"
- 后续使用缩写即可
- 公式中的变量用斜体，矩阵/向量用粗斜体
- 图表标题用中文，图例可用英文（但中英文摘要对应的图表说明需各自语言）

### Forbidden Patterns (中文期刊特有)
- 不得使用英文缩写作为段落开头的主语（如不能写"3DGS具有..."，应写"三维高斯泼溅(3DGS)具有..."）
- 避免"AI味"表述：不使用"值得注意的是"、"总而言之"、"不仅...而且..."等套话
- 不得过度使用被动语态（中文以主动语态为主，被动语态用"被/受"标记）
- 不得在正文中使用"该"、"其"指代过远的名词（超过3个句子距离需重复名词）

## Experiment Design Requirements (中文核心期刊更严格)

### 对比实验
- 计算机学报明确要求：**不能仅与自身方法对比，必须与基线方法对比**（至少2-3个SOTA）
- 实验环境需明确描述：硬件配置、软件版本、随机种子
- 数据集划分需说明：训练/验证/测试集比例与划分方式

### 统计显著性
- 建议多次运行取均值±标准差
- 关键指标需提供统计显著性检验（t-test 或 Wilcoxon）

### 可视化
- 彩色图表需确保黑白打印后仍可区分（计算机学报要求）
- 图表需精绘并附说明文字
- 表格推荐使用三线表

## Common Rejection Reasons (中文核心期刊)

1. **创新性不足**: 仅对已有方法做简单改进，缺乏理论突破
2. **实验不充分**: 对比实验缺失、数据集过小、缺乏统计显著性检验
3. **写作问题**: 逻辑不清、中英文表达不规范、参考文献格式错误
4. **与期刊定位不符**: 偏工程应用而缺乏理论深度（计算机学报偏重基础理论）
5. **一稿多投**: 包括会议论文扩展不足30%新内容
6. **AIGC检测**: 2026年起多数核心期刊要求附AIGC检测报告，AI生成比例超标直接退稿

## Submission Strategy

### Pre-Submission Checklist
- [ ] 精读目标期刊近2年相关主题论文，了解写作风格和深度要求
- [ ] 引用该刊近3年论文3-5篇
- [ ] 中文摘要严格遵循"目的→方法→结果→结论"四要素
- [ ] 英文摘要与中文摘要内容对应（不是逐句翻译，是信息对等）
- [ ] 关键词中英文一一对应
- [ ] 参考文献格式遵循 GB/T 7714-2015
- [ ] 图表三线表格式，彩色图表黑白可辨
- [ ] AIGC检测报告（如期刊要求）
- [ ] 基金资助信息标注完整

### Cover Letter (投稿信)
- 明确说明创新点和理论贡献（计算机学报偏理论）
- 说明与已发表工作的区别（超过30%新内容，若为会议扩展）
- 声明未一稿多投

### Journal Selection Guide
| If your work is... | Recommended journal | Why |
|--------------------|--------------------|----|
| 理论算法创新（深度学习/优化/密码学） | 计算机学报 | 偏基础理论，要求理论深度 |
| 软件工程/系统/工具 | 软件学报 | 软件领域权威，涵盖面广 |
| 综合性/应用基础研究 | 计算机研究与发展 | 综合性强，接受面广 |
| AI+3D视觉+Agent | 软件学报专刊 | 近期有"具身推理与多模态世界模型"专刊 |

## Exemplar Patterns from High-Impact Chinese Journal Papers

The patterns below are distilled from actual high-impact papers published in 软件学报 and 计算机辅助设计与图形学学报, with direct structural evidence.

### Exemplar 1: 软件学报 综述论文引言结构 (智能数据可视分析技术综述, 2024, 35(1): 356-404)

The introduction uses "●" bullet markers to structure four key elements, each as a mini-paragraph:

```
1 引言
  [研究背景与意义 — 2-3段正文，无标记]
  [核心概念定义 — 1段正文，引入关键术语]

  ● 综述调查范围: 明确论文数量和时间跨度
    例: "本文对30多年来(1984-2022)近200篇论文进行了系统性地梳理"
    附表列出覆盖的会议/期刊（按研究领域分组）

  ● 与相关综述性文章的区别: 逐一点评已有综述，指出各自局限
    例: "Qin等人[4]主要从数据库的视角出发... Battle等人[9]也从数据管理的视角出发...
        然而, 上述综述往往从单一的学科视角出发, 或只涵盖了...个别细分领域"

  ● 本文的主要贡献: 3条，用"首先...其次...最后..."结构
    例: "首先, 本文通过调查...总结出...凝练出...揭示了...
         其次, 本文系统性地梳理和分析了...
         最后, 本文还探讨了...并为研究者们提供了未来可能的探索方向"

  ● 本文的组织结构: 逐节预告
    例: "本文第2节介绍...第3节介绍...第4节梳理...第5节分析了...第6节展开介绍...
         第7节讨论...并在第8节总结全文"
```

**Key language patterns observed:**
- "本文" as primary subject throughout (not "我们"): "本文通过调查...", "本文从...视角出发", "本文系统性地梳理..."
- First-occurrence term format: "结构化查询语言(structured query language, SQL)" — 中文全称(英文全称, 缩写)
- Figure references: "如图X所示", "图X展示了...", "图X形象化地展示了..."
- Table references: "如表X所示"
- Section headers use full-width space: "1 引　言" (not "1 引言")
- Survey scope quantified: explicit paper count + year range + coverage table

### Exemplar 2: 中文核心期刊 NeRF 综述结构 (计算机辅助设计与图形学学报, 2025)

Published NeRF survey structure (陈涛, 杨启亮, 陈寅):
- Title: 神经辐射场技术及应用综述 — "技术及应用综述" is the standard survey title suffix
- Keywords: 神经辐射场; 神经网络三维重建; 体渲染; 新视角图像 — semicolons, not commas
- Abstract follows 目的→方法→结果→结论 four-element structure
- Body: NeRF原理 → 体渲染方程 → 训练方法 → 应用场景 → 未来方向

### Cross-Journal Common Patterns

| Pattern | 软件学报 | 计算机学报 | 计算机辅助设计与图形学学报 |
|---------|---------|-----------|----------------------|
| 摘要结构 | 目的→方法→结果→结论 | 同左 | 同左 |
| 主语偏好 | "本文"为主 | "本文"为主 | "本文"为主 |
| 综述标题后缀 | "综述" | "综述" | "技术及应用综述" |
| 图表引用 | "如图X所示" | 同左 | 同左 |
| 关键词分隔 | 分号(;) | 分号(;) | 分号(;) |
| 贡献列举 | "首先...其次...最后..." | 同左 | 同左 |
| 组织结构预告 | "本文第X节介绍..." | 同左 | 同左 |
| 术语首次出现 | 中文全称(英文全称, 缩写) | 同左 | 同左 |

### Chinese vs English Writing: Structural Differences from Exemplars

| Dimension | English Top Papers (CVPR/SIGGRAPH) | Chinese Core Journals (软件学报/计算机学报) |
|-----------|-------------------------------------|---------------------------------------------|
| Subject | "We" as primary subject | "本文" as primary subject |
| Opening | Rhetorical question or taxonomy framing | 研究背景与意义 (background + significance) |
| Contributions | 3-4 technical artifact bullets | "首先...其次...最后..." 3条 |
| Survey scope | Implicit in related work | Explicit: paper count + year range + coverage table |
| Paper organization | Optional roadmap sentence | Required: "本文第X节介绍...并在第X节总结全文" |
| Limitations | Dedicated subsection | Folded into 结论 or 未来工作 |
| Figure captions | Conclusion sentence as caption | "图X [描述]" format (descriptive, not conclusion) |
| Term definition | Abbreviation on first use | 中文全称(英文全称, 缩写) on first use |
| Tone | Assertive, quotable claims | Formal, measured ("表明"/"揭示"/"凝练") |

## AIGC Compliance (2026 update)

From 2026, most Chinese core journals require AIGC detection reports:
- AI generation ratio must be below journal threshold (typically 15-25%)
- AI-assisted writing is acceptable; AI-generated content must be disclosed
- Use humanizer-zh skill to remove AI traces before submission
- Do NOT use obvious AI patterns: parallelism, em-dash overuse, "三段式法则", promotional language