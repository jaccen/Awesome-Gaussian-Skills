
# 3DGS Compression & Deployment Methods Database

> Comprehensive database of 3DGS compression, pruning, quantization, streaming, deployment, and hardware acceleration methods.
> Companion: [../SKILL.md](../SKILL.md) | Project: [../../references/3dgs-methods-overview.md](../../references/3dgs-methods-overview.md)

---

## 1. Quantization Methods

Methods that reduce Gaussian attribute bit-width (position, SH, opacity, scale, rotation).

| Method | Type | Venue | Year | ArXiv | Bit-width | Compression | Key Feature | Code |
|--------|------|-------|------|-------|-----------|-------------|-------------|------|
| MesonGS++ | Mixed-precision (post-training) | Under review | 2026 | [2604.26799](https://arxiv.org/abs/2604.26799) | 4–16 per attr | 34x | ILP hyperparameter search; octree geometry; selective VQ; group-wise mixed-precision | [GitHub](https://github.com/mmlab-sigs/mesongs_plus) |
| GETA-3DGS | Joint prune + quantize | arXiv | 2026 | [2605.02086](https://arxiv.org/abs/2605.02086) | 4–8 hetero | ~5x storage | QADG dependency graph; render-aware saliency; no per-scene thresholds | — |
| GSQ | Learned step size + group-wise | CVPR | 2025 | [2411.17190](https://arxiv.org/abs/2411.17190) | 4–8 | — | Group-wise quantization with learnable step sizes | — |
| ContextGS | Context-model entropy coding | NeurIPS | 2024 | [2405.20721](https://arxiv.org/abs/2405.20721) | 8–16 | High | Anchor-level context replaces uniform quantization | [GitHub](https://github.com/wyf0912/ContextGS) |
| SpqGS | Scalable parallel quantization | CVPR | 2025 | [2411.16816](https://arxiv.org/abs/2411.16816) | Hardware-friendly | — | FPGA/ASIC-friendly parallel bit allocation | — |
| SOG-GS | Channel-grouped quantization | CVPR | 2025 | [2411.16443](https://arxiv.org/abs/2411.16443) | Per-channel | — | Preserves inter-Gaussian correlations | — |
| GaussianCodec | Entropy-constrained quant | CVPR | 2025 | [2411.14716](https://arxiv.org/abs/2411.14716) | Rate-distortion opt | — | Learned Gaussian codec with ECVQ | — |
| ZipGS | Pruning + quant + entropy | CVPR | 2025 | [2411.16785](https://arxiv.org/abs/2411.16785) | Variable | — | Volumetric entropy coding | — |
| EAGLES | Quantized embeddings | ECCV | 2024 | [2312.04564](https://arxiv.org/abs/2312.04564) | 8–16 | 10–20x | Coarse-to-fine training + pruning | [GitHub](https://github.com/Exyro/EAGLES) |
| TC-GS | Tri-plane representation | IEEE TVCG | 2026 | — | Implicit via tri-plane | — | Replaces per-Gaussian SH with shared tri-plane features | — |
| SpreG | Separable covariance | CVPR | 2025 | [2411.10504](https://arxiv.org/abs/2411.10504) | Factorized | — | Separable representation factorizing covariance | — |

---

## 2. Pruning & Distillation Methods

Methods that reduce Gaussian count via pruning, coreset selection, knowledge distillation, or merging.

| Method | Strategy | Venue | Year | ArXiv | Compression | Quality Impact | Key Feature | Code |
|--------|----------|-------|------|-------|-------------|---------------|-------------|------|
| Prune Wisely | Adaptive pruning (DoG) | CVPR | 2026 | [2602.24136](https://arxiv.org/abs/2602.24136) | 90% Gaussians | Minimal | Difference-of-Gaussians avoids false positives from texture-frequency aliasing | — |
| VEDAL | Variational pruning | arXiv 2026（venue 待核实） | 2026 | [2606.02346](https://arxiv.org/abs/2606.02346) | 5.2x | 0.31 dB drop | Variational free energy minimization; prediction-error gating; async pruning; 185 FPS | — |
| Provable Pruning via Coresets | Coreset sampling | arXiv | 2026 | [2607.02721](https://arxiv.org/abs/2607.02721) | Theoretical guarantee | Multiplicative approx | First provable coreset construction for 3DGS; sensitivity-based sampling | [GitHub](https://github.com/waseem-m/3dgs_provable_coresets) |
| NanoGS | Merge-based simplification | arXiv | 2026 | [2603.16103](https://arxiv.org/abs/2603.16103) | Training-free | Mass-preserving | Pairwise merging on sparse spatial graph; runs on CPU; preserves standard parameterization | [GitHub](https://github.com/saliteta/NanoGS) |
| LightGaussian | Global+local + SVD distill | NeurIPS | 2024 | [2311.17245](https://arxiv.org/abs/2311.17245) | 15x | High at 200+ FPS | SVD distillation of SH; global importance + local pruning | [GitHub](https://github.com/VITA-Group/LightGaussian) |
| Gaussians on a Diet | Memory-bounded training | arXiv | 2026 | [2604.20046](https://arxiv.org/abs/2604.20046) | 80% peak memory | Iterative grow+prune | Addresses peak training memory spikes; runs on Jetson AGX Xavier | — |
| FAD-GS | Frequency-aware separation | CVPR | 2024 | [2404.10625](https://arxiv.org/abs/2404.10625) | Frequency-separated | Separates low/high freq | Decomposes Gaussians by frequency bands for selective processing | — |
| HybridGS | Explicit prune + implicit coding | CVPR | 2025 | [2411.11921](https://arxiv.org/abs/2411.11921) | Combined | Neural recovery | Pruned Gaussians recovered by implicit neural coding | — |
| Sp2403GS | Importance-based + codebook | CVPR | 2024 | [2312.09147](https://arxiv.org/abs/2312.09147) | Combined | Importance-driven | Sparse GS with importance-based pruning + codebook quantization | — |
| MGS (Matryoshka) | Stochastic budget training | arXiv | 2026 | [2603.19234](https://arxiv.org/abs/2603.19234) | Continuous LoD | Any prefix coherent | Samples random splat budget per iteration; ordered set = continuous quality levels | — |
| FastGS | Consistency-based prune+grow | CVPR | 2026 | [2511.04283](https://arxiv.org/abs/2511.04283) | 3.32x training speed | Comparable to SOTA | Multi-view consistency replaces budget mechanism; 100-second training | — |
| Proxy-GS | Lightweight proxy co-trained | CVPR | 2026 | [2509.24421](https://arxiv.org/abs/2509.24421) | 2.5x speedup | No accuracy loss | Proxy handles 80% queries; full model handles critical views | — |
| MobileGS | Extreme compression | arXiv | 2024 | — | 50–100x | Mobile-acceptable | Aggressive pruning + quantization + neural repurposing | — |

---

## 3. Vector Quantization (VQ) Methods

Codebook-based compression of Gaussian attributes.

| Method | Codebook Type | Venue | Year | ArXiv | Compression | Key Feature | Code |
|--------|--------------|-------|------|-------|-------------|-------------|------|
| CAGS | VQ + LoD layers + reference | SIGGRAPH | 2026 | [2605.09279](https://arxiv.org/abs/2605.09279) | Adaptive | VQ establishes quality LoDs; server-side reference image corrects color distortion (+5–20 dB); representation-agnostic | [GitHub](https://github.com/yindaheng98/ColorAdaptiveGaussianSplatting) |
| VQGS | Residual codebook | CVPR | 2025 | [2411.17067](https://arxiv.org/abs/2411.17067) | High-ratio | Multi-level residual codebook learning | — |
| RDO-Gaussian | ECVQ (entropy-constrained) | ECCV | 2024 | [2406.01597](https://arxiv.org/abs/2406.01597) | 40x+ | End-to-end rate-distortion optimization; dynamic pruning + ECVQ | — |
| CompactGS | Learned per-attribute codebook | ECCV | 2024 | [2404.04908](https://arxiv.org/abs/2404.04908) | 10–15x | Simple codebook with minimal overhead | — |
| HAC | Hash-grid context modeling | ECCV | 2024 | [2403.14530](https://arxiv.org/abs/2403.14530) | ~100x | Learned context modeling via hash grid; entropy coding | [GitHub](https://github.com/yihangchen-ee/HAC) |
| CompGS | Importance-aware quant + progressive | CVPR | 2025 | [2411.06019](https://arxiv.org/abs/2411.06019) | Progressive | Importance-aware quantization with progressive decoding | — |
| CGVQ | Clustered codebook VQ | SIGGRAPH Poster | 2026 | [2607.05667](https://arxiv.org/abs/2607.05667) | 20% bpp reduction | Cluster-guided grouping before quantization | — |
| Sp2403GS | Codebook + pruning | CVPR | 2024 | [2312.09147](https://arxiv.org/abs/2312.09147) | Combined | Importance-based codebook selection | — |
| OT-UVGS | Optimal-transport UV mapping | Eurographics | 2026 | [2604.19127](https://arxiv.org/abs/2604.19127) | Improved PSNR/SSIM | OT-inspired separable mapping; fewer collisions, higher retention | — |

---

## 4. Streaming & LoD Methods

Progressive loading, Level-of-Detail, and bandwidth-adaptive delivery.

### 4.1 Static Scene Streaming

| Method | LoD Mechanism | Venue | Year | ArXiv | Key Feature |
|--------|--------------|-------|------|-------|-------------|
| StreamLoD-GS | View-dependent LoD levels | arXiv | 2026 | [2601.18475](https://arxiv.org/abs/2601.18475) | Progressive LoD delivery for bandwidth-adaptive free-viewpoint video |
| HGS | Hierarchical Gaussian structuring | CVPR | 2025 | [2411.12089](https://arxiv.org/abs/2411.12089) | Level-of-detail Gaussian hierarchy for progressive streaming |
| GS-Stream | Progressive chunk delivery | CVPR | 2025 | [2411.14974](https://arxiv.org/abs/2411.14974) | Bandwidth-adaptive 3DGS delivery pipeline |
| EvoGS | Evolution Tree (wavelet-inspired) | arXiv | 2026 | [2606.07179](https://arxiv.org/abs/2606.07179) | Continuous parent-child refinement; 2.4x payload reduction; 5.5x VRAM reduction |
| MGS | Stochastic budget (Matryoshka) | arXiv | 2026 | [2603.19234](https://arxiv.org/abs/2603.19234) | Any prefix of ordered Gaussian set produces coherent reconstruction |
| SCube | VoxSplats + hierarchical LOD | NeurIPS | 2024 | [2410.20030](https://arxiv.org/abs/2410.20030) | Voxelized splat for large-scale streaming reconstruction | [GitHub](https://github.com/nv-tlabs/SCube) |
| TideGS | Out-of-core SSD-CPU-GPU hierarchy | arXiv | 2026 | [2605.20150](https://arxiv.org/abs/2605.20150) | 1B+ Gaussians; block-virtualized geometry; trajectory-adaptive differential streaming on 24GB GPU |

### 4.2 Dynamic (4DGS) Streaming

| Method | Mechanism | Venue | Year | ArXiv | First-frame Latency | Key Feature |
|--------|-----------|-------|------|-------|---------------------|-------------|
| PD-4DGS | Hierarchical Deformation Decomposition | arXiv | 2026 | [2605.11427](https://arxiv.org/abs/2605.11427) | ~1.7s (from 73–930s) | 3 transmittable layers: static scaffold + global deformation + local refinement; DASH/HLS compatible |
| CAGS | VQ LoD + server-side reference | SIGGRAPH | 2026 | [2605.09279](https://arxiv.org/abs/2605.09279) | Adaptive | VQ quality LoDs + low-res reference image color correction; representation-agnostic |
| QUEEN | Quantized streaming encoding | NeurIPS | 2024 | [2412.04469](https://arxiv.org/abs/2412.04469) | Streaming | Quantized efficient encoding for streaming free-viewpoint video with dynamic Gaussians |
| BlitzGS | Distributed GPU sharding + parity | arXiv | 2026 | [2605.13794](https://arxiv.org/abs/2605.13794) | Parity-based | City-scale distributed rendering; importance scoring for sharding |

---

## 5. Web & Mobile Deployment

### 5.1 Web (WebGL / WebGPU) Platforms

| Platform | Renderer | Max Gaussians | Year | Key Feature |
|----------|----------|--------------|------|-------------|
| Spark 2.0 | WebGPU | 100M+ splats | 2026 | World Labs open-source; chunk streaming; multi-splat sorting; progressive LOD; mobile browser capable |
| Visionary | WebGPU + ONNX Runtime | Large | 2025 | [arXiv:2512.08478](https://arxiv.org/abs/2512.08478); Web-native world model carrier; supports 4DGS, neural avatars, generative post-processing |
| SuperSplat | WebGL | ~5M | 2024 | PlayCanvas; editable viewer with selection and annotation tools |
| PlayCanvas | WebGL 2.0 | ~2M | 2024 | Game engine integration for 3DGS assets |

### 5.2 Mobile Methods

| Method | Venue | Year | ArXiv | FPS (Mobile) | Key Feature |
|--------|-------|------|-------|-------------|-------------|
| Mobile-GS | ICLR | 2026 | [2603.11531](https://arxiv.org/abs/2603.11531) | 1000+ | Depth-aware order-independent rendering; distillation + quantization; contribution-based pruning; first real-time mobile 3DGS |
| Flux-GS | ECCV | 2026 | [2606.30017](https://arxiv.org/abs/2606.30017) | Real-time | Monte Carlo Specular Energy Aggregator; compact latent SH; Attribute-Conditioned SH Enhancement; Multi-view Alpha Densification/Pruning (UTS/Baidu) |
| PocketGS | arXiv | 2026 | [2601.17354](https://arxiv.org/abs/2601.17354) | On-device training | Geometry-faithful priors + anisotropic seeding + cached alpha compositing for stable mobile backprop |
| Mobile Avatar (Pruned Blendshapes) | CVPR | 2026 | [2605.01854](https://arxiv.org/abs/2605.01854) | Real-time | High-fidelity mobile avatars with pruned local blendshapes |

---

## 6. Hardware Acceleration

| Method | Hardware Target | Venue | Year | ArXiv | Speedup | Key Feature |
|--------|----------------|-------|------|-------|---------|-------------|
| GEMM-GS | Tensor Core (GEMM) | arXiv | 2026 | [2604.02120](https://arxiv.org/abs/2604.02120) | 1.42x | Reformulates alpha blending as GEMM operations for Tensor Core utilization |
| TensorGS | Tensor Core (FP16 matrix) | arXiv | 2026 | [2605.17855](https://arxiv.org/abs/2605.17855) | 1.65x end-to-end | Tensorizes rasterization into FP16 matrix ops with cross-tile grouping; negligible quality loss |
| Axis-Shared Rasterization Accelerator | Custom ASIC | ISCA | 2026 | — | On-chip real-time | First 3DGS hardware accelerator; axis-shared rasterization + order-independent transmittance (SJTU) |
| HiGS | GPU hierarchical tiles | arXiv (NVIDIA) | 2026 | [2606.00352](https://arxiv.org/abs/2606.00352) | 15.8x vs. original | Decouples coarse macro-tile partitioning from fine render-tile rasterization; exact front-to-back alpha compositing |
| LiteGS | GPU (Moore Threads MTT) | SIGGRAPH Asia | 2025 | — | Software-hardware co-opt | Won 3DGS Reconstruction Challenge silver; hardware-aware algorithm optimization |
| QuadBox | GPU (AABB optimization) | arXiv | 2026 | [2605.04844](https://arxiv.org/abs/2605.04844) | 1.85x | Geometry-aware AABB bounding boxes reduce tile-Gaussian pair checks |
| SpqGS | FPGA-friendly | CVPR | 2025 | [2411.16816](https://arxiv.org/abs/2411.16816) | Parallel bit alloc | Hardware-scalable quantization for FPGA/ASIC deployment |
| Proxy-GS | GPU (anchor-based methods) | CVPR | 2026 | [2509.24421](https://arxiv.org/abs/2509.24421) | 3x render speedup | Lightweight proxy mesh provides occlusion priors; full score oral |
| gsplat | GPU (CUDA) | Open-source | 2024 | — | 4x VRAM savings | UC Berkeley/NVIDIA; production-grade; part of nerfstudio; 10% training speedup |
| Faster-GS | GPU (benchmark) | CVPR | 2026 | — | Systematic | Separates engineering from algorithmic acceleration; standard benchmark |

---

## 7. Compression-Deployment Cross-Reference

Target-specific method combinations:

| Target | Recommended Pipeline | Expected Result |
|--------|---------------------|-----------------|
| **Web** (WebGPU, 1080p@30fps) | NanoGS merge → MesonGS++ mixed-precision → CAGS LoD streaming | 50–100x storage, progressive load <2s |
| **Web** (WebGL fallback) | LightGaussian prune → 8-bit quant → HGS progressive chunks | 15–20x storage, 1080p@15-30fps |
| **iOS** (Metal, A15+) | Mobile-GS distillation → VEDAL prune → Flux-GS SH compaction | Real-time, <500MB memory |
| **Android** (Vulkan, Adreno 740+) | Prune Wisely → 6-bit quant → Mobile-GS OIT | Real-time, <300MB memory |
| **Desktop** (RTX 3060+) | LightGaussian → ContextGS entropy → HiGS rendering | Minimal quality loss, 60+fps |
| **Desktop large scene** | TideGS out-of-core → EvoGS Evol Tree → StreamLoD-GS | 1B+ Gaussians, 24GB GPU |
| **Edge FPGA** | VEDAL prune → SpqGS parallel quant → custom rasterizer | <100K Gaussians, on-chip |
| **Edge ASIC** | SpqGS → Axis-Shared Accelerator | Real-time on-chip rendering |
| **4DGS streaming** | PD-4DGS 3-layer → CAGS color correction → DASH/HLS | First-frame <2s, bandwidth-adaptive |

---

## 8. Attribute Sensitivity Reference

Empirical guidance on which attributes are most sensitive to compression (higher = more sensitive):

| Attribute | FP32 Bytes | Sensitivity | Recommended Min Bit-width | Notes |
|-----------|-----------|------------|--------------------------|-------|
| Position (μ) | 12 | ★★★★★ | 8 | Direct geometry impact; edges visible at ≤6 bit |
| SH DC (color) | 3 | ★★★★☆ | 6 | Primary color driver; 4-bit causes banding |
| SH Degree 1 | 9 | ★★★☆☆ | 4 | View-dependent effects tolerate more compression |
| SH Degree 2+ | 36 | ★★☆☆☆ | 2–4 | Can aggressively compress or even remove for mobile |
| Opacity (α) | 4 | ★★★☆☆ | 4 | Post-sigmoid mapping helps; critical for pruning signal |
| Scale (s) | 12 | ★★★☆☆ | 6 (log-space) | Log-transform essential before quantization |
| Rotation (q) | 16 | ★★☆☆☆ | 8 | Quaternion normalization helps; 4-bit often sufficient for mobile |

---

## 9. Chronological Evolution

Key milestones in 3DGS compression and deployment:

| Year | Quarter | Milestone | Significance |
|------|---------|-----------|-------------|
| 2023 | Q3 | 3DGS (Kerbl et al.) | Foundation; explicit Gaussian representation |
| 2024 | Q1 | Compact-3DGS | First VQ-based 3DGS compression |
| 2024 | Q2 | LightGaussian (NeurIPS) | 15x via pruning + SVD distillation; 200+ FPS |
| 2024 | Q2 | HAC (ECCV) | ~100x compression via hash-grid context modeling |
| 2024 | Q4 | ContextGS (NeurIPS) | Anchor-level context for entropy coding |
| 2024 | Q4 | EAGLES (ECCV) | Quantized embeddings + coarse-to-fine |
| 2025 | Q1 | RDO-Gaussian (ECCV) | 40x+ with end-to-end rate-distortion optimization |
| 2025 | Q1 | GS-Stream, HGS (CVPR) | First systematic streaming/LoD methods |
| 2025 | Q2 | SpqGS, SOG-GS, VQGS, GSQ, ZipGS (CVPR) | CVPR 2025 compression wave |
| 2025 | Q3 | MobileGS first mobile 3DGS | Extreme 50–100x compression with distillation |
| 2026 | Q1 | Prune Wisely (CVPR) | 90% Gaussian reduction with DoG criterion |
| 2026 | Q2 | MesonGS++ | Mixed-precision ILP; 34x compression |
| 2026 | Q2 | CAGS (SIGGRAPH) | VQ LoD streaming with server-side color correction |
| 2026 | Q2 | HiGS (NVIDIA) | 15.8x hierarchical tile speedup |
| 2026 | Q2 | GETA-3DGS | First automatic joint structured pruning + quantization |
| 2026 | Q2 | VEDAL (arXiv 2026（venue 待核实）) | Variational pruning with theoretical grounding |
| 2026 | Q2 | Flux-GS (ECCV) | Monte Carlo mobile rendering (UTS/Baidu) |
| 2026 | Q3 | Mobile-GS (ICLR) | 1000+ FPS mobile; depth-aware OIT |
| 2026 | Q3 | Provable Coresets | First theoretical pruning guarantee for 3DGS |
| 2026 | — | Axis-Shared Accelerator (ISCA) | First 3DGS ASIC hardware accelerator |