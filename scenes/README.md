

# 3DGS Scene Files

Place your `.ply` or `.splat` files here to use them in SplatVerse Studio.

## Supported Formats

| Format | Extension | Description |
|--------|-----------|-------------|
| PLY | `.ply` | Standard 3DGS binary format (SH DC + 45 SH coeffs + opacity + scale + rotation) |
| SPLAT | `.splat` | Compressed Gaussian splat format |
| SPZ | `.spz` | Compressed 3DGS format |
| KSPLAT | `.ksplat` | Kepler splat format |

## Current Scene Files

| File | Size | Gaussians | Source |
|------|------|-----------|--------|
| `baseline_train_7k.ply` | 174.72 MB | 738,750 | Real 3DGS trained output (iteration 7000) |
| `test-scene.ply` | 770 B | 5 (synthetic) | Minimal test file for validation |

## How to Get Scene Files

1. **Train your own**: Use [3D Gaussian Splatting](https://github.com/graphdeco-inria/gaussian-splatting) to reconstruct scenes from photos
2. **Download samples**: From [PolyCAM](https://poly.cam/), [Luma AI](https://lumalabs.ai/), or [Hugging Face 3DGS models](https://huggingface.co/models?search=3dgs)
3. **Use existing projects**: Convert NeRF datasets using [nerfstudio](https://github.com/nerfstudio-project/nerfstudio) pipelines

## PLY Parsing Capabilities

The MCP Server now supports **real 3DGS PLY binary parsing**:

- Reads PLY header (format, vertex count, property layout)
- Parses binary vertex data: position, SH DC coefficients (color), opacity (sigmoid), scale (exp), rotation (quaternion)
- Large files (>200K Gaussians) are automatically sampled for in-memory operations
- The full file path is preserved for browser renderer to load the complete scene

## Usage in SplatVerse Studio

- **MCP Tools**: Use `import_scene` tool with `source: "scenes/your-file.ply"` and `format: "ply"`
- **Render Studio**: Select scene file from the dropdown in the "Scene File" section
- **API**: `POST /api/render/direct` with `sceneFile: "scenes/your-file.ply"`

## File Size Guidelines

- **Web deployment**: Aim for < 50MB per scene (use `prune_by_importance` tool to reduce)
- **Preview rendering**: 10K-50K Gaussians recommended
- **Production**: 100K-1M Gaussians typic