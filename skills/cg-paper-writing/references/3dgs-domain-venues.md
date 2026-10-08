# 3DGS 细分领域 → 核心期刊能力（领域知识参考）

> **用途**：写 3DGS 论文时，按子领域定位首选会议/期刊、判断近期活跃方向、给出选题切口与实验基线。本文件是 `cg-paper-writing` 的领域知识扩展，**不与写作模板/venue 格式冲突**，只回答"写什么、投哪、比什么"。
> **数据口径**：`data/methods.json`(v0.9.6，881 方法 / 23 类) + `reports/arxiv-daily/`(2026-09-28→10-08 每日扫描) + `changelog/2026-10-07.md`(v0.9.6 人工收录 9 篇)。所有论文 ID 均经 arXiv API / 扫描 / R9 协议核验。
> **完整性标记**：`[精读]`=已读摘要可给具体增益；`[题录]`=仅题录，子领域与切口为推断，不写指标。

---

## 1. 细分领域 → 核心期刊矩阵（23 类）

分布来自 `methods.json` 全量；`arXiv(preprint)` 占比高属领域常态，投稿以非预印本 venue 为首选。"近期热度"= 2026-09-28→10-08 新论文落入该类的数量。

| 细分领域 | 总量 | 首选会议 | 首选期刊(英文长文) | 推荐中文期刊 | 热度 |
|----------|-----|----------|-------------------|-------------|:---:|
| Dynamic & 4D | 91 | CVPR / NeurIPS | TOG / TVCG | JCAD、图学学报、VRIH | 🔥🔥🔥 |
| Feed-Forward | 86 | CVPR / NeurIPS | TOG / 3DV | JCAD、CJIG | 🔥🔥🔥 |
| Surface & Rendering | 65 | CVPR / ECCV | TOG / TVCG | JCAD、图学学报、VCIBA | 🔥🔥 |
| Cross-Domain | 65 | CVPR / NeurIPS | TVCG / CGF | CJIG、计算机应用 | 🔥🔥🔥 |
| Compression & Streaming | 52 | NeurIPS / ECCV | TVCG / TOG | JCAD、CJIG、JSKX | 🔥🔥🔥 |
| Optimization | 51 | CVPR / SIGGRAPH | TOG / TPAMI | JCAD、CJC、JOS | 🔥🔥 |
| SLAM | 47 | CVPR / ICRA | TRO / RA-L | 机器人、自动化学报 | 🔥🔥 |
| Editing | 45 | CVPR / ECCV | TOG / TVCG | JCAD、VCIBA | 🔥🔥 |
| Human & Avatar | 42 | CVPR / SIGGRAPH | TOG / TVCG | JCAD、VRIH | 🔥🔥 |
| Embodied AI & Robotics | 42 | CVPR / ICRA / CoRL | RA-L / TRO | 机器人、自动化学报 | 🔥🔥🔥 |
| Generation | 41 | NeurIPS / CVPR | TOG / SIGGRAPH | JCAD、CJIG | 🔥🔥 |
| Language & Semantic | 37 | CVPR / ECCV | IJCV / TPAMI | CJIG、中文信息学报 | 🔥🔥 |
| Foundation | 27 | CVPR / NeurIPS | TOG / TPAMI | CJC、JOS | 🔥🔥 |
| HDR & Relighting | 26 | CVPR / SIGGRAPH | TOG / TPAMI | JCAD、CJIG | 🔥🔥 |
| Autonomous Driving | 25 | CVPR | IJCV / RA-L | 机器人、CJIG、自动化学报 | 🔥🔥 |
| Sparse-View | 25 | NeurIPS / ECCV / CVPR | IJCV / TOG | JCAD、CJIG | 🔥🔥🔥 |
| Acceleration | 23 | CVPR* | TVCG / TOG | JAD、JSKX | 🔥🔥🔥 |
| Robustness | 22 | CVPR / ECCV | IJCV / TPAMI | CJIG、计算机应用研究 | 🔥🔥 |
| CAD & Reverse Engineering | 20 | CVPR / ICCV | TOG / TVCG | JCAD、图学学报 | 🔥🔥 |
| Large-Scale | 20 | ECCV / NeurIPS | TOG / TVCG | CJIG、JCAD | 🔥🔥 |
| Simulation | 11 | SIGGRAPH | TOG | JCAD、VRIH | 🔥 |
| Security | 10 | NeurIPS / ICML | TPAMI / IJCV | CJC、CRAD、JOS | 🔥 |
| World Models & Spatial Intelligence | 8 | ECCV / NeurIPS | TPAMI / SCIS | 自动化学报、SCIS | 🔥🔥 |

> `*`Acceleration 类 91% 仍为预印本，正式会议归宿未定型——投稿优先 CVPR 并同步 arXiv。
> 中文期刊代号：CJC 计算机学报、JOS 软件学报、JCAD 计算机辅助设计与图形学学报、CJIG 中国图象图形学报、VCIBA 工医艺可视计算、VRIH 虚拟现实与智能硬件、TXB 图学学报、AAS 自动化学报、SCIS 中国科学:信息科学、CRAD 计算机研究与发展、JSKX 计算机科学、JCIS 中文信息学报。具体格式见本技能 `<venue>-format.md`。
> **分区/IF 维度（通用 AI 期刊）**：图形/视觉专刊（TOG/TVCG/IJCV）满了或稿件偏 AI/交叉时，可用 TPAMI / Pattern Recognition / Information Fusion / Engineering Applications of AI / Medical Image Analysis 等通用 AI 刊作替代落点；其**中科院分区与 IF 速查 + 3DGS 适配标注**见项目 `references/ai-journal-landscape-2026.md`（注意该数据为二手编译，写稿前须一手核实，见该文件来源声明）。

---

## 2. 近期前沿热点（按子领域，2026-09-28→10-08）

- **Feed-Forward** 🔥🔥🔥 — DeltaSplat(`2610.09853`)[精读] pose-free 残差迭代精修(+2.2%参数, DL3DV 26.64dB)；DensiTok(`2610.07958`)[精读] latent 补全未观测视角；MoonGS(`2610.07110`)[精读] 月面前馈(+4.9dB)；AESplat(`2609.36693`)[精读] 解耦 SH；AGILE-GS(`2609.34176`)[精读] anchor 引导 NBV。
- **Dynamic & 4D** 🔥🔥🔥 — Mobile-4DGS(`2610.05289`)[精读] 移动端实时；SteadySplats(`2610.05576`)[精读] 低方差重采样随机渲染；DispFlow-GS / Affine-Aligned Atlas[题录]。
- **Compression & Streaming** 🔥🔥🔥 — GSCV(`2610.07795`)[精读] 标准视频 codec 压序列(Inter-PLAS)；Observation-Gram(`2609.28997`)[精读] Gram 矩阵压 SH(+0.49dB)。
- **Acceleration** 🔥🔥🔥 — TileSkipper(`2610.09343`)[精读] 单字节区域自适应 tile 剪枝(1.088–1.238×)；Speedy-Splat(`2412.00578`)[精读, CVPR2025] 10.6×压缩/6.71×提速。
- **Cross-Domain** 🔥🔥🔥 — SURGE(`2610.07472`)[精读] 水下声纳+视觉因子图→GS；EndoPrior-GS(医学)/Dirichlet Splatting(波逆问题)/Remote Sensing[题录]。
- **Embodied AI & Robotics** 🔥🔥🔥 — OpenSplatGraph(`2610.07569`)[精读] dense map→场景图；ControlPed(`2610.06171`)[精读] GS 可控风险场景(HDScore 88.8→47.4)；PneuTac/CollisionSplatting[题录]。
- **Sparse-View** 🔥🔥🔥 — OC-GS(`2609.31572`)[精读]、UGOD(`2609.39089`)[精读] 不确定性门控、ClearGS(`2609.31509`)[精读] 可靠性视图分配。
- **Editing** 🔥🔥 — MaRO-GS(`2610.06472`)[精读] 鲁棒 mask 物体级 GS(+2.05dB)；GS-Pool(`2610.06688`)[精读] 物体级变化检测(mIoU 0.751)。
- **HDR & Relighting** 🔥🔥 — Casual Flash Lighting(`2610.06035`)[精读] 闪光双光照逆渲染(+4.17dB)。
- **Language & Semantic** 🔥🔥 — Post-Training Semantic Lifting(`2610.08756`)[精读] 误差可分离语义提升(ScanNet++ 0.80)。
- **Optimization** 🔥🔥 — TangoGS(`2609.31248`)[精读] 密度控制(-48% 高斯)。
- **CAD** 🔥🔥 — MEGA(`2610.01707`)[精读] 蒸馏式网格提取。
- **SLAM** 🔥🔥 — RRTO-CF3DGS(`2609.30865`)[精读] 可靠性轨迹优化 COLMAP-free。
- **Large-Scale** 🔥🔥 — ChronoFuseGS(`2609.31339`)[精读, PG2026] 多时相融合。
- **Autonomous Driving** 🔥🔥 — ControlPed(见 Embodied)。
- **Foundation** 🔥🔥 — SPLATIFY(`2610.09116`)[精读] 论文→可训练 gsplat 代码自动化。
- **Security** 🔥 — TRACE(`2610.00822`)[精读] 分布式 GS 隐私 NBV。
- **World Models / Generation / Simulation / Robustness** — 本期新增偏少，选题前先补扫。

---

## 3. 快速选题切口（由 §2 归纳）

1. Pose-free/少视角前馈误差修正 → Feed-Forward/Sparse-View；CVPR/NeurIPS；基线 DepthSplat/NAS3R/MVSplat。
2. 无训练单字节推理加速 plugin → Acceleration；CVPR/TVCG；基线 Speedy-Splat/LightGaussian。
3. GS 序列用现成视频 codec → Compression；NeurIPS/ECCV/TVCG；基线 Compressed3D/PLAS。
4. 训练后语义提升+误差可分离 → Language&Semantic；CVPR/ECCV；基线 LEGaussians/Feature-3DGS。
5. dense map→结构化场景图 → Embodied；ICRA/CoRL/RA-L；基线 ConceptGraphs。
6. GS 可控风险场景(自动驾驶安全) → Autonomous Driving/Human；CVPR/机器人；基线端到端模型(HDScore)。
7. casual 主动光照降歧义逆渲染 → HDR&Relighting；SIGGRAPH/TOG；基线 InvRender/GS-IR。
8. 多模态因子图(声学+视觉)→GS → Cross-Domain/SLAM；ICRA/RA-L。
9. 物体级变化检测/场景审计 → Editing/Cross-Domain；CVPR/ECCV；基线 GS-Diff/O-SCD。
10. 鲁棒 mask/不确定性监督 → Editing/Sparse-View；CVPR；基线 SAM-guided object GS。
11. 密度控制/帧选择 optimization 微创新 → Optimization；CVPR/SIGGRAPH；比 3DGS 原始 densification。
12. 论文→代码自动化基础设施 → Foundation；系统/AI 会议。
13. 联邦/分布式 GS 隐私 → Security；NeurIPS/ICML；基线分布式 NBV。

---

## 4. 实验速查（数据集 / 基线 / 指标）

| 子领域 | 常用数据集 | 必比基线 | 核心指标 |
|--------|-----------|---------|---------|
| Feed-Forward(通用) | DL3DV、RealEstate10K、CO3D-V2、ACID | MVSplat、DepthSplat、pixelSplat、NAS3R | PSNR/SSIM/LPIPS |
| Feed-Forward(科学弱纹理) | LuSNAR、MoonBlender(合成) | 前馈 NeRF/3DGS | PSNR/SSIM/LPIPS、时延 |
| Dynamic & 4D | D-NeRF、HyperNeRF、MeetRoom、Neu3D | 4D-GS、Deformed-GS | PSNR/SSIM/LPIPS、FPS |
| Acceleration | Mip-NeRF 360、Tanks&Temples、Deep Blending | LightGaussian、Speedy-Splat、Scaffold-GS | PSNR、FPS、存储(MB)、参数量 |
| Compression | 上述+自采序列 | Compressed3D、PLAS、LightGaussian | 比特率/PSNR、BD-rate、解码时延 |
| Sparse-View | LLFF、DTU、CO3D-V2、RealEstate10K | FSGS、DNGaussian、对应前馈 | PSNR/SSIM/LPIPS |
| SLAM | TUM-RGBD、Replica、ScanNet、T&T | SplaTAM、MonoGS、Gaussian-SLAM | ATE(RMSE)、渲染 PSNR |
| Language & Semantic | ScanNet++、Replica、LERF、3D-OVS | LEGaussians、Feature-3DGS、LangSplat、GAGS | mIoU、语义 PSNR |
| HDR & Relighting | 合成+真实室内(自建) | InvRender、GS-IR、Relightable 3DGS | PSNR(重光照)、albedo/roughness 误差 |
| Editing | 标准场景+分割/修复基准 | 对应 inpainting/编辑 SOTA | PSNR/SSIM/LPIPS、FID |
| Embodied/Robotics | ScanNet++、真实机器人、ConceptGraphs | ConceptGraphs、Hierarchical 3DGS | 定位 mAP、关系推理准确率 |
| Autonomous Driving | 交通视频派生、nuScenes | 端到端驾驶模型(HDScore) | HDScore、碰撞率 |
| CAD/Reverse | DTU、自定义物体、ShapeNet | SuGaR、2DGS、Gauss-to-Mesh | Chamfer、F-score、法向误差 |

> 指标口径：PSNR 注明含/不含背景与分辨率；压缩类给比特率；加速类标无损/有损边界与存储。详见本技能 `experiment-claim-verification.md`。

---

## 5. 红线（与本技能 core-stance 一致）

- **不虚构**：指标/ID/venue 须来自本文件或一手来源；缺失写 `<!-- DATA_NEEDED -->` 或 "N/A"。
- **引文三验**：arXiv ID 经 API 核验标题一致；作者/venue 三要素一致。凭记忆报的 ID 先验再写（InFusion=2404.11613、CityGaussian=2404.01133、Scaffold-GS=2312.00109）。
- **不冒领**：方法特征/结果不得跨方法错配。
- **派生后缀**：`+/++/-v2` 须对照 arXiv 标题，作者自印才保留。
- **描述性标题不是方法名**：论文未自述方法名的不入方法库。
- 完整写作规范、贡献四件套、venue 格式见本技能 `core-stance.md` / `venue-formats.md` / 各 `<venue>-format.md`。
