---
name: nerf-to-3dgs-migrator
description: "Migrate NeRF-based methods to 3DGS with step-by-step guidance. Analyzes component compatibility, provides code templates, identifies issues. Covers encoding, deformation, appearance, geometry. Use when: migrating NeRF method to 3DGS, comparing NeRF vs 3DGS components, designing hybrid NeRF-3DGS approaches, NeRF迁移3DGS/高斯泼溅转换/代码模板."
license: Apache-2.0
user-invocable: true
metadata:
  version: "1.5.0"
  author: jaccen
  tags: ["nerf", "3dgs", "gaussian-splatting", "migration", "code-template", "research"]
  when_to_use:
    - "Migrate a NeRF-based method to 3DGS"
    - "Compare NeRF vs 3DGS component compatibility"
    - "Design hybrid NeRF-3DGS approaches"
    - "Get step-by-step migration code templates"
    - "Identify issues when converting from volume rendering to splatting"
    - "NeRF迁移3DGS / 高斯泼溅转换 / 代码模板 / 组件兼容性分析"
---

# NeRF-to-3DGS Migration Guide

You are a 3D reconstruction expert with deep knowledge of both NeRF and 3D Gaussian Splatting paradigms. Help users migrate their NeRF-based methods to 3DGS, or design new methods that combine insights from both.

## Core Paradigm Differences

Before any migration, understand these fundamental differences:

| Aspect | NeRF | 3DGS |
|--------|------|------|
| Representation | Continuous (MLP + volumetric) | Discrete (explicit Gaussians) |
| Rendering | Volume rendering (ray marching) | Splatting (α-compositing) |
| Sampling | Along rays (coarse-to-fine) | Point-based (all Gaussians) |
| Query | Point sampling + MLP forward | Direct attribute lookup |
| Density control | Implicit (MLP output) | Explicit (clone/split/prune) |
| Memory | Bounded (MLP params) | Unbounded (grows during training) |
| Speed | Slow (per-pixel ray march) | Fast (parallel rasterization) |
| Quality ceiling | High (continuous) | High (adaptive density) |

## Migration Workflow

### Step 1: Component Analysis

Analyze the source NeRF method and classify each component:

```
┌─────────────────────────────────┐
│     NeRF Method Components      │
├─────────────────┬───────────────┤
│ Component       │ Migration     │
│                 │ Strategy      │
├─────────────────┼───────────────┤
│ Positional      │ → Per-Gaussian│
│ Encoding        │   SH/feature  │
├─────────────────┼───────────────┤
│ Density MLP     │ → Opacity     │
│ (σ)             │   attribute   │
├─────────────────┼───────────────┤
│ Color MLP       │ → SH coeffs   │
│ (c)             │   or feature  │
├─────────────────┼───────────────┤
│ Deformation     │ → Offset on   │
│ Field           │   μ/R/S       │
├─────────────────┼───────────────┤
│ Appearance      │ → Per-Gaussian│
│ Embedding       │   feature vec │
├─────────────────┼───────────────┤
│ Hash Grid /     │ → Per-Gaussian│
│ Feature Grid    │   features    │
├─────────────────┼───────────────┤
│ Regularization  │ → Modify ADC  │
│ (TV, depth,     │   or add loss │
│  normal)        │               │
├─────────────────┼───────────────┤
│ Coarse-to-Fine  │ → Progressive │
│ Sampling        │   training    │
└─────────────────┴───────────────┘
```

### Step 2: Component-by-Component Migration

#### 2.1 Positional Encoding → Per-Gaussian Features

**NeRF approach**: Points are sampled along rays, encoded via PE/hash grid, fed to MLP.

**3DGS equivalent**: Each Gaussian has explicit features stored as attributes.

**Migration options**:

| NeRF Encoding | 3DGS Mapping | Code Pattern |
|---------------|-------------|--------------|
| Frequency PE (sin/cos) | SH coefficients (built-in) | Direct: SH is 3DGS's native encoding |
| Hash grid (Instant-NGP) | Per-Gaussian feature vector | Store N-dim feature per Gaussian, concatenate with SH |
| Tri-plane encoding | Per-Gaussian feature vector | Same as above |
| Multi-resolution hash | Adaptive feature dimension | Use higher SH degree for important regions |

**Code template** (PyTorch):
```python
# Before: NeRF — encoding is computed on-the-fly
def query_mlp(points, rays):
    encoded = hash_grid(points)  # (N, D)
    density = density_mlp(encoded)
    color = color_mlp(encoded, rays)

# After: 3DGS — encoding is stored per-Gaussian
class GaussianModel:
    def __init__(self):
        self._xyz = nn.Parameter(...)       # position (N, 3)
        self._opacity = nn.Parameter(...)   # opacity (N, 1)
        self._features = nn.Parameter(...)  # encoded features (N, D)  ← NEW
        self._sh = nn.Parameter(...)        # SH coefficients (N, 3*K)
```

#### 2.2 Density (σ) → Opacity (α)

**Key difference**: NeRF density σ ∈ [0, ∞), 3DGS opacity α ∈ [0, 1].

**Migration**:
```python
# NeRF: α = 1 - exp(-σ * δ) where δ is step size
# 3DGS: α = sigmoid(raw_opacity)

# If you need density-like behavior from opacity:
density_from_opacity = -torch.log(1 - opacity + 1e-6) / voxel_size
```

#### 2.3 Volume Rendering → Splatting

**NeRF**: C = Σ c_i * α_i * T_i (along ray, with T = Π(1 - α_j))
**3DGS**: Same formula but **Gaussians are sorted by depth**, not sampled along ray.

**Critical change**: In NeRF, points are implicitly ordered by distance along ray. In 3DGS, you must **explicitly sort** all Gaussians by depth before compositing.

```python
# NeRF: ordered by construction (ray march)
# 3DGS: must sort explicitly
sorted_indices = torch.argsort(depths, dim=0)  # depth = (N, 1)
gaussians_sorted = gaussians[sorted_indices]
```

#### 2.4 Deformation Field → Gaussian Attribute Offsets

**NeRF**: Deformation field is queried at each sampled point.
**3DGS**: Apply deformation as offsets to Gaussian parameters.

```python
# NeRF approach
def deform(points, t):
    delta = deformation_mlp(points, t)
    return points + delta

# 3DGS approach
class DeformableGaussians:
    def apply_deformation(self, t):
        # Option 1: Direct offset on position
        self._xyz = self.base_xyz + self.deformation_net(self.base_xyz, t)

        # Option 2: Offset on rotation and scale too
        self._rotation = self.base_rotation + delta_rotation(t)
        self._scaling = self.base_scaling * scale_factor(t)
```

#### 2.5 Appearance Embedding → Per-Gaussian Appearance

```python
# NeRF: appearance is a learned vector per-image
# 3DGS: store appearance-modulating features per Gaussian

class AppearanceGaussians:
    def __init__(self, num_gaussians, appearance_dim=32):
        self._appearance = nn.Parameter(
            torch.randn(num_gaussians, appearance_dim) * 0.01
        )

    def get_color(self, sh_features, image_idx):
        # Combine SH features with appearance
        combined = torch.cat([sh_features, self._appearance], dim=-1)
        return self.color_net(combined)
```

### Step 3: Identify Incompatibilities

| NeRF Feature | 3DGS Compatibility | Workaround |
|-------------|-------------------|------------|
| Continuous opacity field | Implicit → Explicit loss | Replace with per-Gaussian opacity |
| Transmittance accumulation | Same formula, different order | Sort Gaussians by depth |
| Hierarchical sampling | Not needed (all Gaussians visible) | Remove, use ADC instead |
| NeRF-W / appearance per-image | Not native to 3DGS | Add per-Gaussian appearance features |
| SDF regularization | No native SDF in 3DGS | Add depth/normal loss as post-hoc |
| Multi-resolution features | Explicit per-Gaussian | Store feature vector, interpolate if needed |
| Ray-based queries | Point-based queries | Restructure query pipeline |

### Recent Densification Alternatives (2026)

When migrating NeRF methods that use custom density/sampling strategies, consider these modern alternatives to vanilla 3DGS ADC:

| Method | ArXiv | What It Replaces | Key Difference |
|--------|-------|-----------------|----------------|
| **Softmax-GS** (CVPR'26 Findings) | 2604.27437 | α-compositing rendering | Replaces α-compositing with softmax competition — NeRF methods using volume density (σ) should note this alternative blending formulation when migrating the compositing step |
| **LeGS** (SIGGRAPH'26) | 2605.00408 | Heuristic clone/split/prune ADC | RL-based density control learns when/where to add/remove Gaussians — replaces the fixed-threshold heuristics that NeRF-to-3DGS migrations often keep from vanilla 3DGS |
| **Structure-Aware Densification** (SIGGRAPH'26) | 2604.28016 | Vanilla isotropic split | Frequency-aware anisotropic splitting — when NeRF methods use frequency-based sampling or multi-resolution features, this provides a more principled densification strategy |
| **BA-GS** (CVPR'26 Best Paper) | — | COLMAP/SfM initialization | SfM-free 3DGS — eliminates COLMAP dependency by jointly optimizing camera poses and Gaussian parameters; critical for NeRF methods where custom camera estimation must be preserved in migration |
| **D4RT** (CVPR'26 Best Paper) | — | Static 3DGS + per-frame deformation | 4D dynamic reconstruction in Gaussian framework — provides the migration path for NeRF methods with temporal/deformation components (D-NeRF, HyperNeRF, etc.) |

### Step 4: Training Adaptation

Key changes to the training loop:

```python
# 1. Initialization
# NeRF: Random MLP weights
# 3DGS: SfM point cloud → initialize Gaussians

# 2. Density Control
# NeRF: Implicit (σ from MLP)
# 3DGS: Explicit ADC (clone, split, prune)

# 3. Training iterations
# NeRF: Typically 20k-100k per scene
# 3DGS: Typically 7k-30k (faster convergence)

# 4. Learning rates
# 3DGS standard:
#   position: 0.00016 * decay(0.01, step, 30000)
#   opacity: 0.05
#   scaling: 0.005
#   rotation: 0.001
#   SH: 0.0025 (degree 0), 0.000125 (degree 1+)
```

## Output Format

```
## Migration Plan: [Source Method] → 3DGS

### Method Overview
[Brief summary of the NeRF method]

### Component Mapping
| NeRF Component | 3DGS Equivalent | Complexity |
|---------------|-----------------|------------|
| ... | ... | Low/Med/High |

### Step-by-Step Migration
1. **Step Name**: [Description] + [Code template]

### Potential Issues
1. **Issue**: ... → **Solution**: ...

### Estimated Effort
- Implementation: X days
- Testing: X days
- Expected quality: [High/Medium/Low] compared to original

### Code Skeleton
[Minimal working code structure]
```

## Knowledge Base

This skill references a knowledge base of 690+ methods across 25 categories (updated for v0.3.3 cycle).

## Rules

1. **Preserve the core idea**: The goal is to express the same scientific insight in 3DGS form, not to create a different method.
2. **Be honest about trade-offs**: Some NeRF features don't translate well to 3DGS. Say so.
3. **Provide runnable code**: All code templates should be syntactically correct and importable.
4. **Test intermediate steps**: Suggest checkpoints where the user should verify correctness before continuing.









## Red Lines

The following are categorical prohibitions. Violating any of these invalidates the output:

- **No invented data**: Never fabricate migration rules, compatibility data, or method characteristics not in the loaded reference files. If a value is not found, write "data not available" or "N/A".
- **No hallucinated citations**: Never invent paper titles, authors, DOIs, arXiv IDs, or venue names. Only reference works explicitly present in the skill's knowledge base or provided by the user.
- **No silent speculation**: If you are uncertain about a technical detail, explicitly flag it with "[UNCERTAIN]" rather than presenting it as fact.
- **No method misattribution**: Do not assign features, results, or mechanisms from one method to another. Each method's data is specific to that method.
- **No oversimplified comparisons**: Do not reduce multi-dimensional trade-offs to a single "better/worse" judgment without context.

## Related Skills

- **3dgs-method-compare** — Method comparison (use for comparing NeRF vs 3DGS approaches)
- **3dgs-paper-reader** — Paper analysis (use for understanding NeRF and 3DGS papers)
- **3dgs-code-reviewer** — Code review (use for verifying migration implementation)
- **cad-mesh-3dgs** — CAD/Mesh integration (use for surface extraction post-migration)

## Guardrail: Do Not Apply From Memory

Do NOT try to apply the logic, method data, bug patterns, or technical details described in this skill from memory. Always read the SKILL.md and referenced files from disk before producing any output. The knowledge base is updated frequently; stale memory may produce outdated, inaccurate, or fabricated results.

If you cannot find a method, pattern, or data point in the loaded files, say so explicitly. Never invent metrics, venue acceptances, bug patterns, or technical features not present in the source data.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
