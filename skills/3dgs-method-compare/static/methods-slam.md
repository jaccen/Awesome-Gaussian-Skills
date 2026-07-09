
### SLAM Methods

| Method | Venue | Input | Scale | Key Feature |
|--------|-------|-------|-------|-------------|
| Gaussian Splatting SLAM | CVPR'24 (Highlight) | Monocular video | Room-scale | First real-time monocular 3DGS SLAM, differentiable rendering for joint pose+map |
| CGS-SLAM | IROS'25 | Monocular video | Room-scale | Voxel-based compact representation for efficiency |
| WildGS-SLAM | CVPR'25 | Monocular video | Room-scale | Dynamic environments, uncertainty-aware mapping via pretrained 3D priors |
| S3PO-GS | ICCV'25 | Monocular video | Outdoor | Scale-consistent pose optimization, eliminates outdoor scale drift |
| Flow4DGS-SLAM | arXiv'26 | Monocular video | Room-scale | Optical flow-guided 4DGS for temporal consistency |
| GaussianPile | CVPR'26 | CT/volumetric scans | Organ-scale | Volumetric medical GS with focus-aware PSF projection + additive rasterization (not alpha-blending); 16-26× compression; 11× faster than NeRF; supports ultrasound/microscopy/MRI |
| Ilov3Splat | arXiv'26 | Multi-view video | Room-scale | Interpretable love-based 3DGS with region-aware decomposition |
| PhysX-Omni | arXiv'26 | Multi-modal (vision+physics) | Scene-scale | Omni-physics integrated 3DGS for unified simulation & rendering |
| E2EGS | CVPR'26 (2603.14684) | Event camera | Room-scale | Event-camera pose-free 3D reconstruction |
| MAGS-SLAM | arXiv'26 | RGB (multi-agent) | Multi-room | First RGB-only multi-agent 3DGS SLAM; compact submap communication + geometry/appearance-aware loop verification |
| GGD-SLAM | ICRA'26 | Monocular video | Room-scale | Generalizable motion model for dynamic SLAM; masks dynamic region residuals for correct factor graph |
| GeoGS-SLAM | arXiv'26 (2607.07452) | Monocular video | Room-scale | Geometry-Only GS removing appearance; 80%+ param reduction; SOTA online mapping |
| Real-Time LiDAR GS-SLAM | arXiv'26 (2607.04127) | LiDAR point cloud | Outdoor | First real-time LiDAR GS-SLAM; G-ICP + spherical rasterization; F-score 86.78%@>20FPS |
| DL-SLAM | arXiv'26 (2607.01860) | RGB video | Dynamic | Dual-level probability (semantic+geometric) for dynamic environment GS-SLAM; artifact-free static map |

### Large-Scale Methods

| Method | Venue | Scale | Key Feature |
|--------|-------|-------|-------------|
| Scaffold-GS | ICCV'23 | Building | Anchor-based efficiency |
| Scaffold-GS+ | CVPR'24 | City | Progressive training |
| CityGaussian | ECCV'24 | City | Hierarchical LOD |
| Street Gaussians | ECCV'24 | Street | Static/dynamic decomposition, driving scenes |
| Octree-GS | Preprint | City | Octree acceleration + LOD |
### Sensor Calibration Methods

| Method | Venue | Input | Calibration Target | Key Feature |
|--------|-------|-------|--------------------|-------------|
| GP-3DGS | ECCV'26 (2606.20103) | LiDAR + Camera | LiDAR-Camera extrinsic | Geometry-preserving 3DGS; blocks photometric gradient from spatial params; dense depth supervision from multi-view LiDAR; outperforms targetless methods |