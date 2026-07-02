---
# Venue Formats & Reviewer Preferences

## CVPR / ICCV / ECCV

| Dimension | Specification |
|-----------|--------------|
| Page limit | Main text 8 pages + references (no limit) |
| Format | IEEE double-column, LaTeX template cvpr.sty |
| Abstract | 150-250 words, no citations |
| Math style | Numbered equations, theorem/definition environments rare |
| Language | Active voice acceptable ("We propose...") |

Review tendency & weights:

| Dimension | Weight | Common Reviewer Comments |
|-----------|--------|-------------------------|
| Novelty | High | "What is the difference from XXX?" |
| Experimental sufficiency | High | "Missing XXX dataset/baseline" |
| Qualitative visualization | Medium-High | "Need more visual comparisons" |
| Writing clarity | Medium | "Motivation not clear enough" |
| Efficiency analysis | Medium | "Inference speed / memory usage?" |

- CVPR 2025: 13008 submissions, 2878 accepted (22.1% acceptance rate)
- Supplementary materials common

## SIGGRAPH / EG / PG

| Dimension | Specification |
|-----------|--------------|
| Page limit | Journal Track: ~8 pages; EG: 10-12 pages; PG: 8 pages |
| Format | ACM TOG format (SIGGRAPH); CGF (EG) |
| Abstract | 200-300 words |
| Math style | Formal definitions, lemma/theorem common |
| Language | More narrative, storytelling style |

Review tendency & weights:

| Dimension | Weight | Common Reviewer Comments |
|-----------|--------|-------------------------|
| Technical depth | High | "Is the mathematical derivation rigorous?" |
| Theoretical analysis | High | "Convergence/complexity analysis?" |
| Aesthetic quality | Medium-High | "Is visual quality significantly improved?" |
| Method generality | Medium | "Can it generalize to other scenarios?" |
| Implementation details | Medium | "Hyperparameter sensitivity?" |

- Visual quality and demo video important
- Method should include algorithm pseudocode

## NeurIPS / AAAI

| Dimension | NeurIPS | AAAI |
|-----------|---------|------|
| Deadline | Usually May | Usually August |
| Page limit | Main text 9 pages + appendix | Main text 7 pages + appendix |
| Review preference | High weight on theoretical contribution, prefers theoretical guarantees | Broad acceptance range, prefers clear technical contribution |

## TVCG / CGF / ACM TOG

| Journal | Impact Factor | Pages | Characteristics |
|---------|--------------|-------|-----------------|
| IEEE TVCG | ~5.2 | 12-18 pages, no strict limit | JCGRT format, covers visualization & graphics |
| CGF | ~2.5 | 10-15 pages | EG-associated journal, Wiley published |
| ACM TOG | ~6.7 (highest in graphics) | — | SIGGRAPH/EG paper journal extension |
| IEEE TPAMI | ~24 | 14 pages | Theory-heavy, extremely strict review |

## PhD Thesis Notes

- Each chapter must be self-contained, include chapter summary
- Innovation claims must be listed at end of introduction (numbered list)
- 100+ references, 60%+ from recent 3 years
- Experiments must cover at least 3 different scenes/datasets
- Format follows university template, cover page and abstract in both Chinese and English

## 2025-2026 Key Papers (Citation Reference)

| Venue | Method | ArXiv | Core Contribution |
|-------|--------|-------|-------------------|
| SIGGRAPH 2026 | Structure-Aware Densification | 2604.28016 | Frequency-aware anisotropic splitting, replacing vanilla 3DGS uniform split strategy |
| ICLR 2026 | FieryGS | 2605.00177 | Physics-integrated fire synthesis, fusing flame dynamics into Gaussian rendering |
| ICML 2026 Spotlight | SplAttN | 2605.01466 | Gaussian soft splatting for point cloud understanding |
| CVPR 2026 | GLMap | 2605.01736 | Gaussian-Language Map, language-guided Gaussian scene representation for navigation |
| CVPR 2026 Findings | Softmax-GS | 2604.27437 | Softmax competition rendering, alternative to α-compositing |
| SIGGRAPH 2026 | LeGS | 2605.00408 | RL-based density control, replacing heuristic clone/split/prune |
| CVPR 2026 | 2D-SuGaR | 2605.00569 | Surface-aware 2DGS with depth/normal priors, improved surface extraction |
| arXiv 2026 | GETA-3DGS | 2605.02086 | Joint pruning + quantization for 3DGS compression |
| arXiv 2026 | GOR-IS | 2605.00498 | Intrinsic decomposition editing for Gaussian scenes |
| CVPR 2026 | ReLaGS | — | Language-guided 3D reasoning with Gaussian representation, LLM-driven 3D scene understanding |
| CVPR 2026 Best Paper | D4RT | — | 4D dynamic reconstruction, temporal-consistent Gaussian representation |
| CVPR 2026 Best Student Paper | TRELLIS.2 | — | Structured 3D generation combining generative modeling with 3DGS |