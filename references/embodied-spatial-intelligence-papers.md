# Embodied Intelligence & Spatial Intelligence: Core Papers (2024-2026)

> Survey date: 2026-05-19 | Focus: non-3DGS landmark methods in embodied AI and spatial intelligence
> Scope: Vision-Language-Action (VLA), world models for robotics, spatial reasoning, 3D understanding, sim-to-real, and physical AI foundations

## 1. Embodied Intelligence: Vision-Language-Action (VLA) Foundation Models

### 1.1 First-Generation VLA (End-to-End)

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **RT-1** | Google | ICRA 2023 | First transformer-based robot policy; internet-scale pretraining + robot fine-tuning |
| **RT-2** | Google DeepMind | 2023.07 | Coined "VLA" paradigm; fine-tune VLM on robot action trajectories; knowledge transfer from web to robot control |
| **RT-X** | Open X-Embodiment | 2024 | Cross-embodiment generalization across 22 robot types; 1M+ episodes |
| **OpenVLA** | Stanford/Google | 2024 | First open-source 7B VLA; fine-tune LLaVA on OXE dataset |
| **Octo** | UC Berkeley | 2024.03 | Open-source 93M VLA; modular architecture with separate action heads |
| **π0 (Pi-0)** | Physical Intelligence | 2024.12 | Flow-matching action decoder; 50-timestep joint-space control; trained on dexterous manipulation + mobile tasks |
| **π0.5 (Pi-0.5)** | Physical Intelligence | 2025.06 | Vision-Language-Action-Flow model; improved dexterity and generalization |
| **GR00T N1** | NVIDIA | GTC 2025.03 | Open-source general-purpose humanoid foundation model; System 1 (fast reaction) + System 2 (VLM planning) |
| **GR00T N1.5** | NVIDIA | 2025.06 | Improved generalization + efficiency; broader hardware support |
| **GR00T N1.6** | NVIDIA | 2025.12 | Precision + smoothness breakthrough |
| **GR00T N1.7** | NVIDIA | 2026 | Latest iteration, improved multimodal reasoning |
| **ReconVLA** | - | AAAI 2026 **Outstanding Paper** | First embodied AI paper to win Best Paper at top AI conference; reconstruction-guided VLA for spatial understanding |
| **Goal-VLA** | NUS (Shao Lin) | ICRA 2026 | VLM as world model for zero-shot robot manipulation; generates goals from language |
| **Pelican-Unified 1.0** | ByteDance | arXiv 2026.05 | First unified embodied foundation model: single VLM for understanding + reasoning + imagination + action; 64.7 on 8 VLM benchmarks, 66.03 on WorldArena (#1), 93.5 on RoboTwin |

### 1.2 Hierarchical VLA (VLM Planner + Policy Executor)

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **SayCan** | Google | 2022 | LLM grounds instructions in affordances; value functions filter infeasible actions |
| **VoxPoser** | Stanford | CoRL 2023 | LLM + VLM compose 3D value maps for zero-shot manipulation |
| **Progprompt** | - | ICRA 2023 | LLM generates modular robot programs from task descriptions |
| **Inner Monologue** | Stanford | CoRL 2022 | LLM integrates embodied feedback (replan after execution) |
| **Code as Policies** | Google | ICRA 2023 | LLM generates executable robot code instead of action tokens |
| **BISON** | U of Toronto | arXiv 2026.05 | Bilevel policies (HL symbolic + LL neural); solves long-horizon planning with 10K objects in <1 min |
| **PhysBrain 1.0** | Tsinghua | arXiv 2026.05 | Ego-centric video → physical commonsense QA → VLA adaptation; SOTA on ERQA, PhysBench, SimplerEnv |

### 1.3 Dexterous Manipulation

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **ALOHA 2** | Stanford | RSS 2024 | Low-cost bimanual teleoperation; 60Hz diffusion policy |
| **Diffusion Policy** | CMU | RSS 2023 | Denoising diffusion process for action generation; smoother trajectories than behavioral cloning |
| **FEAST** | - | RSS 2025 **Best Paper** | Flexible mealtime assistance with in-the-wild personalization |
| **RoboTwin Challenge** | Multi-institution | CVPR 2025 MEIS | Generalizable bimanual manipulation benchmark |
| **Tactile-based Multimodal Fusion** | Multi-institution | arXiv 2026.05 | Comprehensive survey of tactile + vision + language fusion; hierarchical taxonomy |

### 1.4 RoboCasa / Simulation Platforms

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **RoboCasa** | UT Austin | 2024 | Large-scale household robotics simulation; 100K+ episodes |
| **LIBERO** | Stanford | ICLR 2024 | Lifelong learning benchmark for robot manipulation |
| **Genie Sim 3.0 (GE-Sim 2.0)** | AGIBOT (Zhiyuan) | ICRA 2026 | Interactive/trainable/evaluable physics simulation engine; 1M+ trajectories, 217 tasks |
| **AGIBOT WORLD 2026** | AGIBOT | ICRA 2026 | Open dataset + competition; 27 countries, 526 teams |
| **WorldArena 2.0** | PKU/Stanford/Meta | arXiv 2026.05 | Expanded embodied world model benchmark: vision → visuotactile; policy eval → interactive RL env; simulator → real-robot |

## 2. Embodied World Models for Robotics

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **Dreamer V1-V3** | Danijar Hafner | 2020-2023 | Model-based RL in imagined world; V3 generalizes across 150+ tasks |
| **DreamerV3** | Hafner (DeepMind) | **Nature 2025** | Nature publication; MBRL surpasses specialist algorithms across diverse domains |
| **DayDreamer** | Hafner | 2022 | World model training on real robots |
| **DIAMOND** | - | 2024-2025 | Diffusion model as world model |
| **RISE (χ0-RL)** | OpenDriveLab (HKU) | ICRA 2026 | Compositional multi-view world model → RL imagination training → long-horizon success leap |
| **OrbiSim** | SJTU | arXiv 2026.05 | World models as fully differentiable physics engines; end-to-end differentiable simulation loop for policy optimization |
| **RoboFlow4D** | Multi-institution | arXiv 2026.05 | Lightweight flow world model; 3D flow prediction for real-time manipulation guidance |
| **SCAR** | - | arXiv 2026.05 | Self-supervised continuous action representation; unified latent action across embodiments for world modeling |
| **MTPR-WM** | Chengdu Humanoid Center | 2026.05 | China's first manifold-topology-preserving robot world model |
| **Genie 3** | Google DeepMind | 2025.08 | Real-time interactive world model; 24fps@720p; applied to robot simulation |
| **GS-World** | CUHK-Shenzhen | 2025.10 | Generative simulation + Engine-driven Sim2Real VLA; 3DGS as differentiable sim engine |
| **ManiGaussian** | - | ECCV 2024 | Dynamic GS world model for multi-task manipulation |
| **LingBot-World** | Ant LingBot | 2026.01 | Open-source SOTA embodied world model; full weights + inference code |
| **Learning Embodied Intelligence from Physical Simulators and World Models** | Survey | arXiv 2025.07 | Systematic survey comparing simulator capabilities + world model rendering |

## 3. Spatial Intelligence: 3D Understanding & Reasoning

### 3.1 Spatial Reasoning with VLMs/MLLMs

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **Spatial-MLLM** | Tsinghua | arXiv 2025.05 | Boosting MLLM spatial intelligence via video understanding |
| **NavSpace** | PKU (Dong Hao) | ICRA 2026 | Robot "spatial brain"; following spatial intelligence instructions for navigation |
| **SpatialScore** | SJTU | 2025.05 | Unified multimodal spatial understanding benchmark; reveals VLM spatial perception gaps |
| **SpatialMQA** | - | 2025.07 | Reveals MLLM spatial understanding weaknesses via multi-hop spatial QA |
| **Multimodal Spatial Reasoning in the Large Model Era** | HKUST(GZ)/SUSTech/SJTU | arXiv 2025.10 | Comprehensive survey + benchmarks for spatial reasoning with LLMs |
| **GeoWorld-VLM** | - | arXiv 2026.05 | Distills geometric structure from frozen video world models into VLMs; ~4% improvement on What'sUp + VSR |
| **3D Primitives are a Spatial Language for VLMs** | CMU | arXiv 2026.05 | Geometric primitives in code as spatial vocabulary; Code-CoT + S3-FT for spatial knowledge transfer |
| **ViSRA** | Multi-institution | arXiv 2026.05 | Training-free video-based spatial reasoning agent; 15.6% + 28.9% improvement on spatial benchmarks |
| **SpatialBabel + Code-CoT** | CMU | arXiv 2026.05 | 14 VLMs benchmarked on primitive-based 3D scene reconstruction; language-dependent F1 varies 5.7x |
| **SpatioRoute** | NTU Taiwan | CVPR 2026 Workshop | Dynamic prompt routing for zero-shot spatial reasoning; 5% accuracy gain over fixed prompts |
| **Hilbert-Geo** | - | **CVPR 2026** | First unified formal language framework for solid geometry; 77.3% on SolidFGeo2k (GPT-5: 54.2%) |
| **Distilling 3D Spatial Reasoning into Lightweight VLM** | KU Leuven | arXiv 2026.05 | CoT distillation for spatial reasoning; enables smaller VLMs to handle 3D tasks |
| **SenseNova-SI** | SenseTime | 2026 | Scaling spatial intelligence with multimodal foundation models |

### 3.2 3D Scene Understanding & Generation

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **HERMES** | HUST/HKU/MegvDrive | **ICCV 2025** | First unified 3D scene understanding + generation world model for autonomous driving |
| **HERMES++** | HUST et al. | 2026.05 | Integrates 3D scene understanding + future geometry prediction in unified framework |
| **IVGT** | Tsinghua | arXiv 2026.05 | Implicit Visual Geometry Transformer; continuous neural scene representation from pose-free multi-view images |
| **GTA** | USTC | arXiv 2026.05 | Geometry-Then-Appearance paradigm for image-to-3D world generation; cross-view consistency |
| **VGGT-Edit** | Multi-institution | arXiv 2026.05 | Feed-forward native 3D scene editing with residual field prediction |
| **InfiniBench** | U of Pittsburgh | **CVPR 2026** | Framework for generating diverse, extensible, fully customizable 3D spatial reasoning benchmarks |
| **SPIRAL** | - | **NeurIPS 2025** | Semantic-aware progressive LiDAR data generation; closed-loop inference for 3D generation evaluation |
| **Reconstructing 4D Spatial Intelligence: A Survey** | Multi-institution | arXiv 2025.07 | Survey on 4D spatial intelligence from visual observations |
| **RGB-only Active 3D Scene Graph Generation** | Multi-institution | arXiv 2026.05 | Active incremental 3D scene graph from RGB only; semantic-driven viewpoint selection |
| **HGC-Det** | HIT | arXiv 2026.05 | Hyperbolic geometry-guided cross-modal distillation for 3D object detection |

### 3.3 3D-LLM & Point Cloud Understanding

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **3DRS** | Multi-institution | 2025.11 | 3D foundation model boosting MLLM scene understanding |
| **PointGS** | - | **CVPR 2026** | 3DGS as unified intermediate representation for unsupervised 3D point cloud segmentation (SAM + 3DGS + contrastive learning) |

### 3.4 Panoramic / Omnidirectional Spatial Understanding

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **PanoWorld (360 Scene Understanding)** | SJTU | arXiv 2026.05 | Pano-native understanding; spherical spatial cross-attention; PanoSpace-Bench diagnostic benchmark |
| **PanoWorld (Video World Model)** | NEU | arXiv 2026.05 | Geometry-consistent panoramic video world modeling; depth + trajectory consistency losses |
| **PanoGeo** | NEU | arXiv 2026.05 | Unified geometry-aware panoramic video dataset with depth, trajectory, and prompt annotations |

## 4. Physical AI & Differentiable Simulation

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **PhysWorld** | - | 2025.09 | MPM simulator + GNN world model; learns physics from real video |
| **ParticleGS** | - | 2025 | MPM-driven Gaussian Splatting; physics simulation + neural rendering fusion |
| **LagrangianSplats** | - | 2025 | Lagrangian fluid reconstruction with 3DGS |
| **Real2Sim** | - | 2025 | Differentiable MPM physical awareness simulation |
| **EndoGSim** | - | 2025 | Cross-domain physical simulation |
| **OrbiSim** | SJTU | arXiv 2026.05 | Fully differentiable physics engine for embodied intelligence; differentiable contact modeling + gradient-based policy optimization |
| **Newton** | NVIDIA | CES 2026 | Real-time physics world model; response <0.01s |

## 5. Sim-to-Real & Data Pipeline

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **RoboSimGS** | WHU/Alibaba/Tsinghua/ZJU | 2025 | 3DGS appearance + Mesh interactive primitives + MLLM asset creation; Real2Sim2Real loop |
| **A Survey: Learning Embodied Intelligence from Physical Simulators and World Models** | Survey | arXiv 2025.07 | Systematic review of simulators + world models for embodied AI |
| **ReconVLA** | - | AAAI 2026 **Outstanding Paper** | Reconstruction-guided VLA; first embodied AI best paper at top AI venue |
| **NavSpace** | PKU | ICRA 2026 | Navigation benchmark following spatial intelligence instructions |
| **Confidence-Gated Robot Autonomy** | Multi-institution | ICRA 2026 Workshop | When does uncertainty actually help in robot autonomy decisions |

## 6. Safety, Alignment & Multi-Agent

| Method | Team | Venue/Date | Core Innovation |
|--------|------|------------|-----------------|
| **InfectBot** | Multi-institution | **IJCAI 2026** | Propagating unsafe actions in LLM-controlled multi-robot collaboration via single robot compromise |
| **Beyond the Cartesian Illusion** | Multi-institution | arXiv 2026.05 | Testing multi-modal Theory of Mind under perceptual bottlenecks in embodied spatial intelligence |
| **Consent Chain Degradation in Embodied Multi-Agent Systems** | Multi-institution | ICRA 2026 Workshop | Governance gap analysis for multi-robot delegation chains |

## 7. Key Surveys & Benchmarks

| Paper | Venue/Date | Scope |
|-------|------------|-------|
| **A Survey: Learning Embodied Intelligence from Physical Simulators and World Models** | arXiv 2025.07 | Simulator capabilities + world model comparison for embodied AI |
| **Understanding World or Predicting Future** | arXiv 2024 | 260+ references; world models across video gen + driving + robotics |
| **Simulating the Real World** | **TPAMI 2026** | Unified 2D/video/3D/4D generative model survey; 3000+ citations |
| **VLA Models in Robotic Manipulation: A Systematic Review** | 2026 | Systematic review of 80+ VLA models for manipulation |
| **Embodied World Models & Safety** | 2025.10 | World model + safety comprehensive survey |
| **Multimodal Spatial Reasoning in the Large Model Era** | arXiv 2025.10 | Survey + benchmarks for spatial reasoning |
| **Reconstructing 4D Spatial Intelligence** | arXiv 2025.07 | 4D spatial intelligence from visual observations |
| **Tactile-based Multimodal Fusion in Embodied Intelligence** | arXiv 2026.05 | Tactile + vision + language survey; hierarchical taxonomy |
| **I2-World: Generating Interactive Worlds via LLM-Guided Agents** | - | Agent-based 3D scene generation |
| **中国信通院: 具身智能发展报告(2025)** | 2026.01 | China policy + industry landscape; first government-level embodied AI inclusion |
| **人形机器人与具身智能标准体系(2026版)** | 2026.02 | China's first humanoid robot + embodied intelligence standards |

## 8. Industry Landscape (2025-2026)

### 8.1 VLA Model Families

| Family | Models | Key Features |
|--------|--------|-------------|
| **Google DeepMind** | RT-1/2/X, Gemini Robotics | Pioneer of VLA paradigm; large-scale internet pretraining |
| **Physical Intelligence** | π0/π0.5 | Flow-matching action decoder; state-of-the-art dexterity |
| **NVIDIA** | GR00T N1-N1.7 | Open-source humanoid foundation model; System 1+2 architecture |
| **Stanford** | OpenVLA, ALOHA 2 | Open-source VLA; low-cost bimanual teleoperation |
| **Berkeley** | Octo | Open-source lightweight VLA |
| **Figure AI** | Helix | Second-gen VLA |
| **ByteDance** | Pelican-Unified 1.0 | Unified understanding+reasoning+imagination+action |
| **Domestic (China)** | OpenMind FluxVLA, ByteDance Pelican, Xiaomi, Ant LingBot | Open-source VLA ecosystem |

### 8.2 World Model Companies

| Company | Product | Focus |
|---------|---------|-------|
| **World Labs** | Marble | Spatial intelligence; $12.3B total funding, $5B valuation |
| **AMI Labs** | (LeCun) | Non-generative world model (JEPA); $1.03B seed round |
| **AGIBOT (Zhiyuan)** | GE-Sim 2.0 | Robot simulation platform + world model; open-source |
| **NVIDIA** | Cosmos/Newton | World Foundation Model + physics engine |
| **Ant LingBot** | LingBot-World | Open-source embodied world model |
| **Kuaishou (Giga)** | GigaWorld-0/1 | Digital sandbox + data engine |

## 9. Cross-Reference with Existing Knowledge Base

> This section maps papers above to the existing Awesome-Gaussian-Skills knowledge base categories

| Direction | Papers in this doc | Existing 3DGS Papers | Overlap |
|-----------|-------------------|---------------------|---------|
| Embodied AI / Robotics | ReconVLA, Goal-VLA, Pelican-Unified, RoboFlow4D, SCAR, BISON | GaussianGrasper, GraspSplats, ManiGaussian, GSMem, RoboSplat, VR-Robo, GSDrive | ManiGaussian shared |
| World Models | DreamerV3, OrbiSim, RISE, MTPR-WM, LingBot-World | GWM, FlashWorld, RAD, DLWM, GS-World, Visionary, GS-ID, X-World, Spark2.0 | GS-World, X-World shared |
| Spatial Intelligence | HERMES, IVGT, GTA, Hilbert-Geo, GeoWorld-VLM, SpatialBabel | ULF-Loc (alpha-compositing feature bias) | ULF-Loc shared |
| Physical AI | OrbiSim, PhysWorld, ParticleGS, Newton | PhysGaussian, EndoGSim, LagrangianSplats, Real2Sim | PhysGaussian, EndoGSim, LagrangianSplats, Real2Sim shared |

## 10. Research Trend Observations (2026)

1. **Unified Embodied Models**: Pelican-Unified 1.0 demonstrates that understanding + reasoning + imagination + action can coexist in a single model without compromise. This "unification" paradigm is rapidly replacing the previous "expert ensemble" approach.

2. **World Models as Differentiable Physics Engines**: OrbiSim represents a paradigm shift from probabilistic pixel prediction to fully differentiable physics. The gradient-based policy optimization under sparse rewards is particularly notable for embodied intelligence.

3. **VLA Best Paper Signal**: ReconVLA winning AAAI 2026 Outstanding Paper marks embodied AI as a first-class citizen in top AI conferences. The reconstruction-guided spatial understanding approach signals that spatial intelligence is the bottleneck for VLA models.

4. **Geometric Primitives as Spatial Vocabulary**: The SpatialBabel/Code-CoT work reveals that VLMs can generate correct 3D primitive code yet fail at simple spatial questions. Geometric primitives in executable code serve as a powerful intermediate representation.

5. **Tactile Fusion**: The comprehensive survey on tactile-based multimodal fusion (arXiv 2026.05) indicates that contact-driven sensing is becoming essential for fine manipulation, complementing vision-language approaches.

6. **Benchmark Explosion**: SpatialScore, SpatialMQA, MMSI-Bench, PanoSpace-Bench, InfiniBench, NavSpace — the rapid emergence of spatial intelligence benchmarks reveals that spatial reasoning is now recognized as a distinct evaluation dimension.

7. **Safety in Multi-Robot Systems**: InfectBot (IJCAI 2026) demonstrates dangerous attack propagation in LLM-controlled multi-robot collaboration, highlighting the urgent need for safety alignment in embodied multi-agent systems.
