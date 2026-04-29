# 三维重建/新视角合成 术语对照表

## 数学符号规范

| 符号 | 含义 | 标准用法 | 避免混淆 |
|---|---|---|---|
| σ | 体密度/不透明度（NeRF） | σ(x) = MLP(x) | 不与统计学标准差混用 |
| α | 不透明度（3DGS） | α ∈ [0,1] | 3DGS中α=opacity |
| μ | 高斯均值/位置 | μ ∈ ℝ³ | 不写作"m"或"mean" |
| Σ | 协方差矩阵 | Σ ∈ ℝ^{3×3} | 不写作"C" |
| S | 缩放矩阵 | S = diag(s₁,s₂,s₃) | 3DGS中控制基元大小 |
| R | 旋转矩阵 | R ∈ SO(3) | |
| c | 颜色 | c ∈ ℝ³ | 3DGS用SH或RGB |
| T | 透射率 | T = ∏(1-αᵢ) | 不写作"transmittance" |
| C | 渲染颜色 | C = ΣcᵢαᵢTᵢ | |

## 常见中英对照

### 渲染管线

| 中文 | 英文 | 备注 |
|---|---|---|
| 前向渲染 | Forward rendering | |
| 可微渲染 | Differentiable rendering | |
| 体渲染 | Volume rendering | NeRF范式 |
| 光栅化渲染 | Rasterization-based rendering | 3DGS范式 |
| 深度排序 | Depth sorting / z-buffer sorting | |
| 混合权重 | Blending weight | α合成中的权重 |
| 像素级渲染 | Pixel-wise rendering | |
| 射线采样 | Ray sampling | |
| 多分辨率 | Multi-resolution | |

### 三维重建

| 中文 | 英文 | 备注 |
|---|---|---|
| 稀疏视角 | Sparse-view | |
| 密集视角 | Dense-view | |
| 未见视角 | Unseen view | |
| 训练视角 | Training view | |
| 测试视角 | Test / Novel view | |
| 点云 | Point cloud | |
| 网格 | Mesh | |
| 占据场 | Occupancy field | |
| 深度图 | Depth map | |
| 法线图 | Normal map | |
| 多视角一致性 | Multi-view consistency | |

### 评估指标

| 中文 | 英文 | 方向 | 备注 |
|---|---|---|---|
| 峰值信噪比 | PSNR (Peak Signal-to-Noise Ratio) | ↑越高越好 | 对数域，单位dB |
| 结构相似性 | SSIM (Structural Similarity Index) | ↑越高越好 | 范围[-1,1] |
| 学习感知图像块距离 | LPIPS (Learned Perceptual Image Patch Similarity) | ↓越低越好 | VGG特征空间 |
| 训练时间 | Training time | ↓越少越好 | 通常按小时计 |
| 推理速度 | Rendering speed / FPS | ↑越高越好 | 帧率 |
| 基元数量 | Number of Gaussians / Primitives | ↓越少越好 | 衡量紧凑性 |
| 内存占用 | Memory usage / VRAM | ↓越少越好 | |

## 易错术语

### 混淆高发区

1. **"不透明度" vs "体密度"**
   - NeRF: σ是体密度，α = 1-exp(-σδ)是不透明度
   - 3DGS: α直接是不透明度（opacity），无体密度概念
   - **错误**：在3DGS论文中说"体密度σ"

3. **"剪枝" vs "致密化"**
   - Pruning（剪枝）：删除基元，减小模型
   - Densification（致密化）：增加基元，增强表达
   - **错误**：将致密化说成"剪枝"

4. **"分裂" vs "克隆"**
   - Split：大基元分裂为两个小基元（梯度大时触发）
   - Clone：复制基元到欠重建区域（梯度小但未收敛时触发）
   - **错误**：将clone说成"复制"或"复制操作"

5. **"前向α合成" vs "体渲染积分"**
   - 3DGS用前向α合成（离散求和）
   - NeRF用体渲染积分（连续积分的数值近似）
   - **错误**：在3DGS论文中说"体渲染方程"

## CAD建模与逆向工程

### 表示方法

| 符号 | 含义 | 标准用法 |
|---|---|---|
| B-rep | 边界表示 | Boundary Representation |
| CSG | 构造实体几何 | Constructive Solid Geometry |
| NURBS | 非均匀有理B样条曲面 | Non-Uniform Rational B-Splines |
| FFD | 自由变形 | Free-Form Deformation |

### CAD专属易错

6. **"B-rep" vs "mesh"**
   - B-rep：精确的边界表示（面+边+顶点+拓扑），是CAD标准格式（STEP/IGES）
   - Mesh：三角网格近似表示
   - **错误**：将B-rep重建与mesh重建混为一谈

7. **"逆向工程" 在论文中的准确含义**
   - 三维视觉中：点云/扫描数据 → 参数化CAD模型（sketch → extrude/revolve）
   - **注意**：不要与"逆向传播"（backpropagation）混淆，中文语境下容易误解

8. **"草图" vs "线框"**
   - Sketch：手绘/数字草图，含约束信息（平行、垂直、相切）
   - Wireframe：线框显示，仅几何边
   - **错误**：将"草图约束求解"说成"线框建模"

## 3D形状理解与分析

### 点云处理

| 符号 | 含义 | 标准用法 |
|---|---|---|
| P | 点云 | P = {p₁, p₂, ..., pₙ}，pᵢ ∈ ℝ³ |
| N | 法向量 | 每点关联，Nᵢ ∈ ℝ³ |
| F | 特征描述子 | 局部几何特征，如FPFH/3DMatch |

### 易错

9. **"分割" 的层级**
   - Semantic segmentation：逐点/逐面片分类（不同类：地面/建筑/植被）
   - Instance segmentation：区分同类不同个体（不同椅子）
   - Part segmentation：部件级分解（椅子的靠背/座面/腿）
   - **错误**：将"部件分割"与"实例分割"等同

10. **"配准" vs "对齐"**
    - Registration：两个点云/网格的空间对齐（ICP等）
    - Alignment：更宽泛的对齐，也可指特征空间对齐
    - **错误**：在点云配准论文中用"对齐"替代"配准"

## 3D生成与编辑

### 易错

11. **"生成" vs "重建"**
    - Generation：从噪声/文本/图像创建3D内容
    - Reconstruction：从观测数据（图像/点云/视频）恢复3D结构
    - **错误**：将单视图重建称为"单视图生成"

12. **FID vs 1-NNA-CD**
    - FID：Fréchet Inception Distance（需要预训练判别器）
    - 1-NNA-CD：最近邻Chamfer距离（纯几何指标，无训练）
    - **注意**：两指标衡量不同维度，论文中常同时报告

## 3D场景理解

### 易错

13. **"SLAM" vs "SfM"**
    - SfM：离线、批量处理，输出稀疏点云+相机位姿
    - SLAM：在线、实时处理，输出稠密地图
    - **错误**：将SfM的输出称为"SLAM地图"

14. **"BEV" vs "3D体素"**
    - BEV：鸟瞰图表示，常用于自动驾驶（2.5D）
    - 3D voxel grid：完整3D体素占据
    - **错误**：在BEV方法中声称支持"完整3D理解"

15. **"深度估计" 的多义性**
    - Monocular depth estimation：单目深度（有尺度歧义）
    - Stereo depth：双目立体匹配
    - Multi-view depth：多视角深度融合
    - **错误**：在单目深度论文中不做尺度归一化讨论

## SLAM术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 同步定位与建图 | SLAM | Simultaneous Localization and Mapping |
| 位姿估计 | Pose estimation | 相机6DoF |
| 稠密地图 | Dense map | 高保真重建地图 |
| 闭环检测 | Loop closure | 消除累积漂移 |
| 尺度漂移 | Scale drift | 单目SLAM核心问题 |
| 动态物体移除 | Dynamic object removal | SLAM中的关键挑战 |
| 不确定性感知 | Uncertainty-aware | WildGS-SLAM核心机制 |

## 前馈/泛化方法术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 前馈重建 | Feed-forward reconstruction | 单次推理，无逐场景优化 |
| 逐场景优化 | Per-scene optimization | 传统NeRF/3DGS范式 |
| 泛化能力 | Generalization | 跨场景适用性 |
| 位姿估计 | Pose estimation | 已知/未知相机 |
| 稀疏视角 | Sparse-view | 少量输入视角 |
| 无约束视角 | Unconstrained views | 野外/非结构化采集 |

## 压缩术语

| 中文 | 英文 | 备注 |
|---|---|---|
| 哈希网格上下文 | Hash-grid assisted context | HAC压缩核心 |
| 渐进式压缩 | Progressive compression | 支持多码率 |
| 训练无关简化 | Training-free simplification | NanoGS方法 |
| 内存有界训练 | Memory-bounded training | 峰值内存控制 |

## 新增易错（#16-#18）

16. **"SLAM" vs "SfM" 的输出差异**
    - SfM：离线、批量，输出稀疏点云+相机位姿
    - SLAM：在线、实时，输出稠密地图
    - **错误**：将SfM输出称为"SLAM地图"

17. **"前馈" vs "优化"的范式区别**
    - 前馈：训练一次模型，测试时直接推理（GlobalSplat, MVSplat）
    - 优化：每个新场景单独训练（标准3DGS）
    - **错误**：将前馈方法称为"per-scene optimization"

18. **"位姿已知" vs "位姿估计"**
    - Pose-free：需要同时估计相机位姿（InstantSplat）
    - Pose-conditioned：位姿作为输入（MVSplat, GS-LRM）
    - **错误**：在pose-free方法中假设位姿已知