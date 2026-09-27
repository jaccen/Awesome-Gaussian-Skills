---
# Mathematical Symbols & Terminology Reference

## 3DGS Domain Symbols

| Symbol | Meaning | Standard Usage |
|--------|---------|---------------|
| G | A 3D Gaussian primitive | G_i = (μ_i, Σ_i, c_i, α_i) |
| μ | Mean / center position | μ ∈ R³ |
| Σ | Covariance matrix | Σ = R S Sᵀ Rᵀ, Σ ∈ R³ˣ³ |
| R | Rotation matrix | R ∈ SO(3) |
| S | Scaling matrix | S = diag(s₁, s₂, s₃) |
| α | Opacity | α ∈ [0,1] (standard) |
| c | Color | c = f(SH, direction) |
| SH | Spherical harmonics | Degree 0-3 |
| T | Transmittance | T_i = ∏ⱼ₌₁ⁱ⁻¹ (1 - αⱼ) |

## General CG Symbols

| Symbol | Meaning |
|--------|---------|
| π | Projection function |
| J | Jacobian matrix |
| Σ' | 2D projected covariance |
| L | Loss function |
| λ | Loss weight |
| θ | Network parameters |
| Φ | Scene representation |

## Rendering & Reconstruction Terminology

| Chinese | English | Notes |
|---------|---------|-------|
| 新视角合成 | Novel View Synthesis (NVS) | Capitalize first letters |
| 三维高斯泼溅 | 3D Gaussian Splatting (3DGS) | Write full name at first occurrence |
| 神经辐射场 | Neural Radiance Field (NeRF) | Write full name at first occurrence |
| 体密度 | Volume density | σ, do not conflate with opacity |
| 不透明度 | Opacity | α |
| 透射率 | Transmittance | T = ∏(1-α) |
| α合成 | Alpha compositing | Core rendering pipeline operation |
| 运动恢复结构 | Structure from Motion (SfM) | Initialization step |
| 多视角立体视觉 | Multi-View Stereo (MVS) | Traditional reconstruction paradigm |
| 遮挡关系 | Occlusion | Core multi-view geometry problem |

## CAD & Reverse Engineering Terminology

| Chinese | English | Notes |
|---------|---------|-------|
| 边界表示 | Boundary Representation (B-rep) | Core CAD representation |
| 构造实体几何 | Constructive Solid Geometry (CSG) | Boolean operation modeling |
| 参数化建模 | Parametric modeling | Sketch constraints → 3D |
| 逆向工程 | Reverse engineering | Point cloud/mesh → CAD |
| 自由曲面 | Freeform surface | NURBS/Bézier surfaces |
| 容差分析 | Tolerance analysis | Engineering precision |

## 3D Shape Understanding Terminology

| Chinese | English | Notes |
|---------|---------|-------|
| 点云分割 | Point cloud segmentation | Semantic/instance/part-level |
| 点云配准 | Point cloud registration | ICP and variants |
| 法线估计 | Normal estimation | Local geometric features |
| 形状补全 | Shape completion | Partial observation → complete shape |
| 3D目标检测 | 3D object detection | Point cloud/voxel/BEV |
| 部件分割 | Part segmentation | By semantic part decomposition |

## 3D Generation & Editing Terminology

| Chinese | English | Notes |
|---------|---------|-------|
| 文本到3D | Text-to-3D | LLM-driven |
| 图像到3D | Image-to-3D | Single/multi-view |
| 3D生成模型 | 3D generative model | GAN/Diffusion/Flow |
| 形状编辑 | Shape editing | Deformation/style transfer/local editing |
| 几何先验 | Geometric prior | Depth/normal/surface method |
| 体素化 | Voxelization | Point cloud/mesh → voxel grid |

## 3D Scene Understanding Terminology

| Chinese | English | Notes |
|---------|---------|-------|
| 语义分割 | Semantic segmentation | Per-point/per-face classification |
| 实例分割 | Instance segmentation | Distinguish same-class individuals |
| 场景重建 | Scene reconstruction | Indoor/outdoor/city-scale |
| SLAM | Simultaneous Localization and Mapping | Real-time pose estimation & mapping |
| 深度估计 | Depth estimation | Monocular/stereo/multi-view |
| 鸟瞰图 | Bird's Eye View (BEV) | Common AD representation |
| 场景流 | Scene flow | 3D motion field estimation |

## SLAM & Compression Terminology

| Chinese | English | Notes |
|---------|---------|-------|
| 前馈重建 | Feed-forward reconstruction | Single forward pass, no per-scene optimization |
| 压缩 | Compression / Compact | Reduce storage and transmission overhead |
| 剪枝 | Pruning | Delete primitives |
| 致密化 | Densification | Add primitives |
| 分裂 | Split | Large primitive → two small ones |
| 克隆 | Clone | Copy primitive to under-reconstructed area |
| 哈希网格上下文 | Hash-grid assisted context | HAC compression paradigm |