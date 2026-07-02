

| Method | Venue | Feature Source | 3D Storage | Key Feature |
|--------|-------|---------------|------------|-------------|
| LangSplat | CVPR'24 | CLIP (2D distillation) | Per-Gaussian CLIP features | Open-vocabulary 3D queries |
| Feature 3DGS | CVPR'24 | DINO/SAM (2D distillation) | Per-Gaussian feature vectors | Downstream task features |
| NRGS | arXiv'26 | Neural network | Learned regularization | Robust semantic 3DGS |
| Semantic Foam | CVPR'26 (Highlight) | Volumetric Voronoi mesh | Per-cell semantic feature field | Semantic decomposition; outperforms Gaussian Grouping, SAGA |
| GLMap | CVPR'26 | Multi-scale semantics | Per-Gaussian language features | Gaussian-Language Map; zero-shot navigation |
| NG-GS | arXiv'26 (2604.14706) | NeRF-guided | Per-Gaussian segmentation | NeRF-guided GS segmentation |
| PointGS | CVPR'26 | SAM masks (contrastive distillation) | Per-Gaussian semantic features | 3DGS as unified intermediate for unsupervised 3D point cloud segmentation; SAM→3D contrastive learning |
| ReLaGS | CVPR'26 (2603.17605) | Language model | Per-Gaussian language features | Open-vocabulary 3D reasoning without per-scene training; language-guided GS |

### Feed-Forward Methods

| Method | Venue | #Gaussians | Inference | Key Feature |
|--------|-------|------------|-----------|-------------|
| GlobalSplat | Preprint'26 | ~16K | <78ms | Global scene tokens, 4MB footprint |
| MVSplat | ECCV'24 | Variable | Single-pass | Cost-volume-based prediction |
| GS-LRM | ECCV'24 | Variable | Single-pass | 1B transformer, zero-shot generalization |
| DepthSplat | CVPR'25 | Variable | Single-pass | Stereo-guided depth regularization |
| InstantSplat | arXiv'24 | Variable | ~40s total | Pose-free sparse-view |
| AnySplat | SIGGRAPH'25 | Variable | Single-pass | In-the-wild unconstrained views |
| SparseSplat | CVPR'26 | 22% of SOTA | Single-pass | Pixel-unaligned, entropy-based probabilistic sampling, 3D-Local Attribute Predictor |
| OT-UVGS | EG'26 | UV tensor | Same as UVGS | OT-based UV mapping, O(N log N) |
| Free Geometry | arXiv'26 | Adaptive | Single-pass + LoRA | Self-evolving feed-forward, +3.73% camera accuracy |
| FTSplat | arXiv'26 (2603.05932) | Variable | Single-pass | Feed-forward triangle splatting |
| ZPressor | NeurIPS'25 (2505.23734) | Compressed latent tokens | Single-pass, 100+ views | Bottleneck-aware compression for scalable multi-view feed-forward 3DGS |
| PM-Loss | 3DV'26 (2506.05327) | Variable | Training loss only | Pointmap-supervised depth regularization; smoother boundaries with no inference overhead |
| VolSplat | arXiv'25 (2509.19297) | Voxel-aligned | Single-pass | Shared voxel-space Gaussian prediction for multi-view consistency |
| SplatWeaver | arXiv'26 (2605.07287) | Variable | Single-pass | Cardinality Gaussian Expert Routing (Null/1/2/3 experts per pixel) + DWT frequency prior; 30% Gaussian budget with +1.02 dB PSNR over AnySplat |
| ArtSplat | arXiv'26 (2605.24304) | Per-part Gaussians | Single-pass | First feed-forward articulated 3DGS; predicts per-part Gaussians + joint parameters from monocular video; enables zero-shot articulated reconstruction |
| SR3R | CVPR'26 | Variable | Single-pass | Super-resolution + feed-forward GS; joint SR and 3DGS reconstruction |
| StreamLoD-GS | arXiv'26 (2601.18475) | LoD-structured | Streaming | Level-of-Detail structured 3DGS for streaming free-viewpoint video |
| NoPo4D | arXiv'26 (2605.22190) | 4D Gaussians | Single-pass | Pose-free feed-forward 4DGS; eliminates camera pose dependency for dynamic scene reconstruction |
| BEA-GS | CVPR'26 (Highlight, 2605.09662) | Object Gaussians | Single-pass | Object extraction from complex 3DGS scenes; CVPR 2026 Highlight |
| TokenGS | arXiv'26 (2604.15239) | Learnable tokens | Single-pass | Learnable Gaussian tokens replacing fixed MLP decoding; resolution-adaptive primitive allocation |
| CodecSplat | arXiv'26 (2605.25563) | Latent-coded Gaussians | Single-pass | Ultra-compact latent coding; 20-108 KiB/scene feed-forward 3DGS |
| ZipSplat | arXiv'26 (2606.05102) | Token-clustered (~62K) | 0.8s (24 views) | Token-based ff-3DGS via k-means clustering; decouples Gaussian count from pixel grid; ~6× fewer Gaussians +2.1 dB PSNR; DA3-Giant backbone; pose-free; single-directional Chamfer + coupling init + progressive view training |
| Z-Order GS | CVPR'26 Oral (2605.13465) | Z-ordered (~1/3 of DepthSplat) | 1000× faster than opt | Z-order (Morton) curve spatial indexing; sparse grouped+top-k attention O(N²)→O(N log N); 2-3× fewer Gaussians; cross-dataset generalization (RE10K/DL3DV→ACID) |
| F-RNG | arXiv'26 (2605.25975) | 3D anisotropic | Single-pass | Feed-forward relightable 3DGS; ~25x faster than optimization-based relighting |
| VoxelGS | arXiv'26 (2605.26616) | Voxel-anchored Gaussians | Hybrid | Scaffold-anchored Gaussians + voxel SDF for geometry-aware reconstruction |
| COSY | arXiv'26 (2605.24114) | Compositional Gaussians | Optimized | Compositional head editing via part-based Gaussian decomposition |
| R5DGS | arXiv'26 (2605.25909) | 4D Gaussians (semantic) | Hybrid | Semantic-aware 4DGS with rigid body constraints for dynamic scene editing |
| RiGS | arXiv'26 (2605.23672) | 4D Gaussians (rigid-aware) | Hybrid | Rigid-aware monocular 4DGS; leverages rigid body priors for temporal consistency |
### Universal Camera Feed-Forward Methods

| Method | Venue | #Gaussians | Inference | Key Feature |
|--------|-------|------------|-----------|-------------|
| UniSHARP | CVPR'26 (Insta360) | Variable | Single-pass, seconds | First unified monocular 3DGS across pinhole/fisheye/360° cameras; single image input; universal geometric representation for heterogeneous camera models |