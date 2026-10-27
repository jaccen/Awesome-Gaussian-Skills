# Literature Search Protocol — SCI 期刊与顶会文献检索协议

> 融合自 sci-journal-literature + literature-manager。用于阶段2文献检索与管理，在用户要求"找文献/查 SCI/搜顶会/建文献库/下 PDF/转 Markdown/生成 BibTeX"时加载。

## 适用场景

- 需要为 related work 或实验对比找正规 SCI 期刊/顶会论文（**默认排除 arXiv 预印本**，对齐老板"引用必须官方核实"原则）
- 需要下载论文 PDF 并转为 Markdown 入库
- 需要生成或审计 BibTeX 引用
- 需要为论文里提到的方法收集 code/dataset 链接

## 检索原则

1. **仅限正规出版源**：SCI/SCIE 期刊、经同行评议的会议（CCF 推荐、学科顶会）。不检索 arXiv/bioRxiv/SSRN 等预印本，除非用户明确要求预印本
2. **与写作分工**：本协议负责"从哪找、如何过滤"；检索结果交给 `3dgs-citation-audit.md` 做引文真实性核查，交给写作 fragment 做综述成文
3. **引用必须官方核实**：arXiv API / DOI / 期刊官网优先，不凭记忆引用

## 检索流程

### Step 1: 明确需求

向用户确认或从上下文推断：
- 学科与关键词（中英文）
- 年份范围
- 只要期刊 / 只要会议 / 两者都要
- 是否限定影响因子或分区
- 需要多少篇（默认 20）

### Step 2: 关键词扩展

从中英文同义词、领域规范表述、方法名变体扩展。例：
- 中文"高斯泼溅" → 英文 "Gaussian Splatting" / "3DGS" / "3D Gaussian Splatting"
- 方法名 + 任务 + 基准：如 "SignedGS + high-frequency + Mip-NeRF 360"

### Step 3: 选择数据源（按优先级）

| 来源 | 类型 | 过滤能力 | 适用 |
|------|------|---------|------|
| Semantic Scholar | API/网页 | 有 venue/venueType，可过滤非期刊非会议，可只留 peer-reviewed | 通用首选 |
| OpenAlex | API | 按 type=journal-article 过滤，开放免费 | 通用备选 |
| PubMed | API | 均为期刊/会议，偏生物医学 | 生物医学方向 |
| AMiner | 技能/API | 学者/论文/机构/期刊 | 查学者与期刊论文 |
| Google Scholar | 网页 | 关键词加 site: 或限定"期刊""会议" | 兜底，需人工/脚本解析 |

**不使用的源（默认排除）**：arXiv、bioRxiv、medRxiv、SSRN、ResearchSquare 等预印本平台。用户明确要预印本时单独说明。

### Step 4: 执行检索并过滤

- 排除预印本
- 按来源类型（journal / conference）、年份、相关性排序
- 可选按影响因子或会议等级筛选

### Step 5: 输出结构化列表

```
| 标题 | 作者 | 年份 | 来源类型 | 期刊/会议名 | DOI/URL | 摘要 |
```

可导出 BibTeX 或交给 `3dgs-citation-audit.md` 做引用核查。

## 下载与转换流程

### PDF 下载（按优先级尝试源）

1. 直接出版商 PDF（Nature/eLife/Frontiers/PNAS 等）
2. EuropePMC（`PMC_ID` → PDF）
3. bioRxiv/arXiv 预印本（仅用户明确允许时）
4. Unpaywall API：`https://api.unpaywall.org/v2/{DOI}?email=user@example.com`

全部失败 → 标注 paywalled 并提供 DOI 供手动下载。

### PDF → Markdown 转换

使用 markitdown 或 PyMuPDF（`fitz`）提取文本，保留结构（标题层级、表格、公式占位）。转换后验证 PDF+MD 配对完整性。

### 文献库审计

对 `references/` 文件夹做全量审计：
- 每篇是否有 PDF+MD 配对
- BibTeX 键名一致性（与 `3dgs-citation-audit.md` 的简称规则对齐）
- 引用顺序与正文首现顺序一致

## BibTeX 简称规则

与 `3dgs-citation-audit.md` 一致：作者姓+年份+关键词首词，如 `kerbl2023_3dgs`、`barron2022_mipnerf360`。键名全小写、下划线分隔、避免特殊字符。

## 执行层说明

本协议提供检索与下载的方法论。执行时：
- 联网检索用 `online_search`（百度千帆 AI 搜索）或 `webfetch`（直接抓 Semantic Scholar/OpenAlex API）
- PDF 下载用 `powershell` 调 `Invoke-WebRequest`
- PDF 转 Markdown 用 `markitdown-skill` 或 PyMuPDF
- BibTeX 生成与核查交给 `3dgs-citation-audit.md` 的 `audit_manuscript_citations.py` 方法论

## 与本技能其他 fragment 的衔接

- 检索结果 → 交 `3dgs-citation-audit.md` 做三层校验（ID 可达/名称一致/名称反查）
- 综述成文 → 加载 `writing-related-method.md` + `3dgs-paper-knowledge.md`
- 实验对比基线 → 加载 `experiment-design-protocol.md` 的基线选择表
