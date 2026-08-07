
# CAD & Mesh × 3DGS Methods Database

### Mesh-Gaussian Hybrid Methods

| Method | Venue | Key Idea | Mesh Quality | Rendering Speed | Code |
|--------|-------|----------|-------------|----------------|------|
| 3DGS | SIGGRAPH'23 | Pure Gaussian | N/A | Real-time | Open |
| 2DGS | SIGGRAPH'24 | 2D disks for surface | Very High | Real-time | Open |
| 2D-SuGaR | arXiv'26 | Surface-aware 2DGS with depth/normal priors | Very High | Real-time | — |
| SuGaR | CVPR'24 | Regularized GS → TSDF → MC | High | Real-time | Open |
| MaGS | ICCV'25 | Mesh-adsorbed Gaussians | High | Real-time | Open |
| UniMGS | AAAI'26 | Unified mesh+GS rasterization | High | Real-time | Open |
| Vol3DGS | CVPR'25 | Volume-consistent rasterization | High | Real-time | Open |
| MeshGS | Various | Mesh-guided Gaussian placement | Medium-High | Real-time | Open |
| Fake3DGS | arXiv'26 | 3D manipulation detection in GS scenes | — | — | — |

### Generation Methods

| Method | Venue | Input | Output | Key Feature |
|--------|-------|-------|--------|-------------|
| SEIG | arXiv'26 (2606.02580) | Single image | Executable Blender Python program | Staged decomposition (geometry→materials→composition→lighting); inherently editable and simulation-ready (Guangzhao He et al.) |
| 3DCodeBench | arXiv'26 (2606.01057) | VLM agents | Procedural 3D generation | Systematic benchmark; 12 VLMs evaluated; API mismatches cause most failures; disconnected floating geometry in successful renders (Yipeng Gao et al.) |
| UniCAD | arXiv'26 (2606.05058) | Multi-view images / sketches / point clouds | Parametric CAD | Multi-modal multi-task CAD benchmark + universal model; parametric CAD reconstruction from multi-view images, sketches, and point clouds |
| MeshFlow | CVPR'26 Highlight (2606.04621) | Latent code | Triangle mesh | MeshVAE + Flow-based Diffusion Transformer; autoregressive mesh generation with flow-based prior |
| MeshWeaver | CVPR'26 (2606.04688) | Latent code | Triangle mesh | Autoregressive next-vertex mesh generation; sequential attention for vertex-by-vertex triangle mesh synthesis |
| SymTRELLIS | arXiv'26 (2606.04108) | Single image / text | 3D mesh | Symmetry-aware 3D generation; exploits symmetry priors in 3D structure for improved mesh quality |
| HSP | arXiv'26 (2606.04891) | Images / point clouds | Hybrid mesh + neural field | Hybrid Structured Primitives; combines structured geometric primitives with neural fields for 3D reconstruction |
| TRELLIS.2 | CVPR'26 Best Student Paper | Single image / text | PBR 3D asset (mesh+GS) | 4B-parameter native 3D generation model; 17s PBR asset generation; handles open surfaces, nested geometry, transparent materials; Microsoft+Tsinghua |

**SEIG** — VLM generates executable Blender Python programs via staged decomposition (geometry→materials→composition→lighting). Output is inherently editable and simulation-ready, bridging the gap between neural rendering and CAD/manufacturing pipelines.

**3DCodeBench** — Systematic benchmark for evaluating VLM agents on procedural 3D generation. Key findings: API mismatches are the primary failure mode; even successful renders exhibit disconnected floating geometry, indicating that current VLMs lack robust spatial reasoning for CAD-quality output.

**UniCAD** — Multi-modal multi-task CAD benchmark and universal model covering parametric CAD reconstruction from multi-view images, sketches, and point clouds. Provides a unified framework for evaluating and training CAD reconstruction methods across diverse input modalities.

**MeshFlow** — MeshVAE encodes meshes into a structured latent space; a Flow-based Diffusion Transformer generates meshes autoregressively with a flow-based prior. CVPR 2026 Highlight — achieves state-of-the-art mesh generation quality by combining the expressiveness of normalizing flows with the scalability of diffusion transformers.

**MeshWeaver** — Autoregressive next-vertex mesh generation that produces triangle meshes vertex-by-vertex using sequential attention. Eliminates the need for intermediate representations (voxels, SDFs, or point clouds) by directly generating mesh topology and geometry in a single autoregressive pass.

**SymTRELLIS** — Symmetry-aware 3D generation that exploits inherent symmetry priors in 3D structures to improve mesh quality. By constraining generation to respect symmetry, reduces artifacts and improves geometric fidelity, particularly for man-made objects with dominant symmetry axes.

**HSP** — Hybrid Structured Primitives combine explicit structured geometric primitives (planes, cylinders, etc.) with neural fields for 3D reconstruction. The structured primitives provide CAD-like geometric parsimony while neural fields capture fine details, bridging the gap between parametric and implicit representations.

**TRELLIS.2** — 4B-parameter native 3D generation model (CVPR 2026 Best Student Paper, Microsoft+Tsinghua). Generates PBR-equipped 3D assets in 17 seconds from a single image or text prompt. Key advance: handles open surfaces, nested geometry, and transparent materials — structural categories that previously required manual CAD intervention. Output includes mesh and Gaussian representations, making it directly compatible with CAD↔3DGS hybrid pipelines.

### Articulated Object & Interaction Methods

| Method | Venue | Input | Output | Key Feature |
|--------|-------|-------|--------|-------------|
| FreeArtGS | arXiv'26 (2603.22102) | Multi-view video | Articulated 3DGS | Articulated GS under free-moving scenario; scalable for AR/robotics |
| ArtGS | IEEE'26 | Multi-view images | Interactive 3DGS | Interactive visual-physical modeling with 3DGS for articulated objects |
| PARTICULATE | CVPR'26 | Static mesh | Articulated structure | Feed-forward 3D object articulation from static mesh; auto-infer movable structure |

**FreeArtGS** — Articulated Gaussian Splatting under free-moving scenarios (arXiv:2603.22102). Extends articulated object reconstruction beyond controlled environments to free-moving, in-the-wild captures. Scalable representation suitable for AR and robotics applications where objects undergo unconstrained articulation during capture.

**ArtGS** — Interactive visual-physical modeling with 3DGS for articulated objects (IEEE 2026). Combines visual appearance (via 3DGS) with physical interaction constraints, enabling users to interactively manipulate reconstructed articulated objects while maintaining physical plausibility.

**PARTICULATE** — Feed-forward 3D object articulation from static mesh (CVPR 2026). Given a single static mesh, automatically infers the movable structure (joints, hinges, sliders) and generates an articulated model. Eliminates the need for multi-state observation or manual articulation specification, directly producing CAD-compatible articulated output from static geometry.

### CAD Reconstruction Methods

| Method | Venue | Input | Output | Automation |
|--------|-------|-------|--------|------------|
| BrepGaussian | CVPR'26 | Images | B-rep (STEP) | Semi-auto |
| CSGNet | CVPR'18 | Voxel grid | CSG tree | Auto |
| BrepNet | CVPR'22 | Point cloud | B-rep edges | Auto |
| Primitive fitting (RANSAC) | Classic | Point cloud | Primitives | Semi-auto |
| DeepCAD | ICCV'21 | Point cloud | Sketch-extrusion | Auto |
| KDH-CAD | arXiv'26 (2606.01702) | Small labeled data + domain knowledge | CAD classification/reconstruction | Auto |

**KDH-CAD** — Knowledge-data hybrid framework combining pretrained foundation models with structured domain knowledge from CAD textbooks and small labeled data. Achieves 92.6% accuracy with only 250 training samples (Ziqin Gao et al.). Key insight: when CAD training data is scarce, domain knowledge (geometric constraints, design rules) supplements data-driven approaches. Pipeline: Foundation model features → Domain knowledge completion → Labeled data calibration → CAD classification/reconstruction.

### Surface Extraction Methods

| Method | Approach | Input | Output | Speed |
|--------|----------|-------|--------|-------|
| Marching Cubes | Isosurface extraction | TSDF / SDF | Triangle mesh | Fast |
| Poisson Reconstruction | Implicit surface fitting | Oriented points | Triangle mesh | Medium |
| Ball-Pivoting | Growing algorithm | Oriented points | Triangle mesh | Medium |
| Delaunay-based | Tetrahedralization | Points | Triangle mesh | Slow |
| Neural Mesh (DMTet) | Differentiable | Features | Triangle mesh | Slow |

### Mesh Processing Methods

| Method | Venue | Key Idea | Key Metric | Code |
|--------|-------|----------|------------|------|
| MidSurfNet | arXiv'26 (2606.01891) | Learning-augmented mid-surface abstraction for thin-walled CAD | 87.32% face pairing accuracy | — |

**MidSurfNet** — Learning-augmented mid-surface abstraction for thin-walled CAD models (Li Ye et al.). Neural face pairing module + interference implicit field (SDF intersection) for arbitrary offset control. 1,500+ annotated CAD model dataset. Critical for CAE: thin-walled structural FEA requires mid-surface abstraction before mesh generation.

### Semantic Scene Decomposition (Alternative to Gaussian-Based)

| Method | Venue | Representation | Key Feature |
|--------|-------|---------------|-------------|
| Semantic Foam | CVPR'26 (Highlight) | Volumetric Voronoi mesh | Per-cell semantic feature field; outperforms Gaussian Grouping, SAGA; avoids point-based occlusion/inconsistent-supervision artifacts |

**Note**: Semantic Foam uses volumetric Voronoi mesh instead of point-based Gaussians for semantic decomposition. When CAD/mesh reconstruction needs semantic labels, consider Semantic Foam as an alternative to Gaussian-based semantic methods (LangSplat, Feature 3DGS, NRGS). The mesh-based representation integrates more naturally with B-rep/mesh pipelines.

### Cross-Domain 3DGS Applications

| Method | Venue | Domain | Representation | Key Feature |
|--------|-------|--------|---------------|-------------|
| GS-DOT | arXiv'26 | Medical (DOT) | Anisotropic Gaussians | Photon diffusion transport |
| BiSplat-WRF | IEEE ICC'26 Workshop | Wireless (WRF) | Planar 2D Gaussians | Bilinear spatial transformer for EM coupling; adapts GS rendering to angular domain |
| RESPIRE | arXiv'26 (2604.28179) | Medical (bronchoscopy) | Mesh-anchored Gaussians | CT-informed mesh-anchored GS; dynamic bronchoscopy with geometric prior |
| RGS | arXiv'26 (2604.27552) | Medical (CBCT) | Residual wavelet-GS | Spectral decomposition into geometric base + residual detail Gaussians for sparse-view CBCT |
| DiffSoup | arXiv'26 (2603.27151) | Neural Rendering | Triangle soup primitives | Triangle soup as alternative to Gaussians; standard depth testing enables seamless integration with traditional mesh/graphics pipelines |
| FTSplat | arXiv'26 (2603.05932) | Robotics / Simulation | Predicted triangle surfaces | Feed-forward triangle prediction producing simulation-ready mesh; compatible with robotic simulators (Isaac Sim, MuJoCo) |
| IRIS | arXiv'26 (2603.15368) | Neural Fields / Editing | Gaussians-as-proxies for INR | Hybrid Gaussians-as-proxies for implicit neural fields; enables shape editing workflows bridging mesh↔GS conversion |
| D-Rex | SIGGRAPH'26 (2604.27871) | Avatar / Relighting | Decoupled diffusion post-process | Decouples relighting from avatar modeling via LoRA fine-tuned video diffusion; applicable to any white-light avatar system; enables mesh/avatar geometry preservation under novel illumination |

**Note on medical mesh-GS methods**: RESPIRE and RGS both use hybrid mesh-Gaussian representations for medical imaging. RESPIRE anchors Gaussians to a CT-derived mesh for bronchoscopy (topology from prior), while RGS uses spectral decomposition to separate geometric base (mesh-like) from residual detail (Gaussian-like) for CBCT reconstruction.

**Note on triangle/mesh primitive alternatives**: DiffSoup and FTSplat represent a growing trend of returning to mesh/triangle primitives within neural rendering frameworks. DiffSoup replaces Gaussians with triangle soup while retaining differentiability, enabling direct use of standard depth testing and z-buffer pipelines. FTSplat produces explicit triangle meshes via feed-forward prediction, bypassing the need for post-hoc mesh extraction. Both methods eliminate the mesh↔GS conversion bottleneck for downstream applications requiring mesh geometry.

**Note on hybrid proxy representations**: IRIS demonstrates that Gaussians can serve as learnable proxies for implicit neural fields, enabling shape editing that propagates through the proxy to the underlying INR. This is relevant for mesh↔GS conversion workflows where editing operations need to transfer across representation boundaries.