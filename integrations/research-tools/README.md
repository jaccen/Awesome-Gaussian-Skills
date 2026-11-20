# 科研工具集成

三个上游工具均已接入；源码按 `tools.lock.json` 固定 commit，分别保留各自 MIT 许可。项目仅提供适配器，不复制上游实现或把它算作自己的方法。两个项目共享本机源码与环境，项目内各自保留完整入口，可单独分发。

## 安装与检查

在项目根目录使用 Python 3.10+，并安装 git、uv。工具环境统一使用 Python 3.12（uv 可管理）。

```powershell
python scripts/research_tools.py setup
python scripts/research_tools.py doctor
python scripts/research_tools.py list-tools --output outputs/research/tools.json
```

默认安装位置为 `~/.codex/research-tools`；可通过 `RESEARCH_TOOLS_HOME` 或全局参数 `--tools-home` 指定。已有不同 commit 或有已跟踪文件改动时，入口会拒绝静默覆盖。请另选安装目录或审核版本差异。

scholar-mcp 与 scihub-cli 使用各自上游 uv.lock；research-fetch 的 Python 依赖固定在 fetch-requirements.txt。Bash 脚本还使用 curl、jq、pdftotext、ffmpeg；Windows 推荐 Git Bash，入口优先选择 Git Bash，避免误用未配置的系统 WSL 启动器。可设置 RESEARCH_BASH。缺少工具时 doctor 会列出；jq 可用 `scoop install jq` 安装。

## 使用

### 发现与引用追踪：scholar-mcp

```powershell
python scripts/research_tools.py search "Gaussian splatting scene editing" --source crossref --limit 10 --year-start 2023 --output outputs/research/search.json
python scripts/research_tools.py fulltext 2308.04079 --output outputs/research/fulltext.json
python scripts/research_tools.py call get_references --arguments outputs/research/arguments.json --output outputs/research/references.json
```

`call` 可以调用 list-tools 返回的任意工具，参数以该工具 inputSchema 为准。先保存 JSON 参数文件，不凭记忆猜字段。search 默认 Crossref 并关闭医学影响因子/作者权威重排；可选 s2、pubmed、auto。CV/Agent 仍应结合现有 arXiv 扫描与会议官网。

MCP 结果保存原始结构，保留错误、摘要回退和来源。成功调用不代表全文已获取；Crossref 结果也可能是补充材料/视频，需要按 doc_type、标题及标识符筛选。check_citations 的自动评分仅作线索，不能替代页/节/表核验。

### 批量全文：scihub-cli

papers.txt 每行一个 DOI/arXiv ID/URL：

```powershell
python scripts/research_tools.py --timeout 300 download papers.txt --output-dir outputs/research/papers --download-deadline 120 --markdown
```

保留上游 download-report.json；下载失败返回非零。入口将并发限制为 2，可调单次下载时限，整体时限包含来源查询与处理，较大批次需相应增加。PDF 内容和标题仍需核验。

### 辅助资料：research-fetch-skill

```powershell
python scripts/research_tools.py fetch webpage https://arxiv.org/abs/2308.04079 outputs/research/webpages
python scripts/research_tools.py fetch paper 2308.04079 --out-dir outputs/research/fetch
python scripts/research_tools.py fetch arxiv 2308.04079 outputs/research/fetch
python scripts/research_tools.py fetch pdf-text "outputs/research/papers/paper.pdf" "outputs/research/paper.txt"
python scripts/research_tools.py fetch transcript VIDEO_ID outputs/research/transcripts
python scripts/research_tools.py fetch frames VIDEO_ID "30,01:23" outputs/research/frames
python scripts/research_tools.py fetch metadata VIDEO_ID
```

kind 后的参数直接传给固定版本上游脚本；相对路径从项目根目录解析。脚本缓存可能跳过已有文件，重新获取前先核验原文件。论文可优先使用 download，paper/arxiv 为轻量替代。不要同时启动重复下载与重试链。

## 可选配置与 MCP 宿主

Unpaywall 需设置真实 `UNPAYWALL_EMAIL`；不要将邮箱、密钥或本地配置提交到仓库。缺失时 OA 其他来源仍可运行。可配置 S2_API_KEY（以固定版本 Settings 为准）。不预填镜像，保留上游 opt-in 行为。

宿主配置示例在 mcp.example.json。把 `<repo-root>` 改为实际绝对路径，使用你的 Python 可执行文件，手动合并到宿主支持的配置中；本集成不覆盖用户现有 MCP 配置。CLI 内部已可启动和调用 MCP，不依赖宿主注册。serve-scholar 运行 stdio 服务，stdout 专用于协议。

## 评估与科研专家衔接

研究技能已链接本入口。先读取项目 README 和主张—实验—图表记录，冻结主题、时间范围、预算和相关性标准，再比较新增相关唯一论文、全文成功率、参考集覆盖、证据可定位比例与成本。下载器不自动扩充正式知识库；候选经过相关性和证据审查后，再走现有入库流程。

本机验证记录见 `validation.md`。真实 API 的可用性、全文获取与来源覆盖随时间变化；安装通过和一次成功调用不代表批量召回或论文录用概率提高。

## 本适配器的兼容修正

下载时保留系统代理配置（上游 BasicSession 默认关闭 trust_env）；可用 RESEARCH_TRUST_ENV=0 恢复上游行为。arXiv PDF 使用无 .pdf 后缀的规范地址。research-fetch 的嵌套文本提取显式调用 Git Bash 并转换 Windows 路径，提取失败会返回非零。这些修正只在适配器进程中生效，固定版本第三方源码保持干净。
