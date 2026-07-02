---
# Common Engineering Pitfalls

- **Over-fitting to training views**: Artifacts at novel viewpoints. Fix: more viewpoints at different elevations, depth/opacity regularization, validate on held-out views.
- **Floating artifacts**: Semi-transparent blobs in empty space. Fix: depth regularization, opacity pruning (α < threshold), post-processing depth filter.
- **Memory explosion at scale**: GPU OOM > 10M Gaussians. Fix: spatial partitioning from day one, Scaffold-GS anchors, streaming for > 10M.
- **Sensor sim fidelity ignored**: High PSNR but inaccurate LiDAR/Radar. Fix: validate sensor outputs vs real data; opaque surface Gaussians for LiDAR; calibrate Radar cross-section.
- **CUDA lock-in**: Cannot deploy to AMD/Intel/Mobile. Fix: VkSplat/GSeurat (Vulkan), msplat (Metal), tortuise (Rust CPU), **brush** (Rust/WebGPU/Burn, most complete cross-platform: Win/Mac/Linux/Android/Web, 4.3k stars, faster than gsplat); abstract CUDA behind interface.
- **Sorting bottleneck for semi-transparent scenes**: Alpha-compositing requires depth sort. Fix: **DP-GES** (Depth Peeling for sort-free surfel rendering) eliminates sorting entirely.
- **No version control for 3DGS**: Cannot reproduce/track changes. Fix: git LFS or DVC; separate metadata (YAML) from binary; semantic versioning.
- **Static lighting assumption**: Breaks under different lighting. Fix: plan relighting upfront; GOR-IS/SSD-GS decomposition; GS³/GaRe SH-based relighting; **F-RNG** for feed-forward relighting at ~25× speed.
- **Temporal inconsistency**: Video flicker, object jumping. Fix: 4DGS (GauFRe, DeformGS, ScubeGS); temporal smoothness loss.
- **Under-estimated compression artifacts**: Visible holes, color shifts. Fix: rate-distortion benchmarks first; domain-specific metrics; uncompressed reference for comparison.
- **Hierarchical tile partitioning/rasterization scale mismatch**: Can break exact alpha compositing. Fix: use HiGS-style dual-scale architecture with conservative coverage test.