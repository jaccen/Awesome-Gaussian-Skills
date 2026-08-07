# 3DGS Benchmark Arena（竞技场脚手架 v0.1）

> 目标：把"方法目录"升级为"可复现的评测平台"。任何方法要登上排行榜，
> 必须给出带来源标注的数字——本竞技场不接受无来源的 PSNR。

## 设计原则

1. **来源四级标注**（继承 `references/benchmark-data.md` 规范）：
   - `[A]` 论文原文直接提取（最高可信）
   - `[C]` 社区公认复现值（需注明来源）
   - `[S]` 本仓库服务器实测（必须附 GPU/迭代数/评估实现版本）
   - `[E]` 估算值（仅供参考，不得用于对比结论）
2. **协议透明**：每条记录注明 dataset、iterations、eval_impl 版本、GPU。
   已知协议差异（如 lpipsPyTorch vs 标准 lpips、分辨率下采样）必须在 note 中声明。
3. **零虚构**：`bench/leaderboard.json` 由 CI 校验 JSON 合法性与 source 字段完备性。

## 当前状态（v0.1 脚手架）

| 组件 | 状态 |
|------|------|
| `bench/metrics.py` | ✅ 纯 numpy PSNR/SSIM + 可选 LPIPS（eval_impl: bench-metrics/1.0.0） |
| `bench/run_eval.py` | ✅ 本地评测运行器（renders/ vs gt/ 配对 → 生成 [S] 条目） |
| `bench/leaderboard.json` | ✅ 已收录 6 条带来源的种子记录（全部 [A]） |
| 自动训练+评测流水线 | ⏳ 需要 GPU 环境（gsplat/diff-gaussian-rasterization），见 Roadmap |
| 在线排行榜页面 | ⏳ 计划由 docs/index.html 增加 leaderboard tab 读取 JSON |

## 使用方式

```bash
# 训练完某个方法后，按数据集切分渲染测试视角，然后：
python3 bench/run_eval.py \
    --method MyMethod --iterations 30000 \
    --renders out/renders --gt data/mipnerf360/bicycle/test \
    --dataset mipnerf360 --gpu "RTX 3090" --commit abc1234
# 输出 JSON 条目 → 人工核验 → 并入 bench/leaderboard.json
```

## 收录优先级（Roadmap）

1. Mip-NeRF 360（9 场景）：3DGS / Mip-Splatting / Scaffold-GS / 2DGS / VGGT 系前馈方法
2. Tanks & Temples：Truck / Train
3. 前馈方法专项：RealEstate10K / ACID（pixelSplat、MVSplat、NoPoSplat、GADA 协议）
4. 压缩-质量帕累托：PSNR vs 模型大小（MB）vs FPS 三维排行（对接 3dgs-compression-deploy 技能）
