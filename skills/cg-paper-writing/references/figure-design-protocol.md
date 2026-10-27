# Figure Design Protocol — 论文三核心图设计与出版级绘图规范

> 融合自 figure-designer + academic-plotting + drawio-academic。用于阶段4绘图，在用户要求"画图/设计 Figure 1/画架构图/画实验结果图/画流程图/论文配图"时加载。

## 适用场景

- 论文三核心图设计：Motivated Example（Fig.1）、Solution Overview（方法图）、Experimental Results（实验图）
- 数据图绘制（折线/柱状/散点/热图/消融对比）
- 架构图/流程图绘制（矢量、可编辑、投稿级）
- 已有图的质量审计与改进建议

## 三核心图设计范式

顶会论文通常 6-8 张图，其中三张承载几乎全部叙事重量，审稿人 1 分钟内扫这三张决定是否细读。

### Figure 1: Motivated Example（动机示例图）

**位置**：第 1 页或第 2 页顶部
**目的**：用一张图让读者秒懂"为什么现有方法不够、本方法好在哪"
**设计范式**：
- 并排对比：左列现有方法的失败案例，右列本方法的结果，中间用箭头/标注点明差异
- 失败案例要具体（放大局部、标红缺陷），不能是泛泛的"质量差"
- 若是 New Problem 类论文，Fig.1 可以是问题示意图而非对比图
**布局**：2-3 列并排，每列带子图标签 (a)(b)(c)，底部一行文字点明 takeaway
**标注**：失败处用红框/红箭头，改进处用绿框；字号 ≥7pt（投稿下限）
**工具**：位图对比用 matplotlib 拼图或 PowerPoint；示意图用 drawio-academic 矢量绘制

### Solution Overview（方法总览图）

**位置**：Method 章节开头
**目的**：一张图讲清整个方法的数据流与模块关系
**设计范式**：
- 左→右数据流：输入 → 模块 A → 模块 B → 输出，每个模块用方框，箭头标数据维度
- 自上而下层次：若有多层级（如 coarse-to-fine），用纵向布局
- 关键创新模块用高亮色（对齐老板深色科技风偏好：夜幕蓝 #0A1628 + 青绿 #00D4AA）
- 公式不进图，用文字标签引用公式编号
**布局**：横向流程图，模块方框圆角，箭头带数据维度标注
**工具**：**drawio-academic 首选**（输出 .drawio + .svg + .arch.json，矢量可编辑，符合老板矢量图偏好）

### Experimental Results（实验结果图）

**位置**：Experiments 章节
**目的**：用数据证明 claim
**设计范式**：
- 定量对比：柱状图/折线图，本方法柱子用高亮色，基线用灰阶
- 定性对比：网格拼图，行=场景，列=方法，右下角放本方法
- 消融：并排柱状图或表格图，每根柱子对应一个消融配置
- 训练曲线：折线图，横轴 step/epoch，纵轴 loss/PSNR，带置信区间阴影
**布局**：单栏图宽 3.5 inch，双栏图宽 7.16 inch（CVPR/ICCV 标准）；字号 ≥7pt
**工具**：**matplotlib/seaborn 首选**（数据图，可复现）

## 数据图绘制规范（matplotlib/seaborn）

### 通用规范

```python
import matplotlib.pyplot as plt
import numpy as np

# 出版级样式
plt.rcParams.update({
    'font.size': 7,              # 投稿下限
    'font.family': 'serif',      # CVPR/SIGGRAPH 偏 serif
    'axes.labelsize': 8,
    'axes.titlesize': 9,
    'legend.fontsize': 7,
    'xtick.labelsize': 7,
    'ytick.labelsize': 7,
    'figure.dpi': 300,
    'savefig.dpi': 300,
    'savefig.bbox': 'tight',
    'savefig.pad_inches': 0.02,
})

# 配色（色盲安全）
COLORBLIND_SAFE = ['#0173B2', '#DE8F05', '#029E73', '#D55E00', '#CC78BC', '#CA9161', '#FBAFE4', '#949494']
# 本方法高亮色（对齐老板偏好）
OURS_COLOR = '#00D4AA'  # 青绿
BASELINE_COLOR = '#949494'  # 灰
```

### 单栏图（3.5 inch）

```python
fig, ax = plt.subplots(figsize=(3.5, 2.5))
# 去掉上右边框
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
```

### 多面板拼图

```python
fig, axes = plt.subplots(2, 3, figsize=(7.16, 3.5))
for i, ax in enumerate(axes.flat):
    # 每个子图独立绘制
    pass
plt.tight_layout(pad=0.3, w_pad=0.2, h_pad=0.2)
```

### 误差条与统计

- 多种子结果必须带误差条（标准差或 95% 置信区间）
- 消融对比用配对 t 检验，显著差异标 *（p<0.05）或 **（p<0.01）
- 对齐老板偏好：多种子统计 + 配对 t 检验，诚实报告 negative results

### 导出格式

- 矢量优先：PDF（LaTeX 直接引用）或 SVG
- 位图备选：PNG 300dpi
- 不用 JPG（有损压缩，图内文字会糊）

## 架构图绘制规范（drawio-academic）

### 输出文件包

每个架构图交付三件套：
- `.drawio`：可编辑 XML 源
- `.svg`：矢量预览，LaTeX 可直接引用
- `.arch.json`：结构化元数据（模块名、连接关系、数据维度）

### 绘制流程

1. 先用文字列出模块清单与数据流（输入→模块A→模块B→输出）
2. 用 drawio-academic 的 YAML spec 描述（模块名、位置、连接、样式）
3. 生成 .drawio XML
4. 本地导出 SVG（draw.io Desktop CLI 或直接 XML→SVG）
5. 若需 PNG/PDF，用 Desktop CLI 导出

### 样式规范

- 方框圆角，统一线宽（1-2pt）
- 箭头带数据维度标注（如 `H×W×3`）
- 创新模块用高亮色填充，传统模块用浅灰
- 字号 ≥8pt（架构图通常比数据图稍大）

## 图质量审计清单（QC）

画完图后过一遍：

| 检查项 | 标准 |
|--------|------|
| 矢量格式 | 架构图/流程图必须矢量（SVG/PDF），不用位图 |
| 字号 | 所有文字 ≥7pt，缩放后仍可读 |
| 色盲安全 | 不依赖红绿区分，用色盲安全调色板 |
| 自包含图注 | 图注能独立讲清图在说什么，不依赖正文 |
| 轴标签 | 有单位、有量纲、轴范围诚实（不裁剪有利区间） |
| 对比公平 | 本方法与基线同尺度、同数据集、同评估协议 |
| 分辨率 | 矢量或 ≥300dpi 位图 |
| 一致性 | 全文图风格统一（配色、字号、线宽） |

## 执行层说明

本协议提供设计方法论与代码模板。执行时：
- 数据图：我按上述 matplotlib 规范写代码，用 powershell 调 python 执行
- 架构图：我按 drawio-academic 规范生成 .drawio XML + .svg，必要时用 ImageGen 生成示意图
- 图像理解：用 image_understanding 工具审已画好的图，对照 QC 清单找问题

## 与本技能其他 fragment 的衔接

- 画图前先知道画什么 → 配合 `writing-abstract-intro.md`（Fig.1 对应 intro 的 motivation）和 `writing-related-method.md`（方法图对应 method 章节）
- 实验图的数据来自 → `experiment-design-protocol.md` 的实验结果
- 投稿前图质量自查 → `markdown-draft-format-audit.md` 的孤儿图检测
