# Polishing Protocol — 投稿级润色与中译英规范

> 融合自 paper-polish + nature-polishing。用于阶段6润色语言，在用户要求"润色/改措辞/去 AI 味/中译英/降调过度声称"时加载。

## 适用场景

- 已有草稿段落或全文，要求语言层改进
- 中文稿件译成投稿级英文
- 去除 AI 生成痕迹
- 校准 claim 强度与证据匹配

## 不可逾越的总规则：忠于作者原意

润色最怕的是编辑静默改掉了文本声称的内容。**永远不要静默做出改变科学含义的编辑。**

具体：
- 不加强或削弱作者结论（把"提示"改成"证明"、把"可能相关"改成"导致"），除非明确告知
- 不添加作者未提供的数据、引用、场景
- 不改变数字、单位、样本量、显著性标记
- 任何可能改变科学含义的编辑，必须显式标注建议并让作者确认

## 润色分层

按 `paper-type → section → paragraph logic → claim/evidence/boundary → sentence` 顺序处理：

1. **Paper-type 层**：先确认论文类型（research/methods/hypothesis/algorithmic/review），不同类型润色重点不同
2. **Section 层**：每个 section 有不同惯例（abstract 自包含/intro 问题-缺口-贡献/method 先符号后公式/experiments 先问题后结果）
3. **段落逻辑层**：段落是否有主题句？是否每句推进理解？是否有断裂跳跃？
4. **claim-evidence 边界层**：claim 强度是否匹配证据？是否有过度声称？
5. **句子层**：语法、用词、节奏、AI 味（最后处理）

## 语法与用词（非母语作者高频错误）

| 错误类型 | 典型表现 | 修正 |
|---------|---------|------|
| 冠词 | "We propose method" / "the nature" | 可数名词单数前加冠词；抽象名词看语境 |
| 主谓一致 | "The results shows" | 第三人称单数加 s |
| 时态一致 | 方法用过去时、结果用现在时混用 | 已完成实验用过去时，普遍真理用现在时 |
| which vs that | 限制性从句用 that，非限制用 which | 限制性（无逗号）用 that |
| Chinglish | "has a good effect on" / "the experiment proves" | "improves" / "the results suggest" |
| 连接词过度 | "Moreover, furthermore, additionally" 堆砌 | 用句意自然过渡，少用机械连接 |

## AI 味去除（对齐 humanizer-zh 模式）

检测并修复以下模式：

| 模式 | 表现 | 修复 |
|------|------|------|
| 夸大象征意义 | "This breakthrough reshapes the field" | 删除或降调为 "This method addresses X" |
| 宣传性语言 | "powerful / revolutionary / cutting-edge" | 删除形容词，让数字说话 |
| -ing 肤浅分析 | "highlighting the importance of..." | 改为具体陈述 |
| 模糊归因 | "It is widely known that..." | 引用具体来源或删除 |
| 破折号过度 | "—especially when—" | 改用逗号或拆句 |
| 三段式法则 | "faster, better, cheaper" 硬凑三联 | 用真实数据，不凑数 |
| AI 词汇 | "delve into / leverage / utilize / robust" | "study / use / use / stable" |
| 否定式排比 | "not only X but also Y; neither A nor B" | 直述肯定句 |
| 连接短语过度 | "In addition / Furthermore / Moreover" 密集 | 用句意衔接 |
| 公式化结尾 | "In conclusion, our method achieves..." | 具体总结贡献，不套模板 |

## 中译英投稿级规范

### 术语对齐

| 中文 | 英文（领域标准） |
|------|----------------|
| 高斯泼溅 | Gaussian Splatting |
| 三维重建 | 3D reconstruction |
| 新视角合成 | novel view synthesis |
| 渲染 | rendering |
| 合成 | compositing（按语境） |
| 消融实验 | ablation study |
| 基线 | baseline |
| 鲁棒性 | robustness |
| 泛化 | generalization |

### 句式转换

中文偏好长定语前置，英文偏好短定语后置或从句：
- 中："基于高频感知损失的高斯泼溅方法" → 英："a Gaussian Splatting method with high-frequency-aware loss"
- 中："为了解决上述问题" → 英："To address the above limitations"

### 语气校准

- 中文"我们提出"→ 英 "we propose"（不用 "we present" 除非强调展示）
- 中文"显著优于"→ 英 "outperforms" + 具体数字，不用 "significantly better than"（significantly 留给统计检验）
- 中文"实验表明"→ 英 "experiments show/demonstrate"，保留时态一致性

## claim 强度校准

| 证据强度 | 允许的 claim 措辞 |
|---------|-----------------|
| 单场景单种子 | "preliminary results suggest" / "on scene X, our method achieves Y dB" |
| 多场景单种子 | "on N scenes, our method achieves..." |
| 多场景多种子 + 统计检验 | "our method significantly outperforms X by Y dB (p<0.05)" |
| 跨数据集泛化 | "our method generalizes to..." |
| 仅机制论证无数据 | "the mechanism is expected to... pending validation" |

**降调规则**：若发现 claim 强度超过证据强度，标黄并建议降调措辞，不静默修改。

## 与本技能其他 fragment 的衔接

- 起草后润色 → 先 `writing-*.md` 起草，再用本协议润色
- 投稿前自查 → `markdown-draft-format-audit.md` + `latex-source-hygiene.md`
- AI 味去除专项 → 可外调 `Humanizer-zh` 技能（中文 AI 痕迹专项）
- Nature 系投稿 → 本协议通用，Nature 专项措辞参考 `top-journal-strategy.md`
