

# SLAT — Structured LATent Representation as Unified Conversion Framework

> **Shared reference for all representation-conversion skills** (cad-mesh-3dgs, nerf-to-3dgs-migrator, 3dgs-mcp-renderer)
>
> Source inspiration: TRELLIS (Microsoft, SIGGRAPH 2025) — large 3D asset generation model using SLAT as unified intermediate representation, decodable to 3D Gaussians, Meshes, and Radiance Fields.

## Why SLAT Matters for This Project

The Awesome-Gaussian-Skills project has multiple conversion-type skills:

- `cad-mesh-3dgs` — CAD ↔ Mesh ↔ 3DGS (62+ methods)
- `nerf-to-3dgs-migrator` — NeRF → 3DGS (component-by-component)
- `3dgs-mcp-renderer` — 3DGS → Three.js rendering (real-time)

Previously, each skill treated representation conversion as an ad-hoc, method-by-method lookup. **SLAT provides the missing unifying theory**: all 3D representations can be encoded into a shared structured latent space, then decoded to any target format. This replaces pairwise conversion tables with a principled encode-decode framework.

## Core SLAT Concepts

### 1. Structured Latent — Not a Flat Vector

Unlike a flat latent vector (as in VAE/GAN), SLAT is **structured**:

```
Input (any 3D representation)
       │
       ▼
┌──────────────────────────┐
│     Sparse Voxel Grid    │  ← 3D structure preserved
│   (Dense latent per      │
│    occupied voxel)       │
│                          │
│  Each voxel stores:      │
│  - Geometric features    │  ← shape info
│  - Appearance features   │  ← color/SH
│  - Semantic features     │  ← part/material
│  - Deformation hooks     │  ← articulation/anim
└──────────────────────────┘
       │
       ├── Decode → 3D Gaussians (μ, Σ, α, SH per voxel)
       ├── Decode → Mesh (vertices, faces from isosurface)
       ├── Decode → Radiance Field (MLP weights from features)
       └── Decode → Parametric CAD (primitives from segmentation)
```

### 2. Multi-Format Decoders Share One Latent Space

The key insight: **the same latent representation can be decoded to multiple output formats**. This means:

| Conversion | Old Approach (Pairwise) | SLAT Approach (Encode-Decode) |
|-----------|------------------------|-------------------------------|
| Mesh → 3DGS | Sample points on mesh → init Gaussians | Mesh → SLAT encode → 3DGS decode |
| 3DGS → Mesh | TSDF → Marching Cubes | 3DGS → SLAT encode → Mesh decode |
| NeRF → 3DGS | MLP → per-Gaussian attrs | NeRF → SLAT encode → 3DGS decode |
| 3DGS → CAD | Point cloud → RANSAC → B-rep | 3DGS → SLAT encode → CAD decode |
| Image → 3DGS | (not supported) | Image → SLAT (via TRELLIS) → 3DGS decode |

### 3. Conversion Loss Budget

Under SLAT, every conversion has a measurable **loss budget**:

```
Encoding Loss: Source → SLAT
  - Information not captured by the sparse voxel grid
  - E.g., sub-voxel geometric detail, high-frequency texture

Decoding Loss: SLAT → Target
  - Format-specific limitations
  - E.g., Mesh cannot represent view-dependent color; 3DGS lacks topology

Total Conversion Loss = Encoding Loss + Decoding Loss
```

This replaces vague "quality will degrade" statements with a **quantifiable framework**: you can measure encoding loss (latent reconstruction error) and decoding loss (format fidelity) separately.

## SLAT Encoding Strategies by Source Format

### From 3DGS → SLAT Encode

```python
def encode_gaussians_to_slat(gaussians, voxel_size=0.05):
    """Encode 3DGS into structured latent via sparse voxelization."""
    # 1. Spatial hashing: assign each Gaussian to a voxel
    voxel_indices = (gaussians.xyz / voxel_size).long()  # (N, 3)
    
    # 2. Pool Gaussian attributes per voxel
    #    Each voxel aggregates: mean position, mean SH, opacity sum, scale, rotation
    unique_voxels, inv = torch.unique(voxel_indices, dim=0, return_inverse=True)
    
    voxel_features = scatter_mean(
        torch.cat([gaussians.xyz, gaussians.sh, gaussians.opacity, 
                    gaussians.scaling, gaussians.rotation], dim=-1),
        inv, dim=0
    )  # (V, F) where V = num occupied voxels, F = feature dim
    
    return {
        'voxel_coords': unique_voxels,   # (V, 3) integer coordinates
        'features': voxel_features,       # (V, F) structured latent
        'voxel_size': voxel_size,
        'source_format': '3dgs'
    }
```

### From Mesh → SLAT Encode

```python
def encode_mesh_to_slat(vertices, faces, voxel_size=0.05):
    """Encode mesh into structured latent via surface voxelization."""
    # 1. Voxelize mesh surface
    voxel_grid = voxelize_mesh(vertices, faces, voxel_size)
    occupied = voxel_grid.get_occupied_voxels()  # (V, 3)
    
    # 2. Extract per-voxel features
    #    - Surface normal (from face normals)
    #    - Curvature (from second-order derivatives)
    #    - Color (from vertex colors or UV lookup)
    features = extract_surface_features(voxel_grid, vertices, faces)
    
    return {
        'voxel_coords': occupied,
        'features': features,
        'voxel_size': voxel_size,
        'source_format': 'mesh'
    }
```

### From NeRF → SLAT Encode

```python
def encode_nerf_to_slat(nerf_model, bbox, voxel_size=0.05):
    """Encode NeRF MLP into structured latent via density sampling."""
    # 1. Sample NeRF density on voxel grid
    voxel_coords = generate_grid_points(bbox, voxel_size)
    density, color = nerf_model.query(voxel_coords)
    
    # 2. Keep only occupied voxels (density > threshold)
    occupied_mask = density > 0.01
    occupied_coords = voxel_coords[occupied_mask]
    occupied_features = torch.cat([
        density[occupied_mask],
        color[occupied_mask],
        # Additional: gradient features for normal estimation
        compute_density_gradient(nerf_model, voxel_coords[occupied_mask])
    ], dim=-1)
    
    return {
        'voxel_coords': occupied_coords,
        'features': occupied_features,
        'voxel_size': voxel_size,
        'source_format': 'nerf'
    }
```

## SLAT Decoding Strategies by Target Format

### SLAT → 3DGS Decode

```python
def decode_slat_to_gaussians(slat):
    """Decode structured latent to 3D Gaussians."""
    V, F = slat['features'].shape
    
    # Each voxel → one or more Gaussians
    # Feature channels map to: position, SH, opacity, scale, rotation
    features = slat['features']
    
    xyz = features[:, 0:3] + slat['voxel_size'] * 0.5  # voxel center
    sh = features[:, 3:3+48]                            # SH degree 3
    opacity = features[:, 51:52]
    scaling = features[:, 52:55] * slat['voxel_size']   # scale in voxel units
    rotation = features[:, 55:59]                        # quaternion
    
    return GaussianModel(xyz=xyz, sh=sh, opacity=opacity,
                         scaling=scaling, rotation=rotation)
```

### SLAT → Mesh Decode

```python
def decode_slat_to_mesh(slat):
    """Decode structured latent to mesh via TSDF + Marching Cubes."""
    # 1. Reconstruct dense TSDF volume from sparse latent
    tsdf_volume = sparse_to_dense(slat['voxel_coords'], 
                                   slat['features'][:, 'sdf'],
                                   slat['voxel_size'])
    
    # 2. Marching Cubes
    vertices, faces = marching_cubes(tsdf_volume, level=0)
    
    # 3. Vertex colors from latent appearance features
    vertex_colors = interpolate_features_to_vertices(vertices, slat)
    
    return Mesh(vertices=vertices, faces=faces, colors=vertex_colors)
```

### SLAT → NeRF Decode

```python
def decode_slat_to_nerf(slat):
    """Decode structured latent to NeRF MLP via feature distillation."""
    # 1. Train a compact MLP to memorize voxel features
    #    Input: (x, y, z) → Output: (density, color)
    # 2. Distill from sparse latent to continuous field
    nerf_mlp = train_mlp_on_latent(slat, hidden_dim=64, num_layers=4)
    return nerf_mlp
```

## SLAT as Conversion-Loss Predictor

Under SLAT, you can predict conversion quality **before** running the full pipeline:

```
1. Encode source → SLAT (measure encoding loss)
2. If encoding loss is low → source representation is well-captured
3. Decode SLAT → target (measure decoding loss)
4. If decoding loss is low → target format can express the latent well
5. Total expected quality = f(encoding_loss, decoding_loss)
```

| Conversion | Encoding Loss | Decoding Loss | Expected Quality | Reason |
|-----------|--------------|--------------|-----------------|--------|
| 3DGS → Mesh | Low (3DGS has rich geometry) | Medium (mesh lacks view-dependent color) | Good geometry, flat appearance | SH info lost in mesh |
| Mesh → 3DGS | Medium (mesh has no appearance) | Low (3DGS can express any geometry) | Good geometry, no appearance | Must add appearance separately |
| NeRF → 3DGS | Low (NeRF has full field) | Low (3DGS is a natural decode target) | High | NeRF's continuous field maps cleanly to discrete Gaussians |
| 3DGS → CAD | High (3DGS lacks parametric structure) | Low (CAD primitives are simple) | Medium at best | Free-form surfaces don't map to parametric |
| Image → 3DGS | Depends on generation model | Low | Medium-High | Requires generative prior (TRELLIS) |

## When to Use SLAT Framework vs Direct Conversion

| Scenario | Use SLAT | Use Direct Conversion |
|----------|---------|----------------------|
| Single one-time conversion | ❌ Overkill | ✅ Faster, simpler |
| Need to convert to multiple target formats | ✅ Encode once, decode many | ❌ Must redo per pair |
| Want to measure conversion loss | ✅ Principled framework | ❌ No unified metric |
| Designing a new conversion method | ✅ Theoretical grounding | ❌ Ad-hoc |
| Comparing conversion methods | ✅ Common latent space for fair comparison | ❌ Different methods have different bases |
| Real-time conversion (< 1s) | ❌ Latent encoding overhead | ✅ Direct is faster |
| Research paper on representation conversion | ✅ SLAT provides the theory | ❌ No theoretical framework |

## SLAT-Informed Method Classification

The 62+ methods in cad-mesh-3dgs and the NeRF migration methods can be reclassified through the SLAT lens:

### Category A: Direct Pairwise (Pre-SLAT)
Methods that convert directly without an intermediate representation.
- SuGaR (3DGS → Mesh via TSDF)
- Mesh → Gaussian sampling (direct initialization)
- Most existing methods fall here

### Category B: Implicit Latent (Proto-SLAT)
Methods that use an implicit intermediate representation but don't formalize it.
- NeuS2 (3DGS → SDF → Mesh, SDF is a proto-latent)
- BrepGaussian (3DGS → implicit B-rep features → CAD)

### Category C: Explicit SLAT
Methods that explicitly use a structured latent as intermediate.
- TRELLIS (image → SLAT → 3DGS/Mesh/Radiance Field)
- Future methods should aim for this category

### Research Direction: Upgrading Category A → Category C
The SLAT framework suggests that many Category A methods could be improved by explicitly introducing a structured latent intermediate. This is a productive research direction for 3DGS method designers.

## Relation to This Project's Skills

| Skill | SLAT Integration Point |
|-------|----------------------|
| `cad-mesh-3dgs` | Replace ad-hoc "Representation Spectrum" with SLAT encode-decode framework as Section 0 theoretical foundation |
| `nerf-to-3dgs-migrator` | Add SLAT as the "why" behind component migration — each NeRF component maps to SLAT features, then decodes to 3DGS attributes |
| `3dgs-mcp-renderer` | SLAT latent can be the intermediate for voice-driven scene editing (edit latent → re-decode) |
| `3dgs-spatial-agent` | SLAT's semantic features enable agent-level scene understanding |
| `3dgs-articulated-reasoner` | SLAT's deformation hooks enable articulated object reasoning |

## Citation

- TRELLIS: **Structured LATent (SLAT) for Scalable and Versatile 3D Generation** — Hao et al., Microsoft, SIGGRAPH 2025. [GitHub](https://github.com/microsoft/TRELLIS)
- The SLAT framework is used here as a **theoretical lens** for organizing existing conversion methods, not as a claim that all methods implement SLAT.