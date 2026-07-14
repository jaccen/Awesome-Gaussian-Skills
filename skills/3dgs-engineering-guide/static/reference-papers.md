---
# Reference Papers by Domain

| Domain | Methods |
|--------|---------|
| AD Simulation | GSDrive, GS-Playground (RSS 2026), GS-Surrogate, FieryGS, GS-SCNet, Ground4D, ULF-Loc (CVPR 2026), Nighttime AD, Real2Sim, ConFixGS (+3.68 dB Waymo), StreetNVS (multi-sensor NVS, arXiv:2606.01590) |
| World Models | GWM, FlashWorld, GS-World, Visionary, RAD, DLWM, X-World, **ABot-3DWorld 0** [arXiv:2607.11673] (universal world model → 3DGS) |
| Digital Twin | DiffSoup, Street Gaussians, GlobalSplat, Large-Scale HQ Head |
| Volumetric Medical | GaussianPile (CVPR 2026, slice-aware PSF projection for CT/cBCT/ABUS/LSM; additive rasterization for volumetric intensity; ~16-26× compression over voxel grids; 11× faster than NeRF; 8min avg convergence) |
| Surgical SLAM | **Track2Map** [arXiv:2607.08408] (MICCAI 2026, surgical GS SLAM, instrument tracking → 3D map) |
| Dynamic SLAM | Flow4DGS-SLAM (optical flow-guided 4DGS temporal consistency), GGD-SLAM (ICRA 2026, generalizable motion model), **GeoGS-SLAM** (geometry-only, 80%+ param reduction), **GeoGS-SLAM v2** [arXiv:2607.11184] (geometric priors, improved depth regularization), **Real-Time LiDAR GS-SLAM** (first real-time LiDAR-only), **DL-SLAM** (dual-level probability dynamic), **AnythingReality** [arXiv:2607.09260] (online GS SLAM + VR + VLM) |
| Inspection | EnerGS, RGS, E2EGS |
| Simulation | PhysGaussian, Gaussian Splashing, GS-Playground, **SAM3D-Phys** [2605.30239], **RAF** (CVPR 2026 Findings, representation abstraction framework), **FreeForm** (CVPR 2026, particle-skinned eigenmodes) |
| Relighting | GS³, GaRe, SSD-GS, LumiMotion, GOR-IS, **Ambient-Robust Inverse Rendering** [2605.30250] |
| Cross-platform | VkSplat, GSeurat (Vulkan C++23), msplat (Metal), tortuise (Rust CPU), brush (Rust/WebGPU, 4.3k stars), AdaGScale, BlitzGS (distributed) |
| Feed-Forward | SplatWeaver [2605.07287] (expert-routing, 301 FPS), ZPressor [2505.23734] (100+ view scalability), VolSplat [2509.19297] (voxel-aligned), PM-Loss [2506.05327] (pointmap loss), **DéjàView** [2605.30215] (looped transformer), **HeadsUp** [2605.04035] (UV-parameterized head, Apple), **Z-Order GS** [2605.13465] (CVPR 2026 Oral, Morton curve indexing; 1000× faster; 2-3× fewer Gaussians), **ZipSplat** [2606.05102] (token-based; ~6× fewer Gaussians, +2.1 dB PSNR SOTA), **WildSplat** (ECCV 2026, unposed in-the-wild), **NoDrift3R** (ECCV 2026, drift-robust unposed), **AnchorSplat** (ECCV 2026, 10^5× detail), **HyperGS** [arXiv:2607.11500] (feedforward optimization-free Gaussian video, 10^4-10^5× speedup), **MAC-Splat** [arXiv:2607.10792] (ECCV 2026, multi-attribute consistency, +4.5 dB over Splatt3R), **AsySplat** [arXiv:2607.10995] (asymmetric decoupling, ~800× speedup) |
| BIM/CAD | BrepGaussian, CADFS, GS-CAD, GaussCAD, KDH-CAD (knowledge-data hybrid, arXiv:2606.01702), **ASSEMCAD** (ECCV 2026, NL→CAD assembly), **HoloTetSphere** [arXiv:2607.08398] (ECCV 2026, TetSphere → tetrahedral mesh for physics simulation) |
| Editing | GaussianEditor, ObjectMorpher, TransSplat, AlbedoEdit (video-level albedo editing, arXiv:2606.01362) |
| Security | GuardMarkGS (watermarking + edit deterrence) |
| Rendering | CoherentRaster (subpixel, light field), 3DGEER (exact ray, ICLR 2026), SparseOIT (order-independent transparency), DP-GES (sort-free surfel, ArXiv 2605.25345), **View-Dependent Splatting Kernels** [2605.25426] (SIGGRAPH 2026), DDF-GS (ray-query GI, arXiv:2606.00817), **D4RT** (CVPR 2026 Best Paper) |
| Streaming | CAGS (~7x VQ+LoD), AV1-3DGS (63% training reduction), PD-4DGS (progressive 4D streaming), MGS [2603.19234] (Matryoshka continuous LoD), **AsySplat** [arXiv:2607.10995] (asymmetric streaming, ~800× speedup) |
| Acceleration | AdpSplit [2605.06876] (9-22% training speedup), HiGS (NVIDIA, 15.8x rendering, arXiv:2606.00352), **Flux-GS** (ECCV 2026, Monte Carlo Energy Aggregation, mobile), **Provable Pruning via Coresets** (arXiv:2607.02721, first provable coreset), **SSA-3DGS** (sparse structure-aware, 2-3× speedup) |
| Dynamic/4D | **Grassmannian Splatting** [arXiv:2607.10489] (rank-2 spacetime surfels, closed-form motion), **MoE-GS/MoDE** [arXiv:2607.08250] (TPAMI 2026, Mixture-of-Experts dynamic deformation), **CAGS** (SIGGRAPH 2026, color-adaptive volumetric streaming) |
| Generative Optimization | **SalientGS** [arXiv:2607.11285] (MCMC Gaussian allocation, salient-guided density), **DP-Splat** [arXiv:2607.10912] (Dirichlet-process prior, Bayesian complexity control), CAdam (SIGGRAPH 2026, context-adaptive densification) |
| Compression | HAC (100x), MobileGS (CPU), GETA-3DGS (5x), MesonGS++ (34x), AdaGScale, **CodecSplat** (20–108 KiB/scene, ArXiv 2605.25563), **Flux-GS** (ECCV 2026, mobile densification), **CoSAG** [arXiv:2607.10237] (training-free semantic compression, 37–76× over LangSplatV2) |
| Semantic | **CoSAG** [arXiv:2607.10237] (training-free semantic compression), **StructSplat** [arXiv:2606.28321] (ECCV 2026, camera-free sparse-view 3DGS) |
| Relighting | GS³, GaRe, SSD-GS, LumiMotion, GOR-IS, **F-RNG** (feed-forward, ~25× faster, ArXiv 2605.25975) |
| Robotics | **SplatCtrl** [arXiv:2607.08948] (ICRA 2026, GS + reactive robot control) |
| Sensing | **StereoSplat+** [arXiv:2607.08808] (IROS 2026, stereo + diffusion progressive GS) |
| Avatar/Human | **PEAR** (SIGGRAPH 2026, single-image 100 FPS human avatar) |
| MR/Outdoor | **SyncSpace** [arXiv:2607.10050] (MR space reskinning), **PanoLOG** [arXiv:2607.08769] (panoramic outdoor partitioning + Pano360 benchmark) |
| Deblurring | **FreDeGS** (Springer 2026, frequency-guided deblurring GS) |

See knowledge base: `references/3dgs-methods-overview.md`, `references/methods-core.md`, `references/methods-semantic-editing.md`, `references/methods-systems-apps.md`