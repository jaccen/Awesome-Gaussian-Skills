# -*- coding: utf-8 -*-
"""cg-paper-writing 技能隐私修复 + static/references 合并 + 安装副本同步。

步骤:
 1. static/*.md 覆盖合并到 references/ (static 是 9-28 用户升级版, 更新)
 2. 删除 static/
 3. 剥离全部 references/*.md 的 AIGC 水印头 (含用户设备码)
 4. 对两个泄漏文件做去标识化 (逐条精确替换, 失败即报错)
 5. 重建 SKILL.md = SkillHub frontmatter + 主版正文 (static/->references/)
 6. manifest.yaml: static/->references/
 7. 同步安装副本 ~/.workbuddy/skills/cg-paper-writing/
 8. 全量验证
"""
import os, re, shutil, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = r'C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills\skills\cg-paper-writing'
INST = r'C:\Users\Lenovo\.workbuddy\skills\cg-paper-writing'
STATIC = os.path.join(ROOT, 'static')
REFS = os.path.join(ROOT, 'references')

# ---------- 1. 合并 static -> references ----------
n_copied = 0
for f in os.listdir(STATIC):
    if f.endswith('.md'):
        shutil.copy2(os.path.join(STATIC, f), os.path.join(REFS, f))
        n_copied += 1
print(f'[1] static -> references 覆盖合并: {n_copied} 个文件')

# ---------- 2. 删除 static ----------
shutil.rmtree(STATIC)
print('[2] static/ 已删除')

# ---------- 3. 剥离 AIGC 水印头 ----------
AIGC_RE = re.compile(r'\A---\s*\nAIGC:\s*\n(?:[^\n]*\n)*?---\s*\n')
stripped = 0
for f in sorted(os.listdir(REFS)):
    p = os.path.join(REFS, f)
    with open(p, encoding='utf-8') as fh:
        t = fh.read()
    t2 = AIGC_RE.sub('', t, count=1)
    if t2 != t:
        with open(p, 'w', encoding='utf-8', newline='') as fh:
            fh.write(t2)
        stripped += 1
print(f'[3] AIGC 水印头剥离: {stripped} 个文件')

# ---------- 4. 去标识化 ----------
def apply_replacements(path, pairs):
    with open(path, encoding='utf-8') as fh:
        t = fh.read()
    for old, new in pairs:
        if old not in t:
            print(f'  !! 未命中: {os.path.basename(path)}: {old[:60]}...')
            sys.exit(1)
        t = t.replace(old, new)
    with open(p if False else path, 'w', encoding='utf-8', newline='') as fh:
        fh.write(t)
    print(f'[4] 去标识化: {os.path.basename(path)} ({len(pairs)} 处)')

ecv = os.path.join(REFS, 'experiment-claim-verification.md')
apply_replacements(ecv, [
    ('> 提炼来源：2026-09-28 PhysLoop 12 任务 3 种子实验完整实战——从发现 §5.4 虚构声明（16 任务/n=50/cos=0.318 无实验支撑）到真实数据落地（12 任务 3 种子，动作余弦 0.9755±0.0014）。',
     '> 提炼来源：2026-09 某机器人操作基准的远程实验与投稿前声明审计实战——从发现论文实验章节存在无产物支撑的规模声明，到按真实产物重做实验并如实报告（任务数、episode 数、种子数、指标全部以实际产物为准）。'),
    ('1. **数字溯源**：grep 声称的指标值（如 0.318）在服务器 logs/ 与结果 JSON 中的命中上下文——区分「真实评估结果」与「训练损失值 / checkpoint 筛选值的巧合命中」（实测：0.318 全局检索仅命中 4 任务 checkpoint 筛选日志中的若干 0.31x cos 值与训练损失，无任何评估产物）。',
     '1. **数字溯源**：grep 声称的指标值在服务器 logs/ 与结果 JSON 中的命中上下文——区分「真实评估结果」与「训练损失值 / checkpoint 筛选值的巧合命中」（示例：声称的指标值全局检索仅命中 checkpoint 筛选日志中的若干近似 cos 值与训练损失，无任何评估产物命中）。'),
    ('（实测：声称 all 16 tasks / 480 train，实际 test/ 仅 4 任务 128 eps、val_package_compressed/ 12 任务 220 eps、train_package/ 不存在）。',
     '（示例：声称 all 20 tasks / 600 train，实际 test/ 仅 5 任务 150 eps、val_pkg/ 12 任务 220 eps、train_pkg/ 不存在）。'),
    ('训练日志中的数据规模行（如 `[PhysManiBenchDataset] 128 episodes from 4 tasks (split=test)`）是 ground truth——声称的「服务器 16 任务验证」检查点（checkpoints_ddp_v3）其训练日志实为 4 任务。',
     '训练日志中的数据规模行（如 `[YourBenchDataset] 150 episodes from 5 tasks (split=test)`）是 ground truth——声称的「服务器全任务验证」检查点目录，其训练日志实为远少于声称的任务数。'),
    ('（实测：真实闭环评估为 n=32、cos=0.3007，与论文 n=50、0.318 均不吻合）。',
     '（示例：真实评估产物为 n=40、指标 0.27，与声称的 n=50、0.31 均不吻合）。'),
    ('**根因实例**：12 任务包 episode 为原始 h5 格式（data.h5 + meta_info.pkl），而 dataset.py 只认 test 格式（target_state.pkl + expert_info/*.pkl）→ `__getitem__` 全走 fallback：state 变随机噪声、action 全零、target_velocity 全零。',
     '**根因实例**：新任务包 episode 为原始格式（如 data.h5 + 元信息文件），而 dataset.py 只认评估 split 的展开格式（如逐字段 pkl 文件）→ `__getitem__` 全走 fallback：state 变随机噪声、action 全零、velocity 全零。'),
    ('（如 `["test", "val_package_compressed", "val_package", "train_package"]`）',
     '（如 `["test", "val_pkg", "val", "train"]`）'),
    ('（路径由代码内 pm_code_root 硬编码拼接）',
     '（路径由代码内硬编码的根目录变量拼接）'),
    ('1. `mv test test_4task_backup_<date>` → 加载器 fallthrough 到目标 split；',
     '1. `mv test test_backup_<date>` → 加载器 fallthrough 到目标 split；'),
    ('4. 损坏 episode（截断 h5 等）必须隔离到 episodes/ 目录**之外**（如 `all_variations/_broken_xxx/`），否则 dataset 仍会遍历到并产生污染样本（fallback 噪声+零 action 混入训练集）。',
     '4. 损坏 episode（截断数据文件等）必须隔离到有效数据目录**之外**（如 `_broken/` 子目录），否则 dataset 仍会遍历到并产生污染样本（fallback 噪声+零 action 混入训练集）。'),
    ('2. **字段语义验证**：不能只看字段名——用运动特征判断（实测：旋转任务的 `expert_trajectory_target_position` 若走圆弧 → 是物体位置；`gripper_pose[:3]` 与目标格式 `tip_cur_position` 锚点吻合 → 是 EE 位置）。',
     '2. **字段语义验证**：不能只看字段名——用运动特征判断（示例：某旋转任务中「目标轨迹位置」字段若走圆弧 → 是物体位置；「末端位姿」字段与目标格式的锚点字段吻合 → 是 EE 位置）。'),
    ('+ 转换计数输出（实测：219/220 成功、1 个截断 h5 隔离）。',
     '+ 转换计数输出（成功数/失败数必须打印，便于发现静默丢样本）。'),
    ('（实测：两套实例 6 进程争抢 3 卡，必须全杀清理后单实例重启）。',
     '（实测：两套实例争抢同一批 GPU，必须全杀清理后单实例重启）。'),
])

mda = os.path.join(REFS, 'markdown-draft-format-audit.md')
apply_replacements(mda, [
    ('> 整理日期：2026-09-27（源自 PhysLoop V2 CVPR 格式评审与 P0-1~P0-5 中英双稿同步修复实战，终检全部通过）',
     '> 整理日期：2026-09-27（源自某 CVPR 投稿稿件的格式评审与 P0-1~P0-5 中英双稿同步修复实战，终检全部通过）'),
    ('（实测 EN 中 SceneAgent 首现第 11 位、CN 首现第 12 位）',
     '（实测某方法名 EN 首现第 11 位、CN 首现第 12 位）'),
    ('（实测 CN §4.6 H 扫描 ↔ EN §4.5.7）',
     '（实测两稿对应小节的编号体系完全不同）'),
    ('> 沉淀来源：PhysLoop V2 P1/P2 修复实战（2026-09-27）——md2cvpr.py 转换后 bibitem 22 条静默丢为 20 条，转换脚本零报错，靠转换后核验才发现。',
     '> 沉淀来源：某稿件 MD→LaTeX 转换实战（2026-09-27）——转换后 bibitem 数比文献条目数少 2 条，转换脚本零报错，靠转换后核验才发现。'),
    ('该条 bibitem 被无声丢弃（实测 [16][21] 因行尾空格丢失）。',
     '该条 bibitem 被无声丢弃（实测两条条目因行尾空格丢失）。'),
])

# ---------- 5. 重建 SKILL.md ----------
with open(os.path.join(ROOT, 'SKILL.md'), encoding='utf-8') as fh:
    main_full = fh.read()
body = main_full.split('---\n', 2)[2] if main_full.startswith('---') else main_full
# body: 从第一个 "## " 前的 "# CG Paper Writing Engine" 开始
idx = body.find('# CG Paper Writing Engine')
body = body[idx:]
body = re.sub(r'static/(?!dynamic)', 'references/', body)

body = body.replace(
    '配套一键脚本 scripts/check_paper_consistency.py；投稿前格式核查与源码清理任务必读',
    '配套一键核查脚本（维护者本地工具，未随技能分发，可按本文件方法论自写）；投稿前格式核查与源码清理任务必读')

body = body.replace(
    '6. **双副本同步**：本技能为双副本安装（安装目录 + 源仓库 `Awesome-Gaussian-Skills/skills/cg-paper-writing/`），内容改动须在同一会话内同步两处；两副本 frontmatter 结构不同（仓库副本无 AIGC 水印头），同步正文内容即可，勿整文件覆盖。',
    '6. **双副本同步与发布纪律**：本技能为双副本安装（安装目录 `~/.workbuddy/skills/cg-paper-writing/` + 源仓库 `Awesome-Gaussian-Skills/skills/cg-paper-writing/`），内容改动须在同一会话内同步两处（两副本结构一致：SKILL.md / manifest.yaml / references/，可整文件覆盖）；发布包 `dist/cg-paper-writing.zip` 由源副本重新打包生成。**发布前必须重跑隐私扫描**（`scripts/scan_skill_privacy.py`），确认不含未发表稿件相关材料（稿件项目名、方法名、实验数字、数据集名、AIGC 设备标识码等）。')

FRONTMATTER = '''---
name: cg-paper-writing
display_name: CG论文写作引擎
display_name_en: CG Paper Writing Engine
description: "Academic paper writing for 3D vision, computer graphics, CAD, and 3D understanding. Covers NeRF, 3DGS, SLAM, point cloud, 3D shape, CAD modeling. Supports CVPR/ICCV/ECCV/SIGGRAPH venues and Chinese core journals (17 journal-specific format specs). Multi-agent adversarial review, citation integrity gates, style calibration, paper novelty/industry-value evaluation, pre-submission format audit, experiment claim verification. Use when: writing or revising a CG/3D vision paper, drafting abstract/intro/method/experiments, running adversarial review or citation integrity check, calibrating writing style to a venue, evaluating paper value, 写论文/写paper/CG论文/计算机学报投稿/软件学报投稿/图形学学报投稿/自动化学报投稿/中文核心期刊."
description_zh: "面向计算机图形学与三维视觉的学术论文写作引擎。覆盖 NeRF、3DGS、SLAM、点云、三维形状与 CAD 建模方向，支持 CVPR/SIGGRAPH/NeurIPS/TVCG 等国际会议期刊，以及《计算机学报》《软件学报》等 17 本中文核心期刊的投稿格式规范。提供章节级写作模板（标题、摘要、引言、相关工作、方法、实验）、多智能体对抗评审、引用三重真实性校验、按目标期刊校准文风、论文创新性与学术/产业价值评估、投稿前格式审计与实验声明溯源核查。适用于撰写或修改 CG 与三维视觉论文、按目标期刊格式调整稿件、论文对抗评审与引用完整性检查，以及按扩展协议新增期刊格式规范。"
description_en: "An academic paper writing engine for computer graphics and 3D vision: NeRF, 3DGS, SLAM, point clouds, 3D shape and CAD modeling. Supports CVPR/SIGGRAPH/NeurIPS/TVCG venues plus 17 Chinese core journal format specs. Provides section-level writing templates (title, abstract, intro, related work, method, experiments), multi-agent adversarial review, three-layer citation verification, venue-specific style calibration, paper novelty/industry-value evaluation, pre-submission format audit, and experiment claim verification."
category: writing
version: "3.2.0"
author: jaccen
license: Apache-2.0
user-invocable: true
agent_created: true
metadata:
  tags: ["paper-writing", "academic", "computer-graphics", "3dgs", "nerf", "computer-vision", "cvpr", "siggraph", "adversarial-review", "citation-integrity", "style-calibration", "paper-evaluation", "pre-submission-check"]
  when_to_use:
    - "Write or revise a CG/3D vision academic paper"
    - "Draft abstract, introduction, related work, method, or experiments for a 3DGS/NeRF/CAD paper"
    - "Run adversarial review or citation integrity check on a draft"
    - "Calibrate writing style to a target venue"
    - "写论文 / 写paper / 论文写作 / CG论文 / 三维视觉论文"
    - "按《计算机学报》格式撰写/修改 / 计算机学报投稿 / CJC 综述 / 中文核心期刊格式"
    - "按《软件学报》格式撰写/修改 / 软件学报投稿 / JoS 综述"
    - "按《计算机辅助设计与图形学学报》格式撰写/修改 / 图形学学报投稿 / JCAD"
    - "自动化学报投稿 / 中国科学信息科学投稿 / 计算机研究与发展投稿 / 中文信息学报投稿"
    - "中国图象图形学报投稿 / 模式识别与人工智能投稿 / 智能系统学报投稿 / 虚拟现实与智能硬件投稿"
    - "计算机科学投稿 / 计算机应用投稿 / 图学学报投稿 / 机器人投稿 / 计算机应用研究投稿 / 可视计算投稿"
    - "搜索某中文期刊投稿要求并形成专项能力 / 新增期刊格式规范（按 Extension Protocol 扩展）"
    - "CCF国际期刊投稿 / IEEE Transactions投稿 / ACM Transactions投稿 / Springer期刊投稿 / TPAMI投稿 / TOG投稿 / TVCG投稿 / JMLR投稿"
    - "评估论文创新性与学术/产业价值 / 论文价值评判 / 这篇论文值不值得投 / 审稿预审评分 / Evaluate paper novelty and industry value"
    - "投稿前格式核查 / LaTeX 源码卫生检查 / 论文源码清理 / 补充材料编号对应检查 / pre-submission source hygiene check"
    - "Markdown 工作稿投稿前格式审计 / 批注清理 / 引用重排 / 孤儿图补引 / Markdown draft format audit"
    - "实验声明溯源 / 数据来源核查 / 服务器实验验证 / 实验数字真实性核查 / verify experiment claims against server artifacts"
    - "为论文补做实验 / 服务器跑实验 / 远程训练评估 / 排查训练跑完但结果异常 / rerun experiments to back paper claims"
---

'''
new_skill = FRONTMATTER + body
with open(os.path.join(ROOT, 'SKILL.md'), 'w', encoding='utf-8', newline='') as fh:
    fh.write(new_skill)
print('[5] SKILL.md 重建完成 (frontmatter=SkillHub, 正文=最新版)')

# ---------- 6. manifest ----------
with open(os.path.join(ROOT, 'manifest.yaml'), encoding='utf-8') as fh:
    mf = fh.read()
mf = mf.replace('static/', 'references/')
with open(os.path.join(ROOT, 'manifest.yaml'), 'w', encoding='utf-8', newline='') as fh:
    fh.write(mf)
print('[6] manifest.yaml: static/ -> references/')

# ---------- 7. 同步安装副本 ----------
if os.path.isdir(INST):
    shutil.rmtree(INST)
os.makedirs(INST)
shutil.copy2(os.path.join(ROOT, 'SKILL.md'), INST)
shutil.copy2(os.path.join(ROOT, 'manifest.yaml'), INST)
shutil.copytree(REFS, os.path.join(INST, 'references'))
if os.path.isdir(os.path.join(ROOT, 'scripts')):
    shutil.copytree(os.path.join(ROOT, 'scripts'), os.path.join(INST, 'scripts'))
print('[7] 安装副本已同步:', INST)

# ---------- 8. 验证 ----------
LEAK = ['physloop', 'physmani', 'sceneagent', 'md2cvpr', '0.318', '0.31x',
        '0.9755', 'checkpoints_ddp', 'contentproducer', 'mad55u9',
        'signedgs', '符号高斯', '高频感知', 'mypaper', '综述稿']
bad = []
for base in (ROOT, INST):
    for root, dirs, files in os.walk(base):
        for f in files:
            p = os.path.join(root, f)
            if f.endswith(('.md', '.yaml', '.py')):
                with open(p, encoding='utf-8', errors='replace') as fh:
                    low = fh.read().lower()
                for kw in LEAK:
                    if kw in low:
                        bad.append((p, kw))
if bad:
    print('!! 残留泄漏:')
    for p, kw in bad:
        print('  ', p, '->', kw)
    sys.exit(1)
n_ref = len([f for f in os.listdir(REFS) if f.endswith('.md')])
print(f'[8] 验证通过: references {n_ref} 个文件, 无残留泄漏 (泄漏关键词 {len(LEAK)} 项 x 主/安装两副本)')
