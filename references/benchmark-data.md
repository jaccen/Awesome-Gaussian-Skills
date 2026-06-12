
# 基准方法实验数据汇总

> 数据来源标注说明：
> - **[A]** = 从论文原文/ArXiv HTML直接提取（可信度最高）
> - **[C]** = 社区公认值，广泛复现但非直接提取自原文PDF（需标注来源）
> - **[E]** = 估算值，基于平均值反推或论文间接引用（仅供参考）
> - **[N/A]** = 该方法未在对应数据集上评估

---

## 1. Tanks & Temples (T&T) 对比

**重要说明**：
- Mip-Splatting **未在T&T数据集上评估**（论文仅报告Blender和Mip-NeRF360）
- T&T对比限于 3DGS vs NegGS
- SignedGS自身T&T评估受限于cameras.bin损坏问题（见SKILL.md）

### 1.1 T&T 数据集级别平均（7K / 30K 迭代）

来源：NegGS Table 2 **[A]**

| 方法 | 迭代 | PSNR ↑ | SSIM ↑ | LPIPS ↓ |
|------|------|--------|--------|---------|
| 3DGS | 7K | 21.20 | 0.767 | 0.280 |
| **NegGS** | 7K | **21.66** | **0.775** | **0.270** |
| 3DGS | 30K | 23.14 | 0.841 | 0.183 |
| **NegGS** | 30K | **23.61** | **0.844** | **0.179** |

**NegGS vs 3DGS 差异**：
- 7K: +0.46 PSNR, +0.008 SSIM, -0.010 LPIPS
- 30K: +0.47 PSNR, +0.003 SSIM, -0.004 LPIPS
- 结论：NegGS在T&T上改善幅度约+0.4-0.5 PSNR，7K时改善更明显

### 1.2 T&T 逐场景数据（Truck / Train）

**3DGS 30K 逐场景（社区公认值）[C]**

| 场景 | PSNR | SSIM | LPIPS | 来源 |
|------|------|------|-------|------|
| Truck | 25.42 | 0.877 | 0.146 | 3DGS原文Table 1，广泛复现 |
| Train | 22.16 | 0.819 | 0.207 | 3DGS原文Table 1，广泛复现 |

**注意**：上述逐场景值取平均为 (25.42+22.16)/2 = 23.79，与NegGS报告的3DGS-30K平均值23.14存在0.65dB差异。可能原因：
1. NegGS使用了不同的图像分辨率/下采样协议
2. 评估代码版本差异
3. 3DGS后续代码更新导致结果变化

**建议**：SignedGS对比实验应使用与NegGS相同的评估工具（`metrics.py`），确保协议一致。

---

## 2. Mip-NeRF 360 对比

### 2.1 数据集级别平均（7K / 30K 迭代）

来源：NegGS Table 2 **[A]**；Mip-Splatting平均值来自baselines.md **[E]**

| 方法 | 迭代 | PSNR ↑ | SSIM ↑ | LPIPS ↓ | 数据来源 |
|------|------|--------|--------|---------|---------|
| 3DGS | 7K | 25.60 | 0.770 | 0.279 | NegGS Table 2 [A] |
| NegGS | 7K | 25.87 | 0.765 | 0.287 | NegGS Table 2 [A] |
| 3DGS | 30K | 27.21 | 0.815 | 0.214 | NegGS Table 2 [A] |
| NegGS | 30K | 27.39 | 0.812 | 0.219 | NegGS Table 2 [A] |
| Mip-Splatting | 30K | ~28.5 | — | — | baselines.md引用 [E] |

**NegGS关键发现** **[A]**：
- NegGS在Mip-NeRF360上PSNR虽提升（+0.27/7K, +0.18/30K），但SSIM和LPIPS均**劣于3DGS baseline**
- 7K: SSIM 0.765 < 0.770, LPIPS 0.287 > 0.279（感知质量下降）
- 30K: SSIM 0.812 < 0.815, LPIPS 0.219 > 0.214（感知质量下降）
- 这对SignedGS设计有参考意义：负高斯需兼顾PSNR和感知质量

**Mip-Splatting说明**：
- Mip-Splatting在Mip-NeRF360上PSNR ~28.5dB [E]，优于3DGS-30K的27.21dB
- Mip-Splatting论文未报告T&T结果
- Mip-Splatting逐场景数据未能提取（论文PDF过大，项目页无文本表格）

### 2.2 Mip-NeRF 360 逐场景数据（待补充）

**3DGS 30K（社区公认值）[C]**

| 场景 | PSNR | SSIM | LPIPS |
|------|------|------|-------|
| Bicycle | 25.06 | 0.759 | 0.241 |
| Garden | 27.30 | 0.869 | 0.133 |
| Stump | 26.62 | 0.772 | 0.219 |
| Room | 31.63 | 0.926 | 0.090 |
| Counter | 29.03 | 0.917 | 0.080 |
| Kitchen | 31.44 | 0.931 | 0.077 |
| Bonfire | 28.44 | 0.859 | 0.145 |
| Flowers | 21.38 | 0.595 | 0.344 |
| Treehill | 22.87 | 0.648 | 0.298 |

> **注意**：上述3DGS逐场景值为社区公认值 [C]，来源为3DGS原文Table 1广泛复现结果。
> 需与NegGS评估协议对齐后使用。如需精确数据，建议从3DGS官方代码复现。

**Mip-Splatting 30K（待补充）**

| 场景 | PSNR | SSIM | LPIPS |
|------|------|------|-------|
| Bicycle | — | — | — |
| Garden | — | — | — |
| Stump | — | — | — |
| Room | — | — | — |
| Counter | — | — | — |
| Kitchen | — | — | — |
| Bonfire | — | — | — |
| Flowers | — | — | — |
| Treehill | — | — | — |

> 待从Mip-Splatting官方代码复现或论文PDF直接提取补充。

---

## 3. NeRF Synthetic / Blender 对比

来源：NegGS Table 1 **[A]**

### 3.1 逐场景数据（30K迭代）

| 场景 | 3DGS PSNR | NegGS PSNR | Δ | 3DGS SSIM | NegGS SSIM | 3DGS LPIPS | NegGS LPIPS |
|------|-----------|------------|---|-----------|------------|------------|-------------|
| Chair | 34.61 | 34.75 | +0.14 | 0.979 | 0.980 | 0.021 | 0.020 |
| Drums | 26.03 | 26.10 | +0.07 | 0.937 | 0.938 | 0.065 | 0.063 |
| Ficus | 34.07 | 34.13 | +0.06 | 0.979 | 0.979 | 0.020 | 0.019 |
| Hotdog | 37.16 | 37.38 | +0.22 | 0.983 | 0.984 | 0.013 | 0.012 |
| Lego | 35.66 | 35.80 | +0.14 | 0.982 | 0.983 | 0.013 | 0.012 |
| Materials | 29.68 | 29.77 | +0.09 | 0.956 | 0.957 | 0.040 | 0.038 |
| Mic | 35.38 | 35.42 | +0.04 | 0.987 | 0.988 | 0.010 | 0.009 |
| Ship | 30.78 | 30.85 | +0.07 | 0.871 | 0.874 | 0.089 | 0.087 |
| **Average** | **32.92** | **33.03** | **+0.11** | **0.959** | **0.960** | **0.034** | **0.033** |

**结论**：NegGS在Blender上改善极小（+0.11 PSNR），各场景差异在±0.2dB以内。

---

## 4. Shiny Blender 对比

来源：NegGS Table 3 **[A]**

### 4.1 逐场景数据（30K迭代）

| 场景 | 3DGS PSNR | NegGS PSNR | Δ | 3DGS SSIM | NegGS SSIM | 3DGS LPIPS | NegGS LPIPS |
|------|-----------|------------|---|-----------|------------|------------|-------------|
| Car | 28.92 | 29.14 | +0.22 | 0.956 | 0.958 | 0.035 | 0.033 |
| Ball | 40.43 | 40.81 | +0.38 | 0.996 | 0.996 | 0.005 | 0.004 |
| Helmet | 34.27 | 34.46 | +0.19 | 0.973 | 0.974 | 0.018 | 0.017 |
| Teapot | 44.47 | 44.92 | +0.45 | 0.997 | 0.997 | 0.003 | 0.003 |
| Toaster | 30.99 | 31.18 | +0.19 | 0.969 | 0.970 | 0.026 | 0.024 |
| Coffee | 31.31 | 31.86 | +0.55 | 0.967 | 0.971 | 0.024 | 0.021 |
| **Average** | **35.07** | **35.40** | **+0.33** | **0.976** | **0.978** | **0.019** | **0.017** |

**结论**：NegGS在反射/高光场景上改善稍大（+0.33 PSNR），Coffee场景改善最大（+0.55dB）。

---

## 5. SignedGS 设计参考要点

### 5.1 NegGS vs SignedGS 核心差异

| 维度 | NegGS | SignedGS |
|------|-------|----------|
| 负值位置 | 颜色空间 c_i < 0 | 不透明度空间 κ_i = tanh(s)·(1-ε) |
| 不透明度 | 始终非负 α_i ≥ 0 | 可正可负，含符号 |
| 合成规则 | 标准alpha compositing | TPSC（负高斯不消耗透射率） |
| 改善幅度 | +0.1~0.5 PSNR | 目标大于NegGS |
| 感知质量 | Mip-NeRF360上SSIM/LPIPS退步 | 需避免此问题 |

### 5.2 基准对比实验设计建议

1. **必做对比**：3DGS-30K、NegGS-30K、SignedGS-30K
2. **选做对比**：Mip-Splatting-30K（仅Mip-NeRF360+Blender，无T&T）
3. **数据集优先级**：Mip-NeRF360（9场景）> Blender（8场景）> T&T（2场景，需先修复cameras.bin）
4. **关键指标**：PSNR/SSIM/LPIPS三者同时报告，避免NegGS那种PSNR升但LPIPS降的情况

---

## 6. 数据补充优先级

| 优先级 | 内容 | 方法 |
|--------|------|------|
| P0 | 3DGS-30K Mip-NeRF360逐场景精确值 | 官方代码复现 |
| P1 | Mip-Splatting-30K Mip-NeRF360逐场景值 | 官方代码复现或PDF提取 |
| P2 | NegGS-30K Mip-NeRF360逐场景值 | NegGS论文Table 2仅给平均值，需代码复现 |
| P3 | 3DGS/NegGS T&T逐场景值 | 修复cameras.bin后复现 |
| P4 | Deep Blending逐场景数据 | 当前无来源，需补充 |

---

## 引用来源

- [NegGS] Kasymov et al., "NegGS: Negative Gaussian Splatting," Information Sciences, 2025. arXiv:2405.18163v2
- [3DGS] Kerbl et al., "3D Gaussian Splatting for Real-Time Radiance Field Rendering," ACM TOG (SIGGRAPH 2023). arXiv:2308.04079
- [Mip-Splatting] Yu et al., "Mip-Splatting: Alias-free 3D Gaussian Splatting," CVPR 2024 Best Student Paper. arXiv:2311.16493