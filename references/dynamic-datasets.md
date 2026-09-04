
# 动态场景重建数据集汇总

> 本文档收录基于 3DGS 的动态场景重建研究中常用的 11 个数据集。
> 数据来源：连振晗等，《基于三维高斯泼溅的动态场景重建研究综述》，计算机辅助设计与图形学学报，2026年1月。

---

## 1. D-NeRF

| 属性 | 内容 |
|------|------|
| 来源 | Pumarola et al., "D-NeRF: Neural Radiance Fields for Dynamic Scenes," CVPR 2021 |
| 类型 | 合成动态场景 |
| 场景数 | 8（lego, hellwarrior, mutant, hook, jumping, bounce, standup, t-rex） |
| 分辨率 | 500×500（合成渲染） |
| 相机轨迹 | 预定义轨迹，包含训练/测试视角划分 |
| 动态类型 | 刚体运动 + 非刚体形变 |
| 特点 | 最早的动态 NeRF 基准之一；合成数据无噪声，适合消融实验；单目输入设定 |
| 下载 | https://github.com/gaochen315/D-NeRF |

---

## 2. HyperNeRF

| 属性 | 内容 |
|------|------|
| 来源 | Park et al., "HyperNeRF: A Higher-Dimensional Representation for Topologically Varying Neural Radiance Fields," ACM ToG (SIGGRAPH 2021) |
| 类型 | 真实世界动态场景 |
| 场景数 | 13（vrig 子集 4 个场景用于定量评估：3Dprinter, broom2, chicken, peel-orange） |
| 分辨率 | 原始分辨率因场景而异，常用下采样至 ~500×~500 |
| 相机轨迹 | 手持相机拍摄，包含训练/测试视角划分 |
| 动态类型 | 拓扑变化（非刚体形变，如纸张折叠、物体撕裂） |
| 特点 | 拓扑变化的标杆数据集；vrig 子集提供严格的视角对齐评估协议 |
| 评估协议 | vrig 子集：相邻视频帧作为训练/测试对，PSNR/SSIM/MS-SSIM/LPIPS |
| 下载 | https://github.com/google/hypernerf |

---

## 3. iPhone Dataset

| 属性 | 内容 |
|------|------|
| 来源 | Gao et al., "Monocular Dynamic View Synthesis: A Reality Check," NeurIPS 2022 |
| 类型 | 真实世界动态场景 |
| 场景数 | 6（3 个 mask 场景 + 3 个 no-mask 场景） |
| 分辨率 | 原始 iPhone 拍摄分辨率，下采样至 ~500×~500 |
| 采集设备 | iPhone 12 Pro（含 ARKit 位姿） |
| 动态类型 | 人体运动、物体刚性运动 |
| 特点 | 首个提供前景 mask 和 ARKit 位姿的真实动态数据集；评估更贴近真实部署场景 |
| 评估协议 | 前景 mask 对应区域计算 PSNR/SSIM/LPIPS；或全图计算 |
| 下载 | https://github.com/google-research/dynamicec |

---

## 4. NeRF-DS

| 属性 | 内容 |
|------|------|
| 来源 | Ye et al., "NeRF-DS: Dynamic View Synthesis from Sparse Observations," arXiv 2023 |
| 类型 | 真实世界动态场景 |
| 场景数 | 7 |
| 分辨率 | ~500×~500 |
| 采集设备 | iPhone（含 ARKit 位姿） |
| 动态类型 | 稀疏视角下的物体运动 + 人体运动 |
| 特点 | 针对稀疏视角动态重建设计；训练视角极少（3-5 个），适合评估泛化能力 |
| 评估协议 | 测试视角 PSNR/SSIM/LPIPS |
| 下载 | https://github.com/crockwell/nerf-ds |

---

## 5. Motion Blur Dataset

| 属性 | 内容 |
|------|------|
| 来源 | Lee et al., "Motion Blur Hallucinating Optimization for Dynamic 3D Gaussian Splatting," 3DV 2025 |
| 类型 | 真实世界动态场景（含运动模糊） |
| 场景数 | 与 iPhone 数据集对应 |
| 分辨率 | ~500×~500 |
| 动态类型 | 含运动模糊的动态运动 |
| 特点 | 专为评估运动模糊场景设计；动态 3DGS 在此数据集上表现不佳，推动了运动模糊感知方法的发展 |
| 评估协议 | PSNR/SSIM/LPIPS |
| 下载 | 见原论文关联仓库 |

---

## 6. Waymo Dynamic

| 属性 | 内容 |
|------|------|
| 来源 | Waymo Open Dataset 衍生 |
| 类型 | 真实世界自动驾驶动态场景 |
| 场景数 | 多个驾驶序列 |
| 分辨率 | 原始摄像头分辨率（多相机系统） |
| 采集设备 | Waymo 自动驾驶车辆（多相机 + LiDAR） |
| 动态类型 | 室外大规模动态场景（行人、车辆、交通标志等） |
| 特点 | 大规模室外动态场景；多相机同步采集；适合自动驾驶场景评估 |
| 评估协议 | PSNR/SSIM/LPIPS |
| 下载 | https://waymo.com/open/ |

---

## 7. Google Immersive Dataset

| 属性 | 内容 |
|------|------|
| 来源 | Broxton et al., "Immersive Light Field Video with a Layered Mesh Representation," ACM ToG (SIGGRAPH 2020) |
| 类型 | 真实世界 360 度动态场景 |
| 场景数 | 5（bicycle, cave, juggle, pitcher, train） |
| 分辨率 | 高分辨率全景视频 |
| 采集设备 | 46 台同步 GoPro 相机组成的半球阵列 |
| 动态类型 | 室外/室内动态场景 |
| 特点 | 密集多视角采集；高时空分辨率；适合评估大规模动态场景重建质量 |
| 评估协议 | PSNR/SSIM/MS-SSIM/LPIPS |
| 下载 | https://github.com/google/immersive-light-field-video |

---

## 8. Meet Room

| 属性 | 内容 |
|------|------|
| 来源 | 可循环媒体（Kai Zhang et al. / Meta Reality Labs） |
| 类型 | 真实世界室内动态场景 |
| 场景数 | 多个室内会议/对话场景 |
| 分辨率 | 多视角高分辨率 |
| 采集设备 | 多相机阵列 |
| 动态类型 | 室内人物活动（对话、手势等） |
| 特点 | 室内多人物动态场景；适合评估人物重建和背景一致性 |
| 评估协议 | PSNR/SSIM/LPIPS |
| 下载 | 见相关论文仓库 |

---

## 9. Plenoptic Video Dataset

| 属性 | 内容 |
|------|------|
| 来源 | Wei et al., "Neural Radiance Fields with AIGC," 多个光场视频数据集汇总 |
| 类型 | 真实世界动态光场视频 |
| 场景数 | 多场景 |
| 分辨率 | 高分辨率 |
| 采集设备 | 多相机密集阵列 |
| 动态类型 | 复杂动态场景（含人体、物体交互） |
| 特点 | 密集多视角动态视频；支持新视角合成和时间插值评估；适合高保真动态重建评估 |
| 评估协议 | PSNR/SSIM/LPIPS |
| 下载 | 见相关论文仓库 |

---

## 10. HiFi4G

| 属性 | 内容 |
|------|------|
| 来源 | Yin et al., "4D Gaussian Splatting for Real-Time Dynamic Scene Rendering with Detail Capture," ICML 2024 |
| 类型 | 真实世界高保真动态场景 |
| 场景数 | 多场景（含室内/室外） |
| 分辨率 | 高分辨率 |
| 采集设备 | 多相机系统 |
| 动态类型 | 高频细节动态运动 |
| 特点 | 专为评估高频动态细节设计；包含快速运动和细密纹理场景 |
| 评估协议 | PSNR/SSIM/LPIPS |
| 下载 | https://github.com/GaoangW/HiFi4G |

---

## 11. ParticleNeRF Dataset

| 属性 | 内容 |
|------|------|
| 来源 | Ye et al., "ParticleNeRF: Particle based encoding for dynamic view synthesis of unconstrained scenes," 3DV 2024 |
| 类型 | 真实世界无约束动态场景 |
| 场景数 | 多场景 |
| 分辨率 | 原始分辨率 |
| 采集设备 | 多相机系统 |
| 动态类型 | 无约束场景（含外观变化、时间不一致光照） |
| 特点 | 针对无约束动态场景设计；允许同一场景在不同时间具有不同外观 |
| 评估协议 | PSNR/SSIM/LPIPS |
| 下载 | https://github.com/pearlYuUX/ParticleNeRF |

---

## 数据集选择指南

| 评估需求 | 推荐数据集 |
|----------|-----------|
| 消融实验（合成、无噪声） | D-NeRF |
| 拓扑变化评估 | HyperNeRF (vrig) |
| 单目真实场景 | iPhone Dataset |
| 稀疏视角泛化 | NeRF-DS |
| 运动模糊鲁棒性 | Motion Blur Dataset |
| 自动驾驶大规模 | Waymo Dynamic |
| 密集多视角室内外 | Google Immersive |
| 室内人物活动 | Meet Room |
| 高频动态细节 | HiFi4G |
| 无约束外观变化 | ParticleNeRF Dataset |

---

## 引用来源

- [D-NeRF] Pumarola et al., "D-NeRF: Neural Radiance Fields for Dynamic Scenes," CVPR 2021.
- [HyperNeRF] Park et al., "HyperNeRF: A Higher-Dimensional Representation for Topologically Varying Neural Radiance Fields," ACM ToG (SIGGRAPH 2021).
- [iPhone] Gao et al., "Monocular Dynamic View Synthesis: A Reality Check," NeurIPS 2022.
- [NeRF-DS] Ye et al., "NeRF-DS: Dynamic View Synthesis from Sparse Observations," arXiv:2303.15005, 2023.
- [Motion Blur] Lee et al., "Motion Blur Hallucinating Optimization for Dynamic 3D Gaussian Splatting," 3DV 2025.
- [Waymo] Sun et al., "Scalability in Perception for Autonomous Driving: Waymo Open Dataset," CVPR 2020.
- [Google Immersive] Broxton et al., "Immersive Light Field Video with a Layered Mesh Representation," ACM ToG (SIGGRAPH 2020).
- [HiFi4G] Yin et al., "4D Gaussian Splatting for Real-Time Dynamic Scene Rendering with Detail Capture," ICML 2024.
- [ParticleNeRF] Ye et al., "ParticleNeRF: Particle based encoding for dynamic view synthesis of unconstrained scenes," 3DV 2024.
- [综述] 连振晗等，《基于三维高斯泼溅的动态场景重建研究综述》，计算机辅助设计与图形学学报，2026年1月。