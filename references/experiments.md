# 标准实验设计与常见数据集配置

## 评估指标使用规范

### PSNR (Peak Signal-to-Noise Ratio)
- 计算范围：整个图像（非裁剪center crop，除非特别说明）
- Blender数据集：通常报告center crop结果（与3DGS原论文一致）
- Mip-NeRF 360数据集：报告全图结果
- 单位：dB，保留2位小数
- 注意：某些方法会报告"不确定性"（±std），需说明是否使用多次随机种子

### SSIM (Structural Similarity)
- 通常报告全局SSIM（非per-pixel SSIM map的平均）
- 范围：[0, 1]，越高越好
- 保留4位小数

### LPIPS (Learned Perceptual Image Patch Similarity)
- 使用VGG网络提取特征
- 范围：[0, 1]，越低越好
- 保留4位小数
- 常用模型：AlexNet版本（lpips_alex）或VGG版本（lpips_vgg）

## 实验表格标准格式

### 定量对比表（Quantitative Comparison）

```
| Method | Chair↑ | Drums↑ | Ficus↑ | Hotdog↑ | Avg↑ |
|--------|--------|--------|--------|---------|------|
| NeRF   | 33.00  | 25.01  | 30.13  | 36.18   | 31.01|
| 3DGS   | 35.82  | 26.17  | 34.83  | 37.67   | 33.30|
| Ours   | **36.15**| **26.89**| **35.21**| **38.02**| **34.07**|
```

- 三指标各一张表（PSNR / SSIM / LPIPS）
- 最优结果**加粗**
- 次优结果用下划线（可选）
- 平均值（Avg）取所有场景的均值
- ↑ 表示越高越好，↓ 表示越低越好

### 效率对比表（Efficiency Comparison）

```
| Method     | Gaussians(K) | Memory(MB) | FPS  | PSNR |
|------------|---------------|-------------|------|------|
| 3DGS       | 307           | 845         | 124  | 27.22|
| LightGS    | 24            | 178         | 203  | 26.85|
| Ours       | 298           | 823         | 118  | **28.03**|
```

## 可视化对比设计

### 定性对比图（Qualitative Comparison）

- 选取3-4个具有代表性的测试视角
- 每个视角排列：GT | Baseline1 | Baseline2 | Ours
- 建议选择：高频细节多的区域、遮挡边界多的区域、大面积平坦区域
- 标注放大区域（用方框圈出）

### 消融可视化

- 展示去掉某个模块后的失败案例
- 常见场景：边缘模糊、颜色偏移、伪影
- 上下排列或左右排列均可

## 训练配置标准写法

论文实验部分必须说明的训练配置：

| 配置项 | 标准写法 |
|---|---|
| GPU | NVIDIA RTX 3090 / 4090 / A100 |
| 训练迭代次数 | 7K / 15K / 30K（3DGS标准） |
| 学习率 | 初始0.016，指数衰减至0 |
| 优化器 | Adam (β₁=0.9, β₂=0.999) |
| 密集化开始 | 500 iter |
| 密集化间隔 | 每100 iter |
| 剪枝间隔 | 每100 iter |
| PSNRMetric | λ_L1 = 0.8, λ_DSSIM = 0.2 |
| SSIM Metric | λ_L1 = 0.2, λ_DSSIM = 0.8 |

## 常见审稿意见与应对

### "缺少XXX基线"
- 应对：补充实验或说明为何不适用
- 如果基线不可复现，引用其原始论文数据

### "仅在XX数据集验证"
- 应对：至少补充一个大尺度真实场景（如Mip-NeRF 360）

### "训练时间/内存占用未报告"
- 应对：补充效率对比表

### "超参数敏感性未分析"
- 应对：对1-2个核心超参数做消融

### "公平对比？"
- 应对：确保使用相同的训练配置、相同的评估视角、相同的SfM初始化

## 新增数据集（2024-2026）

### 前馈重建数据集

| 数据集 | 类型 | 场景数 | 评估指标 | 标准切分 |
|---|---|---|---|---|
| RealEstate10K | 视频序列 | 77K | PSNR/SSIM/LPIPS | 训练/测试按视频划分 |
| ACID | 多视角图像 | 1.6K | PSNR/SSIM/LPIPS | 标准训练/测试 |
| DL3DV | 大尺度场景 | 61 | PSNR/SSIM/LPIPS | 50%训练/50%测试 |
| Shiny Blender | 高光材质 | 6 | PSNR/SSIM/LPIPS | 标准划分 |

### SLAM评估数据集

| 数据集 | 类型 | 场景数 | 核心指标 | 挑战 |
|---|---|---|---|---|
| Replica | 室内 | 18 | PSNR/SSIM | 有GT深度 |
| TUM RGB-D | 室内+深度 | — | ATE↑ | 序列数据 |
| EuRoC MAV | 室内 | 37 | ATE↑ | 多摄像头 |
| Waymo Open | 户外自动驾驶 | — | mAP | 真实大场景 |
| KITTI-360 | 户外全景 | — | PSNR/SSIM | 大运动 |

### 效率表格新增参考值

| 方法 | 场景 | 基元数 | 内存 | FPS | PSNR |
|---|---|---|---|---|---|
| 3DGS (30K) | Mip-360 | ~1M | ~1.5GB | 100+ | 27.2 |
| Mip-Splatting (30K) | Mip-360 | ~1M | ~2GB | ~100 | 28.5 |
| Scaffold-GS | Mip-360 | ~500K | ~0.8GB | 90+ | 25.0 |
| HAC (compressed) | Mip-360 | — | ~15MB | ~100 | ~24.5 |
| Gaussians on a Diet | Mip-360 | — | 80%↓peak | same | ~24.5 |
| GlobalSplat | RealEstate | 16K | ~4MB | ~13 (78ms) | ~25.0 |
| SparseSplat (22%) | DL3DV | 150K | — | ~13 | 24.20 |