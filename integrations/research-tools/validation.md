# 本机验证记录

日期：2026-11-18（Asia/Shanghai）。两个仓库均安装并链接三个工具；并不代表宿主 MCP 已全局注册。

| 检查 | 结果 |
|---|---|
| setup | 共享位置的三个源码固定 commit，两个 uv 环境安装成功；research-fetch 独立 Python 依赖已安装 |
| doctor | 三份源码 pinned_clean，三个 Python 环境存在；uv/git/Git Bash/jq/pdftotext/ffmpeg 均可用 |
| MCP 协议 | initialize/list_tools 成功，返回 10 个工具 |
| AGS 检索 | Crossref 对原始 3DGS 标题返回 3 项候选，首项 DOI 10.1145/3592433；其余包含补充材料，不能计作 3 篇相关论文 |
| AAE 检索 | ReAct 标题查询成功，原始结果在 outputs/research-smoke/search.json，候选尚待人工筛选 |
| scholar 全文 | 2308.04079 返回 abstract_only / abstract_fallback；未标记为全文成功 |
| AGS 批量下载 | 原始 3DGS 论文 2308.04079 下载成功；PDF 头、页数和首页可解析 |
| AAE 批量下载 | 1706.03762 下载成功，且 Markdown 转换完成；PDF 头、页数和首页可解析 |
| research-fetch 网页 | arXiv 论文页面 HTML 和文本保存成功 |
| research-fetch 元数据 | 一个公开视频元数据查询成功；仅用于接口验证，不计作科研论文 |
| research-fetch 论文 | 1706.03762 的 PDF、842 行布局文本和元数据成功保存 |
| 自动检查 | 每个仓库 6 项离线入口测试通过，覆盖源码版本冲突、源码改动、字面参数传递、缺少环境、MCP 失败传播、嵌套 Bash 路径与失败传播 |

## 下载结果指纹

- Awesome-Gaussian-Skills：[2023] - 3D Gaussian Splatting for Real-Time Radiance Field Rendering.pdf；35829709 bytes；14 页；SHA-256 `f4c0c9f27e2d02b0265017f66049d471eb66cb50203bc918f51ba07d20cbbe11`。
- Awesome-Agent-Engineering：[2017] - Attention Is All You Need.pdf；2215244 bytes；15 页；SHA-256 `bdfaa68d8984f0dc02beaca527b76f207d99b666d31d1da728ee0728182df697`。

## 失败与修正边界

最初下载测试因上游忽略系统代理而超时。仅更换无后缀地址不足以解决；保留系统网络配置后，两个样本成功下载。初始 research-fetch PDF 下载成功但嵌套 Bash 路径导致文本失败；显式选择 Git Bash、转换路径并传播提取错误后重跑成功。

这些失败记录保留在本地 outputs/research-smoke 下。下载材料、日志及本地配置不提交仓库。Unpaywall 邮箱未配置，本轮未测试；视频字幕和抽帧入口已提供，依赖已检查，但没有进行真实字幕/抽帧验证。大批次下载、相关文献增量和完整召回没有做对照实验。

## 复查

```powershell
python tests/test_research_tools.py
python scripts/research_tools.py doctor
python scripts/research_tools.py list-tools --output outputs/research/tools.json
```
