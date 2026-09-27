
# Chinese Core Journal Writing Guide (软件学报 / 计算机学报 / 计算机研究与发展)

Applies when the user targets a Chinese core journal (中文核心期刊 / 软件学报 / 计算机学报 / 计算机研究与发展 / 中文论文 / 中文期刊) or asks for Chinese-language academic writing guidance. Complements venue-formats.md (English venues) and top-journal-strategy.md (Nature/Science).

## Applicable Journals

| Journal | Publisher | Level | Focus | Words |
|---------|-----------|-------|-------|-------|
| 软件学报 (Journal of Software) | 中科院软件所 | RCCSE(A+), EI, CSCD核心, T1 | 软件理论/方法/技术 | 8000-15000 |
| 计算机学报 (Chinese Journal of Computers) | CCF + 中科院计算所 | EI, CSCD核心, 北大核心 | 基础理论与核心算法 | 8000-12000 (研究论文), 15000+ (综述) |
| 计算机研究与发展 | 中科院计算所 | EI, CSCD核心, 北大核心 | 计算机综合 | 6000-12000 |

> **目标为《计算机学报》时必须额外加载 `cjc-format.md`**：该文件按学报官方模板（CJC-Templet_Word2003.doc）与编辑部《修改稿要求》整理，含首页要素与字号表、正文字号体系、14 项正文硬性要求、参考文献 7 类格式、摘要四要素（How I did it 为重点）、英文背景介绍、作者简介、编辑部内容检查清单与投稿前 CheckList。以下通用条目与 cjc-format.md 冲突时，以 cjc-format.md（官方模板/修改稿要求）为准。

> **目标为《软件学报》时必须额外加载 `jos-format.md`**：该文件按学报官网投稿指南与 2022 年署名规范整理，含投稿基本要求、论文结构、摘要四要素、参考文献 GB/T 7714 格式、署名不可修改新规（2022 年起）、"只引英文不引中文直接退稿"条款、审稿常见退稿原因、投稿前 CheckList，以及与《计算机学报》的关键差异对比表。以下通用条目与 jos-format.md 冲突时，以 jos-format.md（官网投稿指南/署名规定）为准。

> **目标为《计算机辅助设计与图形学学报》时必须额外加载 `jcad-format.md`**：该文件按学报官网投稿指南与公开投稿须知整理，含期刊基本信息（CCF A 类/T1）、收稿范围（CAD/CG/VR/可视化）、投稿要求、摘要 250-300 字四要素、关键词 4-7 个、标题层次"一、(一)、1.、(1)"格式、参考文献 GB/T 7714、投稿前 CheckList，以及与《计算机学报》《软件学报》的三刊关键差异对比表。以下通用条目与 jcad-format.md 冲突时，以 jcad-format.md（官网投稿指南）为准。

## Format Requirements (Common Across All Three)

### Title
- Chinese: ≤20 characters; English: corresponding English title (not transliteration)
- Must be concise and reflect content accurately; avoid vague words like "研究" or "基于" as the sole framing

### Abstract
- Chinese: 200-300 characters, must contain four elements: 目的 → 方法 → 结果 → 结论
- English: 200+ words, parallel structure with the Chinese abstract
- No citations, no figures, no undefined abbreviations in the abstract

### Keywords
- 5-8 keywords, Chinese and English must correspond one-to-one
- Avoid overly broad keywords ("深度学习", "神经网络") unless the paper is a survey

### References
- ≥15 references; recent 5 years >50%
- Format: GB/T 7714 (顺序编码制); mixed Chinese and English references are normal and expected
- Cite recent papers from the target journal itself (editors check this)

### Figures & Tables
- 图表标题用中文，图例可用英文（但中英文摘要对应的图表说明需各自语言）
- Tables use 三线表 (three-line table) format
- Color figures must remain distinguishable in B&W printing (计算机学报 requirement)

## Language Style (中文期刊 vs 英文会议的关键区别)

- 用"本文"而非"我们"作为主语："本文提出..." "本文通过...实现..."
- 术语首次出现需"中文全称(英文全称, 缩写)"格式：如"三维高斯泼溅(3D Gaussian Splatting, 3DGS)"
- 公式引用用"式(1)"而非"Eq.(1)"；图表引用用"如图1所示""见表2"
- 章节编号用"第1节""第2节"（软件学报）或"1""2"（计算机学报，按模板）

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
5. **一稿多投**: 同时投递多个期刊，一经发现直接拒稿并通报

## Submission Strategy

- 期刊选刊：理论算法创新 → 计算机学报；软件工程/系统方法 → 软件学报；综合方向 → 计算机研究与发展
- Cover Letter 需说明创新点、与期刊范围的匹配度、无一稿多投声明
- 建议引用目标期刊近3年相关论文（提升编辑好感度，但不要堆砌）

## AIGC 合规 (2026年起多数核心期刊要求)

- 多数核心期刊要求附AIGC检测报告，AI生成比例超标直接退稿
- 投稿前需自查：AI味表述、模板化结构、空洞过渡句
- 若使用了AI辅助写作，需在投稿系统中如实声明使用范围

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
    例: "本文第2节介绍...第3节介绍...第4节梳理...第5节分析了...第6节展开介绍..."
```

Key techniques:
- **量化调查范围声明**: "近200篇论文"、"30多年来(1984-2022)" — 数字建立权威性
- **逐一点评式综述对比**: 每篇已有综述用"XX等人[N]主要从...视角出发"句式，最后用"然而"收束指出共同局限
- **贡献三段式**: "首先...其次...最后..."是中文核心期刊的标准贡献格式

### Exemplar 2: 中文核心期刊 NeRF 综述 (计算机辅助设计与图形学学报 2025年01期)

"神经辐射场技术及应用综述" demonstrates the standard Chinese survey opening:
- 定义先行: "神经辐射场(NeRF)是一种基于神经网络的三维重建技术,它将场景定义为位置和观察视角的五维辐射场函数,并通过隐式的神经网络来表示"
- 关键词覆盖: 神经辐射场;神经网络三维重建;体渲染;新视角图像

### 中英文写法结构差异对比表

| 维度 | 英文顶会 (CVPR/SIGGRAPH) | 中文核心期刊 (软件学报/计算机学报) |
|------|--------------------------|-----------------------------------|
| 主语 | "We propose..." | "本文提出..." |
| 贡献列举 | Bulleted list, 3-4 items | "首先...其次...最后..." 段落式 |
| 引言结构 | 段落递进，无标记 | "●" 标记四要素（综述类） |
| 综述范围声明 | 可选 | 必须量化（"近200篇论文"） |
| 术语首次出现 | "3D Gaussian Splatting (3DGS)" | "三维高斯泼溅(3D Gaussian Splatting, 3DGS)" |
| 公式引用 | "Eq. (1)" | "式(1)" |
| 图表引用 | "Fig. 1" / "Table 1" | "如图1所示" / "见表1" |
| 章节编号 | "Section 3" / "3.1" | "第3节" / "3.1"（按模板） |
| 局限性 | 独立小节（可选） | 在结论前讨论（"本文的不足之处"） |
| AI辅助 | 无强制要求 | 需AIGC检测报告+声明 |