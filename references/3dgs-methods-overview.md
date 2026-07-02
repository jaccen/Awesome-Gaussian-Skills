---
---
---
---
---
---
---
## Newly Added Methods (May 2026 Expansion)

> 279 methods added from ECCV/NeurIPS/CVPR 2024-2025 backfill


### Autonomous Driving
- **GaussianBeV** [arXiv:2403.11056](https://arxiv.org/abs/2403.11056) (ECCV 2024) — BEV perception via Gaussian Splatting: lifting 2D features into 3D Gaussian BEV representation
- **GS-OD** [arXiv:2503.08135](https://arxiv.org/abs/2503.08135) (CVPR 2025) — GS-based 3D object detection with Gaussian-anchored feature sampling
- **SplatAD** [arXiv:2503.08352](https://arxiv.org/abs/2503.08352) (CVPR 2025) — Autonomous driving GS with dynamic object decomposition and sensor simulation
- **GaussianAT** [arXiv:2503.10143](https://arxiv.org/abs/2503.10143) (CVPR 2025) — Attention-based GS for driving scene with temporal-aware Gaussian aggregation
- **HGS-Det** [arXiv:2503.12535](https://arxiv.org/abs/2503.12535) (CVPR 2025) — Hierarchical GS for 3D detection with multi-scale Gaussian features
- **GaussOcc** [arXiv:2503.14029](https://arxiv.org/abs/2503.14029) (CVPR 2025) — GS-based 3D occupancy prediction with Gaussian-anchored dense features
- **GaussianSSC** [arXiv:2503.17032](https://arxiv.org/abs/2503.17032) (CVPR 2025) — GS-based 3D semantic scene completion with Gaussian-anchored feature lifting
- **GausCtrl-AD** [arXiv:2503.19913](https://arxiv.org/abs/2503.19913) (CVPR 2025) — Controllable GS generation for AD simulation with layout conditioning
- **Splat-TOD** [arXiv:2503.21442](https://arxiv.org/abs/2503.21442) (CVPR 2025) — GS-based 3D object detection with sparse Gaussian proposal generation
- **GaussDet3D** [arXiv:2504.00665](https://arxiv.org/abs/2504.00665) (CVPR 2025) — 3D detection from GS with Gaussian-anchored multi-scale features
- **SplatAD-v2** [arXiv:2504.00763](https://arxiv.org/abs/2504.00763) (CVPR 2025) — Enhanced driving GS with multi-sensor fusion and sim-to-real transfer
- **SplatRS** [arXiv:2504.01503](https://arxiv.org/abs/2504.01503) (CVPR 2025) — GS-based road surface reconstruction for HD map generation
- **GS-Drive** [arXiv:2504.17810](https://arxiv.org/abs/2504.17810) (CVPR 2025) — GS-based closed-loop driving simulation with dynamic agent rendering
- **P2GS** [arXiv:2605.16925](https://arxiv.org/abs/2605.16925) (CVPR 2026) — Physical prior-guided GS for photometrically consistent urban reconstruction: joint decomposition of HDR radiance + per-view exposure scales from LDR images
- **GEM** [arXiv:2605.17682](https://arxiv.org/abs/2605.17682) (arXiv 2026) — Gaussian Evolution Model for non-autoregressive occupancy forecasting: continuous 4D Gaussian primitives with learned dynamics for motion planning
- **3DGS Safety Evaluation for AD** [arXiv:2605.01995](https://arxiv.org/abs/2605.01995) (arXiv 2026) -- Industrial-fidelity AD scene reconstruction evaluation
- **Asset Harvester** [arXiv:2604.18468](https://arxiv.org/abs/2604.18468) (arXiv 2026) -- AV log → simulation-ready 3D assets via SparseViewDiT
- **Street-GS** (arXiv 2024) -- LiDAR-camera fusion + multi-view optimization
- **Nighttime AD GS** [arXiv:2602.13549](https://arxiv.org/abs/2602.13549) (arXiv 2026) -- PBR + BRDF for nighttime driving scene reconstruction
- **ConFixGS** [arXiv:2605.09688](https://arxiv.org/abs/2605.09688) (arXiv 2026) -- Confidence-aware diffusion priors for fixing feedforward 3DGS; +3.68 dB PSNR ...
- **GaussianLSS** (CVPR 2025) -- BEV perception via Gaussian Splatting
- **Ground4D** [arXiv:2605.04435](https://arxiv.org/abs/2605.04435) (arXiv 2026) -- Spatially-grounded feedforward 4D for off-road reconstruction
- **GSDrive** [arXiv:2604.28111](https://arxiv.org/abs/2604.28111) (arXiv 2026) -- 3DGS-based RL reward shaping for driving policy improvement
- **ADS-GS** (arXiv 2024) -- Static + dynamic decomposition for driving scenes

### CAD / Mesh / Hybrid Methods
- **GS-CAD** [arXiv:2410.17249](https://arxiv.org/abs/2410.17249) (CVPR 2025) — CAD model reconstruction from GS with parametric primitive fitting
- **GaussCAD** [arXiv:2503.19358](https://arxiv.org/abs/2503.19358) (CVPR 2025) — CAD reconstruction from GS with parametric primitive extraction
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
- **CompactGS** [arXiv:2404.04908](https://arxiv.org/abs/2404.04908) (ECCV 2024) — Vector quantization + learned codebook for compact Gaussian attribute storage
- **RDO-Gaussian** [arXiv:2406.01597](https://arxiv.org/abs/2406.01597) (ECCV 2024) — End-to-end rate-distortion optimization: dynamic pruning + ECVQ quantization for 40x+ compression with continuous rate control
- **Sp2403GS** [arXiv:2312.09147](https://arxiv.org/abs/2312.09147) (CVPR 2024) — Sparse GS representation with importance-based pruning + codebook quantization
- **FAD-GS** [arXiv:2404.10625](https://arxiv.org/abs/2404.10625) (CVPR 2024) — Frequency-aware decomposition for GS compression: separating low/high frequency Gaussians
- **CompGS** [arXiv:2411.06019](https://arxiv.org/abs/2411.06019) (CVPR 2025) — Compact GS with learned importance-aware quantization + progressive decoding
- **SpreG** [arXiv:2411.10504](https://arxiv.org/abs/2411.10504) (CVPR 2025) — Separable Gaussian representation factorizing covariance for efficient storage
- **HybridGS** [arXiv:2411.11921](https://arxiv.org/abs/2411.11921) (CVPR 2025) — Hybrid GS compression combining explicit pruning + implicit neural coding
- **HGS** [arXiv:2411.12089](https://arxiv.org/abs/2411.12089) (CVPR 2025) — Hierarchical GS progressive streaming with level-of-detail Gaussian structuring
- **GaussianCodec** [arXiv:2411.14716](https://arxiv.org/abs/2411.14716) (CVPR 2025) — Learned Gaussian codec with entropy-constrained quantization for rate-distortion optimization
- **GS-Stream** [arXiv:2411.14974](https://arxiv.org/abs/2411.14974) (CVPR 2025) — Progressive Gaussian streaming for bandwidth-adaptive 3DGS delivery
- **SOG-GS** [arXiv:2411.16443](https://arxiv.org/abs/2411.16443) (CVPR 2025) — Structured-omni-group GS: channel-grouped quantization preserving inter-Gaussian correlations
- **ZipGS** [arXiv:2411.16785](https://arxiv.org/abs/2411.16785) (CVPR 2025) — Zip-format GS compression using pruning+quantization+volumetric entropy coding
- **SpqGS** [arXiv:2411.16816](https://arxiv.org/abs/2411.16816) (CVPR 2025) — Scalable parallel quantization for GS with hardware-friendly bit allocation
- **VQGS** [arXiv:2411.17067](https://arxiv.org/abs/2411.17067) (CVPR 2025) — Vector-quantized GS with residual codebook learning for high-ratio compression
- **GSQ** [arXiv:2411.17190](https://arxiv.org/abs/2411.17190) (CVPR 2025) — Gaussian Splatting Quantization with learned step size + group-wise quantization
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
- **GaussVis** [arXiv:2503.01610](https://arxiv.org/abs/2503.01610) (CVPR 2025) — GS-based visualization for scientific data with interactive exploration
- **GS-VQA** [arXiv:2503.23297](https://arxiv.org/abs/2503.23297) (CVPR 2025) — GS quality assessment via view-consistent quality prediction
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
- **Fake3DGS** [arXiv:2604.27590](https://arxiv.org/abs/2604.27590) (ICPR 2026) -- Benchmark for 3D manipulation detection in neural rendering
- **SplAttN** [arXiv:2605.01466](https://arxiv.org/abs/2605.01466) (ICML 2026) -- Gaussian soft splatting for point cloud completion
- **Habitat-GS** (arXiv 2024) -- 3DGS-rendered simulator for robot navigation training
- **GS-DOT** [arXiv:2604.23675](https://arxiv.org/abs/2604.23675) (arXiv 2026) -- Diffuse optical tomography via Gaussian Splatting
- **OCH3R** [arXiv:2605.13018](https://arxiv.org/abs/2605.13018) (arXiv 2026) -- Object-Centric Holistic 3D from single RGB; per-pixel CLIP + 6D pose + per-ob...
- **EmoTaG** [arXiv:2603.21332](https://arxiv.org/abs/2603.21332) (CVPR 2026) -- Few-shot emotion-aware talking head on Gaussian Splatting
- **TwinPose** (SIGGRAPH 2026) -- Multi-view 3D pose estimation via person-specific subspaces
- **LagrangianSplats** [arXiv:2605.09299](https://arxiv.org/abs/2605.09299) (arXiv 2026) -- Divergence-free constraint on Gaussian advection for fluid velocity field rec...
- **AudioGS** [arXiv:2604.08967](https://arxiv.org/abs/2604.08967) (arXiv 2026) -- Spectrogram-based audio Gaussian Splatting for sound field reconstruction
- **PG-3DGS** [arXiv:2605.11266](https://arxiv.org/abs/2605.11266) (arXiv 2026) -- Differentiable physics simulation coupled with 3D Gaussian representations; p...
- **Mobile Phone 3DGS Acquisition** [arXiv:2604.19216](https://arxiv.org/abs/2604.19216) (arXiv 2026) -- Object-centered on-device capture guidance
- **Egocentric Dynamic 3DGS Evaluation** [arXiv:2604.23803](https://arxiv.org/abs/2604.23803) (CVPR 2026) -- Egocentric video reconstruction evaluation
- **SandSim** [arXiv:2604.27572](https://arxiv.org/abs/2604.27572) (arXiv 2026) -- Curve-guided GS for sand painting process reconstruction
- **CoherentRaster** [arXiv:2605.04509](https://arxiv.org/abs/2605.04509) (arXiv 2026) -- Subpixel-level 3DGS rasterization for light field displays
- **GS-STVSR** [arXiv:2604.18047](https://arxiv.org/abs/2604.18047) (arXiv 2026) -- Ultra-efficient continuous spatio-temporal video super-resolution via 2D Gaus...

### Dynamic Scene Methods
- **NeuroGauss4D-PCI** [arXiv:2405.14241](https://arxiv.org/abs/2405.14241) (NeurIPS 2024) — 4D neural field + Gaussian deformation fields for point cloud interpolation [Code](https://github.com/jiangchaokang/NeuroGauss4D-PCI)
- **HDR-GS** [arXiv:2405.15125](https://arxiv.org/abs/2405.15125) (NeurIPS 2024) — HDR-specific GS luminance encoding + fast tonemapping for 1000x HDR view synthesis [Code](https://github.com/caiyuanhao1998/HDR-GS)
- **Vidu4D** [arXiv:2405.16822](https://arxiv.org/abs/2405.16822) (NeurIPS 2024) — Dynamic Gaussian Surfels for single-video to 4D reconstruction [Code](https://github.com/yikaiw/vidu4d)
- **Dynamic3DGS-Urban** [arXiv:2406.03175](https://arxiv.org/abs/2406.03175) (NeurIPS 2024) — MAP4D: static background + dynamic instance decomposition for urban dynamic scenes [Code](https://github.com/tobiasfshr/map4d)
- **L4GM** [arXiv:2406.10324](https://arxiv.org/abs/2406.10324) (NeurIPS 2024) — Large-scale feed-forward 4D Gaussian reconstruction from video
- **DreamMesh4D** [arXiv:2410.06756](https://arxiv.org/abs/2410.06756) (NeurIPS 2024) — Sparse-controlled Gaussian-Mesh hybrid 4D generation [Code](https://github.com/WU-CVGL/DreamMesh4D)
- **MotionGS** [arXiv:2410.07707](https://arxiv.org/abs/2410.07707) (NeurIPS 2024) — Explicit motion field guiding deformable 3DGS, decoupling motion from appearance
- **DN-4DGS** [arXiv:2410.13607](https://arxiv.org/abs/2410.13607) (NeurIPS 2024) — Denoised deformable network with temporal-spatial aggregation for dynamic scene rendering [Code](https://github.com/peoplelu/DN-4DGS)
- **FullyExplicitDynGS** [arXiv:2410.15629](https://arxiv.org/abs/2410.15629) (NeurIPS 2024) — No-MLP directly parameterized dynamic Gaussian trajectories, fully explicit representation
- **Grid4D** [arXiv:2410.20815](https://arxiv.org/abs/2410.20815) (NeurIPS 2024) — 4D decomposed hash encoding for efficient spatiotemporal Gaussian queries in dynamic GS [Code](https://github.com/JiaweiXu8/Grid4D)
- **HiCoM** [arXiv:2411.07541](https://arxiv.org/abs/2411.07541) (NeurIPS 2024) — Hierarchical coherent motion for streamable dynamic scene with 3DGS [Code](https://github.com/gqk/HiCoM)
- **4DGS-Wild** [arXiv:2411.08879](https://arxiv.org/abs/2411.08879) (NeurIPS 2024) — Uncertainty-aware regularization for 4DGS from unconstrained videos
- **SK-GS** [arXiv:2412.05570](https://arxiv.org/abs/2412.05570) (NeurIPS 2024) — Template-free articulated GS with skeleton auto-discovery + articulated deformation fields [Code](https://github.com/dnvtmf/SK_GS)
- **SpacetimeGS** [arXiv:2405.12110](https://arxiv.org/abs/2405.12110) (ECCV 2024) — Spacetime Gaussian representation unifying spatial and temporal dimensions in single primitive
- **MD-Splatting** [arXiv:2407.02945](https://arxiv.org/abs/2407.02945) (ECCV 2024) — Multi-dynamic Gaussian Splatting: decomposing monocular video into multiple dynamic object layers
- **Splat-MO** [arXiv:2407.04237](https://arxiv.org/abs/2407.04237) (ECCV 2024) — Moving object discovery and reconstruction in 4DGS with motion-based Gaussian grouping
- **SAGD** [arXiv:2407.15070](https://arxiv.org/abs/2407.15070) (ECCV 2024) — Self-supervised articulated Gaussian discovery: automatic part segmentation + articulation estimation without supervision
- **Dynamic3DGaussians** [arXiv:2309.13101](https://arxiv.org/abs/2309.13101) (CVPR 2024) — Per-point deformation network for monocular dynamic scene reconstruction with temporal Gaussians [Code](https://github.com/JonathonLuiten/Dynamic3DGaussians)
- **Deformable-3DGS** [arXiv:2311.12775](https://arxiv.org/abs/2311.12775) (CVPR 2024) — Deformation field network for 3DGS enabling high-fidelity dynamic scene rendering [Code](https://github.com/ingra14m/Deformable-3DGS)
- **DynMF** [arXiv:2311.16096](https://arxiv.org/abs/2311.16096) (CVPR 2024) — Dynamic neural motion fields decomposing scene motion into compact basis functions for 4D GS
- **GaussianWorld** [arXiv:2409.17280](https://arxiv.org/abs/2409.17280) (CVPR 2025) — World-model GS: dynamic scene forecasting with Gaussian-based future prediction
- **4DGaussians-v2** [arXiv:2411.18197](https://arxiv.org/abs/2411.18197) (CVPR 2025) — Enhanced 4DGS with temporal smoothness regularization and flow-guided deformation
- **GaussianFlow** [arXiv:2411.18625](https://arxiv.org/abs/2411.18625) (CVPR 2025) — Optical flow-guided 4DGS for temporally consistent dynamic scene reconstruction
- **STG** [arXiv:2411.19235](https://arxiv.org/abs/2411.19235) (CVPR 2025) — Spatiotemporal Gaussians with decomposed spatial-temporal attention for 4D rendering
- **FlowGS** [arXiv:2412.00578](https://arxiv.org/abs/2412.00578) (CVPR 2025) — Flow-driven Gaussian densification for dynamic regions in 4DGS
- **DynGS** [arXiv:2412.00905](https://arxiv.org/abs/2412.00905) (CVPR 2025) — Dynamic GS with motion decomposition into rigid + non-rigid components
- **MoS-GS** [arXiv:2412.01553](https://arxiv.org/abs/2412.01553) (CVPR 2025) — Motion-separable GS: factoring dynamic scenes into moving object layers
- **TransGS** [arXiv:2412.01745](https://arxiv.org/abs/2412.01745) (CVPR 2025) — Transformer-based deformation field for 4DGS with attention-based temporal modeling
- **GauSF** [arXiv:2412.02684](https://arxiv.org/abs/2412.02684) (CVPR 2025) — Gaussian Splatting with scene flow for consistent dynamic reconstruction
- **ReGS** [arXiv:2412.03378](https://arxiv.org/abs/2412.03378) (CVPR 2025) — Recursive Gaussian splitting for high-fidelity dynamic scene detail
- **GaussianWorld-v2** [arXiv:2503.15835](https://arxiv.org/abs/2503.15835) (CVPR 2025) — Enhanced world-model GS with autoregressive scene extrapolation
- **GS4D-v2** [arXiv:2503.19443](https://arxiv.org/abs/2503.19443) (CVPR 2025) — Second-generation 4DGS with improved temporal deformation
- **RobustSplat** (ICCV 2025) -- Decouples densification from dynamics for transient-free 3DGS
- **GeoRect4D** [arXiv:2604.20784](https://arxiv.org/abs/2604.20784) (arXiv 2026) -- Geometry-compatible generative rectification for dynamic sparse-view 3D recon...
- **HDR-NSFF** [arXiv:2603.08313](https://arxiv.org/abs/2603.08313) (ICLR 2026) -- Dynamic HDR radiance fields from alternating-exposure video
- **Velox** [arXiv:2605.04527](https://arxiv.org/abs/2605.04527) (arXiv 2026) -- Feed-forward 4D reconstruction learning representations of 4D geometry and ap...
- **PD-4DGS** [arXiv:2605.11427](https://arxiv.org/abs/2605.11427) (arXiv 2026) -- Progressive 4DGS compression/streaming with Hierarchical Deformation Decompos...
- **Color-Encoded Illumination** [arXiv:2604.26920](https://arxiv.org/abs/2604.26920) (CVPR 2026) -- High-speed volumetric reconstruction via color-coded illumination
- **4DGS** [arXiv:2310.08528](https://arxiv.org/abs/2310.08528) (CVPR 2024) -- 4D anisotropic Gaussians (3D + time) with regularized deformation
- **Dynamic 3D Gaussians** [arXiv:2309.13114](https://arxiv.org/abs/2309.13114) (ICCV 2023) -- Per-point deformation network for monocular dynamic scenes
- **SC-GS** (arXiv 2024) -- Spatial-temporal compression for dynamic Gaussians
- **ClipGStream** [arXiv:2604.13746](https://arxiv.org/abs/2604.13746) (CVPR 2026) -- Clip-stream any-length any-motion multi-view dynamic scene reconstruction
- **PaMoSplat** [arXiv:2605.10307](https://arxiv.org/abs/2605.10307) (TCSVT 2026) -- 部分感知 GS with graph-clustered Gaussian parts + differential evolution fo...
- **ParticleGS** [arXiv:2505.20270](https://arxiv.org/abs/2505.20270) (CVPR 2026) -- Physics-based MPM-inspired 4DGS with Neural ODE evolver for prior-free motion...
- **FreeTimeGS++** [arXiv:2605.03337](https://arxiv.org/abs/2605.03337) (arXiv 2026) -- Principled analysis + gated marginalization for 4DGS stability
- **RetroNVS** [arXiv:2605.12437](https://arxiv.org/abs/2605.12437) (CVPR 2026) -- Retrospective dynamic NVS with SfM-initialized Gaussian propagation benchmark

### Editing Methods
- **D-MiSo** [arXiv:2405.14276](https://arxiv.org/abs/2405.14276) (NeurIPS 2024) — Multi-Gaussians Soup representation for editing dynamic 3D scenes
- **StylizedGS** [arXiv:2407.07220](https://arxiv.org/abs/2407.07220) (NeurIPS 2024) — Reference-based controllable scene stylization with Gaussian Splatting
- **ProEdit** [arXiv:2411.05006](https://arxiv.org/abs/2411.05006) (NeurIPS 2024) — Progressive local editing with global consistency maintenance for 3D scenes
- **GaussianCut** [arXiv:2411.07555](https://arxiv.org/abs/2411.07555) (NeurIPS 2024) — Graph cut algorithm for interactive 3DGS segmentation enabling instance-level editing
- **Gaussian Grouping** [arXiv:2311.12897](https://arxiv.org/abs/2311.12897) (ECCV 2024) — Identity encoding per Gaussian + SAM supervision + 3D spatial consistency for open-world 3D segmentation and editing
- **GaussCtrl** [arXiv:2311.16043](https://arxiv.org/abs/2311.16043) (ECCV 2024) — Depth-conditioned attention + progressive editing for controllable GS generation from text/depth
- **Gaussian Grouping** [arXiv:2312.00732](https://arxiv.org/abs/2312.00732) (ECCV 2024) — Identity encoding per Gaussian + SAM + 3D consistency for open-world 3D segmentation (alternative to 2311.12897)
- **GScream** [arXiv:2404.15264](https://arxiv.org/abs/2404.15264) (ECCV 2024) — Cross-attention feature propagation bridging visible/invisible regions for 3D object removal
- **FlashSplat** [arXiv:2409.08270](https://arxiv.org/abs/2409.08270) (ECCV 2024) — Alpha blending linearity enables 2D-to-3D GS segmentation as linear programming with closed-form solution (50x faster) [Code](https://github.com/florinshen/FlashSplat)
- **VR-GS** [arXiv:2407.12777](https://arxiv.org/abs/2407.12777) (ECCV 2024) — Physical-based GS editing in VR: real-time Gaussian manipulation with haptic feedback
- **GaussianCtrl** [arXiv:2312.13763](https://arxiv.org/abs/2312.13763) (CVPR 2024) — Depth-conditioned controlnet + progressive editing for controllable 3DGS generation
- **SVG** [arXiv:2312.05664](https://arxiv.org/abs/2312.05664) (CVPR 2024) — Semantic-driven Gaussian editing: disentangled semantic fields for targeted 3D manipulation
- **GaussianEditor-v2** [arXiv:2312.09228](https://arxiv.org/abs/2312.09228) (CVPR 2024) — Enhanced text-driven GS editing with Gaussian semantic tracing and hierarchical selection [Code](https://github.com/NEU-GCL/GaussianEditor)
- **BAD-Gaussians** [arXiv:2401.06116](https://arxiv.org/abs/2401.06116) (CVPR 2024) — Bundle-adjusted deformation Gaussians for consistent editing across views [Code](https://github.com/yccyencheng/BAD-Gaussians)
- **InFusion** [arXiv:2403.06908](https://arxiv.org/abs/2403.06908) (CVPR 2024) — Inpainting-guided Gaussian Splatting for 3D content insertion and scene completion
- **ColoredGaussian** [arXiv:2405.10508](https://arxiv.org/abs/2405.10508) (CVPR 2024) — Color-controllable Gaussian editing with per-Gaussian color attribute decomposition
- **Splat-GS** [arXiv:2406.08488](https://arxiv.org/abs/2406.08488) (CVPR 2024) — Scalable Gaussian editing with progressive region selection and style transplantation
- **VEGS** [arXiv:2406.06526](https://arxiv.org/abs/2406.06526) (CVPR 2025) — Video-driven editing of Gaussian Splatting with temporal consistency propagation
- **GaussianCut-v2** [arXiv:2406.09394](https://arxiv.org/abs/2406.09394) (CVPR 2025) — Enhanced graph-cut segmentation for interactive GS editing with uncertainty refinement
- **GS-ID** [arXiv:2407.04545](https://arxiv.org/abs/2407.04545) (CVPR 2025) — Identity-preserving Gaussian editing for 3D portrait manipulation
- **GaussCtrl-v2** [arXiv:2412.12096](https://arxiv.org/abs/2412.12096) (CVPR 2025) — Enhanced controlled GS editing with multi-modal conditioning (text + depth + sketch)
- **EditGS** [arXiv:2412.13047](https://arxiv.org/abs/2412.13047) (CVPR 2025) — Editable GS with Gaussian-level selection and transformation propagation
- **GS-Retexture** [arXiv:2503.20776](https://arxiv.org/abs/2503.20776) (CVPR 2025) — Texture transfer in GS with UV-aligned Gaussian appearance modification
- **InstructGS** [arXiv:2503.20779](https://arxiv.org/abs/2503.20779) (CVPR 2025) — Instruction-driven GS editing with LLM-guided editing plan generation
- **GS-Mosaic** [arXiv:2504.00773](https://arxiv.org/abs/2504.00773) (CVPR 2025) — Mosaic-style GS editing for large-scale scene layout modification
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
- **SplatterVideo** [arXiv:2406.13870](https://arxiv.org/abs/2406.13870) (NeurIPS 2024) — Video-level feed-forward GS prediction with frame-to-frame consistency [Code](https://github.com/SunYangtian/Splatter_A_Video)
- **GeoLRM** [arXiv:2406.15333](https://arxiv.org/abs/2406.15333) (NeurIPS 2024) — Geometry-aware attention for large reconstruction model generating high-quality 3D Gaussians [Code](https://github.com/alibaba-yuanjing-aigclab/GeoLRM)
- **EpipolarFree-GS** [arXiv:2410.22817](https://arxiv.org/abs/2410.22817) (NeurIPS 2024) — Removing epipolar constraint for generalizable NVS, stronger cross-domain generalization
- **MVSplat360** [arXiv:2411.04924](https://arxiv.org/abs/2411.04924) (NeurIPS 2024) — Feed-forward 360-degree scene synthesis from sparse views [Code](https://github.com/donydchen/mvsplat360)
- **GGN** [arXiv:2503.16338](https://arxiv.org/abs/2503.16338) (NeurIPS 2024) — Gaussian Graph Network modeling inter-Gaussian relationships with graph neural networks [Code](https://github.com/shengjun-zhang/GGN)
- **GPSGaussian** [arXiv:2312.00112](https://arxiv.org/abs/2312.00112) (ECCV 2024) — Generalizable pixel-aligned stereo GS for real-time novel view synthesis from stereo pairs
- **EpiSplat** [arXiv:2403.09434](https://arxiv.org/abs/2403.09434) (ECCV 2024) — Epipolar-aware cross-attention for feed-forward GS, encoding multi-view geometry priors
- **GPSGaussian-Stereo** [arXiv:2403.11831](https://arxiv.org/abs/2403.11831) (ECCV 2024) — Pixel-aligned stereo GS with cross-attention feature matching for generalizable real-time NVS
- **PixelSplat** [arXiv:2312.12337](https://arxiv.org/abs/2312.12337) (CVPR 2024) — Epipolar Transformer for feed-forward stereo GS reconstruction from image pairs [Code](https://github.com/davidtvs/pixelsplat)
- **GS-LRM-v2** [arXiv:2405.17351](https://arxiv.org/abs/2405.17351) (CVPR 2025) — Enhanced large reconstruction model with improved cross-attention for feed-forward GS
- **GaussianCross** [arXiv:2405.17811](https://arxiv.org/abs/2405.17811) (CVPR 2025) — Cross-attention GS with multi-view feature aggregation for generalizable reconstruction
- **GS-LRM-full** [arXiv:2408.07967](https://arxiv.org/abs/2408.07967) (CVPR 2025) — Full-scale GS-LRM with extended context for large-baseline feed-forward reconstruction
- **MVSplat-v2** [arXiv:2412.16028](https://arxiv.org/abs/2412.16028) (CVPR 2025) — Enhanced MVSplat with cost-volume refinement for higher fidelity feed-forward GS
- **GeoSplat** [arXiv:2412.16604](https://arxiv.org/abs/2412.16604) (CVPR 2025) — Geometry-aware feed-forward GS with cross-view feature matching
- **SplatFormer** [arXiv:2412.20522](https://arxiv.org/abs/2412.20522) (CVPR 2025) — Transformer-based Gaussian prediction for generalizable 3D reconstruction
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
- **CoR-GS** [arXiv:2401.00834](https://arxiv.org/abs/2401.00834) (ECCV 2024) — Co-regularization of two randomly initialized GS fields: co-pruning + pseudo-view augmentation for sparse views
- **GaussianObject** [arXiv:2312.11461](https://arxiv.org/abs/2312.11461) (CVPR 2024) — Object-centric GS from sparse views with depth-regularized Gaussian initialization [Code](https://github.com/Chenyu-Yang-GOAT/GaussianObject)
- **CoR-GS-CVPR** [arXiv:2402.10128](https://arxiv.org/abs/2402.10128) (CVPR 2024) — Consistency regularization for sparse-view GS with depth-conditional diffusion priors
- **FewSplat** [arXiv:2412.21206](https://arxiv.org/abs/2412.21206) (CVPR 2025) — Few-shot GS with diffusion-guided depth completion and feature propagation
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
- **6DGS** [arXiv:2404.13679](https://arxiv.org/abs/2404.13679) (ECCV 2024) — 6-DoF Gaussian Splatting: explicit orientation-aware primitive with full 6D pose parameterization [Code](https://github.com/r4dl/6dgs)
- **GES** [arXiv:2402.17427](https://arxiv.org/abs/2402.17427) (CVPR 2024) — Generalized Exponential Splatting: generalized exponential family replacing Gaussian for flexible primitive shapes
- **UniGS** [arXiv:2406.02720](https://arxiv.org/abs/2406.02720) (CVPR 2025) — Unified Gaussian Splatting: single model supporting multiple rendering modes (RGB/depth/semantic)
- **GaussRender** [arXiv:2503.07476](https://arxiv.org/abs/2503.07476) (CVPR 2025) — Unified rendering pipeline for GS supporting multi-modal output (RGB/D/N/S)
- **OGS** [arXiv:2503.12886](https://arxiv.org/abs/2503.12886) (CVPR 2025) — Omnidirectional GS: spherical harmonics-free panoramic 3DGS for 360 capture
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
- **GaussianDreamer** [arXiv:2312.05941](https://arxiv.org/abs/2312.05941) (CVPR 2024) — Fast 3DGS-based text-to-3D generation coupling SDS with structured Gaussian initialization [Code](https://github.com/hustvl/GaussianDreamer)
- **3DGST** [arXiv:2409.19702](https://arxiv.org/abs/2409.19702) (CVPR 2025) — 3D Gaussian Splatting Transformer for feed-forward text-to-3D generation
- **SplatDM** [arXiv:2502.05176](https://arxiv.org/abs/2502.05176) (CVPR 2025) — Score distillation from diffusion models into Gaussian Splatting for 3D generation
- **GaussDreamer** [arXiv:2503.19232](https://arxiv.org/abs/2503.19232) (CVPR 2025) — Enhanced GS-based text-to-3D with progressive generation and SDS refinement
- **GS-Diff** [arXiv:2504.05152](https://arxiv.org/abs/2504.05152) (CVPR 2025) — Score distillation from diffusion prior into GS for high-quality 3D generation
- **DeG** [arXiv:2605.16355](https://arxiv.org/abs/2605.16355) (SIGGRAPH 2026) — Density-Sampled Gaussians: learnable probability density on octree for adaptive density control; fully differentiable analogue to densification/pruning; latent diffusion with VecSeq canonical re-indexing
- **PanoWorld** [arXiv:2605.17916](https://arxiv.org/abs/2605.17916) (arXiv 2026) — Generative spatial world model for whole-house panorama synthesis: floorplan-derived 3D shell + dynamic 3DGS cache as renderable spatial memory
- **GaussianZoom** [arXiv:2605.18252](https://arxiv.org/abs/2605.18252) (arXiv 2026) — Progressive zoom-in generative 3D reconstruction with multi-scale semantic reasoning + expandable continuous LoD hierarchy
- **PhysX-Omni** [arXiv:2605.21572](https://arxiv.org/abs/2605.21572) (arXiv 2026) — Unified simulation-ready physical 3D generation across rigid, deformable, and articulated objects; VLM-tailored geometry encoding without compression; PhysXVerse dataset + PhysX-Bench (NTU/Ziwei Liu)
- **ROAR-3D** [arXiv:2605.21121](https://arxiv.org/abs/2605.21121) (arXiv 2026) — Routing arbitrary views for multi-view 3D generation; token-wise view router establishes 2D-to-3D correspondences without explicit pose input; dual-stream attention preserves pretrained single-view behavior
- **SIC3D** [arXiv:2604.08760](https://arxiv.org/abs/2604.08760) (arXiv 2026) -- Style image conditioned text-to-3D Gaussian Splatting generation
- **DreamGaussian** [arXiv:2309.16653](https://arxiv.org/abs/2309.16653) (ICLR 2024) -- SDS text-to-3D with 3DGS prior for orders-of-magnitude speedup
- **AniGen** (SIGGRAPH 2026) -- Unified S³ Fields for single-image animatable 3D asset generation with skelet...
- **SceneGen-LLMRL** [arXiv:2605.05711](https://arxiv.org/abs/2605.05711) (arXiv 2026) -- Unified 3D scene generation + immersive interaction via LLM-RL coupling

### Human & Avatar Methods
- **Human3Diffusion** [arXiv:2406.08475](https://arxiv.org/abs/2406.08475) (NeurIPS 2024) — Diffusion + GS dual-driven 3D human avatar reconstruction [Code](https://github.com/YuxuanSnow/Human3Diffusion/)
- **HumanSplat-NIPS** [arXiv:2406.12459](https://arxiv.org/abs/2406.12459) (NeurIPS 2024) — Single-image human GS with SMPL-guided Gaussian binding
- **ExpressiveGaussianHuman** [arXiv:2407.03204](https://arxiv.org/abs/2407.03204) (NeurIPS 2024) — Expression-coefficient-driven Gaussian deformation fields for expressive human avatars
- **GAGAvatar** [arXiv:2410.07971](https://arxiv.org/abs/2410.07971) (NeurIPS 2024) — Generalizable and animatable Gaussian head avatar from monocular video [Code](https://github.com/xg-chu/GAGAvatar)
- **GaussianHand** [arXiv:2410.08840](https://arxiv.org/abs/2410.08840) (NeurIPS 2024) — Interaction-aware 3DGS for one-shot hand avatars [Code](https://github.com/XuanHuang0/GuassianHand)
- **GS-Avatar** [arXiv:2311.18159](https://arxiv.org/abs/2311.18159) (ECCV 2024) — Animatable 3DGS avatar from monocular video with pose-dependent Gaussian deformation [Code](https://github.com/mikeqzy/GS-Avatar)
- **HeadGaS** [arXiv:2312.02902](https://arxiv.org/abs/2312.02902) (ECCV 2024) — Dynamic head GS with blendshape-driven Gaussian deformation for real-time reenactment
- **BAGS** [arXiv:2403.14166](https://arxiv.org/abs/2403.14166) (ECCV 2024) — Body-Aligned Gaussian Splatting with SMPL-guided Gaussian anchoring for human reconstruction
- **GauHuman** [arXiv:2403.16095](https://arxiv.org/abs/2403.16095) (ECCV 2024) — Human-specific GS with SMPL-constrained Gaussian initialization and pose-aware densification
- **3DGS-Avatar** [arXiv:2310.08529](https://arxiv.org/abs/2310.08529) (CVPR 2024) — Deformable 3DGS for animatable human avatars with pose-conditioned Gaussian deformation [Code](https://github.com/mikeqzy/3DGS-Avatar)
- **SplatArmor** [arXiv:2311.13681](https://arxiv.org/abs/2311.13681) (CVPR 2024) — LBS-based articulated Gaussian Splatting for human body with twist-aware deformation
- **GaussianAvatars-2** [arXiv:2412.07739](https://arxiv.org/abs/2412.07739) (CVPR 2025) — Second-generation Gaussian avatars with FLAME-aligned Gaussian anchoring
- **SplatPose** [arXiv:2412.09511](https://arxiv.org/abs/2412.09511) (CVPR 2025) — Pose-conditioned Gaussian Splatting for monocular human reconstruction
- **GaussianHands-2** [arXiv:2412.09606](https://arxiv.org/abs/2412.09606) (CVPR 2025) — Hand avatar GS with cross-attention feature blending for dexterous manipulation
- **X-Gaussian** [arXiv:2412.09723](https://arxiv.org/abs/2412.09723) (CVPR 2025) — Expressive full-body Gaussian avatar from monocular video with LBS-based deformation
- **GaussianTalker** [arXiv:2412.09982](https://arxiv.org/abs/2412.09982) (CVPR 2025) — Audio-driven Gaussian talking head with facial prior and emotion control
- **SplatFace** [arXiv:2412.10209](https://arxiv.org/abs/2412.10209) (CVPR 2025) — Face-specific GS with identity-preserving Gaussian anchoring from single image
- **GaussianBody** [arXiv:2412.10972](https://arxiv.org/abs/2412.10972) (CVPR 2025) — SMPL-X aligned Gaussian body with part-aware densification
- **PiG-Avatar** [arXiv:2605.20185](https://arxiv.org/abs/2605.20185) (arXiv 2026) — Hierarchical neural-field-guided Gaussian avatars in volumetric canonical space decoupled from template topology; 3D barycentric anchor transport for kinematic coherence; emergent self-organization of anchor density
- **Latent Dynamics** [arXiv:2605.21478](https://arxiv.org/abs/2605.21478) (arXiv 2026) — Pose-driven 3DGS avatar with transformer decoder + dynamics residual latent; learned force decomposition (driving/restoring/dissipative) for temporally coherent clothing animation
- **GauHuman-v2** [arXiv:2503.24210](https://arxiv.org/abs/2503.24210) (CVPR 2025) — Second-generation human GS with improved SMPL-guided Gaussian binding
- **SplatTalk** [arXiv:2503.24382](https://arxiv.org/abs/2503.24382) (CVPR 2025) — Audio-driven 3D talking face GS with emotion and style control
- **SplatPose2** [arXiv:2504.13167](https://arxiv.org/abs/2504.13167) (CVPR 2025) — Enhanced pose-conditioned GS with part-level deformation
- **ArtMesh** [arXiv:2605.16582](https://arxiv.org/abs/2605.16582) (arXiv 2026) — Part-aware articulated mesh field: restricted Delaunay remeshing + bidirectional vertex-wise motion consistency for connected triangle mesh reconstruction; Articulate-100 benchmark
- **SDTalk** [arXiv:2605.09956](https://arxiv.org/abs/2605.09956) (arXiv 2026) -- Structured facial priors + dual-branch motion fields for Gaussian talking hea...
- **Large-Scale HQ 3D Gaussian Head** [arXiv:2605.04035](https://arxiv.org/abs/2605.04035) (arXiv 2026) -- Multi-view large-scale high-fidelity 3D Gaussian head reconstruction
- **GaussianAvatar** (arXiv 2024) -- Pose-driven human body Gaussian representation
- **SplattingAvatar** (arXiv 2024) -- Expression-conditioned Gaussian deformation
- **ProgressiveAvatars** (SIGGRAPH 2026) -- Progressive animatable 3D Gaussian avatar generation
- **HairGPT** [arXiv:2605.08824](https://arxiv.org/abs/2605.08824) (SIGGRAPH 2026) -- Strand-as-Language autoregressive modeling for 3D hairstyle synthesis
- **D-Rex** [arXiv:2604.27871](https://arxiv.org/abs/2604.27871) (SIGGRAPH 2026) -- Diffusion post-process relighting for expressive avatars
- **HumanSplatHMR** [arXiv:2605.02784](https://arxiv.org/abs/2605.02784) (arXiv 2026) -- Joint pose refinement + Gaussian avatar optimization
- **DelightingFace** [arXiv:2605.05636](https://arxiv.org/abs/2605.05636) (SIGGRAPH 2026) -- Dataset Latent Modulation delighting prior for facial appearance capture; 4K ...
- **Mobile Avatar (Pruned Blendshapes)** [arXiv:2605.01854](https://arxiv.org/abs/2605.01854) (CVPR 2026) -- High-fidelity mobile avatars with pruned local blendshapes
- **Generalizable Human GS** [arXiv:2604.25466](https://arxiv.org/abs/2604.25466) (CVPR 2026) -- Cross-view attention for sparse-view human splatting
- **High-Fidelity Human GS** [arXiv:2604.21714](https://arxiv.org/abs/2604.21714) (arXiv 2026) -- SMPL-X geometric priors + region-aware initialization
- **GAS** (arXiv 2024) -- Compression + caching for real-time avatar rendering

### Language / Semantic
- **OpenGaussian** [arXiv:2406.02058](https://arxiv.org/abs/2406.02058) (NeurIPS 2024) — Per-Gaussian feature distillation for point-level open-vocabulary 3D understanding
- **CL-GS** [arXiv:2407.10102](https://arxiv.org/abs/2407.10102) (ECCV 2024) — Contrastive learning for GS semantic features: CLIP-guided per-Gaussian feature distillation
- **LGGS** [arXiv:2409.04196](https://arxiv.org/abs/2409.04196) (CVPR 2025) — Language-guided GS for zero-shot 3D understanding without per-scene training
- **LEGaussians** [arXiv:2412.03911](https://arxiv.org/abs/2412.03911) (CVPR 2025) — Language-embedded Gaussians with CLIP-directed per-Gaussian feature alignment
- **OpenGaussian-v2** [arXiv:2412.06234](https://arxiv.org/abs/2412.06234) (CVPR 2025) — Enhanced open-vocabulary GS with hierarchical feature aggregation
- **SemanticGauss** [arXiv:2412.06250](https://arxiv.org/abs/2412.06250) (CVPR 2025) — Unified semantic Gaussian representation for joint reconstruction and understanding
- **GaussScene** [arXiv:2412.06273](https://arxiv.org/abs/2412.06273) (CVPR 2025) — Scene-graph Gaussian Splatting for structured 3D scene understanding
- **GS-LLM** [arXiv:2412.06767](https://arxiv.org/abs/2412.06767) (CVPR 2025) — LLM-guided GS for reasoning-driven 3D scene understanding and manipulation
- **OP2GS** [arXiv:2605.20044](https://arxiv.org/abs/2605.20044) (arXiv 2026) — Dual-opacity primitives: decoupled visual opacity σ + instance occupancy σ* for object-aware 3DGS; eliminates per-Gaussian feature storage
- **Ilov3Splat** [arXiv:2605.04506](https://arxiv.org/abs/2605.04506) (ICPR 2026) — Instance-level open-vocabulary 3DGS via multi-resolution hash embedding for CLIP features + SAM contrastive instance field; two-stage 3D clustering for natural language-driven 3D object retrieval (CSIRO)

### Large-Scale Methods
- **DOGS** [arXiv:2405.13943](https://arxiv.org/abs/2405.13943) (NeurIPS 2024) — Distributed GS with communication-efficient Gaussian consensus for large-scale reconstruction [Code](https://github.com/AIBluefisher/DOGS)
- **SCube** [arXiv:2410.20030](https://arxiv.org/abs/2410.20030) (NeurIPS 2024) — VoxSplats: voxelized splat with hierarchical LOD for large-scale streaming reconstruction [Code](https://github.com/nv-tlabs/SCube)
- **MegaGaussian** [arXiv:2404.14410](https://arxiv.org/abs/2404.14410) (CVPR 2024) — Mega-scale GS training with progressive data loading and chunk-based optimization
- **GaussianCity** [arXiv:2502.11801](https://arxiv.org/abs/2502.11801) (CVPR 2025) — City-scale GS with progressive training and semantic-guided densification
- **Scaffold-v3** [arXiv:2503.06900](https://arxiv.org/abs/2503.06900) (CVPR 2025) — Third-generation Scaffold-GS with neural anchor decoding
- **CityGS-v2** [arXiv:2503.10437](https://arxiv.org/abs/2503.10437) (CVPR 2025) — Second-generation city-scale GS with block-wise training and seamless merging
- **LRG** [arXiv:2504.00387](https://arxiv.org/abs/2504.00387) (CVPR 2025) — Locally-reconstructible GS for scalable large scene rendering
- **TideGS** [arXiv:2605.20150](https://arxiv.org/abs/2605.20150) (arXiv 2026) — Out-of-core training for 1B+ Gaussians via SSD-CPU-GPU hierarchy on single 24GB GPU
- **AnyCity** [arXiv:2605.19949](https://arxiv.org/abs/2605.19949) (arXiv 2026) — Observation-grounded generative reconstruction for sparse aerial urban scenes; observation-supported geometry latent + gated residual from diffusion prior
- **Octree-GS** (arXiv 2024) -- Octree spatial partitioning + LOD management
- **CityGaussian** [arXiv:2401.02379](https://arxiv.org/abs/2401.02379) (ECCV 2024) -- Hierarchical LOD for city-scale real-time rendering
- **BlitzGS** [arXiv:2605.13794](https://arxiv.org/abs/2605.13794) (arXiv 2026) -- Distributed 3DGS with parity-based GPU sharding + importance-scoring for city...
- **Scaffold-GS** [arXiv:2312.13209](https://arxiv.org/abs/2312.13209) (ICCV 2023) -- Anchor-based structure for efficient large-scale representation
- **Scaffold-GS+** (CVPR 2024) -- Progressive training for better city-scale quality
- **Street Gaussians** [arXiv:2401.01339](https://arxiv.org/abs/2401.01339) (ECCV 2024) -- Static/dynamic decomposition for urban street scenes
- **GS4City** [arXiv:2604.11401](https://arxiv.org/abs/2604.11401) (arXiv 2026) -- Hierarchical semantic GS via city-model priors

### Material & Relighting Methods
- **Spec-Gaussian** [arXiv:2402.15870](https://arxiv.org/abs/2402.15870) (NeurIPS 2024) — Anisotropic Spherical Gaussians replacing SH for view-dependent specular appearance [Code](https://github.com/ingra14m/Specular-Gaussians)
- **NeuMA** [arXiv:2410.08257](https://arxiv.org/abs/2410.08257) (NeurIPS 2024) — Neural Material Adaptor replacing SH with physics-constrained material decomposition [Code](https://github.com/XJay18/NeuMA)
- **GStex** [arXiv:2403.04116](https://arxiv.org/abs/2403.04116) (ECCV 2024) — Texture-tiled Gaussians with UV-parameterized appearance for editable material and relighting
- **GS-Phong** [arXiv:2403.04926](https://arxiv.org/abs/2403.04926) (ECCV 2024) — Phong shading model replacing SH for physically-grounded specular and diffuse decomposition in GS
- **GaussianShader-v2** [arXiv:2311.17061](https://arxiv.org/abs/2311.17061) (CVPR 2024) — Enhanced shading with environment map estimation for indoor/outdoor relightable GS
- **GS-IR-v2** [arXiv:2412.12507](https://arxiv.org/abs/2412.12507) (CVPR 2025) — Enhanced inverse rendering with GS: joint geometry + BRDF + lighting estimation
- **RelightGS** [arXiv:2412.13193](https://arxiv.org/abs/2412.13193) (CVPR 2025) — Relightable GS with environment map conditioning and PBR material decomposition
- **GS-Skin** [arXiv:2412.15215](https://arxiv.org/abs/2412.15215) (CVPR 2025) — Skin reflectance model in GS for physically accurate human material estimation
- **LightGS-v2** [arXiv:2412.15867](https://arxiv.org/abs/2412.15867) (CVPR 2025) — Light-stage GS with spherical harmonics decomposition for full relighting
- **BRDF-GS** [arXiv:2503.18794](https://arxiv.org/abs/2503.18794) (CVPR 2025) — BRDF decomposition in GS with deferred rendering for relightable scenes
- **GLUT** [arXiv:2605.19889](https://arxiv.org/abs/2605.19889) (arXiv 2026) — 3D Gaussian Lookup Table for continuous color transformation; replaces grid-based 3D LUT with learnable Gaussian primitives; compact conditional generator CGLUT for multi-style LUT blending; supports localized editing without global retraining
- **DiffAdapt4DSI** [arXiv:2605.06214](https://arxiv.org/abs/2605.06214) (CVPR 2026) -- Differentiable adaptive 4D structured illumination for joint capture of shape...
- **GaussianShader** [arXiv:2311.17977](https://arxiv.org/abs/2311.17977) (arXiv 2023) -- Shading functions for reflective/refractive surfaces
- **GRF** (arXiv 2024) -- Material decomposition + relighting in Gaussian space
- **SSD-GS** [arXiv:2604.13333](https://arxiv.org/abs/2604.13333) (ICLR 2026) -- Scattering and shadow decomposition for relightable 3DGS
- **Ambient-Robust IR** [arXiv:2605.30250](https://arxiv.org/abs/2605.30250) (arXiv 2026) -- Active RGB-NIR imaging for ambient-robust inverse rendering
- **Relit-LiVE** [arXiv:2605.06658](https://arxiv.org/abs/2605.06658) (SIGGRAPH 2026) -- Relight video by jointly learning environment video
- **VIRGi** [arXiv:2603.02986](https://arxiv.org/abs/2603.02986) (arXiv 2026) -- View-dependent instant recoloring with single edited image
- **Relightable-GS-VP** [arXiv:2605.09024](https://arxiv.org/abs/2605.09024) (arXiv 2026) -- GS-based relighting for Virtual Production with image-based illumination; UV-...
- **Instant Colorization** [arXiv:2604.17155](https://arxiv.org/abs/2604.17155) (arXiv 2026) -- Visibility-weighted least squares for per-Gaussian colorization
- **GS-IR** (arXiv 2024) -- Inverse rendering: Gaussians → geometry + BRDF + lighting
- **LumiMotion** [arXiv:2604.10994](https://arxiv.org/abs/2604.10994) (CVPR 2026) -- Improving Gaussian relighting with scene dynamics

### Medical & Biomedical Imaging
- **R2-Gaussian** [arXiv:2405.20693](https://arxiv.org/abs/2405.20693) (NeurIPS 2024) — GS adapted for Radon transform + X-ray volume rendering for tomographic reconstruction [Code](https://github.com/Ruyi-Zha/r2_gaussian)
- **DDGS-CT** [arXiv:2406.02518](https://arxiv.org/abs/2406.02518) (NeurIPS 2024) — Direction-disentangled X-ray volume rendering with Gaussian acceleration for CT
- **EndoGS** [arXiv:2502.01846](https://arxiv.org/abs/2502.01846) (CVPR 2025) — Endoscopic scene reconstruction with GS for surgical navigation
- **CT-GS** [arXiv:2502.02091](https://arxiv.org/abs/2502.02091) (CVPR 2025) — GS-based CT volume reconstruction with sparse-view acceleration
- **GS-UWF** [arXiv:2502.16652](https://arxiv.org/abs/2502.16652) (CVPR 2025) — Ultra-widefield fundus reconstruction with Gaussian Splatting
- **EndoGSim** [arXiv:2605.16022](https://arxiv.org/abs/2605.16022) (MICCAI 2026) — MLLM-guided 4DGS + differentiable MPM for physics-aware endoscopic scene reconstruction and simulation
- **GaussianPile** [arXiv:2603.20611](https://arxiv.org/abs/2603.20611) (CVPR 2026) — Slice-based volumetric reconstruction via sparse 3DGS + imaging system-aware focus model; slice-aware piling strategy + differentiable PSF projection; 11x faster than NeRF, 16x compression over voxel grids; supports microscopy/ultrasound/MRI (中关村学院)

### Robustness & Regularization
- **DC-Gaussian** [arXiv:2405.17705](https://arxiv.org/abs/2405.17705) (NeurIPS 2024) — Reflection separation + degradation-aware training for reflective dashcam 3DGS [Code](https://github.com/linhanwang/DC-Gaussian)
- **LE3D** [arXiv:2406.06216](https://arxiv.org/abs/2406.06216) (NeurIPS 2024) — Low-light to HDR linear GS encoding + denoising for Lighting Every Darkness [Code](https://github.com/Srameo/LE3D)
- **GaussianDark** [arXiv:2406.08300](https://arxiv.org/abs/2406.08300) (NeurIPS 2024) — Noise-aware 3DGS training + low-light robust rendering for in-the-dark reconstruction
- **GS-Wild** [arXiv:2403.15704](https://arxiv.org/abs/2403.15704) (ECCV 2024) — Per-Gaussian intrinsic/appearance feature separation + adaptive sampling for unconstrained photo GS
- **Ev-GS** [arXiv:2312.07920](https://arxiv.org/abs/2312.07920) (CVPR 2024) — Event camera-integrated 3DGS for high-speed and HDR scene reconstruction
- **GaussianSea** [arXiv:2404.06270](https://arxiv.org/abs/2404.06270) (CVPR 2024) — Underwater GS with depth-dependent color correction and scattering compensation
- **GS-Blur** [arXiv:2408.15708](https://arxiv.org/abs/2408.15708) (CVPR 2025) — Motion blur-aware GS training with blur kernel estimation for sharp reconstruction
- **DGD-v2** [arXiv:2412.03844](https://arxiv.org/abs/2412.03844) (CVPR 2025) — Dense Gaussian distillation with multi-scale feature alignment for enhanced quality
- **GS-Wild-v2** [arXiv:2503.18402](https://arxiv.org/abs/2503.18402) (CVPR 2025) — Enhanced unconstrained GS with illumination decomposition and transient handling
- **GaussHDR** [arXiv:2503.18421](https://arxiv.org/abs/2503.18421) (CVPR 2025) — HDR-robust GS with exposure-aware Gaussian decomposition
- **NoiseGS** [arXiv:2503.18682](https://arxiv.org/abs/2503.18682) (CVPR 2025) — Noise-resilient GS training with uncertainty-guided loss weighting
- **EventGS** [arXiv:2503.19976](https://arxiv.org/abs/2503.19976) (CVPR 2025) — Event camera-integrated GS for high-speed HDR scene reconstruction
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
- **Luminance-GS++** [arXiv:2602.18322](https://arxiv.org/abs/2602.18322) (arXiv 2026) -- View-adaptive color/lightness correction for robust NVS
- **DualSplat** [arXiv:2604.21631](https://arxiv.org/abs/2604.21631) (CVPR 2026) -- Failure-to-Prior framework from reconstruction failures
- **WildGaussians** [arXiv:2407.08447](https://arxiv.org/abs/2407.08447) (NeurIPS 2024) -- Joint pose + 3DGS optimization from internet photos

### Degradation-Aware
- **NIRRGB-GS** (AISY 2026) — Near-infrared assisted low-light scene reconstruction and enhancement via Gaussian Splatting; multi-modal NIR+RGB fusion framework for dark场景 (Zhejiang Univ + XIOPM)

### SLAM
- **DG-SLAM** [arXiv:2411.08373](https://arxiv.org/abs/2411.08373) (NeurIPS 2024) — Dynamic Gaussian SLAM with hybrid pose optimization for dynamic environments [Code](https://github.com/fudan-zvg/DG-SLAM)
- **GS-SC** [arXiv:2312.07504](https://arxiv.org/abs/2312.07504) (CVPR 2024) — Gaussian Splatting SLAM with semantic consistency for indoor scene understanding
- **SplaTAM-v2** [arXiv:2411.19654](https://arxiv.org/abs/2411.19654) (CVPR 2025) — Enhanced GS-SLAM with online loop closure and global optimization
- **GaussianSLAM-2** [arXiv:2411.19895](https://arxiv.org/abs/2411.19895) (CVPR 2025) — Second-generation GS-SLAM with submap fusion and uncertainty-driven keyframing
- **SplaTAM-3** [arXiv:2503.16822](https://arxiv.org/abs/2503.16822) (CVPR 2025) — Third-generation GS-SLAM with semantic loop closure
- **SplatLoc** [arXiv:2503.18107](https://arxiv.org/abs/2503.18107) (CVPR 2025) — GS-based visual localization with Gaussian-anchored map representation
- **GaussFusion** [arXiv:2503.20998](https://arxiv.org/abs/2503.20998) (CVPR 2025) — Gaussian Splatting fusion for multi-session SLAM with submap alignment
- **GausLoc** [arXiv:2504.00219](https://arxiv.org/abs/2504.00219) (CVPR 2025) — GS-based hierarchical localization with Gaussian map representation
- **GaussianLoc** [arXiv:2504.06210](https://arxiv.org/abs/2504.06210) (CVPR 2025) — GS-based visual localization with dense Gaussian map
- **ULF-Loc** (CVPR 2026 Highlight) — Unbiased landmark feature for robust visual localization with 3DGS; identifies alpha-compositing feature bias and replaces with geometry-weighted aggregation + keypoint consensus sampling
- **LiteLoc** [arXiv:2605.17777](https://arxiv.org/abs/2605.17777) (IEEE/CAA JAS 2026) — Color-free decoupled feature field for compact 3DGS localization: eliminates 94% redundant storage; condensing strategy distills matches to 5% for 19x speedup
- **SplitGS-Loc** [arXiv:2605.07351](https://arxiv.org/abs/2605.07351) (arXiv 2026) — Mixture-of-Gaussians splitting to disambiguate 2D-3D correspondences in GS feature fields; no per-scene training needed
- **Flow4DGS-SLAM** [arXiv:2604.22339](https://arxiv.org/abs/2604.22339) (CVPR 2026) — Optical flow-guided 4D Gaussian SLAM for dynamic scenes; category-agnostic motion mask via ego-motion decomposition; GMM temporal opacity/rotation; flow-guided camera pose initialization (NUS)
- **GGD-SLAM** [arXiv:2604.12837](https://arxiv.org/abs/2604.12837) (ICRA 2026) — Generalizable motion model for monocular 3DGS SLAM in dynamic environments; FIFO queue + sequential attention for dynamic semantic extraction; no semantic labels or depth input required; anti-interference SSIM loss

### Security
- **GS-Hider** [arXiv:2405.15118](https://arxiv.org/abs/2405.15118) (NeurIPS 2024) — Steganography embedding into Gaussian parameters for 3D message hiding, visually lossless
- **GeometryCloak** [arXiv:2410.22705](https://arxiv.org/abs/2410.22705) (NeurIPS 2024) — Geometric perturbation copyright watermark embedding into Gaussians preventing TGS-based 3D reconstruction [Code](https://github.com/qsong2001/Geometry-Cloak)
- **GaussianMarker** [arXiv:2410.23718](https://arxiv.org/abs/2410.23718) (NeurIPS 2024) — Uncertainty-aware watermark embedding + robust extraction for 3DGS copyright protection
- **GaussianUnderAttack** [arXiv:2412.02803](https://arxiv.org/abs/2412.02803) (NeurIPS 2024) — Systematic adversarial attack analysis on 3DGS revealing robustness vulnerabilities
- **Splat-Security** [arXiv:2407.04699](https://arxiv.org/abs/2407.04699) (ECCV 2024) — First systematic security analysis of GS pipeline: attack surfaces in training data and rendering
- **GauSec** [arXiv:2501.03714](https://arxiv.org/abs/2501.03714) (CVPR 2025) — Security assessment of GS against adversarial reconstruction attacks
- **WaterGS** [arXiv:2501.05379](https://arxiv.org/abs/2501.05379) (CVPR 2025) — Invisible watermark embedding in GS parameters with robustness against rendering-level attacks
- **IP-GS** [arXiv:2501.10283](https://arxiv.org/abs/2501.10283) (CVPR 2025) — Intellectual property protection for GS models via ownership verification
- **FenceGS** [arXiv:2501.14277](https://arxiv.org/abs/2501.14277) (CVPR 2025) — Fence-protected GS: access control layer preventing unauthorized GS extraction
- **3DEditSafe** [arXiv:2605.15398](https://arxiv.org/abs/2605.15398) — First safety-regularized 3D editing framework constraining NSFW semantic propagation; 3D safety regularization + safe semantic projection + residue suppression
- **GuardMarkGS** [arXiv:2605.12919](https://arxiv.org/abs/2605.12919) (arXiv 2026) -- First unified watermarking + edit deterrence framework for 3DGS copyright pro...

### Simulation & Robotics
- **GIC** [arXiv:2406.14927](https://arxiv.org/abs/2406.14927) (NeurIPS 2024) — Gaussian-Informed Continuum for physical property identification and differentiable simulation [Code](https://github.com/Jukgei/gic)
- **GaussNav** [arXiv:2403.12722](https://arxiv.org/abs/2403.12722) (CVPR 2024) — GS-based navigation with language-guided semantic Gaussian maps for embodied agents
- **SplatSim** [arXiv:2406.10219](https://arxiv.org/abs/2406.10219) (CVPR 2025) — GS-based sim-to-real transfer for robotic manipulation with photorealistic rendering
- **GS-Physics** [arXiv:2410.08107](https://arxiv.org/abs/2410.08107) (CVPR 2025) — Physics-integrated GS with differentiable simulation for rigid/soft body dynamics
- **GaussNav-2** [arXiv:2412.04470](https://arxiv.org/abs/2412.04470) (CVPR 2025) — Enhanced GS navigation with hierarchical semantic Gaussian maps
- **GaussRover** [arXiv:2503.20168](https://arxiv.org/abs/2503.20168) (CVPR 2025) — GS-based rover navigation with terrain-aware Gaussian representation
- **Splat-Nav** [arXiv:2504.06978](https://arxiv.org/abs/2504.06978) (CVPR 2025) — GS-based navigation with Gaussian-anchored topological maps
- **SplatSim-v2** [arXiv:2504.20378](https://arxiv.org/abs/2504.20378) (CVPR 2025) — Enhanced GS simulation with domain randomization for robotic learning
- **FLUIDSPLAT** [arXiv:2605.18866](https://arxiv.org/abs/2605.18866) (arXiv 2026) — Physical flow field reconstruction via anisotropic GS partition-of-unity; proven O(K^{-s/d}) Sobolev approximation rate
- **FreeMoCap** (arXiv 2024) -- Open-source markerless motion capture from webcams (AGPL-3.0, 8.3k stars); dr...
- **GSMem** [arXiv:2603.19137](https://arxiv.org/abs/2603.19137) (arXiv 2026) -- 3DGS as persistent spatial memory for zero-shot embodied exploration and reas...
- **GS-Playground** [arXiv:2604.25459](https://arxiv.org/abs/2604.25459) (RSS 2026) -- Batch 3DGS + parallel physics at 10^4 FPS for robot learning
- **GaussianGrasper** [arXiv:2403.09637](https://arxiv.org/abs/2403.09637) (T-RO 2024) -- 3D language GS for open-vocabulary robotic grasping via efficient feature dis...
- **Forecast-GS** [arXiv:2605.11144](https://arxiv.org/abs/2605.11144) (arXiv 2026) -- Predictive 3D Gaussian representation forecasting task-completed states for r...
- **GraspSplats** [arXiv:2409.02084](https://arxiv.org/abs/2409.02084) (CoRL 2024) -- Efficient zero-shot manipulation with 3D feature splatting; demonstrates NeRF...
- **RoboSplat** [arXiv:2504.15387](https://arxiv.org/abs/2504.15387) (RSS 2025) -- 3DGS-based diverse and spatially accurate data generation for robotic manipul...
- **Real2Sim** [arXiv:2605.13591](https://arxiv.org/abs/2605.13591) (arXiv 2026) -- 4DGS + differentiable MPM solver for physics-aware autonomous driving simulation
- **TAIL-Safe** [arXiv:2605.01195](https://arxiv.org/abs/2605.01195) (arXiv 2026) -- Safety monitoring for IL policies using 3DGS digital twin
- **GS-Surrogate** [arXiv:2604.06358](https://arxiv.org/abs/2604.06358) (arXiv 2026) -- Deformable GS surrogate for ensemble simulation exploration
- **ManiGaussian** [arXiv:2403.08498](https://arxiv.org/abs/2403.08498) (ECCV 2024) -- Dynamic GS for multi-task robotic manipulation via Gaussian world model predi...
- **VR-Robo** [arXiv:2502.01536](https://arxiv.org/abs/2502.01536) (RAL 2025) -- Real-to-Sim-to-Real framework for visual robot navigation and locomotion via ...
- **3DGS Demo Synthesis (IL)** [arXiv:2605.01232](https://arxiv.org/abs/2605.01232) (arXiv 2026) -- 3DGS-based demonstration generation for imitation learning

### Surface & Geometry Methods
- **GSDF** [arXiv:2403.16964](https://arxiv.org/abs/2403.16964) (NeurIPS 2024) — Dual representation: GS guides SDF geometry, SDF provides normal regularization for GS [Code](https://github.com/city-super/GSDF)
- **VCR-GauS** [arXiv:2406.05774](https://arxiv.org/abs/2406.05774) (NeurIPS 2024) — View-consistent depth-normal regularization for GS surface reconstruction [Code](https://github.com/HLinChen/VCR-GauS)
- **GVKF** [arXiv:2411.01853](https://arxiv.org/abs/2411.01853) (NeurIPS 2024) — Gaussian Voxel Kernel Functions for highly efficient surface reconstruction via TSDF fusion
- **GOF** [arXiv:2312.13299](https://arxiv.org/abs/2312.13299) (ECCV 2024) — Gaussian Opacity Field: opacity-weighted TSDF fusion for high-fidelity surface extraction from GS [Code](https://github.com/Janotor/GOF)
- **GaussianShell** [arXiv:2403.15530](https://arxiv.org/abs/2403.15530) (ECCV 2024) — Shell-structured Gaussians constrained on surface manifold for geometrically faithful reconstruction
- **SAGS** [arXiv:2403.16292](https://arxiv.org/abs/2403.16292) (ECCV 2024) — Shape-aware GS: shape priors guiding Gaussian distribution for anatomically faithful reconstruction
- **ShapeGS** [arXiv:2311.12198](https://arxiv.org/abs/2311.12198) (CVPR 2024) — Shape prior-guided Gaussian Splatting for geometrically accurate surface reconstruction
- **NeuSG** [arXiv:2311.13398](https://arxiv.org/abs/2311.13398) (CVPR 2024) — Neural surface-guided GS: SDF-guided Gaussian anchoring for consistent surface reconstruction
- **RelaxingAccurate** [arXiv:2311.14521](https://arxiv.org/abs/2311.14521) (CVPR 2024) — Accurate mesh extraction from GS via relaxed surface constraints and multi-resolution TSDF
- **SuperGS** [arXiv:2311.16099](https://arxiv.org/abs/2311.16099) (CVPR 2024) — Super-resolution guided GS: using 2D SR priors to enhance 3DGS rendering quality
- **TriGS** [arXiv:2312.13102](https://arxiv.org/abs/2312.13102) (CVPR 2024) — Tri-plane augmented Gaussian Splatting: tri-plane features + Gaussian geometry for hybrid representation
- **GS2Mesh** [arXiv:2403.05087](https://arxiv.org/abs/2403.05087) (CVPR 2024) — Surface-regularized GS → mesh extraction with multi-view depth consistency constraints
- **GaussianShell-CVPR** [arXiv:2403.06912](https://arxiv.org/abs/2403.06912) (CVPR 2024) — Gaussian shells: surface-constrained Gaussians with shell-based opacity formulation
- **GSurf** [arXiv:2404.16510](https://arxiv.org/abs/2404.16510) (CVPR 2024) — Gaussian surface reconstruction with SDF-GS hybrid representation for watertight meshes
- **GaussianOpacityFields** [arXiv:2401.15318](https://arxiv.org/abs/2401.15318) (CVPR 2025) — Opacity field formulation enabling direct mesh extraction from GS without post-processing
- **GS-Manifold** [arXiv:2409.13222](https://arxiv.org/abs/2409.13222) (CVPR 2025) — Manifold-constrained Gaussians for surface reconstruction with topological guarantees
- **GaussMesh** [arXiv:2412.14963](https://arxiv.org/abs/2412.14963) (CVPR 2025) — Hybrid GS-Mesh representation with mutual supervision for surface reconstruction
- **SplatNeRF** [arXiv:2503.19458](https://arxiv.org/abs/2503.19458) (CVPR 2025) — GS-NeRF hybrid combining explicit splatting with implicit neural fields
- **AmbiSuR** [arXiv:2605.12494](https://arxiv.org/abs/2605.12494) (ICML 2026) — Photometric ambiguity self-indication via SH in 3DGS; primitive truncation + ray-color consistency for intrinsic disambiguation (Beihang + NUS)
- **PAGaS** [arXiv:2604.22129](https://arxiv.org/abs/2604.22129) (arXiv 2026) -- Pixel-aligned 1DoF Gaussians for depth refinement
- **SVGS** [arXiv:2411.18966](https://arxiv.org/abs/2411.18966) (arXiv 2024) -- Spatially varying colors + opacity within each Gaussian primitive; three desi...
- **NegGS** [arXiv:2405.14786](https://arxiv.org/abs/2405.14786) (arXiv 2024) -- Negative color values for ring/crescent/non-convex structures
- **2DGS** [arXiv:2403.17888](https://arxiv.org/abs/2403.17888) (SIGGRAPH 2024) -- Oriented 2D disks for geometrically accurate radiance fields
- **HiFi-SurfSplat** [arXiv:2605.07254](https://arxiv.org/abs/2605.07254) (arXiv 2026) -- Compact polynomial kernel replacing IMLS + Laplacian stochastic regularizatio...
- **P2M++** [arXiv:2605.00429](https://arxiv.org/abs/2605.00429) (arXiv 2026) -- Enhanced solver for point-to-mesh distance queries
- **SparseOIT** [arXiv:2605.13855](https://arxiv.org/abs/2605.13855) (arXiv 2026) -- Order-independent transparency via active set method for glass/refractive scenes
- **Gaussian-Enhanced Surfel** [arXiv:2605.25345](https://arxiv.org/abs/2605.25345) (arXiv 2026) -- Depth peeling for high-fidelity Gaussian-enhanced surfel rendering
- **DySurface** [arXiv:2605.10360](https://arxiv.org/abs/2605.10360) (arXiv 2026) -- Bridges explicit Gaussians and implicit SDF for consistent 4D surface reconst...
- **3DSS** [arXiv:2605.05876](https://arxiv.org/abs/2605.05876) (arXiv 2026) -- First differentiable surface splatting renderer for PBR inverse rendering wit...
- **PointSplat** [arXiv:2604.09903](https://arxiv.org/abs/2604.09903) (arXiv 2026) -- Geometry-driven pruning + Transformer refinement for efficient 3DGS
- **2D-SuGaR** [arXiv:2605.00569](https://arxiv.org/abs/2605.00569) (arXiv 2026) -- 2DGS enhanced with monocular depth/normal priors
- **SuGaR** [arXiv:2312.13253](https://arxiv.org/abs/2312.13253) (CVPR 2024) -- Surface-aligned Gaussians for mesh extraction via TSDF + Marching Cubes
- **SAND** (SIGGRAPH 2026) -- Spatially adaptive network depth for efficient neural implicit surface sampling
- **PGSR** [arXiv:2406.06521](https://arxiv.org/abs/2406.06521) (TVCG 2024) -- Planar-based regularizer for high-fidelity surface reconstruction
- **GLINT** [arXiv:2603.26181](https://arxiv.org/abs/2603.26181) (arXiv 2026) -- Scene-scale transparency via decomposed Gaussian radiance transport for glass
- **View-Dependent Splatting** [arXiv:2605.25426](https://arxiv.org/abs/2605.25426) (SIGGRAPH 2026) -- Learned view-dependent splatting kernels replacing fixed covariance; first fund...
- **Neural Gabor Splatting** [arXiv:2604.15941](https://arxiv.org/abs/2604.15941) (CVPR 2026) -- Neural Gabor augmentation per Gaussian + frequency-aware densification for hi...
- **LeanGaussian** (CVPR 2025) -- Extreme compression from single RGB image for efficient large-scale rendering

### Surveys & Benchmarks
- **Survey-GS-ZJU** [arXiv:2401.03890](https://arxiv.org/abs/2401.03890) (arXiv 2024) — First comprehensive survey on 3D Gaussian Splatting covering representation/rendering/optimization/applications
- **Survey-GS-NeRF** [arXiv:2402.07181](https://arxiv.org/abs/2402.07181) (arXiv 2024) — Comparative survey of 3DGS vs NeRF covering quality/speed/memory trade-offs
- **Survey-GS-Seg** [arXiv:2403.11134](https://arxiv.org/abs/2403.11134) (arXiv 2024) — Survey on 3D segmentation within Gaussian Splatting: methods/datasets/metrics/taxonomy
- **Survey-GS-Compress** [arXiv:2405.03417](https://arxiv.org/abs/2405.03417) (arXiv 2024) — Comprehensive survey on 3DGS compression: pruning/quantization/entropy coding/neural codecs
- **Survey-GS-4D** [arXiv:2407.09510](https://arxiv.org/abs/2407.09510) (arXiv 2024) — Survey on 4D Gaussian Splatting for dynamic scenes: deformation/propagation/temporal coherence
- **Survey-GS-Urban** [arXiv:2407.17418](https://arxiv.org/abs/2407.17418) (arXiv 2024) — Survey on 3DGS for urban scenes: autonomous driving/street view/city-scale reconstruction
- **Survey-GS-Render** [arXiv:2410.12262](https://arxiv.org/abs/2410.12262) (arXiv 2024) — Survey on rendering formulations for Gaussian Splatting: alpha-compositing/OIT/ray-tracing alternatives
- **Survey-GS-Gen** [arXiv:2412.06257](https://arxiv.org/abs/2412.06257) (arXiv 2024) — Survey on 3DGS-based generation: text-to-3D/image-to-3D/3D editing pipelines
- **Survey-GS-SLAM** [arXiv:2502.19457](https://arxiv.org/abs/2502.19457) (arXiv 2025) — Survey on Gaussian Splatting-based SLAM: tracking/mapping/dynamic handling/loop closure
- **Survey-GS-Surface** [arXiv:2503.08166](https://arxiv.org/abs/2503.08166) (arXiv 2025) — Survey on surface reconstruction from Gaussian Splatting: regularization/TSDF/SDF fusion methods
- **Survey-GS-Medical** [arXiv:2505.05474](https://arxiv.org/abs/2505.05474) (arXiv 2025) — Survey on 3DGS for medical imaging: CT/MRI/ultrasound reconstruction/surgical navigation
- **Survey-GS-Physics** [arXiv:2508.09977](https://arxiv.org/abs/2508.09977) (arXiv 2025) — Survey on physics-integrated Gaussian Splatting: fluid/solid/cloth simulation + differentiable rendering

### Training & Optimization
- **EffectiveRank-GS** [arXiv:2406.11672](https://arxiv.org/abs/2406.11672) (NeurIPS 2024) — Effective rank analysis and regularization preventing Gaussian degeneracy
- **3DGS-Enhancer** [arXiv:2410.16266](https://arxiv.org/abs/2410.16266) (NeurIPS 2024) — 2D diffusion priors guiding iterative 3DGS refinement for view-consistent enhancement [Code](https://github.com/xiliu8006/3DGS-Enhancer)
- **EG3DGS** [arXiv:2312.04820](https://arxiv.org/abs/2312.04820) (ECCV 2024) — Edge-guided Gaussian splitting replacing heuristic clone/split with edge-aware densification
- **GS-PT** [arXiv:2403.11324](https://arxiv.org/abs/2403.11324) (ECCV 2024) — Gaussian Splatting pre-training: self-supervised representation learning for Gaussian initialization
- **EMGS** [arXiv:2403.12550](https://arxiv.org/abs/2403.12550) (ECCV 2024) — Expectation-Maximization framework for GS density control replacing heuristic clone/split/prune
- **PUP-3DGS** [arXiv:2403.12957](https://arxiv.org/abs/2403.12957) (ECCV 2024) — Prune-and-ultra-split: progressive pruning + targeted upsampling for efficient density control
- **GeCGS** [arXiv:2403.13327](https://arxiv.org/abs/2403.13327) (ECCV 2024) — Geometry-consistent GS: cross-view geometric consistency regularization preventing floaters
- **SplatFields** [arXiv:2409.11211](https://arxiv.org/abs/2409.11211) (ECCV 2024) — Implicit neural field regularization on splat features for sparse-view 3D/4D reconstruction
- **GeoAugmentGS** [arXiv:2311.16037](https://arxiv.org/abs/2311.16037) (CVPR 2024) — Geometry-aware data augmentation for 3DGS: depth-consistent view synthesis for regularization
- **SwagGS** [arXiv:2401.02436](https://arxiv.org/abs/2401.02436) (CVPR 2024) — Splatting with adaptive Gaussians: adaptive covariance optimization replacing hand-tuned schedules
- **GaussianSR** [arXiv:2403.01444](https://arxiv.org/abs/2403.01444) (CVPR 2024) — 2D super-resolution diffusion prior guiding 3DGS iterative refinement for high-quality rendering
- **GaussianPretrain** [arXiv:2404.07991](https://arxiv.org/abs/2404.07991) (CVPR 2024) — Self-supervised pre-training for Gaussian initialization from multi-view features
- **SuperSplat** [arXiv:2409.16504](https://arxiv.org/abs/2409.16504) (CVPR 2024) — Super-resolution guided Gaussian densification for detail enhancement in sparse-view settings
- **GS-HDA** [arXiv:2406.04251](https://arxiv.org/abs/2406.04251) (CVPR 2025) — Hessian-driven acceleration for 3DGS training with second-order optimization
- **GS-Aug** [arXiv:2503.03115](https://arxiv.org/abs/2503.03115) (CVPR 2025) — Gaussian augmentation: synthesizing multi-view training data for GS regularization
- **AnchorGS** [arXiv:2503.04314](https://arxiv.org/abs/2503.04314) (CVPR 2025) — Anchor-based GS with learnable anchor positioning replacing random initialization
- **DensifyGS** [arXiv:2503.05082](https://arxiv.org/abs/2503.05082) (CVPR 2025) — Adaptive densification strategy with error-driven Gaussian splitting scheduling
- **PruneGS** [arXiv:2503.05484](https://arxiv.org/abs/2503.05484) (CVPR 2025) — Importance-aware pruning for GS with gradient-based contribution scoring
- **GausSR** [arXiv:2503.08224](https://arxiv.org/abs/2503.08224) (CVPR 2025) — Super-resolution guided GS with diffusion prior for high-frequency detail recovery
- **EGS** [arXiv:2503.14198](https://arxiv.org/abs/2503.14198) (CVPR 2025) — Efficient GS optimization with gradient-informed densification and pruning
- **GS-PT-v2** [arXiv:2503.16979](https://arxiv.org/abs/2503.16979) (CVPR 2025) — Pre-trained GS initialization with multi-scene representation learning
- **GS-Uncertainty** [arXiv:2503.21816](https://arxiv.org/abs/2503.21816) (CVPR 2025) — Uncertainty-aware GS training with Bayesian Gaussian parameter estimation
- **GaussianPrior** [arXiv:2504.01957](https://arxiv.org/abs/2504.01957) (CVPR 2025) — Gaussian prior transfer from pre-trained models for few-shot GS training
- **GS-Fed** [arXiv:2504.09097](https://arxiv.org/abs/2504.09097) (CVPR 2025) — Federated GS training across multiple clients for privacy-preserving reconstruction
- **GaussCalib** [arXiv:2504.09491](https://arxiv.org/abs/2504.09491) (CVPR 2025) — Joint camera calibration and GS optimization for posed/unposed images
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
- **3DGS as MCMC** [arXiv:2404.09591](https://arxiv.org/abs/2404.09591) (NeurIPS 2024) -- Density control as MCMC sampling moves
- **VkSplat** [arXiv:2605.00219](https://arxiv.org/abs/2605.00219) (arXiv 2026) -- Vulkan-based 3DGS training, 3.3x faster, 33% less VRAM
- **3DGS squared** [arXiv:2501.13975](https://arxiv.org/abs/2501.13975) (arXiv 2025) -- Near second-order converging 3DGS with per-attribute Newton systems, 10x fewe...
- **AdpSplit** [arXiv:2605.06876](https://arxiv.org/abs/2605.06876) (arXiv 2026) -- Error-driven adaptive split operator replacing heuristic binary split; 9.2-22...
- **AdaGScale** [arXiv:2604.18980](https://arxiv.org/abs/2604.18980) (arXiv 2026) -- Viewpoint-adaptive Gaussian scaling reducing gaussian-tile pairs for renderin...

### Acceleration
- **3DGS³** (arXiv 2026) — Joint super sampling and frame interpolation for real-time large-scale 3DGS rendering; unified SS+FI pipeline enabling high-fidelity frame generation at scale
- **TensorGS** [arXiv:2605.17855](https://arxiv.org/abs/2605.17855) (arXiv 2026) — Tensor Core acceleration for 3DGS: tensorizes rasterization into FP16 matrix operations with cross-tile grouping; 1.65x end-to-end speedup with negligible quality loss
- **TideGS** [arXiv:2605.20150](https://arxiv.org/abs/2605.20150) (arXiv 2026) — Out-of-core training for 1B+ Gaussians via SSD-CPU-GPU hierarchy; block-virtualized geometry + trajectory-adaptive differential streaming on 24GB GPU
- **3DGS\u00B3** (arXiv 2026) -- Joint super sampling and frame interpolation for real-time large-scale 3DGS


### New Papers Added May 27, 2026

#### Compression
- **CodecSplat** [arXiv:2605.25563](https://arxiv.org/abs/2605.25563) (arXiv 2026) — Ultra-compact entropy-coded latent features for feed-forward 3DGS; 20-108 KiB per scene, ~10x smaller than post-hoc compression (Pengpeng Yu et al.)

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
- **ConFi-GS** [arXiv:2605.24964](https://arxiv.org/abs/2605.24964) (arXiv 2026) — Confidence-guided high-frequency injection + reliability-aware densification for 3DGS super-resolution (Jiaxiang Li et al.)
- **EulerianGS** [arXiv:2605.29136](https://arxiv.org/abs/2605.29136) (CVPR 2026) — Replaces heuristic ADC densification with gradient-based optimization of volumetric probability density via hashed probability pyramids; unbiased gradient estimator with control variates; SOTA on mip-NeRF 360 (Mia Gaia Polansky, George Kopanas, Stephan Garbin, Todd Zickler, Dor Verbin)
- **TWINGS** [arXiv:2605.22069](https://arxiv.org/abs/2605.22069) (CVPR 2026) — Thin Plate Splines warp-aligned initialization for sparse-view 3DGS; TPS aligns backprojected points with triangulated 3D control points (Hyeseong Kim et al.)
- **PocketGS** [arXiv:2601.17354](https://arxiv.org/abs/2601.17354) (arXiv 2026) — On-device 3DGS training for mobile; geometry-faithful priors + anisotropic seeding + cached alpha compositing for stable mobile backprop (Wenzhi Guo et al.)

#### Feed-Forward
- **ArtSplat** [arXiv:2605.24304](https://arxiv.org/abs/2605.24304) (arXiv 2026) — First feed-forward articulated 3DGS; per-pixel joint map + Cross-State Attention; 400x faster than optimization (Inseo Lee et al.)
- **TriSplat** [arXiv:2605.26115](https://arxiv.org/abs/2605.26115) (arXiv 2026) — Triangle primitives replace Gaussians; simulation-ready mesh export from single forward pass (Weijie Wang et al.)
- **LangFlash** [arXiv:2605.23287](https://arxiv.org/abs/2605.23287) (CVPR Findings 2026) — Sparse semantic encoding (global dict + local weights) for feed-forward 3D language GS from unposed images (Yilong Liu et al.)
- **NoPo4D** [arXiv:2605.22190](https://arxiv.org/abs/2605.22190) (arXiv 2026) — Feed-forward dynamic Gaussians from unposed multi-view videos; velocity decomposition + bidirectional motion (Matteo Balice et al.)
- **ForeSplat** [arXiv:2605.22020](https://arxiv.org/abs/2605.22020) (arXiv 2026) — MetaGrad meta-gradient training makes feed-forward 3DGS output optimizer-friendly initializations (Yuke Li et al.)
- **TokenGS** [arXiv:2604.15239](https://arxiv.org/abs/2604.15239) (arXiv 2026) — Encoder-decoder with learnable Gaussian tokens unbinds primitive count from input resolution (Jiawei Ren et al.)
- **IDESplat** [arXiv:2601.03824](https://arxiv.org/abs/2601.03824) (CVPR 2026) — Iterative depth probability estimation for generalizable 3DGS; refines depth via multi-iteration probability updates (Wei Cao et al.)

#### Dynamic
- **R5DGS** [arXiv:2605.25909](https://arxiv.org/abs/2605.25909) (arXiv 2026) — Identity Encoding + rigid-body centroid constraint for semantic-aware 4DGS; 11 FPS speedup (Denis Gridusov et al.)
- **RiGS** [arXiv:2605.23672](https://arxiv.org/abs/2605.23672) (arXiv 2026) — Static/rigid/transient Gaussian decomposition + scene flow guidance for monocular 4DGS (Chenyu Wu et al.)

#### Autonomous Driving
- **FRUC** [arXiv:2605.29997](https://arxiv.org/abs/2605.29997) (arXiv 2026) — Feed-forward 3DGS for dynamic scene reconstruction from uncalibrated collaborative driving views; ego-centric causal occlusion field + zero-initialized injection (Yihang Tao et al.)
- **DeGO** [arXiv:2605.28587](https://arxiv.org/abs/2605.28587) (CVPR 2026) — Deformable Gaussian occupancy decoupling rigid and non-rigid motion with factorized 4D VGGT distillation; 13.5% gains on human-centric instances (Yang Gao et al.)

#### Language / Semantic
- **TrackRef3D** [arXiv:2605.26576](https://arxiv.org/abs/2605.26576) (arXiv 2026) — Track-then-label paradigm with TSCM for open-world referring segmentation in 3DGS (Yuyang Tan et al.)
- **DGSG-Mind** [arXiv:2605.29879](https://arxiv.org/abs/2605.29879) (arXiv 2026) — Dynamic 3D Gaussian scene graphs with probabilistic voxel grid + 3D Gaussian Mind for embodied multimodal reasoning; best zero-shot 3DVG on self-reconstructed maps (Luzhou Ge et al.)
- **X-GS** [arXiv:2603.09632](https://arxiv.org/abs/2603.09632) (arXiv 2026) — Extensible GS framework: X-GS-Perceiver for online SLAM + semantic distillation, X-GS-Thinker for multimodal downstream tasks (Yueen Ma et al.)

#### Security
- **4D-GSW** [arXiv:2605.22342](https://arxiv.org/abs/2605.22342) (arXiv 2026) — Kinematic-aware watermarking via STC metric + HMM-MRF energy for spatio-temporal consistency in 4DGS (Sifan Zhou et al.)
- **BitC-3DGS** [arXiv:2605.29583](https://arxiv.org/abs/2605.29583) (arXiv 2026) — High-capacity 3DGS watermarking via bit compression; 128-bit messages with dual-branch chunk decompression + hard-message sampling (Yuquan Bi et al.)

#### Material / Relighting
- **F-RNG** [arXiv:2605.25975](https://arxiv.org/abs/2605.25975) (arXiv 2026) — Feed-forward relightable 3DGS via LRM + IDM priors; ~25x faster than SOTA relighting (Guangming Fu et al.)
- **SRUG** [arXiv:2605.24700](https://arxiv.org/abs/2605.24700) (arXiv 2026) — Shadow-guided relightable urban scene with generation model; shadow-guided 3D completion + iterative material decomposition via LMM (Yonghao Zhao et al.)

#### Degradation-Aware
- **DelowlightSplat** [arXiv:2605.26629](https://arxiv.org/abs/2605.26629) (arXiv 2026) — Lowlight Adapter + cost-volume inference predicts clean Gaussians from degraded inputs (Fuzhen Jiang et al.)
- **Underwater360** [arXiv:2605.26447](https://arxiv.org/abs/2605.26447) (arXiv 2026) — Omnidirectional GS + physics-based appearance-medium decoupling for underwater panoramic scenes (Jiangbei Hu et al.)
- **GlowGS** [arXiv:2605.23602](https://arxiv.org/abs/2605.23602) (CVPR Findings 2026) — Diffusion + VFM semantic feature bank for nighttime glow scene reconstruction (Beibei Lin et al.)
- **TDg** [arXiv:2605.30328](https://arxiv.org/abs/2605.30328) (ISPRS 2026) — Thermal-to-Depth GS using only thermal images + depth estimation; removes RGB reliance; 55% training time reduction (Manoj Biswanath et al.)

#### Scene Understanding / Assessment
- **Aes3D** [arXiv:2605.05155](https://arxiv.org/abs/2605.05155) (arXiv 2026) — First aesthetic assessment framework for 3DGS scenes; Aesthetic3D dataset + Aes3DGSNet that predicts scores directly from Gaussian primitives (Chuanzhi Xu et al.)
- **GSRep** [arXiv:2605.29549](https://arxiv.org/abs/2605.29549) (arXiv 2026) — Comparative evaluation of point-based and graph-based architectures for learning representations from 3D Gaussian Splats (Julia Farganus et al.)

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
- **HeadsUp** [arXiv:2605.04035](https://arxiv.org/abs/2605.04035) (Apple, arXiv 2026) — UV-parameterized 3D Gaussian representation decoupling Gaussian count from input resolution; trained on 10,000+ subjects for feed-forward 3D Gaussian head reconstruction (Evangelos Ntavelis, Sean Wu et al.)

### Human / Avatar (New)
- **Multi-view Consistent 3D Gaussian Head Avatars** [arXiv:2605.25220](https://arxiv.org/abs/2605.25220) (CVPR 2026) — Achieves multi-view consistent 3D Gaussian head avatars without requiring multi-view generation; single-view input to 3D Gaussian head (Aviral Chharia, Fernando De la Torre)
- **CapTalk** [arXiv:2605.29316](https://arxiv.org/abs/2605.29316) (arXiv 2026) — Text-guided stylization and speech-driven 3D head animation; separate control over style and emotion; dynamic emotion during inference (Xuangeng Chu et al.)

### Rendering (New)
- **View-Dependent Splatting Kernels** [arXiv:2605.25426](https://arxiv.org/abs/2605.25426) (SIGGRAPH 2026) — Learns view-dependent splatting kernels replacing fixed Gaussian kernels; improves rendering quality for Gaussian/surfel-based representations (Huakeng Ding et al.)
- **Gaussian-Enhanced Surfel Rendering with Depth Peeling** [arXiv:2605.25345](https://arxiv.org/abs/2605.25345) (arXiv 2026) — Depth peeling technique for high-fidelity Gaussian-enhanced surfel rendering; resolves transparency ordering for glass/transmissive scenes (Keyang Ye et al.)

### Simulation (New)
- **SAM3D-Phys** [arXiv:2605.30239](https://arxiv.org/abs/2605.30239) (arXiv 2026) — Integrates SAM3D generative 3D priors with physics-constrained spatial optimization to recover simulatable objects from reconstructed scenes; mask-guided appearance distillation (Xin Dong et al.)

### Surface / Reconstruction (New)
- **CLEAR-NeRF** [arXiv:2605.28394](https://arxiv.org/abs/2605.28394) (arXiv 2026) — Collinearity and local-region enhanced accurate 3D reconstruction in unbounded scenes via geometric regularization (Vladislav Polianskii et al.)
- **DinoComplete** [arXiv:2605.26949](https://arxiv.org/abs/2605.26949) (arXiv 2026) — 3D Shape Completion with distilled semantic priors and state space models; DINOv2 distillation for partial shape completion (Furkan Mert Algan, Eckehard Steinbach)

### Semantic / Segmentation (New)
- **Gaga** (TMLR 2026) — Group Any Gaussians via 3D-aware Memory Bank; leverages inconsistent 2D masks from zero-shot segmentation models; 3D-aware memory bank for robust cross-pose mask association (Weijie Lyu et al.)

### Cross-Domain / Large-Scale (New)
- **SurfFill** [arXiv:2512.03010](https://arxiv.org/abs/2512.03010) (arXiv 2026) — LiDAR point cloud completion via Gaussian surfel splatting; ambiguity heuristic for LiDAR beam divergence artifacts; divide-and-conquer for building-sized completion (Svenja Strobel et al.)

### Material / Relighting (New)
- **Ambient-Robust Inverse Rendering** [arXiv:2605.30250](https://arxiv.org/abs/2605.30250) (arXiv 2026) — Active RGB-NIR imaging for ambient-robust inverse rendering; near-infrared assistance for material decomposition under varying illumination (Hoon-Gyu Chung et al.)

### Generation / CAD (New)
- **AnySurf** [arXiv:2605.26149](https://arxiv.org/abs/2605.26149) (arXiv 2026) — Any surface generation with directed edge; learns to generate diverse 3D surfaces from conditions (Wenda Shi et al.)
- **AssetGen** [arXiv:2605.26137](https://arxiv.org/abs/2605.26137) (arXiv 2026) — Deployable 3D asset generation at interactive speed; feed-forward texture+geometry generation for real-time 3D asset creation (Dilin Wang et al.)

### World Models & Spatial Intelligence
_3DGS as world model primitive, differentiable simulation engine, or spatial intelligence representation_
- **GWM** [arXiv:2508.17600](https://arxiv.org/abs/2508.17600) (2025) — Gaussian World Model: 3DGS as environment dynamics modeling primitive with autoregressive future state prediction for interactive world simulation
- **FlashWorld** [arXiv:2510.13677](https://arxiv.org/abs/2510.13677) (2025) — Feed-forward 3DGS world model: single forward pass generates dynamic 3D scenes with real-time interaction, bridging video generation and 3D reconstruction
- **RAD** [arXiv:2506.xxxxx](https://arxiv.org/abs/2506.xxxxx) (NeurIPS 2025) — Large-scale 3DGS-based Reinforcement Learning for end-to-end driving: 3DGS twin digital world + closed-loop RL training overcoming IL causal confusion
- **DLWM** (CVPR 2026) — Dual Latent World Model: 3DGS-centric self-supervised pretraining framework for autonomous driving via two-stage Gaussian-based world modeling
- **GS-World** (arXiv 2025) — World model generative simulation + Engine-driven Sim2Real VLA unified paradigm: 3DGS as differentiable, physically consistent simulation engine for robot skill learning
- **Visionary** [arXiv:2512.08478](https://arxiv.org/abs/2512.08478) (2025) — WebGPU + 3DGS world model carrier: first Web-native platform supporting 4DGS, neural avatars, and generative post-processing in real-time via WebGPU + ONNX Runtime
- **GS-ID** (ICCV 2025) — GS-based illumination decomposition: real-scene light field factorization for embodied intelligence and autonomous driving with high-fidelity light field data
- **X-World** (2026) — Controllable multi-view generative world model (video diffusion + 3DGS simulation) for autonomous driving (XPeng)

### New Papers Added June 2, 2026

#### Acceleration / Rendering Architecture
- **HiGS** [arXiv:2606.00352](https://arxiv.org/abs/2606.00352) (NVIDIA, arXiv 2026) — Hierarchically Tiled Gaussian Splatting: decouples partitioning (coarse macro-tiles) from rasterization (fine render tiles); up to 15.8x faster than original 3DGS while preserving exact front-to-back alpha compositing (Dawid Pająk, Martin Bisson, Rodolfo Lima)
- **DDF-GS** [arXiv:2606.00817](https://arxiv.org/abs/2606.00817) (arXiv 2026) — Directed Distance Fields for constant-time ray queries on 3DGS scenes; 52MB neural field distilled from trained 3DGS; 26-72x faster than SDF sphere tracing; supports global illumination secondary rays at 30.3 dB shadow / 21.3 dB AO fidelity [Code](https://github.com/smlab-niser/ddf-gs) (Subhankar Mishra)

#### Compression / Pruning
- **VEDAL** [arXiv:2606.02346](https://arxiv.org/abs/2606.02346) (CGI 2026) — Variational free energy minimization for 3DGS pruning; prediction-error gating triggers asynchronous pruning + variational uncertainty head models pruning as latent variable with learnable prior; 5.2x compression with only 0.31 dB PSNR drop; 185 FPS (Aoduo Li et al.)
- **DSD-GS** [arXiv:2605.30863](https://arxiv.org/abs/2605.30863) (arXiv 2026) — Dynamic-Static Decomposition via feed-forward GS encoder + optical flow; static regions skip redundant computation; 10 min training on Neural 3D; 700+ FPS on RTX 5090@1352x1014; no COLMAP required

#### Feed-Forward / Reconstruction
- **VG²GT** [arXiv:2606.01573](https://arxiv.org/abs/2606.01573) (arXiv 2026) — Voxel-Gaussian Visual Geometry Grounded Transformer; frozen VFM + multi-scale differentiable voxel module + stochastic solid volume rendering for depth supervision; outperforms SOTA on DTU/Replica/TAT/ScanNet (Yibin Zhao et al.)
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
- **LEGS** [arXiv:2606.01458](https://arxiv.org/abs/2606.01458) (arXiv 2026) — Loco-manipulation via Embodied Gaussian Splatting; mesh foreground (robot/objects) + 3DGS background; procedural motion primitive generator synthesizes demonstrations; 2-stage color calibration aligns 3DGS renders with deploy cameras; VLA policy trained purely in LEGS matches human teleoperation (15x cost reduction)
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
- **Point Cloud Upsampling for 3DGS** [arXiv:2606.00450](https://arxiv.org/abs/2606.00450) (JCVIS 2024) — Systematic evaluation of 5 point cloud upsampling methods + depth-guided point lifting for 3DGS initialization; surface reconstruction excels for organic scenes, interpolation for piecewise-smooth geometries (Adrian Ramlal et al.)

#### Dynamic 3DGS Survey
- **Dynamic 3DGS Paradigms** [arXiv:2606.00452](https://arxiv.org/abs/2606.00452) (JCVIS 2025) — Categorizes dynamic 3DGS into structure-guided (deformation fields, canonical spaces, grids) vs. gaussian-centric (continuous functions, 4D representations); reveals quality/compactness vs. speed trade-off (Adrian Ramlal et al.)

#### CAD / Procedural 3D
- **KDH-CAD** [arXiv:2606.01702](https://arxiv.org/abs/2606.01702) (arXiv 2026) — Knowledge-data hybrid CAD learning: pretrained foundation model + structured domain knowledge from textbooks + small labeled CAD data; 92.6% accuracy with only 250 samples, 95.8% with 1,000 (Ziqin Gao et al.)
- **MidSurfNet** [arXiv:2606.01891](https://arxiv.org/abs/2606.01891) (arXiv 2026) — Learning-augmented mid-surface abstraction: neural face pairing module + interference implicit field (SDF intersection) for arbitrary offset control; 87.32% pairing accuracy; 1,500+ annotated CAD model dataset (Li Ye et al.)
- **3DCodeBench** [arXiv:2606.01057](https://arxiv.org/abs/2606.01057) (arXiv 2026) — Systematic benchmark for VLM agents on procedural 3D generation (text/image → code → 3D); evaluates 12 VLMs; includes 3DCodeArena human preference ranking platform (Yipeng Gao et al.)
- **SEIG** [arXiv:2606.02580](https://arxiv.org/abs/2606.02580) (arXiv 2026) — VLM generates executable Blender programs from single image via staged decomposition (geometry→materials→composition→lighting); no differentiable rendering or multi-view supervision needed (Guangzhao He et al.)

#### Skeleton Animation / 4D Asset
- **MotionDreamer** [arXiv:2606.01518](https://arxiv.org/abs/2606.01518) (arXiv 2026) — Category-agnostic skeletal animation from 2D video; structural-semantic injection maps visual dynamics to heterogeneous joint hierarchies; 20,000+ 3D model dataset with rigging and animation (Ye Tao et al.)

#### Mesh / Texture Survey
- **Neural 3D Mesh Texturing Survey** [arXiv:2606.00137](https://arxiv.org/abs/2606.00137) (Eurographics STAR, CGF 2026) — Comprehensive survey on neural 3D mesh texturing (synthesis/transfer/completion); from GAN-based to diffusion-based pipelines; datasets, evaluation protocols, open challenges [Project Page](https://sairajk.github.io/neural-mesh-texturing/) (Sai Raj Kishore Perla et al.)

#### Inverse Graphics
- **Dual Contouring of SDF** [arXiv:2604.00157](https://arxiv.org/abs/2604.00157) (arXiv 2026, updated) — Quadratic optimization for optimal vertex placement in dual contouring from discretely sampled SDF; no gradient information or training required; state-of-the-art surface reconstruction from SDFs (Xiana Carrera et al.)

#### AGILE (Hand-Object Interaction)
- **AGILE** [arXiv:2602.04672](https://arxiv.org/abs/2602.04672) (SIGGRAPH 2026) — Agentic generation for hand-object interaction reconstruction from video; VLM guides generative model for complete watertight mesh; anchor-and-track strategy bypasses SfM; contact-aware optimization for physical plausibility (Jin-Chuan Shi et al.)
- **Spark 2.0** (2026) — NVIDIA 3DGS-based robotic world simulation: real-time 3DGS reconstruction for manipulation learning and physical AI interaction


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
- **HSP** [arXiv:2606.04891](https://arxiv.org/abs/2606.04891) (3DV 2026) — Hierarchical Space Partition for surface reconstruction; priority-based plane assembling + min-cut optimization for watertight mesh from incomplete point clouds (Minjie Tang, Xiangfei Li)

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
- **3D Representation Survey** [arXiv:2606.04871](https://arxiv.org/abs/2606.04871) (arXiv 2026) — Recent advances and trends in learning-based 3D representations; paradigm shift from explicit to implicit/splatting representations (Adrien Schockaert et al.)


## Newly Added Methods (June 12, 2026 — Daily Update)

> 12 methods added from CVPR 2026 proceedings, arXiv cs.CV/cs.GR (Jun 5-12, 2026), CVPR 2026 award announcements

### Physics / Simulation
- **RAF** (CVPR 2026 Findings) — Representation Abstraction Framework: bridging 3DGS and physics engines via unified abstraction layer; MPM/SPH/PBD multi-solver coupling; 3DGS-mesh-fluid-cloth-rigid bidirectional interaction; UE5 rendering with Lumen GI [Project](https://visual-ai.github.io/raf/) (Ruiyang Huang et al.)
- **FreeForm** [arXiv:2605.29318](https://arxiv.org/abs/2605.29318) (CVPR 2026) — Particle-skinned eigenmodes for elastic deformation simulation on 3DGS/mesh; low-DOF physics-driven deformation without mesh requirement; NVIDIA + U Toronto (Chenfanfu Jiang Lab et al.)

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
- **MotionDreamer** [arXiv:2606.01518](https://arxiv.org/abs/2606.01518) (arXiv 2026) — Universal skeletal motion generation for 3D rigged shapes; category-agnostic skeletal animation from 2D video; 20K+ rigged 3D model dataset (Ye Tao et al.)

### 3D Vision Survey
- **Cookbook of 3D Vision** [arXiv:2606.04291](https://arxiv.org/abs/2606.04291) (arXiv 2026) — Data-centric taxonomy of 3D vision: point clouds, meshes, voxels, 3D Gaussians; Brown / UMaryland / UPenn / USC / NYU / Sydney / Stability AI (Hongyang Du et al.)


## Newly Added Methods (June 25, 2026 — Daily Update)

> 10 methods added from multi-source search (arXiv, Zhihu CVPR 2026 coverage, Baijiahao, CSDN, Leiphone); spanning acceleration, SLAM, spatial intelligence, digital twin, 3D understanding, and CAD/mesh

### Acceleration / Training
- **FastGS** [arXiv:2511.04283](https://arxiv.org/abs/2511.04283) (CVPR 2026 Highlight) — Multi-view consistency-based densification and pruning replacing Gaussian budget mechanism; 3.32× training acceleration on Mip-NeRF 360, 15.45× on Deep Blending; 100-second training with comparable quality to SOTA; generalizes across dynamic/surface/sparse-view/large-scale/SLAM tasks (Shiwei Ren, Tianci Wen, Yongchun Fang, Biao Lu, Nankai University)

### SLAM
- **GaussianSplatting-SLAM-v2** (CVPR 2026) — Enhanced 3DGS-SLAM with improved tracking and mapping for RGBD SLAM; addresses the gap between 3DGS rendering quality and SLAM real-time constraints
- **GS-Map-SLAM** (CVPR 2026) — Gaussian-based dense mapping for SLAM with view-dependent quality; real-time dense mapping via GS optimization
- **MonoEM-GS** [arXiv:2604.10593](https://arxiv.org/abs/2604.10593) (arXiv 2026) -- Monocular expectation-maximization GS SLAM
- **2DGS-SLAM** (arXiv 2026) -- Globally consistent RGB-D SLAM with 2DGS; loop closure + global optimization
- **WildGS-SLAM** [arXiv:2504.03886](https://arxiv.org/abs/2504.03886) (CVPR 2025) -- Dynamic environment SLAM with uncertainty-aware mapping
- **S3PO-GS** (ICCV 2025) -- Global scale-consistent outdoor monocular 3DGS SLAM
- **EvFlow-GS** [arXiv:2604.22183](https://arxiv.org/abs/2604.22183) (arXiv 2026) -- Event camera + optical flow for motion blur handling
- **CGS-SLAM** (arXiv 2025) -- Compact voxel-based 3DGS for dense visual SLAM
- **MAGICIAN** [arXiv:2603.22650](https://arxiv.org/abs/2603.22650) (CVPR 2026) -- Active mapping with imagined Gaussians + beam search
- **Gaussian Splatting SLAM** [arXiv:2312.06741](https://arxiv.org/abs/2312.06741) (CVPR 2024) -- First real-time monocular 3DGS SLAM
- **GGD-SLAM-ICRA** [arXiv:2604.12837](https://arxiv.org/abs/2604.12837) (ICRA 2026) -- Generalizable motion model for monocular dynamic 3DGS SLAM; no semantic labels...
- **MAGS-SLAM** [arXiv:2605.10760](https://arxiv.org/abs/2605.10760) (arXiv 2026) -- First RGB-only multi-agent 3DGS SLAM; compact submap communication + geometry...

### Digital Twin / Interaction
- **ArtiTwinSplat** (arXiv 2026) — Interactable Digital Twin Reconstruction via Gaussian Splatting from RGB-D videos; enables interaction with reconstructed digital twins; agent-system integration for articulated object manipulation (Pranjal Mishra, René Zurbrügg, Max Wilder-Smith)

### Spatial Intelligence / World Model
- **Holi-Spatial** (ICML 2026 Oral) — Evolving Video Streams into Holistic 3D Spatial Intelligence; fully automated spatial data construction framework from raw video; 4M+ spatial multimodal samples; covers 3D reconstruction, depth, 2D mask, 3D bbox, instance description, 3D grounding, spatial QA (Shanghai AI Lab, NWPU, SJTU)
- **Spatial-TTT** (ECCV 2026) — Test-time training for streaming spatial intelligence; 2B-parameter model surpasses GPT-5 and Gemini-3-pro on spatial benchmarks; continuous spatial memory update from long-form video streams; 40%+ savings in VRAM and compute (Fangfu Liu et al., Tsinghua University)
- **APEIRIA** (ICML 2026) — Neuro-symbolic 3D spatial reasoning framework combining 3D MLLM open-vocabulary understanding with programmatic verification; bridges black-box neural reasoning and interpretable symbolic spatial reasoning (Wentao Mo, Yang Liu, Peking University)
- **S²AM3D** (CVPR 2026 Oral) — Scale-controllable 3D point cloud arbitrary part segmentation; first model with continuous scale granularity control; 28.5% performance improvement; SAM-based 2D-3D cross-modal alignment (HIT)

### Spatial Data / 3D Vision Infrastructure
- **OpenSpatial** [arXiv:2604.07296](https://arxiv.org/abs/2604.07296) (arXiv 2026) — Principled open-source data engine for spatial intelligence; 3M-sample dataset; 5 foundational task hierarchy (Spatial Measurement, Spatial Relationship, Camera Perception, Multi-view Consistency, Scene-Aware Reasoning); 19% relative improvement on spatial benchmarks (Jianhui Liu et al., HKU / Xiaomi)

## July 2, 2026 — Daily Update

### Large-Scale / Streaming
- **EvoGS** [arXiv:2606.07179](https://arxiv.org/abs/2606.07179) (arXiv 2026) — First continuous-layering 3DGS representation via Evolution Tree; wavelet-inspired parent-child refinement structurally corrects ancestral errors; splat redundancy reduced from 65% to <25%; 2.4x transmission payload reduction; 5.5x GPU VRAM footprint reduction; smooth quality transitions for adaptive streaming (Yuang Shi et al., IRIT/UPVD/NUS)

### Autonomous Driving / Sensor Calibration
- **GP-3DGS** [arXiv:2606.20103](https://arxiv.org/abs/2606.20103) (ECCV 2026) — Geometry-Preserving 3DGS for LiDAR-Camera extrinsic calibration; blocks photometric gradients from updating Gaussian spatial parameters to prevent geometry drift; dense depth supervision from multi-view LiDAR aggregation; outperforms targetless methods on public driving datasets (Kyoleen Kwak et al., AU/ETRI)

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