
---
# LaTeX Source Hygiene & Mechanical Verification（投稿前源码级检查）

> 用途：LaTeX 论文（会议模板或期刊）投稿前的源码卫生检查与机械化验证。与 review-integrity.md 的内容级 Integrity Gates 互补：本文件只覆盖源码规范性、跨文档引用一致性与编译产物健康度，不评判内容质量（内容质量走引用三层核验与对抗审稿）。
> 配套脚本：`scripts/check_paper_consistency.py`（一键跑完第二节全部机械检查）。
> 沉淀来源：OntoGS CVPR v8 投稿前评审实践（2026-09-27）。

## 一、源码卫生检查清单

| # | 检查项 | 判定标准 | 级别 | 修复方法 |
|---|--------|---------|------|---------|
| 1 | 连续空行 | ≥3 连续空行视为残留（常见于历史压缩、段落外移的痕迹） | P2 | 折叠为单空行。LaTeX 中多空行与单空行语义等价（均为段落分隔），折叠零风险 |
| 2 | 环境结束与章节命令同行 | 如 `\end{table*}\section{...}` 挤在同一行 | P1 | 拆行，中间补一个空行 |
| 3 | 跨文档引用写法 | supp 引用主稿图表必须可定位：写 "Figure 2(c) of the main paper"；禁止 "the main paper(c)" 这类审稿人无法解析的写法 | P1 | 改为明确编号引用 |
| 4 | bib 键名一致性 | 键名应含首作者姓与年份（如 `rosinol2020scenegraphs`）；键名与实际作者/年份不符（如 `kim2023scenegraphs` 实为 Rosinol et al. 2020）不影响渲染，但误导后续维护 | P2 | 投稿前可不改（渲染正确即可）；长期维护应改键名并全文同步替换 |
| 5 | S 前缀编号对应 | 主稿显式引用的 "Supplementary Table~S4" 等编号必须落在 supp 实际编号范围内且指向正确对象；supp 须有 `\renewcommand{\thetable}{S\arabic{table}}` 等前缀声明 | P1 | 脚本核对范围 + 人工核对具体指向 |
| 6 | AI 痕迹词 | Furthermore / Moreover / It is worth noting / Significantly / Leverage / Effectively / seamless / cutting-edge | P2 | 规则扫描后逐处人工判断；novel-view synthesis 等领域术语用法不算命中 |

## 二、机械化验证流程

投稿前运行 `python scripts/check_paper_consistency.py <main.tex> [supp.tex] [references.bib]`，一次完成：

1. **引用完整性**：bib 条目集合 vs 正文 `\cite` 键集合双向差集——要求零缺失、零孤儿（阻断级）
2. **摘要词数**：剥离 LaTeX 命令后统计，对照 venue 规范（CVPR 150–250 词）
3. **交叉引用目标**：主稿全部 `\autoref`/`\ref` 目标都在 `\label` 集合内（阻断级）
4. **S 编号对应**：主稿显式 S 引用编号不超过 supp 实际表/图数量，supp 有 S 前缀声明，无 "the main paper(" 式坏引用（阻断级）
5. **编译产物健康度**：PDF 页数（`/Type /Page` 正则统计，不依赖第三方库）+ 编译日志四指标（undefined / multiply defined / Overfull hbox / error）（阻断级：undefined 或 error 非零）
6. **bib 键名一致性**：键名 vs 首作者姓 + 年份（提示级）
7. **连续空行定位**：报告 ≥3 连续空行的行号区间（提示级）
8. **AI 痕迹扫描**：输出命中词频供人工复核（提示级）

## 三、修复操作要点（pitfalls）

- **空行折叠用脚本，不用 edit 工具**：连续空行区域的 oldString 精确匹配极易失败（空行数量记错、不可见字符、行尾差异都会导致找不到），Python 逐行折叠一次成功。实践中 edit 与 multiedit 两次失败后改脚本立即成功。
- **PowerShell 内联 Python 引号转义易错**：复杂检查/修复脚本先写入 .py 文件再执行，不要 `python -c "..."` 内联。
- **手工修复后禁止重跑 build 脚本**：若项目存在 build_xxx.py 之类从模板或上游重新生成产物的构建脚本，手工修复源码后再跑它会覆盖全部手工修复。只能手动 `pdflatex ×3 + bibtex` 重编译。
- **修复后必须回归验证**：源码卫生修复不得改变任何实质内容；修完验证四件事——页数不变、0 undefined、0 error、关键内容（摘要/贡献点/章节/核心公式）仍在位。
- **修复记录回写评审报告**：评审报告中的问题清单应逐项标注修复状态（已修复 / 保持现状 / 留待提交日），避免下一轮评审重复发现同一问题。