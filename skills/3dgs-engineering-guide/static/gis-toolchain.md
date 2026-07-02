---
# The GIS Toolchain Gap: "3DGS Looks Good but Does Nothing"

> The #1 pain point blocking 3DGS from production use (based on industry practitioner analysis, particularly WebGIS engineer xjjdjj).

After expensive drone surveys and 3DGS reconstruction, the resulting PLY file cannot: measure distances, cut cross-sections, calculate volumes, compute surface areas, query semantics, or overlay real-time video.

## 5 Root Causes

1. **Format mismatch**: 3DGS = unstructured Gaussian primitives; GIS expects structured geometry. No standard conversion layer.
2. **No spatial reference**: 3DGS lives in arbitrary local coordinates; GIS requires WGS84/projected CRS.
3. **No semantic layer**: No notion of "this group is a building" / "this surface is a road."
4. **No analysis primitives**: GIS operates on mesh faces/edges/vertices; ray-Gaussian intersection is not a standard GIS operation.
5. **No real-time data fusion**: 3DGS is static; live video overlay requires camera pose estimation + temporal sync + occlusion handling.

## 6 Solution Categories

1. **Distance measurement**: Raycasting through Gaussian field → surface point → Euclidean distance; or KNN surface estimation; project to vertical/horizontal plane first
2. **Cross-section clipping**: Plane-Gaussian intersection; GPU shader real-time clipping; use cases: geological, architectural, pipeline
3. **Volume calculation**: Voxelization (occupancy grid × voxel volume) or Gaussian integral (probability mass above reference plane); needs closed-surface assumption
4. **Surface area**: Multi-view projected area (SH degree-0) or mesh extraction first (SuGaR/2DGS)
5. **Semantic enrichment**: SAM/SAGA segment 2D → project to 3D Gaussians; or CLIP embeddings for semantic queries; map to CityGML/OGC
6. **Real-time video fusion**: Camera calibration + SLAM pose → frame-to-3D projection → depth z-buffering → temporal progressive update

## PlayCanvas Pipeline (3 CLI commands)

```bash
splat-transform scene.ply --seed-pos 0,1,0 --voxel-params 0.05,0.1 \
  --voxel-carve 1.6,0.2 -K scene.sog
npx glb-to-navmesh scene.collision.glb navmesh.bin
# Step 3: Bake lightness probes (in-engine, ~15s, ~40KB JSON)
```

| Component | Tool | Output | Size |
|-----------|------|--------|------|
| Collision mesh | `splat-transform -K` | `.collision.glb` | ~1 MB |
| Nav mesh | `recast-navigation` | `navmesh.bin` | ~100 KB |
| Lightness grid | Probe script | `lightness.json` | ~40 KB |
| Streamed SOG | `splat-transform` | Multi-chunk `.sog/` + manifest | ~5% of PLY |

**Key insights**: Voxelization + flood-fill = sealed collision meshes; lightness probes as JSON (mobile-friendly); SOG streaming enables mobile deployment.

## GIS Toolchain Solutions Table

| Task | Tool | Notes |
|------|------|-------|
| PLY → 3D Tiles | libTileSplat, supermap-3dtiles | Cesium-compatible |
| PLY → collision mesh | splat-transform -K | Voxelization + flood-fill |
| PLY → nav mesh | splat-transform + recast-navigation | Collision GLB → Recast |
| PLY → compressed SOG | splat-transform | 20x, streaming LOD |
| Web 3DGS editor | SuperSplat | Browser-based, PWA |
| Spatial analysis | Custom Python (NumPy + plyfile) | Build custom GIS layer |
| Semantic labeling | SAGA | SAM → 3D projection |
| Lightness baking | PlayCanvas probe script | ~15s bake, ~40KB |
| Volume calculation | Custom voxelizer + PLY parser | Not yet standard |
| Cesium rendering | gsplat.js, cesium-3dgs-plugin | Three.js limited native support |

**Standards progress**: CSM group standard for 3DGS modeling initiated (2026-04); S3M extended; 3D Tiles extension proposals; Spatial-TTT (ECCV 2026): streaming spatial memory; Holi-Spatial (ICML 2026 Oral): automated 4M+ spatial data from video streams