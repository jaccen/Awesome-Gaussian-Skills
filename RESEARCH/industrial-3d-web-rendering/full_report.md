
# 工业智能制造Web平台3D模型渲染能力调研报告

> 调研日期：2026-05-09 | 调研范围：3DGS/GlTF/GLB/CAD/IFC多格式Web渲染方案

---

## 一、开源3DGS Web查看器对比

### 1.1 方案总览

| 方案 | GitHub | Stars | 语言 | 最新版本 | 最后活跃 | 许可证 |
|------|--------|-------|------|---------|---------|--------|
| antimatter15/splat | [链接](https://github.com/antimatter15/splat) | 3,000 | JS | 无版本tag | 2026-04 | MIT |
| PlayCanvas Engine | [链接](https://github.com/playcanvas/engine) | 15,400 | JS/TS | v2.18.1 (2026-04) | 2026-04-28 | MIT |
| SuperSplat | [链接](https://github.com/playcanvas/supersplat) | 5,500 | TS | 无tag | 2026-05-03 | MIT |
| GaussianSplats3D | [链接](https://github.com/mkkellogg/GaussianSplats3D) | 2,700 | JS | v0.4.7 (2025-01) | 2025-01 (停更) | MIT |
| gsplat.js | [链接](https://github.com/huggingface/gsplat) | ~1,500 | JS | 活跃 | 2026-04 | MIT |
| web-splat | [链接](https://github.com/KeKsBoTer/web-splat) | ~1,800 | Rust/WGPU | 无tag | 2025-09 | MIT |
| Forge (World Labs) | [链接](https://github.com/huggingface/Forge) | 新项目 | JS | 活跃 | 2025-06起 | 开源 |
| CesiumJS 3DGS | [链接](https://github.com/CesiumGS/cesium) | 13,000+ | JS | v1.136+ (2025) | 持续活跃 | Apache-2.0 |

### 1.2 逐方案详细评估

#### (1) antimatter15/splat — 纯JS/WebGL标杆

- **GitHub**: https://github.com/antimatter15/splat | 3k stars, 322 forks
- **渲染技术**: 纯WebGL 1.0实现，零外部依赖，单文件即可运行
- **文件格式**: .splat（自研紧凑格式）、.ply（标准3DGS输出，支持拖拽转换）
- **浏览器兼容性**: WebGL 1.0全兼容（含Safari M1），不依赖WebGL 2.0/WebGPU
- **交互能力**: 鼠标旋转/缩放/平移、键盘漫游、触摸手势、预设相机切换、URL参数加载
- **性能**: CPU WebWorker异步排序（~4fps排序 vs 60fps渲染），渐进式加载，~1M splat可流畅运行
- **局限性**: 不支持球谐函数（view-dependent shading）、大场景排序瓶颈、无测量/标注功能
- **社区活跃度**: 51 commits，已基本稳定；作者推荐新项目Spark作为替代
- **适用场景**: 快速原型验证、轻量级嵌入、低门槛Demo展示
- **工业适配**: ★☆☆☆☆ — 缺乏工业级功能（测量、标注、LOD、协同）

#### (2) PlayCanvas Engine — First-class 3DGS支持

- **GitHub**: https://github.com/playcanvas/engine | 15.4k stars, 1.8k forks
- **渲染技术**: WebGL 2.0 + WebGPU双后端，First-class原生3DGS支持
- **文件格式**: .ply, .splat, **.sog**（Splat-Optimized Gaussians，PlayCanvas自研，压缩率~95%，1GB→42MB）、SPZ压缩格式
- **SOG格式**: 空间有序高斯排列，流式加载+LOD支持，称为"3DGS的WebP时刻"
- **转换工具**: splat-transform CLI（Node.js），支持ply/splat→sog/spz转换
- **浏览器兼容性**: WebGL 2.0（主流浏览器）+ WebGPU（Chrome 113+）
- **交互能力**: 完整游戏引擎级交互（旋转/缩放/碰撞检测/导航/物理引擎ammo.js）
- **性能**: 流式LOD加载，GPU加速排序，SOG压缩大幅降低传输带宽
- **生态**: React渲染器(@playcanvas/react)、Web Components、VS Code扩展
- **企业用户**: Disney, BMW, Samsung, Snap, Zeptolab等
- **社区活跃度**: 12,955 commits, 438 releases, 341 watchers，持续高频更新
- **工业适配**: ★★★★☆ — 完整引擎能力+3DGS原生支持，SOG流式加载适合大规模场景

#### (3) SuperSplat — PlayCanvas的3DGS编辑器

- **GitHub**: https://github.com/playcanvas/supersplat | 5.5k stars
- **在线地址**: https://superspl.at/editor
- **定位**: 3DGS检查、编辑、优化、发布一体化工具
- **核心功能**:
  - 高斯体选择/删除/移动/克隆/重新着色
  - 场景分割（按区域/颜色/深度分割）
  - 行走模式（Walk Mode，第一人称漫游）
  - 流式LOD（Streaming LOD，2026新特性）
  - 可下载Splat、许可证和社交链接
  - 便捷上传（直接拖拽或URL导入）
- **文件格式**: .ply, .splat, .sog, .spz
- **技术栈**: PlayCanvas Engine + TypeScript + PCUI组件库
- **社区活跃度**: 高频更新，2026年多次发布新特性
- **工业适配**: ★★★☆☆ — 编辑能力强大但偏重建场景，工业测量功能缺失

#### (4) GaussianSplats3D — Three.js生态3DGS插件

- **GitHub**: https://github.com/mkkellogg/GaussianSplats3D | 2.7k stars, 360 forks
- **渲染技术**: 基于Three.js的3DGS渲染器，WebGL后端
- **文件格式**: .ply, .splat, .ksplat（自研压缩格式，支持3级压缩）
- **特色功能**:
  - Three.js场景无缝集成（DropInViewer模式）
  - 球谐函数支持（0/1/2阶，view-dependent效果）
  - WASM SIMD加速排序 + 部分GPU加速排序
  - 内置WebXR支持（VR/AR）
  - 八叉树剔除优化
  - 渐进式加载
- **局限性**: **已停止活跃开发**（作者明确声明），大场景排序瓶颈，移动端性能差
- **NPM**: `@mkkellogg/gaussian-splats-3d`，可npm安装
- **社区活跃度**: 576 commits, 34 releases，但2025-01后停更；作者推荐Spark替代
- **工业适配**: ★★☆☆☆ — Three.js生态优势明显但项目已停更，不建议新项目采用

#### (5) gsplat.js — 轻量级3DGS渲染库

- **GitHub**: https://github.com/huggingface/gsplat（huggingface生态）
- **定位**: 类似Three.js但专为Gaussian Splatting设计的轻量级JS库
- **特色**: API风格类似Three.js（Scene/Camera/Renderer概念），低学习成本
- **文件格式**: .ply, .splat
- **NPM**: `npm install gsplat`
- **社区活跃度**: 社区教程丰富（CSDN/GitCode大量教程），持续更新
- **工业适配**: ★★☆☆☆ — 适合快速原型和教学Demo，工业级功能不足

#### (6) web-splat (KeKsBoTer) — WebGPU+Rust方案

- **GitHub**: https://github.com/KeKsBoTer/web-splat
- **渲染技术**: **纯WebGPU + Rust/WGPU实现**，GPU排序（无CPU瓶颈）
- **性能优势**: WebGPU Compute Shader实现GPU并行排序，理论上可突破CPU排序瓶颈
- **局限性**: 仅Chrome/Edge支持WebGPU，Firefox/Safari不支持；176 commits，2025-09后未更新
- **工业适配**: ★★☆☆☆ — 技术前瞻性强但兼容性和维护状态堪忧

#### (7) Forge (World Labs / 李飞飞团队) — 新一代3DGS Web渲染器

- **发布时间**: 2025年6月开源
- **定位**: Three.js原生插件，将3DGS从实验室带入浏览器
- **特色**: World Labs团队维护，活跃开发中，集成了先进压缩和渲染算法
- **工业适配**: ★★★☆☆ — 新项目待成熟，生态尚未完善

#### (8) CesiumJS — 地理空间+3DGS融合

- **GitHub**: https://github.com/CesiumGS/cesium | 13k+ stars
- **3DGS进展**:
  - v1.131（2025）: 首次支持SPZ压缩编码的高斯点云3D Tiles
  - v1.133（2025）: 在glTF草案中加入3DGS扩展
  - Cesium for Unreal: 支持带LOD的3D Gaussian Splat tilesets
- **优势**: 地理坐标系统、大规模流式加载（3D Tiles标准）、地球级场景管理
- **工业适配**: ★★★★★ — 数字孪生/智慧城市场景首选，GIS+3DGS深度融合

### 1.3 3DGS查看器综合评分

| 维度 | antimatter15/splat | PlayCanvas | SuperSplat | GaussianSplats3D | gsplat.js | CesiumJS |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| 渲染性能 | ★★★ | ★★★★★ | ★★★★ | ★★★ | ★★★ | ★★★★★ |
| 浏览器兼容 | ★★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★ |
| 格式支持 | ★★ | ★★★★★ | ★★★★★ | ★★★★ | ★★★ | ★★★★ |
| 交互能力 | ★★ | ★★★★★ | ★★★★ | ★★★ | ★★ | ★★★★ |
| 工业测量/标注 | ☆ | ★★★ | ★★ | ★ | ☆ | ★★★★★ |
| 大规模LOD | ☆ | ★★★★★ | ★★★★ | ★★ | ☆ | ★★★★★ |
| 社区活跃度 | ★★ | ★★★★★ | ★★★★★ | ★★ | ★★★ | ★★★★★ |
| 集成难度 | ★★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★ |

---

## 二、3D模型Web渲染引擎对比

### 2.1 方案总览

| 引擎 | GitHub | Stars | 最后版本 | 维护方 | WebGPU | 许可证 |
|------|--------|-------|---------|--------|--------|--------|
| Three.js | [链接](https://github.com/mrdoob/three.js) | 112,000 | r170+ (2026-04) | 社区 | WebGPURenderer | MIT |
| Babylon.js | [链接](https://github.com/BabylonJS/Babylon.js) | 25,500 | v9.6.2 (2026-05) | 微软 | WebGPUEngine | Apache-2.0 |
| PlayCanvas Engine | [链接](https://github.com/playcanvas/engine) | 15,400 | v2.18.1 (2026-04) | PlayCanvas Inc. | WebGPU后端 | MIT |
| Model Viewer | [链接](https://github.com/google/model-viewer) | 8,100 | v4.2.0 (2026-03) | Google | 不支持(WebGL) | Apache-2.0 |
| xeokit | [链接](https://github.com/xeokit/xeokit-sdk) | 897 | v2.x | xeolabs/Creoox | 不支持 | AGPLv3/MIT |

### 2.2 逐引擎详细评估

#### (1) Three.js — 最大生态

- **GitHub**: https://github.com/mrdoob/three.js | **112k stars**, 社区最大
- **WebGPU**: WebGPURenderer已在2025-2026实现架构级升级，支持premultiplied alpha、Compute Shader等；但仍以WebGL为主力
- **工业场景适配**:
  - PBR渲染: 标准 MeshStandardMaterial/MeshPhysicalMaterial，支持glTF PBR扩展
  - CAD格式: 无原生支持，需OCCT转换
  - 大模型加载: Draco压缩、glTF分块、InstancedMesh，但不内置LOD流式管线
  - 3DGS: 需第三方插件（GaussianSplats3D已停更 → 推荐Spark/Forge）
  - VR/AR: WebXR支持（通过three/examples/jsm/renderers/webxr）
- **优势**: 14,222个GitHub关联仓库，海量社区资源，学习曲线最平缓
- **劣势**: 非完整引擎，需自行组装功能栈；大场景管理能力偏弱
- **工业适配**: ★★★☆☆ — 通用性强但工业级能力需大量二次开发

#### (2) Babylon.js — 微软工业级引擎

- **GitHub**: https://github.com/BabylonJS/Babylon.js | **25.5k stars**, 3.6k forks
- **WebGPU**: **完整WebGPU Engine后端**，支持Compute Shader、Storage Buffer等全部特性；从v6.0起全面支持
- **工业场景适配**:
  - PBR渲染: 全功能PBR管线（ClearCoat、Sheen、Subsurface、Anisotropy、Iridescence），glTF 2.0 PBR完整实现
  - CAD格式: glTF/GLB完整支持；无原生STEP/IGES支持但扩展性好
  - 大模型加载: 内置LOD管理、SceneOptimizer、增量加载、Visible/Shadow-only mesh优化
  - 3DGS: 社区已有3DGS插件，非原生内置但架构可扩展
  - VR/AR: 完整WebXR支持（XR Experience Helper）
  - 物理引擎: 内置Havok/Ammo.js/ Cannon.js集成
- **优势**:
  - TypeScript原生（87% TS），类型安全
  - Node Material Editor（可视化着色器编辑）
  - Inspector（运行时调试工具）
  - Serialization（完整场景序列化）
  - 47,316 commits, 627 releases, 523 watchers — 持续高频维护
  - 微软Azure/GitHub Copilot等企业级支撑
- **劣势**: 学习曲线较陡；社区规模不及Three.js；中文资源相对少
- **工业适配**: ★★★★★ — 完整引擎能力+PBR+物理+WebGPU，工业场景首选之一

#### (3) PlayCanvas Engine — 游戏+3DGS双修

- **GitHub**: https://github.com/playcanvas/engine | **15.4k stars**
- **WebGPU**: WebGPU后端已实现，与WebGL 2.0双后端
- **工业场景适配**:
  - 3DGS: First-class原生支持（唯一宣称"first-class"的主流引擎）
  - PBR渲染: 标准PBR管线，glTF 2.0完整支持
  - 大模型: SOG格式流式加载+LOD
  - 物理引擎: ammo.js集成
  - XR: WebXR支持
- **优势**: 3DGS生态最完善（SOG压缩+SuperSplat编辑器+splat-transform工具链）；轻量高性能
- **劣势**: CAD/BIM支持弱；企业级文档不如Babylon.js
- **工业适配**: ★★★★☆ — 3DGS场景首选引擎，但纯CAD/BIM场景需补充

#### (4) Google Model Viewer — 电商/产品展示

- **GitHub**: https://github.com/google/model-viewer | **8.1k stars**
- **定位**: 声明式3D模型展示Web Component，面向电商产品展示
- **格式**: glTF/GLB（含DRACO压缩、KHR扩展）
- **特色**: 零代码嵌入（`<model-viewer src="model.glb">`），AR Quick Look，环境光照
- **WebGPU**: 不支持（仅WebGL）
- **工业适配**: ★☆☆☆☆ — 仅适合简单产品展示，无编辑/测量/标注能力

#### (5) xeokit — BIM/IFC专用

- **GitHub**: https://github.com/xeokit/xeokit-sdk | **897 stars**, 326 forks
- **定位**: AEC（建筑/工程/施工）行业专用3D BIM查看SDK
- **核心技术**:
  - 纯WebGL，双精度浮点坐标（full double precision）
  - 真实世界坐标系统
  - 专有二进制格式.xkt（IFC→.xkt转换，压缩率>90%）
- **格式支持**:
  - IFC2x3 / IFC4（通过CLI转换工具）
  - glTF/GLB
  - .xkt（专有高性能格式）
  - LAS/LAZ点云
- **核心功能**:
  - 2D/3D混合查看模式
  - 渐进式LOD加载
  - BCF（BIM Collaboration Format）视点管理
  - 模型属性查询/对象选择/隔离/透明化
  - 多模型同时加载对比
  - 自定义CSS样式和语言本地化
- **BIM Viewer**: https://github.com/xeokit/xeokit-bim-viewer（完整查看器UI）
- **社区活跃度**: 371 branches, 251 tags；有维护但更新频率较低；AGPLv3许可（商业需注意）
- **工业适配**: ★★★★★ — BIM/IFC场景唯一专业级方案

### 2.3 渲染引擎综合对比

| 维度 | Three.js | Babylon.js | PlayCanvas | Model Viewer | xeokit |
|------|:---:|:---:|:---:|:---:|:---:|
| 工业场景适配 | ★★★ | ★★★★★ | ★★★★ | ★ | ★★★★★(BIM) |
| 大模型加载 | ★★★ | ★★★★★ | ★★★★ | ★★ | ★★★★★ |
| CAD格式支持 | ★★ | ★★★ | ★★ | ★ | ★★★★ |
| PBR渲染质量 | ★★★★ | ★★★★★ | ★★★★ | ★★★ | ★★★ |
| WebGPU成熟度 | ★★★ | ★★★★★ | ★★★★ | ☆ | ☆ |
| 3DGS原生支持 | ★★ | ★★ | ★★★★★ | ☆ | ☆ |
| VR/AR | ★★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★ |
| 社区规模 | ★★★★★ | ★★★★ | ★★★★ | ★★★ | ★★ |
| 学习曲线 | ★★★★★(易) | ★★★(中) | ★★★★(易) | ★★★★★(易) | ★★(难) |

---

## 三、模型格式支持方案

### 3.1 GLTF/GLB — 直接加载

GLTF/GLB是Web 3D的事实标准，所有主流引擎均原生支持。

| 方案 | 加载方式 | Draco压缩 | 扩展支持 | 备注 |
|------|---------|-----------|---------|------|
| Three.js | GLTFLoader | ✅ | KHR全套 | 最成熟 |
| Babylon.js | SceneLoader | ✅ | KHR全套 | 内置glTF 2.0完整实现 |
| PlayCanvas | AssetRegistry | ✅ | 基础扩展 | glTF 2.0 + Basis纹理 |
| Model Viewer | 声明式标签 | ✅ | KHR全套 | 零代码 |
| xeokit | GLTFLoader | ✅ | 部分 | 偏BIM |

**推荐管线**: 原始模型 → glTF导出（Blender/CAD插件） → Draco压缩 → Web加载

### 3.2 3DGS (.ply/.splat/.sog) — 转换与渲染

| 格式 | 描述 | 典型体积 | Web加载 | 推荐工具 |
|------|------|---------|---------|---------|
| .ply | 3DGS标准输出（INRIA） | 100MB-1GB+ | 需转换 | antimatter15/splat（JS端转换） |
| .splat | 紧凑二进制格式 | ~50% of .ply | 直接加载 | antimatter15/splat, gsplat.js |
| .ksplat | GaussianSplats3D压缩格式 | ~30% of .ply | GaussianSplats3D | 已停更 |
| .sog | PlayCanvas SOG格式 | ~5% of .ply（95%压缩） | PlayCanvas Engine | splat-transform CLI |
| .spz | SPZ压缩格式 | 高压缩率 | CesiumJS, PlayCanvas | splat-transform CLI |

**推荐管线**:
```
3DGS训练(.ply) → splat-transform CLI → .sog(在线分发) + .spz(Cesium)
                              ↓
              PlayCanvas Engine加载.sog / CesiumJS加载SPZ 3D Tiles
```

**格式转换工具汇总**:
- [splat-transform](https://github.com/playcanvas/splat-transform): PlayCanvas官方CLI，ply/splat→sog/spz
- [3dgsconverter](https://github.com/francescofugazzi/3dgsconverter): N-to-N全格式转换（ply/ksplat/sog/spz/splat/parquet），GPU加速过滤
- antimatter15/splat: 浏览器端.ply→.splat拖拽转换

### 3.3 CAD格式 (STEP/IGES/SolidWorks) — 在线预览

CAD模型（STEP AP203/AP214、IGES、SolidWorks .sldprt/.sldasm）无法直接在Web端渲染，需要几何内核解析→三角化→Web引擎渲染。

| 方案 | GitHub/链接 | 支持格式 | WebAssembly | 渲染方式 | 成熟度 |
|------|------------|---------|-------------|---------|--------|
| **OpenCASCADE.js** | [链接](https://dev.opencascade.org/project/opencascadejs) | STEP, IGES, BRep等20+ | ✅ Emscripten编译 | 自带WebGL Viewer或导出mesh给Three.js | ★★★★★ |
| OCCT + Three.js | 组合方案 | STEP, IGES | ✅ WASM | OCCT解析+三角化 → Three.js渲染 | ★★★★ |
| xeokit (间接) | xeokit-sdk | IFC, glTF | 否 | IFC→.xkt→WebGL | ★★★ |
| HOOPS Web | 商业方案 | 全CAD格式 | ✅ | 商业SDK | ★★★★★(商业) |

**OpenCASCADE.js详细说明**:
- OCCT是CAD/CAM/CAE领域的开源C++几何内核标杆
- OpenCASCADE.js通过Emscripten将OCCT编译为WebAssembly模块
- 支持BRep精确建模、NURBS曲面、STEP/IGES等20+格式读写
- 可直接在浏览器中进行参数化建模、布尔运算、碰撞检测
- 与Three.js/Babylon.js组合：OCCT负责几何解析，渲染引擎负责可视化

**推荐CAD Web预览架构**:
```
STEP/IGES文件 → OpenCASCADE.js(WASM) → BRep拓扑解析 → 三角化
                                                          ↓
                              Three.js/Babylon.js BufferGeometry → PBR渲染
```

### 3.4 IFC/BIM — 专用方案

| 方案 | 格式支持 | 特点 | 许可证 |
|------|---------|------|--------|
| xeokit SDK + BIM Viewer | IFC2x3/IFC4 → .xkt | 双精度坐标、LOD、BCF协作、属性查询 | AGPLv3 |
| OpenCASCADE.js (间接) | IFC via OCCT | 完整BRep解析 | LGPL |
| Three.js + IFC.js | IFC2x3/IFC4 | 纯JS解析，社区驱动 | MIT |
| CesiumJS + 3D Tiles | IFC → 3D Tiles | 地理坐标+大规模流式 | Apache-2.0 |

**推荐**: BIM场景首选xeokit；需与GIS融合选CesiumJS。

---

## 四、工业场景关键需求分析

### 4.1 大规模场景LOD与流式加载

| 方案 | LOD策略 | 流式加载 | 最大场景规模 | 适用格式 |
|------|--------|---------|------------|---------|
| CesiumJS 3D Tiles | 多级LOD（3D Tiles标准） | ✅ HTTP分块流式 | 城市级/地球级 | 3D Tiles(gltf/3DGS/点云) |
| PlayCanvas SOG | 空间有序LOD | ✅ 渐进式 | ~1000万高斯（SOG压缩后） | .sog |
| SuperSplat Streaming LOD | 流式细节层次 | ✅ 2026新特性 | 大型重建场景 | .sog/.spz |
| Babylon.js SceneOptimizer | 自适应LOD | ✅ 增量加载 | 百万级三角面 | glTF |
| xeokit .xkt | 内部LOD结构 | ✅ 渐进式 | 大型BIM模型 | .xkt/.ifc |
| Three.js + LodHelper | 手动LOD | 需自实现 | 依赖实现 | 通用 |

**推荐**: 地理空间大规模场景 → CesiumJS 3D Tiles；3DGS大规模场景 → PlayCanvas SOG；BIM → xeokit。

### 4.2 模型测量与标注

| 能力 | 实现方案 | 成熟度 |
|------|---------|--------|
| 距离测量 | CesiumJS（内置）、xeokit（内置）、Three.js（Raycaster自实现） | ★★★ |
| 截面切割 | xeokit（内置section plane）、CesiumJS（ClippingPlane） | ★★★ |
| 面积/体积 | xeokit（属性计算）、OCCT WASM（精确计算） | ★★★ |
| 文字标注 | xeokit（annotations）、CesiumJS（Entity label）、Three.js（CSS2DRenderer） | ★★★★ |
| 红线批注 | xeokit（BCF视点）、自实现canvas overlay | ★★★ |
| 协同标注 | xeokit（BCF协作）、自定义WebSocket方案 | ★★★ |

**关键发现**: 基于Three.js的3DGS查看器[spz-viewer](https://github.com/topics/spz)已实现测量、标注、预设LOD等功能。

### 4.3 多模型对齐与装配

| 方案 | 对齐方式 | 装配能力 |
|------|---------|---------|
| Three.js | TransformControls + 手动对齐 | 需自实现约束系统 |
| Babylon.js | Transformer/Node parenting | 基础层级管理 |
| PlayCanvas | ECS架构 + 约束组件 | 游戏级组件系统 |
| xeokit | 坐标系统一 + 模型叠加 | 多IFC模型对齐 |

**工业装配建议**: 使用Babylon.js/Three.js实现基础对齐；复杂装配约束需自研或引入商业SDK。

### 4.4 VR/AR交互支持

| 方案 | VR | AR | 成熟度 |
|------|:---:|:---:|:---:|
| Three.js | ✅ WebXR | ✅ WebXR | ★★★★ |
| Babylon.js | ✅ WebXR Experience Helper | ✅ WebXR | ★★★★★ |
| PlayCanvas | ✅ WebXR | ✅ WebXR | ★★★★ |
| Model Viewer | ✅ 声明式 | ✅ AR Quick Look | ★★★★ |
| CesiumJS | — | — | ★★ |
| xeokit | — | — | ★ |

**推荐**: VR/AR场景首选Babylon.js（XR Experience Helper开箱即用）。

### 4.5 协同查看

| 方案 | 实现方式 | 成熟度 |
|------|---------|--------|
| 自建WebSocket + 状态同步 | Three.js/Babylon.js + Socket.io/WS | ★★★（需自实现） |
| xeokit BCF协作 | BCF v2/v3视点管理 | ★★★★（BIM标准） |
| PlayCanvas Editor多人 | 实时协作编辑 | ★★★（游戏协作） |
| 商业方案（如ShapeDiver） | 云端参数化+协作 | ★★★★★（付费） |

---

## 五、综合推荐方案

### 5.1 面向工业智能制造Web平台的推荐架构

```
┌─────────────────────────────────────────────────┐
│              工业智能制造Web平台                    │
├─────────────────────────────────────────────────┤
│  统一3D查看/交互层                                │
│  ├── GLTF/GLB模型 → Babylon.js / PlayCanvas      │
│  ├── 3DGS场景  → PlayCanvas Engine (.sog流式)     │
│  ├── CAD模型   → OpenCASCADE.js → Babylon.js     │
│  ├── BIM/IFC   → xeokit SDK                      │
│  └── 地理空间  → CesiumJS (3D Tiles + 3DGS)      │
├─────────────────────────────────────────────────┤
│  通用功能层                                       │
│  ├── 测量/标注/截面 → 自建 + xeokit/Cesium基础    │
│  ├── VR/AR           → Babylon.js WebXR          │
│  ├── 协同查看        → WebSocket + 状态同步       │
│  └── 模型格式转换    → splat-transform + OCCT.js  │
├─────────────────────────────────────────────────┤
│  数据管线                                        │
│  ├── CAD→glTF: OCCT.js (WASM)                    │
│  ├── 3DGS→SOG:  splat-transform CLI              │
│  ├── IFC→XKT:   xeokit CLI转换                   │
│  └── 全格式→3D Tiles: Cesium ion                  │
└─────────────────────────────────────────────────┘
```

### 5.2 引擎选型决策矩阵

| 场景 | 推荐引擎 | 理由 |
|------|---------|------|
| 3DGS在线预览（首要需求） | **PlayCanvas Engine** | 唯一first-class 3DGS支持，SOG流式LOD |
| CAD模型在线预览 | **OpenCASCADE.js + Babylon.js** | OCCT几何内核 + Babylon.js PBR渲染 |
| BIM/IFC查看 | **xeokit SDK** | 行业专用，双精度坐标，BCF协作 |
| 地理空间/数字孪生 | **CesiumJS** | 3D Tiles标准，地球级场景，3DGS融合 |
| 通用3D可视化 | **Babylon.js** | 完整引擎+WebGPU+TypeScript+工业级PBR |
| 电商产品3D展示 | **Model Viewer** | 零代码，AR Quick Look |
| 快速原型/Demo | **Three.js + 社区插件** | 最大生态，学习成本最低 |

### 5.3 关键风险与建议

1. **3DGS方案碎片化**: 3DGS Web渲染方案变化快（GaussianSplats3D停更、Forge新星），建议基于PlayCanvas Engine的SOG生态构建，稳定性最高
2. **WebGPU兼容性**: 2026年WebGPU尚未被Firefox/Safari完全支持，建议WebGL 2.0为主、WebGPU为渐进增强
3. **CAD格式复杂性**: STEP/IGES解析需OCCT WASM（~30MB），首次加载慢，建议服务端预处理为glTF
4. **BIM许可证**: xeokit AGPLv3可能限制商业使用，需评估或购买商业许可
5. **大规模场景**: 单一引擎难以覆盖所有场景，建议模块化设计，按格式/场景动态加载对应渲染引擎

---

## 六、参考来源

| 来源 | 类型 | 评级 |
|------|------|------|
| GitHub各项目主页（stars/commits/releases数据直接采集） | A | 权威 |
| PlayCanvas官方博客（2025-2026系列文章） | A | 权威 |
| CesiumJS官方文档和博客 | A | 权威 |
| OpenCASCADE.js官方项目页 | A | 权重 |
| xeokit SDK GitHub及文档 | A | 权威 |
| Babylon.js官方文档 | A | 权威 |
| Google Model Viewer GitHub | A | 权威 |
| 知乎"Cesium-3DGS: 从数据流到架构重生" | B | 技术分析 |
| 知乎"Web端3DGS渲染引擎选型" | B | 实战对比 |
| CSDN各技术教程（gsplat.js/OpenCASCADE.js/SuperSplat） | C | 教程参考 |
| 什么值得买"2025-2026全球Web 3D游戏引擎深度研究报告" | C | 综合分析 |
