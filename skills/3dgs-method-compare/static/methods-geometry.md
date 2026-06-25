### Geometry / Surface Methods

| Method | Venue | Surface Quality | Key Feature |
|--------|-------|----------------|-------------|
| 2DGS | SIGGRAPH'24 | High | Oriented 2D disks for geometry |
| SuGaR | CVPR'24 | High | Surface-aligned regularization |
| PGSR | TVCG'24 | Highest (SOTA) | Planar regularizer + unbiased depth rendering |
| PAGaS | arXiv'26 | High (depth) | 1DoF Gaussians for depth refinement |
| Vol3DGS | CVPR'25 | High | Volume-consistent rendering |
| 2D-SuGaR | arXiv'26 | Highest (DTU SOTA) | 2DGS + monocular depth/normal priors; depth-guided init; clustering-based pruning |
| IRIS | arXiv'26 (2603.15368) | Hybrid | GS-proxy neural field with analytical ray intersection; hybrid rendering |
| DiffSoup | arXiv'26 (2603.27151) | Extreme simplification | Triangle soup as alternative primitive to Gaussians |
| 3DSS | arXiv'26 (2605.05876) | High (inverse rendering) | First differentiable surface splatting; coverage-based compositing from EWA; joint shape+SVBRDF+lighting |
| SVGS | arXiv'24 (2411.18966) | High (Blender SOTA) | Spatially varying color+opacity within each Gaussian; movable kernels (1.4x params); >30 FPS |
| AmbiSuR | ICML'26 | High (photometric) | Photometric ambiguity disambiguation for accurate GS surface reconstruction |
| DySurface | arXiv'26 | High (4D surface) | Bridges explicit Gaussians and implicit SDF for consistent 4D surface reconstruction |
| Sparse2DGS | TVCG'26 (2505.19854) | High (sparse-view) | Dense point cloud + 2DGS for sparse-view surface reconstruction |
| DeSplat | CVPR'26 | High (distractor-free) | Decomposed compositing separating transient objects from static background |
| TriSplat | arXiv'26 (2605.26115) | High (triangle) | Triangle primitives replacing Gaussians; deterministic visibility, mesh-compatible output |

### Generation / Text-to-3D

| Method | Venue | Input | Output | Key Feature |
|--------|-------|-------|--------|-------------|
| DreamGaussian | ICLR'24 (Oral) | Text prompt | 3D mesh + 3DGS | SDS + 3DGS prior, seconds |
| GaussianEditor | Preprint | Text/geometry mask | Edited 3DGS | CLIP-guided selection + editing |
| ArtifactWorld | arXiv'26 (2604.12251) | Artifact images | Restored video | Video generation for artifact restoration |
| SceneGen-LLMRL | arXiv'26 (2605.05711) | Language | Interactive 3D scene | LLM-RL coupling for unified 3D scene generation + immersive interaction |
| ROAR-3D | arXiv'26 (2605.21121) | Text/image | Multi-view 3D | Token-wise view routing for multi-view 3D generation |
| TRELLIS.2 | CVPR'26 (Best Student Paper) | Text/image | 4B native 3D model | 17s PBR generation; 4B parameter native 3D generation model |
