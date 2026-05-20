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

### CAD / Mesh / Hybrid Methods
- **GS-CAD** [arXiv:2410.17249](https://arxiv.org/abs/2410.17249) (CVPR 2025) — CAD model reconstruction from GS with parametric primitive fitting
- **GaussCAD** [arXiv:2503.19358](https://arxiv.org/abs/2503.19358) (CVPR 2025) — CAD reconstruction from GS with parametric primitive extraction

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

### Cross-Domain Applications
- **GaussVis** [arXiv:2503.01610](https://arxiv.org/abs/2503.01610) (CVPR 2025) — GS-based visualization for scientific data with interactive exploration
- **GS-VQA** [arXiv:2503.23297](https://arxiv.org/abs/2503.23297) (CVPR 2025) — GS quality assessment via view-consistent quality prediction
- **TransmissiveGS** (arXiv 2026) — Residual-guided disentangled Gaussian Splatting for transmissive scene reconstruction; separates reflection and transmission components via residual-guided decomposition
- **RT-Splatting** [arXiv:2605.18263](https://arxiv.org/abs/2605.18263) (CVPR 2026 Highlight) — Joint reflection-transmission modeling with GS; disentangles geometric occupancy from optical opacity per Gaussian; Specular-Aware Gradient Gating reduces floaters
- **AsyncEvGS** [arXiv:2605.07192](https://arxiv.org/abs/2605.07192) (arXiv 2026) — Asynchronous event camera + RGB dual-system for motion-blurred 3DGS; high-resolution async RGB-Event cross-domain pose estimation via VGGT

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
- **AdaptSplat** (arXiv 2026) — Adapting vision foundation models for feed-forward 3DGS; leverages pretrained ViT/DINO features for cross-scene generalizable Gaussian prediction
- **PointForward** (arXiv 2026) — Point-aligned feed-forward driving scene reconstruction via 3DGS; anchor-aligned representation replacing pixel-alignment for autonomous driving

### Few-Shot / Sparse-View
- **Binocular3DGS** [arXiv:2410.18822](https://arxiv.org/abs/2410.18822) (NeurIPS 2024) — Binocular disparity-guided depth + GS joint optimization for sparse views [Code](https://github.com/hanl2010/Binocular3DGS)
- **FewViewGS** [arXiv:2411.02229](https://arxiv.org/abs/2411.02229) (NeurIPS 2024) — Multi-stage coarse-to-fine training strategy for few-view Gaussian Splatting
- **SCGaussian** [arXiv:2411.03637](https://arxiv.org/abs/2411.03637) (NeurIPS 2024) — Structure consistency constraint + geometric regularization for sparse-view GS [Code](https://github.com/prstrive/SCGaussian)
- **CoR-GS** [arXiv:2401.00834](https://arxiv.org/abs/2401.00834) (ECCV 2024) — Co-regularization of two randomly initialized GS fields: co-pruning + pseudo-view augmentation for sparse views
- **GaussianObject** [arXiv:2312.11461](https://arxiv.org/abs/2312.11461) (CVPR 2024) — Object-centric GS from sparse views with depth-regularized Gaussian initialization [Code](https://github.com/Chenyu-Yang-GOAT/GaussianObject)
- **CoR-GS-CVPR** [arXiv:2402.10128](https://arxiv.org/abs/2402.10128) (CVPR 2024) — Consistency regularization for sparse-view GS with depth-conditional diffusion priors
- **FewSplat** [arXiv:2412.21206](https://arxiv.org/abs/2412.21206) (CVPR 2025) — Few-shot GS with diffusion-guided depth completion and feature propagation

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
- **GauHuman-v2** [arXiv:2503.24210](https://arxiv.org/abs/2503.24210) (CVPR 2025) — Second-generation human GS with improved SMPL-guided Gaussian binding
- **SplatTalk** [arXiv:2503.24382](https://arxiv.org/abs/2503.24382) (CVPR 2025) — Audio-driven 3D talking face GS with emotion and style control
- **SplatPose2** [arXiv:2504.13167](https://arxiv.org/abs/2504.13167) (CVPR 2025) — Enhanced pose-conditioned GS with part-level deformation
- **ArtMesh** [arXiv:2605.16582](https://arxiv.org/abs/2605.16582) (arXiv 2026) — Part-aware articulated mesh field: restricted Delaunay remeshing + bidirectional vertex-wise motion consistency for connected triangle mesh reconstruction; Articulate-100 benchmark

### Language / Semantic
- **OpenGaussian** [arXiv:2406.02058](https://arxiv.org/abs/2406.02058) (NeurIPS 2024) — Per-Gaussian feature distillation for point-level open-vocabulary 3D understanding
- **CL-GS** [arXiv:2407.10102](https://arxiv.org/abs/2407.10102) (ECCV 2024) — Contrastive learning for GS semantic features: CLIP-guided per-Gaussian feature distillation
- **LGGS** [arXiv:2409.04196](https://arxiv.org/abs/2409.04196) (CVPR 2025) — Language-guided GS for zero-shot 3D understanding without per-scene training
- **LEGaussians** [arXiv:2412.03911](https://arxiv.org/abs/2412.03911) (CVPR 2025) — Language-embedded Gaussians with CLIP-directed per-Gaussian feature alignment
- **OpenGaussian-v2** [arXiv:2412.06234](https://arxiv.org/abs/2412.06234) (CVPR 2025) — Enhanced open-vocabulary GS with hierarchical feature aggregation
- **SemanticGauss** [arXiv:2412.06250](https://arxiv.org/abs/2412.06250) (CVPR 2025) — Unified semantic Gaussian representation for joint reconstruction and understanding
- **GaussScene** [arXiv:2412.06273](https://arxiv.org/abs/2412.06273) (CVPR 2025) — Scene-graph Gaussian Splatting for structured 3D scene understanding
- **GS-LLM** [arXiv:2412.06767](https://arxiv.org/abs/2412.06767) (CVPR 2025) — LLM-guided GS for reasoning-driven 3D scene understanding and manipulation

### Large-Scale Methods
- **DOGS** [arXiv:2405.13943](https://arxiv.org/abs/2405.13943) (NeurIPS 2024) — Distributed GS with communication-efficient Gaussian consensus for large-scale reconstruction [Code](https://github.com/AIBluefisher/DOGS)
- **SCube** [arXiv:2410.20030](https://arxiv.org/abs/2410.20030) (NeurIPS 2024) — VoxSplats: voxelized splat with hierarchical LOD for large-scale streaming reconstruction [Code](https://github.com/nv-tlabs/SCube)
- **MegaGaussian** [arXiv:2404.14410](https://arxiv.org/abs/2404.14410) (CVPR 2024) — Mega-scale GS training with progressive data loading and chunk-based optimization
- **GaussianCity** [arXiv:2502.11801](https://arxiv.org/abs/2502.11801) (CVPR 2025) — City-scale GS with progressive training and semantic-guided densification
- **Scaffold-v3** [arXiv:2503.06900](https://arxiv.org/abs/2503.06900) (CVPR 2025) — Third-generation Scaffold-GS with neural anchor decoding
- **CityGS-v2** [arXiv:2503.10437](https://arxiv.org/abs/2503.10437) (CVPR 2025) — Second-generation city-scale GS with block-wise training and seamless merging
- **LRG** [arXiv:2504.00387](https://arxiv.org/abs/2504.00387) (CVPR 2025) — Locally-reconstructible GS for scalable large scene rendering

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

### Medical & Biomedical Imaging
- **R2-Gaussian** [arXiv:2405.20693](https://arxiv.org/abs/2405.20693) (NeurIPS 2024) — GS adapted for Radon transform + X-ray volume rendering for tomographic reconstruction [Code](https://github.com/Ruyi-Zha/r2_gaussian)
- **DDGS-CT** [arXiv:2406.02518](https://arxiv.org/abs/2406.02518) (NeurIPS 2024) — Direction-disentangled X-ray volume rendering with Gaussian acceleration for CT
- **EndoGS** [arXiv:2502.01846](https://arxiv.org/abs/2502.01846) (CVPR 2025) — Endoscopic scene reconstruction with GS for surgical navigation
- **CT-GS** [arXiv:2502.02091](https://arxiv.org/abs/2502.02091) (CVPR 2025) — GS-based CT volume reconstruction with sparse-view acceleration
- **GS-UWF** [arXiv:2502.16652](https://arxiv.org/abs/2502.16652) (CVPR 2025) — Ultra-widefield fundus reconstruction with Gaussian Splatting
- **EndoGSim** [arXiv:2605.16022](https://arxiv.org/abs/2605.16022) (MICCAI 2026) — MLLM-guided 4DGS + differentiable MPM for physics-aware endoscopic scene reconstruction and simulation

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

### Simulation & Robotics
- **GIC** [arXiv:2406.14927](https://arxiv.org/abs/2406.14927) (NeurIPS 2024) — Gaussian-Informed Continuum for physical property identification and differentiable simulation [Code](https://github.com/Jukgei/gic)
- **GaussNav** [arXiv:2403.12722](https://arxiv.org/abs/2403.12722) (CVPR 2024) — GS-based navigation with language-guided semantic Gaussian maps for embodied agents
- **SplatSim** [arXiv:2406.10219](https://arxiv.org/abs/2406.10219) (CVPR 2025) — GS-based sim-to-real transfer for robotic manipulation with photorealistic rendering
- **GS-Physics** [arXiv:2410.08107](https://arxiv.org/abs/2410.08107) (CVPR 2025) — Physics-integrated GS with differentiable simulation for rigid/soft body dynamics
- **GaussNav-2** [arXiv:2412.04470](https://arxiv.org/abs/2412.04470) (CVPR 2025) — Enhanced GS navigation with hierarchical semantic Gaussian maps
- **GaussRover** [arXiv:2503.20168](https://arxiv.org/abs/2503.20168) (CVPR 2025) — GS-based rover navigation with terrain-aware Gaussian representation
- **Splat-Nav** [arXiv:2504.06978](https://arxiv.org/abs/2504.06978) (CVPR 2025) — GS-based navigation with Gaussian-anchored topological maps
- **SplatSim-v2** [arXiv:2504.20378](https://arxiv.org/abs/2504.20378) (CVPR 2025) — Enhanced GS simulation with domain randomization for robotic learning

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

### Acceleration
- **3DGS³** (arXiv 2026) — Joint super sampling and frame interpolation for real-time large-scale 3DGS rendering; unified SS+FI pipeline enabling high-fidelity frame generation at scale
- **TensorGS** [arXiv:2605.17855](https://arxiv.org/abs/2605.17855) (arXiv 2026) — Tensor Core acceleration for 3DGS: tensorizes rasterization into FP16 matrix operations with cross-tile grouping; 1.65x end-to-end speedup with negligible quality loss
- **TideGS** [arXiv:2605.20150](https://arxiv.org/abs/2605.20150) (arXiv 2026) — Out-of-core training for 1B+ Gaussians via SSD-CPU-GPU hierarchy; block-virtualized geometry + trajectory-adaptive differential streaming on 24GB GPU

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
- **Spark 2.0** (2026) — NVIDIA 3DGS-based robotic world simulation: real-time 3DGS reconstruction for manipulation learning and physical AI interaction
