# Paper Skeleton Protocol — 论文骨架思维模板与四点自洽检查

> 融合自 tech-paper-template。用于阶段1论文骨架规划，在用户要求"论文骨架/逻辑链/thinking template/结构规划/这篇论文是 Technique 还是 New Problem"时加载。与 idea-evaluation.md 互补：本协议在 idea 通过评估后规划论文逻辑骨架。

## 适用场景

- idea 通过评估后、起草正文前的规划
- 与导师/合作者周会讨论论文进度
- 论文逻辑链感觉不连贯，需要审计
- 不确定论文是 Technique 还是 New Problem/Setting

## 核心流程

### Step 1: 论文类型定位

判断 Technique vs New Problem/Setting：

| 类型 | 核心叙事 | Key Idea 的角色 | Our Goal 的角色 |
|------|---------|----------------|----------------|
| Technique | Key Idea 为主角 | 承载叙事，是核心贡献 | 短桥，连接 idea 到 challenges |
| New Problem/Setting | Our Goal 为主角 | 论证可行性 | 是贡献本身 |

若用户的输入描述的是 benchmark 论文，转用 `benchmark-paper-template`（外调）。

### Step 2: 填充思维模板（七格）

| 阶段 | 内容契约 | 强格标准 | 常见失败 |
|------|---------|---------|---------|
| 研究背景 | 场景、重要性、动机 | 具体场景 + 为何重要 + 为何现在 | 泛泛而谈"X 很重要" |
| 局限 1-3 | 现有工作的具体不足 | 可引用的具体不足，非"还不够好" | 模糊批评、无人能认领 |
| Key Idea / Our Goal | 一句话 | 审稿人能引用的一句话 | 两句话或含从句的长句 |
| 挑战 1-3 | 实现 Key Idea 的技术障碍 | 从 Key Idea 自然衍生，非为了凑模块而编 | 编造挑战以凑模块 |
| 方法模块 A/B/C | 每模块对应一个挑战 | 一对一映射 | 模块无对应挑战或挑战无对应模块 |
| 贡献 1-3/4 | 每条映射到具体 section | 覆盖所有模块和实验结果 | 模糊贡献或承诺超出论文交付 |

**格数纪律**：局限 2-3 条（超过 3 条不收）；挑战 2-3 条（同上）；贡献 3-4 条。

若某格信息不完整，标注为 gap 并标严重度。

### Step 3: 四点自洽检查

| 检查 | 逻辑链 | 失败示例 |
|------|--------|---------|
| Check 1: 局限 → Key Idea | Key Idea 是否解决了陈述的局限？ | 局限说"慢"，Key Idea 解决"质量"——错位 |
| Check 2: Key Idea → 挑战 | 挑战是否从实现 Key Idea 自然衍生？ | 挑战与 Key Idea 无因果关系——编造 |
| Check 3: 挑战 → 方法 | 每个方法模块是否对应一个挑战？ | 模块无对应挑战——多余；挑战无对应模块——缺口 |
| Check 4: 方法 → 贡献 | 贡献是否覆盖每个模块和实验结果？ | 贡献模糊或承诺超出交付 |

**每个失败都是 CRITICAL。**

### Step 4: 生成方法章节大纲

从挑战推导方法大纲：
- 主题句（一句话概括方法）
- 每模块一个小节名
- 每模块一句话摘要

这成为论文 Section 3 或 4 的骨架。

### Step 5: 完整性门控

输出前检查：
1. 论文类型定位与用户实际贡献一致（Technique 不硬塞 New Problem 框架，反之亦然）
2. 局限具体且可引用，非模糊
3. Key Idea/Goal 是审稿人能引用的一句话
4. 挑战从 Key Idea 衍生，非编造
5. 方法模块与挑战一对一映射
6. 贡献映射到方法模块和具体 section
7. 四点自洽检查全过

任一失败 → 标"需用户注意"。

### Step 6: 输出

```
### 1. 论文类型定位
- 类型：<Technique Paper / New Problem/Setting Paper>
- 理由：<一句话>

### 2. 思维模板
| 阶段 | 你的内容 |
|------|---------|
| 研究背景 | ... |
| 局限 1 | ... |
| 局限 2 | ... |
| 局限 3（若有） | ... |
| Key Idea / Our Goal | ... |
| 挑战 1 | ... |
| 挑战 2 | ... |
| 挑战 3（若有） | ... |
| 方法主题句 | ... |
| 模块 A（应对挑战 1） | ... |
| 模块 B（应对挑战 2） | ... |
| 模块 C（应对挑战 3） | ... |
| 贡献 1 | ...（Section X） |
| 贡献 2 | ...（Section Y） |
| 贡献 3 | ...（Section Z） |

### 3. 自洽检查
- Check 1 局限→Key Idea：<过/失败>
- Check 2 Key Idea→挑战：<过/失败>
- Check 3 挑战→方法：<过/失败>
- Check 4 方法→贡献：<过/失败>

### 4. 严重度汇总
- <n> CRITICAL, <m> MAJOR, <k> MINOR
- 前三修复：...

### 5. 下一步建议
- 全过 → 加载 writing-abstract-intro.md 起草引言
- 有失败 → 先修复标注的断链
```

## 与本技能其他 fragment 的衔接

- 评估 idea 是否值得做 → 先 `idea-evaluation.md`
- 骨架通过后起草 → `writing-abstract-intro.md`（引言）/ `writing-related-method.md`（方法）/ `writing-experiments.md`（实验）
- 选 venue → `3dgs-domain-venues.md`
- 成稿后自评 → `paper-evaluation-framework.md`（四维创新模型+TRL+10维评分）
