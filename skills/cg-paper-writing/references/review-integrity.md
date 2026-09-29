---
# Multi-Agent Review, Citation Integrity & Style Calibration

## Multi-Agent Adversarial Review Pipeline

| Phase | Role | Responsibility | Output |
|-------|------|----------------|--------|
| Phase 1 | Structure Planner | Determine paper structure by target venue, section allocation, word budget | STRUCTURE_PLAN.md |
| Phase 2 | Citation Auditor | Verify Related Work citation accuracy and completeness | REF_VERIFICATION.md |
| Phase 3 | Methodology Writer | Write Methodology following structure, ensure symbol consistency | method_draft.md |
| Phase 4 | Experiment Analyst | Write experiments, verify data-declaration consistency | experiment_draft.md |
| Phase 5 | Adversarial Reviewer | Attack paper weaknesses from reviewer perspective | ADVERSARIAL_REPORT.md |
| Phase 6 | Revision Editor | Revise based on adversarial report, annotate each change | revision_diff.md |
| Phase 7 | Final Proofreader | Final consistency check | FINAL_CHECKLIST.md |

## Devil's Advocate Protocol

The adversarial reviewer must strictly follow this protocol to prevent AI sycophancy and frame-lock:

### 1. Concession Threshold Protocol

After the adversarial reviewer attacks the paper, if the author (or user) rebuts:
- Score rebuttal strength (1-5) before conceding
- Score ≥ 4: Rebuttal directly addresses attack core with evidence → allow concession
- Score ≤ 3: Attack still stands → maintain attack position, restate key points
- No consecutive concessions: Same argument cannot be conceded 2 times in a row
- Concession rate tracking: Single-round concession rate > 50% triggers sycophancy warning

### 2. Frame-Lock Detection

Self-check after each review round:
- Is the attack staying within the original framework? (Only questioning evidence, not premises)
- Are there unchallenged fundamental assumptions?
- If frame-lock detected, auto-inject meta-question: "Are we discussing the right question?"

### 3. Adversarial Review Checklist

| Dimension | Review Question | Weight |
|-----------|----------------|--------|
| Novelty | What is the core technical difference from XXX? Can it be stated in one sentence? | High |
| Theoretical completeness | Are there skipped steps in mathematical derivation? Are assumptions explicitly listed? | High |
| Experimental credibility | Does ablation verify each core module? Are baselines current SOTA? | High |
| Claim-evidence alignment | Does each claim in the contribution statement have corresponding experimental support? | Medium-High |
| Symbol consistency | Does the same symbol maintain strictly the same meaning throughout? | Medium |
| Writing clarity | Is the motivation chain coherent? Can the reader reproduce without seeing figures? | Medium |

### 4. High-Risk Attack Defusal: Contradictory Ablation Results（矛盾消融结果消解模式）

当同一组件存在两套方向相反的消融结果时（实测场景：旧单种子「推理期置空指令」诊断 Δ=−0.681 vs 新配对「训练期移除指令」重设计无显著差异），审稿人最高概率攻击是「结果自相矛盾 = 实验不可靠」。消解模式（P1 级修复，已验证可将该攻击从「维持」降为「条件性消解」）：

1. **协议差异最小表**：在消融小节插入一张对比表，逐属性列出两套实验的根本差异——种子数、样本量、组件处置方式（推理期置空 = 分布外干扰 vs 训练期移除 = 真正的组件消融）、先验是否共享、异常信号（如 MAE 暴涨 45 倍是分布偏移标志，而非必要性证据）。
2. **机制归因**：说明方向相反的原因——推理期置空衡量「网络对输入损坏的鲁棒性」，训练期移除衡量「该组件对任务是否必要」，二者回答不同问题，结果相反并不矛盾。
3. **结论裁决句**：明确声明以协议正确的那套结果为准，旧结果降级为诊断性观察并保留原文（不删除——如实披露两套结果本身是诚信加分项）。
4. **局限性章节呼应**：Limitations 中保留协议差异待审计的正式披露，与消融小节裁决口径一致，避免两处表述漂移。

禁止做法：静默删除旧结果（破坏诚信表述）；或让两套结果在文中各自成立而不裁决（审稿人必然发现并质疑）。
---

## Citation Three-Layer Verification

Every citation must pass all three layers. Any layer failure means the citation cannot be used directly:

### Layer 1: Existence Verification
- Does the arXiv ID actually exist? (Verify via arXiv API or Semantic Scholar)
- Is the DOI resolvable?
- Does the author-title-venue triplet match?

### Layer 2: Claim-Faithfulness Audit
- Each citation must annotate the specific claim it supports
- For each claim, verify: does the cited paper actually support that claim?
- Common violations:
  - Citation exists but content doesn't match claim ("wrong attribution")
  - Citation only partially supports claim but is described as fully supporting
  - Original text uses qualifiers ("may"/"in some cases") but citation presents as assertion

### Layer 3: Timeliness & Venue Verification
- Has the arXiv preprint been accepted at a formal conference? If so, must update citation format
- Is the cited method the current SOTA for that direction? If not, explain citation rationale
- Have 3DGS domain high-frequency fact errors been avoided? (See core-stance.md)

---

## Integrity Gate Mechanism

Two non-skippable integrity checkpoints in the writing process:

### Gate 1: Post-Draft Gate (before initial submission)
Must pass before submitting draft:
- [ ] All citations pass three-layer verification
- [ ] Each contribution claim has corresponding experiment/analysis support
- [ ] Ablation study covers all core modules
- [ ] Symbol table consistent with main text
- [ ] No AI-fabricated data (missing data marked as `<!-- DATA_NEEDED: <description> -->`)
- [ ] Experiment claims traceable to real artifacts (see static/experiment-claim-verification.md): every reported number maps to a server log / eval JSON / checkpoint; claimed data scale (tasks / episodes / seeds) matches data directories and training logs

### Gate 2: Pre-Submission Gate (before final submission)
Must pass before submitting final version:
- [ ] All HIGH/CRITICAL issues from adversarial review have been addressed
- [ ] Citation three-layer verification: zero failures
- [ ] Experimental data fully consistent with main text claims
- [ ] Format meets target venue requirements (pages/template/citation format)
- [ ] LaTeX source hygiene passed (see static/latex-source-hygiene.md, run scripts/check_paper_consistency.py): no ≥3 consecutive blank lines, no environment-end glued to \section on one line, cross-document references resolvable ("Figure 2(c) of the main paper" style), S-prefix numbering consistent, compile log clean (0 undefined / 0 error)
- [ ] Rebuttal预案 prepared (for anticipated reviewer challenges)
- [ ] Experiment claim provenance audit passed (static/experiment-claim-verification.md): no unsourced "server-scale" claims remain in the paper; for any newly launched training, dataset sanity check (non-zero action / target velocity) was run before launch

---

## Style Calibration Protocol

When user provides writing samples, execute this style learning process:

### Step 1: Extract Style Features
- Average sentence length and variance
- Passive voice frequency
- First person preference ("We"/"This paper"/"Our method")
- Transition word preference ("Consequently"/"Thus"/"As a result")
- Math expression density (formulas per paragraph)
- Paragraph structure pattern (claim-evidence-summary / direct statement)

### Step 2: Generate Style Profile
```
style_profile:
  avg_sentence_length: [value] words
  passive_ratio: [value]%
  first_person_preference: "We" / "This paper" / mixed
  transition_preference: [top-3]
  math_density: low/medium/high
  paragraph_pattern: [pattern]
  domain_specific_phrases: [list]
```

### Step 3: Apply Style Constraints
- Subsequent writing strictly follows extracted style profile
- Self-check every 3 paragraphs: does current output match style profile
- If deviation > 2 dimensions, auto-correct

---

## Writing Quality Check

| AI Trace Pattern | Detection Method | Correction Strategy |
|-----------------|-----------------|-------------------|
| Three-part parallel (A, B, and C) | 3 consecutive same-structure sentences | Vary middle sentence structure |
| Excessive "Furthermore/Moreover" | Frequency > 2/page | Replace with direct transition or delete |
| "Significantly improves" without data | Check if followed by numbers | Add specific metrics |
| Generic optimistic ending | Last paragraph has no specific finding | End with open question or specific limitation |
| Citation stuffing | Single sentence > 3 citations without per-paper explanation | Explain each paper's contribution individually |
| "It is worth noting that" | String match | Delete directly |
| Excessive em-dashes | Single paragraph > 2 em-dashes | Rewrite as independent sentences |
| Bold non-terminology emphasis | Regex detection | Keep italics only for terminology |
| Hollow superlatives | "effectively"/"seamlessly" | Delete or replace with factual statement |

---

## Persistent Knowledge Base Support

### Writing Context Persistence

During paper writing, the following information should be persisted for cross-session reuse:

```
Project directory/
├── .paper-context/
│   ├── style_profile.md        # Style profile
│   ├── symbol_table.md         # Symbol definition table
│   ├── ref_registry.md         # Citation registry (with three-layer verification status)
│   ├── claim_evidence_map.md   # Claim-evidence mapping
│   ├── adversarial_log.md      # Adversarial review history
│   └── gate_status.md          # Gate pass status
```

### Cross-Session Recovery Protocol
1. At each writing session start, auto-load all files under `.paper-context/`
2. Read `gate_status.md` to confirm current progress and unpassed items
3. Continue handling unresolved review issues based on `adversarial_log.md`
4. Ensure symbol consistency across sessions based on `symbol_table.md`
5. Avoid re-verifying passed citations based on `ref_registry.md`

### Citation Registry Format
```
| ID | Citation | Supported Claim | Layer1 | Layer2 | Layer3 | Status |
|----|----------|----------------|--------|--------|--------|--------|
| R1 | Kerbl et al. 2024 | 3DGS real-time rendering | PASS | PASS | PASS | VERIFIED |
| R2 | XXX | [...] | PASS | FAIL-wrong attribution | - | NEEDS_FIX |
```