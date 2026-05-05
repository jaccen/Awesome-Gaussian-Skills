# 各方向主流基线方法与核心指标

## 新视角合成 (NVS)

### 经典基线（必须对比）

| 方法 | 年份 | 发表 | PSNR | 特点 |
|---|---|---|---|---|
| NeRF | 2020 | ECCV 2020 | ~31 dB (B) / ~25 dB (360) | 体渲染基线 |
| Mip-NeRF 360 | 2022 | NeurIPS 2022 | ~33 dB (B) / ~27.5 dB (360) | 反锯齿基线 |
| 3DGS | 2023 | ACM TOG | ~33 dB (B) / ~27.2 dB (360) | 实时基线 |
| Instant-NGP | 2022 | ACM TOG | ~31 dB (B) / ~25 dB (360) | 速度基线 |
| Mip-Splatting | 2024 | CVPR Best Student | ~28.5 dB (360) | Anti-aliasing |
| 2DGS | 2024 | SIGGRAPH | ~28.0 dB (360) | Geometry quality |
| Scaffold-GS | 2023 | ICCV | ~25.0 dB (360) | Anchor-based |

### 2024-2026 高频/边界增强方法

| 方法 | 年份 | 发表 | 方向 |
|---|---|---|---|
| FreGS | 2024 | CVPR | 频域正则化 |
| NegGS | 2025 | Inf. Sciences | 负颜色基元 |
| 3D-HGS | 2024 | arXiv | 半高斯核 |
| 6DGS | 2025 | ICLR | 方向感知增强 |
| Spec-Gaussian | 2024 | NeurIPS | 各向异性外观 |
| Mip-Splatting | 2024 | CVPR | Anti-aliasing, 3D/2D Mip filter |
| 4DGS | 2024 | CVPR | 1294 citations, 4D dynamic scene |
| Street Gaussians | 2024 | ECCV | Dynamic urban scene |
| GS-LRM | 2024 | ECCV | Large reconstruction model |
| MVSplat | 2024 | ECCV | Sparse-view 3DGS |
| DepthSplat | 2025 | CVPR | Depth-guided feed-forward |
| InstantSplat | 2024 | arXiv | Pose-free 40s |
| WildGaussians | 2024 | NeurIPS | In-the-wild pose optimization |
| AnySplat | 2025 | SIGGRAPH | Unconstrained views |

### 压缩/加速方法

| 方法 | 年份 | 发表 | 压缩率 | FPS |
|---|---|---|---|---|
| CompressedGS | 2024 | CVPR | — | — |
| LightGaussian | 2024 | NeurIPS | 15x | 200+ |
| CompGS | 2024 | ACMMM | — | — |
| HAC | 2024 | ECCV | 222 citations, hash-grid context, ~100x | — |
| OT-UVGS | 2026 | Eurographics | Optimal transport UV mapping | — |
| Gaussians on a Diet | 2026 | arXiv | Memory-bounded training, 80% less peak | — |
| NanoGS | 2026 | arXiv | Training-free KNN merge, CPU | — |

### SLAM 方法

| 方法 | 年份 | 发表 | 方向 | 核心指标 |
|---|---|---|---|---|
| Gaussian Splatting SLAM | 2023 | CVPR 2024 Highlight | Monocular SLAM | 551 citations |
| CGS-SLAM | 2025 | IROS | Compact SLAM | Dense reconstruction |
| WildGS-SLAM | 2025 | CVPR | Dynamic environment SLAM | 53 citations |
| S3PO-GS | 2025 | ICCV | Outdoor SLAM | Scale consistency |
| Flow4DGS-SLAM | 2026 | arXiv | 4DGS + optical flow SLAM | — |

## 常用数据集

### 合成数据集（NeRF Synthetic / Blender）

- 场景：Chair, Drums, Ficus, Hotdog, Lego, Materials, Mic, Ship
- 来源：NeRF原论文 + Blender数据集
- 评估：PSNR, SSIM, LPIPS
- 训练：100-200张，测试：8个固定视角
- 标注：完整GT深度+法线

### 大尺度数据集（Mip-NeRF 360）

- 场景：Bicycle, Garden, Stump, Room, Counter, Kitchen, Bonfire, Flowers, Treehill
- 来源：智能手机拍摄
- 评估：PSNR, SSIM, LPIPS
- 训练/测试按相机编号划分
- 挑战性：无界场景、大运动、反射表面

### Tank & Temples

- 场景：Truck, Train, Church (medium); Meetingroom, Playroom (advanced)
- 评估：仅定性（无GT），需人工对比
- 特点：真实室外大场景

### Deep Blending

- 场景：DrJohnson, Playroom, Room
- 评估：PSNR, SSIM, LPIPS
- 特点：室内精细场景

### Shiny Blender

- 场景：Car, Ball, Helmet, Teapot, Toaster, Coffee
- 来源：高光/反射材质数据集
- 评估：PSNR, SSIM, LPIPS
- 特点：镜面反射、透明物体

### 前馈重建数据集

| 数据集 | 规模 | 用途 |
|---|---|---|
| RealEstate10K | 77K视频 | 前馈NVS基线 |
| ACID | 1.6K场景 | 前馈NVS基线 |
| DL3DV | 61场景 | 大尺度前馈重建 |
| ScanNet++ | 1751场景 | 室内重建 |

## 消融实验设计要点

必须逐一验证的模块：
1. 核心机制
2. 每个损失项的贡献（加 vs 不加）
3. 关键超参数敏感性（通常1-2个核心超参）
4. 与最相关工作的组件级对比（如替换合成规则）

可选加分消融：
- 不同基元初始化策略
- 不同训练调度
- 不同损失权重配比

## CAD/3D 方向补充

CAD建模、3D形状理解/生成、3D场景理解的详细基线与数据集见 [cad-3d.md](cad-3d.md)。
