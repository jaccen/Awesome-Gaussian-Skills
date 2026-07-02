---
# Related Work & Methodology Templates

## Related Work

Organizing principle: Group by theme, NOT by paper enumeration.

Each theme paragraph structure:
1. Common approaches for this theme (2-3 sentences)
2. Representative works with citations (explain what each paper did)
3. **Key**: How they differ from this paper (last 1-2 sentences)

Common groupings for 3D vision papers:
- Neural radiance fields & novel view synthesis (NeRF/3DGS and variants)
- Point cloud processing & 3D understanding (segmentation/registration/detection)
- 3D generation & editing (text/image-to-3D, shape editing)
- CAD modeling & reverse engineering (parametric modeling, feature extraction)
- 3D scene understanding & SLAM (semantic reconstruction, pose estimation)
- High-frequency/boundary representation (if signed methods, frequency-domain methods)
- Compression & acceleration

English template:
```
Group by theme (not by paper):
- Section: "3D Gaussian Splatting and Variants"
- Section: "Neural Implicit Representations"
- Section: "[Your specific sub-area]"
Each section: Narrative flow with citations, not catalog.
End each section with: how existing work differs from yours.
```

## Methodology

Structure: Overall pipeline figure → Component-by-component exposition.

- Start with pipeline/architecture figure (Figure 1), referenced by subsequent modules
- Every new symbol must be defined at first occurrence
- Equation numbering continuous, reference format: Eq.(1), Eq.(2)
- Each module ends with 1-sentence summary of its role

English template:
```
3.1 Preliminary / Notation
3.2 [Core Component 1]
3.3 [Core Component 2]
3.4 Training / Optimization
3.5 [Implementation Details] (if space)
```

### Methodology Writing Rules

- Present tense for method description, past tense for experiments
- Every design choice needs justification (why this way, not alternatives)
- Loss functions: state formula + intuition + hyperparameter defaults
- Network architecture: layers, channels, activation — or reference implementation section