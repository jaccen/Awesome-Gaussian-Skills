# World Models & Spatial Intelligence: Research Landscape, Commercial Deployment & Research Directions

> Survey date: 2026-05-18 | Updated with two-round deep research

## 1. Concept Definition & Distinction

### 1.1 World Model

World Model指AI系统内部构建对外部环境的内部模拟，使其能够预测环境动态、预判行动后果并自主决策。2026年该术语存在"概念混战"——不同流派对World Model的定义差异显著：

| 流派 | 核心定义 | 代表 |
|------|---------|------|
| 视频生成派 | 生成逼真视频 = 模拟世界 | Sora (OpenAI), Genie 3 (DeepMind), HappyOyster (阿里) |
| 强化学习派 | 内部环境模型用于策略训练 | Dreamer系列 (Hafner/DeepMind), DayDreamer |
| 联合嵌入预测派 | 在抽象表示空间做预测而非像素空间 | JEPA/V-JEPA 2 (LeCun/Meta), AMI Labs |
| 空间智能派 | 理解和生成3D空间结构 | World Labs/Marble (李飞飞), HY-World 2.0 (腾讯) |
| 自动驾驶仿真派 | 物理一致的未来状态预测用于仿真 | Tesla Neural World Simulator, GAIA (Wayve) |

**关键共识（2026学界）**：视频生成 ≠ 世界模型。"能画出视频"不代表"理解世界"——Sora 1.0后的核心反思。物理一致性、因果推理、行动可控性是World Model区别于纯视频生成的根本。

**概念分化的根源**：MoE Capital 2026年深度分析指出，世界模型背后有两条长达数十年、彼此独立演进的研究脉络——强化学习社区从1990年代探索的"内部环境模型"(如Dyna架构)和视频生成社区的"像素级世界模拟"。两条线索在2024-2025年间才真正交汇，产生当前混乱局面。

### 1.2 Spatial Intelligence

Spatial Intelligence指AI系统通过理解三维空间和时间，实现感知、推理和行动的能力。源自Howard Gardner 1983年多元智能理论，2024年经李飞飞重新定义后成为AI领域核心赛道。

李飞飞定义：空间智能不仅是传统的物体识别(Object Recognition)，而是指一种能够在三维空间中进行推理(Reasoning)、理解(Understanding)、移动(Moving)和交互(Interacting)的深层能力。推理是关键环节。

**与World Model的关系**：
- Spatial Intelligence是World Model的"关键拼图"——World Model需要空间理解作为基础
- 李飞飞观点：空间智能是"AI下一个十年的关键赛道"；LLM的知识缺乏"现实根基"
- LeCun观点：World Model需要JEPA架构实现预测能力，空间理解是其子集
- 两者在三维重建/3DGS领域高度交叉：3DGS既是空间智能的表示工具，也是World Model的场景构建器

### 1.3 Physical AI

2026年新兴概念（NVIDIA黄仁勋CES 2026重点阐述），指AI从"赛博空间"走向"物理世界"的范式转变。World Model + Spatial Intelligence + 具身智能共同构成Physical AI的技术三角。

NVIDIA对Physical AI的技术定位：
- Newton物理引擎：实时计算物理世界模型，响应时间<0.01秒
- Cosmos基础模型平台：1000亿参数，推理延迟1ms，支持多模态物理世界理解
- GPU+LPU混合架构：算力效率提升100倍，成本降低90%

## 2. Research Landscape: Key Methods & Papers

### 2.1 World Model核心方法

#### 2.1.1 视频生成路线

| 方法 | 团队 | 核心创新 | 状态 |
|------|------|---------|------|
| **Sora** | OpenAI | 视频生成作为世界模拟器；长时序扩散模型 | 2024发布→2026关闭团队转向机器人仿真；反面教训：单位成本高/需求非刚性/未嵌入商业闭环 |
| **Genie 3** | Google DeepMind | 首个支持实时交互的世界模型；20-24fps@720p；持续数分钟一致性 | 2025.08预发布→2026.01开放内测（AI Ultra订阅用户）；内测12h超50万人申请 |
| **HappyOyster** | 阿里ATH | 原生多模态+长时序建模；漫游模式(1min连续实时位移)+导演模式(3min+480/720p) | 2026.04发布 |
| **Cosmos** | NVIDIA | World Foundation Model；3D通才模型；从"生成画面"升级为"生成可行动的3D世界" | 2025.01 CES发布→2026 GTC推出Cosmos Predict-2(2B/14B) |
| **GigaWorld-0/1** | 极佳视界 (Giga) | 物理世界"数字沙盒"+"数据引擎"；gigaworld-0于2025.12发布开源 | 2025.12 / 2026.03 |
| **Runway Gen-3C** | Runway | 结构引导的世界一致性视频生成 | 2026发布 |
| **Muse Spark** | Meta | 视频世界模型 | 2026.04发布 |
| **X-World** | 小鹏汽车 | 基于Video Diffusion的可控多视角生成式驾驶世界模型；已投入闭环仿真/在线RL/数据生成生产环节 | 2026.04技术报告发布 |

#### 2.1.2 联合嵌入预测 (JEPA) 路线

| 方法 | 团队 | 核心创新 | 状态 |
|------|------|---------|------|
| **JEPA** | LeCun (Meta) | 联合嵌入预测架构：不在像素空间而在抽象表示空间做预测 | 2022理论→持续演进 |
| **V-JEPA 2** | Meta FAIR | 100万+小时视频自监督；世界模型定义：环境理解+零样本规划+机器人控制 | 2025.06发布开源 |
| **VL-JEPA** | LeCun团队 | 视觉-语言联合嵌入预测；抛弃next-token预测，非生成照样SOTA | 2026发表 |
| **LeWorldModel** | Mila/NYU/三星SAIL/布朗 | 端到端JEPA世界模型走向小规模可复现；稳定训练 | 2026.03 arXiv |
| **AMI Labs** (公司) | LeCun + 谢赛宁 | 押注非生成世界模型路线 | 10.3亿美元种子轮，估值35亿美元(2026.03) |

#### 2.1.3 强化学习/基于模型的RL路线

| 方法 | 团队 | 核心创新 | 状态 |
|------|------|---------|------|
| **World Models** | Ha & Schmidhuber | 开山之作：生成式世界模型在"梦境"中训练策略 | 2018 |
| **Dreamer V1-V4** | Danijar Hafner (DeepMind→创业) | 在世界模型里做RL；DreamerV3在Minecraft挖钻石；Nature 2025 | 持续演进→商业化 |
| **DayDreamer** | Hafner | 在真实机器人上用世界模型训练 | 2022 |
| **DIAMOND** | | 扩散模型作为世界模型 | 2024-2025 |
| **RISE (χ0-RL)** | OpenDriveLab (港大李弘扬) | 组合式多视角世界模型→RL想象训练→无需大规模真机交互→长程任务成功率跨越式提升 | ICRA 2026 |

#### 2.1.4 机器人世界模型

| 方法 | 团队 | 核心创新 | 状态 |
|------|------|---------|------|
| **MTPR-WM** | 成都人形机器人创新中心 | 中国首个流形拓扑保持机器人世界模型；从"像素感知"到"空间直觉" | 2026.05发布 |
| **GS-World** | 港中深 | 世界模型生成式仿真 + Engine-driven Sim2Real VLA统一；3DGS作为可微仿真引擎 | 2025.10 arXiv |
| **RoboCasa** | | 大规模机器人仿真世界 | 2024 |
| **Genie Sim 3.0 (GE-Sim 2.0)** | 智元机器人 | 机器人仿真平台+世界模型赛道；可交互/可训练/可评估的物理仿真引擎 | 2026 |
| **ManiGaussian** | | 动态GS世界模型驱动多任务操作 | ECCV 2024 (已有3DGS交叉) |

#### 2.1.5 自动驾驶世界模型

| 方法 | 团队 | 核心创新 | 状态 |
|------|------|---------|------|
| **Neural World Simulator** | Tesla | 纯视觉+端到端；BEV/占用网格/轨迹预测 | FSD量产中 |
| **GAIA-1/2/3** | Wayve | 生成式自动驾驶世界模型；GAIA-2可控多视角生成；GAIA-3新轨迹+天气转换 | 2023/2025/2026迭代 |
| **SparseWorld / SparseWorld-TC** | 理想汽车 + 浙大 | 稀疏查询4D占用预测；7x提速+40%精度提升(AAAI 2026)；含轨迹条件变体 | AAAI 2026 |
| **OccWorld** | | 基于占用预测的世界模型 | CVPR 2024 |
| **Epona** | 地平线 | 自回归扩散式端到端驾驶世界模型；分钟级长视频生成 | ICCV 2025 |
| **DOV** | | 4D占用世界模型 | CVPR 2026 |
| **I²-World** | | 高效4D占用预测；内存仅需2.9GB | ICCV 2025 |
| **DriveVLA-W0** | 中科院自动化所 | 世界建模预测未来图像提供自监督→VLA增强；NAVSIM 93.0 PDMS | 2025 |
| **VLA-World** | 上海交大+华为中研 | VLA世界模型统一框架 | 2026.04 |
| **Magenta** | Momenta | 量产端到端大模型；世界模型用于环境演化预测+离线仿真训练 | 量产应用中 |
| **X-World** | 小鹏汽车 | Video Diffusion可控多视角驾驶世界模型 | 2026.04技术报告 |

### 2.2 空间智能核心方法

| 方法 | 团队 | 会议/来源 | 核心创新 |
|------|------|----------|---------|
| **Marble** | World Labs (李飞飞) | 2026 | 单张图像→可交互3D空间；空间智能商业化产品；免费增值+付费订阅模式 |
| **OpenSpatial** | 港大+微软亚研 | arXiv 2504.07296 | "空间理解流水线"；AI真正看懂三维世界 |
| **Spatial-MLLM** | 清华大学 | 2025.05 arXiv | 视频空间理解模型；从2D视频理解3D空间布局 |
| **NavSpace** | 北大董豪课题组 | ICRA 2026 | 机器人"空间大脑"；空间智能指令导航 |
| **SpatialGenEval** | 阿里高德 | ICLR 2026 | 文生图空间智能评测基准；揭示文生图模型空间推理短板 |
| **Spatial-SSRL** | 上海AI Lab+上交+港中文 | 2025.12 | 自监督空间推理学习；提升LVLM空间理解 |
| **MMSI-Bench** | 上海AI Lab | 2025.06 | 多图像空间智能基准；揭示AI与人类空间认知的巨大差距 |
| **VRU (视点旋转理解)** | UIUC | ACL 2026 | 无视觉输入下语言模型的空间认知测试；反直觉发现 |
| **UrbanLLaVA** | | ICCV 2025 | 城市智能多模态LLM；空间推理与理解 |
| **SpatialLM** | 群核科技 | 2026 | 空间理解大模型；HuggingFace趋势榜与DeepSeek/千问同场竞技 |

### 2.3 关键综述论文

| 论文 | 来源 | 内容要点 |
|------|------|---------|
| **Simulating the Real World** (TPAMI 2026) | 港科广+中大+港中文+清华+博世 | 2D/视频/3D/4D统一维度生长(dimensional growth)框架；引用3K+ |
| **Understanding World or Predicting Future** | arXiv 2411.14499 | 视频生成+自动驾驶+通用机器人260+参考文献全景综述 |
| **MoE Capital深度博客** | MoE Capital (2026.05) | 系统梳理世界模型两条独立演进脉络(RL社区+视频生成社区)；冷静判断当前能力边界 |
| **中科院2026世界模型综述** | 中科院 | "专家"精度与"通才"泛化双面性平衡之道 |
| **从Masks到Worlds** | arXiv 2025 | 遮蔽技术主导世界模型的技术路线梳理；BERT→Genie路线图 |
| **生成式世界模型综述** | 极佳视界+中科院+新国立等 | 全球首篇自动驾驶世界模型综述 |
| **CVPR 2026世界模型论文全景** | 机器之心梳理 | 从生成到建模的关键转变；视频生成→3D→4D→可控物理世界 |

## 3. Commercial Deployment: Verified Cases

### 3.1 自动驾驶仿真 — 唯一已规模化变现的赛道

| 公司 | 产品/方案 | 落地状态 | 数据验证 |
|------|----------|---------|---------|
| **NVIDIA** | Cosmos + Omniverse + DRIVE Hyperion | 2025 CES发布Cosmos；2026 GTC推出Cosmos Predict-2(2B/14B)、开源Alpamayo-R1；DRIVE Hyperion 10搭载Blackwell芯片面向车企量产 | 联合汤元科技/五一视界等打造L4级仿真平台 |
| **Wayve** | GAIA-2/3 | 英国端到端自动驾驶公司，GAIA系列已用于内部训练数据生成 | 微软+D1 Capital等投资超2亿美元B轮 |
| **华为** | ADS 4.0 WEWA架构 | 世界模型+端到端架构 | 2025年全国城市NOA搭载312.9万辆(中汽协数据，全品牌合计)；华为与Momenta占第三方供应商约八成(Momenta 61.06%份额第一) |
| **小鹏** | X-World + 第二代VLA | Video Diffusion驾驶世界模型 | 已投入闭环仿真/在线RL/数据生成生产环节；第二代VLA研发验证中大量使用 |
| **Waymo** | Genie 3驱动仿真 | Camera+LiDAR闭环仿真 | 2025年1400万单商业化订单；26个市场运营 |
| **Momenta** | Magenta端到端+世界模型 | 环境预测+离线仿真训练 | 量产应用中；国内城市NOA第二极 |

### 3.2 具身智能/机器人 — 数据合成与策略训练

| 公司 | 产品/方案 | 落地状态 |
|------|----------|---------|
| **智元机器人(AGIBOT)** | Genie-Envisioner (GE-Sim 2.0) | 行业首个世界模型开源平台；配套100万+轨迹数据集/217个任务；ICRA 2026挑战赛27国526支队伍 |
| **蚂蚁灵波科技** | LingBot-World | 2026.01开源SOTA级具身世界模型，完整权重+推理代码；部分指标宣称超越Genie 3 |
| **晨昏线科技** | 具身世界模型+20家硬件适配 | 核心团队来自华为/阿里/腾讯；已跑通10余场景 |

### 3.3 空间智能平台 — 数字孪生与城市管理

| 公司 | 产品/方案 | 落地状态 |
|------|----------|---------|
| **World Labs (李飞飞)** | Marble | 2025.11发布首款商用世界模型；免费增值+付费订阅；瞄准游戏开发/VFX/VR |
| **群核科技** | SpatialLM + SpatialGen + SpatialVerse | 2026.04港交所上市("全球空间智能第一股")；23.2%市占率中国空间设计软件第一；4.8亿+3D模型数据集 |
| **五一视界(51WORLD)** | 51Sim + 51Aes + 51Earth | "物理AI第一股"(港股IPO)；掌握3DGS/4DGS+世界模型+物理仿真三路线；合成数据真实率90%；动力学仿真/激光雷达/摄像头仿真置信度分别为95%/95%/90% |
| **特斯联** | Space-Aware LM + Space-Aware Agent | 2025.06发布空间智能战略；面向城市治理/低空经济/智慧建筑 |
| **飞渡科技** | 空间智能新平台+一体机 | 2026.03发布会；面向城市治理/交通/自然资源/低空经济 |

### 3.4 3D内容生成 — 垂直场景变现

| 公司 | 产品 | 特点 |
|------|------|------|
| **腾讯混元** | HY-World 2.0 | 2026.04开源3D世界模型；文字/图片/视频→3D世界；Mesh/3DGS/点云多格式导出 |
| **阿里ATH** | HappyOyster | 2026.04发布；主打实时交互世界模型 |
| **极佳视界** | GigaWorld-0/1 | 42天融资25亿人民币→百亿独角兽；开源+闭源双版本 |
| **魔芯科技** | 3D AI建模→空间智能 | 华为哈勃领投Pre-A+轮近亿元；从3D物体建模走向空间理解 |
| **无问智科** | 3DGS生成式仿真平台 | 已获德国车企订单；3DGS模型资产重建+场景生成 |

## 4. Open-Source Projects Inventory

### 4.1 自动驾驶方向

| 项目 | 来源 | 核心能力 | GitHub/链接 |
|------|------|---------|------------|
| **Cosmos (Predict/Tokenize/Reason)** | NVIDIA | 世界基础模型平台；Predict-2(2B/14B)支持物理AI合成数据生成 | NVIDIA/Cosmos |
| **Alpamayo-R1** | NVIDIA | Cosmos Reason VLM；面向物理AI的开源VLM；强化学习+自动驾驶任务微调 | NVIDIA/Alpamayo |
| **OpenDriveVLA** | OpenDriveLab | 首个面向自动驾驶的开源VLA(0.5B-10B)；感知→决策→控制全链路 | DriveVLA/OpenDriveVLA |
| **UniAD** | OpenDriveLab | 规划导向端到端框架(ECCV 2024) | OpenDriveLab/UniAD |
| **Vista** | OpenDriveLab | 高保真驾驶世界模型；基于OpenDV数据集；天气/时间/交通流参数化控制 | OpenDriveLab/Vista |
| **SparseWorld** | 理想+浙大 | 稀疏4D占用预测世界模型(AAAI 2026) | 公开待确认 |

### 4.2 通用/具身方向

| 项目 | 来源 | 核心能力 | 状态 |
|------|------|---------|------|
| **Genie 3 / Project Genie** | Google DeepMind | 首个实时交互通用世界模型；24fps@720p | 2026.01开放内测(AI Ultra用户) |
| **LingBot-World** | 蚂蚁灵波科技 | 开源SOTA级具身世界模型；完整权重+推理代码 | 2026.01开源 |
| **GE-Sim 2.0 (Genie Envisioner)** | 智元机器人 | 可交互/可训练/可评估的物理仿真引擎 | 2026发布 |
| **V-JEPA 2** | Meta FAIR | 100万+小时视频自监督；开源JEPA世界模型 | 2025.06开源 |
| **GigaWorld-0** | 极佳视界 | 开源物理世界"数字沙盒" | 2025.12开源 |
| **AGIBOT WORLD 2026** | 智元机器人 | 100万+轨迹开源数据集；217个任务 | ICRA 2026 |

### 4.3 3D/空间生成方向

| 项目 | 来源 | 核心能力 |
|------|------|---------|
| **HY-World 2.0** | 腾讯混元 | 开源3D世界模型2.0；3DGS/Mesh/点云多格式导出 |
| **SpatialLM** | 群核科技 | 空间理解大模型；HuggingFace趋势榜活跃 |
| **Seed3D** | 字节跳动 | 单图→仿真级3D模型；可导入Isaac Sim |

## 5. Six Major Schools of World Models (2026 Classification)

### 5.1 联合嵌入预测架构 (JEPA)
- **核心思想**：不在像素空间做预测，在抽象表示空间做预测
- **代表**：AMI Labs, V-JEPA 2, LeWorldModel
- **优势**：避免像素级预测的不确定性；更适合物理世界建模
- **挑战**：工程化拐点刚到，距离商业化尚远
- **资本**：AMI Labs 10.3亿美元种子轮，估值35亿美元——学术界最大单笔种子轮

### 5.2 视频生成/交互世界模型
- **核心思想**：通过生成逼真视频模拟世界动态
- **代表**：Genie 3, HappyOyster, Runway Gen-3C, Muse Spark
- **优势**：视觉输出直观；短期商业路径清晰（游戏/影视/仿真）
- **挑战**：物理一致性不足；长期因果关系缺失
- **反面教训**：Sora因单位成本高/需求非刚性/未嵌入商业闭环而被关闭

### 5.3 3D空间智能世界模型
- **核心思想**：AI理解并生成三维空间结构
- **代表**：World Labs/Marble, HY-World 2.0, Cosmos
- **优势**：直接服务于AR/VR/机器人/数字孪生
- **挑战**：3D数据稀缺；精度与泛化难以兼顾
- **资本**：World Labs累计约12.3亿美元融资(2.3亿2024+10亿2026)，估值50亿美元

### 5.4 基于模型的强化学习
- **核心思想**：内部世界模型用于策略训练和规划
- **代表**：Dreamer系列, DayDreamer, RISE
- **优势**：样本效率高；可离线训练
- **挑战**：模型偏差(model bias)；泛化到开放世界困难
- **趋势**：从纯仿真走向"世界模型想象力+RL"范式(RISE)；Hafner从DeepMind离职创业

### 5.5 自动驾驶世界模型
- **核心思想**：模拟交通环境动态用于感知/预测/规划/仿真
- **代表**：Tesla Neural World Simulator, GAIA (Wayve), WEWA (华为), X-World (小鹏), SparseWorld (理想)
- **优势**：商业化最成熟；数据量极大
- **挑战**：安全性要求极高；长尾场景覆盖难
- **产业分化**：VLA派(小鹏/理想/元戎) vs WA派(华为/蔚来) vs RL派(地平线/Momenta)

### 5.6 机器人世界模型
- **核心思想**：机器人通过内部模拟器预演动作后果
- **代表**：MTPR-WM, GS-World, GE-Sim 2.0, LingBot-World
- **优势**：解决数据稀缺(仿真→真实)；安全试错
- **挑战**：Sim2Real gap；物理一致性要求高
- **关键问题**：具身智能数据成熟度不足LLM的1%(~0.6分 vs 60分)

## 6. 3DGS × World Model: Technical Intersection Deep Dive

> 本节与Awesome-Gaussian-Skills项目研究方向直接相关

### 6.1 两条路线的本质差异

| 维度 | 世界模型（视频生成路线） | 3DGS（显式重建路线） |
|------|------------------------|---------------------|
| **表示** | 隐式latent space / 2D像素 | 显式3D高斯基元 |
| **生成方式** | 扩散/自回归，从噪声或条件采样 | 多视角优化→Splatting渲染 |
| **可控性** | 文本/粗粒度动作控制 | 相机位姿精确控制，编辑需额外工具 |
| **物理一致性** | 弱（概率采样器，不保证物理规律） | 中（几何精确，但无物理层） |
| **动态建模** | 自然支持（时序帧生成） | 原生静态，需4DGS扩展 |
| **实时交互** | Genie 3达24fps，但精细操控不足 | 渲染极快(>100fps)，但交互需物理引擎 |

### 6.2 融合趋势 — 三种正在发生的范式

#### 范式1：3DGS作为世界模型的3D先验（Forward 3DGS）

3DGS从"重建工具"升级为"显式世界模型"——不再只是拍摄一个Clip，而是建立一条可自由漫游的3D街道。

- **Street Gaussians**（理想+浙大）：将3DGS带入自动驾驶动态场景建模主舞台，让行业首次系统看到Gaussian表示可能是闭环仿真的新路径
- **StreetForward**（理想最新）：前馈式3DGS，一步前向推理直接从输入图像预测3DGS场景表示，消除逐场景优化，面向实时驾驶仿真
- **AD3R Lab**（开源组织）：面向OEM/Tier1，将路采数据转化为"可重建、可编辑、可渲染、可仿真、可评测"的3DGS场景资产
- **无问智科**：3DGS生成式仿真平台，已获德国车企商业订单

核心逻辑：3DGS提供显式3D结构 → 世界模型在此基础上做动态预测 → 两者互补。

#### 范式2：3DGS+物理引擎的混合仿真（Real2Sim2Real）

3DGS捕获逼真外观 + 物理引擎保证交互 + MLLM自动生成物理合理的可活动资产。

- **RoboSimGS**（武大+阿里达摩+清华+浙大，2025）：3DGS外观 + Mesh可交互物体基元 + MLLM自动资产创建 → Real2Sim2Real闭环
- **PhysWorld**（2025）：MPM模拟器构建物理孪生体 → GNN世界模型学习物理动态 → 从真实视频反推物理属性
- **五一视界51Sim**：掌握"物理仿真+3DGS/4DGS辐射场重建+世界模型生成"三条路线，合成数据真实率90%，动力仿真可信度95%，场景可控性与多感知一致性100%
- **NVIDIA 51Sim合作**：51Sim利用Cosmos对现有合成数据进行大规模泛化，确保物理真实性前提下大幅提升数据丰富度

#### 范式3：占用网格（Occupancy）作为3DGS与世界模型的桥梁

占用网格本质是3D体素化表示，与3DGS的显式表示有天然亲和性，正在成为两者之间的中间表示层。

- **SparseWorld**（理想，AAAI 2026）：稀疏查询实现4D占用预测，7x提速+40%精度提升
- **OccWorld / DOV / I²-World**：占用预测→未来场景推演→轨迹规划，形成自动驾驶世界模型标准范式
- **Driving in the Occupancy World (DOV)**（浙大，CVPR 2026）：以视觉为中心的4D占用预测与规划

关键洞察：占用网格是3DGS（连续显式）与世界模型（离散latent）之间的**中间表示层**——若能建立Occ→3DGS的双向映射，可打通两条技术路线。

### 6.3 3DGS在World Model和Spatial Intelligence中的角色

| 交叉方向 | 具体方法 | 关系 |
|---------|---------|------|
| 世界模型场景构建 | HY-World 2.0输出3DGS资产 | 3DGS作为世界模型的3D表示格式 |
| 可微仿真引擎 | GS-World | 3DGS作为可微、物理一致的仿真原语 |
| 空间理解→3D重建 | World Labs/Marble | 3DGS可能作为重建输出格式 |
| 具身智能空间记忆 | GSMem, RoboSplat | 3DGS作为持久空间记忆 |
| 自动驾驶仿真 | SplatAD, GS-Drive, GausCtrl-AD, Street Gaussians | 3DGS用于驾驶场景模拟 |
| 4D动态世界 | 4DGS方法族 | 世界模型的动态扩展 |
| 前馈3D生成 | StreetForward | 3DGS从重建走向前馈生成，消除逐场景优化 |

## 7. Autonomous Driving World Model: Competitive Landscape

### 7.1 三大技术路线并行

| 路线 | 代表 | 核心思路 | 优势 | 劣势 |
|------|------|---------|------|------|
| **视频扩散生成** | GAIA-2/3, Cosmos Predict, X-World, Epona | 条件扩散模型生成驾驶视频 | 视觉质量高、多视角可控 | 不理解3D结构、物理一致性弱 |
| **占用/BEV预测** | SparseWorld, OccWorld, DOV, I²-World | 3D体素化表示预测未来状态 | 3D一致性有保证、可用于规划 | 分辨率受限于体素大小、细节不足 |
| **世界-行为模型(WA)** | 华为WEWA, 蔚来 | 世界模型+行为预测统一架构 | 端到端规划能力强 | 计算成本极高、黑箱问题 |

### 7.2 主机厂阵营划分

| 阵营 | 路线选择 | 代表产品 |
|------|---------|---------|
| **VLA派** | 视觉-语言-动作大模型 | 小鹏(VLA)、理想(VLA+SparseWorld)、元戎 |
| **WA派** | 世界-行为模型 | 华为(WEWA)、蔚来 |
| **RL派** | 强化学习+世界模型仿真 | 地平线(HSD)、Momenta(R6) |

### 7.3 仿真数据生成产业价值链

```
真实路采数据 → [3DGS重建/世界模型生成] → 合成数据 → [闭环仿真/RL训练] → 模型验证
                     |                              |
            NVIDIA Cosmos / 五一视界         51Sim / 汤元科技 / 无问智科
            Waymo (Genie 3驱动)              OpenDriveLab (Vista/UniAD)
```

## 8. Embodied Intelligence Data Pipeline & Sim2Real Solutions

### 8.1 三条数据路线的当前状态

| 路线 | 保真度 | 成本 | 扩展性 | 长尾覆盖 | 成熟度 |
|------|-------|------|--------|---------|--------|
| **真实数据** | 最高(无Sim2Real Gap) | 极高(遥操作/动捕) | 极差(一年一个动作) | 几乎不可能 | 工业界主力 |
| **合成/仿真数据** | 中(物理引擎偏差) | 中(GPU集群) | 好(参数化控制) | 程度有限 | 快速增长中 |
| **世界模型生成数据** | 低-中(概率采样器) | 中-高(推理消耗) | 好(条件生成) | 理论最强 | 早期验证 |

数据瓶颈量化：大语言模型训练数据成熟度~60分，**具身智能物理交互数据不到0.6分**（光轮智能创始人谢晨估计）。

### 8.2 Sim2Real Gap的三条解决路线

#### 路线1：Sim2Real2Sim闭环
- Sim→Real：部署真机执行任务
- Real→Sim：将真机表现反馈更新仿真参数
- 形成"虚实双向校准"的迭代闭环
- 代表：RoboSimGS的Real2Sim2Real框架

#### 路线2：世界模型作为"可微仿真器"
- 不依赖传统物理引擎，直接从数据学习环境动态
- 优势：自然弥合虚实差异（因为直接从真实数据学习）
- 劣势：物理一致性不可保证、长时预测不稳定
- 代表：RISE（OpenDriveLab，ICRA 2026）

#### 路线3：混合管线（当前工业界主流）
- 物理引擎保证基础物理(碰撞/重力) + 世界模型提供视觉真实感 + 3DGS/4DGS提供场景资产
- 51Sim的"物理仿真+3DGS+世界模型"三路线并行即此思路
- 工程实现最成熟，但系统集成复杂度最高

## 9. Open Challenges & Research Gaps

### 9.1 核心技术挑战

1. **物理一致性根本性缺陷**：当前世界模型本质是概率性像素采样器，不理解物理规律——重力/碰撞/流体等物理一致性无法保证。Sim2Real Gap仍是核心瓶颈。
2. **因果推理能力薄弱**：视频生成流派可生成统计一致的画面但不理解因果链——能预测"看起来下一步会怎样"，但无法判断"为什么会这样"和"如果换一种行动会怎样"。
3. **长时序一致性**：数分钟已是极限，小时级别一致性仍无解。Genie 3/3可持续数分钟已属SOTA。
4. **数据瓶颈**：具身智能数据缺口是最大障碍，物理交互数据不到LLM的1%。真机采集效率极低，合成数据Sim2Real Gap严重。
5. **评测标准缺失**：物理一致性/空间智能的客观评测基准尚不成熟。SpatialGenEval/MMSI-Bench刚起步，尚无广泛认可的标准。
6. **可控性与交互性不足**：Genie 3支持24fps实时交互但可控粒度有限（宏观探索OK、精细操作不足）；多数世界模型的控制接口停留在文本/粗粒度动作指令。
7. **计算成本与实时性矛盾**：通用世界模型训练和推理成本远超LLM；边缘部署（机器人端侧）仍不现实；实时交互需24fps以上帧率对推理效率要求极高。

### 9.2 商业化挑战

1. **定义混乱导致承诺无法验证**：同一术语在不同社区指代不同技术，评估标准不统一，商业承诺难以兑现。
2. **商业验证远未完成**（澎湃新闻直接指出）：除NVIDIA Cosmos（嵌入车企工具链）和华为WEWA（300万辆规模部署）等少数案例外，多数产品仍处Demo/GitHub星标阶段。
3. **Sora的教训**：单位成本高、需求非刚性、未嵌入核心商业价值链→无法形成闭环→团队被关闭。同样问题可能重演于其他纯视频生成世界模型。
4. **Sim2Real性能衰减**：模型从仿真迁移到真实环境后性能急剧下降，特别是在长尾场景中。构建Sim2Real2Sim闭环是当前最可行的缓解方案但工程复杂度极高。

### 9.3 3DGS相关挑战

1. **3DGS精度与效率权衡**：作为世界模型3D原语，大规模场景下的效率瓶颈。
2. **4DGS序列一致性**：从静态3DGS到动态4DGS的时间一致性仍不稳定。
3. **3DGS物理层缺失**：3DGS有几何精确的外观表示但无物理交互层，需Mesh/物理引擎补充——这正是ArtiSplat试图从formulation层面解决的问题。

## 10. Key Industry Forecasts

| 来源 | 预测 |
|------|------|
| 摩根士丹利 | 世界模型赋能产业规模2035年达10万亿美元 |
| 英伟达Jim Fan | 2026年是"大世界模型(Large World Models)真正为机器人奠定基础的第一年" |
| 摩根士丹利 | 2026年美国33城推出自动驾驶商业化服务 |
| 通用判断 | 2026年从"技术竞赛"转向"商业落地"关键验证年 |
| IDC | 2026年全球AI市场规模突破5000亿美元 |
| 黄仁勋CES 2026 | "物理AI的ChatGPT时刻近在咫尺"；"AI的价值不再由算力决定，而由场景定义，物理世界是AI最大的应用场景" |
| 麦肯锡 | 83%的企业在至少一个职能中实现AI常态化使用(2025调研) |

## 11. Timeline: Key Events (2018-2026)

| 时间 | 事件 |
|------|------|
| 2018 | Ha & Schmidhuber: World Models论文 (开山之作) |
| 2022 | LeCun提出JEPA架构：《A Path Towards Autonomous Machine Intelligence》 |
| 2023 | Wayve发布GAIA-1：首个生成式自动驾驶世界模型 |
| 2024.02 | OpenAI发布Sora：视频生成模型作为世界模拟器 |
| 2024.04 | 李飞飞创办World Labs（空间智能方向） |
| 2024.07 | World Labs估值超10亿美元（4个月独角兽） |
| 2024 | DreamerV3/DayDreamer系列持续演进；OccWorld(CVPR 2024) |
| 2024.12 | RoboSimGS：3DGS+Mesh的Real2Sim2Real框架 |
| 2025.01 | NVIDIA CES发布Cosmos World Foundation Model |
| 2025.06 | Meta发布V-JEPA 2开源世界模型 |
| 2025.08 | Google DeepMind发布Genie 3（首个实时交互世界模型） |
| 2025.09 | PhysWorld：MPM+GNN的世界模型框架 |
| 2025.10 | GS-World：3DGS作为可微仿真引擎的世界模型 |
| 2025.11 | World Labs发布Marble商用世界模型；51WORLD空间智能落地实践 |
| 2025.12 | 极佳视界发布GigaWorld-0开源；五一视界港股IPO招股 |
| 2026.01 | 蚂蚁灵波开源LingBot-World；Google开放Genie 3内测；NVIDIA CES开源Alpamayo |
| 2026.02 | World Labs完成10亿美元融资，估值50亿美元 |
| 2026.03 | AMI Labs完成10.3亿美元种子轮；极佳视界GigaWorld-1；飞渡科技空间智能新品发布会；NVIDIA GTC推出Cosmos Predict-2 |
| 2026.04 | 腾讯HY-World 2.0与阿里HappyOyster同日发布；群核科技港股IPO("杭州六小龙"第一股)；它石智航4.55亿美元Pre-A轮；小鹏X-World技术报告 |
| 2026.04 | ICRA 2026: AGIBOT WORLD CHALLENGE 27国526支队伍；GE-Sim 2.0发布；RISE(世界模型想象力RL) |
| 2026.05 | CVPR 2026: 自动驾驶世界模型论文爆发(DOV/SparseWorld-TC等)；成都人形机器人中心MTPR-WM；Muse Spark(Meta) |

## 12. Research Directions for 3DGS × World Model × Spatial Intelligence

> 基于当前竞争格局与技术空白，面向ArtiSplat框架及更广泛3DGS研究的方向建议

### 12.1 ArtiSplat框架的世界模型扩展

ArtiSplat（Articulation-Aware Rendering Formulation）的ω_p(θ)物理调制权重恰好处于3DGS×世界模型的结构性空白位：

**当前空白**：
- Forward 3DGS（Street Gaussians/StreetForward）只做静态场景重建+简单动态建模，**不做铰接物体的物理推演**
- 世界模型（Cosmos/Genie 3/GAIA等）不做显式3D基元层面的物理调制
- RoboSimGS的"3DGS外观+Mesh物理"双表示方案工程可行但表示分裂

**ArtiSplat的独特优势**：
- ω_p(θ) = σ(1 − φ_pen/τ_pen) · σ(1 − φ_joint/τ_jnt) 在渲染方程层面统一了物理一致性与视觉表示
- 单表示（3DGS基元+物理调制权重ω_p）比双表示（3DGS+Mesh）更优雅
- "物理一致性是渲染的byproduct而非训练目标"——类比Mip-NeRF对NeRF的formulation层面贡献

**具体方向**：ArtiSplat → Forward 3DGS世界模型扩展
- 将ω_p(θ)引入Street Gaussians式的驾驶场景，使铰接物体（车门/行人/交通参与者）的物理一致性在渲染层天然保证
- 在占用网格世界模型(SparseWorld/OccWorld)的Occ→3DGS转换中引入物理调制
- 目标会议：ICLR 2027（可微编程+学习系统方向，预估55-65%接收概率）> SIGGRAPH 2027 > CVPR 2027

### 12.2 占用网格↔3DGS双向转换

占用网格正在成为自动驾驶世界模型的标准中间表示，但与3DGS之间的转换尚未解决：

- **Occ→3DGS**：从体素占用到连续高斯基元的可微转换，可让占用预测世界模型直接输出可渲染的3DGS场景
- **3DGS→Occ**：从3DGS场景中提取占用网格，用于世界模型的4D预测
- ArtiSplat的PAF（Part-Affinity Field with Physical Priors）可自然扩展为3DGS→Occ的part-aware体素化方案

### 12.3 具身智能数据合成的3DGS管线

铰接式3D资产的3DGS表示本身就是机器人操作训练的天然场景资产：

- ω_p(θ)提供"物理合规性标签"——可用于筛选/过滤合成数据的物理一致性
- 与RoboSimGS管线对比：RoboSimGS需要Mesh基元+MLLM自动创建资产，ArtiSplat可在纯3DGS表示上完成
- GE-Sim 2.0的100万+轨迹数据集是潜在验证平台

### 12.4 4DGS世界模型的物理调制

4DGS方法族向世界模型方向演进的关键缺失是物理层：

- 将ArtiSplat的ω_p(θ)从静态铰接扩展到4D动态场景
- 4DGS的时间维度+ω_p(θ)的物理调制 → 可交互的物理一致4D世界
- 与PhysWorld的MPM+GNN方案形成对比：3DGS原生渲染 vs GNN学习物理

### 12.5 知识库扩展建议

World Models和Spatial Intelligence与3DGS的技术交叉日益紧密，建议在Awesome-Gaussian-Skills知识库中持续追踪：

1. **World Model × 3DGS交叉方法**：追踪GS-World/Street Gaussians/StreetForward等3DGS作为世界模型3D原语的方法
2. **空间智能评测**：关注SpatialGenEval/MMSI-Bench/NavSpace等基准对3D空间理解方法的评测
3. **4DGS → 可交互世界**：4DGS方法族向世界模型方向演进的趋势
4. **具身智能3DGS**：已有Embodied AI子分类，持续扩展与世界模型交叉的方法(GS-World/ManiGaussian/RoboSimGS)
5. **自动驾驶3DGS仿真**：SplatAD/GS-Drive/GausCtrl-AD/Street Gaussians等世界模型驱动的仿真中3DGS应用
6. **占用预测世界模型**：SparseWorld/OccWorld/DOV等占用网格世界模型，特别是Occ↔3DGS转换方向

## 13. References

- MoE Capital: "World Models: From Definition to Commercialisation" (2026.05) — 系统梳理世界模型两条独立演进脉络(RL社区+视频生成社区)
- TPAMI 2026: "Simulating the Real World: A Unified Survey of Multimodal Generative Models" — 2D/视频/3D/4D统一维度生长框架，引用3K+
- arXiv 2411.14499: "Understanding World or Predicting Future? A Comprehensive Survey of World Models" — 260+参考文献全景综述
- arXiv 2504.07296: "OpenSpatial: Spatial Understanding Pipeline"
- Ha & Schmidhuber: "World Models" (2018) — 开山之作
- LeCun: "A Path Towards Autonomous Machine Intelligence" (2022) — JEPA架构理论
- Hafner et al.: "DreamerV3" (Nature 2025) — 基于模型RL的里程碑
- LeWorldModel: "Stable End-to-End Joint-Embedding Predictive Architecture" (arXiv 2026.03)
- 机器之心编译: "世界模型究竟是什么？一文看懂其前世今生与百亿赌局" (2026.05.18)
- 澎湃新闻: "世界模型的三个问题：定义、数据与未完成的商业验证" (2026.04)
- 与非网/博客园: "2026年，3DGS和世界模型，在自动驾驶仿真中的组合" (2026.02)
- CSDN: "自动驾驶世界模型开源最强的前十个项目" (2026.03)
- 知乎: "世界模型浅调研(2026.5)" — 含视频生成/3DGS重建/Forward 3DGS/具身世界模型分类
- 知乎: "CVPR 2026世界模型论文全景梳理：从生成到建模的关键转变"
- 知乎: "2026具身智能世界模型三大演进方向" — VLA+世界模型三种架构范式
- 知乎: "前馈GS开始落地了，理想最新的StreetForward解析" (2026.03)
- NVIDIA Blog: "NVIDIA助力汤元科技借助Cosmos推动物理AI与智能驾驶数据生成"
- 小鹏汽车: "X-World世界模型技术报告" (2026.04)
- 光轮智能(谢晨): 具身智能数据成熟度量化(0.6分 vs LLM 60分)
- 51WORLD/五一视界: 物理直觉世界模型发布(2026.03) + 港股IPO
- 智元机器人: GE-Sim 2.0 + AGIBOT WORLD 2026挑战赛
