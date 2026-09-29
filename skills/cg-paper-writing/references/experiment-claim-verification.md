---
# 实验声明溯源与服务器实验验证（Experiment Claim Verification）

> 用途：①论文中「服务器规模验证 / all-N-tasks / n=X」类实验声明的溯源审计；②为论文在远程服务器补做实验的全流程避坑；③排查「训练跑完 rc=0 但结果异常」。
> 提炼来源：2026-09 某机器人操作基准的远程实验与投稿前声明审计实战——从发现论文实验章节存在无产物支撑的规模声明，到按真实产物重做实验并如实报告（任务数、episode 数、种子数、指标全部以实际产物为准）。
---

## 一、声明-产物溯源审计（Claim-to-Artifact Traceability Audit）

**触发场景**：评审或投稿前自检遇到「server-scale / all-N-tasks / n=X」类实验声明，且数字无法直接复现时。**论文里每个实验数字都必须能追溯到服务器真实产物。**

**五步核查链（全部通过声明才成立）**：

1. **数字溯源**：grep 声称的指标值在服务器 logs/ 与结果 JSON 中的命中上下文——区分「真实评估结果」与「训练损失值 / checkpoint 筛选值的巧合命中」（示例：声称的指标值全局检索仅命中 checkpoint 筛选日志中的若干近似 cos 值与训练损失，无任何评估产物命中）。
2. **数据规模核对**：ls 数据 split 目录的任务数与 episode 数，与声明逐项对比（示例：声称 all 20 tasks / 600 train，实际 test/ 仅 5 任务 150 eps、val_pkg/ 12 任务 220 eps、train_pkg/ 不存在）。
3. **训练日志核对**：训练日志中的数据规模行（如 `[YourBenchDataset] 150 episodes from 5 tasks (split=test)`）是 ground truth——声称的「服务器全任务验证」检查点目录，其训练日志实为远少于声称的任务数。
4. **时间线核对**：checkpoint 文件时间戳 vs 声称的训练时长/步数。
5. **评估产物核对**：评估 JSON 的 n / 任务数 / 指标与论文声明逐字段对比（示例：真实评估产物为 n=40、指标 0.27，与声称的 n=50、0.31 均不吻合）。

**红旗信号**：声称的 n / 任务数在服务器找不到对应产物；指标值仅出现在训练损失或 checkpoint 筛选日志中；数据目录实际规模小于声称规模。

**处置**：声明无实验支撑时必须删除并重做实验，不可「就近取近似值顶替」——红线级学术诚信问题。重做后论文表述以真实数据为准（任务数、episode 数、种子数、指标全部如实），并在局限性章节说明覆盖范围与口径差异。

---

## 二、静默回退失效模式（Silent Fallback Invalidation）

**问题**：数据加载器带「合成数据 / 噪声回退」时，数据格式不兼容**不会报错**——训练 rc=0「成功」完成但完全无效。

**诊断四联征（出现任意两条即高度可疑）**：

1. 阶段日志无 epoch 行（从数据加载直接跳到 Done），或 loss 不收敛（bc_loss 恒在初始值附近）。
2. GPU 功耗接近空闲（<50W）、util 持续低（~10%）、显存仅 CUDA context（~400MB）。
3. 评估时全部样本被跳过（零范数 action → 除零崩溃 `len(cos)==0`）。
4. 训练循环带「有效样本过滤」（如 `target_velocity.norm() > 1e-6` 才训练）时整段空转——200k epoch 全部 continue，53 分钟保存的是随机初始化参数。

**根因实例**：新任务包 episode 为原始格式（如 data.h5 + 元信息文件），而 dataset.py 只认评估 split 的展开格式（如逐字段 pkl 文件）→ `__getitem__` 全走 fallback：state 变随机噪声、action 全零、velocity 全零。

**预防（长训练启动前必做，30 秒脚本化）**：dataset 级 sanity check——加载 train/eval split 各抽样 N 个 episode，验证 action norm > 0、target_velocity norm > 0（允许真实近零物体存在）、state 非纯噪声、任务数与预期一致。

---

## 三、Split 选择 fallthrough 陷阱

**问题**：训练代码按硬编码优先级列表（如 `["test", "val_pkg", "val", "train"]`）找第一个**存在**的 split 就 break：

- 配置文件的 data_dir **不控制** split 选择（路径由代码内硬编码的根目录变量拼接）；
- 目录重命名会静默改变实际使用的数据，配置文件完全无感。

**强制切换 split 的目录重命名法**（零代码改动、可逆）：

1. `mv test test_backup_<date>` → 加载器 fallthrough 到目标 split；
2. run 脚本开头加 sanity check：`[ -d test ] && { echo "ABORT: test/ exists, loader would use the wrong split"; exit 1; }`；
3. **实验结束立即恢复原名**（否则后续所有实验静默用错数据）；
4. 损坏 episode（截断数据文件等）必须隔离到有效数据目录**之外**（如 `_broken/` 子目录），否则 dataset 仍会遍历到并产生污染样本（fallback 噪声+零 action 混入训练集）。

---

## 四、原始数据包格式转换（h5→pkl 工作流）

1. **先探查源格式**：`h5py.visititems` 列出全部 Dataset（shape/dtype）；**再探查目标格式**：读一个真实样本逐字段对齐（类型、keys、tensor shape/dtype、字段语义）。
2. **字段语义验证**：不能只看字段名——用运动特征判断（示例：某旋转任务中「目标轨迹位置」字段若走圆弧 → 是物体位置；「末端位姿」字段与目标格式的锚点字段吻合 → 是 EE 位置）。
3. **转换细节**：bytes 字段需 decode；速度用位置有限差分（dt 必须与训练代码硬编码值一致，如 0.05）；tensor dtype/shape 对齐目标格式（如 float64 (1,1,8)）。
4. **脚本工程要求**：幂等（已转换 skip）+ 异常捕获（损坏文件记 fail 继续而非崩溃）+ `--dry-run` / `--limit` 试转 + 转换计数输出（成功数/失败数必须打印，便于发现静默丢样本）。
5. **转换后必须做 dataset 级验证**（见第二节预防项）。

---

## 五、远程实验操作陷阱（SSH / PowerShell / 后台进程）

1. **Python stdout 块缓冲**：nohup 重定向下日志长时间不 flush（需积累 ~8KB）——判断训练进度看 **checkpoint 文件**（torch.save 直接落盘）而非日志；关键 print 加 `flush=True`。
2. **pkill -f 自杀**：远程命令行本身含匹配字符串时 pkill 会杀掉自己的 ssh 会话（后续命令全部不执行且无输出）——先 pgrep 列 PID 再按 PID kill，或用 `pkill -f "[p]attern"` 技巧。
3. **PowerShell 引号**：双引号内 `$var` 被 PowerShell 展开为空（远程收到空参数）；多行 `python -c` 经 PowerShell 必然解析失败——**写脚本文件 scp 过去执行**，不要内嵌。
4. **nohup 后台**：必须 `< /dev/null` 脱离 stdin 否则 ssh 挂起；启动后先验证进程数与日志再离开；**严禁「看起来失败就再启动一次」**——会双实例双写同一 checkpoint 目录（实测：两套实例争抢同一批 GPU，必须全杀清理后单实例重启）。
5. **重定向父目录**：mv 日志目录后 nohup 重定向会因父目录不存在静默失败——启动前 `mkdir -p`。
6. **GPU 状态判读**：功耗（空闲 ~30-40W vs 训练 >50W）比 util 单点采样更可靠；训练是否真在跑，**checkpoint 推进是唯一铁证**。

---

## 六、与完整性门的集成

本文件的模式已接入 review-integrity.md 的 Gate 1 / Gate 2 检查项：

- 论文中每个实验数字可追溯到服务器产物（日志 / JSON / 检查点）；
- 声称的数据规模（任务数 / episode 数 / 种子数）与数据目录及训练日志一致；
- 长训练启动前已跑 dataset sanity check（action / velocity 非零）。

评审流程中遇到「服务器规模验证」类声明时，本文件第一节五步核查链为必执行项；为论文补做远程实验时，第二至五节为启动前检查清单。