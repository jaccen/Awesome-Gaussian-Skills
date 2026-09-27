---
name: cg-paper-writing
description: "Academic paper writing for 3D vision, computer graphics, CAD, and 3D understanding. Covers NeRF, 3DGS, SLAM, point cloud, 3D shape, CAD modeling. Supports CVPR/ICCV/ECCV/SIGGRAPH venues and Chinese core journals (17 journal-specific format specs). Multi-agent adversarial review, citation integrity gates, style calibration. Use when: writing or revising a CG/3D vision paper, drafting abstract/intro/method/experiments, running adversarial review or citation integrity check, calibrating writing style to a venue, 写论文/写paper/CG论文/计算机学报投稿/软件学报投稿/图形学学报投稿/自动化学报投稿/中文核心期刊."
license: Apache-2.0
user-invocable: true
metadata:
  version: "3.1.0"
  author: jaccen
  tags: ["paper-writing", "academic", "computer-graphics", "3dgs", "nerf", "computer-vision", "cvpr", "siggraph", "adversarial-review", "citation-integrity", "style-calibration"]
  when_to_use:
    - "Write or revise a CG/3D vision academic paper"
    - "Draft abstract, introduction, related work, method, or experiments for a 3DGS/NeRF/CAD paper"
    - "Run adversarial review or citation integrity check on a draft"
    - "Calibrate writing style to a target venue"
    - "写论文 / 写paper / 论文写作 / CG论文 / 三维视觉论文"
    - "按《计算机学报》格式撰写/修改 / 计算机学报投稿 / CJC 综述 / 中文核心期刊格式"
    - "按《软件学报》格式撰写/修改 / 软件学报投稿 / JoS 综述"
    - "按《计算机辅助设计与图形学学报》格式撰写/修改 / 图形学学报投稿 / JCAD"
    - "自动化学报投稿 / 中国科学信息科学投稿 / 计算机研究与发展投稿 / 中文信息学报投稿"
    - "中国图象图形学报投稿 / 模式识别与人工智能投稿 / 智能系统学报投稿 / 虚拟现实与智能硬件投稿"
    - "计算机科学投稿 / 计算机应用投稿 / 图学学报投稿 / 机器人投稿 / 计算机应用研究投稿 / 可视计算投稿"
    - "搜索某中文期刊投稿要求并形成专项能力 / 新增期刊格式规范（按 Extension Protocol 扩展）"
---

# CG Paper Writing Engine (Router)

> **Architecture**: Axis-driven static/dynamic router. Do NOT try to apply the writing logic from memory or from this router alone. Always load fragments from disk as described below.

## Step 1 — Detect Request Axes

Analyze the user's request to determine axis values:

### Axis: section
| User Intent | section value |
|-------------|--------------|
| Writing or revising title | title |
| Writing or revising abstract | abstract |
| Writing or revising introduction | intro |
| Writing or revising related work | related-work |
| Writing or revising methodology | method |
| Writing or revising experiments | experiments |
| Writing contribution statements | contribution |
| Full paper or unspecified section | all |

### Axis: venue
| User Intent | venue value |
|-------------|-------------|
| Targeting CVPR/ICCV/ECCV | cvpr |
| Targeting SIGGRAPH/EG/PG | siggraph |
| Targeting NeurIPS/AAAI | neurips |
| Targeting TVCG/CGF/TOG/TPAMI | tvcg |
| Writing PhD thesis chapter | thesis |
| Targeting Nature/Science sub-journals, Chemical Reviews, or other top-tier journals; submission strategy questions (投稿策略/顶刊/子刊/综述) | top-journal |
| Targeting Chinese core journals (软件学报/计算机学报/计算机研究与发展/中文核心期刊) or writing in Chinese | chinese-journal |
| Targeting 计算机学报 (Chinese Journal of Computers / CJC / 学报综述 / 学报投稿) | cjc |
| Targeting 软件学报 (Journal of Software / JoS / 软件学报投稿) | jos |
| Targeting 计算机辅助设计与图形学学报 (JCAD / 图形学学报投稿 / CAD与图形学) | jcad |
| Targeting 自动化学报 (Acta Automatica Sinica / AAS) | aas |
| Targeting 中国科学：信息科学 (Scientia Sinica Informationis / SCIS) | scis |
| Targeting 计算机研究与发展 (JCRD / CRAD) | crad |
| Targeting 中文信息学报 (JCIS / NLP学报) | jcis |
| Targeting 中国图象图形学报 (JIG / 图象图形学报) | cjig |
| Targeting 模式识别与人工智能 (PRAI / PR与AI) | pra |
| Targeting 智能系统学报 (CAAI Transactions / 智能系统) | caai |
| Targeting 虚拟现实与智能硬件 (VRIH / VR期刊) | vrih |
| Targeting 计算机科学 (Computer Science / JSKX) | jskx |
| Targeting 计算机应用 (Journal of Computer Applications / JCA) | jsjy |
| Targeting 图学学报 (Journal of Graphics / TXB) | txxb |
| Targeting 机器人 (Robot / 机器人学报) | robot |
| Targeting 计算机应用研究 (Application Research of Computers / AROC) | jsjyyj |
| Targeting 工医艺的可视计算 (VCIBA / 可视计算) | vciba |
| Unspecified or multi-venue | all |
| Targeting CCF国际期刊 / IEEE/ACM Transactions / Springer / Elsevier 期刊投稿 | ccf-intl |

If the user does not specify, defaults are: section=all, venue=all.

## Step 2 — Load Required Fragments

### Always Load (every invocation)
Read these files from static/:
- static/core-stance.md — Role, writing process, de-AI rules, citation fact-check, guardrails
- static/symbols-terminology.md — Mathematical symbols, CG/CAD/3D terminology reference
- static/writing-patterns-from-top-papers.md — Exemplar patterns from 3DGS/Mip-Splatting/D4RT (concrete writing techniques with direct quotes); load for style calibration on any section

### On-Demand Load (by detected section)
| section | Fragment(s) to Load |
|---------|-------------------|
| title | static/writing-abstract-intro.md |
| abstract | static/writing-abstract-intro.md |
| intro | static/writing-abstract-intro.md |
| related-work | static/writing-related-method.md |
| method | static/writing-related-method.md |
| experiments | static/writing-experiments.md |
| contribution | static/writing-experiments.md |
| all | All writing fragments (abstract-intro, related-method, experiments) |

### On-Demand Load (by detected venue)
| venue | Fragment to Load |
|-------|-----------------|
| top-journal | static/venue-formats.md + static/top-journal-strategy.md + static/ccf-international-journals.md |
| chinese-journal | static/venue-formats.md + static/writing-chinese-journal.md |
| cjc | static/venue-formats.md + static/writing-chinese-journal.md + static/cjc-format.md |
| jos | static/venue-formats.md + static/writing-chinese-journal.md + static/jos-format.md |
| jcad | static/venue-formats.md + static/writing-chinese-journal.md + static/jcad-format.md |
| any other non-all value | static/venue-formats.md |
| all | static/venue-formats.md |
| ccf-intl | static/venue-formats.md + static/ccf-international-journals.md |

### Reference Load (for review/integrity work)
- static/review-integrity.md — Multi-agent review, Devil's Advocate Protocol, citation verification, integrity gates, style calibration, writing quality check, persistence

**Optimization**: For a focused task (e.g., "write abstract"), load only core-stance + symbols-terminology + writing-abstract-intro + writing-patterns-from-top-papers + venue-formats (if venue specified). For full paper work, load all fragments.

## Step 3 — Execute Writing Task

After loading the required fragments:

1. Follow section-specific templates from the loaded writing fragment
2. Apply venue-specific formatting from venue-formats.md
3. Use terminology and symbols from symbols-terminology.md
4. Observe all guardrails from core-stance.md (no fabrication, de-AI rules, citation fact-check)
5. For review/integrity work, follow protocols from review-integrity.md

## Rules

1. **Write in flowing prose, never bullet points** (contribution statements and itemized lists excepted)
2. **Every claim needs evidence**: Citation or experimental data, and citations must pass three-layer verification
3. **Use mathematical notation efficiently**: One symbol, one meaning throughout; symbol table persisted
4. **Match the venue's tone**: CVPR more concise; SIGGRAPH more narrative; if style sample provided, strictly calibrate
5. **Chinese academic writing**: Follow Chinese academic conventions (本文/我们/由此/表明)
6. **Never fabricate data**: Mark missing data as `<!-- DATA_NEEDED: <description> -->`
7. **Integrity gates cannot be skipped**: Post-Draft Gate and Pre-Submission Gate must both pass
8. **Adversarial review must follow concession threshold protocol**: Prevent sycophancy and frame-lock
9. **Claim-citation alignment**: Each claim must be traceable to supporting citation, and citation must actually support the claim
10. **Writing context persistence**: Maintain symbol, citation, review state consistency across sessions

## Red Lines

The following are categorical prohibitions. Violating any of these invalidates the output:

- **No invented data**: Never fabricate experimental results, method capabilities, or review outcomes. If a value is not found in the loaded files, write "data not available" or "N/A".
- **No hallucinated citations**: Never invent paper titles, authors, DOIs, arXiv IDs, or venue names. Only reference works explicitly present in the skill's knowledge base or provided by the user.
- **No silent speculation**: If you are uncertain about a technical detail, explicitly flag it with "[UNCERTAIN]" rather than presenting it as fact.
- **No method misattribution**: Do not assign features, results, or mechanisms from one method to another. Each method's data is specific to that method.
- **No oversimplified comparisons**: Do not reduce multi-dimensional trade-offs to a single "better/worse" judgment without context.

## Extension Protocol — 新增中文期刊专项（Add a New Journal Venue）

当用户要求「搜索某期刊投稿要求，形成（这样的）能力/能力补充」时，按以下六步扩展本技能（已验证三轮：计算机学报 cjc / 软件学报 jos / 计算机辅助设计与图形学学报 jcad）：

1. **采集官方一手来源**（按优先级，禁止凭记忆猜测格式）：
   - 官方模板 .doc/.docx → Word COM 提取全文（`New-Object -ComObject Word.Application`，取 `$doc.Content.Text`）；
   - 官方投稿须知/修改稿要求 PDF → PyMuPDF（`fitz`/`pymupdf`）提取文本；
   - 官网投稿指南页 → webfetch；若为 JavaScript 动态渲染（如 jcad.cn）只返回导航框架，降级为 online_search 检索 + 权威二手来源（主办单位介绍页、投稿经验帖）交叉验证，并在产出文件中标注来源与可信度。
2. **提炼硬性规范**：期刊基本信息（ISSN/CN/收录/分级/审稿制度/周期/费用）、投稿要求、结构要求（研究论文 vs 综述）、首页要素与字号、摘要要素与字数、关键词数量、参考文献格式、署名规范、常见退稿原因、投稿前 CheckList，并附与已收录期刊的差异对比表。
3. **创建 `static/<venue>-format.md`**：开头注明官方来源（模板文件名/网址/规定日期）；无法核实的细节标注「以官网下载区模板/编辑部通知为准」。
4. **登记路由**：SKILL.md 的 venue 检测表、venue 加载表、when_to_use 触发词各加一行；源仓库副本的 manifest.yaml 同步 venue values 与 on_demand 路由。
5. **衔接通用指南**：`writing-chinese-journal.md` 加提示——目标为该刊时必须额外加载 `<venue>-format.md`，与通用条目冲突时以专项文件（官方来源）为准。
6. **双副本同步**：本技能为双副本安装（安装目录 + 源仓库 `Awesome-Gaussian-Skills/skills/cg-paper-writing/`），内容改动须在同一会话内同步两处；两副本 frontmatter 结构不同（仓库副本无 AIGC 水印头），同步正文内容即可，勿整文件覆盖。

## Cross-Skill Routing

This skill focuses on paper writing. For related workflows:
- **Method comparison** → 3dgs-method-compare (for positioning and related work tables)
- **Paper reading/analysis** → 3dgs-paper-reader (for understanding related work in depth)
- **Experiment design** → 3dgs-experiment-planner (for experiment sections)
- **Visualization/figures** → 3dgs-visualizer (for paper-quality figures)
- **Code review** → 3dgs-code-reviewer (for implementation verification)

## Related Skills

- **3dgs-paper-reader** — Deep reading and analysis of 3DGS papers (use for understanding related work)
- **3dgs-method-compare** — Method comparison (use for positioning and related work tables)
- **3dgs-experiment-planner** — Experiment design (use for experiment sections)
- **3dgs-visualizer** — Visualization (use for paper-quality figures)
- **3dgs-code-reviewer** — Code review (use for implementation verification)

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, method data, bug patterns, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, pattern, or data point in the loaded files, say so explicitly. Never invent metrics, venue acceptances, bug patterns, or technical features not present in the source data.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills