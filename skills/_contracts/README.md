# 技能编排层（Skill Orchestration Contracts）

> v0.8 新增：把 15 个技能从"各自独立"升级为"可组合流水线"。
> 技能间交接必须通过机器可验证的 JSON 契约，而不是自由文本。

## 三份契约

| 契约 | 生产者 | 消费者 | 校验 |
|------|--------|--------|------|
| `paper-insight.schema.json` | 3dgs-paper-reader | method-compare / experiment-planner / cg-paper-writing | arXiv ID 格式、结果数字必须带 dataset+metric、provenance 必填 |
| `comparison-report.schema.json` | 3dgs-method-compare | cg-paper-writing（Related Work）/ experiment-planner（基线选择） | ≥2 方法、≥1 维度、维度值数组长度与方法数一致（语义约定） |
| `experiment-plan.schema.json` | 3dgs-experiment-planner | 研究者 / benchmark arena | baselines 必须真实存在、ablations 必须带假设 |

## 校验方式

```bash
# 用示例自校验（CI 可直接跑这三条）
python3 scripts/validate_skill_contract.py paper-insight --example > /dev/null
python3 scripts/validate_skill_contract.py comparison-report --example > /dev/null
python3 scripts/validate_skill_contract.py experiment-plan --example > /dev/null

# 校验真实产出
python3 scripts/validate_skill_contract.py paper-insight my-paper-reading.json
```

## 标准流水线

```
用户给 arXiv ID
   │
   ▼
3dgs-paper-reader ──(paper-insight)──▶ validate_skill_contract.py ✓
   │                                        │
   ▼                                        ▼
3dgs-method-compare ◀── 同类方法检索 ── data/methods.json（单一数据源）
   │
   ├──(comparison-report)──▶ cg-paper-writing（Related Work 初稿）
   │
   └──(comparison-report)──▶ 3dgs-experiment-planner
                                  │
                                  └──(experiment-plan)──▶ bench/run_eval.py（实测 [S] 数字回填）
```

## Router 机制

Router 技能（method-compare / cg-paper-writing / engineering-guide）的
manifest.yaml 现在有了真实加载器：

```bash
python3 scripts/router_load.py skills/3dgs-method-compare --list
python3 scripts/router_load.py skills/3dgs-method-compare --category=core --emit
```

加载器校验轴值合法性与片段存在性（退出码 1/2/3 区分错误类型），
agent 可用它替代人工查表决定上下文装载。
