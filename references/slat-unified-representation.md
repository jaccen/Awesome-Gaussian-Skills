# Structured latents: TRELLIS evidence and this project's prototypes

Reviewed 2026-10-21 against the [official TRELLIS project page](https://microsoft.github.io/TRELLIS/).

## What TRELLIS establishes

TRELLIS introduces Structured LATents (SLAT): local latents on a sparse 3D
structure, with visual features from rendered views, and learned decoders for
formats including radiance fields, 3D Gaussians and meshes. The official page
identifies the paper as **CVPR 2025 Highlight**, not SIGGRAPH 2025.

The source supports a model-specific learned representation and decoder family.
It does not establish that arbitrary CAD, meshes, NeRFs and Gaussian scenes can
all be losslessly encoded into a universal interchangeable latent space.

## What this repository implements or proposes

The MCP tools with `slat_` names use this repository's voxel-aggregation/editing
prototype. They are not the TRELLIS trained encoder or decoder, and a successful
unit test does not establish equivalence to the published model.

Before recommending a conversion, identify:

1. The actual source representation and parameters available.
2. The specific encoder/decoder implementation, trained weights and supported inputs.
3. Whether the proposed operation is implemented, illustrative pseudocode, or future work.
4. Geometry, appearance, topology, units and visibility information that can be lost.
5. A measurable round-trip or task-specific fidelity criterion on representative data.

Point/attribute pooling is not a general learned SLAT encoder. Averaging
quaternions or opacity requires a justified operation; opacity sums and arithmetic
rotation averages are not automatically valid representations. Negative voxel
coordinates require floor-based voxelization, not truncation toward zero.

## Conversion options

| Target | Options to investigate | Limit to state |
|---|---|---|
| Mesh → Gaussians | Surface sampling/initialization, optimization, or a specifically supported learned decoder | Initialization is not a guaranteed faithful renderer |
| Gaussians → mesh | Method-specific extraction, depth fusion, or a supported learned route | Surface/topology quality depends on the source and reconstruction assumptions |
| NeRF → Gaussians | Distillation, sampling/initialization and optimization, or a supported hybrid | New training and appearance approximation may be required |
| Image → assets | TRELLIS or another identified generative model | Generated geometry is not a measured reconstruction guarantee |
| Scene → parametric CAD | Explicit primitive fitting, constraint inference and human validation | TRELLIS's listed mesh/Gaussian decoders are not a B-rep CAD decoder |

The A/B/C groupings used by this toolkit are editorial comparison aids, not a
validated taxonomy or proof that different models share an interoperable latent.

## Fidelity and resource accounting

Measure end-to-end and intermediate errors with stated metrics, alignment,
reference data and conditions. Encoding and decoding errors are generally not
additive scalars. An expression such as `total error = encoding + decoding` needs
a defined metric and a derivation or bound; it is not a general SLAT theorem.

Report time, memory, weights, dependencies and any extra optimization. Prefer a
direct conversion when it is supported and simpler for the user's actual task.
