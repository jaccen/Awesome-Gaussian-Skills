# Rebuttal Protocol — 审稿意见回复策略与返修信成稿

> 融合自 rebuttal-guidance + nature-response。用于阶段8返修改稿，在用户要求"回复审稿人/写返修信/rebuttal/逐点回复/cover letter"时加载。

## 适用场景

- 收到审稿意见，需要逐条回复
- 写返修 cover letter
- 标注修改稿（marked manuscript / redline）
- 审稿人无视了你的 rebuttal，需要重新校准策略

## 核心模型：条件说服 P(Z=1 | X, Y)

- **X**：审稿人 mindset（从审稿文本推断的行为聚类）
- **Y**：返修策略向量（强调哪些战术）
- **Z**：成功（提分或录用）

先匹配 X，再选 Y，不要一上来就写。

## 工作流程

### Step 1: 清点所有 concern

从粘贴的审稿意见提取每条编号的 Weakness 和 Question。若用户只贴了一个审稿人的意见，询问是否还有其他审稿人。

输出清点表：

| ID | 类型 | 一句话摘要 |
|----|------|-----------|
| R1.W1 | W | ... |
| R1.Q1 | Q | ... |
| R2.W1 | W | ... |

### Step 2: 分类每条 concern

标注为以下之一：
`misunderstanding | evidence_gap | novelty | baseline_fairness | scope_claim | writing_clarity | theory | efficiency | other`

### Step 3: 匹配审稿人 mindset（X）

对每位审稿人评分 5-7 个行为信号（开放度/严厉度/建设性/具体性/怀疑度/苛刻度/可操作性），映射到 mindset 聚类：

| 聚类 | 特征 | 历史提分率 | 策略倾向 |
|------|------|-----------|---------|
| 开放型 | 给具体建议、问澄清问题 | 高 | 直接回应 + 补实验 |
| 严厉但建设性 | 指出硬伤但给方向 | 中 | 承认问题 + 大改 + 补强 |
| 怀疑型 | 反复质疑动机/新颖性 | 低-中 | 重新框定贡献 + 强证据 |
| 苛刻型 | 措辞激烈、要求过多 | 低 | 不硬刚、逐条降温、争取其他审稿人 |
| 误解型 | 误读了论文 | 中-高 | 礼貌澄清 + 修改表述（而非争辩"你没看懂"） |

输出：**匹配的聚类名**、置信度（高/中/低）、触发匹配的具体措辞。

### Step 4: 该 mindset 的策略优先级（Y）

从匹配聚类读：
- 历史提分率：校准提分可能性
- 成功 vs 失败的战术差异：优先用成功组高占比战术
- Cohen's d 效应量 >0.8 的维度：重点强化
- 成功/失败模式：具体 do's and don'ts
- 关键策略：一句话总结

### Step 5: 逐条 concern 的回复指导

对每条 concern，输出指导块（非最终成稿）：

```
### R?.W?: [简短标题]
- concern 类型：...
- 适配 mindset 的策略：...
- 推荐结构：承认 → 回应 → 证据 → 修改说明
- 是否需澄清论文原文？是/否：去哪里找（section/table/appendix）
- 是否需新实验？是/否：具体做什么（不编造数字）
- 语气提示：...
- 模板：A/B/C（见下文）
- 避免：...
```

**不编造实验数字**。任何未验证的标 `[TO VERIFY]`。

### Step 6: 三个回复模板

**模板 A — 误解澄清型**（用于 misunderstanding 类）：
```
We thank R? for this question. We realize our presentation in
Section X may have been unclear. To clarify, [准确陈述]. We have
revised Section X (page Y, line Z) to make this explicit.
```

**模板 B — 补证据型**（用于 evidence_gap 类）：
```
We appreciate R?'s suggestion to strengthen the evidence. We have
conducted [具体新实验] on [数据集] with [种子数] seeds. The results
are: [真实数字]. This confirms [结论]. We added these results in
Table Y of Section Z.
```

**模板 C — 范围/claim 调整型**（用于 scope_claim 类）：
```
We agree with R? that our original claim was broader than the
evidence supports. We have revised the claim to: [降调后的措辞].
This is now stated in Section X (page Y, line Z).
```

### Step 7: cover letter 结构

```
Dear Editor [姓名],

We thank you and the reviewers for the thoughtful feedback. We
have carefully addressed all concerns. Below is a point-by-point
response. Reviewer comments are in [italic], our responses in
[plain text], and manuscript changes are marked in [red] in the
revised manuscript.

[逐条回复]

We hope these revisions address the reviewers' concerns. We are
grateful for the opportunity to improve our manuscript.

Sincerely,
[作者]
```

## 返修信纪律

- **不编造**：实验数字、引用、行号、图面板、补充材料、编辑指令、稿件修改——任何缺失标 `AUTHOR_INPUT_NEEDED`
- **不硬刚**：审稿人误解时，修改表述而非争辩"你没看懂"——这是清晰度信号
- **不夸大**：修改范围与 claim 对齐，不借返修扩大声称
- **不降级严重度**：个别 comment 的严重度不因整体策略而下调
- **映射到位**：每个声称的修改必须映射到稿件具体位置或显式占位符

## marked manuscript 规范

- 在备份副本上标红修改，不直接改原稿
- 返修信中引用的修改后文本用斜体
- 行号引用以修改后版本为准（每次修改后重新核对行号）
- 若用 LaTeX，可用 `\usepackage{changes}` 或 `\usepackage{ulem}` 标注

## 完整性门控

输出前检查：
- 每个 W/Q 都有回复指导
- 无编造数字
- 防御性措辞（"你误解了"）已标记
- scope_claim 和 evidence_gap 类的 overpromise 风险已标记
- cover letter 与逐条回复一致
- marked manuscript 行号与返修信引用一致

## 执行层说明

本协议提供返修策略与模板。执行时：
- 我按上述流程输出逐条指导块 + cover letter 草稿
- 用户确认后我再生成最终返修信成稿
- marked manuscript 的标红修改需用户提供原稿文件

## 与本技能其他 fragment 的衔接

- 返修前的审稿模拟 → `review-integrity.md`（多智能体对抗评审）+ `reviewer-perspective.md`（33 条真实审稿意见编码，含 Rebuttal 博弈分析）
- 返修涉及的稿件修改 → `writing-*.md` 对应 section
- 修改后引用核查 → `3dgs-citation-audit.md`
- 修改后格式自查 → `markdown-draft-format-audit.md` + `latex-source-hygiene.md`
- 双语交付 → 外调 `bilingual-paper-sync` 技能（Word 四件套 EN/CN docx+md）
