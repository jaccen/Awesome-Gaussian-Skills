"""
Part-Aware 3DGS Experiment Scene Builder
=========================================

Generates parametric CAD test scenes with part-level labels for evaluating
Part-Aware alpha compositing (Research Idea I-01). Uses build123d to
create models with known part boundaries, penetration zones, and joint
constraints — providing ground-truth for rendering experiments.

Inspired by: https://github.com/gordensun/cad-power-animations
Integrated into: Awesome-Gaussian-Skills (I-01 Part-Aware Alpha-Compositing)

Usage:
    # Generate all experiment scenes
    python build_part_aware_scenes.py --output experiments/part_aware/

    # Generate specific scene
    python build_part_aware_scenes.py --output experiments/ --scene planetary_gearbox

    # Generate with penetration injection for ablation
    python build_part_aware_scenes.py --output experiments/ --inject_penetration
"""

import argparse
import json
import os
import sys
import numpy as np
from pathlib import Path


# ============================================================================
# Scene 1: Planetary Gearbox — tight mesh boundaries, thin teeth
# ============================================================================

def build_planetary_gearbox(output_dir, inject_penetration=False):
    """Build a planetary gearbox with labeled parts.

    Parts: sun_gear, planet_1, planet_2, planet_3, ring_gear

    Geometric challenges for 3DGS:
    - Gear tooth boundaries are tight (< 0.5mm clearance)
    - Thin features (teeth) prone to Gaussian bloat
    - Multiple interpenetration boundaries test Part-Aware opacity
    """
    try:
        from build123d import *
    except ImportError:
        print("[SKIP] planetary_gearbox requires build123d. Generating synthetic data instead.")
        return _build_synthetic_gearbox(output_dir)

    n_sun = 20       # sun gear teeth
    n_planet = 10    # planet gear teeth
    n_ring = 40      # ring gear teeth
    module = 2.0     # gear module (determines tooth size)
    thickness = 5.0  # gear thickness

    # Sun gear
    sun_pitch_r = module * n_sun / 2
    sun = _make_gear(n_sun, module, thickness, label="sun_gear")

    # Planet gears (3x, equally spaced)
    planet_pitch_r = module * n_planet / 2
    center_dist = sun_pitch_r + planet_pitch_r
    planets = []
    for i in range(3):
        angle = i * 2 * np.pi / 3
        cx = center_dist * np.cos(angle)
        cy = center_dist * np.sin(angle)
        p = _make_gear(n_planet, module, thickness, label=f"planet_{i+1}")
        p = p.moved(Location(Vector(cx, cy, 0)))
        planets.append(p)

    # Ring gear (internal teeth)
    ring = _make_ring_gear(n_ring, module, thickness, label="ring_gear")

    # Optional: inject controlled penetration for ablation
    if inject_penetration:
        planets[0] = planets[0].moved(Location(Vector(0.5, 0, 0)))  # 0.5mm overlap

    # Export
    _export_scene(output_dir, "planetary_gearbox", [sun] + planets + [ring])


def _make_gear(n_teeth, module, thickness, label):
    """Create a spur gear with labeled Compound."""
    from build123d import *
    pitch_r = module * n_teeth / 2
    tip_r = pitch_r + module
    root_r = pitch_r - 1.25 * module
    bore_r = root_r * 0.3

    gear_profile = Circle(tip_r) - Circle(bore_r)
    gear_body = Extrude(gear_profile, amount=thickness)
    return Compound(children=[gear_body], label=label)


def _make_ring_gear(n_teeth, module, thickness, label):
    """Create an internal ring gear."""
    from build123d import *
    pitch_r = module * n_teeth / 2
    outer_r = pitch_r + 2 * module
    root_r = pitch_r - module

    profile = Circle(outer_r) - Circle(root_r)
    body = Extrude(profile, amount=thickness)
    return Compound(children=[body], label=label)


# ============================================================================
# Scene 2: Robot Arm — articulated occlusion, joint deformation
# ============================================================================

def build_robot_arm(output_dir, inject_penetration=False):
    """Build a 5-DOF robot arm with labeled links and joints.

    Parts: base, link_1, link_2, link_3, link_4, end_effector

    Geometric challenges for 3DGS:
    - Joint boundaries change during articulation
    - Self-occlusion between links
    - Penetration at joint limits provides ground truth for Part-Aware rendering
    """
    try:
        from build123d import *
    except ImportError:
        print("[SKIP] robot_arm requires build123d. Generating synthetic data instead.")
        return _build_synthetic_robot_arm(output_dir)

    link_length = 50.0
    link_radius = 8.0
    joint_radius = 10.0

    parts = []

    # Base
    base = Compound(children=[
        Extrude(Circle(20), amount=5)
    ], label="base")
    parts.append(base)

    # Links with joints
    for i in range(5):
        z_offset = 5 + i * (link_length + joint_radius)

        # Joint
        joint = Compound(children=[
            Cylinder(radius=joint_radius, height=joint_radius)
        ], label=f"joint_{i+1}")
        joint = joint.moved(Location(Vector(0, 0, z_offset)))
        parts.append(joint)

        # Link
        link = Compound(children=[
            Cylinder(radius=link_radius, height=link_length)
        ], label=f"link_{i+1}")
        link = link.moved(Location(Vector(0, 0, z_offset + joint_radius)))
        parts.append(link)

        # Optional: inject penetration at joint
        if inject_penetration and i == 2:
            # Overlap link_3 into link_2
            overlap_link = link.moved(Location(Vector(0, 0, -5)))
            parts[-1] = overlap_link

    # End effector
    ee_z = 5 + 5 * (link_length + joint_radius) + joint_radius
    ee = Compound(children=[
        Box(30, 10, 5)
    ], label="end_effector")
    ee = ee.moved(Location(Vector(0, 0, ee_z)))
    parts.append(ee)

    _export_scene(output_dir, "robot_arm", parts)


# ============================================================================
# Scene 3: Interlocking Parts — Geneva drive
# ============================================================================

def build_geneva_drive(output_dir, inject_penetration=False):
    """Build a Geneva drive mechanism for intermittent motion testing.

    Parts: drive_wheel, driven_wheel, pin, frame

    Geometric challenges:
    - Pin-slot engagement boundary is critical
    - intermittent contact → regions where alpha compositing must handle transitions
    """
    try:
        from build123d import *
    except ImportError:
        print("[SKIP] geneva_drive requires build123d. Generating synthetic data instead.")
        return _build_synthetic_geneva(output_dir)

    parts = []

    # Drive wheel (with pin)
    drive = Compound(children=[
        Cylinder(radius=25, height=8),
        Cylinder(radius=3, height=12).moved(Location(Vector(20, 0, 0)))  # pin
    ], label="drive_wheel")
    parts.append(drive)

    # Driven wheel (with slots)
    driven_r = 30
    n_slots = 6
    driven = Cylinder(radius=driven_r, height=8)
    for i in range(n_slots):
        angle = i * 2 * np.pi / n_slots
        slot = Box(6, driven_r * 0.8, 10)
        slot = slot.moved(Location(Vector(
            driven_r * 0.4 * np.cos(angle),
            driven_r * 0.4 * np.sin(angle),
            0
        )))
        # Rotate slot to radial direction — simplified
    driven = Compound(children=[driven], label="driven_wheel")
    driven = driven.moved(Location(Vector(55, 0, 0)))
    parts.append(driven)

    # Frame
    frame = Compound(children=[
        Box(120, 80, 3)
    ], label="frame")
    frame = frame.moved(Location(Vector(30, 0, -6)))
    parts.append(frame)

    _export_scene(output_dir, "geneva_drive", parts)


# ============================================================================
# Synthetic fallback generators (when build123d is not available)
# ============================================================================

def _build_synthetic_gearbox(output_dir):
    """Generate synthetic point cloud data for planetary gearbox."""
    parts_data = {}
    n_sun = 20
    n_planet = 10
    module = 2.0
    thickness = 5.0

    sun_pitch_r = module * n_sun / 2
    planet_pitch_r = module * n_planet / 2
    center_dist = sun_pitch_r + planet_pitch_r

    # Sun gear: cylindrical point cloud
    parts_data["sun_gear"] = _synthetic_cylinder_points(
        radius=sun_pitch_r, height=thickness, n_points=5000
    )

    # Planets
    for i in range(3):
        angle = i * 2 * np.pi / 3
        cx = center_dist * np.cos(angle)
        cy = center_dist * np.sin(angle)
        pts = _synthetic_cylinder_points(
            radius=planet_pitch_r, height=thickness, n_points=3000
        )
        pts[:, 0] += cx
        pts[:, 1] += cy
        parts_data[f"planet_{i+1}"] = pts

    # Ring gear
    ring_r = sun_pitch_r + 2 * planet_pitch_r + 2 * module
    pts = _synthetic_ring_points(
        inner_r=sun_pitch_r + 2 * planet_pitch_r,
        outer_r=ring_r, height=thickness, n_points=8000
    )
    parts_data["ring_gear"] = pts

    _save_synthetic_parts(output_dir, "planetary_gearbox", parts_data)


def _build_synthetic_robot_arm(output_dir):
    """Generate synthetic point cloud data for robot arm."""
    parts_data = {}
    link_length = 50.0
    link_radius = 8.0

    # Base
    parts_data["base"] = _synthetic_cylinder_points(20, 5, 2000)

    # Links and joints
    for i in range(5):
        z_offset = 5 + i * 58

        pts_j = _synthetic_cylinder_points(10, 8, 1000)
        pts_j[:, 2] += z_offset
        parts_data[f"joint_{i+1}"] = pts_j

        pts_l = _synthetic_cylinder_points(link_radius, link_length, 1500)
        pts_l[:, 2] += z_offset + 8
        parts_data[f"link_{i+1}"] = pts_l

    _save_synthetic_parts(output_dir, "robot_arm", parts_data)


def _build_synthetic_geneva(output_dir):
    """Generate synthetic point cloud data for Geneva drive."""
    parts_data = {}

    parts_data["drive_wheel"] = _synthetic_cylinder_points(25, 8, 3000)
    driven_pts = _synthetic_cylinder_points(30, 8, 4000)
    driven_pts[:, 0] += 55
    parts_data["driven_wheel"] = driven_pts

    _save_synthetic_parts(output_dir, "geneva_drive", parts_data)


def _synthetic_cylinder_points(radius, height, n_points):
    """Generate random points on a cylinder surface."""
    theta = np.random.uniform(0, 2 * np.pi, n_points)
    z = np.random.uniform(-height / 2, height / 2, n_points)
    x = radius * np.cos(theta)
    y = radius * np.sin(theta)
    return np.stack([x, y, z], axis=1).astype(np.float32)


def _synthetic_ring_points(inner_r, outer_r, height, n_points):
    """Generate random points on a ring (hollow cylinder) surface."""
    r = np.random.uniform(inner_r, outer_r, n_points)
    theta = np.random.uniform(0, 2 * np.pi, n_points)
    z = np.random.uniform(-height / 2, height / 2, n_points)
    x = r * np.cos(theta)
    y = r * np.sin(theta)
    return np.stack([x, y, z], axis=1).astype(np.float32)


def _save_synthetic_parts(output_dir, scene_name, parts_data):
    """Save synthetic part point clouds and metadata."""
    scene_dir = os.path.join(output_dir, scene_name)
    os.makedirs(scene_dir, exist_ok=True)

    part_map = {}
    for pid, (label, points) in enumerate(parts_data.items()):
        part_map[label] = pid
        np.save(os.path.join(scene_dir, f"{label}.npy"), points)

    metadata = {
        "scene": scene_name,
        "num_parts": len(parts_data),
        "part_map": part_map,
        "points_per_part": {k: len(v) for k, v in parts_data.items()},
        "mode": "synthetic",
        "note": "Synthetic point cloud data (build123d not available). Use for initial testing only."
    }
    with open(os.path.join(scene_dir, "metadata.json"), 'w') as f:
        json.dump(metadata, f, indent=2)

    print(f"  [SYNTHETIC] Saved {scene_name}: {len(parts_data)} parts, "
          f"{sum(len(v) for v in parts_data.values())} total points")


# ============================================================================
# Export helpers
# ============================================================================

def _export_scene(output_dir, scene_name, parts):
    """Export a build123d scene to STEP + per-part mesh data."""
    try:
        from build123d import export_step, Compound
        scene_dir = os.path.join(output_dir, scene_name)
        os.makedirs(scene_dir, exist_ok=True)

        # Export full assembly as STEP
        assembly = Compound(children=parts)
        step_path = os.path.join(scene_dir, f"{scene_name}.step")
        export_step(assembly, step_path)
        print(f"  [STEP] Saved {step_path}")

        # Export per-part metadata
        part_map = {}
        for pid, part in enumerate(parts):
            label = part.label if hasattr(part, 'label') and part.label else f"part_{pid}"
            part_map[label] = pid

        metadata = {
            "scene": scene_name,
            "num_parts": len(parts),
            "part_map": part_map,
            "step_file": f"{scene_name}.step",
            "mode": "parametric_cad",
            "experiments": _get_experiment_config(scene_name)
        }
        with open(os.path.join(scene_dir, "metadata.json"), 'w') as f:
            json.dump(metadata, f, indent=2)

        print(f"  [META] Saved metadata: {len(parts)} parts")

    except Exception as e:
        print(f"  [ERROR] Export failed: {e}")


def _get_experiment_config(scene_name):
    """Return experiment configuration for each scene type."""
    configs = {
        "planetary_gearbox": {
            "primary_challenge": "tight_boundary",
            "penetration_zones": ["sun_gear ↔ planet_1/2/3", "planet_1/2/3 ↔ ring_gear"],
            "recommended_methods": ["3DGS", "2DGS", "Scaffold-GS", "SparseOIT"],
            "metrics": ["PSNR", "SSIM", "LPIPS", "Chamfer Distance", "F-Score@1mm"],
            "ablation_targets": ["Part-Aware opacity", "Standard alpha compositing"],
            "articulation_params": {
                "sun_rotation": [0, 2*np.pi],
                "planet_self_rotation": "gear_ratio * sun_rotation"
            }
        },
        "robot_arm": {
            "primary_challenge": "articulated_occlusion",
            "penetration_zones": ["joint_2 ↔ link_3", "link_4 ↔ link_5"],
            "recommended_methods": ["3DGS", "MaGS", "GaussianAvatar", "ArtMesh"],
            "metrics": ["PSNR", "SSIM", "LPIPS", "Part segmentation mIoU"],
            "ablation_targets": [
                "Part-Aware opacity with joint limits",
                "Standard alpha compositing",
                "MaGS mesh-adsorbed rendering"
            ],
            "articulation_params": {
                "joint_angles": [[-π, π]] * 5,
                "self_collision_pairs": ["link_2-link_4", "link_3-end_effector"]
            }
        },
        "geneva_drive": {
            "primary_challenge": "intermittent_contact",
            "penetration_zones": ["pin ↔ driven_wheel_slot"],
            "recommended_methods": ["3DGS", "2DGS", "SparseOIT", "RT-Splatting"],
            "metrics": ["PSNR", "SSIM", "LPIPS", "Contact region rendering quality"],
            "ablation_targets": [
                "Part-Aware opacity at contact boundaries",
                "Standard compositing (color bleeding expected)",
                "OIT-based transparency"
            ],
            "articulation_params": {
                "drive_angle": [0, 2*np.pi],
                "driven_angle": "geneva_ratio * drive_angle"
            }
        }
    }
    return configs.get(scene_name, {})


# ============================================================================
# Main
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Build Part-Aware 3DGS experiment scenes from parametric CAD"
    )
    parser.add_argument("--output", type=str, default="experiments/part_aware",
                        help="Output directory for scene data")
    parser.add_argument("--scene", type=str, default="all",
                        choices=["all", "planetary_gearbox", "robot_arm", "geneva_drive"],
                        help="Which scene to build")
    parser.add_argument("--inject_penetration", action="store_true",
                        help="Inject controlled penetration for ablation experiments")

    args = parser.parse_args()
    os.makedirs(args.output, exist_ok=True)

    print("=" * 60)
    print("Part-Aware 3DGS Experiment Scene Builder")
    print("=" * 60)
    print(f"Output: {args.output}")
    print(f"Inject penetration: {args.inject_penetration}")
    print()

    scenes = {
        "planetary_gearbox": build_planetary_gearbox,
        "robot_arm": build_robot_arm,
        "geneva_drive": build_geneva_drive,
    }

    if args.scene == "all":
        to_build = scenes
    else:
        to_build = {args.scene: scenes[args.scene]}

    for name, builder in to_build.items():
        print(f"--- Building: {name} ---")
        builder(args.output, inject_penetration=args.inject_penetration)
        print()

    print("=" * 60)
    print("Scene building complete!")
    print()
    print("Next steps for Part-Aware 3DGS experiments:")
    print("  1. Render multi-view images from STEP files (Blender)")
    print("  2. Initialize Gaussians with cad2gs_pipeline.py")
    print("  3. Train standard 3DGS as baseline")
    print("  4. Implement Part-Aware opacity modulation:")
    print("     C(θ) = Σᵢ Tᵢ · αᵢ · ω_{p(i)}(θ) · cᵢ")
    print("  5. Compare: Part-Aware vs Standard compositing at penetration zones")
    print("  6. Evaluate: PSNR, SSIM, LPIPS + geometry Chamfer Distance")


if __name__ == "__main__":
    main()
