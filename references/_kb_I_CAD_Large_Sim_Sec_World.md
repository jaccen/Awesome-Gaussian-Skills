# 知识库 · 簇 I_CAD_Large_Sim_Sec_World

> 本簇覆盖子领域：CAD & Reverse Engineering、Large-Scale、Simulation、Security、World Models & Spatial Intelligence
> 说明：经典(2023-2024) 9 篇深度全覆盖；2025 已确立 0 篇（无简表）；2026 焦点 3 篇详写。所有指标仅来自 arxiv 摘要或确知内容，不确定处标「待补」。

---

## 经典论文（2023-2024，深度全覆盖）

### Scaffold-GS (`2312.00109`, ICCV 2023)
- **摘要**: 针对 3DGS 为拟合每个训练视角而产生大量冗余高斯、忽视底层几何、对大视角变化/无纹理/光照变化鲁棒性差的问题，提出以 anchor 点分布局部高斯、按视向与距离在视锥内实时预测属性，并配合 anchor 生长/剪枝策略提升场景覆盖。
- **创新点**: ① 用 anchor 点结构化组织高斯，告别逐点冗余；② 视自适应（view-adaptive）属性预测，按需生成局部高斯；③ 基于重要性的 anchor 生长/剪枝，天然支持多细节层次（LoD）与视相关观测。
- **核心方法**: anchor 点与局部神经高斯（neural Gaussians）分离；MLP 依据视向/距离输出高斯属性；anchor growing & pruning 控制规模；保留实时光栅化速度。
- **实验设计与分析**: 在含大视角变化、无纹理区域的场景上验证，相对 vanilla 3DGS 显著减少冗余高斯且质量不降；支持多 LoD 与视相关，渲染速度保持。具体 PSNR/SSIM 数字「待补」；支撑 claim：更少高斯+更高质量+视自适应。
- **写作可嫁接点**: 作为"结构化/anchor 驱动 3DGS"的代表基线，可在 related-work 对比大规模/动态场景或讨论冗余与 LoD 时引用；大规模（CityGS/DOGS）与动态（Street Gaussians）工作的前身参照。
- **核查**: arxiv 标题=Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering（一致）

### 2DGS (`2403.17888`, SIGGRAPH 2024)
- **摘要**: 指出 3DGS 因 3D 高斯的多视角不一致性而难以准确表达表面，提出将 3D 体积坍缩为一组 2D 有向平面高斯盘，以视角一致的方式建模几何内在表面，实现几何精确的辐射场重建。
- **创新点**: ① 用 2D 有向平面高斯替代 3D 高斯，提供视角一致几何；② perspective-correct 2D splatting（ray-splat 相交+光栅化）稳定优化薄表面；③ 引入 depth distortion 与 normal consistency 损失提升重建质量。
- **核心方法**: 2D 高斯（平面 disk）表示；射线-面元求交的可微光栅化；深度失真项 + 法向一致性项约束几何；可微渲染器支持无噪、细节化几何重建。
- **实验设计与分析**: 在 MipNeRF-360、Tanks&Temples、DTU 等几何/外观基准上验证几何精度与外观质量兼具，训练快、实时渲染。具体几何误差/PSNR「待补」；支撑 claim：几何精确且外观有竞争力。
- **写作可嫁接点**: 作为"几何精确 3DGS"基线，凡涉及表面重建、法向/深度监督、CAD/反向工程几何质量对比时必引；是后续高斯几何化工作的基础。
- **核查**: arxiv 标题=2D Gaussian Splatting for Geometrically Accurate Radiance Fields（一致）

### CityGaussian (`2404.01133`, ECCV 2024)
- **摘要**: 面向大规模场景，3DGS 的训练效率与跨尺度实时渲染仍是挑战；提出 CityGaussian（CityGS），以分治训练 + 细节层次（LoD）策略实现高效大规模 3DGS 训练与实时渲染。
- **创新点**: ① 分治（divide-and-conquer）训练：全局场景先验 + 自适应训练数据选择实现高效训练与无缝融合；② 基于融合高斯生成不同细节层级（压缩）；③ block-wise 细节层级选择+聚合，实现跨尺度快速渲染。
- **核心方法**: 场景分块训练后融合为统一高斯；按压缩产生多 LoD；推理时按块选择/聚合 LoD；兼顾一致实时渲染与大规模覆盖。
- **实验设计与分析**: 在大规模城市场景上达到 SOTA 渲染质量，并能在差异极大的尺度间一致实时渲染。具体 FPS/PSNR「待补」；支撑 claim：大规模场景 SOTA 质量+跨尺度实时。
- **写作可嫁接点**: 大规模 3DGS 代表性工作，与 DOGS（分布式训练）、SCube（前馈大模型）、Street Gaussians（动态城市）并列引用；讨论训练效率/渲染扩展性时作基线。
- **核查**: arxiv 标题=CityGaussian: Real-time High-quality Large-Scale Scene Rendering with Gaussians（一致）

### DOGS (`2405.13943`, NeurIPS 2024)
- **摘要**: 关注大规模场景 3DGS 的训练效率短板，提出 DoGaussian（DOGS），将场景分解为 K 块并用 ADMM 把 3DGS 训练分布式化，在保持渲染质量的同时大幅加速训练。
- **创新点**: ① 将 ADMM（交替方向乘子法）引入 3DGS 训练，主控全局模型、从控 K 个局部模型；② 通过对共享高斯的 consensus 保证收敛与稳定；③ 训练后丢弃局部模型，仅查询全局模型，消息尺寸不随地图增长。
- **核心方法**: 场景分解 + 分布式 ADMM 优化；master 节点持全局 3DGS，slave 节点持局部 3DGS；consensus 约束共享高斯；推理只用全局模型。
- **实验设计与分析**: 在大规模场景上训练加速 6+ 倍，同时达到 SOTA 渲染质量（具体 PSNR/SSIM「待补」）。支撑 claim：分布式训练既快又稳且质量不降。
- **写作可嫁接点**: 大规模训练效率方向核心基线，与 CityGS 的"分治融合"路线对照（后者重 LoD 渲染、本工作重点重分布式优化）；讨论训练扩展性/多机训练时引用。
- **核查**: arxiv 标题=DOGS: Distributed-Oriented Gaussian Splatting for Large-Scale 3D Reconstruction Via Gaussian Consensus（一致）

### GS-Hider (`2405.15118`, NeurIPS 2024)
- **摘要**: 鉴于 3DGS 显式表示+实时渲染使其点云公开透明、每点物理意义明确，提出首个针对 3DGS 的隐写框架 GS-Hider，可将 3D 场景与图像以不可见方式嵌入原始 GS 点云并准确提取隐藏信息。
- **创新点**: ① 首个面向 3DGS 的隐写（steganography）框架；② 设计耦合的安全特征属性替代原始球谐系数，用场景解码器与消息解码器解耦 RGB 场景与隐藏消息；③ 在保真渲染的同时具备安全性、鲁棒性、容量与灵活性。
- **核心方法**: 耦合安全特征属性替换 SH 系数；双解码器（scene decoder + message decoder）分离渲染内容与隐写消息；保持渲染质量不受损。
- **实验设计与分析**: 在 3DGS 上验证可隐蔽多模态消息且渲染质量不降，具备安全性/鲁棒性/容量/灵活性（具体容量比特数、攻击鲁棒率「待补」）。支撑 claim：不可见嵌入+可靠提取+多属性兼顾。
- **写作可嫁接点**: 3DGS 安全/隐写方向代表，与 GaussianMarker（水印版权）、GeometryCloak（图像保护、对抗侧）构成 Security 子领域三足；讨论 3D 资产版权/加密传输时引用。
- **核查**: arxiv 标题=GS-Hider: Hiding Messages into 3D Gaussian Splatting（一致）

### GaussianMarker (`2410.23718`, NeurIPS 2024)
- **摘要**: 面向 3DGS 资产的版权保护，指出现有点云/网格/隐式辐射场水印无法直接用于显式高斯，提出基于不确定性的水印方法，约束参数扰动实现不可见水印，并能在 3D/2D 多种失真下稳健提取版权信息。
- **创新点**: ① 针对 3DGS 显式结构、无神经网络依赖的特异性设计水印；② 以不确定性约束模型参数扰动，避免预训练 3DGS 上嵌入导致渲染明显失真；③ 消息可从 3D 高斯与 2D 渲染图双路径提取，抗多种 3D/2D 失真。
- **核心方法**: 不确定性感知的扰动约束；在 3DGS 参数上嵌入水印；解码端支持高斯与渲染图双重提取。
- **实验设计与分析**: 在 Blender、LLFF、MipNeRF-360 上验证，消息解码准确率与视角合成质量均达 SOTA（具体准确率/PSNR「待补」）。支撑 claim：不可见+双路径稳健提取。
- **写作可嫁接点**: 3DGS 水印/版权保护代表，与 GS-Hider（隐写）、GeometryCloak（图像侧防护）区分引用；讨论"主动"版权标记 vs"被动"隐写时作对比基线。
- **核查**: arxiv 标题=GaussianMarker: Uncertainty-Aware Copyright Protection of 3D Gaussian Splatting（一致）

### GeometryCloak (`2410.22705`, NeurIPS 2024)
- **摘要**: 针对单视图 TGS 可在数秒内从单张图生成 3D 模型带来的版权滥用风险，提出在图像送入 TGS 前嵌入不可见的"几何斗篷"扰动，使 TGS 重建以可识别的定制图案失败，从而宣示版权。
- **创新点**: ① 在图像端（而非 3D 模型端）做防护，拦在重建之前；② 区别于常规对抗攻击只降质，本方法强制造失败并以定制水印图案暴露；③ 扰动不可见，平衡防护与可用性。
- **核心方法**: 为图像嵌入定制几何扰动（geometry cloak）；TGS 重建时触发可识别图案作为水印；以"失败方式可控"实现版权声明。
- **实验设计与分析**: 在 TGS 单视图重建上验证几何斗篷有效性（具体成功率/不可见性指标「待补」）。支撑 claim：在保护图像版权的同时阻止未授权 3D 重建。
- **写作可嫁接点**: Security 子领域"图像侧防护/对抗 TGS"代表，与 GS-Hider/GaussianMarker（模型侧）形成"进攻前拦截 vs 资产内标记"互补；讨论生成模型版权治理时引用。
- **核查**: arxiv 标题=Geometry Cloak: Preventing TGS-based 3D Reconstruction from Copyrighted Images（一致）

### SCube (`2410.20030`, NeurIPS 2024)
- **摘要**: 从稀疏位姿图像即时重建大规模场景（几何/外观/语义），提出 VoxSplat 表示（支撑于高分辨率稀疏体素支架上的一组 3D 高斯），用层级体素潜扩散 + 前馈外观预测，从少至 3 张非重叠图 20 秒内生成数百万高斯。
- **创新点**: ① 新表示 VoxSplat：高分辨率稀疏体素上的 3D 高斯集合；② 层级体素潜扩散粗到细生成高分辨率网格 + 前馈外观网络预测每体素高斯；③ 告别逐场景优化，少视图即得锐利输出（而非低分辨率先验的模糊结果）。
- **核心方法**: 稀疏体素支架 + 3D 高斯；coarse-to-fine 层级体素潜扩散；feedforward appearance prediction；支持 LiDAR 仿真、text-to-scene 生成等应用。
- **实验设计与分析**: 在 Waymo 自动驾驶数据集上对比 3D 重建，从少视图（3 张）覆盖数百米、1024³ 体素、20 秒生成数百万高斯（具体指标「待补」）。支撑 claim：少视图锐利重建 + 即时大规模。
- **写作可嫁接点**: "前馈/大模型 3DGS 重建"代表，与 CityGS/DOGS（优化式大规模）路线对照；World Models/Spatial Intelligence 子领域中少视图即时重建的强基线。
- **核查**: arxiv 标题=SCube: Instant Large-Scale Scene Reconstruction using VoxSplats（一致）

### Street Gaussians (`2401.01339`, ECCV 2024)
- **摘要**: 面向自动驾驶动态城市场景，指出现有 NeRF 方法训练/渲染慢，提出 Street Gaussians 显式表示：以带语义 logits 与 3D 高斯的动态点云建模前景车辆与背景，可在半小时内训练并以 135 FPS 渲染。
- **创新点**: ① 显式点云 + 3D 高斯建模动态城市场景，告别慢速 NeRF；② 前景车辆用可优化跟踪位姿 + 4D 球谐建模动态外观；③ 显式表示便于车辆与背景组合/场景编辑。
- **核心方法**: 每物体点云配 3D 高斯与可优化跟踪位姿；4D SH 建模动态外观；背景与前景分离；半小时内训练、1066×1600 分辨率 135 FPS。
- **实验设计与分析**: 在 KITTI、Waymo Open 等基准上一致超越 SOTA，训练半小时内、渲染 135 FPS（1066×1600）。支撑 claim：动态城市场景质量+速度双优且可编辑。
- **写作可嫁接点**: 动态城市/自动驾驶 3DGS 代表，与 CityGS（静态大规模）、SCube（前馈）区分；讨论动态场景、4D 外观、场景编辑、自动驾驶仿真时引用。
- **核查**: arxiv 标题=Street Gaussians: Modeling Dynamic Urban Scenes with Gaussian Splatting（一致）

---

## 2025 已确立（共 0 篇，简表）

> 本簇 2025 已确立清单为空，无简表行。

---

## 近期焦点（2026，详写）

### MEGA (`2610.01707`, 2026)
- **摘要**: 3DGS 网格提取旨在赋予高斯精确几何结构以实现显式精确占据，但现有方法多为场景级、无法表达物体级占据且常产生非水密表面。MEGA 提出"先分割后网格化"（segment-then-mesh）框架，从复杂 3DGS 场景提取物体级、水密网格。
- **创新点**: ① 从场景级走向物体级水密网格，解决非水密与无法表达物体占据的问题；② 核心 Spatial Visual Distillation（SVD）以 3DGS 为教师，采样多样相机位姿渲染各分割物体视图，用光度监督训练网格重建模型；③ 融合 mask 引导的神经表面重建模块。
- **核心方法**: 物体分割 → SVD 师生蒸馏（渲染多视角视图训练网格模型）→ mask-guided neural surface reconstruction；输出物体级水密 mesh，可与 3DGS 渲染结合支撑物理交互。
- **实验设计与分析**: 在多个常用基准上验证物体级 3D 占据恢复达到 SOTA（具体 IoU/水密率/基准名「待补」）；并展示与 3DGS 结合实现复杂物理交互。支撑 claim：物体级精确占据 + 水密 + 可物理交互。
- **写作可嫁接点**: CAD & 反向工程子领域焦点，引用 2DGS/几何精确 3DGS 作为几何基础，并对比既有"场景级"网格提取方法突出本工作的物体级贡献；讨论高斯→网格、可编辑/可仿真资产时必引。
- **核查**: arxiv 标题=MEGA: Object-Level Mesh Extraction from 3D Gaussian Splatting via Spatial Visual Distillation（一致，2026-10-01 提交）

### ChronoFuseGS (`2609.31339`, Pacific Graphics 2026)
- **摘要**: 针对场景部分区域在不同拍摄集之间发生变化带来的重建难题，提出多时序高斯 Splatting：将多个分别训练、部分地理重叠的时序 GS 模型合并为单一模型，并支持增量扩展与变化可视化。
- **创新点**: ① 跨时序合并：允许一个时序的高斯贡献于其他时序重建，借全部时序数据精修持久部分；② 每个高斯基元编码其贡献的时序，支持增量扩展（新增时序不破坏已有合并重建）；③ 变化感知可视化在子物体粒度高亮变化，而非仅物体级。
- **核心方法**: 多时序 GS 模型融合（consensus/合并）保留持久结构；per-splat persistence 编码；change-aware visualization 依据用户时间选择高亮变化、保留持久部分颜色；persistence 在基元级故变化可视化达子物体粒度。
- **实验设计与分析**: 在真实户外洪水管理区数据集（7 个月、8 个采集日，含季节性植被、积雪、洪水）上评估；合并模型在 NVS 质量上一致优于各单时序模型，恢复单模型中缺失的结构细节，并可靠高亮细粒度变化与物体/自然地物的子部件。具体 PSNR 提升「待补」。
- **写作可嫁接点**: 时序/动态大规模 3DGS 与"变化检测/世界模型时序一致性"交叉点；与 Street Gaussians（动态但单时序）、CityGS（大规模静态）对照引用；讨论长期场景监控、世界模型时间维度时引用。
- **核查**: arxiv 标题=ChronoFuseGS: Multi-Temporal Gaussian Fusion with Per-Splat Persistence and Change Visualization（一致，Pacific Graphics 2026，2026-09-25 提交）

### TRACE (`2610.00822`, 2026)
- **摘要**: 研究多机器人协同的下一最佳视角（NBV）选择，每个机器人各自构建并私有其 3D Gaussian Splatting 地图；在不共享地图的前提下，按期望信息增益（EIG）选视，使信息耦合仅通过"前方透射率"与"后方辐射"两个射线量分解传递。
- **创新点**: ① 隐私保护式分布式 NBV：任何机器人都不持有合并地图却可评估跨地图 EIG；② 证明耦合仅穿过透射率与辐射两个射线量，且二者为沿射线命中的求和，可跨机器人分解、按深度箱本地聚合；③ 通信量不随地图增长，且给出误差界与精确重建条件。
- **核心方法**: 各机器人沿候选视角射线、在自身地图按深度箱累加 Transmittance 与 Radiance Aggregates（含位姿导数）并发送；规划机器人据此合成 EIG 与 SO(3) 梯度；协议名 TRACE。证明：除非某 splat 后方的深度箱混入了两机器人的命中，重建精确，否则给出误差界。
- **实验设计与分析**: 在 Habitat-Sim 上 100 次 NBV 决策中，TRACE 选向在 83.3% 情况下与集中式结果相差 15° 以内，其视角达到集中式 EIG 的 97.9%。支撑 claim：分布式隐私 NBV 接近集中式性能且通信可扩展。
- **写作可嫁接点**: Security/Privacy + World Models/Spatial Intelligence 交叉焦点；与 GS-Hider/GeometryCloak（内容安全）对照"协同隐私"维度；讨论分布式 3D 地图、机器人 NBV、隐私保护空间智能时引用。
- **核查**: arxiv 标题=TRACE: Privacy-Preserving Next-Best-View Selection over Distributed 3D Gaussian-Splat Maps（一致，2026-09-30 提交）

---

## 覆盖统计
- 经典（2023-2024）深度全覆盖：9 篇
- 2025 已确立简表：0 篇（清单为空）
- 2026 焦点详写：3 篇
- 合计：12 篇
