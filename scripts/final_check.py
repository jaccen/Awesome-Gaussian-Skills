# -*- coding: utf-8 -*-
"""最终核验：计数一致性 / 版本一致性 / AIGC 残留 / 数据完整性。"""
import io
import json
import os
import re
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print("=" * 74)
print(f"{'检查项':<40} {'结果':<34}")
print("=" * 74)

# 1. 事实源
d = json.load(io.open(os.path.join(ROOT, "data", "methods.json"), encoding="utf-8"))
ms = d["methods"]
ids = [re.sub(r"v\d+$", "", (m.get("arxiv_id") or "")) for m in ms]
names = [m["name"] for m in ms]
print(f"{'methods.json 条数 / count 字段':<40} {len(ms)} / {d.get('count')}")
print(f"{'分类数 / category_count 字段':<40} {len(set(m['category'] for m in ms))} / {d.get('category_count')}")

# 数据完整性
bad_id = [i for i in ids if i and not re.fullmatch(r"\d{4}\.\d{4,5}", i)]
dup_id = [k for k, v in Counter(ids).items() if k and v > 1]
normkey = lambda n: re.sub(r"[^a-z0-9]", "", n.lower())
dup_nm = [k for k, v in Counter(names).items() if v > 1]
# 仅「规范化后」相同、字面名不同的假重复（如 3DGS / 3DGS³）不算真重名
pseudo = [k for k, v in Counter(normkey(n) for n in names).items() if v > 1] if not dup_nm else []
print(f"{'arXiv ID 格式异常 / 重复 ID / 真重名':<40} {len(bad_id)} / {len(dup_id)} / {len(dup_nm)}")
if pseudo:
    detail = "; ".join(
        " / ".join(k for m in ms if normkey(m["name"]) == p for k in [m["name"]])
        for p in pseudo)
    print(f"{'  规范化同名（字面不同，允许）':<40} {len(pseudo)} 组: {detail[:60]}")
yr = [m.get("year") for m in ms if not isinstance(m.get("year"), int)]
print(f"{'year 非整数(应 0)':<40} {len(yr)}")

# 2. 载体计数
carriers = {
    "3dgs-methods-overview.csv": lambda s: len(s.strip().split("\n")) - 1,
    "docs/methods.html": lambda s: len(re.findall(r'\{\s*name:\s*"', s)),
    "docs/abstracts.js": lambda s: len(re.findall(r'^  "', s, re.M)),
    "references/3dgs-methods-overview.md": lambda s: len(re.findall(
        r"^- \*\*[^*]+\*\*", s, re.M)),
}
for rel, fn in carriers.items():
    p = os.path.join(ROOT, rel)
    s = io.open(p, encoding="utf-8", newline="").read()
    n = fn(s)
    ok = "OK" if n == len(ms) else "!! 不一致"
    print(f"{('载体 ' + rel):<40} {n:<22} {ok}")

# 3. 陈旧计数（只看「应当实时」的口径；历史 changelog 叙述里的旧数不算陈旧）
stale = re.compile(r"\b(678|697|700)\s*\+?\s*(个)?\s*(methods?|方法|Methods)\b")
LOG_HDR = re.compile(r"^#{1,3}\s.*(changelog|最新更新|最新动态|更新日志|历史"
                     r"|records?|updates?|releases?)", re.I | re.M)
hits = []
for dp, dn, fn in os.walk(ROOT):
    dn[:] = [x for x in dn if x not in {"node_modules", ".git", "mpt-storage", "bench",
                                        "scenes", "assets", "新建文件夹", "changelog",
                                        ".workbuddy", "reports", "mcp-server", ".temp"}]
    for f in fn:
        if not f.endswith((".md", ".html", ".js", ".json")) or f.endswith(".bak"):
            continue
        p = os.path.join(dp, f)
        try:
            s = io.open(p, encoding="utf-8").read()
        except Exception:
            continue
        # README 内置 changelog 段落之后的叙述保持原样，只检查正文口径区
        hdr = LOG_HDR.search(s)
        scan = s[: hdr.start()] if hdr else s
        for m in stale.finditer(scan):
            seg = scan[max(0, m.start() - 30):m.end() + 20].replace("\n", " ")
            hits.append((os.path.relpath(p, ROOT), seg.strip()[:60]))
if hits:
    for rel, seg in hits:
        print(f"{'陈旧计数 ' + rel:<40} {seg}")
else:
    print(f"{'陈旧计数':<40} 无")

# 4. 版本号
print("-" * 74)
for rel, pat in [("package.json", r'"version":\s*"([^"]+)"'),
                 ("CLAUDE.md", r'version:\s*"([^"]+)"'),
                 ("docs/index.html", r"hero\.version[\s\S]{0,120}"),
                 ("README.md", r"v0\.9\.\d+"), ("README_CN.md", r"v0\.9\.\d+")]:
    p = os.path.join(ROOT, rel)
    if not os.path.exists(p):
        continue
    s = io.open(p, encoding="utf-8").read()
    m = re.search(pat, s)
    val = m.group(0).replace("\n", " ")[:44] if m else "-"
    print(f"{('版本 ' + rel):<40} {val}")

# 5. AIGC 残留（只认真正的元数据水印；叙述里提到 AIGC 一词不算）
WM = re.compile(r"^AIGC:\s*$"
                r"|^\s*(ContentProducer|ContentPropagator|ProduceID|PropagateID"
                r"|ReservedCode1|ReservedCode2)\s*[:\uff1a]"
                r"|^>\s*AI\s*生成", re.I | re.M)
remain = []
for dp, dn, fn in os.walk(ROOT):
    dn[:] = [x for x in dn if x not in {"node_modules", ".git", ".temp", ".workbuddy",
                                        "reports", "mpt-storage"}]
    for f in fn:
        if f.endswith((".bak", ".pyc", ".bak2", ".bak3", ".bak4", ".bak5", ".bak6",
                       ".bak7", ".bak8")):
            continue
        if not f.endswith((".md", ".html", ".js", ".yml", ".yaml", ".json")):
            continue
        p = os.path.join(dp, f)
        try:
            s = io.open(p, encoding="utf-8").read()
        except Exception:
            continue
        if WM.search(s):
            remain.append(os.path.relpath(p, ROOT))
print("-" * 74)
print(f"{'AIGC 文本残留':<40} {len(remain)} 处")
for r in remain[:10]:
    print(f"   {r}")
print("=" * 74)
