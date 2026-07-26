# 3DGS GitHub 近期热门新仓库调研报告

> 调研日期：2026-07-26
> 调研范围：GitHub 上 2026 年 7 月新建或近期热度上升的 3D Gaussian Splatting (3DGS) 相关仓库
> 调研方法：GitHub Topics / Trending / `created:>2026-07-01` 搜索 / awesome-list 动态 / 中英文搜索引擎交叉验证
> 说明：所有候选仓库均经实际抓取 GitHub 仓库主页核实，未编造。已知知名仓库（graphdeco-inria/gaussian-splatting、nerfstudio-project/gsplat、threestudio、SplatFact、nerfstudio、Awesome-Gaussian-Skills 本项目等）已排除。

## 一、核心候选仓库清单（按价值与热度排序）

### 1. graphdeco-inria/i3dgs ⭐ 推荐

| 字段 | 内容 |
|---|---|
| 仓库名 | graphdeco-inria/i3dgs |
| 创建/更新 | 2026-07 中旬新建（仅 1 commit）；约 12 天前更新 |
| Star 数 | 74 |
| 简介 | SIGGRAPH'26 论文《Immediate 3D Gaussian Splat Reconstruction of Unordered Input with Global Consistency》官方实现。提出带即时反馈的 3DGS 重建方法，能处理无序图像采集与超大场景；通过快速位置识别驱动匹配、基于聚类的回环闭合与图传播校正、渐进式高斯层级构建，在离线处理时间的一小部分内实现稳健可扩展重建。 |
| 对应论文 | SIGGRAPH Conference Papers 2026；论文 PDF：https://repo-sam.inria.fr/nerphys/i3dgs/i3dgs.pdf （未见 arXiv ID） |
| 作者团队 | Andreas Meuleman, Linus Franke, Boris Zhestiankin, Camille Montemagni, George Drettakis（INRIA GraphDeco + EPFL，即原版 3DGS 团队） |
| 许可证 | Inria Immediate3DGS license（研究评估用途） |
| 是否值得收录 | **强烈推荐**。原班人马继原版 3DGS 之后的最新重度工作，定位"即时无序输入重建 + 大场景 + 全局一致性"，直击 3DGS 落地最大瓶颈（COLMAP 依赖、有序采集、大场景重建耗时）。属于"must-follow"级别。 |
| URL | https://github.com/graphdeco-inria/i3dgs |

### 2. cvg/VIGS-SLAM ⭐ 推荐

| 字段 | 内容 |
|---|---|
| 仓库名 | cvg/VIGS-SLAM |
| 创建/更新 | 2026-07 新建（3 commits）；约 18 天前更新 |
| Star 数 | 31 |
| 简介 | ECCV 2026 论文《VIGS-SLAM: Visual Inertial Gaussian Splatting SLAM》官方实现。给定 RGB 帧序列和 IMU 数据，鲁棒追踪相机轨迹同时重建高保真 3D 高斯地图。提供 iPhone 实时流式 SLAM demo、Docker 镜像、TensorRT 加速。 |
| 对应论文 | ECCV 2026；arXiv:2512.02293；项目页 https://vigs-slam.github.io/ |
| 作者团队 | Zihan Zhu, Wei Zhang, Moyang Li, Norbert Haala, Marc Pollefeys, Daniel Barath（ETH Zürich CVG，Pollefeys 团队） |
| 许可证 | Apache-2.0（部分子模块各有许可） |
| 是否值得收录 | **强烈推荐**。SLAM × 3DGS 融合代表性工作，来自顶尖 CVG 实验室；本项目知识库 SLAM/动态类别应重点收录。代码完整度高（Docker + 预训练权重 + 5 个数据集 eval 脚本）。 |
| URL | https://github.com/cvg/VIGS-SLAM |

### 3. cvsp-lab/MoDE ⭐ 推荐（与本项目 MoE 方向强相关）

| 字段 | 内容 |
|---|---|
| 仓库名 | cvsp-lab/MoDE |
| 创建/更新 | 2026-07 新建（2 commits）；约 16 天前更新 |
| Star 数 | 6 |
| 简介 | IEEE TPAMI 2026 论文《On the Design of Mixture-of-Experts for Dynamic Gaussian Splatting》官方实现。提出 Mixture of Deformation Experts（MoDE）框架，在共享规范高斯表示上联合优化多个变形专家。是 cvsp-lab MoE-GS 系列新成员。 |
| 对应论文 | IEEE TPAMI 2026（已接收）；arXiv:2607.08250（注：仓库 README 仅有 BibTeX key `jinmode2026`，arXiv ID 来自本项目知识库 v0.4.2 收录记录） |
| 作者团队 | In-Hwan Jin, Hyeongju Mun, Joonsoo Kim, Kugjin Yun, Kyeongbo Kong（釜山国立大学 CVSP + 韩国电子通信研究院 ETRI） |
| 许可证 | 见仓库 LICENSE.md |
| 是否值得收录 | **KB 已收录方法条目，仅需补登记代码链接**。本项目知识库已于 2026-07-14（v0.4.2）将 `MoE-GS / MoDE` 作为方法条目收录（arXiv:2607.08250，归入 Dynamic 类别），但条目内未挂 `cvsp-lab/MoDE` 仓库代码链接。本次调研发现其官方代码已上线 → 行动项为「给已有 MoDE 条目补 `[Code](https://github.com/cvsp-lab/MoDE)`」，而非新建条目。 |
| URL | https://github.com/cvsp-lab/MoDE |
| 关联 | 同系列索引：https://github.com/cvsp-lab/MoE-GS-studio |

### 4. adamraudonis/splats4D ⭐ 推荐

| 字段 | 内容 |
|---|---|
| 仓库名 | adamraudonis/splats4D |
| 创建/更新 | 2026-07 新建（15 commits）；约 21 天前更新 |
| Star 数 | 52 |
| 简介 | 定义了 `.splat4d`——一种可流式传输、误差可控的 4D 高斯泼溅文件格式。将一串 antimatter15 `.splat` 帧序列压缩为单个可定位的小文件，每个 splat 每帧每属性都满足用户设定误差界（确定性、编码器每次运行验证）。150 帧 × 336k splat 默认压缩比 19.4×。 |
| 对应论文 | 非学术论文，工程标准/格式规范工作；有 FORMAT.md 规范与 BENCHMARKS.md |
| 许可证 | MIT |
| 是否值得收录 | **推荐**。4DGS 流式传输与压缩的方向标杆级别工程实现（H.265 风格 GOP + 误差有界量化 + HTTP Range 寻道）。PyPI 包 `splats4d` 可直接使用。与 3dgs-compression-deploy 技能方向强相关。 |
| URL | https://github.com/adamraudonis/splats4D |

### 5. awesome-4dgs/awesome-4dgs（awesome-list 新建动态）⭐ 推荐

| 字段 | 内容 |
|---|---|
| 仓库名 | awesome-4dgs/awesome-4dgs |
| 创建/更新 | 2026-07 新建（31 commits）；13 小时前更新（活跃维护中） |
| Star 数 | 56 |
| 简介 | 4D Gaussian Splatting 方向的 curated list，整理论文、项目、代码、数据集。 |
| 对应论文 | 非论文，awesome-list |
| 是否值得收录 | **推荐**。本项目已有的 4DGS/动态类别可与之交叉核对，作为知识库补全的种子源。新建不足一月已 56 stars，说明 4DGS 子方向热度上升。 |
| URL | https://github.com/awesome-4dgs/awesome-4dgs |

### 6. Re-qi/ReSplat_Editor

| 字段 | 内容 |
|---|---|
| 仓库名 | Re-qi/ReSplat_Editor |
| 创建/更新 | 2026-07 新建（702 commits，迭代频繁）；昨天更新 |
| Star 数 | 27 |
| 简介 | 基于 SuperSplat v2.27.0 重构的浏览器端 3D 高斯点云编辑器，借鉴 Blender 与 Unreal Engine 交互逻辑。新增包裹体系统（Wrapper Sphere/Box/Blocking Plane）、点云组（类 Blender 顶点组）、复制/分离/合并、透明度/尺寸选择工具、低精度高斯修复、关键帧动画时间轴。中文作者，9 语种 i18n。 |
| 对应论文 | 非论文，工具项目（SuperSplat fork） |
| 许可证 | MIT |
| 是否值得收录 | 可收录（工具类）。本项目已收录 SuperSplat，ReSplat 是其增强 fork，特色是"DCC 风格交互 + 中文优化"，对中文用户友好。 |
| URL | https://github.com/Re-qi/ReSplat_Editor |

### 7. arloopa/UnitySplats

| 字段 | 内容 |
|---|---|
| 仓库名 | arloopa/UnitySplats |
| 创建/更新 | 2026-07 新建；约 3 天前更新 |
| Star 数 | 16 |
| 简介 | 跨平台 Unity 6 包，用于导入、加载、渲染 3D 高斯泼溅。支持 Built-in / URP / HDRP 三大管线，支持 PLY / SOG / SPZ / GLB 等多格式。 |
| 对应论文 | 非论文，引擎插件 |
| 是否值得收录 | 可收录（引擎生态）。本项目"Viewers & Game Engine Support"类别已收录 aras-p/UnityGaussianSplatting、xverse XV3DGS-UEPlugin 等；UnitySplats 是更新更全的 Unity 6 替代方案，多格式+多管线支持是亮点。 |
| URL | https://github.com/arloopa/UnitySplats |

### 8. willjim/RemyMaker

| 字段 | 内容 |
|---|---|
| 仓库名 | willjim/RemyMaker |
| 创建/更新 | 2026-07 新建；约 13 小时前更新 |
| Star 数 | 12 |
| 简介 | 面向桌面与移动平台的 3DGS 特效与相机运动工具，JavaScript 实现。 |
| 对应论文 | 非论文，应用工具 |
| 是否值得收录 | 可选收录（应用工具类）。娱乐/创作向应用，星标偏低。 |
| URL | https://github.com/willjim/RemyMaker |

### 9. Rouf0x/splatfpv

| 字段 | 内容 |
|---|---|
| 仓库名 | Rouf0x/splatfpv |
| 创建/更新 | 2026-07 新建；约 5 小时前更新 |
| Star 数 | 15 |
| 简介 | 浏览器端 FPV 穿越机模拟器，可在 3DGS 场景中飞行穿越。JavaScript 实现。 |
| 对应论文 | 非论文，应用工具 |
| 是否值得收录 | 可选收录（应用演示类）。展示 3DGS 在交互式体验方向的边界，可用于项目 demo 灵感。 |
| URL | https://github.com/Rouf0x/splatfpv |

### 10. YikunWang-EEE/LAGS_low_altitude_gaussian_splatting

| 字段 | 内容 |
|---|---|
| 仓库名 | YikunWang-EEE/LAGS_low_altitude_gaussian_splatting |
| 创建/更新 | 2026-07 新建；约 7 天前更新 |
| Star 数 | 8 |
| 简介 | 提出面向低空高斯泼溅系统的统一图学习框架（Low-Altitude Gaussian Splatting）。 |
| 对应论文 | 配套论文代码（README 描述为论文配套实现，未见明确 arXiv ID） |
| 是否值得收录 | 可选收录（低空/无人机场景）。与本项目工业 AI / 政府数据采集的低空方向有潜在结合点，但仓库星标较低、信息较少，建议观望。 |
| URL | https://github.com/YikunWang-EEE/LAGS_low_altitude_gaussian_splatting |

### 附：中文搜索补充发现（未深入验证）

- **shining1311/Gaussian-Splatter-Effects-Renderer**：基于 Edge 浏览器的 `.ply` 高斯泼溅模型特效动画生成器，2026-07-23 更新，Windows EXE 形态（GaussianSplatterEffectsStudio.exe）。与 RemyMaker 同属特效创作工具类，可作为同类参考。URL: https://github.com/shining1311/Gaussian-Splatter-Effects-Renderer

---

## 二、awesome-list 近期动态

### MrNeRF/awesome-3D-gaussian-splatting（持续活跃）

| 字段 | 内容 |
|---|---|
| 仓库名 | MrNeRF/awesome-3D-gaussian-splatting |
| 最新 Star | 8.8k（fork 536，commit 1162） |
| 最近更新 | 2026-07-25 |
| 动态要点 | 仍是最活跃的 3DGS awesome-list。近期 Tools & Utilities 新增条目（与本项目对照参考）：<br>- **splatreg**（Archerkattri/splatreg）：pip 可装的 splat 配准工具，对齐合并两个 3DGS 扫描到同一 SE(3)/Sim(3) 帧<br>- **AURA**（Archerkattri/aura）：3DGS 资产的逐 splat 置信度校准，导出 glTF/OpenUSD/SPZ<br>- **GaussForge**（3dgscloud/GaussForge）：C++/WASM 实现的 PLY/SPZ/SPLAT/KSPLAT 转换<br>- **GSCodecStudio**（JasonLSC/GSCodec_Studio）：压缩与动态 splatting 框架<br>Viewers 类新增 vkgs、3DGS.cpp 等已收录条目 |
| URL | https://github.com/MrNeRF/awesome-3D-gaussian-splatting |

### Awesome3DGS/3D-Gaussian-Splatting-Papers（中文社区 awesome-list）

- Star 3.1k，最近更新 2026-06-12（一个月前），可作为中文论文索引补充源。
- URL: https://github.com/Awesome3DGS/3D-Gaussian-Splatting-Papers

---

## 三、未在 7 月新建但值得补登的高相关仓库（topics 页面近期活跃）

以下为 GitHub `3d-gaussian-splatting` topic 页面最近一个月有更新、本项目知识库可考虑交叉核对的现存仓库：

| 仓库 | Star | 最近更新 | 说明 |
|---|---|---|---|
| playcanvas/supersplat | 9.7k | 2026-07-21 | 浏览器端 3DGS 编辑器，业界标杆（ReSplat 即其 fork） |
| playcanvas/splat-transform | 1.3k | 2026-07-23 | CLI 工具与库，3DGS 处理与格式转换 |
| manycoretech/aholo-viewer | 931 | 2026-07-23 | 高性能 3DGS 渲染器，支持 3DGS-LoD |
| playcanvas/supersplat-viewer | 520 | 2026-07-20 | 用户友好高性能 viewer |
| playcanvas/model-viewer | 697 | 2026-07-14 | 支持 glTF 与 3DGS 的模型查看器 |

> 这五个均为 playcanvas/manycoretech 系的工业级工具链，活跃维护中，建议确认本项目是否已收录。

---

## 四、收录优先级建议

按对本项目知识库（Awesome-Gaussian-Skills）价值排序：

1. **必收（学术高价值 + 团队权威）**
   - `graphdeco-inria/i3dgs` —— SIGGRAPH'26 原班人马新作，重建/大场景方向
   - `cvg/VIGS-SLAM` —— ECCV'26 SLAM×3DGS，ETH Pollefeys 团队
   - `cvsp-lab/MoDE` —— TPAMI 2026，MoE-for-Dynamic-GS，直接对标本项目 MoE 路线

2. **建议收（工程标准 + 方向热度）**
   - `adamraudonis/splats4D` —— 4DGS 流式格式标准，与 compression-deploy 技能呼应
   - `awesome-4dgs/awesome-4dgs` —— 4DGS 子方向新 awesome-list，作种子源

3. **可选收（工具/应用类）**
   - `Re-qi/ReSplat_Editor` —— 中文优化 DCC 风格编辑器
   - `arloopa/UnitySplats` —— Unity 6 多格式多管线插件
   - `willjim/RemyMaker`、`Rouf0x/splatfpv` —— 创作与交互应用

4. **观望**
   - `YikunWang-EEE/LAGS_low_altitude_gaussian_splatting` —— 低空场景，信息不足

---

## 五、与本项目知识库交叉核对结果

> 核对方法：对 `references/`（含 `methods-core.md` / `methods-semantic-editing.md` / `methods-systems-apps.md` / `3dgs-methods-overview.md`）及 `changelog/` 执行关键字 + 仓库 URL 检索，判断每个候选是「新建条目」还是「补全已有条目」。核对时间：2026-07-26。

| # | 候选仓库 | KB 中方法条目 | KB 中代码链接 | 行动项 |
|---|---|---|---|---|
| 1 | `graphdeco-inria/i3dgs` | ❌ 不存在 | ❌ 无 | **新建方法条目**。归入 Foundation / Surface / 大场景重建类，SIGGRAPH'26；arXiv ID 待补（仓库仅给 PDF link）。 |
| 2 | `cvg/VIGS-SLAM` | ❌ 不存在 | ❌ 无 | **新建方法条目**。归入 SLAM 类，ECCV'26，arXiv:2512.02293；ETH CVG Pollefeys 团队。 |
| 3 | `cvsp-lab/MoDE` | ✅ 已有（v0.4.2 / 2026-07-14 / arXiv:2607.08250 / Dynamic 类） | ❌ 缺代码链接 | **补登记代码链接**。给已有 `MoE-GS / MoDE` 条目追加 `[Code](https://github.com/cvsp-lab/MoDE)`，非新建。 |
| 4 | `adamraudonis/splats4D` | ❌ 非方法（格式/工具） | — | 暂不进方法库。建议记入 `3dgs-compression-deploy` 技能参考清单（4DGS 流式格式标准）。 |
| 5 | `awesome-4dgs/awesome-4dgs` | ❌ awesome-list | — | 不进方法库。作为 4DGS / Dynamic 类别的交叉核对种子源。 |
| 6 | `Re-qi/ReSplat_Editor` | ❌ 工具（SuperSplat fork） | — | 工具类。若 KB 设有 Tools/Viewer 区则可补；否则记入 Viewers 类参考。 |
| 7 | `arloopa/UnitySplats` | ❌ 引擎插件 | — | 同上，归 Viewers & Game Engine Support 类。 |
| 8–10 | RemyMaker / splatfpv / LAGS | ❌ 应用 / 低空场景 | — | 观望，暂不进库。 |

**净结论**：本次调研对应到本项目知识库的「真实新增动作」为 **2 条新建方法条目 + 1 条代码链接补全**（即 i3dgs、VIGS-SLAM 新建 + MoDE 补链），其余为工具/参考源性质，按 KB 结构可选登记。是否执行需你确认——涉及 `references/methods-*.md` 改动与版本/changelog 记录（建议 v0.5.1 patch）。

---

## 六、调研局限性说明

1. GitHub Trending 周榜页面因体量过大被截断（53733+ bytes truncated），未能逐条筛全；已通过 `created:>2026-07-01` 搜索的 244 条结果按 star 降序补全，前 11 条已逐一核实。
2. MoDE 的 arXiv ID 已通过本项目 KB 收录记录补全（2607.08250）；仅 `graphdeco-inria/i3dgs` 仍缺 arXiv ID（仓库仅给 PDF link），新建条目前建议在 arXiv.org 搜索 "Immediate 3D Gaussian Splat Reconstruction" 补全。
3. 搜索第 2-25 页（约 230 余条 7 月新建仓库）多为 stars<5 的个人项目/课程作业，已按"5-8 个候选"目标聚焦头部项目。
4. 报告未涵盖 CVPR 2026（6 月）已发表的论文仓库（如 Faster-GS、3DGEER 等），因焦点为 7 月新建仓库；如需 CVPR'26 全量补登可另行调研。