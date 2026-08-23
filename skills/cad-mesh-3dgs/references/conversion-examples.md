# Conversion Code Examples

> Code examples referenced by `SKILL.md`. These Python snippets illustrate key conversion
> algorithms for the CAD & Mesh × 3DGS bridge. Load this file on demand when implementing
> or debugging the corresponding pipeline stages.

---

## 1. Covariance Initialization from Mesh (Mesh → 3DGS)

> Referenced by §1.4 of `SKILL.md`. Given a mesh face with normal **n** and area **A**,
> initialize a surface-constrained Gaussian: flat in the normal direction, spread in the
> tangent directions proportional to √(face_area).

```python
# For a Gaussian on a mesh surface:
# Normal direction: flat (small scale)
# Tangent directions: spread proportional to sqrt(face_area)

def init_gaussian_from_face(vertex_positions, face_normal, face_area):
    # Build local frame from face normal
    normal = face_normal / torch.norm(face_normal)
    # Find tangent vectors
    if abs(normal[0]) < 0.9:
        tangent1 = torch.cross(normal, torch.tensor([1, 0, 0]))
    else:
        tangent1 = torch.cross(normal, torch.tensor([0, 1, 0]))
    tangent1 = tangent1 / torch.norm(tangent1)
    tangent2 = torch.cross(normal, tangent1)

    # Scale: flat in normal direction, spread in tangent
    scale = torch.tensor([
        math.sqrt(face_area) * 0.5,  # tangent 1
        math.sqrt(face_area) * 0.5,  # tangent 2
        0.01                          # normal (thin shell)
    ])

    # Rotation from local frame to world
    R = torch.stack([tangent1, tangent2, normal], dim=1)  # 3x3

    return R, scale
```

---

## 2. Geometry Quality Evaluation (3DGS → Mesh)

> Referenced by §2.5 of `SKILL.md`. After mesh extraction, evaluate geometric fidelity
> with Chamfer Distance and F-Score.

```python
# Standard evaluation
import trimesh
import numpy as np
from scipy.spatial import cKDTree

def chamfer_distance(mesh_pred, mesh_gt, num_samples=100000):
    pts_pred = mesh_pred.sample(num_samples)
    pts_gt = mesh_gt.sample(num_samples)

    tree_pred = cKDTree(pts_pred)
    tree_gt = cKDTree(pts_gt)

    d1, _ = tree_gt.query(pts_pred)  # pred → gt
    d2, _ = tree_pred.query(pts_gt)  # gt → pred

    return np.mean(d1**2) + np.mean(d2**2)

def fscore(mesh_pred, mesh_gt, threshold=0.01):
    # F-Score = 2 * Precision * Recall / (Precision + Recall)
    # Precision: fraction of pred points within threshold of gt
    # Recall: fraction of gt points within threshold of pred
    ...
```

**Evaluation metrics summary:**

| Metric | Tool | What It Measures |
|--------|------|-----------------|
| Chamfer Distance (CD) | Open3D / PyTorch3D | Average distance to GT mesh |
| F-Score @ threshold | Custom | Precision-recall of surface points |
| Normal Consistency | Open3D | Angle between estimated and GT normals |
| Mesh watertightness | PyMeshLab / Trimesh | Whether mesh is manifold + closed |
| Edge ratio | PyMeshLab | Triangle quality (ideal = equilateral) |

---

## 3. Primitive Fitting for CAD Reverse Engineering

> Referenced by §4.4 of `SKILL.md`. Detect CAD primitives (planes, cylinders, cones, etc.)
> from a point cloud using RANSAC, a core step in the mesh → B-rep conversion pipeline.

**Common CAD primitives to detect:**

| Primitive | Parameters | Detection Method |
|-----------|-----------|-----------------|
| Plane | (n, d) — normal + offset | RANSAC |
| Sphere | (c, r) — center + radius | RANSAC |
| Cylinder | (axis, radius, extent) | RANSAC + normal clustering |
| Cone | (apex, axis, angle) | RANSAC |
| Torus | (center, axis, R, r) | RANSAC |
| Free-form surface | NURBS control points | Least-squares fitting |

```python
# Example: Plane detection from point cloud using RANSAC
import open3d as o3d

def detect_planes(pcd, distance_threshold=0.01, ransac_n=3, num_iterations=1000):
    segments = []
    remaining = pcd

    for _ in range(10):  # detect up to 10 planes
        plane_model, inliers = remaining.segment_plane(
            distance_threshold=distance_threshold,
            ransac_n=ransac_n,
            num_iterations=num_iterations
        )
        if len(inliers) < 100:
            break

        # Extract plane segment
        plane_cloud = remaining.select_by_index(inliers)
        remaining = remaining.select_by_index(inliers, invert=True)

        # [a, b, c, d] where ax + by + cz + d = 0
        a, b, c, d = plane_model
        segments.append({
            'type': 'plane',
            'normal': [a, b, c],
            'offset': d,
            'points': plane_cloud,
            'num_points': len(inliers)
        })

    return segments, remaining
```