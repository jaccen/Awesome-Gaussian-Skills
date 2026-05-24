"""
CAD → 3DGS Pipeline: Parametric CAD models to Gaussian initialization
=====================================================================

Converts STEP/GLB CAD models (with part topology) into initialized 3DGS
point clouds suitable for training. Part labels from STEP_topology are
preserved for Part-Aware alpha compositing experiments.

Inspired by: https://github.com/gordensun/cad-power-animations
Integrated into: Awesome-Gaussian-Skills cad-mesh-3dgs skill

Usage:
    # From STEP file (requires build123d + OCP)
    python cad2gs_pipeline.py --input model.step --output output/planetary_gearbox/

    # From GLB file (with STEP_topology occurrence labels)
    python cad2gs_pipeline.py --input model.glb --output output/planetary_gearbox/

    # With custom sampling density
    python cad2gs_pipeline.py --input model.glb --output output/gearbox/ --samples_per_m2 80000

    # Generate multi-view renders from STEP (requires Blender)
    python cad2gs_pipeline.py --input model.step --output output/gearbox/ --render_views 100

Dependencies:
    pip install trimesh numpy torch open3d
    # Optional for STEP input: pip install build123d OCP
    # Optional for rendering: Blender + bpy
"""

import argparse
import json
import os
import sys
import numpy as np
from pathlib import Path


# ============================================================================
# Step 1: Load CAD model with part topology
# ============================================================================

def load_step_with_topology(step_path):
    """Load a STEP file and extract per-part geometry with labels.

    Uses build123d to parse the STEP file and extract Compound children
    as separate part meshes with their occurrence labels.

    Returns:
        list of (label: str, vertices: np.ndarray, faces: np.ndarray, normals: np.ndarray)
    """
    try:
        from build123d import import_step, Compound, Solid
        from OCP import StlAPI, BRepMesh
    except ImportError:
        print("[ERROR] build123d and OCP are required for STEP input.")
        print("  Install: pip install build123d OCP")
        print("  Alternative: export your STEP to GLB first, then use --input model.glb")
        sys.exit(1)

    compound = import_step(step_path)

    parts = []
    for child in compound.children:
        label = child.label if hasattr(child, 'label') and child.label else f"part_{len(parts)}"
        # Tessellate to mesh
        mesh_data = _tessellate_compound(child)
        if mesh_data is not None:
            parts.append((label, *mesh_data))

    if not parts:
        # Single part model — treat the whole compound as one part
        mesh_data = _tessellate_compound(compound)
        if mesh_data is not None:
            parts.append(("root", *mesh_data))

    return parts


def load_glb_with_topology(glb_path):
    """Load a GLB file with STEP_topology extension, extract per-part meshes.

    STEP_topology stores occurrence labels as node names (e.g., 'o1.3').
    Falls back to mesh group names if no topology is found.

    Returns:
        list of (label: str, vertices: np.ndarray, faces: np.ndarray, normals: np.ndarray)
    """
    import trimesh

    scene = trimesh.load(glb_path)

    parts = []

    if isinstance(scene, trimesh.Scene):
        # Try to get occurrence-labeled geometry from STEP_topology
        for name, geom in scene.geometry.items():
            if isinstance(geom, trimesh.Trimesh):
                label = name  # e.g., "o1.3" from STEP_topology
                vertices = geom.vertices
                faces = geom.faces
                normals = geom.face_normals
                parts.append((label, vertices, faces, normals))
    elif isinstance(scene, trimesh.Trimesh):
        # Single mesh — no part decomposition
        parts.append(("root", scene.vertices, scene.faces, scene.face_normals))

    return parts


def _tessellate_compound(compound, linear_deflection=0.1, angular_deflection=0.5):
    """Tessellate a build123d Compound into triangle mesh data."""
    try:
        from build123d import Mesh
        mesh = Mesh(compound, linear_deflection=linear_deflection,
                     angular_deflection=angular_deflection)
        return (np.array(mesh.vertices), np.array(mesh.triangles),
                np.array(mesh.triangle_normals))
    except Exception:
        return None


# ============================================================================
# Step 2: Curvature-aware surface sampling
# ============================================================================

def sample_part_surface(vertices, faces, normals, n_samples,
                        curvature_weight=2.0, samples_per_m2=50000):
    """Sample points on a mesh surface with curvature-aware density.

    More samples are placed in high-curvature regions (edges, fillets, teeth)
    to ensure fine geometric features are captured by Gaussians.

    Returns:
        positions: np.ndarray (n_samples, 3)
        face_indices: np.ndarray (n_samples,) — which face each sample came from
    """
    import trimesh

    mesh = trimesh.Trimesh(vertices=vertices, faces=faces)

    # Compute discrete curvature proxy: angle defect per vertex
    curvatures = _compute_curvature_proxy(mesh)

    # Per-face curvature = mean of vertex curvatures
    face_curvatures = curvatures[mesh.faces].mean(axis=1)

    # Weighted sampling: higher curvature → more samples
    face_areas = mesh.area_faces
    weights = face_areas * (1.0 + curvature_weight * np.abs(face_curvatures))
    weights = weights / weights.sum()

    if n_samples <= 0:
        surface_area = mesh.area
        n_samples = max(500, int(surface_area * samples_per_m2))

    # Weighted random choice of faces
    chosen_faces = np.random.choice(len(faces), size=n_samples, p=weights)

    # Sample random barycentric coords within each chosen face
    positions = np.zeros((n_samples, 3))
    for i, fi in enumerate(chosen_faces):
        v0, v1, v2 = vertices[faces[fi]]
        r1, r2 = np.random.random(2)
        sqrt_r1 = np.sqrt(r1)
        bary = np.array([1 - sqrt_r1, sqrt_r1 * (1 - r2), sqrt_r1 * r2])
        positions[i] = bary @ np.array([v0, v1, v2])

    return positions, chosen_faces


def _compute_curvature_proxy(mesh):
    """Compute curvature proxy using angle defect at each vertex."""
    n_verts = len(mesh.vertices)
    curvature = np.zeros(n_verts)

    # Angle sum at each vertex
    angle_sum = np.zeros(n_verts)
    vertex_count = np.zeros(n_verts)

    for face in mesh.faces:
        v0, v1, v2 = mesh.vertices[face]
        for i, (a, b, c) in enumerate([(v0, v1, v2), (v1, v2, v0), (v2, v0, v1)]):
            edge1 = b - a
            edge2 = c - a
            cos_angle = np.dot(edge1, edge2) / (
                np.linalg.norm(edge1) * np.linalg.norm(edge2) + 1e-10)
            angle_sum[face[i]] += np.arccos(np.clip(cos_angle, -1, 1))
            vertex_count[face[i]] += 1

    # Angle defect = 2π - angle_sum (Gaussian curvature proxy)
    mask = vertex_count > 0
    curvature[mask] = np.abs(2 * np.pi - angle_sum[mask])

    return curvature


# ============================================================================
# Step 3: Gaussian initialization from sampled points
# ============================================================================

def initialize_gaussians(parts_samples):
    """Initialize Gaussian parameters from per-part sampled points.

    Args:
        parts_samples: list of (label, positions, face_indices, mesh)

    Returns:
        dict with torch tensors: means, scales, rotations, opacities, part_ids, part_map
    """
    try:
        import torch
    except ImportError:
        # Fall back to numpy-only mode
        torch = None

    all_means = []
    all_scales = []
    all_rotations = []
    all_opacities = []
    all_part_ids = []
    all_sh_dc = []  # DC component of SH (base color)

    part_map = {}
    normal_scale = 0.01  # Thin flat Gaussians on surfaces

    # Color palette for parts (used as SH dc initialization)
    part_colors = [
        [0.8, 0.2, 0.2],  # red
        [0.2, 0.8, 0.2],  # green
        [0.2, 0.2, 0.8],  # blue
        [0.8, 0.8, 0.2],  # yellow
        [0.8, 0.2, 0.8],  # magenta
        [0.2, 0.8, 0.8],  # cyan
        [0.9, 0.5, 0.1],  # orange
        [0.5, 0.1, 0.9],  # purple
        [0.7, 0.7, 0.7],  # gray
        [0.5, 0.8, 0.3],  # light green
    ]

    for pid, (label, positions, face_indices, vertices, faces, normals) in enumerate(parts_samples):
        part_map[label] = pid
        color = part_colors[pid % len(part_colors)]

        face_areas = _compute_face_areas(vertices, faces)
        sample_face_areas = face_areas[face_indices]

        for i in range(len(positions)):
            n = normals[face_indices[i]]
            area = sample_face_areas[i]

            # Rotation from face normal
            R = _normal_to_rotation(n)

            # Scale: flat in normal, spread in tangent
            s = max(np.sqrt(area) * 0.5, 0.001)
            scale = np.array([s, s, normal_scale])

            all_means.append(positions[i])
            all_scales.append(scale)
            all_rotations.append(R)
            all_opacities.append(1.0)
            all_part_ids.append(pid)
            all_sh_dc.append(color)

    means = np.array(all_means, dtype=np.float32)
    scales = np.array(all_scales, dtype=np.float32)
    rotations = np.array(all_rotations, dtype=np.float32)
    opacities = np.array(all_opacities, dtype=np.float32)
    part_ids = np.array(all_part_ids, dtype=np.int64)
    sh_dc = np.array(all_sh_dc, dtype=np.float32)

    # Convert scale → log scale (3DGS convention)
    log_scales = np.log(scales + 1e-8)

    # Convert rotation matrices → quaternions (3DGS convention)
    quats = np.array([_rotation_matrix_to_quaternion(R) for R in rotations],
                     dtype=np.float32)

    # Convert opacity → logit (3DGS convention)
    opacity_logits = np.log(opacities / (1 - opacities + 1e-8) + 1e-8)

    result = {
        "means": means,
        "log_scales": log_scales,
        "quaternions": quats,
        "opacity_logits": opacity_logits,
        "sh_dc": sh_dc,
        "part_ids": part_ids,
        "part_map": part_map,
        "num_gaussians": len(means),
    }

    if torch is not None:
        for key in ["means", "log_scales", "quaternions", "opacity_logits",
                     "sh_dc", "part_ids"]:
            result[key] = torch.tensor(result[key])

    return result


def _compute_face_areas(vertices, faces):
    """Compute area of each triangle face."""
    v0 = vertices[faces[:, 0]]
    v1 = vertices[faces[:, 1]]
    v2 = vertices[faces[:, 2]]
    cross = np.cross(v1 - v0, v2 - v0)
    return 0.5 * np.linalg.norm(cross, axis=1)


def _normal_to_rotation(normal):
    """Convert face normal to 3x3 rotation matrix."""
    n = normal / (np.linalg.norm(normal) + 1e-10)
    if abs(n[0]) < 0.9:
        t1 = np.cross(n, np.array([1.0, 0.0, 0.0]))
    else:
        t1 = np.cross(n, np.array([0.0, 1.0, 0.0]))
    t1 = t1 / (np.linalg.norm(t1) + 1e-10)
    t2 = np.cross(n, t1)
    return np.stack([t1, t2, n], axis=1)


def _rotation_matrix_to_quaternion(R):
    """Convert 3x3 rotation matrix to quaternion (w, x, y, z)."""
    trace = R[0, 0] + R[1, 1] + R[2, 2]
    if trace > 0:
        s = 0.5 / np.sqrt(trace + 1.0)
        w = 0.25 / s
        x = (R[2, 1] - R[1, 2]) * s
        y = (R[0, 2] - R[2, 0]) * s
        z = (R[1, 0] - R[0, 1]) * s
    elif R[0, 0] > R[1, 1] and R[0, 0] > R[2, 2]:
        s = 2.0 * np.sqrt(1.0 + R[0, 0] - R[1, 1] - R[2, 2])
        w = (R[2, 1] - R[1, 2]) / s
        x = 0.25 * s
        y = (R[0, 1] + R[1, 0]) / s
        z = (R[0, 2] + R[2, 0]) / s
    elif R[1, 1] > R[2, 2]:
        s = 2.0 * np.sqrt(1.0 + R[1, 1] - R[0, 0] - R[2, 2])
        w = (R[0, 2] - R[2, 0]) / s
        x = (R[0, 1] + R[1, 0]) / s
        y = 0.25 * s
        z = (R[1, 2] + R[2, 1]) / s
    else:
        s = 2.0 * np.sqrt(1.0 + R[2, 2] - R[0, 0] - R[1, 1])
        w = (R[1, 0] - R[0, 1]) / s
        x = (R[0, 2] + R[2, 0]) / s
        y = (R[1, 2] + R[2, 1]) / s
        z = 0.25 * s
    return np.array([w, x, y, z])


# ============================================================================
# Step 4: Save to 3DGS-compatible formats
# ============================================================================

def save_gaussian_ply(gaussians, output_path):
    """Save initialized Gaussians as PLY file (3DGS compatible).

    Includes part_id as a custom property for Part-Aware experiments.
    """
    try:
        import torch
        means = gaussians["means"].numpy() if hasattr(gaussians["means"], 'numpy') else gaussians["means"]
        log_scales = gaussians["log_scales"].numpy() if hasattr(gaussians["log_scales"], 'numpy') else gaussians["log_scales"]
        quats = gaussians["quaternions"].numpy() if hasattr(gaussians["quaternions"], 'numpy') else gaussians["quaternions"]
        op_logits = gaussians["opacity_logits"].numpy() if hasattr(gaussians["opacity_logits"], 'numpy') else gaussians["opacity_logits"]
        sh_dc = gaussians["sh_dc"].numpy() if hasattr(gaussians["sh_dc"], 'numpy') else gaussians["sh_dc"]
        part_ids = gaussians["part_ids"].numpy() if hasattr(gaussians["part_ids"], 'numpy') else gaussians["part_ids"]
    except Exception:
        means = gaussians["means"]
        log_scales = gaussians["log_scales"]
        quats = gaussians["quaternions"]
        op_logits = gaussians["opacity_logits"]
        sh_dc = gaussians["sh_dc"]
        part_ids = gaussians["part_ids"]

    n = len(means)

    # Write PLY header + binary data
    with open(output_path, 'wb') as f:
        header = f"""ply
format binary_little_endian 1.0
element vertex {n}
property float x
property float y
property float z
property float nx
property float ny
property float nz
property float f_dc_0
property float f_dc_1
property float f_dc_2
property float f_rest_0
property float opacity
property float scale_0
property float scale_1
property float scale_2
property float rot_0
property float rot_1
property float rot_2
property float rot_3
property int part_id
end_header
"""
        f.write(header.encode('ascii'))

        for i in range(n):
            # SH DC: 0.28209479177 * C → f_dc
            dc = sh_dc[i] * 0.28209479177
            data = np.array([
                means[i][0], means[i][1], means[i][2],     # x, y, z
                0.0, 0.0, 0.0,                              # normals (unused at init)
                dc[0], dc[1], dc[2],                         # f_dc
                0.0,                                          # f_rest_0 (placeholder)
                1.0 / (1.0 + np.exp(-op_logits[i])),        # opacity (sigmoid)
                log_scales[i][0], log_scales[i][1], log_scales[i][2],  # scale
                quats[i][0], quats[i][1], quats[i][2], quats[i][3],    # rotation
                int(part_ids[i])                              # part_id
            ], dtype='float32')
            # Last field is int, need to handle separately
            f.write(data[:-1].tobytes())
            f.write(np.array([int(part_ids[i])], dtype='int32').tobytes())


def save_metadata(gaussians, output_path):
    """Save part map and stats as JSON."""
    metadata = {
        "num_gaussians": gaussians["num_gaussians"],
        "num_parts": len(gaussians["part_map"]),
        "part_map": {k: int(v) for k, v in gaussians["part_map"].items()},
        "has_torch": hasattr(gaussians["means"], 'numpy'),
    }
    with open(output_path, 'w') as f:
        json.dump(metadata, f, indent=2)


# ============================================================================
# Step 5: Multi-view rendering from STEP (optional, requires Blender)
# ============================================================================

def render_multiview(step_path, output_dir, n_views=100, resolution=800):
    """Render multi-view images from a STEP file using Blender.

    Generates COLMAP-compatible camera files for 3DGS training.
    """
    blender_script = f'''
import bpy, math, os, json

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.step(filepath=r"{step_path}")

# Adjust scene
scene = bpy.context.scene
scene.render.resolution_x = {resolution}
scene.render.resolution_y = {resolution}
scene.render.engine = 'BLENDER_EEVEE_NEXT'

# Add lighting
bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
bpy.ops.object.light_add(type='AREA', location=(-3, -3, 5))

# Camera setup
cam_obj = bpy.data.objects['Camera']
cam = cam_obj.data
cam.lens = 50  # 50mm focal length

n_views = {n_views}
cameras = []

for i in range(n_views):
    theta = 2 * math.pi * i / n_views
    phi = math.pi / 4
    r = 3.0

    cam_obj.location = (
        r * math.sin(phi) * math.cos(theta),
        r * math.sin(phi) * math.sin(theta),
        r * math.cos(phi)
    )

    # Look at origin
    direction = -cam_obj.location.normalized()
    cam_obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()

    img_path = os.path.join(r"{output_dir}", "images", f"{{i:04d}}.png")
    scene.render.filepath = img_path
    bpy.ops.render.render(write_still=True)

    # Store camera params
    cameras.append({{
        "image_path": f"images/{{i:04d}}.png",
        "rotation": list(cam_obj.rotation_euler),
        "location": list(cam_obj.location),
        "fx": cam.lens * {resolution} / 36.0,
        "fy": cam.lens * {resolution} / 36.0,
        "cx": {resolution} / 2.0,
        "cy": {resolution} / 2.0,
    }})

# Save cameras
with open(os.path.join(r"{output_dir}", "cameras.json"), 'w') as f:
    json.dump(cameras, f, indent=2)
'''
    # Write Blender script
    script_path = os.path.join(output_dir, "_render_script.py")
    with open(script_path, 'w') as f:
        f.write(blender_script)

    os.makedirs(os.path.join(output_dir, "images"), exist_ok=True)

    print(f"[INFO] Blender script written to {script_path}")
    print(f"[INFO] Run with: blender --background --python {script_path}")


# ============================================================================
# Main pipeline
# ============================================================================

def run_pipeline(args):
    """Run the full CAD → 3DGS conversion pipeline."""
    input_path = args.input
    output_dir = args.output
    samples_per_m2 = args.samples_per_m2
    normal_scale = args.normal_scale
    curvature_weight = args.curvature_weight

    os.makedirs(output_dir, exist_ok=True)

    # Step 1: Load CAD model with part topology
    print(f"[1/5] Loading CAD model: {input_path}")
    ext = Path(input_path).suffix.lower()
    if ext == '.step' or ext == '.stp':
        parts = load_step_with_topology(input_path)
    elif ext == '.glb' or ext == '.gltf':
        parts = load_glb_with_topology(input_path)
    else:
        print(f"[ERROR] Unsupported format: {ext}. Use .step, .stp, .glb, or .gltf")
        sys.exit(1)

    print(f"  Found {len(parts)} parts")
    for label, verts, faces, normals in parts:
        print(f"    - {label}: {len(verts)} vertices, {len(faces)} faces")

    # Step 2: Sample points on each part's surface
    print(f"[2/5] Sampling surfaces (density: {samples_per_m2} pts/m², curvature weight: {curvature_weight})")
    parts_samples = []
    total_samples = 0
    for label, vertices, faces, normals in parts:
        positions, face_indices = sample_part_surface(
            vertices, faces, normals,
            n_samples=0,  # Auto-calculate from surface area
            curvature_weight=curvature_weight,
            samples_per_m2=samples_per_m2
        )
        parts_samples.append((label, positions, face_indices, vertices, faces, normals))
        total_samples += len(positions)
        print(f"    - {label}: {len(positions)} sampled points")

    print(f"  Total: {total_samples} sampled points")

    # Step 3: Initialize Gaussians
    print(f"[3/5] Initializing Gaussians (normal_scale: {normal_scale})")
    gaussians = initialize_gaussians(parts_samples)
    print(f"  Created {gaussians['num_gaussians']} Gaussians across {len(gaussians['part_map'])} parts")

    # Step 4: Save outputs
    print(f"[4/5] Saving outputs to {output_dir}")
    ply_path = os.path.join(output_dir, "point_cloud", "iteration_0", "point_cloud.ply")
    os.makedirs(os.path.dirname(ply_path), exist_ok=True)
    save_gaussian_ply(gaussians, ply_path)
    print(f"  Saved PLY: {ply_path}")

    meta_path = os.path.join(output_dir, "cad_metadata.json")
    save_metadata(gaussians, meta_path)
    print(f"  Saved metadata: {meta_path}")

    # Step 5: Optional multi-view rendering
    if args.render_views > 0 and (ext == '.step' or ext == '.stp'):
        print(f"[5/5] Generating Blender multi-view render script ({args.render_views} views)")
        render_multiview(input_path, output_dir, n_views=args.render_views)
    else:
        print(f"[5/5] Skipping rendering (no --render_views or not a STEP file)")

    # Print summary
    print(f"\n{'='*60}")
    print(f"CAD → 3DGS Pipeline Complete")
    print(f"{'='*60}")
    print(f"  Input:  {input_path}")
    print(f"  Parts:  {len(gaussians['part_map'])}")
    print(f"  Gaussians:  {gaussians['num_gaussians']:,}")
    print(f"  Output: {output_dir}")
    print(f"  Part map:")
    for label, pid in gaussians['part_map'].items():
        count = int((gaussians['part_ids'] == pid).sum()) if hasattr(gaussians['part_ids'], 'numpy') else int((gaussians['part_ids'] == pid).sum())
        print(f"    [{pid}] {label}: {count:,} Gaussians")
    print(f"\n  Next steps:")
    print(f"    1. If rendering images: blender --background --python {os.path.join(output_dir, '_render_script.py')}")
    print(f"    2. Train 3DGS: python train.py -s {output_dir} --start_pointcloud {ply_path}")
    print(f"    3. Part-Aware experiments: use cad_metadata.json for part_id mapping")


def main():
    parser = argparse.ArgumentParser(
        description="CAD → 3DGS Pipeline: Convert parametric CAD to initialized Gaussians"
    )
    parser.add_argument("--input", type=str, required=True,
                        help="Path to CAD file (.step, .stp, .glb, .gltf)")
    parser.add_argument("--output", type=str, required=True,
                        help="Output directory for 3DGS data")
    parser.add_argument("--samples_per_m2", type=float, default=50000,
                        help="Surface sampling density (points per m²). Default: 50000")
    parser.add_argument("--normal_scale", type=float, default=0.01,
                        help="Gaussian scale in normal direction. Default: 0.01")
    parser.add_argument("--curvature_weight", type=float, default=2.0,
                        help="Curvature-aware sampling weight. Default: 2.0")
    parser.add_argument("--render_views", type=int, default=0,
                        help="Number of multi-view renders (0=skip, requires Blender + STEP). Default: 0")

    args = parser.parse_args()
    run_pipeline(args)


if __name__ == "__main__":
    main()
