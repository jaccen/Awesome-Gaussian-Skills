
## Newly Added Methods (May 2026 Expansion)

> 279 methods added from ECCV/NeurIPS/CVPR 2024-2025 backfill


### Autonomous Driving
- **GaussianBeV** [arXiv:2407.14108](https://arxiv.org/abs/2407.14108) (ECCV 2024) — BEV perception via Gaussian Splatting: lifting 2D features into 3D Gaussian BEV representation
- **SplatAD** [arXiv:2411.16816](https://arxiv.org/abs/2411.16816) (CVPR 2025) — Autonomous driving GS with dynamic object decomposition and sensor simulation
- **GaussianSSC** [arXiv:2603.21487](https://arxiv.org/abs/2603.21487) (CVPR 2025) — GS-based 3D semantic scene completion with Gaussian-anchored feature lifting
- **P2GS** [arXiv:2605.16925](https://arxiv.org/abs/2605.16925) (CVPR 2026) — Physical prior-guided GS for photometrically consistent urban reconstruction: joint decomposition of HDR radiance + per-view exposure scales from LDR images
- **GEM** [arXiv:2605.17682](https://arxiv.org/abs/2605.17682) (arXiv 2026) — Gaussian Evolution Model for non-autoregressive occupancy forecasting: continuous 4D Gaussian primitives with learned dynamics for motion planning
- **Asset Harvester** [arXiv:2604.18468](https://arxiv.org/abs/2604.18468) (arXiv 2026) -- AV log → simulation-ready 3D assets via SparseViewDiT
- **Street-GS** (arXiv 2024) -- LiDAR-camera fusion + multi-view optimization
- **ConFixGS** [arXiv:2605.09688](https://arxiv.org/abs/2605.09688) (arXiv 2026) -- Confidence-aware diffusion priors for fixing feedforward 3DGS; +3.68 dB PSNR ...
- **GaussianLSS** (CVPR 2025) -- BEV perception via Gaussian Splatting
- **Ground4D** [arXiv:2605.04435](https://arxiv.org/abs/2605.04435) (arXiv 2026) -- Spatially-grounded feedforward 4D for off-road reconstruction
- **GSDrive** [arXiv:2604.28111](https://arxiv.org/abs/2604.28111) (arXiv 2026) -- 3DGS-based RL reward shaping for driving policy improvement
- **ADS-GS** (arXiv 2024) -- Static + dynamic decomposition for driving scenes

### CAD / Mesh / Hybrid Methods
- **BrepGaussian** [arXiv:2602.21105](https://arxiv.org/abs/2602.21105) (CVPR 2026) -- 3DGS + B-rep CAD reconstruction to parametric STEP models
- **Vol3DGS** (CVPR 2025) -- Physically accurate volume-consistent rendering resolving splatting/volume in...
- **CADFit** [arXiv:2605.01171](https://arxiv.org/abs/2605.01171) (arXiv 2026) -- IoU-driven hybrid optimization over structured CAD programs (extrusions, revo...
- **UniMGS** (AAAI 2026) -- Single-pass rasterization for both mesh and Gaussians simultaneously
- **CADFS** [arXiv:2605.01925](https://arxiv.org/abs/2605.01925) (CVPR 2026) -- Large-scale CAD program dataset + LLM-assisted CAD understanding
- **MaGS** (ICCV 2025) -- Mesh-adsorbed Gaussians; deform mesh → Gaussians follow

### Compression Methods
- **LightGaussian** [arXiv:2311.17245](https://arxiv.org/abs/2311.17245) (NeurIPS 2024) — Global+local pruning + SVD distillation for 15x compression at 200+ FPS [Code](https://github.com/VITA-Group/LightGaussian)
- **ContextGS** [arXiv:2405.20721](https://arxiv.org/abs/2405.20721) (NeurIPS 2024) — Anchor-level context model for entropy coding replacing uniform quantization in 3DGS [Code](https://github.com/wyf0912/ContextGS)
- **QUEEN** [arXiv:2412.04469](https://arxiv.org/abs/2412.04469) (NeurIPS 2024) — Quantized efficient encoding for streaming free-viewpoint video with dynamic Gaussians
- **EAGLES** [arXiv:2312.04564](https://arxiv.org/abs/2312.04564) (ECCV 2024) — Quantized embeddings + coarse-to-fine training + pruning for 10-20x memory compression maintaining quality [Code](https://github.com/Exyro/EAGLES)
- **RDO-Gaussian** [arXiv:2406.01597](https://arxiv.org/abs/2406.01597) (ECCV 2024) — End-to-end rate-distortion optimization: dynamic pruning + ECVQ quantization for 40x+ compression with continuous rate control
- **CompGS** [arXiv:2311.18159](https://arxiv.org/abs/2311.18159) (CVPR 2025) — Compact GS with learned importance-aware quantization + progressive decoding
- **HybridGS** [arXiv:2505.01938](https://arxiv.org/abs/2505.01938) (CVPR 2025) — Hybrid GS compression combining explicit pruning + implicit neural coding
- **DSGS** [arXiv:2605.17002](https://arxiv.org/abs/2605.17002) (arXiv 2026) — Decoder-Side Gaussian Splatting: replaces DSDE depth estimation with feed-forward 3DGS from compressed textures; lossy compression as implicit low-pass filter stabilizing prediction; +5.79 dB BD-PSNR
- **MMGS** [arXiv:2605.19304](https://arxiv.org/abs/2605.19304) (arXiv 2026) — 10x compressed 3DGS via multi-view ranking + Optimal Transport aggregation; global OT-based merging preserving geometry + OT-based densification operator; 10% primitives + 10x training speedup
- **CodecSplat** [arXiv:2605.25563](https://arxiv.org/abs/2605.25563) (arXiv 2026) — Ultra-compact entropy-coded latent features for feed-forward 3DGS; 20-108 KiB per scene, ~10x smaller than post-hoc compression of raw primitives (Pengpeng Yu et al.)
- **Gaussians on a Diet** [arXiv:2604.20046](https://arxiv.org/abs/2604.20046) (arXiv 2026) -- Memory-bounded training, 80% lower peak memory
- **CAGS** [arXiv:2605.09279](https://arxiv.org/abs/2605.09279) (SIGGRAPH 2026) -- VQ-based LoD for 3DGS streaming + low-res reference image color-distortion co...
- **OT-UVGS** [arXiv:2604.19127](https://arxiv.org/abs/2604.19127) (arXiv 2026) -- Optimal-transport UV mapping as capacity allocation
- **HAC** [arXiv:2403.14530](https://arxiv.org/abs/2403.14530) (ECCV 2024) -- Hash-grid context modeling, ~100x compression
- **GETA-3DGS** [arXiv:2605.02086](https://arxiv.org/abs/2605.02086) (arXiv 2026) -- End-to-end automatic joint pruning + quantization
- **LightGS** (arXiv 2024) -- Distillation-based, ~15-20x compression
- **MesonGS++** [arXiv:2604.26799](https://arxiv.org/abs/2604.26799) (arXiv 2026) -- Post-training codec with 34x compression + ILP hyperparameter search
- **Compact-3DGS** (arXiv 2024) -- Vector quantization + pruning, ~10-15x compression
- **MobileGS** (arXiv 2024) -- Extreme 50-100x compression for mobile deployment
- **Embedded-3DGS** (arXiv 2024) -- Neural architecture search, ~10x compression
- **GS-SCNet** [arXiv:2604.25330](https://arxiv.org/abs/2604.25330) (arXiv 2026) -- Generalizable 3DGS + semantic coding for immersive video
- **MGS** [arXiv:2603.19234](https://arxiv.org/abs/2603.19234) (arXiv 2026) -- Matryoshka continuous LoD via stochastic budget training; single ordered set ...
- **NanoGS** [arXiv:2603.16103](https://arxiv.org/abs/2603.16103) (arXiv 2026) -- Training-free simplification via local pairwise merging

### Cross-Domain Applications
- **TransmissiveGS** (arXiv 2026) — Residual-guided disentangled Gaussian Splatting for transmissive scene reconstruction; separates reflection and transmission components via residual-guided decomposition
- **RT-Splatting** [arXiv:2605.18263](https://arxiv.org/abs/2605.18263) (CVPR 2026 Highlight) — Joint reflection-transmission modeling with GS; disentangles geometric occupancy from optical opacity per Gaussian; Specular-Aware Gradient Gating reduces floaters
- **AsyncEvGS** [arXiv:2605.07192](https://arxiv.org/abs/2605.07192) (arXiv 2026) — Asynchronous event camera + RGB dual-system for motion-blurred 3DGS; high-resolution async RGB-Event cross-domain pose estimation via VGGT
- **RGS** [arXiv:2604.27552](https://arxiv.org/abs/2604.27552) (arXiv 2026) -- Residual wavelet-GS for ultra sparse-view CBCT reconstruction
- **FieryGS** [arXiv:2605.00177](https://arxiv.org/abs/2605.00177) (ICLR 2026) -- Physics-integrated combustion simulation + 3DGS rendering
- **BiSplat-WRF** [arXiv:2604.25945](https://arxiv.org/abs/2604.25945) (arXiv 2026) -- Gaussian Splatting for wireless radiance field reconstruction
- **MSGS** [arXiv:2604.13340](https://arxiv.org/abs/2604.13340) (arXiv 2026) -- Multispectral 3D Gaussian Splatting
- **RDSplat** [arXiv:2512.06774](https://arxiv.org/abs/2512.06774) (arXiv 2025) -- Robust watermarking against diffusion editing
- **RESPIRE** [arXiv:2604.28179](https://arxiv.org/abs/2604.28179) (arXiv 2026) -- CT-informed mesh-anchored GS for dynamic bronchoscopy
- **XFreq-GS** [arXiv:2605.11432](https://arxiv.org/abs/2605.11432) (arXiv 2026) -- Cross-frequency wireless radiation field reconstruction with shared geometry ...
- **PatchPoison** [arXiv:2604.13153](https://arxiv.org/abs/2604.13153) (arXiv 2026) -- Poisoning multi-view datasets to degrade 3D reconstruction (Security)
- **3DTV** [arXiv:2604.11211](https://arxiv.org/abs/2604.11211) (arXiv 2026) -- Feedforward 3-camera interpolation at 40 FPS
- **Fake3DGS** [arXiv:2604.27590](https://arxiv.org/abs/2604.27590) (arXiv 2026（venue 待核实）) -- Benchmark for 3D manipulation detection in neural rendering
- **SplAttN** [arXiv:2605.01466](https://arxiv.org/abs/2605.01466) (ICML 2026) -- Gaussian soft splatting for point cloud completion
- **Habitat-GS** (arXiv 2024) -- 3DGS-rendered simulator for robot navigation training
- **GS-DOT** [arXiv:2604.23675](https://arxiv.org/abs/2604.23675) (arXiv 2026) -- Diffuse optical tomography via Gaussian Splatting
- **OCH3R** [arXiv:2605.13018](https://arxiv.org/abs/2605.13018) (arXiv 2026) -- Object-Centric Holistic 3D from single RGB; per-pixel CLIP + 6D pose + per-ob...
- **EmoTaG** [arXiv:2603.21332](https://arxiv.org/abs/2603.21332) (CVPR 2026) -- Few-shot emotion-aware talking head on Gaussian Splatting
- **TwinPose** (SIGGRAPH 2026) -- Multi-view 3D pose estimation via person-specific subspaces
- **LagrangianSplats** [arXiv:2605.09299](https://arxiv.org/abs/2605.09299) (arXiv 2026) -- Divergence-free constraint on Gaussian advection for fluid velocity field rec...
- **AudioGS** [arXiv:2604.08967](https://arxiv.org/abs/2604.08967) (arXiv 2026) -- Spectrogram-based audio Gaussian Splatting for sound field reconstruction
- **PG-3DGS** [arXiv:2605.11266](https://arxiv.org/abs/2605.11266) (arXiv 2026) -- Differentiable physics simulation coupled with 3D Gaussian representations; p...
- **SandSim** [arXiv:2604.27572](https://arxiv.org/abs/2604.27572) (arXiv 2026) -- Curve-guided GS for sand painting process reconstruction
- **CoherentRaster** [arXiv:2605.04509](https://arxiv.org/abs/2605.04509) (arXiv 2026) -- Subpixel-level 3DGS rasterization for light field displays
- **GS-STVSR** [arXiv:2604.18047](https://arxiv.org/abs/2604.18047) (arXiv 2026) -- Ultra-efficient continuous spatio-temporal video super-resolution via 2D Gaus...

### Dynamic Scene Methods
- **NeuroGauss4D-PCI** [arXiv:2405.14241](https://arxiv.org/abs/2405.14241) (NeurIPS 2024) — 4D neural field + Gaussian deformation fields for point cloud interpolation [Code](https://github.com/jiangchaokang/NeuroGauss4D-PCI)
- **HDR-GS** [arXiv:2405.15125](https://arxiv.org/abs/2405.15125) (NeurIPS 2024) — HDR-specific GS luminance encoding + fast tonemapping for 1000x HDR view synthesis [Code](https://github.com/caiyuanhao1998/HDR-GS)
- **Vidu4D** [arXiv:2405.16822](https://arxiv.org/abs/2405.16822) (NeurIPS 2024) — Dynamic Gaussian Surfels for single-video to 4D reconstruction [Code](https://github.com/yikaiw/vidu4d)
- **L4GM** [arXiv:2406.10324](https://arxiv.org/abs/2406.10324) (NeurIPS 2024) — Large-scale feed-forward 4D Gaussian reconstruction from video
- **DreamMesh4D** [arXiv:2410.06756](https://arxiv.org/abs/2410.06756) (NeurIPS 2024) — Sparse-controlled Gaussian-Mesh hybrid 4D generation [Code](https://github.com/WU-CVGL/DreamMesh4D)
- **MotionGS** [arXiv:2410.07707](https://arxiv.org/abs/2410.07707) (NeurIPS 2024) — Explicit motion field guiding deformable 3DGS, decoupling motion from appearance
- **DN-4DGS** [arXiv:2410.13607](https://arxiv.org/abs/2410.13607) (NeurIPS 2024) — Denoised deformable network with temporal-spatial aggregation for dynamic scene rendering [Code](https://github.com/peoplelu/DN-4DGS)
- **Grid4D** [arXiv:2410.20815](https://arxiv.org/abs/2410.20815) (NeurIPS 2024) — 4D decomposed hash encoding for efficient spatiotemporal Gaussian queries in dynamic GS [Code](https://github.com/JiaweiXu8/Grid4D)
- **HiCoM** [arXiv:2411.07541](https://arxiv.org/abs/2411.07541) (NeurIPS 2024) — Hierarchical coherent motion for streamable dynamic scene with 3DGS [Code](https://github.com/gqk/HiCoM)
- **SAGD** [arXiv:2401.17857](https://arxiv.org/abs/2401.17857) (ECCV 2024) — Self-supervised articulated Gaussian discovery: automatic part segmentation + articulation estimation without supervision
- **Deformable-3DGS** [arXiv:2309.13101](https://arxiv.org/abs/2309.13101) (CVPR 2024) — Deformation field network for 3DGS enabling high-fidelity dynamic scene rendering [Code](https://github.com/ingra14m/Deformable-3DGS)
- **DynMF** [arXiv:2312.00112](https://arxiv.org/abs/2312.00112) (CVPR 2024) — Dynamic neural motion fields decomposing scene motion into compact basis functions for 4D GS
- **GaussianWorld** [arXiv:2409.17280](https://arxiv.org/abs/2409.17280) (CVPR 2025) — World-model GS: dynamic scene forecasting with Gaussian-based future prediction
- **GaussianFlow** [arXiv:2403.12365](https://arxiv.org/abs/2403.12365) (CVPR 2025) — Optical flow-guided 4DGS for temporally consistent dynamic scene reconstruction
- **STG** [arXiv:2510.22140](https://arxiv.org/abs/2510.22140) (CVPR 2025) — Spatiotemporal Gaussians with decomposed spatial-temporal attention for 4D rendering
- **RobustSplat** (ICCV 2025) -- Decouples densification from dynamics for transient-free 3DGS
- **GeoRect4D** [arXiv:2604.20784](https://arxiv.org/abs/2604.20784) (arXiv 2026) -- Geometry-compatible generative rectification for dynamic sparse-view 3D recon...
- **HDR-NSFF** [arXiv:2603.08313](https://arxiv.org/abs/2603.08313) (ICLR 2026) -- Dynamic HDR radiance fields from alternating-exposure video
- **Velox** [arXiv:2605.04527](https://arxiv.org/abs/2605.04527) (arXiv 2026) -- Feed-forward 4D reconstruction learning representations of 4D geometry and ap...
- **PD-4DGS** [arXiv:2605.11427](https://arxiv.org/abs/2605.11427) (arXiv 2026) -- Progressive 4DGS compression/streaming with Hierarchical Deformation Decompos...
- **Color-Encoded Illumination** [arXiv:2604.26920](https://arxiv.org/abs/2604.26920) (CVPR 2026) -- High-speed volumetric reconstruction via color-coded illumination
- **4DGS** [arXiv:2310.08528](https://arxiv.org/abs/2310.08528) (CVPR 2024) -- 4D anisotropic Gaussians (3D + time) with regularized deformation
- **SC-GS** (arXiv 2024) -- Spatial-temporal compression for dynamic Gaussians
- **ClipGStream** [arXiv:2604.13746](https://arxiv.org/abs/2604.13746) (CVPR 2026) -- Clip-stream any-length any-motion multi-view dynamic scene reconstruction
- **PaMoSplat** [arXiv:2605.10307](https://arxiv.org/abs/2605.10307) (TCSVT 2026) -- 部分感知 GS with graph-clustered Gaussian parts + differential evolution fo...
- **ParticleGS** [arXiv:2505.20270](https://arxiv.org/abs/2505.20270) (CVPR 2026) -- Physics-based MPM-inspired 4DGS with Neural ODE evolver for prior-free motion...
- **FreeTimeGS++** [arXiv:2605.03337](https://arxiv.org/abs/2605.03337) (arXiv 2026) -- Principled analysis + gated marginalization for 4DGS stability

### Editing Methods
- **D-MiSo** [arXiv:2405.14276](https://arxiv.org/abs/2405.14276) (NeurIPS 2024) — Multi-Gaussians Soup representation for editing dynamic 3D scenes
- **StylizedGS** [arXiv:2404.05220](https://arxiv.org/abs/2404.05220) (NeurIPS 2024) — Reference-based controllable scene stylization with Gaussian Splatting
- **ProEdit** [arXiv:2411.05006](https://arxiv.org/abs/2411.05006) (NeurIPS 2024) — Progressive local editing with global consistency maintenance for 3D scenes
- **GaussianCut** [arXiv:2411.07555](https://arxiv.org/abs/2411.07555) (NeurIPS 2024) — Graph cut algorithm for interactive 3DGS segmentation enabling instance-level editing
- **Gaussian Grouping** [arXiv:2311.12897](https://arxiv.org/abs/2311.12897) (ECCV 2024) — Identity encoding per Gaussian + SAM supervision + 3D spatial consistency for open-world 3D segmentation and editing
- **GaussCtrl** [arXiv:2403.08733](https://arxiv.org/abs/2403.08733) (ECCV 2024) — Depth-conditioned attention + progressive editing for controllable GS generation from text/depth
- **GScream** [arXiv:2404.13679](https://arxiv.org/abs/2404.13679) (ECCV 2024) — Cross-attention feature propagation bridging visible/invisible regions for 3D object removal
- **FlashSplat** [arXiv:2409.08270](https://arxiv.org/abs/2409.08270) (ECCV 2024) — Alpha blending linearity enables 2D-to-3D GS segmentation as linear programming with closed-form solution (50x faster) [Code](https://github.com/florinshen/FlashSplat)
- **VR-GS** [arXiv:2401.16663](https://arxiv.org/abs/2401.16663) (ECCV 2024) — Physical-based GS editing in VR: real-time Gaussian manipulation with haptic feedback
- **Align Your Gaussians** [arXiv:2312.13763](https://arxiv.org/abs/2312.13763) (CVPR 2024) — Depth-conditioned controlnet + progressive editing for controllable 3DGS generation
- **BAD-Gaussians** [arXiv:2403.11831](https://arxiv.org/abs/2403.11831) (CVPR 2024) — Bundle-adjusted deformation Gaussians for consistent editing across views [Code](https://github.com/yccyencheng/BAD-Gaussians)
- **InFusion** [arXiv:2404.11613](https://arxiv.org/abs/2404.11613) (CVPR 2024) — Inpainting-guided Gaussian Splatting for 3D content insertion and scene completion
- **VEGS** [arXiv:2407.02945](https://arxiv.org/abs/2407.02945) (CVPR 2025) — Video-driven editing of Gaussian Splatting with temporal consistency propagation
- **GS-ID** [arXiv:2407.04545](https://arxiv.org/abs/2407.04545) (CVPR 2025) — Identity-preserving Gaussian editing for 3D portrait manipulation
- **GS-DIFF** [arXiv:2605.07203](https://arxiv.org/abs/2605.07203) (arXiv 2026) — Scene change detection directly on Gaussian primitives; separates geometric vs. appearance changes; +17% mIoU
- **SVGS-Edit** [arXiv:2603.28126](https://arxiv.org/abs/2603.28126) (arXiv 2026) -- Single-view text-driven 3D editing with sparse 3DGS (disambiguation: distinct...
- **GaussianEditor** (arXiv 2024) -- CLIP-guided text/geometry-driven editing
- **FluSplat** [arXiv:2604.20038](https://arxiv.org/abs/2604.20038) (arXiv 2026) -- Feed-forward sparse-view editing without per-scene optimization
- **GOR-IS** [arXiv:2605.00498](https://arxiv.org/abs/2605.00498) (arXiv 2026) -- Physically consistent object removal via intrinsic decomposition
- **FTSplat** [arXiv:2603.05932](https://arxiv.org/abs/2603.05932) (arXiv 2026) -- Feed-forward triangle primitive generation
- **SketchFaceGS** [arXiv:2604.19202](https://arxiv.org/abs/2604.19202) (CVPR 2026) -- Sketch-driven face editing via Transformer UV prediction
- **FaceParts** [arXiv:2605.13853](https://arxiv.org/abs/2605.13853) (arXiv 2026) -- Unsupervised segmentation and editing of GS avatars with FLAME-anchored transfer
- **GeoGaussian** (arXiv 2024) -- Mesh-prior-guided Gaussian manipulation
- **IRIS** [arXiv:2603.15368](https://arxiv.org/abs/2603.15368) (arXiv 2026) -- Hybrid proxy with analytical ray-primitive intersection
- **Frosting** (arXiv 2024) -- Decoupled geometry/appearance editing
- **ObjectMorpher** [arXiv:2603.28152](https://arxiv.org/abs/2603.28152) (CVPR 2026) -- Deformable 3DGS for 3D-aware interactive image editing
- **TransSplat** [arXiv:2604.19571](https://arxiv.org/abs/2604.19571) (arXiv 2026) -- Language-driven editing as unbalanced semantic transport
- **DiffSoup** [arXiv:2603.27151](https://arxiv.org/abs/2603.27151) (arXiv 2026) -- Triangle soup as extreme radiance field simplification
- **Robust Prior-Guided Seg.** [arXiv:2605.16065](https://arxiv.org/abs/2605.16065) (ICIP 2026) -- SAM-HQ prior-guided label reassignment for multiview-consistent 3DGS seg...

### Feed-Forward Methods
- **FreeSplat** [arXiv:2405.17958](https://arxiv.org/abs/2405.17958) (NeurIPS 2024) — Generalizable feed-forward indoor 3DGS with pixel-aligned Gaussian prediction [Code](https://github.com/wangys16/FreeSplat)
- **GeoLRM** [arXiv:2406.15333](https://arxiv.org/abs/2406.15333) (NeurIPS 2024) — Geometry-aware attention for large reconstruction model generating high-quality 3D Gaussians [Code](https://github.com/alibaba-yuanjing-aigclab/GeoLRM)
- **EpipolarFree-GS** [arXiv:2410.22817](https://arxiv.org/abs/2410.22817) (NeurIPS 2024) — Removing epipolar constraint for generalizable NVS, stronger cross-domain generalization
- **MVSplat360** [arXiv:2411.04924](https://arxiv.org/abs/2411.04924) (NeurIPS 2024) — Feed-forward 360-degree scene synthesis from sparse views [Code](https://github.com/donydchen/mvsplat360)
- **GGN** [arXiv:2503.16338](https://arxiv.org/abs/2503.16338) (NeurIPS 2024) — Gaussian Graph Network modeling inter-Gaussian relationships with graph neural networks [Code](https://github.com/shengjun-zhang/GGN)
- **PixelSplat** [arXiv:2312.12337](https://arxiv.org/abs/2312.12337) (CVPR 2024) — Epipolar Transformer for feed-forward stereo GS reconstruction from image pairs [Code](https://github.com/davidtvs/pixelsplat)
- **OmniSplat** [arXiv:2412.16604](https://arxiv.org/abs/2412.16604) (CVPR 2025) — Geometry-aware feed-forward GS with cross-view feature matching
- **SplatFormer** [arXiv:2411.06390](https://arxiv.org/abs/2411.06390) (CVPR 2025) — Transformer-based Gaussian prediction for generalizable 3D reconstruction
- **ZPressor** [arXiv:2505.23734](https://arxiv.org/abs/2505.23734) (NeurIPS 2025) — Bottleneck-aware compression for scalable multi-view feed-forward 3DGS; compresses redundant multi-view tokens so reconstruction scales beyond 100 input views [Code](https://github.com/ziplab/ZPressor)
- **PM-Loss** [arXiv:2506.05327](https://arxiv.org/abs/2506.05327) (3DV 2026) — Pointmap-supervised depth representation for feed-forward 3DGS; regularizes depth maps in 3D point space to smooth boundary discontinuities without inference overhead [Code](https://github.com/aim-uofa/PM-Loss)
- **VolSplat** [arXiv:2509.19297](https://arxiv.org/abs/2509.19297) (arXiv 2025) — Voxel-aligned feed-forward Gaussian prediction; replaces pixel-aligned splats with voxel-space alignment for stronger multi-view consistency [Code](https://github.com/ziplab/VolSplat)
- **AdaptSplat** (arXiv 2026) — Adapting vision foundation models for feed-forward 3DGS; leverages pretrained ViT/DINO features for cross-scene generalizable Gaussian prediction
- **PointForward** (arXiv 2026) — Point-aligned feed-forward driving scene reconstruction via 3DGS; anchor-aligned representation replacing pixel-alignment for autonomous driving
- **Cross-View Splatter** [arXiv:2605.19656](https://arxiv.org/abs/2605.19656) (arXiv 2026) — Ground+satellite cross-view feature fusion for outdoor 3DGS reconstruction; unified GPS-tagged 3D coordinate frame
- **GenWildSplat** [arXiv:2604.28193](https://arxiv.org/abs/2604.28193) (CVPR 2026) -- Generalizable sparse-view 3D reconstruction from unconstrained images
- **AnySplat** [arXiv:2505.23716](https://arxiv.org/abs/2505.23716) (SIGGRAPH 2025) -- In-the-wild feed-forward with appearance/lighting variation handling
- **InstantSplat** [arXiv:2403.20309](https://arxiv.org/abs/2403.20309) (arXiv 2024) -- Pose-free sparse-view reconstruction in ~40 seconds
- **ARGS** [arXiv:2604.00494](https://arxiv.org/abs/2604.00494) (arXiv 2026) -- Auto-regressive O(log n) multi-scale 3D generation
- **Free Geometry** [arXiv:2604.14048](https://arxiv.org/abs/2604.14048) (arXiv 2026) -- Self-evolving feed-forward models via LoRA without 3D GT
- **Z-Order GS** [arXiv:2605.13465](https://arxiv.org/abs/2605.13465) (CVPR 2026) -- Z-order strategy for spatially coherent Gaussian sequence with sparse attention
- **VG2GT** [arXiv:2606.01573](https://arxiv.org/abs/2606.01573) (arXiv 2026 2026) -- Voxel-Gaussian Transformer; frozen VFM + stochastic solid volume rendering
- **Spark3R** [arXiv:2605.06270](https://arxiv.org/abs/2605.06270) (arXiv 2026) -- Training-free asymmetric query/KV token compression for 28x speedup on feed-f...
- **SparseSplat** (CVPR 2026) -- Entropy-based adaptive density, SOTA with 22% of Gaussians (150K vs 688K)
- **MVSplat** [arXiv:2403.14627](https://arxiv.org/abs/2403.14627) (ECCV 2024) -- Cost-volume-based 3DGS from 3 sparse views
- **GS-LRM** [arXiv:2404.19702](https://arxiv.org/abs/2404.19702) (ECCV 2024) -- 1B-parameter transformer with zero-shot generalization
- **DepthSplat** [arXiv:2410.13862](https://arxiv.org/abs/2410.13862) (CVPR 2025) -- Stereo-guided depth regularization for feed-forward 3DGS
- **Reliev3R** [arXiv:2604.00548](https://arxiv.org/abs/2604.00548) (CVPR 2026) -- Reduces dependency on dense multi-view geometric annotations
- **RoSplat** [arXiv:2605.13093](https://arxiv.org/abs/2605.13093) (arXiv 2026) -- Robust feed-forward pixel-wise GS with alpha normalization + 3D sampling regu...
- **GlobalSplat** [arXiv:2604.15284](https://arxiv.org/abs/2604.15284) (arXiv 2026) -- Global latent tokens → 16K Gaussians in 78ms single forward pass
- **SplatWeaver** [arXiv:2605.07287](https://arxiv.org/abs/2605.07287) (arXiv 2026) -- Cardinality Gaussian Expert Routing (0/1/2/3 experts) + DWT frequency prior +...
- **WildSplatter** [arXiv:2604.21182](https://arxiv.org/abs/2604.21182) (arXiv 2026) -- Unconstrained images with appearance embeddings, <1s reconstruction

### Few-Shot / Sparse-View
- **Binocular3DGS** [arXiv:2410.18822](https://arxiv.org/abs/2410.18822) (NeurIPS 2024) — Binocular disparity-guided depth + GS joint optimization for sparse views [Code](https://github.com/hanl2010/Binocular3DGS)
- **FewViewGS** [arXiv:2411.02229](https://arxiv.org/abs/2411.02229) (NeurIPS 2024) — Multi-stage coarse-to-fine training strategy for few-view Gaussian Splatting
- **SCGaussian** [arXiv:2411.03637](https://arxiv.org/abs/2411.03637) (NeurIPS 2024) — Structure consistency constraint + geometric regularization for sparse-view GS [Code](https://github.com/prstrive/SCGaussian)
- **CoR-GS** [arXiv:2405.12110](https://arxiv.org/abs/2405.12110) (ECCV 2024) — Co-regularization of two randomly initialized GS fields: co-pruning + pseudo-view augmentation for sparse views
- **GaussianObject** [arXiv:2402.10259](https://arxiv.org/abs/2402.10259) (CVPR 2024) — Object-centric GS from sparse views with depth-regularized Gaussian initialization [Code](https://github.com/Chenyu-Yang-GOAT/GaussianObject)
- **GSCompleter** [arXiv:2604.20155](https://arxiv.org/abs/2604.20155) (arXiv 2026) -- Distillation-free sparse-view completion via Stereo-Anchor
- **Pi-GS** [arXiv:2602.03327](https://arxiv.org/abs/2602.03327) (arXiv 2026) -- Reference-free π³ initialization for sparse-view 3DGS
- **PairDropGS** [arXiv:2605.12072](https://arxiv.org/abs/2605.12072) (arXiv 2026) -- Paired dropout-induced consistency regularization with progressive scheduling...
- **FSGS** [arXiv:2312.00451](https://arxiv.org/abs/2312.00451) (ECCV 2024) -- SRF geometric prior + 3DGS for few-shot view synthesis
- **HeroGS** (CVPR 2026) -- Hierarchical image→region→pixel guidance for sparse-view robustness
- **GeoQuery** [arXiv:2605.12399](https://arxiv.org/abs/2605.12399) (SIGGRAPH 2026) -- Geometry-guided cross-view attention replacing corrupted rendering features w...
- **VidSplat** [arXiv:2605.11424](https://arxiv.org/abs/2605.11424) (SIGGRAPH 2026) -- Training-free generative framework leveraging video diffusion priors with ite...
- **FrameTwin** [arXiv:2605.09362](https://arxiv.org/abs/2605.09362) (arXiv 2026) -- Curve-anchored Gaussian alignment from sparse views for adaptive wireframe 3D...
- **PanoPlane** [arXiv:2605.14135](https://arxiv.org/abs/2605.14135) (arXiv 2026) -- Plane-aware panoramic completion for indoor sparse-view 3DGS, +17.8% PSNR

### Foundation Methods
- **DisC-GS** [arXiv:2405.15196](https://arxiv.org/abs/2405.15196) (NeurIPS 2024) — Progressive low-pass + discontinuity boundary detection preventing splat artifacts at edges
- **Normal-GS** [arXiv:2410.20593](https://arxiv.org/abs/2410.20593) (NeurIPS 2024) — Normal-involved rendering: normal constraint + differentiable normal guiding splat distribution
- **ODGS** [arXiv:2410.20686](https://arxiv.org/abs/2410.20686) (NeurIPS 2024) — Spherical projection + panoramic camera GS rasterization adaptation for 360-degree images [Code](https://github.com/esw0116/ODGS)
- **6DGS** [arXiv:2410.04974](https://arxiv.org/abs/2410.04974) (ECCV 2024) — 6-DoF Gaussian Splatting: explicit orientation-aware primitive with full 6D pose parameterization [Code](https://github.com/r4dl/6dgs)
- **GES** [arXiv:2402.17427](https://arxiv.org/abs/2402.17427) (CVPR 2024) — Generalized Exponential Splatting: generalized exponential family replacing Gaussian for flexible primitive shapes
- **UniGS** [arXiv:2510.12174](https://arxiv.org/abs/2510.12174) (CVPR 2025) — Unified Gaussian Splatting: single model supporting multiple rendering modes (RGB/depth/semantic)
- **GaussRender** [arXiv:2502.05040](https://arxiv.org/abs/2502.05040) (CVPR 2025) — Unified rendering pipeline for GS supporting multi-modal output (RGB/D/N/S)
- **3DSGS** [arXiv:2605.18334](https://arxiv.org/abs/2605.18334) (arXiv 2026) — General 3D Skew Gaussian primitives with re-derived CUDA rasterization for asymmetric shape modeling
- **Topo-GS** [arXiv:2605.17011](https://arxiv.org/abs/2605.17011) (arXiv 2026) — Topological GS for high-dimensional data embedding; ARAP prior + tangent space alignment via orthogonal Procrustes; topology-aware loss for 1D/2D intrinsic dimensionality
- **Softmax-GS** [arXiv:2604.27437](https://arxiv.org/abs/2604.27437) (CVPR 2026) -- Learnable softmax-based competition replacing α-compositing
- **Mip-Splatting** [arXiv:2311.16493](https://arxiv.org/abs/2311.16493) (CVPR 2024) -- Anti-aliased 3DGS with 3D smoothing + 2D Mip filter
- **SNS** [arXiv:2605.15010](https://arxiv.org/abs/2605.15010) (arXiv 2026) -- Azzalini Skew-Normal distribution as 3DGS primitive; learnable skewness for a...
- **3DGS** [arXiv:2308.04079](https://arxiv.org/abs/2308.04079) (SIGGRAPH 2023) -- Anisotropic 3D Gaussians with tile-based differentiable rasterization
- **3DGEER** (ICLR 2026) -- Exact ray-Gaussian integration replacing splatting approximation for fisheye/...

### Generation / Text-to-3D
- **GaussianCube** [arXiv:2403.19655](https://arxiv.org/abs/2403.19655) (NeurIPS 2024) — Optimal Transport reorders Gaussians into voxel grid structure enabling 3D diffusion generation [Code](https://github.com/GaussianCube/GaussianCube)
- **Tetrahedron Splatting** [arXiv:2406.01579](https://arxiv.org/abs/2406.01579) (NeurIPS 2024) — Novel tetrahedron primitive replacing Gaussian ellipsoid for 3D generation tasks [Code](https://github.com/fudan-zvg/tet-splatting)
- **GSGAN** [arXiv:2406.02968](https://arxiv.org/abs/2406.02968) (NeurIPS 2024) — Hierarchical GAN for direct 3D Gaussian generation [Code](https://github.com/hse1032/GSGAN)
- **MVGamba** [arXiv:2406.06367](https://arxiv.org/abs/2406.06367) (NeurIPS 2024) — State Space Model (Mamba) replacing Transformer for 3D generation via sequence modeling [Code](https://github.com/SkyworkAI/MVGamba)
- **Director3D** [arXiv:2406.17601](https://arxiv.org/abs/2406.17601) (NeurIPS 2024) — Text to progressive 3D scene GS generation with camera trajectory planning [Code](https://github.com/imlixinyang/director3d)
- **DiffGS** [arXiv:2410.19657](https://arxiv.org/abs/2410.19657) (NeurIPS 2024) — Functional Gaussian Splatting diffusion in function space (not original space) [Code](https://github.com/weiqi-zhang/DiffGS)
- **GaussianDreamer** [arXiv:2310.08529](https://arxiv.org/abs/2310.08529) (CVPR 2024) — Fast 3DGS-based text-to-3D generation coupling SDS with structured Gaussian initialization [Code](https://github.com/hustvl/GaussianDreamer)
- **HoGS** [arXiv:2503.19232](https://arxiv.org/abs/2503.19232) (CVPR 2025) — Enhanced GS-based text-to-3D with progressive generation and SDS refinement
- **DeG** [arXiv:2605.16355](https://arxiv.org/abs/2605.16355) (SIGGRAPH 2026) — Density-Sampled Gaussians: learnable probability density on octree for adaptive density control; fully differentiable analogue to densification/pruning; latent diffusion with VecSeq canonical re-indexing
- **PanoWorld** [arXiv:2605.17916](https://arxiv.org/abs/2605.17916) (arXiv 2026) — Generative spatial world model for whole-house panorama synthesis: floorplan-derived 3D shell + dynamic 3DGS cache as renderable spatial memory
- **GaussianZoom** [arXiv:2605.18252](https://arxiv.org/abs/2605.18252) (arXiv 2026) — Progressive zoom-in generative 3D reconstruction with multi-scale semantic reasoning + expandable continuous LoD hierarchy
- **PhysX-Omni** [arXiv:2605.21572](https://arxiv.org/abs/2605.21572) (arXiv 2026) — Unified simulation-ready physical 3D generation across rigid, deformable, and articulated objects; VLM-tailored geometry encoding without compression; PhysXVerse dataset + PhysX-Bench (NTU/Ziwei Liu)
- **ROAR-3D** [arXiv:2605.21121](https://arxiv.org/abs/2605.21121) (arXiv 2026) — Routing arbitrary views for multi-view 3D generation; token-wise view router establishes 2D-to-3D correspondences without explicit pose input; dual-stream attention preserves pretrained single-view behavior
- **SIC3D** [arXiv:2604.08760](https://arxiv.org/abs/2604.08760) (arXiv 2026) -- Style image conditioned text-to-3D Gaussian Splatting generation
- **DreamGaussian** [arXiv:2309.16653](https://arxiv.org/abs/2309.16653) (ICLR 2024) -- SDS text-to-3D with 3DGS prior for orders-of-magnitude speedup
- **AniGen** (SIGGRAPH 2026) -- Unified S³ Fields for single-image animatable 3D asset generation with skelet...

### Human & Avatar Methods
- **Human3Diffusion** [arXiv:2406.08475](https://arxiv.org/abs/2406.08475) (NeurIPS 2024) — Diffusion + GS dual-driven 3D human avatar reconstruction [Code](https://github.com/YuxuanSnow/Human3Diffusion/)
- **HumanSplat-NIPS** [arXiv:2406.12459](https://arxiv.org/abs/2406.12459) (NeurIPS 2024) — Single-image human GS with SMPL-guided Gaussian binding
- **ExpressiveGaussianHuman** [arXiv:2407.03204](https://arxiv.org/abs/2407.03204) (NeurIPS 2024) — Expression-coefficient-driven Gaussian deformation fields for expressive human avatars
- **GAGAvatar** [arXiv:2410.07971](https://arxiv.org/abs/2410.07971) (NeurIPS 2024) — Generalizable and animatable Gaussian head avatar from monocular video [Code](https://github.com/xg-chu/GAGAvatar)
- **HeadGaS** [arXiv:2312.02902](https://arxiv.org/abs/2312.02902) (ECCV 2024) — Dynamic head GS with blendshape-driven Gaussian deformation for real-time reenactment
- **GauHuman** [arXiv:2312.02973](https://arxiv.org/abs/2312.02973) (ECCV 2024) — Human-specific GS with SMPL-constrained Gaussian initialization and pose-aware densification
- **3DGS-Avatar** [arXiv:2312.09228](https://arxiv.org/abs/2312.09228) (CVPR 2024) — Deformable 3DGS for animatable human avatars with pose-conditioned Gaussian deformation [Code](https://github.com/mikeqzy/3DGS-Avatar)
- **SplatArmor** [arXiv:2311.10812](https://arxiv.org/abs/2311.10812) (CVPR 2024) — LBS-based articulated Gaussian Splatting for human body with twist-aware deformation
- **SplatPose** [arXiv:2503.05174](https://arxiv.org/abs/2503.05174) (CVPR 2025) — Pose-conditioned Gaussian Splatting for monocular human reconstruction
- **GaussianTalker** [arXiv:2412.09982](https://arxiv.org/abs/2412.09982) (CVPR 2025) — Audio-driven Gaussian talking head with facial prior and emotion control
- **SplatFace** [arXiv:2403.18784](https://arxiv.org/abs/2403.18784) (CVPR 2025) — Face-specific GS with identity-preserving Gaussian anchoring from single image
- **GaussianBody** [arXiv:2401.09720](https://arxiv.org/abs/2401.09720) (CVPR 2025) — SMPL-X aligned Gaussian body with part-aware densification
- **PiG-Avatar** [arXiv:2605.20185](https://arxiv.org/abs/2605.20185) (arXiv 2026) — Hierarchical neural-field-guided Gaussian avatars in volumetric canonical space decoupled from template topology; 3D barycentric anchor transport for kinematic coherence; emergent self-organization of anchor density
- **Latent Dynamics** [arXiv:2605.21478](https://arxiv.org/abs/2605.21478) (arXiv 2026) — Pose-driven 3DGS avatar with transformer decoder + dynamics residual latent; learned force decomposition (driving/restoring/dissipative) for temporally coherent clothing animation
- **SplatTalk** [arXiv:2503.06271](https://arxiv.org/abs/2503.06271) (CVPR 2025) — Audio-driven 3D talking face GS with emotion and style control
- **ArtMesh** [arXiv:2605.16582](https://arxiv.org/abs/2605.16582) (arXiv 2026) — Part-aware articulated mesh field: restricted Delaunay remeshing + bidirectional vertex-wise motion consistency for connected triangle mesh reconstruction; Articulate-100 benchmark
- **SDTalk** [arXiv:2605.09956](https://arxiv.org/abs/2605.09956) (arXiv 2026) -- Structured facial priors + dual-branch motion fields for Gaussian talking hea...
- **GaussianAvatar** (arXiv 2024) -- Pose-driven human body Gaussian representation
- **SplattingAvatar** (arXiv 2024) -- Expression-conditioned Gaussian deformation
- **ProgressiveAvatars** (SIGGRAPH 2026) -- Progressive animatable 3D Gaussian avatar generation
- **HairGPT** [arXiv:2605.08824](https://arxiv.org/abs/2605.08824) (SIGGRAPH 2026) -- Strand-as-Language autoregressive modeling for 3D hairstyle synthesis
- **D-Rex** [arXiv:2604.27871](https://arxiv.org/abs/2604.27871) (SIGGRAPH 2026) -- Diffusion post-process relighting for expressive avatars
- **HumanSplatHMR** [arXiv:2605.02784](https://arxiv.org/abs/2605.02784) (arXiv 2026) -- Joint pose refinement + Gaussian avatar optimization
- **High-Fidelity Human GS** [arXiv:2604.21714](https://arxiv.org/abs/2604.21714) (arXiv 2026) -- SMPL-X geometric priors + region-aware initialization
- **GAS** (arXiv 2024) -- Compression + caching for real-time avatar rendering

### Language / Semantic
- **OpenGaussian** [arXiv:2406.02058](https://arxiv.org/abs/2406.02058) (NeurIPS 2024) — Per-Gaussian feature distillation for point-level open-vocabulary 3D understanding
- **GS-LLM** [arXiv:2412.09176](https://arxiv.org/abs/2412.09176) (CVPR 2025) — LLM-guided GS for reasoning-driven 3D scene understanding and manipulation
- **OP2GS** [arXiv:2605.20044](https://arxiv.org/abs/2605.20044) (arXiv 2026) — Dual-opacity primitives: decoupled visual opacity σ + instance occupancy σ* for object-aware 3DGS; eliminates per-Gaussian feature storage
- **Ilov3Splat** [arXiv:2605.04506](https://arxiv.org/abs/2605.04506) (ICPR 2026) — Instance-level open-vocabulary 3DGS via multi-resolution hash embedding for CLIP features + SAM contrastive instance field; two-stage 3D clustering for natural language-driven 3D object retrieval (CSIRO)

### Large-Scale Methods
- **DOGS** [arXiv:2405.13943](https://arxiv.org/abs/2405.13943) (NeurIPS 2024) — Distributed GS with communication-efficient Gaussian consensus for large-scale reconstruction [Code](https://github.com/AIBluefisher/DOGS)
- **SCube** [arXiv:2410.20030](https://arxiv.org/abs/2410.20030) (NeurIPS 2024) — VoxSplats: voxelized splat with hierarchical LOD for large-scale streaming reconstruction [Code](https://github.com/nv-tlabs/SCube)
- **TideGS** [arXiv:2605.20150](https://arxiv.org/abs/2605.20150) (arXiv 2026) — Out-of-core training for 1B+ Gaussians via SSD-CPU-GPU hierarchy on single 24GB GPU
- **AnyCity** [arXiv:2605.19949](https://arxiv.org/abs/2605.19949) (arXiv 2026) — Observation-grounded generative reconstruction for sparse aerial urban scenes; observation-supported geometry latent + gated residual from diffusion prior
- **Octree-GS** (arXiv 2024) -- Octree spatial partitioning + LOD management
- **CityGaussian** [arXiv:2404.01133](https://arxiv.org/abs/2404.01133) (ECCV 2024) -- Hierarchical LOD for city-scale real-time rendering
- **BlitzGS** [arXiv:2605.13794](https://arxiv.org/abs/2605.13794) (arXiv 2026) -- Distributed 3DGS with parity-based GPU sharding + importance-scoring for city...
- **Scaffold-GS** [arXiv:2312.00109](https://arxiv.org/abs/2312.00109) (ICCV 2023) -- Anchor-based structure for efficient large-scale representation
- **Street Gaussians** [arXiv:2401.01339](https://arxiv.org/abs/2401.01339) (ECCV 2024) -- Static/dynamic decomposition for urban street scenes
- **GS4City** [arXiv:2604.11401](https://arxiv.org/abs/2604.11401) (arXiv 2026) -- Hierarchical semantic GS via city-model priors

### Material & Relighting Methods
- **Spec-Gaussian** [arXiv:2402.15870](https://arxiv.org/abs/2402.15870) (NeurIPS 2024) — Anisotropic Spherical Gaussians replacing SH for view-dependent specular appearance [Code](https://github.com/ingra14m/Specular-Gaussians)
- **NeuMA** [arXiv:2410.08257](https://arxiv.org/abs/2410.08257) (NeurIPS 2024) — Neural Material Adaptor replacing SH with physics-constrained material decomposition [Code](https://github.com/XJay18/NeuMA)
- **GStex** [arXiv:2409.12954](https://arxiv.org/abs/2409.12954) (ECCV 2024) — Texture-tiled Gaussians with UV-parameterized appearance for editable material and relighting
- **HumanGaussian** [arXiv:2311.17061](https://arxiv.org/abs/2311.17061) (CVPR 2024) — Enhanced shading with environment map estimation for indoor/outdoor relightable GS
- **GLUT** [arXiv:2605.19889](https://arxiv.org/abs/2605.19889) (arXiv 2026) — 3D Gaussian Lookup Table for continuous color transformation; replaces grid-based 3D LUT with learnable Gaussian primitives; compact conditional generator CGLUT for multi-style LUT blending; supports localized editing without global retraining
- **GaussianShader** [arXiv:2311.17977](https://arxiv.org/abs/2311.17977) (arXiv 2023) -- Shading functions for reflective/refractive surfaces
- **GRF** (arXiv 2024) -- Material decomposition + relighting in Gaussian space
- **SSD-GS** [arXiv:2604.13333](https://arxiv.org/abs/2604.13333) (ICLR 2026) -- Scattering and shadow decomposition for relightable 3DGS
- **Ambient-Robust IR** [arXiv:2605.30250](https://arxiv.org/abs/2605.30250) (arXiv 2026) -- Active RGB-NIR imaging for ambient-robust inverse rendering
- **Relit-LiVE** [arXiv:2605.06658](https://arxiv.org/abs/2605.06658) (SIGGRAPH 2026) -- Relight video by jointly learning environment video
- **VIRGi** [arXiv:2603.02986](https://arxiv.org/abs/2603.02986) (arXiv 2026) -- View-dependent instant recoloring with single edited image
- **Instant Colorization** [arXiv:2604.17155](https://arxiv.org/abs/2604.17155) (arXiv 2026) -- Visibility-weighted least squares for per-Gaussian colorization
- **GS-IR** (arXiv 2024) -- Inverse rendering: Gaussians → geometry + BRDF + lighting
- **LumiMotion** [arXiv:2604.10994](https://arxiv.org/abs/2604.10994) (CVPR 2026) -- Improving Gaussian relighting with scene dynamics

### Medical & Biomedical Imaging
- **R2-Gaussian** [arXiv:2405.20693](https://arxiv.org/abs/2405.20693) (NeurIPS 2024) — GS adapted for Radon transform + X-ray volume rendering for tomographic reconstruction [Code](https://github.com/Ruyi-Zha/r2_gaussian)
- **DDGS-CT** [arXiv:2406.02518](https://arxiv.org/abs/2406.02518) (NeurIPS 2024) — Direction-disentangled X-ray volume rendering with Gaussian acceleration for CT
- **EndoGS** [arXiv:2401.11535](https://arxiv.org/abs/2401.11535) (CVPR 2025) — Endoscopic scene reconstruction with GS for surgical navigation
- **EndoGSim** [arXiv:2605.16022](https://arxiv.org/abs/2605.16022) (MICCAI 2026) — MLLM-guided 4DGS + differentiable MPM for physics-aware endoscopic scene reconstruction and simulation
- **GaussianPile** [arXiv:2603.20611](https://arxiv.org/abs/2603.20611) (arXiv 2026（venue 待核实）) — Slice-based volumetric reconstruction via sparse 3DGS + imaging system-aware focus model; slice-aware piling strategy + differentiable PSF projection; 11x faster than NeRF, 16x compression over voxel grids; supports microscopy/ultrasound/MRI (中关村学院)

### Robustness & Regularization
- **DC-Gaussian** [arXiv:2405.17705](https://arxiv.org/abs/2405.17705) (NeurIPS 2024) — Reflection separation + degradation-aware training for reflective dashcam 3DGS [Code](https://github.com/linhanwang/DC-Gaussian)
- **LE3D** [arXiv:2406.06216](https://arxiv.org/abs/2406.06216) (NeurIPS 2024) — Low-light to HDR linear GS encoding + denoising for Lighting Every Darkness [Code](https://github.com/Srameo/LE3D)
- **Ev-GS** [arXiv:2407.11343](https://arxiv.org/abs/2407.11343) (CVPR 2024) — Event camera-integrated 3DGS for high-speed and HDR scene reconstruction
- **GS-Blur** [arXiv:2410.23658](https://arxiv.org/abs/2410.23658) (CVPR 2025) — Motion blur-aware GS training with blur kernel estimation for sharp reconstruction
- **GaussHDR** [arXiv:2503.10143](https://arxiv.org/abs/2503.10143) (CVPR 2025) — HDR-robust GS with exposure-aware Gaussian decomposition
- **HarmoGS** [arXiv:2605.13073](https://arxiv.org/abs/2605.13073) (arXiv 2026) — Conflict-aware gradient harmonization for in-the-wild 3DGS: semantic consistency-guided masking + dual-view gradient rotation + conflict-aware densification/pruning
- **FreeFix** [arXiv:2601.20857](https://arxiv.org/abs/2601.20857) (arXiv 2026) -- Fine-tuning-free diffusion guidance for extrapolated 3DGS
- **MarineSTD-GS** [arXiv:2604.23551](https://arxiv.org/abs/2604.23551) (arXiv 2025) -- Spatiotemporal underwater degradation modeling
- **PDF-GS** [arXiv:2604.12580](https://arxiv.org/abs/2604.12580) (arXiv 2026) -- Progressive distractor filtering for robust 3DGS
- **EnerGS** [arXiv:2604.26238](https://arxiv.org/abs/2604.26238) (arXiv 2026) -- Energy-based soft geometric guidance from LiDAR/depth priors
- **MERID-GS** [arXiv:2604.24053](https://arxiv.org/abs/2604.24053) (arXiv 2026) -- Retinex-based illumination/reflectance decoupling for low-light
- **ELoG-GS** [arXiv:2604.12592](https://arxiv.org/abs/2604.12592) (arXiv 2026) -- Dual-branch luminance-guided extreme low-light GS enhancement
- **ArtifactWorld** [arXiv:2604.12251](https://arxiv.org/abs/2604.12251) (arXiv 2026) -- Video generation models for 3DGS artifact restoration at scale
- **NRGS** [arXiv:2604.22439](https://arxiv.org/abs/2604.22439) (arXiv 2026) -- Neural regularization for semantic 3DGS
- **E2EGS** [arXiv:2603.14684](https://arxiv.org/abs/2603.14684) (CVPR 2026) -- Event-to-edge pose-free 3D reconstruction
- **Luminance-GS** [arXiv:2602.18322](https://arxiv.org/abs/2602.18322) (arXiv 2026) -- View-adaptive color/lightness correction for robust NVS
- **DualSplat** [arXiv:2604.21631](https://arxiv.org/abs/2604.21631) (CVPR 2026) -- Failure-to-Prior framework from reconstruction failures
- **WildGaussians** [arXiv:2407.08447](https://arxiv.org/abs/2407.08447) (NeurIPS 2024) -- Joint pose + 3DGS optimization from internet photos

### Degradation-Aware
- **NIRRGB-GS** (AISY 2026) — Near-infrared assisted low-light scene reconstruction and enhancement via Gaussian Splatting; multi-modal NIR+RGB fusion framework for dark场景 (Zhejiang Univ + XIOPM)

### SLAM
- **DG-SLAM** [arXiv:2411.08373](https://arxiv.org/abs/2411.08373) (NeurIPS 2024) — Dynamic Gaussian SLAM with hybrid pose optimization for dynamic environments [Code](https://github.com/fudan-zvg/DG-SLAM)
- **SplaTAM** [arXiv:2312.02126](https://arxiv.org/abs/2312.02126) (CVPR 2024) — First real-time GS-SLAM: online incremental Gaussians with silhouette mask for scene density, rendering-based pose optimization [Code](https://github.com/spla-tam/SplaTAM)
- **Photo-SLAM** [arXiv:2311.16728](https://arxiv.org/abs/2311.16728) (CVPR 2024) — Hyper primitives map with explicit geometric features for localization + implicit photometric features; runs on Jetson AGX Orin [Code](https://github.com/hjr37/Photo-SLAM)
- **SplatLoc** [arXiv:2409.14067](https://arxiv.org/abs/2409.14067) (CVPR 2025) — GS-based visual localization with Gaussian-anchored map representation
- **CoMapGS** [arXiv:2503.20998](https://arxiv.org/abs/2503.20998) (CVPR 2025) — Gaussian Splatting fusion for multi-session SLAM with submap alignment
- **ULF-Loc** (CVPR 2026 Highlight) — Unbiased landmark feature for robust visual localization with 3DGS; identifies alpha-compositing feature bias and replaces with geometry-weighted aggregation + keypoint consensus sampling
- **LiteLoc** [arXiv:2605.17777](https://arxiv.org/abs/2605.17777) (IEEE/CAA JAS 2026) — Color-free decoupled feature field for compact 3DGS localization: eliminates 94% redundant storage; condensing strategy distills matches to 5% for 19x speedup
- **SplitGS-Loc** [arXiv:2605.07351](https://arxiv.org/abs/2605.07351) (arXiv 2026) — Mixture-of-Gaussians splitting to disambiguate 2D-3D correspondences in GS feature fields; no per-scene training needed
- **Flow4DGS-SLAM** [arXiv:2604.22339](https://arxiv.org/abs/2604.22339) (CVPR 2026) — Optical flow-guided 4D Gaussian SLAM for dynamic scenes; category-agnostic motion mask via ego-motion decomposition; GMM temporal opacity/rotation; flow-guided camera pose initialization (NUS)
- **GGD-SLAM** [arXiv:2604.12837](https://arxiv.org/abs/2604.12837) (ICRA 2026) — Generalizable motion model for monocular 3DGS SLAM in dynamic environments; FIFO queue + sequential attention for dynamic semantic extraction; no semantic labels or depth input required; anti-interference SSIM loss

### Security
- **GS-Hider** [arXiv:2405.15118](https://arxiv.org/abs/2405.15118) (NeurIPS 2024) — Steganography embedding into Gaussian parameters for 3D message hiding, visually lossless
- **GeometryCloak** [arXiv:2410.22705](https://arxiv.org/abs/2410.22705) (NeurIPS 2024) — Geometric perturbation copyright watermark embedding into Gaussians preventing TGS-based 3D reconstruction [Code](https://github.com/qsong2001/Geometry-Cloak)
- **GaussianMarker** [arXiv:2410.23718](https://arxiv.org/abs/2410.23718) (NeurIPS 2024) — Uncertainty-aware watermark embedding + robust extraction for 3DGS copyright protection
- **3DEditSafe** [arXiv:2605.15398](https://arxiv.org/abs/2605.15398) — First safety-regularized 3D editing framework constraining NSFW semantic propagation; 3D safety regularization + safe semantic projection + residue suppression
- **GuardMarkGS** [arXiv:2605.12919](https://arxiv.org/abs/2605.12919) (arXiv 2026) -- First unified watermarking + edit deterrence framework for 3DGS copyright pro...

### Simulation & Robotics
- **GIC** [arXiv:2406.14927](https://arxiv.org/abs/2406.14927) (NeurIPS 2024) — Gaussian-Informed Continuum for physical property identification and differentiable simulation [Code](https://github.com/Jukgei/gic)
- **GaussNav** [arXiv:2403.11625](https://arxiv.org/abs/2403.11625) (CVPR 2024) — GS-based navigation with language-guided semantic Gaussian maps for embodied agents
- **SplatSim** [arXiv:2409.10161](https://arxiv.org/abs/2409.10161) (CVPR 2025) — GS-based sim-to-real transfer for robotic manipulation with photorealistic rendering
- **GS-Physics** [arXiv:2409.08042](https://arxiv.org/abs/2409.08042) (CVPR 2025) — Physics-integrated GS with differentiable simulation for rigid/soft body dynamics
- **Splat-Nav** [arXiv:2403.02751](https://arxiv.org/abs/2403.02751) (CVPR 2025) — GS-based navigation with Gaussian-anchored topological maps
- **FLUIDSPLAT** [arXiv:2605.18866](https://arxiv.org/abs/2605.18866) (arXiv 2026) — Physical flow field reconstruction via anisotropic GS partition-of-unity; proven O(K^{-s/d}) Sobolev approximation rate
- **FreeMoCap** (arXiv 2024) -- Open-source markerless motion capture from webcams (AGPL-3.0, 8.3k stars); dr...
- **GSMem** [arXiv:2603.19137](https://arxiv.org/abs/2603.19137) (arXiv 2026) -- 3DGS as persistent spatial memory for zero-shot embodied exploration and reas...
- **GS-Playground** [arXiv:2604.25459](https://arxiv.org/abs/2604.25459) (RSS 2026) -- Batch 3DGS + parallel physics at 10^4 FPS for robot learning
- **GaussianGrasper** [arXiv:2403.09637](https://arxiv.org/abs/2403.09637) (T-RO 2024) -- 3D language GS for open-vocabulary robotic grasping via efficient feature dis...
- **Forecast-GS** [arXiv:2605.11144](https://arxiv.org/abs/2605.11144) (arXiv 2026) -- Predictive 3D Gaussian representation forecasting task-completed states for r...
- **GraspSplats** [arXiv:2409.02084](https://arxiv.org/abs/2409.02084) (CoRL 2024) -- Efficient zero-shot manipulation with 3D feature splatting; demonstrates NeRF...
- **Real2Sim** [arXiv:2605.13591](https://arxiv.org/abs/2605.13591) (arXiv 2026) -- 4DGS + differentiable MPM solver for physics-aware autonomous driving simulation
- **TAIL-Safe** [arXiv:2605.01195](https://arxiv.org/abs/2605.01195) (arXiv 2026) -- Safety monitoring for IL policies using 3DGS digital twin
- **GS-Surrogate** [arXiv:2604.06358](https://arxiv.org/abs/2604.06358) (arXiv 2026) -- Deformable GS surrogate for ensemble simulation exploration
- **ManiGaussian** [arXiv:2403.08321](https://arxiv.org/abs/2403.08321) (ECCV 2024) -- Dynamic GS for multi-task robotic manipulation via Gaussian world model predi...
- **VR-Robo** [arXiv:2502.01536](https://arxiv.org/abs/2502.01536) (RAL 2025) -- Real-to-Sim-to-Real framework for visual robot navigation and locomotion via ...

### Surface & Geometry Methods
- **GSDF** [arXiv:2403.16964](https://arxiv.org/abs/2403.16964) (NeurIPS 2024) — Dual representation: GS guides SDF geometry, SDF provides normal regularization for GS [Code](https://github.com/city-super/GSDF)
- **VCR-GauS** [arXiv:2406.05774](https://arxiv.org/abs/2406.05774) (NeurIPS 2024) — View-consistent depth-normal regularization for GS surface reconstruction [Code](https://github.com/HLinChen/VCR-GauS)
- **GVKF** [arXiv:2411.01853](https://arxiv.org/abs/2411.01853) (NeurIPS 2024) — Gaussian Voxel Kernel Functions for highly efficient surface reconstruction via TSDF fusion
- **GOF** [arXiv:2312.13299](https://arxiv.org/abs/2312.13299) (ECCV 2024) — Gaussian Opacity Field: opacity-weighted TSDF fusion for high-fidelity surface extraction from GS [Code](https://github.com/Janotor/GOF)
- **SAGS** [arXiv:2510.27318](https://arxiv.org/abs/2510.27318) (ECCV 2024) — Shape-aware GS: shape priors guiding Gaussian distribution for anatomically faithful reconstruction
- **NeuSG** [arXiv:2312.00846](https://arxiv.org/abs/2312.00846) (CVPR 2024) — Neural surface-guided GS: SDF-guided Gaussian anchoring for consistent surface reconstruction
- **SuperGS** [arXiv:2410.02571](https://arxiv.org/abs/2410.02571) (CVPR 2024) — Super-resolution guided GS: using 2D SR priors to enhance 3DGS rendering quality
- **TriGS** [arXiv:2312.13102](https://arxiv.org/abs/2312.13102) (CVPR 2024) — Tri-plane augmented Gaussian Splatting: tri-plane features + Gaussian geometry for hybrid representation
- **GS2Mesh** [arXiv:2404.01810](https://arxiv.org/abs/2404.01810) (CVPR 2024) — Surface-regularized GS → mesh extraction with multi-view depth consistency constraints
- **GSurf** [arXiv:2411.15723](https://arxiv.org/abs/2411.15723) (CVPR 2024) — Gaussian surface reconstruction with SDF-GS hybrid representation for watertight meshes
- **GS-Manifold** [arXiv:编号待核实] (CVPR 2025) — Manifold-constrained Gaussians for surface reconstruction with topological guarantees
- **AmbiSuR** [arXiv:2605.12494](https://arxiv.org/abs/2605.12494) (ICML 2026) — Photometric ambiguity self-indication via SH in 3DGS; primitive truncation + ray-color consistency for intrinsic disambiguation (Beihang + NUS)
- **PAGaS** [arXiv:2604.22129](https://arxiv.org/abs/2604.22129) (arXiv 2026) -- Pixel-aligned 1DoF Gaussians for depth refinement
- **SVGS** [arXiv:2411.18966](https://arxiv.org/abs/2411.18966) (arXiv 2024) -- Spatially varying colors + opacity within each Gaussian primitive; three desi...
- **NegGS** [arXiv:2405.18163](https://arxiv.org/abs/2405.18163) (arXiv 2024) -- Negative color values for ring/crescent/non-convex structures
- **2DGS** [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) (SIGGRAPH 2024) -- Oriented 2D disks for geometrically accurate radiance fields
- **P2M++** [arXiv:2605.00429](https://arxiv.org/abs/2605.00429) (arXiv 2026) -- Enhanced solver for point-to-mesh distance queries
- **SparseOIT** [arXiv:2605.13855](https://arxiv.org/abs/2605.13855) (arXiv 2026) -- Order-independent transparency via active set method for glass/refractive scenes
- **DySurface** [arXiv:2605.10360](https://arxiv.org/abs/2605.10360) (arXiv 2026) -- Bridges explicit Gaussians and implicit SDF for consistent 4D surface reconst...
- **3DSS** [arXiv:2605.05876](https://arxiv.org/abs/2605.05876) (arXiv 2026) -- First differentiable surface splatting renderer for PBR inverse rendering wit...
- **PointSplat** [arXiv:2604.09903](https://arxiv.org/abs/2604.09903) (arXiv 2026) -- Geometry-driven pruning + Transformer refinement for efficient 3DGS
- **2D-SuGaR** [arXiv:2605.00569](https://arxiv.org/abs/2605.00569) (Eurographics 2026) -- 2DGS enhanced with monocular depth/normal priors
- **SuGaR** [arXiv:2311.12775](https://arxiv.org/abs/2311.12775) (CVPR 2024) -- Surface-aligned Gaussians for mesh extraction via TSDF + Marching Cubes
- **SAND** (SIGGRAPH 2026) -- Spatially adaptive network depth for efficient neural implicit surface sampling
- **PGSR** [arXiv:2406.06521](https://arxiv.org/abs/2406.06521) (TVCG 2024) -- Planar-based regularizer for high-fidelity surface reconstruction
- **GLINT** [arXiv:2603.26181](https://arxiv.org/abs/2603.26181) (arXiv 2026) -- Scene-scale transparency via decomposed Gaussian radiance transport for glass
- **View-Dependent Splatting** [arXiv:2605.25426](https://arxiv.org/abs/2605.25426) (SIGGRAPH 2026) -- Learned view-dependent splatting kernels replacing fixed covariance; first fund...
- **Neural Gabor Splatting** [arXiv:2604.15941](https://arxiv.org/abs/2604.15941) (CVPR 2026) -- Neural Gabor augmentation per Gaussian + frequency-aware densification for hi...
- **LeanGaussian** (CVPR 2025) -- Extreme compression from single RGB image for efficient large-scale rendering

### Surveys & Benchmarks

### Training & Optimization
- **3DGS-Enhancer** [arXiv:2410.16266](https://arxiv.org/abs/2410.16266) (NeurIPS 2024) — 2D diffusion priors guiding iterative 3DGS refinement for view-consistent enhancement [Code](https://github.com/xiliu8006/3DGS-Enhancer)
- **GS-PT** [arXiv:2403.11324](https://arxiv.org/abs/2403.11324) (ECCV 2024) — Gaussian Splatting pre-training: self-supervised representation learning for Gaussian initialization
- **SplatFields** [arXiv:2409.11211](https://arxiv.org/abs/2409.11211) (ECCV 2024) — Implicit neural field regularization on splat features for sparse-view 3D/4D reconstruction
- **GaussianSR** [arXiv:2403.01444](https://arxiv.org/abs/2403.01444) (CVPR 2024) — 2D super-resolution diffusion prior guiding 3DGS iterative refinement for high-quality rendering
- **GaussianPretrain** [arXiv:2411.12452](https://arxiv.org/abs/2411.12452) (CVPR 2024) — Self-supervised pre-training for Gaussian initialization from multi-view features
- **Learn2Splat** [arXiv:2605.15760](https://arxiv.org/abs/2605.15760) — Meta-learned optimizer for 3DGS via checkpoint buffer + optimizer rollout; extends optimization horizon without degradation; zero-shot generalization (Geiger group)
- **ReorgGS** [arXiv:2605.08739](https://arxiv.org/abs/2605.08739) (arXiv 2026) — Equivalent distribution reorganization fixing parameterization degeneration in converged 3DGS; kNN anisotropic covariance re-estimation
- **LeGS** [arXiv:2605.04081](https://arxiv.org/abs/2605.04081) (arXiv 2026) — Beyond heuristics: learnable density control replacing hand-crafted clone/split/prune rules for 3DGS; RL-based adaptive densification
- **CAdam** [arXiv:2605.20872](https://arxiv.org/abs/2605.20872) (SIGGRAPH 2026) — Context-Adaptive Moment Estimation for 3DGS densification in generative distillation; first moment interference principle separates signal from noise; 85-97% Gaussian reduction (Chung et al.)
- **ConFi-GS** [arXiv:2605.24964](https://arxiv.org/abs/2605.24964) (arXiv 2026) — Confidence-guided high-frequency injection + reliability-aware densification for 3DGS super-resolution from low-res inputs (Jiaxiang Li et al.)
- **Denoising-GS** [arXiv:2605.14880](https://arxiv.org/abs/2605.14880) (arXiv 2026) -- Formulates 3DGS optimization as primitive denoising; spatial gradient denoisi...
- **GEMM-GS** [arXiv:2604.02120](https://arxiv.org/abs/2604.02120) (arXiv 2026) -- GEMM-compatible blending for Tensor Core utilization, 1.42x speedup
- **Hybrid-Capture Two-View Training** [arXiv:2605.00052](https://arxiv.org/abs/2605.00052) (arXiv 2026) -- Two-view-per-step as dominant training lever
- **YOGO** [arXiv:2604.21400](https://arxiv.org/abs/2604.21400) (arXiv 2026) -- Budget-aware equilibrium for ultra-dense scene control
- **AV1-3DGS** [arXiv:2605.14629](https://arxiv.org/abs/2605.14629) (arXiv 2026) -- AV1 motion vectors for dense SfM matching with 63% training time reduction
- **Structure-Aware Densification** [arXiv:2604.28016](https://arxiv.org/abs/2604.28016) (SIGGRAPH 2026) -- Frequency-aware anisotropic split replacing heuristic clone/split
- **Faster-GS** (CVPR 2026) -- Systematic benchmark separating engineering from algorithmic acceleration
- **VkSplat** [arXiv:2605.00219](https://arxiv.org/abs/2605.00219) (arXiv 2026) -- Vulkan-based 3DGS training, 3.3x faster, 33% less VRAM
- **AdpSplit** [arXiv:2605.06876](https://arxiv.org/abs/2605.06876) (arXiv 2026) -- Error-driven adaptive split operator replacing heuristic binary split; 9.2-22...
- **AdaGScale** [arXiv:2604.18980](https://arxiv.org/abs/2604.18980) (arXiv 2026) -- Viewpoint-adaptive Gaussian scaling reducing gaussian-tile pairs for renderin...

### Acceleration
- **TensorGS** [arXiv:2605.17855](https://arxiv.org/abs/2605.17855) (arXiv 2026) — Tensor Core acceleration for 3DGS: tensorizes rasterization into FP16 matrix operations with cross-tile grouping; 1.65x end-to-end speedup with negligible quality loss
- **3DGS³** (arXiv 2026) -- Joint super sampling and frame interpolation for real-time large-scale 3DGS


### New Papers Added May 27, 2026

#### Compression

#### Cross-Domain
- **Sensor2Sensor** [arXiv:2605.22809](https://arxiv.org/abs/2605.22809) (CVPR 2026) — Cross-embodiment sensor conversion via 4DGS; translates dashcam to AV sensor suite using diffusion (Jiahao Wang et al.)

#### Dynamic
- **R5DGS** [arXiv:2605.25909](https://arxiv.org/abs/2605.25909) (arXiv 2026) — Identity Encoding + rigid-body centroid constraint for semantic-aware 4DGS; CLIP-based object lookup; 11 FPS speedup (Denis Gridusov et al.)
- **RiGS** [arXiv:2605.23672](https://arxiv.org/abs/2605.23672) (arXiv 2026) — Static/rigid/transient Gaussian decomposition + scene flow guidance for monocular 4DGS (Chenyu Wu et al.)

#### Editing
- **BEA-GS** [arXiv:2605.09662](https://arxiv.org/abs/2605.09662) (CVPR 2026 Highlight) — Visible boundary + non-visible extraction losses for near-perfect object extraction from 3DGS (Alessio Mazzucchelli et al.)
- **RoVES** [arXiv:2605.25373](https://arxiv.org/abs/2605.25373) (arXiv 2026) — Physics-aware road geometry insertion + 4-DOF vehicle dynamics for driving scene editing; 6.24s pipeline (Feng Zhou et al.)

#### Feed-Forward
- **ArtSplat** [arXiv:2605.24304](https://arxiv.org/abs/2605.24304) (arXiv 2026) — First feed-forward articulated 3DGS; per-pixel joint map + Cross-State Attention; 400x faster than optimization (Inseo Lee et al.)
- **TriSplat** [arXiv:2605.26115](https://arxiv.org/abs/2605.26115) (arXiv 2026) — Triangle primitives replace Gaussians; simulation-ready mesh export from single forward pass (Weijie Wang et al.)
- **LangFlash** [arXiv:2605.23287](https://arxiv.org/abs/2605.23287) (CVPR Findings 2026) — Sparse semantic encoding (global dict + local weights) for feed-forward 3D language GS from unposed images (Yilong Liu et al.)
- **NoPo4D** [arXiv:2605.22190](https://arxiv.org/abs/2605.22190) (arXiv 2026) — Feed-forward dynamic Gaussians from unposed multi-view videos; velocity decomposition + bidirectional motion (Matteo Balice et al.)
- **ForeSplat** [arXiv:2605.22020](https://arxiv.org/abs/2605.22020) (arXiv 2026) — MetaGrad meta-gradient training makes feed-forward 3DGS output optimizer-friendly initializations (Yuke Li et al.)
- **TokenGS** [arXiv:2604.15239](https://arxiv.org/abs/2604.15239) (arXiv 2026) — Encoder-decoder with learnable Gaussian tokens unbinds primitive count from input resolution (Jiawei Ren et al.)

#### Human / Avatar
- **COSY** [arXiv:2605.24114](https://arxiv.org/abs/2605.24114) (arXiv 2026) — Compositional GAN generates hair/skin/glasses/torso independently for disentangled head editing (Florian Barthel et al.)
- **SplitAvatar** [arXiv:2605.25751](https://arxiv.org/abs/2605.25751) (arXiv 2026) — Autoregressive Gaussian splitting via GNN for one-shot head avatar with progressive detail (Hongzhe Liao et al.)

#### Material / Relighting
- **F-RNG** [arXiv:2605.25975](https://arxiv.org/abs/2605.25975) (arXiv 2026) — Feed-forward relightable 3DGS via LRM + IDM priors; ~25x faster than SOTA relighting (Guangming Fu et al.)

#### Geometry / Surface
- **VoxelGS** [arXiv:2605.26616](https://arxiv.org/abs/2605.26616) (arXiv 2026) — Scaffold-anchored Gaussians tethered to voxelized SDF for fast monocular surface reconstruction (Zhenhua Du et al.)

#### Rendering
- **DP-GES** [arXiv:2605.25345](https://arxiv.org/abs/2605.25345) (arXiv 2026) — Depth Peeling enables sort-free Gaussian-Enhanced Surfel rendering with correct transmittance (Keyang Ye et al.)

#### Language / Semantic
- **TrackRef3D** [arXiv:2605.26576](https://arxiv.org/abs/2605.26576) (arXiv 2026) — Track-then-label paradigm with TSCM for open-world referring segmentation in 3DGS (Yuyang Tan et al.)

#### Security
- **4D-GSW** [arXiv:2605.22342](https://arxiv.org/abs/2605.22342) (arXiv 2026) — Kinematic-aware watermarking via STC metric + HMM-MRF energy for spatio-temporal consistency in 4DGS (Sifan Zhou et al.)

#### Degradation-Aware
- **DelowlightSplat** [arXiv:2605.26629](https://arxiv.org/abs/2605.26629) (arXiv 2026) — Lowlight Adapter + cost-volume inference predicts clean Gaussians from degraded inputs (Fuzhen Jiang et al.)
- **Underwater360** [arXiv:2605.26447](https://arxiv.org/abs/2605.26447) (arXiv 2026) — Omnidirectional GS + physics-based appearance-medium decoupling for underwater panoramic scenes (Jiangbei Hu et al.)
- **GlowGS** [arXiv:2605.23602](https://arxiv.org/abs/2605.23602) (CVPR Findings 2026) — Diffusion + VFM semantic feature bank for nighttime glow scene reconstruction (Beibei Lin et al.)

#### Training / Optimization
- **TWINGS** [arXiv:2605.22069](https://arxiv.org/abs/2605.22069) (CVPR 2026) — Thin Plate Splines warp-aligned initialization for sparse-view 3DGS; TPS aligns backprojected points with triangulated 3D control points (Hyeseong Kim et al.)
- **PocketGS** [arXiv:2601.17354](https://arxiv.org/abs/2601.17354) (arXiv 2026) — On-device 3DGS training for mobile; geometry-faithful priors + anisotropic seeding + cached alpha compositing for stable mobile backprop (Wenzhi Guo et al.)

#### Feed-Forward
- **IDESplat** [arXiv:2601.03824](https://arxiv.org/abs/2601.03824) (CVPR 2026) — Iterative depth probability estimation for generalizable 3DGS; refines depth via multi-iteration probability updates (Wei Cao et al.)

#### Dynamic

#### Autonomous Driving
- **FRUC** [arXiv:2605.29997](https://arxiv.org/abs/2605.29997) (arXiv 2026) — Feed-forward 3DGS for dynamic scene reconstruction from uncalibrated collaborative driving views; ego-centric causal occlusion field + zero-initialized injection (Yihang Tao et al.)
- **DeGO** [arXiv:2605.28587](https://arxiv.org/abs/2605.28587) (CVPR 2026) — Deformable Gaussian occupancy decoupling rigid and non-rigid motion with factorized 4D VGGT distillation; 13.5% gains on human-centric instances (Yang Gao et al.)

#### Language / Semantic
- **DGSG-Mind** [arXiv:2605.29879](https://arxiv.org/abs/2605.29879) (arXiv 2026) — Dynamic 3D Gaussian scene graphs with probabilistic voxel grid + 3D Gaussian Mind for embodied multimodal reasoning; best zero-shot 3DVG on self-reconstructed maps (Luzhou Ge et al.)
- **X-GS** [arXiv:2603.09632](https://arxiv.org/abs/2603.09632) (arXiv 2026) — Extensible GS framework: X-GS-Perceiver for online SLAM + semantic distillation, X-GS-Thinker for multimodal downstream tasks (Yueen Ma et al.)

#### Security
- **BitC-3DGS** [arXiv:2605.29583](https://arxiv.org/abs/2605.29583) (arXiv 2026) — High-capacity 3DGS watermarking via bit compression; 128-bit messages with dual-branch chunk decompression + hard-message sampling (Yuquan Bi et al.)

#### Material / Relighting
- **SRUG** [arXiv:2605.24700](https://arxiv.org/abs/2605.24700) (arXiv 2026) — Shadow-guided relightable urban scene with generation model; shadow-guided 3D completion + iterative material decomposition via LMM (Yonghao Zhao et al.)

#### Degradation-Aware
- **TDg** [arXiv:2605.30328](https://arxiv.org/abs/2605.30328) (ISPRS 2026) — Thermal-to-Depth GS using only thermal images + depth estimation; removes RGB reliance; 55% training time reduction (Manoj Biswanath et al.)

#### Scene Understanding / Assessment
- **Aes3D** [arXiv:2605.05155](https://arxiv.org/abs/2605.05155) (arXiv 2026) — First aesthetic assessment framework for 3DGS scenes; Aesthetic3D dataset + Aes3DGSNet that predicts scores directly from Gaussian primitives (Chuanzhi Xu et al.)

#### Simulation / Physics
- **FreeForm** [arXiv:2605.29318](https://arxiv.org/abs/2605.29318) (CVPR 2026) — Reduced-order deformable simulation from particle-based skinning eigenmodes; supports Gaussian splats as input; 40x faster than neural fields (Donglai Xiang et al.)
- **PhyGenHOI** [arXiv:2605.30268](https://arxiv.org/abs/2605.30268) (arXiv 2026) — Physically-aware 4D HOI generation; MDM + MPM + 3DGS unified representation; windowed attraction + contact-driven re-simulation (Omer Benishu et al.)
- **MonoPhysics** [arXiv:2605.30320](https://arxiv.org/abs/2605.30320) (arXiv 2026) — Monocular inverse physics using differentiable MPM + 3DGS; three visual-physical bridges for joint geometry/appearance/physics (Daniel Rho et al.)

#### Active Mapping / SLAM
- **GAVIS** [arXiv:2605.30342](https://arxiv.org/abs/2605.30342) (CVPR 2026) — Uncertainty-driven 3DGS active mapping via anisotropic visibility field (spherical harmonics); Bayesian Network rasterizer at 200 FPS (Shangjie Xue et al.)

#### Style Transfer
- **DS-StyleGaussian** [arXiv:2605.30065](https://arxiv.org/abs/2605.30065) (IEEE IVMSP 2026) — Data-sufficient zero-shot 3D style transfer via feature Gaussian splatting + deferred stylization with 2D pre-trained decoder (Xin Dong et al.)

#### Medical / Cross-Domain
- **NAB-GS** [arXiv:2508.15151](https://arxiv.org/abs/2508.15151) (MICCAI 2026) — Negative Alpha Blending for zero-shot CT super-resolution; models positive/negative Gaussian densities for signed residuals (Jeonghyun Noh et al.)

#### Weather / Environment Editing
- **WeatherCity** [arXiv:2602.22096](https://arxiv.org/abs/2602.22096) (arXiv 2026) — Weather Gaussian representation for 4D urban scene weather editing; shared scene features + weather-specific decoders + physics-driven particle simulation (Wenhua Wu et al.)

#### 4D Object Dynamics
- **NeuROK** [arXiv:2605.30347](https://arxiv.org/abs/2605.30347) (CVPR 2026) — Generative 4D Neural Object Kinematics; learns latent kinematic state parameterization + decoder for simulative dynamics from Lagrangian mechanics (Chen Geng et al.)

#### Large-Scale / City-Scale
- **City-Mesh3R** [arXiv:2605.30310](https://arxiv.org/abs/2605.30310) (CVPR 2026 USM3D Workshop, Oral) — End-to-end images-to-mesh city-scale reconstruction with divide-and-conquer; produces watertight simulation-ready meshes (Sayan Paul et al.)

#### Novel View Synthesis (Non-GS Baseline)
- **DVSM** [arXiv:2605.29891](https://arxiv.org/abs/2605.29891) (arXiv 2026) — Decoder-only view synthesis model; shared reconstruction/rendering weights; SOTA on NVS, in some cases outperforms per-scene-optimized 3DGS under dense views (Cheng Sun et al.)

### Feed-Forward / Generalizable (New)
- **DéjàView** [arXiv:2605.30215](https://arxiv.org/abs/2605.30215) (arXiv 2026) — Looped transformer block applied recurrently for K steps; exposes K as inference-time compute knob; matches larger baselines with fraction of parameters on 5 reconstruction benchmarks (Alessandro Burzio et al.)
- **HeadsUp** [arXiv:2605.04035](https://arxiv.org/abs/2605.04035) (Apple, ECCV 2026) — UV-parameterized 3D Gaussian representation decoupling Gaussian count from input resolution; trained on 10,000+ subjects for feed-forward 3D Gaussian head reconstruction (Evangelos Ntavelis, Sean Wu et al.)

### Human / Avatar (New)
- **Multi-view Consistent 3D Gaussian Head Avatars** [arXiv:2605.25220](https://arxiv.org/abs/2605.25220) (CVPR 2026) — Achieves multi-view consistent 3D Gaussian head avatars without requiring multi-view generation; single-view input to 3D Gaussian head (Aviral Chharia, Fernando De la Torre)
- **CapTalk** [arXiv:2605.29316](https://arxiv.org/abs/2605.29316) (arXiv 2026) — Text-guided stylization and speech-driven 3D head animation; separate control over style and emotion; dynamic emotion during inference (Xuangeng Chu et al.)

### Rendering (New)

### Simulation (New)

### Surface / Reconstruction (New)
- **CLEAR-NeRF** [arXiv:2605.28125](https://arxiv.org/abs/2605.28125) (arXiv 2026) — Collinearity and local-region enhanced accurate 3D reconstruction in unbounded scenes via geometric regularization (Vladislav Polianskii et al.)
- **DinoComplete** [arXiv:2605.26949](https://arxiv.org/abs/2605.26949) (arXiv 2026) — 3D Shape Completion with distilled semantic priors and state space models; DINOv2 distillation for partial shape completion (Furkan Mert Algan, Eckehard Steinbach)

### Semantic / Segmentation (New)
- **Gaga** (TMLR 2026) — Group Any Gaussians via 3D-aware Memory Bank; leverages inconsistent 2D masks from zero-shot segmentation models; 3D-aware memory bank for robust cross-pose mask association (Weijie Lyu et al.)

### Cross-Domain / Large-Scale (New)
- **SurfFill** [arXiv:2512.03010](https://arxiv.org/abs/2512.03010) (arXiv 2026) — LiDAR point cloud completion via Gaussian surfel splatting; ambiguity heuristic for LiDAR beam divergence artifacts; divide-and-conquer for building-sized completion (Svenja Strobel et al.)

### Material / Relighting (New)

### Generation / CAD (New)
- **AnySurf** [arXiv:2605.26149](https://arxiv.org/abs/2605.26149) (arXiv 2026) — Any surface generation with directed edge; learns to generate diverse 3D surfaces from conditions (Wenda Shi et al.)
- **AssetGen** [arXiv:2605.26137](https://arxiv.org/abs/2605.26137) (arXiv 2026) — Deployable 3D asset generation at interactive speed; feed-forward texture+geometry generation for real-time 3D asset creation (Dilin Wang et al.)

### World Models & Spatial Intelligence
_3DGS as world model primitive, differentiable simulation engine, or spatial intelligence representation_
- **GWM** [arXiv:2508.17600](https://arxiv.org/abs/2508.17600) (2025) — Gaussian World Model: 3DGS as environment dynamics modeling primitive with autoregressive future state prediction for interactive world simulation
- **FlashWorld** [arXiv:2510.13678](https://arxiv.org/abs/2510.13678) (2025) — Feed-forward 3DGS world model: single forward pass generates dynamic 3D scenes with real-time interaction, bridging video generation and 3D reconstruction
- **RAD** [arXiv:2506.xxxxx](https://arxiv.org/abs/2506.xxxxx) (NeurIPS 2025) — Large-scale 3DGS-based Reinforcement Learning for end-to-end driving: 3DGS twin digital world + closed-loop RL training overcoming IL causal confusion
- **DLWM** (CVPR 2026) — Dual Latent World Model: 3DGS-centric self-supervised pretraining framework for autonomous driving via two-stage Gaussian-based world modeling
- **GS-World** (arXiv 2025) — World model generative simulation + Engine-driven Sim2Real VLA unified paradigm: 3DGS as differentiable, physically consistent simulation engine for robot skill learning
- **Visionary** [arXiv:2512.08478](https://arxiv.org/abs/2512.08478) (2025) — WebGPU + 3DGS world model carrier: first Web-native platform supporting 4DGS, neural avatars, and generative post-processing in real-time via WebGPU + ONNX Runtime
- **X-World** (2026) — Controllable multi-view generative world model (video diffusion + 3DGS simulation) for autonomous driving (XPeng)

### New Papers Added June 2, 2026

#### Acceleration / Rendering Architecture
- **HiGS** [arXiv:2606.00352](https://arxiv.org/abs/2606.00352) (NVIDIA, arXiv 2026) — Hierarchically Tiled Gaussian Splatting: decouples partitioning (coarse macro-tiles) from rasterization (fine render tiles); up to 15.8x faster than original 3DGS while preserving exact front-to-back alpha compositing (Dawid Pająk, Martin Bisson, Rodolfo Lima)
- **DDF-GS** [arXiv:2606.00817](https://arxiv.org/abs/2606.00817) (arXiv 2026) — Directed Distance Fields for constant-time ray queries on 3DGS scenes; 52MB neural field distilled from trained 3DGS; 26-72x faster than SDF sphere tracing; supports global illumination secondary rays at 30.3 dB shadow / 21.3 dB AO fidelity [Code](https://github.com/smlab-niser/ddf-gs) (Subhankar Mishra)

#### Compression / Pruning
- **VEDAL** [arXiv:2606.02346](https://arxiv.org/abs/2606.02346) (arXiv 2026（venue 待核实）) — Variational free energy minimization for 3DGS pruning; prediction-error gating triggers asynchronous pruning + variational uncertainty head models pruning as latent variable with learnable prior; 5.2x compression with only 0.31 dB PSNR drop; 185 FPS (Aoduo Li et al.)
- **DSD-GS** [arXiv:2605.30863](https://arxiv.org/abs/2605.30863) (arXiv 2026) — Dynamic-Static Decomposition via feed-forward GS encoder + optical flow; static regions skip redundant computation; 10 min training on Neural 3D; 700+ FPS on RTX 5090@1352x1014; no COLMAP required

#### Feed-Forward / Reconstruction
- **DeblurNVS** [arXiv:2606.01315](https://arxiv.org/abs/2606.01315) (arXiv 2026) — First feed-forward NVS from sparse motion-blurred images without per-scene optimization; recovers intermediate geometry for multi-view reasoning; constructs DL3DV-10K-based motion blur NVS dataset [Code](https://github.com/PKU-YuanGroup/DeblurNVS) (Changyue Shi et al.)

#### SLAM
- **Triangle Splatting SLAM** [arXiv:2605.31419](https://arxiv.org/abs/2605.31419) (arXiv 2026) — First dense RGB-D SLAM with differentiable triangles as 3D map representation; Delaunay triangulation converts triangle soup to connected mesh online; supports mesh deformation and collision detection; outperforms baselines on Replica/TUM-RGBD

#### Dynamic / 4DGS
- **WebSpline** [arXiv:2606.02096](https://arxiv.org/abs/2606.02096) (arXiv 2026) — Structure-Informed Spline (learnable Hermite spline) models Gaussian trajectories + Structural Proxy Graph organizes motion; SOTA on iPhone dataset, 10x faster than WorldTree (Jongmin Park et al.)
- **TIDES** [arXiv:2606.02058](https://arxiv.org/abs/2606.02058) (arXiv 2026) — Continuous-time event camera simulator from dynamic Gaussian Splatting; derives per-pixel intensity dynamics from scene model (not frame differencing); multi-threshold crossing + adaptive time-stepping + tile-level bandwidth modeling (Christopher Thirgood et al.)
- **MORPHOS** [arXiv:2606.02491](https://arxiv.org/abs/2606.02491) (arXiv 2026) — Autoregressive 4D generation with Temporal Structured Latents (T-SLAT) unifying mesh/Gaussian/radiance field; causal attention ensures temporal consistency + handles topology changes (Minkyung Kwon et al.)
- **MRO-GWM** [arXiv:2606.01950](https://arxiv.org/abs/2606.01950) (arXiv 2026) — Object-centric Gaussian world model for rigid bodies; canonical Gaussian + spatio-temporal transformer predicts rigid body motion; supports model-predictive control for non-prehensile manipulation (Jens U. Kreber et al.)

#### Autonomous Driving / NVS
- **StreetNVS** [arXiv:2606.01590](https://arxiv.org/abs/2606.01590) (arXiv 2026) — Multi-sensor NVS framework (LiDAR + multi-camera + ego-motion) via Reference-Enhanced Camera Attention + relative ray-level positional encoding; matches methods with 10-100x denser point clouds on Waymo; supports extreme out-of-trajectory synthesis (Zhengfei Kuang, Gordon Wetzstein et al.)
- **DENSER** [arXiv:2606.01419](https://arxiv.org/abs/2606.01419) (CVPR 2026 SoccerNet NVS Challenge Rank 1) — EFA-GS based football NVS: camera-height loss weighting + Depth-Anything-V2 depth supervision + 3-model pixel-average ensemble (Parthsarthi Rawat)

#### Semantic / Segmentation
- **GeoSAM-3D** [arXiv:2606.00447](https://arxiv.org/abs/2606.00447) (arXiv 2026) — Open-vocabulary 3D scene segmentation on monocular video: 3DGS reconstruction + differentiable graph-geodesic propagation kernel (SAM prompt propagates along heat-kernel distance on Gaussian scene graph) (Arun Sharma)

#### Editing / Appearance
- **AlbedoEdit** [arXiv:2606.01362](https://arxiv.org/abs/2606.01362) (arXiv 2026) — Unified generative video editing (insertion/removal/texture) via intrinsic albedo map guidance; single-frame albedo edit auto-generates harmonized RGB video with specular/shadow/mirror effects (Xilong Zhou, Christian Theobalt et al., MPI)
- **SplatShot** [arXiv:2606.01493](https://arxiv.org/abs/2606.01493) (arXiv 2026) — Training-free 3D face avatar from single in-the-wild photo; per-step 3D feedback loop: predict clean image → refit 3DGS → photometric difference backpropagated to noise estimate; guides sampling trajectory toward 3D consistency (Hao Liang et al.)
- **GSDeformer** [arXiv:2405.15491](https://arxiv.org/abs/2405.15491) (arXiv 2024, updated 2026) — Cage-based deformation for 3DGS: proxy point cloud bridges cage deformation to Gaussian transform; splitting handles bending; works with any vanilla 3DGS variant in real-time without retraining

#### Simulation / Physics
- **Dynamic Mesh-Gaussian** [arXiv:2606.00444](https://arxiv.org/abs/2606.00444) (JCVIS 2025) — Dual-representation framework: fixed-topology mesh for physics + Gaussian splatting for rendering; 4.65x speedup over varying-topology baseline; benchmark reveals 65-80% geometric degradation from topology conversion (Adrian Ramlal et al.)

#### Training / Optimization

#### Dynamic 3DGS Survey

#### CAD / Procedural 3D
- **KDH-CAD** [arXiv:2606.01702](https://arxiv.org/abs/2606.01702) (arXiv 2026) — Knowledge-data hybrid CAD learning: pretrained foundation model + structured domain knowledge from textbooks + small labeled CAD data; 92.6% accuracy with only 250 samples, 95.8% with 1,000 (Ziqin Gao et al.)
- **MidSurfNet** [arXiv:2606.01891](https://arxiv.org/abs/2606.01891) (arXiv 2026) — Learning-augmented mid-surface abstraction: neural face pairing module + interference implicit field (SDF intersection) for arbitrary offset control; 87.32% pairing accuracy; 1,500+ annotated CAD model dataset (Li Ye et al.)
- **3DCodeBench** [arXiv:2606.01057](https://arxiv.org/abs/2606.01057) (arXiv 2026) — Systematic benchmark for VLM agents on procedural 3D generation (text/image → code → 3D); evaluates 12 VLMs; includes 3DCodeArena human preference ranking platform (Yipeng Gao et al.)
- **SEIG** [arXiv:2606.02580](https://arxiv.org/abs/2606.02580) (arXiv 2026) — VLM generates executable Blender programs from single image via staged decomposition (geometry→materials→composition→lighting); no differentiable rendering or multi-view supervision needed (Guangzhao He et al.)

#### Skeleton Animation / 4D Asset
- **MotionDreamer** [arXiv:2405.20155](https://arxiv.org/abs/2405.20155) (arXiv 2026) — Category-agnostic skeletal animation from 2D video; structural-semantic injection maps visual dynamics to heterogeneous joint hierarchies; 20,000+ 3D model dataset with rigging and animation (Ye Tao et al.)

#### Mesh / Texture Survey

#### Inverse Graphics

#### AGILE (Hand-Object Interaction)
- **AGILE** [arXiv:2602.04672](https://arxiv.org/abs/2602.04672) (SIGGRAPH 2026) — Agentic generation for hand-object interaction reconstruction from video; VLM guides generative model for complete watertight mesh; anchor-and-track strategy bypasses SfM; contact-aware optimization for physical plausibility (Jin-Chuan Shi et al.)
- **Spark 2.0** (2026) — Open-source Three.js/WebGL2 renderer for huge 3DGS worlds on the web; streaming Level-of-Detail splat tree, .RAD chunk format, shared GPU splat page table rendering 100M+ splats at steady frame rate on any device


## Newly Added Methods (June 5, 2026 — Daily Update)

> 18 methods added from arXiv cs.CV/cs.GR (Jun 2-5, 2026), CVPR 2026 highlights

### Feed-Forward / Compression
- **ZipSplat** [arXiv:2606.05102](https://arxiv.org/abs/2606.05102) (arXiv 2026) — Token-based feed-forward 3DGS decoupling Gaussian count from pixel grid via k-means clustering; ~6× fewer Gaussians, +2.1 dB PSNR SOTA on DL3DV/RealEstate10K; pose-free inference (Alexander Veicht, Sunghwan Hong, Daniel Barath, Marc Pollefeys)

### Surface / Geometry
- **Geometry Gaussians** [arXiv:2606.05124](https://arxiv.org/abs/2606.05124) (arXiv 2026, cs.GR) — Adds geometry opacity parameter per splat to decouple appearance and geometry in 3DGS; improves both rendering quality and geometry extraction, especially for transparent/thin objects (Hongyu Zhou, Zorah Lähner)

### Robustness / Degradation-Aware
- **3DReflecNet** [arXiv:2605.10204](https://arxiv.org/abs/2605.10204) (CVPR 2026) — Large-scale dataset for 3D reconstruction of reflective, transparent, and low-texture objects; systematically tests 48 material parameter combinations; reveals 3 failure modes in 3DGS/NeRF (Fangxin Wang et al., CUHK-Shenzhen)

### SLAM / Visual Mapping
- **Anchor3R** [arXiv:2606.05035](https://arxiv.org/abs/2606.05035) (arXiv 2026) — Streaming 3D reconstruction with current-centric local measurement prediction (not fixed-gauge); transient anchor mechanism + loop closure + motion averaging for long-horizon mapping (Peilin Tao et al.)

### Surface Reconstruction

### CAD / Multi-Modal
- **UniCAD** [arXiv:2606.05058](https://arxiv.org/abs/2606.05058) (arXiv 2026) — Unified multi-modal multi-task CAD benchmark + UniCAD-MLLM universal model for point/text/image→CAD reconstruction, generation, and QA (Jingyuan Chen et al.)

### Mesh Generation
- **MeshWeaver** [arXiv:2606.04688](https://arxiv.org/abs/2606.04688) (CVPR 2026) — Autoregressive next-vertex prediction guided by multi-level sparse-voxel encoder; 18% compression ratio, generates up to 16K-face meshes (Jiale Xu, Wang Zhao, Ying Shan)
- **MeshFlow** [arXiv:2606.04621](https://arxiv.org/abs/2606.04621) (CVPR 2026 Highlight) — Efficient artistic mesh generation via MeshVAE + flow-based Diffusion Transformer; compact latent space for high-quality mesh creation (Weiyu Li et al.)
- **SymTRELLIS** [arXiv:2606.04108](https://arxiv.org/abs/2606.04108) (arXiv 2026, cs.GR) — Symmetry-enforced voxel latents for 3D generation; velocity symmetrization at each ODE step enforces arbitrary finite point group symmetries; no VAE/flow retraining (Guangda Ji et al.)

### Editing / Nonrigid
- **GeM-NR** [arXiv:2606.05142](https://arxiv.org/abs/2606.05142) (arXiv 2026) — Geometry-aware multi-view editing for nonrigid scene changes; training-free depth alignment + query refinement for consistent nonrigid editing (Josef Bengtson, Yaroslava Lochman, Fredrik Kahl)

### Dynamic / 4D
- **T2Mo** [arXiv:2606.05162](https://arxiv.org/abs/2606.05162) (arXiv 2026) — Controllable dynamic 3D shape generation via 3D trajectories + text; shape-grounded trajectory embedding for feed-forward dynamic generation (Jaeyeong Kim et al.)
- **LetCamsGo** [arXiv:2606.04593](https://arxiv.org/abs/2606.04593) (CVPR 2026 Workshop 4DV) — 4D reconstruction from sparse dynamic cameras; inter-camera feature matching + intra-camera point tracking + depth-ordering regularization (Kazuki Ozeki et al.)

### Embodied AI / VLA
- **3DThinkVLA** [arXiv:2606.04436](https://arxiv.org/abs/2606.04436) (arXiv 2026) — Endowing VLA models with latent 3D priors via 3D-thinking-guided co-training; geometry perception module + reasoning distillation anchor token; SOTA on LIBERO (Jiaxin Shi et al.)

### 3D Scene / Physics-Aware
- **SimuScene** [arXiv:2606.03994](https://arxiv.org/abs/2606.03994) (arXiv 2026) — Physics-in-the-loop compositional 3D scene reconstruction from single image; physics engine as diagnostic tool for gravity-axis stretching + amodal resampling (Inhee Lee et al.)

### Spatial Control
- **MetaPoint** [arXiv:2606.05031](https://arxiv.org/abs/2606.05031) (arXiv 2026) — Unlocking precise spatial control in agentic visual generation; represents continuous 2D coordinate as single special token via model's positional encoding; compositional agentic generation (Dewei Zhou et al.)

### Rendering / Light Tracing
- **PureLight** [arXiv:2606.04319](https://arxiv.org/abs/2606.04319) (arXiv 2026, cs.GR) — Learning complex luminaires with light tracing; forward light tracing for efficient sampling of difficult light paths (Pedro Figueiredo et al.)

### Survey
- **Cookbook of 3D Vision** [arXiv:2606.04291](https://arxiv.org/abs/2606.04291) (arXiv 2026) — Data-centric taxonomy of 3D vision: point clouds, meshes, voxels, 3D Gaussians; dataset design and learning paradigms (Hongyang Du et al.)


## Newly Added Methods (June 12, 2026 — Daily Update)

> 12 methods added from CVPR 2026 proceedings, arXiv cs.CV/cs.GR (Jun 5-12, 2026), CVPR 2026 award announcements

### Physics / Simulation

### Language / Semantic
- **ReLaGS** [arXiv:2603.17605](https://arxiv.org/abs/2603.17605) (CVPR 2026) — Relational Language Gaussian Splatting: open-vocabulary 3D semantic reasoning without per-scene training; hierarchical relational language field for segmentation/retrieval/relation understanding
- **OpenGaFF** [arXiv:2605.06088](https://arxiv.org/abs/2605.06088) (arXiv 2026) -- Open-vocabulary Gaussian feature field with codebook attention for improved s...
- **Semantic Foam** [arXiv:2604.26262](https://arxiv.org/abs/2604.26262) (CVPR 2026) -- Volumetric Voronoi mesh for spatial + semantic decomposition
- **NG-GS** [arXiv:2604.14706](https://arxiv.org/abs/2604.14706) (arXiv 2026) -- NeRF-guided Gaussian-level semantic assignment
- **SCOUP** [arXiv:2605.13600](https://arxiv.org/abs/2605.13600) (arXiv 2026) -- Sparse Code Uplifting for efficient 3D language GS with 400x training speedup
- **GLMap** [arXiv:2605.01736](https://arxiv.org/abs/2605.01736) (CVPR 2026) -- Multi-scale Gaussian-Language map for zero-shot navigation
- **ReferSplat** (ICML 2025) -- Referring segmentation in 3D Gaussian Splatting with language-guided instance...
- **PointGS** [arXiv:2605.11520](https://arxiv.org/abs/2605.11520) (CVPR 2026) -- 3DGS as unified intermediate representation bridging discrete-continuous gap ...
- **LangSplat** [arXiv:2312.16084](https://arxiv.org/abs/2312.16084) (CVPR 2024) -- CLIP features stored per-Gaussian for open-vocabulary 3D queries
- **Feature 3DGS** [arXiv:2312.03203](https://arxiv.org/abs/2312.03203) (CVPR 2024) -- Distilled DINO/SAM features for 3D segmentation/detection

### Dynamic / 4D Reconstruction
- **D4RT** [arXiv:2512.08924](https://arxiv.org/abs/2512.08924) (CVPR 2026 Best Paper) — Efficiently Reconstructing Dynamic Scenes One at a Time; unified query mechanism for 4D reconstruction + tracking from monocular video; 200+ FPS; Google DeepMind / UCL / Oxford (Jianyuan Wang et al.)

### 3D Generation
- **TRELLIS.2** (CVPR 2026 Best Student Paper) — 4B-parameter native 3D large model; 17s PBR asset generation with interior geometry; handles open surfaces, nested layers, transparent materials; Microsoft Research + Tsinghua
- **SAM 3D** (Meta, CVPR 2026 Honorable Mention) — Foundation model for single-image 3D reconstruction; generalizable 3D understanding from 2D priors

### Articulated / Manipulation
- **FreeArtGS** [arXiv:2603.22102](https://arxiv.org/abs/2603.22102) (arXiv 2026) — Articulated Gaussian Splatting under free-moving scenario; scalable articulated object reconstruction for AR and robotics
- **ArtGS** (IEEE 2026) — 3D Gaussian Splatting for interactive visual-physical modeling and manipulation of articulated objects; bone-driven deformation + contact-aware rendering [IEEE Xplore](https://ieeexplore.ieee.org/document/11246522/)
- **PARTICULATE** (CVPR 2026) — Feed-forward 3D object articulation from static mesh; auto-infer movable structure including parts, connections, and motion axes; Oxford / Cambridge / NTU

### Sparse-View / Optimization
- **DropAnSH-GS** (CVPR 2026) — Dropping Anchor and Spherical Harmonics for sparse-view Gaussian Splatting; anchor-based dropout strategy + SH regularization to mitigate overfitting
- **BA-GS** (CVPR 2026) — Bayesian Adaptive Gaussian Splatting for SfM-free 3D reconstruction; joint camera pose + Gaussian optimization from scratch via Bayesian uncertainty modeling

### Feed-Forward / Reconstruction
- **SR3R** (CVPR 2026) — Rethinking Super-Resolution 3D Reconstruction with Feed-Forward Gaussian Splatting; multi-resolution feature fusion + progressive optimization for high-fidelity 3D from low-res input


## Newly Added Methods (June 17, 2026 — Daily Update)

> 14 methods added from arXiv cs.CV/cs.GR (Jun 12-17, 2026), CVPR 2026 additional highlights, CAD/B-rep updates

### Acceleration / Rendering
- **QuadBox** [arXiv:2605.04844](https://arxiv.org/abs/2605.04844) (arXiv 2026) — Quad-tree-based accelerated rasterization for 3DGS with geometry-aware bounding boxes; reduces tile-based blank area (Xinze Li et al.)
- **Proxy-GS** [arXiv:2509.24421](https://arxiv.org/abs/2509.24421) (CVPR 2026, Full Score Oral) — Unified occlusion priors for structured 3DGS via lightweight proxy mesh; 3× rendering speedup for anchor-based methods; train+inference dual acceleration (Yuanyuan Gao et al., SJTU / Shanghai AI Lab)

### Optimization / Pruning
- **Prune Wisely** [arXiv:2602.24136](https://arxiv.org/abs/2602.24136) (CVPR 2026) — Adaptive pruning + Difference-of-Gaussian (DoG) primitives for compact 3DGS; up to 90% Gaussian reduction with quality preservation (Haoran Wang et al.)

### Streaming / LoD
- **StreamLoD-GS** [arXiv:2601.18475](https://arxiv.org/abs/2601.18475) (arXiv 2026) — Level-of-Detail structured 3DGS for streaming free-viewpoint video; progressive LoD delivery for bandwidth-adaptive FVV (Xinhui Liu et al.)

### Distractor-Free / Decomposition
- **DeSplat** (CVPR 2026) — Decomposed Gaussian Splatting for distractor-free rendering; separates transient objects from static background via decomposed compositing; IEEE Xplore

### Sparse-View / Surface
- **Sparse2DGS** [arXiv:2505.19854](https://arxiv.org/abs/2505.19854) (TVCG 2026) — Sparse-view surface reconstruction using 2D Gaussian Splatting with dense point cloud initialization; confidence-aware depth regularization (Natsuki Takama et al.)
- **SatSurfGS** [arXiv:2605.07181](https://arxiv.org/abs/2605.07181) (arXiv 2026) — Generalizable 2D Gaussian Splatting for sparse-view satellite surface reconstruction; confidence-aware multi-view feature aggregation for orbital imagery (Min Chen et al.)

### CAD / B-rep
- **BRepCLIP** [arXiv:2606.05515](https://arxiv.org/abs/2606.05515) (arXiv 2026) — Contrastive multi-modal pre-training with BRep primitives for CAD understanding; BRep-graph CLIP for cross-modal retrieval and QA (Muhammad Usama et al., DFKI / RPTU)
- **CADDreamer** (CVPR 2025 Highlight) — CAD object generation from single-view images; parametric primitive sequence generation from 2D input (Yuan Li et al., Cheng Lin group)
- **BrepGiff** (CVPR 2025) — Lightweight generation of complex B-rep with 3D GAT Diffusion; graph attention network diffusion for B-rep topology+geometry (IEEE Xplore)
- **Zero-to-CAD** [arXiv:2604.24479](https://arxiv.org/abs/2604.24479) (arXiv 2026) — Agentic synthesis of parametric CAD programs; 2B VLM trained on 1M+ synthetic CAD programs outperforms GPT-5.2 on CAD generation (Mohammadmehdi Ataei et al., Autodesk)

### Skeletal Animation

### 3D Vision Survey


## Newly Added Methods (June 25, 2026 — Daily Update)

> 10 methods added from multi-source search (arXiv, Zhihu CVPR 2026 coverage, Baijiahao, CSDN, Leiphone); spanning acceleration, SLAM, spatial intelligence, digital twin, 3D understanding, and CAD/mesh

### Acceleration / Training
- **FastGS** [arXiv:2511.04283](https://arxiv.org/abs/2511.04283) (CVPR 2026 Highlight) — Multi-view consistency-based densification and pruning replacing Gaussian budget mechanism; 3.32× training acceleration on Mip-NeRF 360, 15.45× on Deep Blending; 100-second training with comparable quality to SOTA; generalizes across dynamic/surface/sparse-view/large-scale/SLAM tasks (Shiwei Ren, Tianci Wen, Yongchun Fang, Biao Lu, Nankai University)

### SLAM
- **GS-Map-SLAM** (CVPR 2026) — Gaussian-based dense mapping for SLAM with view-dependent quality; real-time dense mapping via GS optimization
- **MonoEM-GS** [arXiv:2604.10593](https://arxiv.org/abs/2604.10593) (arXiv 2026) -- Monocular expectation-maximization GS SLAM
- **2DGS-SLAM** (arXiv 2026) -- Globally consistent RGB-D SLAM with 2DGS; loop closure + global optimization
- **WildGS-SLAM** [arXiv:2504.03886](https://arxiv.org/abs/2504.03886) (CVPR 2025) -- Dynamic environment SLAM with uncertainty-aware mapping
- **S3PO-GS** (ICCV 2025) -- Global scale-consistent outdoor monocular 3DGS SLAM
- **EvFlow-GS** [arXiv:2604.22183](https://arxiv.org/abs/2604.22183) (arXiv 2026) -- Event camera + optical flow for motion blur handling
- **CGS-SLAM** (arXiv 2025) -- Compact voxel-based 3DGS for dense visual SLAM
- **MAGICIAN** [arXiv:2603.22650](https://arxiv.org/abs/2603.22650) (CVPR 2026) -- Active mapping with imagined Gaussians + beam search
- **Gaussian Splatting SLAM** [arXiv:2312.06741](https://arxiv.org/abs/2312.06741) (CVPR 2024) -- First real-time monocular 3DGS SLAM
- **MAGS-SLAM** [arXiv:2605.10760](https://arxiv.org/abs/2605.10760) (arXiv 2026) -- First RGB-only multi-agent 3DGS SLAM; compact submap communication + geometry...

### Digital Twin / Interaction
- **ArtiTwinSplat** (arXiv 2026) — Interactable Digital Twin Reconstruction via Gaussian Splatting from RGB-D videos; enables interaction with reconstructed digital twins; agent-system integration for articulated object manipulation (Pranjal Mishra, René Zurbrügg, Max Wilder-Smith)

### Spatial Intelligence / World Model
- **Holi-Spatial** (ICML 2026 Oral) — Evolving Video Streams into Holistic 3D Spatial Intelligence; fully automated spatial data construction framework from raw video; 4M+ spatial multimodal samples; covers 3D reconstruction, depth, 2D mask, 3D bbox, instance description, 3D grounding, spatial QA (Shanghai AI Lab, NWPU, SJTU)
- **Spatial-TTT** (ECCV 2026) — Test-time training for streaming spatial intelligence; 2B-parameter model surpasses GPT-5 and Gemini-3-pro on spatial benchmarks; continuous spatial memory update from long-form video streams; 40%+ savings in VRAM and compute (Fangfu Liu et al., Tsinghua University)
- **APEIRIA** (ICML 2026) — Neuro-symbolic 3D spatial reasoning framework combining 3D MLLM open-vocabulary understanding with programmatic verification; bridges black-box neural reasoning and interpretable symbolic spatial reasoning (Wentao Mo, Yang Liu, Peking University)

### Spatial Data / 3D Vision Infrastructure
- **OpenSpatial** [arXiv:2604.07296](https://arxiv.org/abs/2604.07296) (arXiv 2026) — Principled open-source data engine for spatial intelligence; 3M-sample dataset; 5 foundational task hierarchy (Spatial Measurement, Spatial Relationship, Camera Perception, Multi-view Consistency, Scene-Aware Reasoning); 19% relative improvement on spatial benchmarks (Jianhui Liu et al., HKU / Xiaomi)

## July 2, 2026 — Daily Update

### Large-Scale / Streaming
- **EvoGS** [arXiv:2606.07179](https://arxiv.org/abs/2606.07179) (arXiv 2026) — First continuous-layering 3DGS representation via Evolution Tree; wavelet-inspired parent-child refinement structurally corrects ancestral errors; splat redundancy reduced from 65% to <25%; 2.4x transmission payload reduction; 5.5x GPU VRAM footprint reduction; smooth quality transitions for adaptive streaming (Yuang Shi et al., IRIT/UPVD/NUS)

### Autonomous Driving / Sensor Calibration

### Pose Optimization / SfM-Free
- **Energy-GS** (CVPR 2026 Oral) — RGB-only pose-free 3DGS joint optimization; no depth/geometry priors required; energy-based pose correction function; resolves NeRF-vs-3DGS pose optimization asymmetry (Beijing Institute of Technology)

### Feed-Forward / Single-Image
- **UniSHARP** (CVPR 2026, Insta360) — First unified monocular 3DGS across pinhole/fisheye/360 cameras; single image → Gaussian point cloud in seconds via single-pass inference; universal geometric representation bridging heterogeneous camera models (Insta360 Research)

### Robotics / Simulation
- **DISCOVERSE** (RAL 2026) — 3DGS + MuJoCo unified Real2Sim2Real robot learning framework; scene-level + object-level dual-channel Real2Sim generation; multi-modal sensor native support (RGB/depth/LiDAR/tactile); open-source scalable modular architecture (Digua Robot / Tsinghua AIR / Qiuzhi Tech)

### System / Infrastructure
- **gsplat** (UC Berkeley / NVIDIA, open-source) — CUDA-accelerated 3DGS rasterization library; 4x VRAM savings; 10% training speedup; production-grade real-time rendering; part of nerfstudio project (Viktor Ye et al., UC Berkeley / NVIDIA)

### Editing / Stylization
- **Capacity-Controlled Stylization** (ECCV 2026) — Capacity-controlled multi-view stylization of 3DGS; style-structure disentanglement with capacity budget (Zhihao Wen et al., Shenzhen University / Tencent / Hebrew University / Tel Aviv University)

### Geometry / Regularization
- **PDE-Constrained 3DGS** (CVPR 2026) — PDE physical constraints for 3DGS artifact removal; geometry occupy supervision for boundary precision; eliminates floating artifacts and sharpens geometric boundaries

### Image
- **GaussianImage** [arXiv:2403.08551](https://arxiv.org/abs/2403.08551) (ECCV 2024) -- 2D Gaussian image codec at 1000+ FPS


## July 2026 Weekly Update (Week of Jul 1-9)

> 39 new papers identified across arXiv cs.CV/cs.GR + ICML/ECCV 2026 proceedings

### Acceleration / Optimization
- **Flux-GS** [arXiv:2606.30017](https://arxiv.org/abs/2606.30017) (ECCV 2026) — Monte Carlo Specular Energy Aggregator for mobile 3DGS: samples 3rd-order radiance residuals into compact latent space + Attribute-Conditioned SH Enhancement + Multi-view Alpha-based Densification/Pruning; real-time mobile rendering with significant parameter reduction (UTS/Baidu/U Adelaide)
- **TemporalGS** [arXiv:2607.03390](https://arxiv.org/abs/2607.03390) (arXiv 2026) — Training-free plug-and-play 3DGS rendering acceleration via temporal priors; dynamic culling + selective rendering; up to 1.48x speedup
- **Provable Pruning via Coresets** [arXiv:2607.02721](https://arxiv.org/abs/2607.02721) (arXiv 2026) — First provable coreset construction theorem for 3DGS pruning; sensitivity-based sampling with multiplicative approximation guarantees; SOTA under aggressive compression + minimal finetuning [Code](https://github.com/waseem-m/3dgs_provable_coresets)
- **Fast 3D Foundation Model Initialized GS** [arXiv:2607.03209](https://arxiv.org/abs/2607.03209) (ICECET 2026) — 3D foundation model replacing SfM for pose/point cloud initialization; joint pose-Gaussian optimization; ~3 min/scene training

### Compression / Mobile
- **Clustered Codebook VQ** [arXiv:2607.05667](https://arxiv.org/abs/2607.05667) (SIGGRAPH 2026 Poster) — CGVQ for 2D Gaussian image compression; cluster-guided grouping before quantization; 20% bpp reduction with preserved visual quality

### SLAM
- **GeoGS-SLAM** [arXiv:2607.07452](https://arxiv.org/abs/2607.07452) (arXiv 2026) — Geometry-Only Gaussian Splatting for dense monocular SLAM; removes appearance modeling reducing per-primitive params 80%+; SOTA online mapping + geometry quality
- **Real-Time LiDAR GS-SLAM** [arXiv:2607.04127](https://arxiv.org/abs/2607.04127) (arXiv 2026) — First real-time LiDAR Gaussian Splatting SLAM; tight G-ICP + spherical rasterization dense mapping; Newer College F-score 86.78%@>20FPS
- **DL-SLAM** [arXiv:2607.01860](https://arxiv.org/abs/2607.01860) (arXiv 2026) — Dual-level probability framework for dynamic environment GS-SLAM; semantic+geometric pixel/object-level dynamic probability; artifact-free static map + semantic map

### Feed-Forward / Generalizable
- **WildSplat** [arXiv:2607.05347](https://arxiv.org/abs/2607.05347) (ECCV 2026) — First feed-forward 3DGS from unposed in-the-wild images; dual-branch architecture decoupling geometry and appearance for appearance-conditioned NVS
- **NoDrift3R** [arXiv:2607.07168](https://arxiv.org/abs/2607.07168) (ECCV 2026) — Raymap-Guided Coupling for drift-robust unposed feed-forward 3DGS; explicit geometry-appearance coupling module for long-sequence reconstruction
- **PixGS** [arXiv:2607.01803](https://arxiv.org/abs/2607.01803) (ECCV 2026) — Single-stage pixel-space diffusion directly generating 3D Gaussians; bypasses lossy latent compression; denoise Gaussian attributes per timestep; inference ~1s/A100
- **AnchorSplat** [arXiv:2607.01290](https://arxiv.org/abs/2607.01290) (ECCV 2026) — 3D-native end-to-end depth network via Point Anchor Mechanism for GS detail enhancement; 10^5x faster than optimization methods; zero-shot generalization to generated models
- **Argus** (ECCV 2026) — Image-derived LiDAR-level pose constraints for 3DGS without LiDAR; consumer-grade 3DGS applications (如视)
- **VLRC** [arXiv:2607.02707](https://arxiv.org/abs/2607.02707) (arXiv 2026) — Vision-Language Reprojection Consistency as scalable signal for better feed-forward 3D pretraining

### Dynamic / 4D
- **World from Motion** [arXiv:2607.01202](https://arxiv.org/abs/2607.01202) (arXiv 2026) — Generative dynamic GS from monocular video; conditions video model to fix rendering artifacts + fill missing regions; distills back to consistent 4D Gaussians
- **MVFusion-GS** [arXiv:2607.01578](https://arxiv.org/abs/2607.01578) (arXiv 2026) — Motion-variance guided refinement + MotionFormer temporal attention for dynamic 3DGS; explicit motion awareness improves foreground motion + static background
- **GUSH3R** [arXiv:2607.05243](https://arxiv.org/abs/2607.05243) (arXiv 2026) — Single-forward-pass reconstruction of dynamic humans + static scenes as 3DGS primitives from monocular video; geometry-consistent online NVS
- **DeGenseGS** [arXiv:2607.04761](https://arxiv.org/abs/2607.04761) (arXiv 2026) — Geometrically and semantically decoupled 4DGS for surgical scene understanding; HexPlane spatiotemporal entanglement module synchronizes semantic changes with scene dynamics

### Sparse-View / Surface Reconstruction
- **Sparse-View Surface via GS** [arXiv:2607.03765](https://arxiv.org/abs/2607.03765) (ECCV 2026) — Normal-guided depth propagation from high- to low-confidence regions + outlier depth edge-aware regularization; resolves Gaussian discreteness-induced depth discontinuities
- **PRISM3D** [arXiv:2607.03855](https://arxiv.org/abs/2607.03855) (ECCV 2026) — First framework bootstrapping 3DGS from extreme motion blur; MCMC probabilistic densification + continuous Bezier trajectory physics modeling

### Large-Scale / Urban
- **City-Level 3D Surface** [arXiv:2607.03771](https://arxiv.org/abs/2607.03771) (ECCV 2026) — Viewpoint orientation partitioning for 3DGS scene division; similar-orientation views joint depth estimation; multi-GPU parallel city-scale surface reconstruction
- **SharpSplat** [arXiv:2607.03872](https://arxiv.org/abs/2607.03872) (IGARSS 2026) — SAM3-based building edge extraction + rendered gradient-edge alignment; sharp building boundary reconstruction in UAV 3DGS scenes

### Antialiasing / Rendering Quality
- **SSA-3DGS** [arXiv:2607.05598](https://arxiv.org/abs/2607.05598) (arXiv 2026) — Unsupervised screen-space artifact removal for 3DGS; joint optimization of 3D scene + learnable 2D overlay; cross-view geometric consistency decouples artifacts from geometry; up to +9 dB PSNR

### Uncertainty / Bayesian
- **Rendering-Aware Bayesian 3DGS** [arXiv:2607.05522](https://arxiv.org/abs/2607.05522) (arXiv 2026) — Normal-Inverse-Wishart posterior tracking for Gaussian geometry; native predictive uncertainty for interval calibration + active view selection; ~17x coverage error reduction

### Evaluation / Benchmark
- **Mind the Gap** [arXiv:2607.01556](https://arxiv.org/abs/2607.01556) (arXiv 2026) — Reveals 3-12 dB interpolation-extrapolation gap in standard 3DGS evaluation; proposes fair match count protocol + spatial preservation benchmark toolkit (16 scenes)

### Editing / Segmentation
- **Semantic-Guided Progressive Object Removal** [arXiv:2607.04144](https://arxiv.org/abs/2607.04144) (arXiv 2026) — DINOv2 semantic-guided block matching + region-wise progressive refinement for high-quality 3D object removal in 3DGS scenes
- **SAGO** [arXiv:2607.01628](https://arxiv.org/abs/2607.01628) (arXiv 2026) — Online segment 3D Gaussians via virtual drones; reframes interactive 3DGS segmentation as Next-Best-View planning; 50x faster than prior methods
- **Consistent Scene Understanding in 3DGS** [arXiv:2607.01708](https://arxiv.org/abs/2607.01708) (ICPR 2026) — Multi-cue mask refinement with semantic/depth/edge fusion + cross-view mask matching for consistent 3DGS instance segmentation

### Generation / Text-to-3D
- **CGGS** [arXiv:2607.03819](https://arxiv.org/abs/2607.03819) (IEEE TIP 2026) — Consistency-Augmented Geometric GS for ego-centric 3D scene generation; consistency-augmented loss + mutual information depth loss (MID) for hierarchical geometry-visual optimization

### CAD / Assembly
- **ASSEMCAD** [arXiv:2607.05123](https://arxiv.org/abs/2607.05123) (arXiv 2026) — Axiom-driven framework for production-ready CAD assembly generation from natural language; port-and-mate-based library with executable mate relations + engineering axioms; outperforms code-centric CAD baselines on AssemBench

### 3DGS Hardware Acceleration
- **Axis-Shared Rasterization Accelerator** (ISCA 2026) — 3DGS hardware accelerator with axis-shared rasterization + order-independent transmittance; optimized for efficient on-chip rendering (SJTU)

### Cross-Domain / Application
- **MACRO** [arXiv:2607.03875](https://arxiv.org/abs/2607.03875) (arXiv 2026) — Training-free multi-plane attention for closeup render optimization; depth-plane decomposition + scale-matching reference; first standardized closeup NVS benchmark
- **SceneFrom3D** [arXiv:2607.04540](https://arxiv.org/abs/2607.04540) (arXiv 2026) — Geometry-conditioned outdoor 3D scene generation via view scheduling with object-level control; directed generation graph with anchor views + interpolation trajectories

## Newly Added Methods (July 14, 2026 Update)

> 21 methods added from arXiv Jul 9-14, SIGGRAPH 2026, and ECCV/TPAMI/ICRA/IROS/MICCAI acceptance wave

### Acceleration / Optimization
- **SalientGS** [arXiv:2607.11285](https://arxiv.org/abs/2607.11285) (arXiv 2026) — Unified SfM-to-3DGS pipeline with importance-guided MCMC Gaussian allocation; reallocates capacity from well-fit to underfit regions; 15-min end-to-end SOTA
- **DP-Splat** [arXiv:2607.10912](https://arxiv.org/abs/2607.10912) (arXiv 2026) — Bayesian nonparametric complexity control via Dirichlet-process prior; 5.9-7.6x fewer components at matched quality; exact monotonicity guarantee + truncation-error bound

### Feed-Forward / Generalizable
- **HyperGS** [arXiv:2607.11500](https://arxiv.org/abs/2607.11500) (arXiv 2026) — Feedforward optimization-free Gaussian video representation; factorized spatiotemporal Transformer + learnable query-based Transformer; 10^4-10^5x speedup; +2.9-3.1 dB over prior video encoders
- **AsySplat** [arXiv:2607.10995](https://arxiv.org/abs/2607.10995) (arXiv 2026) — Asymmetric architecture decoupling geometry and appearance modeling; coarse geometry branch + fine appearance branch; ~800x speedup over optimization-based methods
- **StructSplat** [arXiv:2606.28321](https://arxiv.org/abs/2606.28321) (ECCV 2026) — Sparse-view generalizable 3DGS without camera parameters; structure-guided reconstruction from HITSZ/DU/BUTD
- **MAC-Splat** [arXiv:2607.10792](https://arxiv.org/abs/2607.10792) (ECCV 2026) — Multi-Attribute Consistency for sparse-view 3DGS; MASt3R backbone + DINOv3 correspondences; +4.5 dB over Splatt3R

### Dynamic / 4D
- **Grassmannian Splatting** [arXiv:2607.10489](https://arxiv.org/abs/2607.10489) (arXiv 2026) — Rank-2 spacetime surfels via Grassmannian parameterization; closed-form motion model without deformation field; fastest among compared methods (4.9-5.6x over quality baselines)

### SLAM
- **GeoGS-SLAM (Geometric Priors)** [arXiv:2607.11184](https://arxiv.org/abs/2607.11184) (arXiv 2026) — Online monocular SLAM combining 3DGS with learned geometric priors; coarse-to-fine strategy + online loop closure
- **Anythingreality** [arXiv:2607.09260](https://arxiv.org/abs/2607.09260) (arXiv 2026) — Robust online GS SLAM for VR scene exploration + VLM interaction; ORB-SLAM3-based pose + real-time Gaussian reconstruction; +14.5% PSNR, 88% VLM recognition
- **Track2Map** [arXiv:2607.08408](https://arxiv.org/abs/2607.08408) (MICCAI 2026) — Online deformable GS SLAM for robotic surgery; track-anchored deformation initialization; joint camera + scene optimization from surgical video

### Sparse-View / Surface
- **StereoSplat+** [arXiv:2607.08808](https://arxiv.org/abs/2607.08808) (IROS 2026) — Feed-forward stereo GS with diffusion-assisted progressive inference; one-step diffusion enhancer + stereo cost-volume + triplane 3D volume fusion

### Large-Scale / Outdoor
- **PanoLOG** [arXiv:2607.08769](https://arxiv.org/abs/2607.08769) (arXiv 2026) — Geometry and gradient-based partitioning for panoramic outdoor 3DGS reconstruction; first panoramic outdoor benchmark Pano360

### Compression / Semantic
- **CoSAG** [arXiv:2607.10237](https://arxiv.org/abs/2607.10237) (arXiv 2026) — Compact Semantic Anchor Gaussians via training-free rate-distortion coding; closed-form transmittance-weighted lift + spatially predictive entropy coder; 37-76x compression over LangSplatV2 at higher accuracy; sub-MB storage

### Editing / MR
- **SyncSpace** [arXiv:2607.10050](https://arxiv.org/abs/2607.10050) (arXiv 2026) — Layout-conditioned 3DGS for MR space reskinning; coarse-to-fine registration + hand-tracked engulfment interaction

### World Model / Generation
- **ABot-3DWorld 0** [arXiv:2607.11673](https://arxiv.org/abs/2607.11673) (arXiv 2026) — Universal world model → 3DGS; Spatial Generative Primitive (SGP) + panoramic video reconstruction; multimodal input → explorable 3DGS world; SOTA among open-source methods

### Mesh / Surface
- **HoloTetSphere** [arXiv:2607.08398](https://arxiv.org/abs/2607.08398) (ECCV 2026) — Unified TetSphere mesh reconstruction for physical simulation; Gaussian sphere coupling + edge-based element pruning; bypasses error-prone tetrahedralization
- **Incremental 3D Gaussian Triangulation** [arXiv:2607.10690](https://arxiv.org/abs/2607.10690) (arXiv 2026) — Online incremental mesh extraction from dense Gaussian triangulation; plane-based pulling constraint + dynamic historical region freezing

### Deblurring / Robustness
- **FreDeGS** (Springer 2026) — Frequency-guided 3DGS for scene deblurring; frequency-aware decomposition for motion-blurred input reconstruction

### Human / Avatar
- **PEAR** (SIGGRAPH 2026) — Single-image animatable 3D human avatar at 100 FPS; full-body + hand + face reconstruction from single natural image

### Robotics / Embodied AI
- **SplatCtrl** [arXiv:2607.08948](https://arxiv.org/abs/2607.08948) (ICRA 2026) — Perception-action coupling via GS + reactive robot control; isotropic Gaussian → continuous SDF → control barrier functions; collision-free manipulation

## Newly Added Methods (July 23, 2026 Update)

> 6 methods added from ICML 2026, arXiv July 2026, and hardware acceleration research

### Feed-Forward / Generalizable
- **GADA** [arXiv:2607.00595](https://arxiv.org/abs/2607.00595) (ICML 2026) — Geometry-Aware Deformable Aggregation for image-based 3DGS; deformable offsets + implicit confidence weighting; 2.13× faster FPS with improved PSNR over prior feed-forward methods
- **InvSplat** [arXiv:2607.02301](https://arxiv.org/abs/2607.02301) (arXiv 2026) — Inverse feed-forward scene splatting; predicts structured 3D Gaussians with intrinsic material attributes (albedo, metallic, roughness) for relighting without post-hoc decomposition

### Material / Relighting
- **Large Material Gaussian Model** [arXiv:2509.22112](https://arxiv.org/abs/2509.22112) (arXiv 2026) — Relightable 3D generation with full PBR materials (albedo, roughness, metallic); multiview material diffusion + Gaussian material representation for relightable assets

### Robustness / Physics-Guided
- **DualPhys-GS** [arXiv:2508.09610](https://arxiv.org/abs/2508.09610) (arXiv 2026) — Dual physically-guided 3DGS for underwater scene reconstruction; joint attenuation-scattering physics + lighting decomposition for degraded underwater imagery

### Provenance / Security
- **GaussTrace** [arXiv:2606.10612](https://arxiv.org/abs/2606.10612) (ICML 2026) — 3DGS provenance analysis via evidence-driven LLM reasoning; constructs directed provenance graphs from Gaussian scene attributes for 3DGS model IP protection and forensics

### 3DGS Hardware Acceleration
- **StereoGS** (2026) — Energy-efficient 3DGS stereoscopic rendering processor; hardware accelerator optimized for dual-eye stereoscopic Gaussian rasterization with shared compute and memory bandwidth
## Newly Added Methods (July 26, 2026 Update)

> 14 methods added from arXiv July 2026 + GitHub trending + venue-verified repos. Knowledge base now 789+ methods.

### Dynamic / 4D
- **GrainGS** [arXiv:2607.21448](https://arxiv.org/abs/2607.21448) (arXiv 2026) —Hierarchical anchor skeleton + per-Gaussian deformation with stop-gradient; 36.98 dB PSNR, 435.6 FPS, 4.67 MB
- **AniGS** [arXiv:2607.18539](https://arxiv.org/abs/2607.18539) (arXiv 2026) —Scene-level 3DGS animation via diffusion prior; canonical 3DGS + time-conditioned deformation field; iterative dataset-model update with video diffusion; 5 real-world outdoor scenes

### SLAM
- **GLAM-SLAM** [arXiv:2607.21416](https://arxiv.org/abs/2607.21416) (IROS 2026) —Large-scale outdoor decoupled GS SLAM; feature tracking front-end + sparse anchor grid; 15% better than SOTA on KITTI/Oxford
- **VIGS-SLAM** [arXiv:2512.02293](https://arxiv.org/abs/2512.02293) (ECCV 2026) —Visual-inertial GS SLAM with iPhone real-time demo; feature tracking + Gaussian mapping; Docker + TensorRT [Code](https://github.com/cvg/VIGS-SLAM)

### Feed-Forward / Generalizable
- **SubSplat** [arXiv:2607.20813](https://arxiv.org/abs/2607.20813) (arXiv 2026) —Subpixel Gaussian reparameterization (SPGR); subdivide main Gaussians from low-res features
- **ATSplat** [arXiv:2607.20417](https://arxiv.org/abs/2607.20417) (arXiv 2026) —Adaptive 3D Tokens for feed-forward 3DGS; 12 images to 1s reconstruction, 1136 FPS, 5.7x fewer Gaussians
- **FF-ProCams** [arXiv:2607.17803](https://arxiv.org/abs/2607.17803) (arXiv 2026) —Feed-forward 3DGS inverse rendering for projector-camera; Mamba2-Transformer; 8 views beat 297-view optimization

### Semantic / Editing
- **3D-GIMP** [arXiv:2607.20789](https://arxiv.org/abs/2607.20789) (arXiv 2026) —3DGS inpainting + PatchMatch hybrid; single generative inpainting on key view then propagate
- **LB-Edit** [arXiv:2607.19777](https://arxiv.org/abs/2607.19777) (arXiv 2026) —Attention-guided editing camera placement (ACP) + multi-view attention alignment (MAA); 5 views, 7x lower latency
- **ZeroSplat** [arXiv:2607.18801](https://arxiv.org/abs/2607.18801) (ECCV 2026) —Generalized referring 3DGS segmentation (GR3DGS); zero-feature, training-free, 0/1/N target support

### Avatar / Human
- **FlexiAvatar** [arXiv:2607.19100](https://arxiv.org/abs/2607.19100) (ECCV 2026) —Unified framework optimizing only visible body regions; SMPL-X tracking + diffusion completion

### Large-Scale / Outdoor
- **CaT-GS** [arXiv:2607.17842](https://arxiv.org/abs/2607.17842) (CVPR 2026) —Renderspeed: speculative multi-frame preprocessing + inter-frame caching; 10x faster than vanilla 3DGS
- **i3dgs** (SIGGRAPH 2026) —Immediate 3DGS for large-scale unordered image collections; incremental reconstruction with on-the-fly pruning [Code](https://github.com/graphdeco-inria/i3dgs)

### Compression / Volume Visualization
- **ECoNGS** [arXiv:2607.18466](https://arxiv.org/abs/2607.18466) (IEEE VIS 2026) —Neural GS for volume visualization; lightweight NNs predict splats from anchors; joint learning clusters similar scenes; 6.1x model reduction, 5.9x training speedup

---

## Newly Added Methods (August 23, 2026 — Daily Update)

### Language & Semantic
- **LEGO** [arXiv:2608.10057](https://arxiv.org/abs/2608.10057) (ECCV 2026) —Hierarchical language gaussian splatting; multi-view SAM granularity-adaptive re-grading into 3D-consistent hierarchy; per-level language scene graph supports LLM spatial reasoning
- **OutLangSplat** [arXiv:2608.04560](https://arxiv.org/abs/2608.04560) (arXiv 2026) —UAV outdoor 3D language GS; 2D-3D dual-branch representation; training-free contribution and consistency-aware gaussian feature aggregation; first UAV open-vocabulary 3D scene dataset

### Cross-Domain (Scientific Visualization)
- **ESVR** [arXiv:2608.05564](https://arxiv.org/abs/2608.05564) (IEEE VIS 2026) —3D ellipsoid sparse volume rendering; learns directly from raw volume data; per-primitive ray sampling; up to 4 orders of magnitude compression, 43–223 FPS

### Sparse-View
- **TRACE-GS** [arXiv:2608.10286](https://arxiv.org/abs/2608.10286) (arXiv 2026) —On-policy trajectory distillation + privileged geometric conditioning; first to derive on-policy supervision from privileged geometry for sparse-view 3DGS recovery; LUPI setting

### CAD & Reverse Engineering
- **RORA** [arXiv:2608.04842](https://arxiv.org/abs/2608.04842) (arXiv 2026, IEEE submitted) —Single static video to articulated object end-to-end pipeline; mixed 3DGS + mesh; convex decomposition + automatic joint suggestion algorithm; deployed in Unreal Engine & Isaac Sim

### Dynamic & 4D / Simulation
- **OVOW** [arXiv:2606.31388](https://arxiv.org/abs/2606.31388) (ECCV 2026) —Monocular video to instance-level 4D mesh scene for physics simulation; unifies static/rigid/non-rigid; gravity/contact/support correction; 120-scene benchmark

### Editing
- **Super-Gaussian** [arXiv:2608.04475](https://arxiv.org/abs/2608.04475) (arXiv 2026) —3DGS interactive scene editing + NLI-based volume rendering visualization in VR

---

## Newly Added Methods (September 2, 2026 — Daily Update)

> 11 methods added from arXiv late August 2026 + ECCV 2026 / SIGGRAPH 2026 / ACM MM 2026 proceedings. Knowledge base now 801+ methods.

### Newly Added Methods (September 4, 2026 — Dynamic Scene Survey Integration)

> 23 methods added from dynamic scene reconstruction survey (连振晗 et al., J CAD & CG, Jan 2026). Knowledge base now 859 methods. All arXiv IDs verified.

#### Deformation Field Methods

- **LoopGaussian** [arXiv:2404.08966](https://arxiv.org/abs/2404.08966) (ACM MM 2024) — Loop-based deformation for dynamic 3DGS; temporal loop closure constraints for consistent dynamic reconstruction
- **CoGS** [arXiv:2312.05664](https://arxiv.org/abs/2312.05664) (CVPR 2024) — Controllable 3DGS for dynamic scenes; controllable deformation via Gaussian composition
- **GPS-Gaussian** [arXiv:2312.02155](https://arxiv.org/abs/2312.02155) (CVPR 2024) — Geometry-aware point-spread for dynamic Gaussian splatting; adaptive point-spread for motion blur
- **MoDGS** [arXiv:2406.00434](https://arxiv.org/abs/2406.00434) (ICLR 2025) — Modulated deformation for dynamic 3DGS; frequency-aware modulation for complex motions
- **MoDec-GS** [arXiv:2501.03714](https://arxiv.org/abs/2501.03714) (CVPR 2025) — Motion-decomposed Gaussian splatting; separates rigid and non-rigid motion components
- **SpectroMotion** [arXiv:2410.17249](https://arxiv.org/abs/2410.17249) (CVPR 2025) — Spectral-temporal modeling for long-term dynamic scenes; frequency-domain motion analysis
- **BARD-GS** [arXiv:2503.15835](https://arxiv.org/abs/2503.15835) (CVPR 2025) — Bundle-adjusted rolling shutter for dynamic 3DGS; rolling shutter correction in deformation optimization
- **GauFRE** [arXiv:2312.11458](https://arxiv.org/abs/2312.11458) (WACV 2025) — Gaussian frame-based recursive estimation; temporal frame-to-frame deformation propagation
- **ReconDreamer++** [arXiv:2503.18438](https://arxiv.org/abs/2503.18438) (arXiv 2025) — Reconstruction-dreaming for dynamic driving scenes; joint reconstruction and generative dreaming

#### Sparse-Control Deformation Methods

- **SP-GS** [arXiv:2406.03697](https://arxiv.org/abs/2406.03697) (ICML 2024) — Sparse control points for 3DGS deformation; few-point control reduces overfitting
- **Video-3DGS** [arXiv:2406.02541](https://arxiv.org/abs/2406.02541) (arXiv 2024) — Video-driven 3DGS for dynamic reconstruction; temporal consistency from video priors
- **SplineGS** [arXiv:2412.09982](https://arxiv.org/abs/2412.09982) (CVPR 2025) — Spline-interpolated Gaussian splatting; B-spline trajectory for smooth temporal deformation

#### 4D Gaussian Primitive Methods

- **Real-time 4DGS** [arXiv:2310.10642](https://arxiv.org/abs/2310.10642) (ICLR 2024) — Real-time 4D Gaussian splatting; 4D rotor representation for efficient temporal rendering
- **PVG** [arXiv:2311.18561](https://arxiv.org/abs/2311.18561) (arXiv 2023) — Persistent volumetric Gaussians for 4D scenes; temporal persistence with periodic Gaussian pruning
- **4D-rotor GS** [arXiv:2402.03307](https://arxiv.org/abs/2402.03307) (SIGGRAPH 2024) — 4D rotor-based Gaussian splatting; 4D rotation representation for temporal dynamics

#### Per-Frame Inter-Frame Transfer Methods

- **3DGStream** [arXiv:2403.01444](https://arxiv.org/abs/2403.01444) (CVPR 2024) — 3D Gaussian streaming for real-time dynamic reconstruction; per-frame Gaussian initialization and transfer
- **Dual-GS** [arXiv:2409.08353](https://arxiv.org/abs/2409.08353) (ACM ToG 2024) — Dual-branch Gaussian for dynamic scenes; background-foreground dual-stream decomposition
- **STC-GS** [arXiv:2502.14895](https://arxiv.org/abs/2502.14895) (ICLR 2025) — Spatial-temporal compositional 3DGS; compositional temporal segments for long sequences
- **IGS** [arXiv:2503.16979](https://arxiv.org/abs/2503.16979) (CVPR 2025) — Incremental Gaussian splatting for streaming dynamic scenes; incremental optimization for online reconstruction
- **GFlow** [arXiv:2405.18426](https://arxiv.org/abs/2405.18426) (AAAI 2025) — Gaussian flow for dynamic 3DGS; motion flow estimation with Gaussian trajectory tracking
- **DynOMo** [arXiv:2409.02104](https://arxiv.org/abs/2409.02104) (3DV 2025) — Dynamic online motion for 3DGS; online motion estimation with Gaussian decomposition

### HDR & Relighting / Cross-Domain
- **BRF-GS** [arXiv:2608.31159](https://arxiv.org/abs/2608.31159) (arXiv 2026) — Hyperspectral bidirectional reflectance factor modeling with 3DGS; joint hyperspectral image generation and BRDF reconstruction from multi-view hyperspectral imagery

### Dynamic & 4D
- **SMG** [arXiv:2608.31023](https://arxiv.org/abs/2608.31023) (ECCV 2026) — Semantic Motion Graph for monocular dynamic Gaussian splatting; semantic-motion coupling enables coherent decomposition of complex non-rigid scenes into motion groups
- **Amortized Anchor Refinement** [arXiv:2608.30218](https://arxiv.org/abs/2608.30218) (arXiv 2026) — Deployable continuous-time 4D Gaussian reconstruction with amortized anchor refinement; enables real-time temporal coherent 4D reconstruction from multi-view video
- **ATGS** [arXiv:2608.30184](https://arxiv.org/abs/2608.30184) (SIGGRAPH 2026 / ACM ToG) — Anchored Temporal Gaussian Splatting for long volumetric video representation; temporal anchor points stabilize Gaussian trajectories over extended video sequences

### Language & Semantic / Editing
- **VCAR** [arXiv:2608.30870](https://arxiv.org/abs/2608.30870) (ACM MM 2026) — Training-free 3DGS segmentation via view completeness and axis-aware boundary refinement; no additional training required for high-quality 3D segmentation
- **CapFrame** [arXiv:2608.30342](https://arxiv.org/abs/2608.30342) (ECCV 2026) — Text-instructed viewpoint localization in 3D Gaussian scenes; geometric pseudo-labels bridge language queries and spatial grounding
- **CausalSplat** [arXiv:2608.11150](https://arxiv.org/abs/2608.11150) (arXiv 2026) — Hierarchical causal reasoning in 3DGS; implicit intent understanding + complex spatial relationship comprehension for scene-level causal inference

### CAD & Reverse Engineering
- **RealCAD** [arXiv:2608.30617](https://arxiv.org/abs/2608.30617) (arXiv 2026) — Real-world image to CAD reconstruction; handles domain gap and parametric deviation from imperfect photographs; code and dataset released

### Surface & Rendering
- **ObjectSplat** [arXiv:2608.30423](https://arxiv.org/abs/2608.30423) (arXiv 2026) — Object-level mesh splatting for enhanced mesh fidelity and interactivity; bridges 3DGS and mesh-based representations at object granularity

### Acceleration
- **VoroTracing** [arXiv:2608.17682](https://arxiv.org/abs/2608.17682) (arXiv 2026) — Differentiable ray tracing at 623 FPS (RTX 5090); Voronoi-based traversal with 3.2x throughput over fastest RT methods and 2.8x over 3DGS rasterization

### Generation / Embodied AI
- **Lucida** [arXiv:2608.30821](https://arxiv.org/abs/2608.30821) (arXiv 2026) — Parse-Generate-Place paradigm for Real-to-Sim composable scene modeling; structured scene generation with physical plausibility for embodied AI training

## September 16, 2026 — Daily Update (v0.8.4)

> 39 new methods added (arXiv window 2026-09-02 ~ 2026-09-16). Knowledge base 819 -> 858.

### Optimization
- **RouteBridge** [arXiv:2609.09606](https://arxiv.org/abs/2609.09606) (arXiv 2026) — Reliability-routed bidirectional distillation between NeRF and 3DGS; complementary inductive biases via adaptive routing
- **Compact Neural Appearance** [arXiv:2609.05255](https://arxiv.org/abs/2609.05255) (arXiv 2026) — Compact neural appearance models for efficient 3DGS; shared MLP decodes latent codes, 192->28 bytes per primitive vs SH3
- **TruncGradGS** [arXiv:2609.03534](https://arxiv.org/abs/2609.03534) (Pacific Graphics 2026) — Improved 3DGS via truncated gradient updates; addresses gradient vanishing for robust primitive learning
- **Laplacian Frequency Hierarchies** [arXiv:2609.03334](https://arxiv.org/abs/2609.03334) (Pacific Graphics 2026) — Laplacian frequency hierarchies for efficient 3DGS training; coarse-to-fine frequency-staged, 1.73x speedup

### Surface & Rendering
- **AnyGS2Mesh** [arXiv:2609.03304](https://arxiv.org/abs/2609.03304) (arXiv 2026) — Feed-forward mesh reconstruction from 3DGS with arbitrary-resolution views; Gaussian-guided transformer + TSDF fusion

### Compression & Streaming
- **Deformable 2D Gaussian Splatting** [arXiv:2609.14129](https://arxiv.org/abs/2609.14129) (arXiv 2026) — Deformable 2DGS for efficient 4K UHD video compression; outperforms neural video compression and implicit representations
- **LinearMask-GS** [arXiv:2609.10095](https://arxiv.org/abs/2609.10095) (arXiv 2026) — Stable-mask importance pruning for compact 3DGS; learned-mask pruning with stability guarantees
- **CVT-GS** [arXiv:2609.08730](https://arxiv.org/abs/2609.08730) (arXiv 2026) — Learning to simplify 3DGS with centroidal Voronoi tessellation; reduces Gaussian primitive count
- **CC-4DGS** [arXiv:2609.02184](https://arxiv.org/abs/2609.02184) (IEEE TVCG 2026) — Computational deformation and point-cloud compression for storage-efficient dynamic 4DGS; CDF replaces hash tables (1-3 MB), CCA compresses SH attributes 3-5x, total 20-30 MB

### Acceleration
- **TileGS** [arXiv:2609.03613](https://arxiv.org/abs/2609.03613) (arXiv 2026) — Tile-local depth binning for 3DGS rasterization; 1.44x raster-kernel speedup on RTX 4090, matches gsplat output
- **Atlas** [arXiv:2609.02352](https://arxiv.org/abs/2609.02352) (arXiv 2026) — Algorithm-hardware co-design for on-device city-scale 3DGS in VR; hierarchical memory offloading, 18.5x speedup

### Large-Scale
- **HLC-GS** [arXiv:2609.16772](https://arxiv.org/abs/2609.16772) (arXiv 2026) — Risk-map-guided height-layer consistency 3DGS for DSM reconstruction from optical satellite imagery; reduces MAE 1.46->1.18 m
- **SkyAnchor** [arXiv:2609.13903](https://arxiv.org/abs/2609.13903) (arXiv 2026) — Updating metric-scale aerial 3DGS scenes from unposed ground-view sequences; metric SfM anchor + ground-view update
- **STARS-GS** [arXiv:2609.03447](https://arxiv.org/abs/2609.03447) (arXiv 2026) — Structure-aware regularized 3DGS for large-scale aerial surface reconstruction; F1-score 0.640->0.698 (+9.1%)
- **InceptionGS** [arXiv:2609.02747](https://arxiv.org/abs/2609.02747) (arXiv 2026) — Generative bootstrapping for large-scale 3DGS under unstructured view sampling; balances reconstruction and generation

### Feed-Forward
- **VS-Splat** [arXiv:2609.12343](https://arxiv.org/abs/2609.12343) (arXiv 2026) — Voxel-selective feed-forward 3DGS for end-to-end 3D object reconstruction from sparse views
- **AVSplat** [arXiv:2609.05925](https://arxiv.org/abs/2609.05925) (arXiv 2026) — Dense-view feed-forward 3DGS with assist-view preconditioning; positive view scaling stable in dense-view regime

### Generation
- **GSComplete** [arXiv:2609.08449](https://arxiv.org/abs/2609.08449) (arXiv 2026) — Gaussian splat completion with 2D diffusion priors; fills missing regions of incomplete Gaussian splats
- **Filling the Unseen** [arXiv:2609.13262](https://arxiv.org/abs/2609.13262) (arXiv 2026) — Scene extrapolation via 3DGS; fills unobserved regions and OOD novel views beyond training view distribution
- **SPAR3S** [arXiv:2609.03931](https://arxiv.org/abs/2609.03931) (ECCV 2026) — Sparse voxel-aligned 3D latent generative model for scene completion; learns compact latent space via differentiable 3DGS, masked autoregressive transformer

### Dynamic & 4D
- **FastFlowGS** [arXiv:2609.16310](https://arxiv.org/abs/2609.16310) (arXiv 2026) — Streaming 4DGS for fast-moving subjects from sparse external cameras; fuses sparse matches + optical flow via Kalman temporal update; +12.6% VMAF on Panoptic
- **EdMCGS** [arXiv:2609.08332](https://arxiv.org/abs/2609.08332) (arXiv 2026) — Event-driven Markov chain 3DGS for extreme-low-frame-rate dynamic scene reconstruction from RGB + event stream
- **UniFusion** [arXiv:2609.05888](https://arxiv.org/abs/2609.05888) (ECCV 2026) — Unified spatio-temporal depth alignment for sparse-view 4D reconstruction; spatio-temporal neural fields align cross-view/cross-time depth without masks

### HDR & Relighting
- **LightBridge** [arXiv:2609.02543](https://arxiv.org/abs/2609.02543) (arXiv 2026) — Feed-forward generative relighting for 3DGS; latent bridge diffusion + Gaussian propagation transformer, single-pass

### SLAM
- **PanoGS-SLAM** [arXiv:2609.17387](https://arxiv.org/abs/2609.17387) (arXiv 2026) — First panoramic dense SLAM on 3DGS; spherical-domain differentiable rendering, sphere-consistent photometric loss, depth-guided Gaussian init
- **SCOUT-SLAM** [arXiv:2609.14634](https://arxiv.org/abs/2609.14634) (arXiv 2026) — Structurally-coupled dual-uncertainty 3DGS SLAM; shared-base LoAd tracking uncertainty independent of reconstruction quality
- **LightSplat** [arXiv:2609.07274](https://arxiv.org/abs/2609.07274) (arXiv 2026) — Real-time high-fidelity 3DGS SLAM with loop closure; meets real-time constraints with loop closure support

### Sparse-View
- **Bi-FlowGS** [arXiv:2609.17039](https://arxiv.org/abs/2609.17039) (arXiv 2026) — Bidirectional flow co-refinement bridging generative view completion and Gaussian geometry; V2G/G2V distillation alleviates Geometry Cheating
- **TV-SGS** [arXiv:2609.07734](https://arxiv.org/abs/2609.07734) (arXiv 2026) — Gaussian splatting with geometric information propagation via tensor voting under sparse views

### Human & Avatar
- **GradRig** [arXiv:2609.05127](https://arxiv.org/abs/2609.05127) (arXiv 2026) — Differentiable weights for skinned Gaussian splat deformation; spatial gradient of skinning weights for mesh-free deformation

### Cross-Domain
- **CVQPG** [arXiv:2609.11434](https://arxiv.org/abs/2609.11434) (arXiv 2026) — Complex-valued quadratic phase Gaussian splatting for hologram representation; replaces standard 2D Gaussian in 2DGS
- **Shape-guided X-ray GS** [arXiv:2609.10376](https://arxiv.org/abs/2609.10376) (arXiv 2026) — Shape-guided 3DGS for sparse-view X-ray 3D reconstruction; reduces radiation exposure via shape priors
- **MedGSSR** [arXiv:2609.06874](https://arxiv.org/abs/2609.06874) (arXiv 2026) — Generalizable medical image super-resolution 3D reconstruction via hierarchical feed-forward Gaussian splatting

### Embodied AI & Robotics
- **RIDE** [arXiv:2609.11079](https://arxiv.org/abs/2609.11079) (arXiv 2026) — Relocalization-informed depth estimation with 3DGS; render-match-PnP relocalization supports dense depth estimation
- **PG-Pose** [arXiv:2609.07231](https://arxiv.org/abs/2609.07231) (arXiv 2026) — Generalizable 6D pose estimation of textureless objects with planar-based Gaussian splatting; no CAD prior needed

### Robustness
- **NOVA-GS** [arXiv:2609.12682](https://arxiv.org/abs/2609.12682) (arXiv 2026) — Noise-aware view-consistent 3DGS for low-light novel view synthesis; handles severe sensor noise and low SNR
- **Tri-DehazeGS** [arXiv:2609.11223](https://arxiv.org/abs/2609.11223) (arXiv 2026) — Scene-medium decoupled 3DGS with transmittance-aware optimization for hazy multi-view reconstruction
- **View-Structured Conformal Prediction** [arXiv:2609.10307](https://arxiv.org/abs/2609.10307) (arXiv 2026) — View-structured conformal prediction for 3DGS; certifies rendered view meets prediction coverage via statistical guarantee
- **FujinSplat** [arXiv:2609.06017](https://arxiv.org/abs/2609.06017) (arXiv 2026) — RAW-domain Gaussian splatting seeing through smoke; separates participating medium and ISP in RAW domain
- **Per-View Distractor Filtering** [arXiv:2608.26951](https://arxiv.org/abs/2608.26951) (arXiv 2026) — Training-free distractor filtering in feed-forward 3DGS; excludes per-view Gaussians to identify inconsistent content
- **PriSplat** (ECCV 2026) — Propagating reliable multi-view information for distractor-free 3DGS; 3D-aware inpainting engine; geometry-aware support view selection

### ECCV 2026 New Wave (Sep 2026)
- **Wat3R** [arXiv:2607.08772](https://arxiv.org/abs/2607.08772) (ECCV 2026) — Cross-domain semi-supervised underwater 3D geometry learning without annotations (Cross-Domain)
- **GeoNVS** [arXiv:2603.14965](https://arxiv.org/abs/2603.14965) (ECCV 2026) — Geometry-grounded video diffusion for novel view synthesis; GS-Adapter lifts diffusion features into 3D Gaussians (Feed-Forward)
- **Edit3r** [arXiv:2512.25071](https://arxiv.org/abs/2512.25071) (ECCV 2026) — Instant 3D scene editing from sparse unposed images; SAM2-based recoloring supervision (Editing)
- **SA-ResGS** [arXiv:2601.03024](https://arxiv.org/abs/2601.03024) (ECCV 2026) — Self-augmented residual 3DGS for next-best-view selection; first residual learning for 3DGS (Embodied AI & Robotics)
- **GaussianLens** [arXiv:2509.25603](https://arxiv.org/abs/2509.25603) (ECCV 2026) — Localized high-resolution reconstruction via on-demand Gaussian densification; scales to 1024×1024 (Feed-Forward)
- **Deformable Triangle Splatting** [arXiv:2607.22446](https://arxiv.org/abs/2607.22446) (ECCV 2026) — Flexible primitives with K control points per edge for non-convex shape representation (Surface & Rendering)
- **Neural Harmonic Textures** [arXiv:2604.01204](https://arxiv.org/abs/2604.01204) (ECCV 2026) — Per-primitive learnable feature scaffolds with harmonic decomposition; compatible with 3DGUT/Triangle Splatting/2DGS (Surface & Rendering)
- **CubicSplat** [arXiv:2608.20803](https://arxiv.org/abs/2608.20803) (ECCV 2026) — Differentiable vector graphics via error-bounded forward relaxation; 2dB PSNR improvement (Surface & Rendering)
- **TetraSDF** [arXiv:2511.16273](https://arxiv.org/abs/2511.16273) (ECCV 2026) — Analytic isosurface extraction with multi-resolution tetrahedral grid; exact zero-level-set extraction (Surface & Rendering)
- **Heat Kernel Textures** (ECCV 2026 Best Paper) — Geodesic Gaussians that do not splat; anisotropic heat kernel on non-Euclidean manifolds (Surface & Rendering)
- **GRF-Recon** (ECCV 2026) — Global ray-field optimization for long-sequence feed-forward reconstruction; drift suppression (Feed-Forward)
- **GS-Underwater** [arXiv:2608.25483](https://arxiv.org/abs/2608.25483) (arXiv 2026) — Controlled cross-regime study of Gaussian splatting underwater; five systems benchmarked (Cross-Domain)

### Scene Generation Agent Wave (Sep 2026)
- **SceneSmith** [arXiv:2602.09153](https://arxiv.org/abs/2602.09153) (ICML 2026 Spotlight) — Hierarchical agentic framework for simulation-ready indoor scenes; designer-critic-orchestrator VLM agents; 3-6x more objects, <2% collisions, 96% physics-stable (Embodied AI & Robotics)
- **SceneGenAgent** [arXiv:2410.21909](https://arxiv.org/abs/2410.21909) (ACL 2025) — LLM-based coding agent for precise industrial scene generation via C# code; 81% success rate; SceneInstruct dataset (Generation)
- **SceneConductor** [arXiv:2606.08402](https://arxiv.org/abs/2606.08402) (arXiv 2026) — Multi-agent orchestration for single-image 3D scene generation; three-stage pipeline with geometry-aware layout predictor (Generation)
- **SceneAssistant** [arXiv:2603.12238](https://arxiv.org/abs/2603.12238) (arXiv 2026) — Visual-feedback-driven agent for open-vocabulary 3D scene generation; VLM + atomic operations with iterative visual feedback (Generation)
- **Scenethesis** [arXiv:2505.02836](https://arxiv.org/abs/2505.02836) (ICLR 2026) — Training-free agentic framework integrating LLM planning with vision-guided refinement; judge module verifies spatial coherence (Generation)

### Scene Graph & World Model Wave (Sep 20, 2026 Expansion)

> 3 methods added: scene graph generation from 3DGS, vision-language pretraining on 3DGS, and unified driving world model

- **GaussianGraph** [arXiv:2503.04034](https://arxiv.org/abs/2503.04034) (arXiv 2025) — 3DGS-based scene graph generation with Control-Follow adaptive semantic clustering + 3D spatial relation correction modules for open-world scene understanding (Language & Semantic)
- **SceneSplat** (ICCV 2025 Oral) — Gaussian Splatting-based scene understanding with vision-language pretraining; SceneSplat-7K dataset (7,916 scenes, 112.7B Gaussians); native 3DGS encoder for zero-shot open-vocabulary segmentation; 445.8x faster than per-scene language GS (Language & Semantic)
- **GaussianDWM** [arXiv:2512.23180](https://arxiv.org/abs/2512.23180) (CVPR 2026) — 3D Gaussian Driving World Model unifying scene understanding + multi-modal generation; task-aware language-guided sampling injects compact 3D tokens into LLM; dual-condition generation with high-level language + low-level image conditions (Autonomous Driving)

## September 21, 2026 — Multi-Channel Harvest & Accuracy Overhaul (v0.9.4)

> 来源：arXiv API 多渠道检索（cs.CV / cs.GR / cs.RO / 全库 `"gaussian splatting"`，近 150 天，395 篇候选）+ Semantic Scholar 交叉渠道。
> 核验：ID 可达性（arXiv API 实查）+ 方法名须为论文自述 + 排他（survey/benchmark/dataset）+ 去重（名称/ID）+ 排伪（`v2`/`-full` 等派生后缀）。
> 同时删除 13 条「名称与 arXiv 论文不符」的历史错挂条目。

### Acceleration
- **ABCD** [arXiv:2608.27735](https://arxiv.org/abs/2608.27735) (arXiv 2026) — ABCD (Alpha-Composited Block Coordinate Descent), an out-of-core training framework for alpha-composited radiance fields, instantiated here for 3D Gaussian Splatting
- **ACE-GS** [arXiv:2606.21244](https://arxiv.org/abs/2606.21244) (arXiv 2026) — Progressive optimization framework tailored for accurate, compressed, and efficient scene representation
- **ACEsplat** [arXiv:2606.22091](https://arxiv.org/abs/2606.22091) (arXiv 2026) — Fast per-scene optimization framework that reconstructs 3D Gaussian representations from RGB images and camera poses only, without requiring external 3D priors (e.g., precomputed SfM models or supervised depth maps)
- **DeGS** [arXiv:2608.02099](https://arxiv.org/abs/2608.02099) (arXiv 2026) — To address this issue, we propose DeGS, a scalable architecture for efficient 3DGS inference
- **KC-3DGS** [arXiv:2606.03120](https://arxiv.org/abs/2606.03120) (arXiv 2026) — Augments 3DGS training with wavelet-domain supervision based on natural image statistics
- **Local-GS** [arXiv:2606.16566](https://arxiv.org/abs/2606.16566) (arXiv 2026) — To address this, we present Local-GS, a warp-coherent rendering paradigm that, organizes Gaussian primitives with respect to SIMT (Single Instruction, Multiple Threads) execution boundaries rather than scene geometry
- **REFINE** [arXiv:2606.09074](https://arxiv.org/abs/2606.09074) (arXiv 2026) — Highly accelerated 3DGS pruning framework centered on a novel rendering-free primitive importance metric
- **RoofGS** [arXiv:2608.15785](https://arxiv.org/abs/2608.15785) (arXiv 2026) — Guided by this analysis, we develop RoofGS, a rendering framework that applies bottleneck-specific optimizations rather than generic kernel acceleration
- **SPARE-GS** [arXiv:2607.16624](https://arxiv.org/abs/2607.16624) (arXiv 2026) — Based on this formulation, we propose SPARE-GS, a general plug-and-play framework that dynamically aligns the distribution of 3D Gaussian primitives with regional representational demand
- **TurboGS** [arXiv:2606.15924](https://arxiv.org/abs/2606.15924) (arXiv 2026) — Error-guided training framework that accelerates 3DGS by concentrating optimization on perceptually informative pixels

### Autonomous Driving
- **DecoupleGS** [arXiv:2608.01761](https://arxiv.org/abs/2608.01761) (arXiv 2026) — Extensive experiments demonstrate that DecoupleGS achieves a balanced fidelity-efficiency trade-off, improves metric and photometric consistency
- **ParkingWorld** [arXiv:2605.25029](https://arxiv.org/abs/2605.25029) (arXiv 2026) — Autonomous parking demands precise low-speed maneuvering within narrow, cluttered, and highly constrained environments, where vehicles must navigate tight spaces while avoiding static obstacles and complex geometric boundaries
- **RealityBridge** [arXiv:2606.16278](https://arxiv.org/abs/2606.16278) (arXiv 2026) — Task-oriented curation pipeline to construct training data, and design a four-stage supervised training strategy followed by reward-guided post-training
- **REAP** [arXiv:2605.08713](https://arxiv.org/abs/2605.08713) (arXiv 2026) — Soft predictive collision penalty mechanism to reduce collision rates by penalizing obstacle-approaching actions
- **RoGS** [arXiv:2607.15048](https://arxiv.org/abs/2607.15048) (arXiv 2026) — Adaptive Meshgrid Gaussian for large-scale road surface mapping; combines mesh-based and Gaussian representations for HD map generation and lane-level perception
- **SparseStreet** [arXiv:2606.03909](https://arxiv.org/abs/2606.03909) (arXiv 2026) — Motivated by this, we propose SparseStreet, a general compression framework specifically designed for street scenes

### CAD & Reverse Engineering
- **CADSplat** [arXiv:2609.18473](https://arxiv.org/abs/2609.18473) (arXiv 2026) — Framework that reconstructs photorealistic, geometrically accurate digital twins from sparse (<15 views), wide-baseline posed images of an object by regularizing 3D Gaussian Splatting (3DGS) with an explicit CAD shape prior

### Compression & Streaming
- **AtlasLC** [arXiv:2607.26525](https://arxiv.org/abs/2607.26525) (arXiv 2026) — Source-free, training-free compression pipeline for object-centric 3DGS that operates directly on released Gaussian assets, without original images, camera poses, or per-asset optimization
- **DLGStream** [arXiv:2606.28840](https://arxiv.org/abs/2606.28840) (arXiv 2026) — Novel language-embedded FVV representation that streams time-varying language features alongside Gaussian attributes to support 4D environment interaction, scene editing, and spatial intelligence
- **GenSplatCodec** [arXiv:2607.24403](https://arxiv.org/abs/2607.24403) (arXiv 2026) — Detail-aware feed-forward Gaussian coding scheme within a dual-stream formulation, where the resulting compact Gaussian structural stream is complemented by a lightweight reference appearance stream
- **GS2CI** [arXiv:2608.13502](https://arxiv.org/abs/2608.13502) (arXiv 2026) — Novel framework that reconstructs high-quality 3D scenes from a single SCI measurement by leveraging 3D Gaussian Splatting (3DGS) and the powerful priors of large-scale vision foundation models (VFMs)
- **GS-NFS** [arXiv:2606.05650](https://arxiv.org/abs/2606.05650) (arXiv 2026) — Accelerates dynamic 3DGS compression and decompression on a GPU, to the point where it can encode and decode at full frame rate
- **JSGS** [arXiv:2608.08659](https://arxiv.org/abs/2608.08659) (arXiv 2026) — To address this problem, we propose JPEG State-Guided Supervision for 3D Gaussian Splatting from Mixed-Quality Views (JSGS)
- **KISS-GS** [arXiv:2608.26948](https://arxiv.org/abs/2608.26948) (arXiv 2026) — To make the gains more transparent, we propose KISS-GS, a modular compression pipeline named after the principle of keeping things simple, designed to decouple compression entirely from training
- **MoQSplat** [arXiv:2609.18624](https://arxiv.org/abs/2609.18624) (arXiv 2026) — Maps 3DGS content onto the Media over QUIC (MoQ) transport hierarchy
- **QIRF** [arXiv:2607.18067](https://arxiv.org/abs/2607.18067) (arXiv 2026) — QIRF, a quantum-inspired non-orthogonal function-space compression method for 3D Gaussian Splatting
- **QuARC-GS** [arXiv:2608.18285](https://arxiv.org/abs/2608.18285) (arXiv 2026) — Quantization-aware anchor deformation, which suppresses insignificant motion updates while preserving meaningful deformations, maintaining reconstruction quality under low-storage streaming
- **SpeedyGS** [arXiv:2607.12656](https://arxiv.org/abs/2607.12656) (arXiv 2026) — To systematically address this challenge, we propose SpeedyGS, a Content-Aware 3DGS Compressor that separately optimizes the structural formation and statistical coding
- **SplatStream** [arXiv:2607.25971](https://arxiv.org/abs/2607.25971) (arXiv 2026) — This paper presents SplatStream, a fine granular scalable Gaussian splatting framework for dynamic 3D scene delivery
- **StreamSplat** [arXiv:2608.01659](https://arxiv.org/abs/2608.01659) (arXiv 2026) — Streaming feed-forward 3DGS framework that incrementally maintains a persistent geometry-grounded scene state and decodes it into renderable 3D Gaussians after each input chunk
- **TSOG** [arXiv:2607.28049](https://arxiv.org/abs/2607.28049) (arXiv 2026) — Temporally and Spatially Ordered Gaussians (TSOG), a format for efficient representation of 4D Gaussian Splatting (4DGS) content

### Cross-Domain
- **AquaFlow** [arXiv:2608.22906](https://arxiv.org/abs/2608.22906) (arXiv 2026) — To address these challenges, we propose AquaFlow, a monocular Gaussian Splatting streaming reconstruction framework for efficient and high-fidelity underwater reconstruction
- **CORF-GS** [arXiv:2607.25569](https://arxiv.org/abs/2607.25569) (arXiv 2026) — To bridge this gap, we propose CORF-GS, a real-time WRF reconstruction framework that processes sequential optical and radio frequency (RF) keyframes
- **EndoMD-SLAM** [arXiv:2608.08949](https://arxiv.org/abs/2608.08949) (arXiv 2026) — To address this limitation, we propose EndoMD-SLAM, a framework designed to maintain stability under optical degradation through specialized tracking and mapping mechanisms
- **ExtraGS** [arXiv:2607.12785](https://arxiv.org/abs/2607.12785) (arXiv 2026) — Framework for enhancing endoscopic view extrapolation through diffusion-guided 3D Gaussian Splatting
- **GeoFovea-GS** [arXiv:2607.12641](https://arxiv.org/abs/2607.12641) (arXiv 2026) — To address this issue, this paper proposes GeoFovea-GS as a geometry-aware cross-layer framework for communication-efficient wireless aerial VR
- **GSBF** [arXiv:2608.05896](https://arxiv.org/abs/2608.05896) (arXiv 2026) — Recognizing that radio propagation is intrinsically governed by the physical geometry, we develop a 3D Gaussian splatting for environment-aware beamforming (GSBF) pipeline based on multi-modal data
- **NemoSplat** [arXiv:2608.22888](https://arxiv.org/abs/2608.22888) (arXiv 2026) — To overcome these limitations, we present NemoSplat, the first feed-forward 4D Gaussian Splatting framework tailored for media-aware dynamic reconstruction directly from uncalibrated marine videos
- **OctCGS** [arXiv:2605.22961](https://arxiv.org/abs/2605.22961) (arXiv 2026) — Octree-contextual Gaussian splatting framework that explicitly models the order of bounce jointly over Tx/Rx positions and carrier frequencies
- **PAGS** [arXiv:2608.25472](https://arxiv.org/abs/2608.25472) (arXiv 2026) — PAGS, a differentiable framework for blind autofocusing PACT via speed-of-sound-adaptive Gaussian splatting
- **PanoLess** [arXiv:2607.25362](https://arxiv.org/abs/2607.25362) (arXiv 2026) — Gaussian-splat-based framework that reconstructs the surrounding environment as a distant illumination map from images captured on only one side of a reflective surface
- **RPC-GS** [arXiv:2606.06690](https://arxiv.org/abs/2606.06690) (arXiv 2026) — First Gaussian Splatting framework for satellite imagery that operates natively with Rational Polynomial Camera (RPC) models
- **RxGS** [arXiv:2605.24290](https://arxiv.org/abs/2605.24290) (arXiv 2026) — RxGS, which achieves receiver-generalizable synthesis within a single unified model
- **SatSplat** [arXiv:2606.28581](https://arxiv.org/abs/2606.28581) (arXiv 2026) — First framework to adapt 2D Gaussian Splatting (2DGS) to satellite photogrammetry, with online camera adjustment
- **SatSplatDiff** [arXiv:2606.27223](https://arxiv.org/abs/2606.27223) (arXiv 2026) — To address these limitations, we propose SatSplatDiff, which aims to minimize geometric degradation prevalent in generative refinement
- **Scene2Sound** [arXiv:2608.00463](https://arxiv.org/abs/2608.00463) (arXiv 2026) — Task of generating a spatially consistent soundscape for a given 3DGS world through auditory grounding, identifying which objects in the world should emit sound and anchoring each to a persistent 3D position
- **Splat-based** [arXiv:2608.13159](https://arxiv.org/abs/2608.13159) (arXiv 2026) — Novel physics-inspired, self-calibrating metal artifact reduction method that efficiently reconstructs 3D CBCT volumes while correcting beam hardening artifacts
- **Swimm3R** [arXiv:2608.00950](https://arxiv.org/abs/2608.00950) (arXiv 2026) — Unified framework that combines medium-aware structure-from-motion (SfM) with Underwater Beta Splatting to address scattering- and attenuation-induced failures in underwater 3D reconstruction
- **TR-GS** [arXiv:2608.16042](https://arxiv.org/abs/2608.16042) (arXiv 2026) — Gaussian-splatting framework for sparse view CT volumetric rendering
- **XClipGS** [arXiv:2608.07760](https://arxiv.org/abs/2608.07760) (arXiv 2026) — Treats these as two separate problems: the render-time clip operator and supervision of the hidden interior

### Dynamic & 4D
- **4DGen** [arXiv:2312.17225](https://arxiv.org/abs/2312.17225) (arXiv preprint) — 
- **ACA-GS** [arXiv:2608.04581](https://arxiv.org/abs/2608.04581) (arXiv 2026) — Recent advances in 4D Gaussian Splatting (4DGS) enable high-fidelity, real-time spatiotemporal rendering, but expose a fundamental trade-off between motion expressiveness and storage efficiency
- **ChainSplat** [arXiv:2608.28570](https://arxiv.org/abs/2608.28570) (arXiv 2026) — Physics-inspired framework that jointly learns the 3D geometry, appearance, kinematics, and dynamics of DLOs solely from multi-view RGB videos
- **Comp4D** [arXiv:2403.16993](https://arxiv.org/abs/2403.16993) (WACV 2026) — 
- **CubifyGS** [arXiv:2606.28720](https://arxiv.org/abs/2606.28720) (arXiv 2026) — Object-level mapping framework that shifts dynamic maintenance from passive re-optimization to active asset management
- **D2-4DGS** [arXiv:2608.01588](https://arxiv.org/abs/2608.01588) (arXiv 2026) — To exploit their complementarity, we propose D2-4DGS, a sparse-camera dynamic 4D Gaussian Splatting framework guided by dual-source depth priors
- **DreamGaussian4D** [arXiv:2312.17142](https://arxiv.org/abs/2312.17142) (arXiv preprint) — 
- **DynActiveGS** [arXiv:2608.01178](https://arxiv.org/abs/2608.01178) (arXiv 2026) — Dynamic-aware active reconstruction framework based on 3D Gaussian Splatting (3DGS) for autonomous exploration in dynamic environments
- **ERF-GS** [arXiv:2608.08531](https://arxiv.org/abs/2608.08531) (arXiv 2026) — Event-RGB fusion Gaussian splatting (ERF-GS) framework that integrates event information into both optimization and densification stages of the Gaussian splatting pipeline
- **L2D2-GS** [arXiv:2606.29374](https://arxiv.org/abs/2606.29374) (arXiv 2026) — This paper presents L2D2-GS, a unified framework that reformulates generalizable reconstruction not as a one-shot regression, but as a robust iterative process of optimization and densification
- **LagrangeGS** [arXiv:2608.22773](https://arxiv.org/abs/2608.22773) (arXiv 2026) — Formulates dynamic 3DGS as a non-conservative Lagrangian system
- **Multi4D** [arXiv:2606.22197](https://arxiv.org/abs/2606.22197) (arXiv 2026) — To resolve this, we introduce Multi4D, a framework for high-fidelity dynamic Gaussian Splatting based on multi-level competitive allocation
- **PersistGS** [arXiv:2606.03479](https://arxiv.org/abs/2606.03479) (arXiv 2026) — $textbfPersistGS$, a method that restores object permanence during occlusion by coupling differentiable rigid body simulation with 3D Gaussian Splatting
- **SemDynReg** [arXiv:2606.28656](https://arxiv.org/abs/2606.28656) (arXiv 2026) — Deformable 3D Gaussian Splatting (3DGS) has emerged as an efficient approach for rendering dynamic scenes in a wide range of 3D applications
- **Shape of Motion** [arXiv:2407.13764](https://arxiv.org/abs/2407.13764) (ICCV 2025) — 
- **TC4D** [arXiv:2403.17920](https://arxiv.org/abs/2403.17920) (ECCV 2024) — 

### Editing
- **CoGeo-GS** [arXiv:2608.26656](https://arxiv.org/abs/2608.26656) (arXiv 2026) — Concept-driven framework for controllable multi-object removal in 3D scenes
- **CoIn** [arXiv:2606.27584](https://arxiv.org/abs/2606.27584) (arXiv 2026) — CoIn, a novel framework that bridges 2D inpainting models and 3DGS through a multi-stage consistency pipeline
- **DReSG** [arXiv:2608.29048](https://arxiv.org/abs/2608.29048) (arXiv 2026) — 3D-grounded residual-feedback framework for stylized Gaussian splatting
- **Edit3DGS** [arXiv:2606.17432](https://arxiv.org/abs/2606.17432) (arXiv 2026) — Unified framework for dynamic 3D head editing that integrates 2D instruction-guided diffusion with 3D Gaussian splatting
- **MeGAS** [arXiv:2606.23455](https://arxiv.org/abs/2606.23455) (arXiv 2026) — Novel framework that incorporates thermomechanical phase-change dynamics into 3D Gaussian Splatting (3DGS)
- **TOM-GS** [arXiv:2607.22717](https://arxiv.org/abs/2607.22717) (arXiv 2026) — Editable video representation that forgoes complex deformations in favor of regular 3D Gaussians equipped with a continuous temporal opacity formulation

### Embodied AI & Robotics
- **AirSplan** [arXiv:2609.21226](https://arxiv.org/abs/2609.21226) (arXiv 2026) — Adopts a normalized variant of 3D Gaussian Splatting that encodes high-fidelity scene geometry
- **FastBridge** [arXiv:2607.01200](https://arxiv.org/abs/2607.01200) (arXiv 2026) — Fast quadrotor flight requires safe obstacle avoidance under tight onboard compute limits
- **FlyMirage** [arXiv:2605.19600](https://arxiv.org/abs/2605.19600) (arXiv 2026) — To address these challenges, we introduce FlyMirage, a highly scalable and fully automated data generation pipeline for aerial VLN
- **GaussLite** [arXiv:2606.30809](https://arxiv.org/abs/2606.30809) (arXiv 2026) — Task-driven 3DGS mapping system that conditions its representation density on a natural-language task specification
- **GaussMemory** [arXiv:2608.14986](https://arxiv.org/abs/2608.14986) (arXiv 2026) — Paradigm shift from passive storage to active, task-driven spatial memory
- **LiftNav** [arXiv:2605.31376](https://arxiv.org/abs/2605.31376) (arXiv 2026) — Hybrid navigation framework built on GSFusion's TSDF+GS dual map, augmented with a real-time pipeline of YOLO-based detection, TSDF-based 3D lifting, and B-spline trajectory optimization
- **LOGOS** [arXiv:2606.21527](https://arxiv.org/abs/2606.21527) (arXiv 2026) — To overcome these bottlenecks, we propose LOGOS, a LiDAR-only unified tiny obstacle segmentation system, which models the road surface as a continuous mixture of 2D Gaussian primitives and distinguishes tiny obstacles via
- **ManiSplat** [arXiv:2606.10645](https://arxiv.org/abs/2606.10645) (arXiv 2026) — To address these challenges, we introduce ManiSplat, a unified framework that reconstructs controllable and decoupled Gaussian digital twins directly from monocular ego-view robotic videos
- **PolyMerge** [arXiv:2606.16232](https://arxiv.org/abs/2606.16232) (arXiv 2026) — To address these limitations, we propose PolyMerge to convert a large, photorealistic 3D Gaussian Splatting (3DGS) model of a scene into a lightweight representation of convex polytopes whose union provably over-approximates all
- **ProbSplat** [arXiv:2608.13143](https://arxiv.org/abs/2608.13143) (arXiv 2026) — This paper presents ProbSplat, a Compute-in-Memory (CIM)-inspired architecture based on programmable and energy efficient floating-gate inverter columns for probabilistic computing
- **RefGlass-GS** [arXiv:2606.28826](https://arxiv.org/abs/2606.28826) (arXiv 2026) — Therefore, we propose RefGlass-GS, a fusion framework that enables end-to-end UAV-based photorealistic, semantic, and interactive digitization of reflective glass facades
- **SpotlessGS** [arXiv:2608.14713](https://arxiv.org/abs/2608.14713) (arXiv 2026) — Robots operating in dark or poorly lit environments rely on onboard lights, which often produce uneven illumination that degrades downstream perception tasks

### Feed-Forward
- **AIR** [arXiv:2605.20820](https://arxiv.org/abs/2605.20820) (arXiv 2026) — AIR, a self-supervised feed-forward framework that amortizes iterative Gaussian fitting into a single network pass, eliminating per-image test-time optimization
- **CAT3D** [arXiv:2405.10314](https://arxiv.org/abs/2405.10314) (NeurIPS 2024) — 
- **CUT3R** [arXiv:2501.12387](https://arxiv.org/abs/2501.12387) (CVPR 2025) — 
- **DerainSplat** [arXiv:2608.02191](https://arxiv.org/abs/2608.02191) (arXiv 2026) — Weather net that predicts the weather factors from rainy context and yields two support maps
- **EvTrajGS** [arXiv:2608.08585](https://arxiv.org/abs/2608.08585) (arXiv 2026) — To address this trade-off, this paper presents EvTrajGS, an accurate and efficient 3D Gaussian Splatting framework for unposed event streams
- **FastPano3D** [arXiv:2606.30352](https://arxiv.org/abs/2606.30352) (arXiv 2026) — To address the challenge of rapidly reconstructing detailed 3D indoor scenes from minimal input, we introduce FastPano3D, an end-to-end framework that directly generates renderable 3D Gaussian representations from a single
- **Flash3D** [arXiv:2406.04343](https://arxiv.org/abs/2406.04343) (3DV 2025) — 
- **FlexSplat** [arXiv:2608.07937](https://arxiv.org/abs/2608.07937) (arXiv 2026) — Feed-forward framework for novel view synthesis (NVS) from uncalibrated, object-centric multi-view image collections
- **IBRSteG** [arXiv:2606.30024](https://arxiv.org/abs/2606.30024) (arXiv 2026) — Generalizable framework for 3DGS steganography that enables undetectable concealment of secret scenes within a steganographic scene
- **InstanceSplat** [arXiv:2608.07144](https://arxiv.org/abs/2608.07144) (arXiv 2026) — Unified feed-forward 3DGS framework for generalizable 3D reconstruction and instance-aware scene understanding from pose-free multi-view images
- **Instant NuRec** [arXiv:2607.14203](https://arxiv.org/abs/2607.14203) (arXiv 2026) — Feed-forward neural reconstruction model that turns a short multi-view driving log into a fully simulatable 3D Gaussian Splatting (3DGS) world in a single forward pass
- **MonST3R** [arXiv:2410.03825](https://arxiv.org/abs/2410.03825) (ICLR 2025) — 
- **NoPoSplat** [arXiv:2410.24207](https://arxiv.org/abs/2410.24207) (ICLR 2025) — 
- **OF3GS** [arXiv:2606.03254](https://arxiv.org/abs/2606.03254) (arXiv 2026) — Two mechanisms for causal geometric stability: a Decoupled Intrinsic Recovery Head that mitigates cumulative camera-intrinsic bias and scene-scale jitter
- **ParticleSplat** [arXiv:2609.19463](https://arxiv.org/abs/2609.19463) (arXiv 2026) — Self-supervised object-centric learning method that decomposes scenes into a set of latent ''particles'' representing semantic entities through feedforward 3D Gaussian Splatting
- **ReconFusion** [arXiv:2312.02981](https://arxiv.org/abs/2312.02981) (CVPR 2024) — 
- **ReconSplat** [arXiv:2608.28895](https://arxiv.org/abs/2608.28895) (arXiv 2026) — Feed-forward model for 3D scene reconstruction that aims to address the longstanding trade-off between plausible view generation for unobserved regions and geometric consistency
- **Spann3R** [arXiv:2408.16061](https://arxiv.org/abs/2408.16061) (3DV 2025) — 
- **Splatt3R** [arXiv:2408.13912](https://arxiv.org/abs/2408.13912) (arXiv preprint) — 
- **UniqueSplat** [arXiv:2608.02145](https://arxiv.org/abs/2608.02145) (arXiv 2026) — View-conditioned feed-forward 3D Gaussian Splatting model to reconstruct customized 3D radiance fields for each view query
- **VGGT** [arXiv:2503.11651](https://arxiv.org/abs/2503.11651) (CVPR 2025) — 
- **VoxelTTO** [arXiv:2609.21498](https://arxiv.org/abs/2609.21498) (arXiv 2026) — Feed-forward framework for reconstructing geometrically accurate 3DGS scenes from an arbitrary number of images and optional camera parameters
- **Wild3R** [arXiv:2606.11894](https://arxiv.org/abs/2606.11894) (arXiv 2026) — Feed-forward approach for unconstrained sparse photo collections

### Foundation
- **E3DGS** [arXiv:2607.15536](https://arxiv.org/abs/2607.15536) (arXiv 2026) — Unified geometric-photometric equivariance for 3DGS via Color-as-Geometry embedding; builds SE(3)-equivariant architectures on Gaussian primitives by treating color as geometry
- **SpatialQ** [arXiv:2607.26595](https://arxiv.org/abs/2607.26595) (arXiv 2026) — 3D Gaussian Splatting (3DGS) has emerged as an effective representation for novel view synthesis and 3D scene reconstruction, creating an increasing demand for reliable quality assessment
- **UniTriSplat** [arXiv:2606.29794](https://arxiv.org/abs/2606.29794) (arXiv 2026) — To address this limitation, we propose UniTriSplat, a unified 3DGS framework for universal cameras that reformulates Gaussian splatting on the unit sphere via HEALPix discretization

### Generation
- **DualDiff3D** [arXiv:2609.01516](https://arxiv.org/abs/2609.01516) (arXiv 2026) — Novel pipeline that leverages dual diffusion priors with a Structure-Appearance Attention (SAA) module to introduce reference guidance for refining low-quality novel views rendered from flawed 3D representations
- **FillGauss** [arXiv:2607.17773](https://arxiv.org/abs/2607.17773) (arXiv 2026) — Building on this dataset, we propose a novel generative framework (FillGauss) that integrates 3D Gaussian Splatting (3DGS) with internal state conditioning for sound generation
- **FillGS** [arXiv:2607.29284](https://arxiv.org/abs/2607.29284) (arXiv 2026) — 4D Gaussian Splatting (4DGS) can render dynamic scenes photorealistically
- **FlowObject** [arXiv:2606.19019](https://arxiv.org/abs/2606.19019) (arXiv 2026) — Framework that reformulates sparse-view 3D reconstruction as a training-free, guided inverse problem
- **FLUX3D** [arXiv:2606.24874](https://arxiv.org/abs/2606.24874) (arXiv 2026) — To address these issues, we propose FLUX3D, a scalable image-to-3DGS framework that boosts both representation learning and cross-modal alignment during generation
- **GaussVid** [arXiv:2608.21849](https://arxiv.org/abs/2608.21849) (arXiv 2026) — Novel 3D-aware video restoration framework designed to enhance the quality of sparse 3DGS reconstruction
- **GS-Voxel** [arXiv:2608.17988](https://arxiv.org/abs/2608.17988) (arXiv 2026) — Fitting-free structured latent framework, and evaluate it for large-scale aerial 3D Gaussian scene generation
- **InfiniSplat** [arXiv:2608.02437](https://arxiv.org/abs/2608.02437) (arXiv 2026) — Feed-forward single-image 3DGS framework that moves from a pixel-aligned representation toward a surface-aligned representation
- **X-Splat** [arXiv:2607.02099](https://arxiv.org/abs/2607.02099) (arXiv 2026) — First Gaussian Splatting framework for generating CBCT-like 3D dental volumes from a single PXR

### HDR & Relighting
- **AEGIR** [arXiv:2606.28635](https://arxiv.org/abs/2606.28635) (arXiv 2026) — Framework that explicitly models local area emitters within a relightable Gaussian Splatting representation
- **AIGS-Net** [arXiv:2606.17998](https://arxiv.org/abs/2606.17998) (arXiv 2026) — To address this issue, this paper proposes an Adaptive Illumination Gaussian Splatting Network (AIGS-Net), an ultra-lightweight architecture for fast low-light enhancement
- **DR-GS** [arXiv:2606.29379](https://arxiv.org/abs/2606.29379) (arXiv 2026) — To address these challenges, we propose Deformable and Relightable GS (DR-GS), a unified Gaussian framework that integrates physically-based inverse rendering, relighting, and deformation-aware manipulation
- **GS-PI** [arXiv:2609.19907](https://arxiv.org/abs/2609.19907) (arXiv 2026) — Multi-scale cross-view conditioning mechanism that integrates three complementary components: a global semantic prior, source-anchored photometric cues, and an absolute spatial learned view-direction conditioning signal
- **LIT-GS** [arXiv:2606.20424](https://arxiv.org/abs/2606.20424) (arXiv 2026) — LiDAR-inertial-thermal Gaussian Splatting framework that injects LiDAR-derived plane geometry as an explicit constraint in both pose/structure refinement and Gaussian optimization
- **MaterialClusterGS** [arXiv:2606.09018](https://arxiv.org/abs/2606.09018) (arXiv 2026) — Palette-based material decomposition framework for 2D Gaussian Splatting that enables physically based relighting and material editing
- **Large Material Gaussian Model** [arXiv:2509.22112](https://arxiv.org/abs/2509.22112) (arXiv 2025) — Large-scale material-aware Gaussian model for relightable 3D asset generation

### Human & Avatar
- **EmoZone-Talker** [arXiv:2606.15848](https://arxiv.org/abs/2606.15848) (arXiv 2026) — Novel framework that reformulates audio-driven facial animation as a structured spatial-temporal coordination problem under cross-modal conflicts
- **GaussianEmoTalker** [arXiv:2607.00959](https://arxiv.org/abs/2607.00959) (arXiv 2026) — Audio-driven framework for real-time emotional talking head synthesis based on 3D Gaussian Splatting
- **G-Skin** [arXiv:2608.01726](https://arxiv.org/abs/2608.01726) (arXiv 2026) — To address this challenging problem, we propose G-Skin, a novel generative skinning framework designed for expressive and high-fidelity animation with 3D Gaussian representation
- **Hand-4DGS** [arXiv:2606.19156](https://arxiv.org/abs/2606.19156) (arXiv 2026) — To address these challenges, we introduce Hand-4DGS, the first feed-forward framework for reconstructing dynamic 4D hands directly from egocentric videos, enabling both fast (~60 FPS) inference and strong generalization
- **OASIS** [arXiv:2607.29633](https://arxiv.org/abs/2607.29633) (arXiv 2026) — Tailored 3D Gaussian Splatting framework for single-image hand avatar reconstruction
- **PD-GS** [arXiv:2608.05218](https://arxiv.org/abs/2608.05218) (arXiv 2026) — TextbfPhoneme-Driven Gaussian Splatting (PD-GS), which augments a 3DGS talker with time-aligned phoneme tokens obtained from an automatic ASR and forced-alignment pipeline
- **RAGA** [arXiv:2606.29329](https://arxiv.org/abs/2606.29329) (arXiv 2026) — RAGA, a Ray-Traced Gaussian Shadow Casting formulation based on exact ray-Gaussian line integrals
- **S-Avatar** [arXiv:2607.28164](https://arxiv.org/abs/2607.28164) (arXiv 2026) — Novel method for generating photorealistic 3D head avatars from a single image using a diffusion-guided 3D model generation module and strategies for animating 3D Gaussian Splatting (3DGS)
- **SpatialAvatar-0** [arXiv:2606.15659](https://arxiv.org/abs/2606.15659) (arXiv 2026) — 10K-iter layout-preserving per-subject refinement loop that freezes the FLAME-binding and Gaussian count and replaces densification with a three-component anti-spike regularization

### Language & Semantic
- **CDSeg** [arXiv:2608.05482](https://arxiv.org/abs/2608.05482) (arXiv 2026) — Cross-Domain Segmentation via Gaussian Splatting (CDSeg), a label-transfer interface that requires no task-specific 3D segmentation training and uses Gaussian primitives as a renderable label carrier
- **CoRef-GS** [arXiv:2609.20586](https://arxiv.org/abs/2609.20586) (arXiv 2026) — Cooperative referring Gaussian splatting framework
- **GroupForward** [arXiv:2608.17535](https://arxiv.org/abs/2608.17535) (arXiv 2026) — To this end, we propose GroupForward, an instance-grouped feed-forward Gaussian splatting model that reconstructs geometry, appearance, instance structure, and semantics from sparse, unposed, and uncalibrated multi-view images

### Large-Scale

### Optimization

### Robustness
- **Dehaze-GaussianImage** [arXiv:2606.16163](https://arxiv.org/abs/2606.16163) (arXiv 2026) — To address these issues, we propose Dehaze-GaussianImage, the first zero-shot framework that introduces 2D Gaussian Splatting (2DGS) into the image dehazing domain to break the traditional pixel-grid processing paradigm
- **Fi-Gaussian** [arXiv:2606.16168](https://arxiv.org/abs/2606.16168) (arXiv 2026) — To address these issues, we propose Fi-Gaussian, a frequency-aware implicit Gaussian splatting network for single image dehazing
- **JADE-GS** [arXiv:2607.14990](https://arxiv.org/abs/2607.14990) (arXiv 2026) — Formulates the combination of these priors as spatial evidence allocation
- **WilLaGS** [arXiv:2608.28240](https://arxiv.org/abs/2608.28240) (arXiv 2026) — To address these limitations, we propose textbfWilLaGS, a unified framework for robust 3D scene reconstruction and generative appearance synthesis under unconstrained settings

### SLAM
- **Cube-Splat** [arXiv:2609.21347](https://arxiv.org/abs/2609.21347) (arXiv 2026) — First panoramic GS-SLAM framework that factorizes each 360° frame into a cubemap of four fixed-orientation virtual pinhole views sharing a single optical center
- **EliGSiR** [arXiv:2609.20348](https://arxiv.org/abs/2609.20348) (arXiv 2026) — Continual Gaussian mapper that controls how the available optimization budget is used as the reconstruction evolves
- **ImprovedVBGS** [arXiv:2607.15542](https://arxiv.org/abs/2607.15542) (arXiv 2026) — Real-time continual Variational Bayes GS; improved CAVI with per-frame subset updates instead of full-observation iterations; enables on-the-fly SLAM without replay buffers
- **MMD-SLAM** [arXiv:2606.19874](https://arxiv.org/abs/2606.19874) (arXiv 2026) — To address these limitations, we propose MMD-SLAM, a structure-enhanced Visual SLAM framework that leverages the Atlanta World (AW) assumption to guide a Multi-Meta Gaussian representation for photorealistic mapping
- **MoonSplat** [arXiv:2606.17935](https://arxiv.org/abs/2606.17935) (arXiv 2026) — Our code and data are available at https://github.com/TrickyGo/MoonSplat
- **MoPe** [arXiv:2606.29237](https://arxiv.org/abs/2606.29237) (arXiv 2026) — We realize this principle in MoPe, a memory-aware uncertainty filter for monocular Gaussian mapping
- **MyGO-Splat** [arXiv:2606.29738](https://arxiv.org/abs/2606.29738) (arXiv 2026) — Closed-loop Gaussian SLAM framework that analytically rasterizes Gaussian primitives into pixel-wise depth and surface normals, allowing the map to actively supervise camera pose optimization
- **Pocket-SLAM** [arXiv:2606.24796](https://arxiv.org/abs/2606.24796) (arXiv 2026) — Rendering-area-aware pruning strategy that selectively removes Gaussians based on their contribution to the effective rendering area, rather than solely relying on Gaussian-level heuristics such as opacity or gradient magnitude
- **RawSLAM** [arXiv:2609.20589](https://arxiv.org/abs/2609.20589) (arXiv 2026) — To the best of our knowledge, the first online Gaussian SLAM framework that tracks and maps directly on single-exposure 16-bit linear HDR imagery
- **RoSe-SLAM** [arXiv:2608.29003](https://arxiv.org/abs/2608.29003) (arXiv 2026) — Robust Semantic-aware Gaussian Splatting SLAM (RoSe-SLAM), to address the dynamic challenge by a holistic semantic scene understanding from uncalibrated monocular inputs
- **SplatlessDF** [arXiv:2606.13990](https://arxiv.org/abs/2606.13990) (arXiv 2026) — In this paper, building on this principle, we introduce SplatlessDF, a continuous distance field (DF) mapping framework that uses anisotropic Gaussian elements from a spatial rather than photometric perspective
- **Structured-Li-GS** [arXiv:2606.27509](https://arxiv.org/abs/2606.27509) (arXiv 2026) — In this study, we develop a Structured framework for Gaussian Splatting (3DGS) with LiDAR integration (Structured-Li-GS)
- **VGGT-GS SLAM** [arXiv:2609.19628](https://arxiv.org/abs/2609.19628) (arXiv 2026) — Monocular 3D Gaussian Splatting SLAM system designed for uncalibrated videos

### Security
- **GhostSplat** [arXiv:2608.29184](https://arxiv.org/abs/2608.29184) (arXiv 2026) — Input-triggered backdoor that installs such behavior in feed-forward 3DGS
- **NGS-Marker** [arXiv:2608.17447](https://arxiv.org/abs/2608.17447) (arXiv 2026) — Novel native watermarking framework for 3DGS

### Simulation
- **LaGSplat** [arXiv:2608.16324](https://arxiv.org/abs/2608.16324) (arXiv 2026) — Framework that infers interactive, physics-governed dynamics from one or a few monocular videos
- **WildFireGS** [arXiv:2608.11100](https://arxiv.org/abs/2608.11100) (arXiv 2026) — Particle-based combustion model that operates natively on Gaussian representations, simulating ignition, heat transfer, combustion, and flame propagation across complex forest structures

### Sparse-View
- **AugSplat** [arXiv:2606.31556](https://arxiv.org/abs/2606.31556) (arXiv 2026) — Simple framework for improving Gaussian Splatting in sparse-view regimes using radiance-field-based view augmentation

### Surface & Rendering
- **BEAST3D** [arXiv:2606.02937](https://arxiv.org/abs/2606.02937) (arXiv 2026) — We address these limitations with BEAST3D, a self-supervised pretraining framework that learns 3D visual representations from unlabeled, calibrated multi-view video
- **CoMVS-GS** [arXiv:2608.18413](https://arxiv.org/abs/2608.18413) (arXiv 2026) — General surface reconstruction framework that combines Multi-View Stereo with Gaussian splatting
- **Elastic Triangle Splatting** [arXiv:2608.29106](https://arxiv.org/abs/2608.29106) (arXiv 2026) — While neural rendering methods such as 3D Gaussian Splatting achieve remarkable visual fidelity, traditional polygonal meshes remain the backbone of established graphics pipelines
- **G2ARD-GS** [arXiv:2608.05704](https://arxiv.org/abs/2608.05704) (arXiv 2026) — Geometry-guided distillation method that converts a dense Gaussian prior instantiated either as a training-free point-cloud lift or a trained GS model into a compact, reusable representation
- **G2SR** [arXiv:2607.14470](https://arxiv.org/abs/2607.14470) (arXiv 2026) — G2SR, which exploits a well-posed core of the task: given cross-view 2D splat correspondences, 3D splats follow analytically from multi-view geometry
- **GaussFusion** [arXiv:2607.05906](https://arxiv.org/abs/2607.05906) (arXiv 2026) — Multimodal pre-training framework for 3D Gaussian representations
- **Gaussian-JEPA** [arXiv:2608.15651](https://arxiv.org/abs/2608.15651) (arXiv 2026) — Predicts representations of held-out Gaussian token blocks from visible context
- **Gaussian Sculpting** [arXiv:2608.10602](https://arxiv.org/abs/2608.10602) (arXiv 2026) — To address these issues, we propose Gaussian Sculpting, a fully differentiable end-to-end framework for high-quality surface reconstruction
- **GS-CPE** [arXiv:2608.10938](https://arxiv.org/abs/2608.10938) (arXiv 2026) — This study introduces GS-CPE (Gaussian Splatting based Camera Pose Estimation), a coarse-to-fine framework for 6-DoF camera pose estimation that unifies geometry-based coarse pose estimation with robust 3D Gaussian Splatting
- **HiCo-GS** [arXiv:2608.14136](https://arxiv.org/abs/2608.14136) (arXiv 2026) — High-fidelity reconstruction framework with two complementary modules
- **Manifold-GS** [arXiv:2608.00214](https://arxiv.org/abs/2608.00214) (arXiv 2026) — Certified hybrid asset layer for Gaussian scenes
- **Mesh2GS** [arXiv:2606.21898](https://arxiv.org/abs/2606.21898) (arXiv 2026) — Instead of relying on heuristic strategies that bind 3D Gaussians to the mesh, we propose a novel white-box 3DGS construction framework, termed Mesh2GS
- **QuerySplat** [arXiv:2608.01186](https://arxiv.org/abs/2608.01186) (arXiv 2026) — To overcome these deficiencies, we propose textbfQuerySplat, a feed-forward 3DGS framework driven by geometric priors and explicit appearance decoupling
- **SplashSplat** [arXiv:2609.20818](https://arxiv.org/abs/2609.20818) (arXiv 2026) — Built on a single principle: impose physical structure only where the observations can constrain it
- **StructureGS** [arXiv:2607.26889](https://arxiv.org/abs/2607.26889) (arXiv 2026) — To address this limitation, we introduce StructureGS, a reconstruction framework for articulated objects that integrates structure-aware guidance into 3D Gaussian Splatting
- **TopoSurfel** [arXiv:2608.20687](https://arxiv.org/abs/2608.20687) (arXiv 2026) — To address this limitation, we propose TopoSurfel, a novel framework that closes the loop between Gaussian surfels and continuous meshes

### World Models & Spatial Intelligence
