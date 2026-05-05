# CAD/3D 方向术语、基线与数据集

## CAD建模与逆向工程

### 表示方法分类

| 表示类型 | 代表方法 | 优点 | 缺点 |
|---|---|---|---|
| B-rep | STEP/IGES标准 | 精确、可制造 | 拓扑复杂、难以学习 |
| CSG | 基本体素布尔运算 | 紧凑、可解释 | 表达能力受限 |
| NURBS曲面 | 参数化曲面 | 精确光滑 | 拓扑约束强 |
| 隐式场 | SDF/occupancy | 灵活、可微分 | 不精确、需后处理 |
| 点云/网格 | 通用几何表示 | 通用、易获取 | 缺乏语义/结构 |

### 常用数据集

| 数据集 | 类别 | 规模 | 用途 |
|---|---|---|---|
| ABC Dataset | CAD模型 | 100万+部件 | 部件分割、形状补全 |
| ShapeNet | 3D网格 | 5.1万 | 分类、分割 |
| ShapeNetCore | 精选网格 | 5.5万 | 基线对比 |
| Fusion 360 Gallery | CAD装配体 | 8615个 | 部件分割、结构推理 |
| DeepCAD | CAD草图序列 | ~78万 | 草图→3D生成 |
| SketchGraph | CAD草图 | 1500万 | 参数化建模 |
| ShapeNetParts | 部件分割 | 3.1万 | 部件级分割 |

### 基线方法

| 任务 | 基线方法 | 年份 | 核心指标 |
|---|---|---|---|
| CAD重建 | Sketch2CAD, A-SDF, CSGNet | 2023-2024 | Chamfer距离、F-score |
| 草图→3D | DeepCAD, UR2D, SketchGen | 2022-2024 | IoU、CD |
| 部件分割 | PartNet, PointGroup, BRS-Net | 2020-2023 | mIoU |
| 特征提取 | UV-Net, FUSION360 | 2022-2024 | IoU、Accuracy |

## 3D形状理解

### 点云处理数据集

| 数据集 | 点数 | 场景数 | 用途 |
|---|---|---|---|
| S3DIS | 2.73亿 | 6个室内区域 | 语义分割 |
| ScanNet | — | 1513个室内场景 | 语义/实例分割 |
| ShapeNetPart | — | 16类26881个 | 部件分割 |
| ModelNet40 | — | 9843个 | 分类 |
| KITTI | — | 自动驾驶 | 3D目标检测/配准 |

### 基线方法

| 任务 | 基线方法 | 年份 | 核心指标 |
|---|---|---|---|
| 语义分割 | PointNet++, KPConv, MinkowskiNet, PointTransformerV3 | 2017-2024 | mIoU |
| 实例分割 | PointGroup, Mask3D, OpenMask3D | 2020-2023 | AP |
| 部件分割 | PartNet, PointGroup, BRS-Net, HIERARCHY | 2020-2024 | mIoU |
| 点云配准 | PointNetLK, DCP, Predator, PointDSC | 2019-2023 | RMSE、RRE、RTE |
| 法线估计 | PointNet, PCPNet, HNE | 2017-2022 | Accuracy |
| 形状补全 | PoinTr, SnowflakeNet, VRC, ShapeFixer | 2021-2024 | F-Score |

## 3D生成与编辑

### 数据集

| 数据集 | 类别 | 规模 | 用途 |
|---|---|---|---|
| ShapeNet | 多类3D模型 | 5.1万 | 文本/图像→3D |
| ModelNet | 40类 | 9843个 | 分类、生成 |
| Pix3D | 多视角图像+网格 | 10万 | 图像→3D |
| OBJaverse | 多模态描述 | 4.5万 | 文本→3D |

### 基线方法

| 任务 | 基线方法 | 年份 | 核心指标 |
|---|---|---|---|
| 文本→3D | Point-E, Shap-E, DreamFusion, ProlificDreamer | 2023-2024 | FID↓, 1-NNA-CD↓ |
| 图像→3D | Zero-1-to-3D, One-2-3-45++, CRM, TripoSR | 2023-2024 | FID↓, CLIP R-Precision |
| 3D扩散模型 | DPM, LION, SDFusion | 2023-2024 | FID↓, 1-NNA-CD↓ |
| 形状编辑 | CLIP-Forge, Text2Mesh, Latent-NeRF | 2022-2024 | IoU、FID |
| 纹理生成 | Text2Tex, Paint-it, SyncDreamer | 2023-2024 | FID、LPIPS |

## 3D场景理解

### 数据集

| 数据集 | 类型 | 规模 | 用途 |
|---|---|---|---|
| nuScenes | 自动驾驶 | 1000场景 | BEV检测/分割 |
| ScanNetV2 | 室内重建 | 1520场景 | 语义分割、重建 |
| S3DIS | 室内点云 | 6区域 | 语义分割 |
| KITTI-360 | 自动驾驶 | 全景序列 | 语义分割 |
| Matterport3D | 室内 | 2290场景 | 场景重建 |

### 基线方法

| 任务 | 基线方法 | 年份 | 核心指标 |
|---|---|---|---|
| BEV分割 | BEVFormer, BEVDet, PETR, Fast-BEV | 2022-2024 | NDS、mAP |
| 3D目标检测 | PointPillars, CenterPoint, VoxelNeXt | 2019-2024 | AP |
| 语义SLAM | Hydra, Vox-Fusion, ConceptFusion | 2021-2024 | mIoU |
| 场景流 | FlowNet3D, RAFT-3D, HexPlane | 2020-2024 | EPE↓、Acc3DS |
| 深度估计 | MiDaS, DepthAnything, Metric3Dv2 | 2022-2024 | Abs Rel↓、δ<1.25↑ |

## 各方向评估指标详细说明

### 点云指标

| 指标 | 全称 | 方向 | 计算 |
|---|---|---|---|
| Chamfer-L1 | Chamfer Distance L1 | ↓ | min distance to nearest point |
| Chamfer-L2 | Chamfer Distance L2 | ↓ | squared min distance |
| F-Score | F-Score at threshold τ | ↑ | precision & recall of surface coverage |
| CD | Earth Mover's Distance | ↓ | 最优传输距离 |

### 3D生成指标

| 指标 | 全称 | 方向 | 说明 |
|---|---|---|---|
| FID-3D | Fréchet Inception Distance for 3D | ↓ | 需预训练特征提取器 |
| 1-NNA-CD | 1-Nearest Neighbor Accuracy (CD) | ↑ | 最近邻Chamfer距离匹配率 |
| 1-NNA-EMD | 1-Nearest Neighbor Accuracy (EMD) | ↑ | 最近邻Earth Mover's距离匹配率 |
| MMD-CD | Maximum Mean Discrepancy (CD) | ↓ | 分布距离，适合少样本 |
| COV | Coverage | ↑ | 生成多样性 |
| PPL | Perplexity of prompt distribution | — | 文本条件生成的多样性 |