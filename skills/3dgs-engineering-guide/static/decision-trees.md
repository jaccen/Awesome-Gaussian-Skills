---
# Decision Trees

## 4.1 By Use Case

- **AD simulation** → aiSim 6 / CARLA + 3DGS plugin + OpenDRIVE + ROS2
- **Digital twin / Smart city** → SuperMap GIS + LCC streaming / S3M
- **Cultural heritage** → Polycam (capture) + COLMAP + 3DGS; Luma AI (preview)
- **E-commerce** → gsplat.js / three.js + compression
- **Film / Game** → UE5 plugin + SuGaR (mesh) + material separation
- **Industrial inspection** → DJI + COLMAP + 3DGS + YOLO/SAM
- **Robotics** → GS-Playground (sim) + ROS2
- **Avatar / MoCap** → FreeMoCap + GaussianAvatar/EmoTaG + SMPL/FLAME
- **BIM / Architecture** → LCC + IFC alignment + as-built verification
- **Research** → original 3DGS + gsplat + custom extensions

## 4.2 By Platform

- **Desktop (NVIDIA)** → CUDA backend
- **Desktop (AMD/Intel)** → VkSplat / GSeurat
- **Mobile (iOS/Android)** → VkSplat / msplat (Metal) / WebGPU
- **Web** → gsplat.js / three.js / PlayCanvas Engine + @playcanvas/react
- **VR headset** → OpenXR+Vulkan (Quest) / Metal (Vision Pro)

## 4.3 By Scene Scale

- **< 100K Gaussians** → original 3DGS, 5–15 min on RTX 3070+
- **< 10M** → Scaffold-GS + GETA-3DGS (5x), 30 min–2h on RTX 4090
- **< 100M** → Spatial partitioning + MesonGS++ (34x), 2–7h on A100
- **> 1B** → LCC + S3M + HAC (100x), distributed 12–48h on GPU cluster