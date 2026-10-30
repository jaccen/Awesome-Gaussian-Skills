# cg-paper-writing 专业性审核与修订

日期：2026-10-30。范围：工程 skills/cg-paper-writing；未同步覆盖已安装副本，也未提交 Git。研究员、审稿人、编辑均为 AI 模拟视角，不是实际期刊人员认证。

## 结论

该技能有较好的领域资源、引用核验和生命周期覆盖基础，但原有规则存在实质冲突，不能据此声称显著提高录用率。此次修订增强专业判断和可追溯写作流程；效率与录用效果仍需真实使用评估。

## 关键发现与落地

| 问题 | 修订位置 | 处理 |
|---|---|---|
| 强制 t 检验、固定 dB 门槛、筛选达标场景 | experiment-design-protocol.md / writing-experiments.md | 明确独立单位、效应与不确定性；分开 pilot 和最终测试 |
| 固定数据集场景数/分辨率、方法与数据混淆 | experiment-design-protocol.md | 改为任务候选与官方协议核查 |
| 自评分映射 CCF/录用、限制审稿让步 | paper-evaluation-framework.md / SKILL.md | 取消录用推断与攻防配额，依据反证修正 |
| 大修意味着核心结论获接受、Nature 泛化 | top-journal-strategy.md | 改为具体期刊、文章类型和当前官方政策 |
| 将小样本审稿案例当中稿规律 | reviewer-perspective.md | 标为待核历史假说，禁止胜率/因果推断，修复不可复现建议与 Pareto 错误 |
| 从措辞猜审稿人心理与提分率 | rebuttal-protocol.md | 围绕具体 concern、证据与稿件修改 |
| 基元 opacity 与像素 alpha 混用 | symbols-terminology.md | 区分 o_i 和 alpha_i(x)，透射率显式依赖像素和排序 |
| 元数据核验被当成主张核验 | 3dgs-paper-knowledge.md | 分开身份、技术支持和 venue 核查 |
| 全局门控与最新核验协议冲突 | core-stance.md / SKILL.md | 草稿可标缺失证据，仅已完成检查可声明投稿就绪 |

新增 domain-evidence-review.md：覆盖投影/表示、几何、动态、CAD/SLAM、预训练重叠、压缩实际字节、完整计时，以及声明—证据—协议—状态台账。SKILL.md 与 manifest.yaml 已接入。

## 与其他技能学习

阅读本机 scientific-writing 与 peer-review 的 SKILL.md，采用先证据提纲后连续正文、可定位建设性评审。未发现独立 nature-polishing / nature-response 目录；现有融合名称不是已验证能力证据。拒绝迁移所有论文必须生成图形摘要/AI 图片的规则，也不将生物医学清单套用到 CG。

参考 Nature reporting standards、initial submission、formatting guide，以及 CVPR 2026 reviewer training 和 SIGGRAPH 2026 reviewer instructions；链接和迁移边界保存在 top-journal-strategy.md。Nature 正文直连受认证跳转限制，实际依据可检索摘要，不宣称完成全面政策核验。

## 验证与限制

全部 2704 个 section/venue/task 路由组合可解析且未发现缺失片段。通用 quick_validate 在 UTF-8 模式可读取，但拒绝仓库原有扩展 frontmatter 字段；为保留工程元数据未删除这些字段。结构验证不证明科研正确性。

部分历史 exemplar 和审稿案例尚缺逐条来源编码，现已限制其证据权重。本次未逐篇重核整个方法库，也未对真实论文做受控效率/录用率实验。建议后续以原版/修订版处理相同授权稿件，人工盲评事实错误、主张证据一致性、修改耗时、作者采纳率；录用率需控制稿件质量和 venue 混杂，不能由模拟评分替代。

## 情景复核

独立前向验证代理因服务额度限制未完成，以下由主代理进行规则级复核，不等同实际模型运行评测：

- 仅提供 PSNR 改善时，不支持“几何显著提升”；需要几何指标/产物或收窄摘要。
- 分辨率不同的 FPS 不支持“快两倍”；先核查相同设置和计时边界。
- 自评 88 分不支持 Nature 录用概率；需准确期刊定位和实际稿件证据，不输出伪概率。

上述行为由入口 operating contract 与 domain-evidence-review.md 明确规定。历史模板仍可能带来干扰，需在后续真实使用中继续验证。
