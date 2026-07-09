
### Cross-Domain Applications

| Method | Venue | Domain | Key Feature |
|--------|-------|--------|-------------|
| GS-DOT | arXiv'26 | Medical (DOT) | Diffusion transport for photon imaging |
| BiSplat-WRF | IEEE ICC'26 Workshop | Wireless (WRF) | Planar GS + bilinear spatial transformer for EM coupling |
| FieryGS | ICLR'26 | Physics simulation | Physics-integrated fire synthesis |
| SplAttN | ICML'26 (Spotlight) | Point cloud completion | Gaussian soft splatting for point cloud completion |
| Fake3DGS | ICPR'26 | Forensics | First benchmark for 3D manipulation detection in neural rendering |
| SandSim | arXiv'26 | Digital art | Curve-guided Gaussian for sand painting reconstruction |
| RGS | arXiv'26 | Medical (CBCT) | Residual wavelet-GS for sparse-view CBCT |
| RESPIRE | arXiv'26 | Medical (bronchoscopy) | CT-informed mesh-anchored GS for dynamic bronchoscopy |
| Color-Encoded Illumination | CVPR'26 (Highlight) | High-speed imaging | Color-coded temporal info for volumetric reconstruction |
| HDR-NSFF | ICLR'26 (2603.08313) | Dynamic HDR scenes | HDR dynamic scene neural scene flow fields |
| 3DGS AD Safety Eval | SafeComp'26 | Autonomous driving | Industrial fidelity evaluation for AD perception |
| HeroGS | CVPR'26 | Sparse-view NVS | Hierarchical guidance for sparse-view robust 3DGS |
| Sparse-View 3DGS Wild | arXiv'26 | Sparse-view NVS | Diffusion-guided sparse-view enhancement |
| Pi-GS | arXiv'26 (2602.03327) | Sparse-view NVS | Sparse-view with π³ reference-free initialization |
| GS-Surrogate | arXiv'26 (2604.06358) | Physics simulation | Deformable GS for simulation visualization |
| 3DGEER | ICLR'26 | Rendering (exact) | Exact ray-Gaussian rendering replacing splatting; fisheye/generic camera support; top 1% |
| Forecast-GS | arXiv'26 | Robotics | Predictive GS for forecasting task-completed states in robotic manipulation |
| GaussianGrasper | T-RO'24 | Robotics / Grasping | Open-vocabulary grasping via SAM+CLIP feature distillation into 3DGS |
| GraspSplats | CoRL'24 | Robotics / Grasping | Zero-shot manipulation with 3D feature splatting; scene editing support |
| ManiGaussian | ECCV'24 | Robotics / Manipulation | Dynamic GS world model for multi-task manipulation via future scene prediction |
| GSMem | arXiv'26 | Embodied Reasoning | 3DGS as persistent spatial memory for zero-shot embodied exploration & QA |
| RoboSplat | RSS'25 | Robotics / Data Gen | Diverse data generation via Gaussian primitive manipulation; 87.8% success |
| VR-Robo | RAL'25 | Robotics / Navigation | Real-to-Sim-to-Real for visual robot navigation without depth sensors |
| GSDrive | arXiv'26 | Driving RL | 3DGS environment for reinforcing driving policies |
| GeoQuery | SIGGRAPH'26 | Sparse-view NVS | Geometry-guided cross-view attention with geometry-aligned proxy queries from predicted depth |
| PairDropGS | arXiv'26 | Sparse-view NVS | Paired dropout-induced consistency regularization with progressive scheduling |
| DropAnSH-GS | CVPR'26 | Sparse-view NVS | Anchor dropout + SH regularization for robust sparse-view reconstruction |
| VidSplat | SIGGRAPH'26 | Sparse-view NVS | Training-free generative framework leveraging video diffusion priors with iterative confidence refinement |
| OCH3R | arXiv'26 (2605.13018) | Single RGB | Object-Centric Holistic 3D from single RGB; per-pixel CLIP + 6D pose + per-object Gaussians |
| SAM 3D | CVPR'26 (Honorable Mention) | Single image | Single-image 3D foundation model by Meta; general-purpose 3D reconstruction |

### Dynamic / 4DGS Methods

_Multi-solver comparison sub-dimension for dynamic methods:_
- **Unified Query Mechanism** (D4RT): Single unified query architecture for 4D reconstruction, eliminating separate static/dynamic pipelines; 200+ FPS inference
- **Separate Deformation Fields**: Traditional approach with independent static + deformation modules
- **Physics-Based**: MPM/SPH solvers grounding dynamics in physical simulation (RAF, ParticleGS)

| Method | Venue | Primitive | Rendering | Key Feature |
|--------|-------|-----------|-----------|-------------|
| FreeTimeGS++ | arXiv'26 (2605.03337) | 4D Gaussians + durations | Gated marginalization | Neural velocity fields + emergent temporal partitioning; comprehensive 4DGS analysis |
| ParticleGS | arXiv'26 | 3D anisotropic + physics | Standard α-compositing | Physics-based motion extrapolation for fluid/dynamic scenes; Lagrangian particle dynamics |
| TransmissiveGS | arXiv'26 | Dual-GS (surface + reflection) | Deferred shading | Transmissive + reflective dual decomposition; separate G-buffer compositing for glass/refractive objects |
| PD-4DGS | arXiv'26 | 3-layer progressive (static + global deform + local refine) | Progressive streaming | DASH/HLS-compatible 4DGS streaming; ~1.7s first-frame latency vs 73-930s monolithic |
| 3DGS³ | arXiv'26 | 3D anisotropic (super-sampled) | Standard + temporal interpolation | Gradient-Aware Super Sampling + Lightweight Temporal Frame Interpolation for large-scale 3DGS |
| BlitzGS | arXiv'26 | 3D anisotropic (distributed) | Parity-based multi-GPU | Distributed city-scale GS training; parity-based sharding across multi-GPU; eliminates single-GPU memory bottleneck |
| Z-Order GS | CVPR'26 (Oral) | 3D anisotropic (Z-ordered) | Z-order curve indexing | Z-order (Morton) curve spatial indexing for cache-coherent Gaussian traversal; sparse attention (grouped+top-k) reduces O(N²)→O(N log N); 1000× faster than per-scene optimization; 2-3× fewer Gaussians vs DepthSplat/AnySplat; handles 2-12 variable input views; cross-dataset generalization (RE10K→ACID, DL3DV→ACID) |
| PanoPlane | arXiv'26 | Planar (panoramic) | Plane-based compositing | Panoramic plane-based GS for omnidirectional NVS; efficient panoramic scene representation |
| SparseOIT | arXiv'26 | 3D anisotropic | Order-independent transparency | Sparse order-independent transparency for correct See-through rendering of overlapping semi-transparent Gaussians |
| SCOUP | arXiv'26 | Sparse code primitives | Language-conditioned | Sparse code language GS; language-conditioned sparse coding for controllable 3DGS generation |
| AV1-3DGS | arXiv'26 | 3D anisotropic | AV1 motion-vector SfM | AV1 codec motion vectors for dense SfM; 63% training time reduction; leverages video compression priors |
| RoSplat | arXiv'26 | 3D anisotropic (feed-forward) | Pixel-wise GS | Feed-forward pixel-wise GS for sparse-view NVS; requires alpha normalization for varying view counts |
| HarmoGS | arXiv'26 | 3D anisotropic | Harmonized optimization | Gradient harmonization for in-the-wild 3DGS; resolves cross-view gradient conflicts from transient distractors and illumination inconsistencies |
| GuardMarkGS | arXiv'26 | 3D anisotropic | Watermark + deterrence | First unified watermarking + edit deterrence framework for 3DGS assets; security for 3D content |
| FaceParts | arXiv'26 | 3D anisotropic (part-based) | Part-compositional | Part-based decomposable Gaussian avatar; modular facial region modeling for expressive avatars |
| RetroNVS | arXiv'26 | 3D anisotropic | Retro-reflection modeling | Retro-reflection modeling in 3DGS for accurate rendering of retro-reflective surfaces (signs, safety gear) |
| Velox | arXiv'26 | 3D anisotropic | Velocity-aware 4D | Velocity-aware 4DGS for fast dynamic scene reconstruction with motion-adaptive temporal modeling |
| 3DGS² | arXiv'26 | 3D anisotropic (super-sampled) | Super-sampling + temporal | Second-generation 3DGS with super-sampling and temporal interpolation for large-scale scenes |
| DP-GES | arXiv'26 (2605.25345) | Surfel | Depth Peeling (sort-free) | Sort-free surfel rendering via depth peeling; eliminates sorting bottleneck for semi-transparent surfaces |
| 4D-GSW | arXiv'26 (2605.22342) | 4D anisotropic | Kinematic-aware watermarking | Kinematic-aware 4DGS watermarking; embeds identity into dynamic Gaussian trajectories |
| RoVES | arXiv'26 (2605.25373) | 3D anisotropic (physics-aware) | Physics-conditioned editing | Physics-aware driving scene editing; enforces physical constraints during scene manipulation |
| D4RT | CVPR'26 (Best Paper, 2512.08924) | 4D anisotropic (unified query) | Unified query 4D reconstruction | Unified query mechanism for 4D reconstruction; 200+ FPS; CVPR 2026 Best Paper |
| FreeForm | CVPR'26 (2605.29318) | 3D anisotropic + eigenmodes | Physics/elastic deformation | Particle-skinned eigenmodes for 3DGS elastic deformation; physics-driven articulation |

### Dynamic / 4DGS New Additions (June 28, 2026)

| Method | Venue | Key Innovation |
|--------|-------|---------------|
| Beyond Static Gaussians | JCVIS'25 (2606.00452) | Systematic comparison of structure-guided vs Gaussian-centric dynamic paradigms; reveals quality/compactness vs speed tradeoff |
| Liquid Neural Fields | arXiv'26 (2606.07670) | CfC (closed-form continuous-time) units replacing MLP deformation fields; explicit continuous-time modeling; high-frequency motion gains |
| Retrospective Dynamic NVS | CVPR'26 WS (2605.12437) | Synchronized multi-view efficient dynamic NVS without temporal coupling; Blender dynamic MV benchmark |

### Dynamic / 4DGS New Additions (July 9, 2026)

| Method | Venue | Key Innovation |
|--------|-------|---------------|
| World from Motion | arXiv'26 | Generative dynamic 4DGS from monocular video; generative prior fills unobserved regions; motion-conditioned 4D Gaussian generation |
| MVFusion-GS | arXiv'26 | Multi-view fusion for dynamic 3DGS; cross-view temporal consistency via fusion attention; extends feed-forward to dynamic scenes |
| DeGenseGS | arXiv'26 | Dense-to-sparse dynamic 3DGS; progressive densification pruning for temporal coherence; reduces 4DGS memory by 40%+ |
### Streaming / Scalable Methods

| Method | Venue | Primitive | Rendering | Key Feature |
|--------|-------|-----------|-----------|-------------|
| EvoGS | arXiv'26 (2606.07179) | Continuous-layered (Evolution Tree) | Wavelet-inspired refinement | First continuous-layering 3DGS; parent-child refinement corrects ancestral errors; redundancy 65%→<25%; 2.4x transmission reduction; 5.5x VRAM reduction |

### Pose Optimization Methods

| Method | Venue | Input | Key Feature |
|--------|-------|-------|-------------|
| Energy-GS | CVPR'26 Oral | RGB only (pose-free) | RGB-only joint camera pose + 3DGS optimization; no depth/geometry priors; energy-based pose correction; resolves NeRF-vs-3DGS optimization asymmetry |