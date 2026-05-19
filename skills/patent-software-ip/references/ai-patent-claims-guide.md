
# AI领域专利权利要求书撰写指南

## 1. AI权利要求总体原则

### 1.1 方法+系统+存储介质三件套

每件AI专利必须包含：
- **方法权利要求**：描述算法执行流程（S1→S2→S3...）
- **系统/装置权利要求**：描述实现该方法的装置单元（与步骤一一对应）
- **计算机可读存储介质权利要求**：存储执行上述方法的程序

### 1.2 独立权利要求撰写铁律

1. 前序部分：写明现有技术共有的技术特征（如"一种基于神经网络的方法"）
2. 特征部分："其特征在于"后列出全部必要技术特征
3. 必要技术特征判断标准：删除该特征后技术方案不完整
4. 从独立权利要求到从属权利要求的保护范围递减式排列

### 1.3 11类AI典型方案分类体系

第2节按以下7大领域11类方案提供权利要求模板：

| 领域 | 类别编号 | 方案类型 |
|------|----------|----------|
| 感知智能 | 2.1 | 模型架构创新（2D视觉/通用） |
| 感知智能 | 2.2 | 3D视觉与图形学（3DGS/NeRF/SLAM/点云） |
| 认知与语言 | 2.3 | 训练方法创新（通用） |
| 认知与语言 | 2.4 | 多模态大模型/融合 |
| 认知与语言 | 2.5 | 检索增强生成（RAG） |
| 生成式AI | 2.6 | 扩散模型与可控生成 |
| 决策与交互 | 2.7 | 智能体（Agent） |
| 决策与交互 | 2.8 | 具身智能（VLA/机器人） |
| AI工程化 | 2.9 | 推理优化 |
| AI工程化 | 2.10 | 数据处理/增强 |
| AI安全与治理 | 2.11 | AI水印与溯源 |

## 2. 11类AI典型方案的权利要求模板

### 2.1 模型架构创新类（2D视觉/通用）

```
独立权利要求（方法）：
一种[应用场景]中的[方法名称]方法，其特征在于，包括：
S1. 获取[输入数据]；
S2. 将所述[输入数据]输入至预先训练的[模型名称]，
    所述[模型名称]包括[第一子模块]、[第二子模块]和[第三子模块]；
S3. 通过所述[第一子模块]对所述[输入数据]进行[处理动作1]，得到[中间特征]；
S4. 通过所述[第二子模块]对所述[中间特征]进行[处理动作2]，得到[融合特征]；
S5. 通过所述[第三子模块]对所述[融合特征]进行[处理动作3]，得到[输出结果]。

独立权利要求（系统）：
一种[应用场景]中的[方法名称]系统，其特征在于，包括：
[第一处理单元]，用于获取[输入数据]；
[第二处理单元]，用于将所述[输入数据]输入至预先训练的[模型名称]；
[第一子模块对应单元]，用于执行[处理动作1]；
[第二子模块对应单元]，用于执行[处理动作2]；
[第三子模块对应单元]，用于执行[处理动作3]。
```

### 2.2 3D视觉与图形学类

```
独立权利要求（方法）：
一种基于[技术场景]的三维场景[重建/渲染/理解]方法，其特征在于，包括：
S1. 获取针对目标场景的多视角[图像/视频/点云]数据；
S2. 对所述多视角数据进行[相机标定/特征匹配/稀疏重建]处理，
    得到相机位姿参数和稀疏点云；
S3. 基于所述相机位姿参数和稀疏点云，通过[三维表示方法]构建稠密场景表示，
    所述[三维表示方法]包括[表示结构描述]，
    对所述稠密场景表示进行[优化策略]迭代优化，
    以使渲染损失函数收敛；
S4. 根据指定视角的相机参数，对优化后的所述稠密场景表示进行[渲染计算]，
    得到所述指定视角的渲染图像；

其中，所述[渲染计算]包括：
基于所述稠密场景表示中各基元的[位置/属性]，
通过[体渲染/EWA泼溅/光栅化]方式，
计算各像素的颜色值和透明度值，
得到所述渲染图像。

独立权利要求（系统）：
一种基于[技术场景]的三维场景[重建/渲染/理解]系统，其特征在于，包括：
数据获取单元，用于获取针对目标场景的多视角数据；
预处理单元，用于进行相机标定和稀疏重建；
稠密重建单元，用于构建稠密场景表示并进行迭代优化；
渲染输出单元，用于根据指定视角的相机参数进行渲染计算并输出图像。
```

**3D视觉从属权利要求展开方向**：

| 层级 | 细化方向 | 示例 |
|------|----------|------|
| 第一层 | 三维表示结构 | "所述三维表示方法为三维高斯泼溅/神经辐射场/显式网格" |
| 第二层 | 渲染计算方式 | "所述体渲染采用alpha合成公式，颜色值按深度排序加权求和" |
| 第三层 | 优化策略细节 | "所述迭代优化包括自适应密度控制：克隆欠重构区域高斯、分裂过重构区域高斯" |
| 第四层 | 参数取值范围 | "所述高斯的初始球谐阶数为[0,3]，密度控制周期为[100,500]次迭代" |
| 第五层 | 训练相关特征 | "所述渲染损失函数包括L1损失和D-SSIM损失的加权组合" |

### 2.3 训练方法创新类

```
独立权利要求（方法）：
一种[模型类型]的训练方法，其特征在于，包括：
S1. 构建[训练数据集]，所述训练数据集包括[数据构成描述]；
S2. 初始化[模型名称]的模型参数；
S3. 将所述训练数据集输入至所述[模型名称]，通过前向传播得到预测结果；
S4. 根据所述预测结果与标签数据，通过[损失函数名称]计算损失值，
    所述[损失函数名称]包括[创新损失项描述]；
S5. 根据所述损失值，通过[优化策略]更新所述模型参数；
S6. 判断是否满足[收敛条件]，若是则得到训练完成的模型，否则返回S3。
```

### 2.4 多模态大模型/融合类

```
独立权利要求（方法）：
一种多模态数据融合处理方法，其特征在于，包括：
S1. 获取[第一模态]数据和[第二模态]数据；
S2. 分别通过[第一编码器]和[第二编码器]对所述[第一模态]数据和所述[第二模态]数据进行编码，
    得到[第一模态特征]和[第二模态特征]；
S3. 通过[模态投影层]将所述[第一模态特征]和所述[第二模态特征]映射至统一的[特征空间]；
S4. 通过[融合模块]对映射后的特征进行跨模态对齐，
    得到[对齐特征]；
S5. 基于所述[对齐特征]，通过[解码器]生成[输出结果]。
```

**大模型专项从属权利要求**：

```
根据权利要求1所述的方法，其特征在于，
所述[第一编码器]为视觉编码器，所述[第二编码器]为语言编码器，
所述模态投影层将视觉特征映射至语言模型的嵌入空间，
所述融合模块通过[交叉注意力/自注意力]机制实现跨模态交互。
```

### 2.5 检索增强生成（RAG）类

```
独立权利要求（方法）：
一种基于检索增强的智能生成方法，其特征在于，包括：
S1. 接收用户输入的查询请求，对所述查询请求进行[查询解析与改写]，
    得到结构化查询向量；
S2. 基于所述查询向量，在[知识库]中进行[语义检索]，
    得到[初始检索结果集]，
    所述知识库包括[文档索引结构]；
S3. 对所述[初始检索结果集]进行[相关性重排序]，
    得到[重排序结果集]；
S4. 将所述[重排序结果集]与所述查询请求进行[上下文重构]，
    构建增强提示信息；
S5. 将所述增强提示信息输入至[生成模型]，
    通过所述[生成模型]基于所述增强提示信息生成响应结果并输出。

独立权利要求（系统）：
一种基于检索增强的智能生成系统，其特征在于，包括：
查询处理单元，用于接收查询请求并进行解析与改写；
检索单元，用于在知识库中进行语义检索；
重排序单元，用于对检索结果进行相关性重排序；
上下文构建单元，用于将重排序结果与查询进行上下文重构；
生成单元，用于基于增强提示信息生成响应结果。
```

**RAG从属权利要求展开方向**：

| 层级 | 细化方向 | 示例 |
|------|----------|------|
| 第一层 | 检索策略细化 | "所述语义检索采用[稠密检索+稀疏检索]混合策略" |
| 第二层 | 重排序方式 | "所述相关性重排序采用[交叉编码器/LLM重排]方式" |
| 第三层 | 知识库结构 | "所述文档索引结构为[层次化/HNSW]索引，分块粒度为[256, 1024]令牌" |
| 第四层 | 上下文构建策略 | "所述上下文重构包括去重、摘要压缩和关键信息提取" |
| 第五层 | 知识库更新机制 | "所述知识库支持增量更新，当新增文档时触发局部索引重建" |

### 2.6 扩散模型与可控生成类

```
独立权利要求（方法）：
一种基于[技术场景]的条件式[内容]生成方法，其特征在于，包括：
S1. 获取[条件输入]，所述[条件输入]包括[文本描述/参考图像/布局/深度图/姿态图]；
S2. 对所述[条件输入]进行[条件编码]，得到条件特征向量；
S3. 基于预设的噪声调度策略，生成初始噪声，
    将所述初始噪声和所述条件特征向量输入至预训练的[去噪网络]，
    所述去噪网络包括[条件注入模块]和[去噪模块]；
S4. 通过所述[条件注入模块]将所述条件特征向量以[交叉注意力/适配器/控制网]方式
    注入至所述[去噪模块]的[指定层]，
    通过所述[去噪模块]进行逐步去噪，得到去噪后的隐式表示；
S5. 对所述隐式表示进行[解码]，得到生成的[内容]输出。

独立权利要求（系统）：
一种基于[技术场景]的条件式[内容]生成系统，其特征在于，包括：
条件获取单元，用于获取条件输入；
条件编码单元，用于对条件输入进行编码；
噪声调度单元，用于基于调度策略生成初始噪声；
条件注入去噪单元，用于将条件特征注入去噪网络并执行去噪；
解码输出单元，用于对隐式表示进行解码并输出。
```

**生成式AI从属权利要求展开方向**：

| 层级 | 细化方向 | 示例 |
|------|----------|------|
| 第一层 | 条件注入方式 | "所述条件注入模块为零卷积连接的控制网络" |
| 第二层 | 去噪网络结构 | "所述去噪模块采用U-Net架构，包含下采样、上采样和跳跃连接" |
| 第三层 | 噪声调度策略 | "所述噪声调度策略为[线性/余弦/偏移]调度，步数范围为[20, 1000]" |
| 第四层 | 多条件组合 | "还包括控制条件融合步骤，通过[加权求和/串联]融合多种条件的控制信号" |
| 第五层 | 训练相关特征 | "所述去噪网络的训练包括：冻结原始网络参数，仅训练条件注入模块的参数" |

### 2.7 智能体（Agent）类

```
独立权利要求（方法）：
一种基于人工智能的[应用场景]处理方法，其特征在于，包括：
S1. 接收用户输入的[请求类型]请求；
S2. 通过[意图识别模块]对所述请求进行意图识别，得到意图识别结果；
S3. 根据所述意图识别结果，制定[执行计划]，所述执行计划包括[工具调用序列]；
S4. 根据所述执行计划，从[工具集合]中确定目标工具，
    通过所述目标工具执行对应的[操作类型]操作，得到执行结果；
S5. 基于所述执行结果进行[观察与反思]，
    判断是否需要调整所述执行计划，
    若需要则更新执行计划并返回S4，
    若不需要则基于所述执行结果生成[响应类型]响应并输出至用户。

独立权利要求（系统）：
一种基于人工智能的[应用场景]处理系统，其特征在于，包括：
请求接收单元，用于接收用户请求；
意图识别单元，用于对请求进行意图识别；
规划单元，用于制定执行计划；
工具执行单元，用于根据执行计划调用目标工具；
反思与响应单元，用于观察执行结果、判断是否调整计划、生成响应。
```

### 2.8 具身智能（VLA/机器人）类

```
独立权利要求（方法）：
一种基于视觉-语言-动作模型的[操作场景]方法，其特征在于，包括：
S1. 通过[传感器组]获取[操作场景]的感知数据，
    所述传感器组包括[视觉传感器/深度传感器/力矩传感器]中的至少一个，
    得到多模态感知输入；
S2. 将所述多模态感知输入和[语言指令]输入至预训练的[视觉-语言-动作模型]，
    所述[视觉-语言-动作模型]包括[视觉编码器]、[语言编码器]和[策略网络]；
S3. 通过所述[视觉编码器]对所述感知数据进行视觉特征提取，
    通过所述[语言编码器]对所述语言指令进行语义编码，
    将视觉特征和语言特征进行[跨模态融合]，得到多模态表征；
S4. 通过所述[策略网络]基于所述多模态表征，
    在[动作空间]中确定目标动作参数；
S5. 将所述目标动作参数发送至[执行器控制单元]，
    通过所述执行器控制单元驱动[执行器]执行对应操作，
    并根据执行反馈更新所述感知数据。

独立权利要求（系统）：
一种基于视觉-语言-动作模型的[操作场景]系统，其特征在于，包括：
传感器模块，用于获取操作场景的感知数据；
多模态编码模块，用于对感知数据和语言指令进行编码和融合；
策略决策模块，用于基于多模态表征确定目标动作参数；
执行控制模块，用于驱动执行器执行操作；
反馈更新模块，用于根据执行反馈更新感知数据。
```

**具身智能从属权利要求展开方向**：

| 层级 | 细化方向 | 示例 |
|------|----------|------|
| 第一层 | 动作空间定义 | "所述动作空间为连续动作空间，包括[末端位姿/关节角度/夹爪开合度]维度" |
| 第二层 | 传感器绑定 | "所述视觉传感器为深度相机，获取RGB-D图像；所述力矩传感器获取各关节力矩值" |
| 第三层 | 策略网络结构 | "所述策略网络采用Transformer架构，以自回归方式生成动作令牌序列" |
| 第四层 | Sim2Real适配 | "还包括仿真到实物的参数适配步骤：对仿真训练的策略参数进行域随机化校准" |
| 第五层 | 安全约束 | "还包括动作安全校验步骤：验证目标动作参数不超过关节运动极限和力矩阈值" |

### 2.9 推理优化类

```
独立权利要求（方法）：
一种[模型类型]的推理优化方法，其特征在于，包括：
S1. 获取待推理的[输入数据]和预先训练的[原始模型]；
S2. 对所述[原始模型]进行[优化操作1]，得到[优化模型]；
S3. 根据所述[输入数据]的数据特征，确定[推理策略]；
S4. 基于所述[推理策略]，通过所述[优化模型]对所述[输入数据]进行推理，
    得到[推理结果]；
其中，所述[优化操作1]包括[具体优化步骤]。
```

### 2.10 数据处理/增强类

```
独立权利要求（方法）：
一种用于[应用场景]的数据处理方法，其特征在于，包括：
S1. 获取原始[数据类型]数据；
S2. 对所述原始[数据类型]数据进行[预处理操作]，得到预处理数据；
S3. 通过[增强策略名称]对所述预处理数据进行数据增强，
    所述[增强策略名称]包括[增强操作1]和[增强操作2]；
S4. 将增强后的数据输入至[下游模型]进行处理。
```

### 2.11 AI水印与溯源类

```
独立权利要求（方法）：
一种用于[内容/模型]的水印嵌入与验证方法，其特征在于，包括：

水印嵌入阶段：
E1. 获取[内容/模型参数]，确定水印嵌入的[目标层/位置]；
E2. 生成水印信息，所述水印信息包括[标识编码]；
E3. 在所述[目标层/位置]以[嵌入方式]注入所述水印信息，
    所述[嵌入方式]保持[生成质量/模型精度]下降不超过[预设阈值]；

水印验证阶段：
V1. 获取待验证的[内容/模型]；
V2. 在所述[目标层/位置]以[提取方式]提取候选水印信息；
V3. 将所述候选水印信息与所述水印信息进行[匹配验证]，
    得到验证结果；
V4. 当所述验证结果满足[鲁棒性条件]时，确认水印验证通过。

独立权利要求（系统）：
一种用于[内容/模型]的水印嵌入与验证系统，其特征在于，包括：
水印生成单元，用于生成水印信息；
水印嵌入单元，用于在目标层/位置注入水印信息；
水印提取单元，用于从待验证内容/模型中提取候选水印；
验证比对单元，用于将候选水印与原始水印进行匹配验证。
```

**AI水印从属权利要求展开方向**：

| 层级 | 细化方向 | 示例 |
|------|----------|------|
| 第一层 | 嵌入位置 | "所述目标层为去噪网络的上采样模块第K层" |
| 第二层 | 嵌入方式 | "所述嵌入方式为在指定层的特征图中叠加低幅度调制信号" |
| 第三层 | 鲁棒性条件 | "所述鲁棒性条件为经过[JPEG压缩/裁剪/缩放/扩散编辑]攻击后比特准确率≥N%" |
| 第四层 | 编码方式 | "所述标识编码采用[纠错码/BCH码]编码，码长为L位" |
| 第五层 | 多层嵌入 | "所述水印信息分散嵌入于多个目标层，采用[秘密共享]方式分割水印" |

## 3. 从属权利要求展开策略

### 3.1 通用5层递进

| 层级 | 细化方向 | 示例 |
|------|----------|------|
| 第一层 | 模块内部结构 | "所述[第一子模块]包括[子单元A]和[子单元B]" |
| 第二层 | 具体计算方式 | "所述[处理动作]采用[具体算法公式]" |
| 第三层 | 参数取值范围 | "所述[参数]的取值范围为[X, Y]" |
| 第四层 | 优选实施方式 | "优选地，所述[参数]取值为Z" |
| 第五层 | 训练相关特征 | "所述[模型名称]的训练过程包括..." |

### 3.2 领域专用展开补充

各领域的专用展开方向已在2.2/2.5/2.6/2.8/2.11各节的"从属权利要求展开方向"表中给出，优于通用5层递进时优先使用领域专用版本。

### 3.3 从属权利要求展开示例

```
2. 根据权利要求1所述的方法，其特征在于，
   所述[第一子模块]包括注意力机制层和前馈网络层，
   所述注意力机制层用于对所述[输入数据]进行自注意力计算，
   所述前馈网络层用于对注意力计算结果进行非线性变换。

3. 根据权利要求2所述的方法，其特征在于，
   所述注意力机制层采用多头注意力机制，
   头数取值范围为[4, 16]。

4. 根据权利要求1所述的方法，其特征在于，
   所述[模型名称]的训练过程包括：
   采用[数据集名称]数据集作为训练数据；
   使用[损失函数]计算训练损失；
   使用[优化器]更新模型参数。
```
### 2.12 Big Data Processing

Independent claim (method):
A [scenario]-oriented big data processing method, comprising:
S1. Ingesting multi-source raw data from [data sources], including [structured/semi-structured/unstructured data types];
S2. Performing distributed data preprocessing via [Spark/Flink/MapReduce pipeline],
    the preprocessing includes [data cleaning/transformation/validation/de-duplication];
S3. Applying [feature engineering/encoding] to the preprocessed data to generate feature vectors;
S4. Executing [aggregation/analysis computation] on the feature vectors via [distributed computing framework],
    obtaining [analysis results];
S5. Storing the analysis results in [storage system] and outputting via [service interface/visualization module].

Independent claim (system):
A [scenario]-oriented big data processing system, comprising:
Data ingestion unit, for ingesting multi-source raw data;
Distributed preprocessing unit, for data cleaning, transformation and validation;
Feature engineering unit, for feature vector generation;
Distributed computation unit, for executing aggregation/analysis computations;
Storage and output unit, for result storage and service delivery.

Big Data dependent claim directions:

| Level | Refinement direction | Example |
|-------|-------------------|---------|
| L1 | Processing framework | "The distributed data preprocessing is implemented via [Apache Spark/Flink], with [shuffle partitioning strategy]" |
| L2 | Streaming topology | "The system supports [at-least-once/exactly-once] processing semantics for real-time data streams" |
| L3 | Data quality | "The data validation module includes [schema validation, anomaly detection, completeness check]" |
| L4 | Scaling strategy | "The distributed computation employs [dynamic resource allocation/auto-scaling] based on data volume" |
| L5 | Fault tolerance | "Includes [checkpoint mechanism/speculative execution] for handling node failures during long-running jobs" |

### 2.13 Data Engineering & Quality

Independent claim (method):
A data engineering method for [application scenario], comprising:
S1. Collecting raw data from [data sources] and performing [format unification];
S2. Assessing data quality via [quality metrics], identifying [missing values/outliers/duplicates/schema violations];
S3. Executing automated data cleaning based on [cleaning rules], including [imputation strategy] and [outlier detection];
S4. Performing [feature extraction/transformation] on cleaned data to generate [feature store entries];
S5. Storing the processed data in [feature store system] with [version control],
    enabling [incremental update/lineage tracing].

Independent claim (system):
A data engineering system for [application scenario], comprising:
Data collection unit, for multi-source data ingestion;
Quality assessment unit, for data quality scoring;
Automated cleaning unit, for imputation and outlier handling;
Feature extraction unit, for feature transformation;
Feature store unit, for versioned feature storage with lineage.

### 2.14 Real-Time Stream Analytics

Independent claim (method):
A real-time data stream analytics method for [scenario], comprising:
S1. Receiving real-time data streams via [message queue] (e.g., [Kafka/Pulsar/RabbitMQ]);
S2. Performing [window-based computation] on the data streams,
    the window type includes [tumbling/sliding/session] windows;
S3. Executing [stream processing operations] on windowed data via [stream processing engine],
    the operations including [filter/join/aggregate/UDAF];
S4. Detecting [anomalies/patterns] in real-time via [anomaly detection module],
    triggering [alert/notification] upon detection;
S5. Outputting analytics results to [dashboard/API/downstream system] with [latency SLA].