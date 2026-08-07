## 设计原则

1. **Skill = 知识注入器**：每个Skill不是空壳wrapper，而是携带783+方法知识库的智能层——自动推荐最优方法、诊断问题、优化参数
2. **Platform = 执行引擎**：Skill不自己造轮子，对接已有开源项目的API/CLI/Web，让专业平台做专业的事
3. **闭环优于单点**：每层必须与相邻层形成数据流闭环，不做孤岛
4. **渐进式融合**：每版本只新增1-2层，确保每层闭环可运行后再推进
5. **Apache-2.0 贯穿**：所有融合项目均采用Apache-2.0或MIT许可证，企业可商用

## 融合路线图

### Phase 1: CAD → 3DGS 执行层 (已完成)

将 [cad-power-animations](https://github.com/gordensun/cad-power-animations) 的参数化 CAD 建模能力融入 `cad-mesh-3dgs` skill，形成可执行的 STEP → 3DGS 管线。

| 融合项 | 状态 | 产出 |
|--------|------|------|
| build123d → STEP → GLB → 3DGS 管线 | 已完成 | `skills/cad-mesh-3dgs/SKILL.md` Section 6 |
| cad2gs_pipeline.py 转换脚本 | 已完成 | `scripts/cad2gs_pipeline.py` |
| Part-Aware 实验场景生成 | 已完成 | `scripts/build_part_aware_scenes.py` |
| CAD 评测基准文档 | 已完成 | `references/experiments.md` + `references/cad-3d.md` 更新 |

**数据流闭环**：
```
build123d Python → STEP → GLB (STEP_topology) →
    cad2gs_pipeline.py → point_cloud.ply + cad_metadata.json →
        训练 3DGS → 评测 (CAD ground truth) → 结果反馈到 skill 知识库
```

### Phase 2: Sidecar 动画 + Web 展示层 (已完成)

将 cad-power-animations 的 Sidecar 动画架构迁移到 3DGS 可视化中。

| 融合项 | 状态 | 产出 |
|--------|------|------|
| 3DGS 渲染过程动画 sidecar | 已完成 | `docs/sidecars/3dgs-render-process.step.js` |
| 方法对比 sidecar | 已完成 | `docs/sidecars/3dgs-method-compare.step.js` |
| 3DGS Viewer (with Effects API) | 已完成 | `docs/3dgs-viewer.js` |

**架构对比**：
```
cad-power-animations:               Awesome-Gaussian-Skills:
  viewer.js (832 LOC)                 3dgs-viewer.js (~300 LOC)
  ├─ Occurrence Wrapper               ├─ Gaussian Group Wrapper
  ├─ Sidecar loader                   ├─ Sidecar loader (same pattern)
  ├─ Effects API                      ├─ Effects API (adapted)
  └─ Param UI auto-gen               └─ Param UI auto-gen (same)

  bicycle.step.js                     3dgs-render-process.step.js
  ├─ manifest (params, features)      ├─ manifest (render phases, parts)
  └─ update(ctx) → effects            └─ update(ctx) → effects
```

### Phase 3: 可扩展融合 (规划中)

| 融合项 | 优先级 | 说明 |
|--------|--------|------|
| CAD 评测基准自动化 | 中 | 6 个机械场景 → Blender 渲染 → 3DGS baseline 评测 |
| Sidecar → 3DGS 训练过程可视化 | 低 | 实时展示 split/clone/densify 过程 |
| Web 架构拆分 | 低 | docs/index.html 拆为 viewer + per-method sidecar |
