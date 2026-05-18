# 3DGS Methods Overview →?Index

> This file is the master index for all 150+ 3D Gaussian Splatting methods tracked in this knowledge base.
> Detailed entries (full metadata, key innovations, code links) are split across three companion files below.
> Performance comparison table at the end of this file.

## Contents
- [methods-core.md](methods-core.md) →?Foundations, Surface/Geometry, CAD/Mesh, Text-to-3D, Feed-Forward, Compression, Dynamic Scenes
- [methods-semantic-editing.md](methods-semantic-editing.md) →?Language/Semantic, Image Representation, Few-Shot, Large-Scale, Editing, Material/Relighting, Human/Avatar
- [methods-systems-apps.md](methods-systems-apps.md) →?Robustness, Autonomous Driving, SLAM, Training/Optimization, Simulation/Robotics, Cross-Domain, Restoration

---

## 1. Foundation Methods
- **3DGS**: [中英摘要](https://arxiv.org/abs/2308.04079) | [arXiv:2308.04079](https://arxiv.org/abs/2308.04079) →2308.04079
- **Mip-Splatting**: [中英摘要](https://arxiv.org/abs/2311.16493) | [arXiv:2311.16493](https://arxiv.org/abs/2311.16493) →2311.16493
- **Softmax-GS**: [中英摘要](https://arxiv.org/abs/2604.27437) | [arXiv:2604.27437](https://arxiv.org/abs/2604.27437) →2604.27437

> →?Full details in [methods-core.md](methods-core.md#foundation-methods)

## 2. Surface & Geometry Methods
- **2DGS**: [中英摘要](https://arxiv.org/abs/2403.17888) | [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) →2403.17888
- **SuGaR**: [中英摘要](https://arxiv.org/abs/2312.13253) | [arXiv:2312.13253](https://arxiv.org/abs/2312.13253) →2312.13253
- **PGSR**: [中英摘要](https://arxiv.org/abs/2406.06521) | [arXiv:2406.06521](https://arxiv.org/abs/2406.06521) →2406.06521
- **PAGaS**: [中英摘要](https://arxiv.org/abs/2604.22129) | [arXiv:2604.22129](https://arxiv.org/abs/2604.22129) →2604.22129
- **2D-SuGaR**: [中英摘要](https://arxiv.org/abs/2605.00569) | [arXiv:2605.00569](https://arxiv.org/abs/2605.00569) →2605.00569
- **LeanGaussian** →?Extreme compression from single RGB image for efficient large-scale rendering
- **NegGS**: [中英摘要](https://arxiv.org/abs/2405.14786) | [arXiv:2405.14786](https://arxiv.org/abs/2405.14786) →2405.14786

> →?Full details in [methods-core.md](methods-core.md#surface--geometry-methods)

## 3. CAD / Mesh / Hybrid Methods
- **SuGaR**: [中英摘要](https://arxiv.org/abs/2312.13253) | [arXiv:2312.13253](https://arxiv.org/abs/2312.13253) →2312.13253
- **2DGS**: [中英摘要](https://arxiv.org/abs/2403.17888) | [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) →2403.17888
- **MaGS** →?Mesh-adsorbed Gaussians; deform mesh →?Gaussians follow
- **UniMGS** →?Single-pass rasterization for both mesh and Gaussians simultaneously
- **Vol3DGS** →?Physically accurate volume-consistent rendering resolving splatting/volume inconsistency
- **BrepGaussian**: [中英摘要](https://arxiv.org/abs/2602.21105) | [arXiv:2602.21105](https://arxiv.org/abs/2602.21105) →2602.21105

> →?Full details in [methods-core.md](methods-core.md#cad--mesh--hybrid-methods)

## 4. Generation / Text-to-3D
- **DreamGaussian**: [中英摘要](https://arxiv.org/abs/2309.16653) | [arXiv:2309.16653](https://arxiv.org/abs/2309.16653) →2309.16653

> →?Full details in [methods-core.md](methods-core.md#generation--text-to-3d)

## 5. Feed-Forward Methods
- **GlobalSplat**: [中英摘要](https://arxiv.org/abs/2604.15284) | [arXiv:2604.15284](https://arxiv.org/abs/2604.15284) →2604.15284
- **TRiGS**: [中英摘要](https://arxiv.org/abs/2604.00538) | [arXiv:2604.00538](https://arxiv.org/abs/2604.00538) →2604.00538
- **Reliev3R**: [中英摘要](https://arxiv.org/abs/2604.00548) | [arXiv:2604.00548](https://arxiv.org/abs/2604.00548) →2604.00548
- **ARGS**: [中英摘要](https://arxiv.org/abs/2604.00494) | [arXiv:2604.00494](https://arxiv.org/abs/2604.00494) →2604.00494
- **WildSplatter**: [中英摘要](https://arxiv.org/abs/2604.21182) | [arXiv:2604.21182](https://arxiv.org/abs/2604.21182) →2604.21182
- **SparseSplat** →?Entropy-based adaptive density, SOTA with 22% of Gaussians (150K vs 688K)
- **Free Geometry**: [中英摘要](https://arxiv.org/abs/2604.14048) | [arXiv:2604.14048](https://arxiv.org/abs/2604.14048) →2604.14048
- **IDESplat**: [中英摘要](https://arxiv.org/abs/2601.03824) | [arXiv:2601.03824](https://arxiv.org/abs/2601.03824) →2601.03824
- **MVSplat**: [中英摘要](https://arxiv.org/abs/2403.14627) | [arXiv:2403.14627](https://arxiv.org/abs/2403.14627) →2403.14627
- **GS-LRM**: [中英摘要](https://arxiv.org/abs/2404.19702) | [arXiv:2404.19702](https://arxiv.org/abs/2404.19702) →2404.19702
- **DepthSplat**: [中英摘要](https://arxiv.org/abs/2410.13862) | [arXiv:2410.13862](https://arxiv.org/abs/2410.13862) →2410.13862
- **InstantSplat**: [中英摘要](https://arxiv.org/abs/2403.20309) | [arXiv:2403.20309](https://arxiv.org/abs/2403.20309) →2403.20309
- **AnySplat**: [中英摘要](https://arxiv.org/abs/2505.23716) | [arXiv:2505.23716](https://arxiv.org/abs/2505.23716) →2505.23716

> →?Full details in [methods-core.md](methods-core.md#feed-forward-methods)

## 6. Compression Methods
- **Compact-3DGS** →?Vector quantization + pruning, ~10-15x compression
- **LightGS** →?Distillation-based, ~15-20x compression
- **MobileGS** →?Extreme 50-100x compression for mobile deployment
- **Embedded-3DGS** →?Neural architecture search, ~10x compression
- **HAC**: [中英摘要](https://arxiv.org/abs/2403.14530) | [arXiv:2403.14530](https://arxiv.org/abs/2403.14530) →2403.14530
- **OT-UVGS**: [中英摘要](https://arxiv.org/abs/2604.19127) | [arXiv:2604.19127](https://arxiv.org/abs/2604.19127) →2604.19127
- **Gaussians on a Diet**: [中英摘要](https://arxiv.org/abs/2604.20046) | [arXiv:2604.20046](https://arxiv.org/abs/2604.20046) →2604.20046
- **GS-SCNet**: [中英摘要](https://arxiv.org/abs/2604.25330) | [arXiv:2604.25330](https://arxiv.org/abs/2604.25330) →2604.25330
- **NanoGS**: [中英摘要](https://arxiv.org/abs/2603.16103) | [arXiv:2603.16103](https://arxiv.org/abs/2603.16103) →2603.16103
- **MesonGS++**: [中英摘要](https://arxiv.org/abs/2604.26799) | [arXiv:2604.26799](https://arxiv.org/abs/2604.26799) →2604.26799
- **GETA-3DGS**: [中英摘要](https://arxiv.org/abs/2605.02086) | [arXiv:2605.02086](https://arxiv.org/abs/2605.02086) →2605.02086

> →?Full details in [methods-core.md](methods-core.md#compression-methods)

## 7. Dynamic Scene Methods
- **4DGS**: [中英摘要](https://arxiv.org/abs/2310.08528) | [arXiv:2310.08528](https://arxiv.org/abs/2310.08528) →2310.08528
- **Dynamic 3D Gaussians**: [中英摘要](https://arxiv.org/abs/2309.13114) | [arXiv:2309.13114](https://arxiv.org/abs/2309.13114) →2309.13114
- **SC-GS** →?Spatial-temporal compression for dynamic Gaussians
- **RobustSplat** →?Decouples densification from dynamics for transient-free 3DGS
- **Color-Encoded Illumination**: [中英摘要](https://arxiv.org/abs/2604.26920) | [arXiv:2604.26920](https://arxiv.org/abs/2604.26920) →2604.26920
- **TRiGS**: [中英摘要](https://arxiv.org/abs/2604.00538) | [arXiv:2604.00538](https://arxiv.org/abs/2604.00538) →2604.00538
- **HDR-NSFF**: [中英摘要](https://arxiv.org/abs/2603.08313) | [arXiv:2603.08313](https://arxiv.org/abs/2603.08313) →2603.08313
- **FreeTimeGS++**: [中英摘要](https://arxiv.org/abs/2605.03337) | [arXiv:2605.03337](https://arxiv.org/abs/2605.03337) →2605.03337

> →?Full details in [methods-core.md](methods-core.md#dynamic-scene-methods)

## 8. Language / Semantic
- **LangSplat**: [中英摘要](https://arxiv.org/abs/2312.16084) | [arXiv:2312.16084](https://arxiv.org/abs/2312.16084) →2312.16084
- **Feature 3DGS**: [中英摘要](https://arxiv.org/abs/2312.03203) | [arXiv:2312.03203](https://arxiv.org/abs/2312.03203) →2312.03203
- **Semantic Foam**: [中英摘要](https://arxiv.org/abs/2604.26262) | [arXiv:2604.26262](https://arxiv.org/abs/2604.26262) →2604.26262
- **GLMap**: [中英摘要](https://arxiv.org/abs/2605.01736) | [arXiv:2605.01736](https://arxiv.org/abs/2605.01736) →2605.01736
- **NG-GS**: [中英摘要](https://arxiv.org/abs/2604.14706) | [arXiv:2604.14706](https://arxiv.org/abs/2604.14706) →2604.14706

> →?Full details in [methods-semantic-editing.md](methods-semantic-editing.md#language--semantic)

## 9. Image Representation
- **GaussianImage**: [中英摘要](https://arxiv.org/abs/2403.08551) | [arXiv:2403.08551](https://arxiv.org/abs/2403.08551) →2403.08551

> →?Full details in [methods-semantic-editing.md](methods-semantic-editing.md#image-representation)

## 10. Few-Shot / Sparse-View
- **Pi-GS**: [中英摘要](https://arxiv.org/abs/2602.03327) | [arXiv:2602.03327](https://arxiv.org/abs/2602.03327) →2602.03327
- **FSGS**: [中英摘要](https://arxiv.org/abs/2312.00451) | [arXiv:2312.00451](https://arxiv.org/abs/2312.00451) →2312.00451
- **HeroGS** →?Hierarchical image→region→pixel guidance for sparse-view robustness
- **GSCompleter**: [中英摘要](https://arxiv.org/abs/2604.20155) | [arXiv:2604.20155](https://arxiv.org/abs/2604.20155) →2604.20155

> →?Full details in [methods-semantic-editing.md](methods-semantic-editing.md#few-shot--sparse-view)

## 11. Large-Scale Methods
- **Scaffold-GS**: [中英摘要](https://arxiv.org/abs/2312.13209) | [arXiv:2312.13209](https://arxiv.org/abs/2312.13209) →2312.13209
- **Scaffold-GS+** →?Progressive training for better city-scale quality
- **CityGaussian**: [中英摘要](https://arxiv.org/abs/2401.02379) | [arXiv:2401.02379](https://arxiv.org/abs/2401.02379) →2401.02379
- **Octree-GS** →?Octree spatial partitioning + LOD management
- **Street Gaussians**: [中英摘要](https://arxiv.org/abs/2401.01339) | [arXiv:2401.01339](https://arxiv.org/abs/2401.01339) →2401.01339

> →?Full details in [methods-semantic-editing.md](methods-semantic-editing.md#large-scale-methods)

## 12. Editing Methods
- **GaussianEditor** →?CLIP-guided text/geometry-driven editing
- **GeoGaussian** →?Mesh-prior-guided Gaussian manipulation
- **Frosting** →?Decoupled geometry/appearance editing
- **SketchFaceGS**: [中英摘要](https://arxiv.org/abs/2604.19202) | [arXiv:2604.19202](https://arxiv.org/abs/2604.19202) →2604.19202
- **FluSplat**: [中英摘要](https://arxiv.org/abs/2604.20038) | [arXiv:2604.20038](https://arxiv.org/abs/2604.20038) →2604.20038
- **TransSplat**: [中英摘要](https://arxiv.org/abs/2604.19571) | [arXiv:2604.19571](https://arxiv.org/abs/2604.19571) →2604.19571
- **GOR-IS**: [中英摘要](https://arxiv.org/abs/2605.00498) | [arXiv:2605.00498](https://arxiv.org/abs/2605.00498) →2605.00498
- **SVGS**: [中英摘要](https://arxiv.org/abs/2603.28126) | [arXiv:2603.28126](https://arxiv.org/abs/2603.28126) →2603.28126
- **DiffSoup**: [中英摘要](https://arxiv.org/abs/2603.27151) | [arXiv:2603.27151](https://arxiv.org/abs/2603.27151) →2603.27151
- **FTSplat**: [中英摘要](https://arxiv.org/abs/2603.05932) | [arXiv:2603.05932](https://arxiv.org/abs/2603.05932) →2603.05932
- **IRIS**: [中英摘要](https://arxiv.org/abs/2603.15368) | [arXiv:2603.15368](https://arxiv.org/abs/2603.15368) →2603.15368

> →?Full details in [methods-semantic-editing.md](methods-semantic-editing.md#editing-methods)

## 13. Material & Relighting Methods
- **GRF** →?Material decomposition + relighting in Gaussian space
- **GS-IR** →?Inverse rendering: Gaussians →?geometry + BRDF + lighting
- **GaussianShader**: [中英摘要](https://arxiv.org/abs/2311.17977) | [arXiv:2311.17977](https://arxiv.org/abs/2311.17977) →2311.17977
- **Instant Colorization**: [中英摘要](https://arxiv.org/abs/2604.17155) | [arXiv:2604.17155](https://arxiv.org/abs/2604.17155) →2604.17155
- **VIRGi**: [中英摘要](https://arxiv.org/abs/2603.02986) | [arXiv:2603.02986](https://arxiv.org/abs/2603.02986) →2603.02986

> →?Full details in [methods-semantic-editing.md](methods-semantic-editing.md#material--relighting-methods)

## 14. Human & Avatar Methods
- **GaussianAvatar** →?Pose-driven human body Gaussian representation
- **GAS** →?Compression + caching for real-time avatar rendering
- **SplattingAvatar** →?Expression-conditioned Gaussian deformation
- **Generalizable Human GS**: [中英摘要](https://arxiv.org/abs/2604.25466) | [arXiv:2604.25466](https://arxiv.org/abs/2604.25466) →2604.25466
- **High-Fidelity Human GS**: [中英摘要](https://arxiv.org/abs/2604.21714) | [arXiv:2604.21714](https://arxiv.org/abs/2604.21714) →2604.21714
- **HumanSplatHMR**: [中英摘要](https://arxiv.org/abs/2605.02784) | [arXiv:2605.02784](https://arxiv.org/abs/2605.02784) →2605.02784
- **D-Rex**: [中英摘要](https://arxiv.org/abs/2604.27871) | [arXiv:2604.27871](https://arxiv.org/abs/2604.27871) →2604.27871

> →?Full details in [methods-semantic-editing.md](methods-semantic-editing.md#human--avatar-methods)

## 15. Robustness & Regularization
- **NRGS**: [中英摘要](https://arxiv.org/abs/2604.22439) | [arXiv:2604.22439](https://arxiv.org/abs/2604.22439) →2604.22439
- **DualSplat**: [中英摘要](https://arxiv.org/abs/2604.21631) | [arXiv:2604.21631](https://arxiv.org/abs/2604.21631) →2604.21631
- **EnerGS**: [中英摘要](https://arxiv.org/abs/2604.26238) | [arXiv:2604.26238](https://arxiv.org/abs/2604.26238) →2604.26238
- **WildGaussians**: [中英摘要](https://arxiv.org/abs/2407.08447) | [arXiv:2407.08447](https://arxiv.org/abs/2407.08447) →2407.08447
- **MERID-GS**: [中英摘要](https://arxiv.org/abs/2604.24053) | [arXiv:2604.24053](https://arxiv.org/abs/2604.24053) →2604.24053
- **MarineSTD-GS**: [中英摘要](https://arxiv.org/abs/2604.23551) | [arXiv:2604.23551](https://arxiv.org/abs/2604.23551) →2604.23551

> →?Full details in [methods-systems-apps.md](methods-systems-apps.md#robustness--regularization)

## 16. Autonomous Driving
- **Street-GS** →?LiDAR-camera fusion + multi-view optimization
- **ADS-GS** →?Static + dynamic decomposition for driving scenes
- **Asset Harvester**: [中英摘要](https://arxiv.org/abs/2604.18468) | [arXiv:2604.18468](https://arxiv.org/abs/2604.18468) →2604.18468
- **GSDrive**: [中英摘要](https://arxiv.org/abs/2604.28111) | [arXiv:2604.28111](https://arxiv.org/abs/2604.28111) →2604.28111
- **3DGS Safety Evaluation for AD**: [中英摘要](https://arxiv.org/abs/2605.01995) | [arXiv:2605.01995](https://arxiv.org/abs/2605.01995) →2605.01995
- **Nighttime AD GS**: [中英摘要](https://arxiv.org/abs/2602.13549) | [arXiv:2602.13549](https://arxiv.org/abs/2602.13549) →2602.13549
- **GaussianLSS** →?BEV perception via Gaussian Splatting

> →?Full details in [methods-systems-apps.md](methods-systems-apps.md#autonomous-driving)

## 17. SLAM
- **Gaussian Splatting SLAM**: [中英摘要](https://arxiv.org/abs/2312.06741) | [arXiv:2312.06741](https://arxiv.org/abs/2312.06741) →2312.06741
- **CGS-SLAM** →?Compact voxel-based 3DGS for dense visual SLAM
- **WildGS-SLAM**: [中英摘要](https://arxiv.org/abs/2504.03886) | [arXiv:2504.03886](https://arxiv.org/abs/2504.03886) →2504.03886
- **S3PO-GS** →?Global scale-consistent outdoor monocular 3DGS SLAM
- **Flow4DGS-SLAM**: [中英摘要](https://arxiv.org/abs/2604.22339) | [arXiv:2604.22339](https://arxiv.org/abs/2604.22339) →2604.22339
- **EvFlow-GS**: [中英摘要](https://arxiv.org/abs/2604.22183) | [arXiv:2604.22183](https://arxiv.org/abs/2604.22183) →2604.22183
- **MAGICIAN**: [中英摘要](https://arxiv.org/abs/2603.22650) | [arXiv:2603.22650](https://arxiv.org/abs/2603.22650) →2603.22650

> →?Full details in [methods-systems-apps.md](methods-systems-apps.md#slam)

## 18. Training & Optimization
- **Faster-GS** →?Systematic benchmark separating engineering from algorithmic acceleration
- **Proxy-GS** →?Lightweight proxy model for 2.5x speedup with no accuracy loss
- **Structure-Aware Densification**: [中英摘要](https://arxiv.org/abs/2604.28016) | [arXiv:2604.28016](https://arxiv.org/abs/2604.28016) →2604.28016
- **3DGS as MCMC**: [中英摘要](https://arxiv.org/abs/2404.09591) | [arXiv:2404.09591](https://arxiv.org/abs/2404.09591) →2404.09591
- **LeGS**: [中英摘要](https://arxiv.org/abs/2605.00408) | [arXiv:2605.00408](https://arxiv.org/abs/2605.00408) →2605.00408
- **GEMM-GS**: [中英摘要](https://arxiv.org/abs/2604.02120) | [arXiv:2604.02120](https://arxiv.org/abs/2604.02120) →2604.02120
- **Hybrid-Capture Two-View Training**: [中英摘要](https://arxiv.org/abs/2605.00052) | [arXiv:2605.00052](https://arxiv.org/abs/2605.00052) →2605.00052
- **YOGO**: [中英摘要](https://arxiv.org/abs/2604.21400) | [arXiv:2604.21400](https://arxiv.org/abs/2604.21400) →2604.21400
- **VkSplat**: [中英摘要](https://arxiv.org/abs/2605.00219) | [arXiv:2605.00219](https://arxiv.org/abs/2605.00219) →2605.00219

> →?Full details in [methods-systems-apps.md](methods-systems-apps.md#training--optimization)

## 19. Simulation & Robotics
- **GS-Playground**: [中英摘要](https://arxiv.org/abs/2604.25459) | [arXiv:2604.25459](https://arxiv.org/abs/2604.25459) →2604.25459
- **GS-Surrogate**: [中英摘要](https://arxiv.org/abs/2604.06358) | [arXiv:2604.06358](https://arxiv.org/abs/2604.06358) →2604.06358
- **3DGS Demo Synthesis (IL)**: [中英摘要](https://arxiv.org/abs/2605.01232) | [arXiv:2605.01232](https://arxiv.org/abs/2605.01232) →2605.01232
- **TAIL-Safe**: [中英摘要](https://arxiv.org/abs/2605.01195) | [arXiv:2605.01195](https://arxiv.org/abs/2605.01195) →2605.01195

> →?Full details in [methods-systems-apps.md](methods-systems-apps.md#simulation--robotics)

## 20. Cross-Domain Applications
- **GS-DOT**: [中英摘要](https://arxiv.org/abs/2604.23675) | [arXiv:2604.23675](https://arxiv.org/abs/2604.23675) →2604.23675
- **Habitat-GS** →?3DGS-rendered simulator for robot navigation training
- **BiSplat-WRF**: [中英摘要](https://arxiv.org/abs/2604.25945) | [arXiv:2604.25945](https://arxiv.org/abs/2604.25945) →2604.25945
- **FieryGS**: [中英摘要](https://arxiv.org/abs/2605.00177) | [arXiv:2605.00177](https://arxiv.org/abs/2605.00177) →2605.00177
- **SplAttN**: [中英摘要](https://arxiv.org/abs/2605.01466) | [arXiv:2605.01466](https://arxiv.org/abs/2605.01466) →2605.01466
- **Fake3DGS**: [中英摘要](https://arxiv.org/abs/2604.27590) | [arXiv:2604.27590](https://arxiv.org/abs/2604.27590) →2604.27590
- **SandSim**: [中英摘要](https://arxiv.org/abs/2604.27572) | [arXiv:2604.27572](https://arxiv.org/abs/2604.27572) →2604.27572
- **RGS**: [中英摘要](https://arxiv.org/abs/2604.27552) | [arXiv:2604.27552](https://arxiv.org/abs/2604.27552) →2604.27552
- **RESPIRE**: [中英摘要](https://arxiv.org/abs/2604.28179) | [arXiv:2604.28179](https://arxiv.org/abs/2604.28179) →2604.28179
- **EmoTaG**: [中英摘要](https://arxiv.org/abs/2603.21332) | [arXiv:2603.21332](https://arxiv.org/abs/2603.21332) →2603.21332
- **3DTV**: [中英摘要](https://arxiv.org/abs/2604.11211) | [arXiv:2604.11211](https://arxiv.org/abs/2604.11211) →2604.11211
- **Mobile Phone 3DGS Acquisition**: [中英摘要](https://arxiv.org/abs/2604.19216) | [arXiv:2604.19216](https://arxiv.org/abs/2604.19216) →2604.19216
- **RDSplat**: [中英摘要](https://arxiv.org/abs/2512.06774) | [arXiv:2512.06774](https://arxiv.org/abs/2512.06774) →2512.06774
- **Egocentric Dynamic 3DGS Evaluation**: [中英摘要](https://arxiv.org/abs/2604.23803) | [arXiv:2604.23803](https://arxiv.org/abs/2604.23803) →2604.23803

> →?Full details in [methods-systems-apps.md](methods-systems-apps.md#cross-domain-applications)

## 21. Robustness & Restoration
- **ArtifactWorld**: [中英摘要](https://arxiv.org/abs/2604.12251) | [arXiv:2604.12251](https://arxiv.org/abs/2604.12251) →2604.12251
- **FreeFix**: [中英摘要](https://arxiv.org/abs/2601.20857) | [arXiv:2601.20857](https://arxiv.org/abs/2601.20857) →2601.20857
- **Luminance-GS++**: [中英摘要](https://arxiv.org/abs/2602.18322) | [arXiv:2602.18322](https://arxiv.org/abs/2602.18322) →2602.18322
- **E2EGS**: [中英摘要](https://arxiv.org/abs/2603.14684) | [arXiv:2603.14684](https://arxiv.org/abs/2603.14684) →2603.14684

> →?Full details in [methods-systems-apps.md](methods-systems-apps.md#robustness--restoration)

---

## Performance Comparison Reference

| Method | Mip-NeRF 360 PSNR | Speed (FPS) | Memory | Primitive |
|--------|-------------------|-------------|--------|-----------|
| 3DGS (original) | 25.2 | 100+ | ~1.5 GB | 3D anisotropic |
| Mip-Splatting | ~25.3 (→?SSIM) | 60-80 | ~1.5 GB | 3D anisotropic + Mip filter |
| 2DGS | ~25.0 | 80+ | ~1.2 GB | 2D disk |
| PGSR | →?geometry | ~80 | ~1.8 GB | Planar-based 3DGS |
| Scaffold-GS | ~25.0 | 90+ | ~0.8 GB | Anchor+3D |
| NegGS | ~25.3 | 85+ | ~1.5 GB | Diff-Gaussian |
| Compact-3DGS | ~24.8 | 100+ | ~0.15 GB | Compressed |
| HAC | ~24.5 | Faster after decode | ~15 MB (100x) | Hash-grid context |
| MobileGS | ~23.5 | 200+ | ~15 MB | Extreme compressed |
| GlobalSplat | ~25.0* | ~13 (78ms) | ~4 MB | 16K Gaussians (feed-forward) |
| MVSplat | ~25.5* | Single-pass | ~500 MB | Cost-volume 3DGS |
| GS-LRM | ~25.8* | Single-pass | ~2 GB (1B params) | Transformer 3DGS |
| DepthSplat | ~25.6* | Single-pass | ~600 MB | Stereo-guided 3DGS |
| InstantSplat | ~25.0* | ~40s total | ~1.5 GB | Pose-free 3DGS |
| DreamGaussian | N/A (text-to-3D) | ~2s (SDS) | ~50 MB | Text-conditioned 3DGS |
| SketchFaceGS | N/A (face) | Real-time | N/A | UV-param + 3DGS |
| Street Gaussians | N/A (street) | ~30 | ~2 GB | Static+Dynamic 3DGS |
| OT-UVGS | →?vs UVGS | Same as UVGS | UV tensor | UV-mapped |
| WildSplatter | N/A (wild) | <1s (feed-forward) | N/A | Appearance-conditioned |
| Gaussians on a Diet | ~24.5 | Same as 3DGS | 80% less peak | Memory-bounded |
| DualSplat | →?vs baseline | Same as 3DGS | Same | Failure-to-Prior |
| MERID-GS | →?(low-light) | Same as 3DGS | Same | Retinex-decoupled |
| GS-Playground | N/A (sim) | 10^4 FPS | N/A | Batch 3DGS |
| SparseSplat | ~24.2 (DL3DV) | ~13* | ~150K Gaussians | Adaptive density feed-forward |
| NanoGS | Same as input 3DGS | CPU-only | Reduced count | Training-free merge |
| 3DTV | N/A (3-cam) | 40 FPS | N/A | Feedforward depth pyramid |
| Free Geometry | →?vs baseline (DA3/VGGT) | +LoRA (<2min) | Same | Self-supervised refinement |
| IDESplat | ~25.5* (RealEstate10K) | Single-pass | N/A | Iterative depth feed-forward |
| MesonGS++ | ~24.5 (34x compressed) | Faster after decode | ~15 MB (34x) | Post-training codec |
| Semantic Foam | N/A (segmentation) | N/A | Voronoi mesh | Semantic decomposition |
| EnerGS | →?(outdoor w/ LiDAR) | Same as 3DGS | Same | Energy-based priors |
| BiSplat-WRF | →?vs NeRF-WRF | N/A (WRF) | N/A | Planar GS (wireless) |
| Softmax-GS | →?vs 3DGS | Same | Reduced | Softmax competition |
| LeGS | →?vs baseline | Same | Same | RL-learnable density control |
| 2D-SuGaR | →?geometry (DTU) | Same | Same | Depth+normal priors + 2DGS |
| GETA-3DGS | ~24.5 (5x compressed) | Faster after decode | ~5x smaller | Joint prune+quantize auto |
| GOR-IS | →?(editing) | Same | Same | Intrinsic decomposition |
| VkSplat | Same as 3DGS | 3.3x faster | 33% less | Vulkan cross-vendor |
| FieryGS | N/A (fire) | N/A | N/A | Physics-integrated 3DGS |
| GLMap | N/A (navigation) | Real-time | N/A | Gaussian-Language map |
| Structure-Aware Dens. | →?(high-freq) | Faster convergence | Same | Freq-aware anisotropic split |
| HumanSplatHMR | N/A (avatar) | Real-time | N/A | Pose-avatar joint opt |
| GSDrive | N/A (AD) | N/A | N/A | 3DGS RL reward shaping |
| SplAttN | →?(PC completion) | N/A | N/A | Gaussian soft splatting |
| Fake3DGS | N/A (detection) | N/A | N/A | 3D manipulation detection |
| RGS | →?(CBCT sparse) | N/A | N/A | Residual wavelet-GS |
| RESPIRE | N/A (bronchoscopy) | 20x faster | N/A | Mesh-anchored + breathing phase |
| HeroGS | →?(sparse-view) | Same | Same | Hierarchical guidance |
| Sparse-View 3DGS Wild | →?vs baseline (wild) | Same | Same | Diffusion-guided refinement |
| Color-Encoded Illum. | N/A (high-speed) | Low-speed cam | N/A | Color-coded temporal encoding |
| 3DGS AD Safety | N/A (eval) | N/A | N/A | AD fidelity evaluation |
| GEMM-GS | Same as 3DGS | 1.42x faster | Same | GEMM Tensor Core |
| EmoTaG | N/A (talking head) | Real-time | N/A | FLAME + 3DGS |
| VIRGi | Same as 3DGS | Same | Same | Diffuse + view-dep. recolor |
| Pi-GS | →?vs baseline (sparse) | Same | Same | π³ ref-free init |
| E2EGS | →?vs baseline (event) | Real-time | N/A | Event-edge guided |
| Nighttime AD GS | →?vs baseline (night) | Real-time | Same | PBR + BRDF 3DGS |
| HDR-NSFF | →?(HDR dynamic) | N/A | N/A | 4D HDR NeRF/4DGS |
| DiffSoup | ~24.0 (extreme comp.) | Interactive | Minimal | Triangle soup |
| FreeFix | →?vs baseline (extrap.) | Same | Same | Diffusion-guided refine |
| Luminance-GS++ | →?vs baseline (illum.) | Same | Same | View-adaptive correction |
| FreeTimeGS++ | →?(dynamic 4DGS) | Same | Same | Gated marginalization + neural velocity |
| D-Rex | N/A (avatar relight) | Real-time | N/A | Diffusion post-process relighting |

> *Methods marked with asterisk are evaluated on RealEstate10K/ACID or other benchmarks (not Mip-NeRF 360)
> Numbers are approximate and may vary across implementations and hardware.
