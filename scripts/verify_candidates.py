#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""对 reports/harvest/candidates.json 做准确性核验与自动筛选。

遵循项目准确性协议：
  R1 排他：survey / review / benchmark / dataset 类不入库（现有 700 条无 survey）
  R2 自述名：方法名必须取自论文自身表述 —— 优先「标题冒号前」，且须在摘要中复现
  R3 相关性：摘要须同时含 gaussian 与 splat/splatting，确认是 GS 本体方法
  R4 去重：与 methods.json 现有名称/arXiv ID 比对
  R5 排伪：拒绝 -v2 / -2 / -AD 等派生后缀（除非摘要自述该后缀）
输出 reports/harvest/{auto_accept.json, need_review.json, rejected.json}
"""
import io
import json
import os
import re
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CAND = os.path.join(ROOT, "reports", "harvest", "candidates.json")
JSON = os.path.join(ROOT, "data", "methods.json")

PROPER_ROOT = re.compile(r"gauss|splat|3dgs|^gs$|[-_]gs$|^gs[-_]|gaussians", re.I)


def clean_latex(s):
    """清洗 arXiv 标题里的 LaTeX 行内标记：$^2$ -> 2，{...} -> 内容，\\- -> 空。"""
    s = re.sub(r"\$\^?\{?([^$}{]*)\}?\$", r"\1", s)
    s = re.sub(r"\^\{?([0-9A-Za-z]+)\}?", r"\1", s)
    s = s.replace("{", "").replace("}", "").replace("\\", "")
    return re.sub(r"\s+", " ", s).strip()


def is_proper_token(t):
    """专有形态 token：GS 词根 / 驼峰 / 含数字 / 全大写缩写 / 结尾 -GS。"""
    if not t:
        return False
    if PROPER_ROOT.search(t):
        return True
    if re.search(r"[0-9]", t):
        return True
    if re.search(r"[a-z][A-Z]", t):
        return True
    core = re.sub(r"[^A-Za-z]", "", t)
    return bool(core) and 2 <= len(core) <= 6 and core.isupper()
CAMEL_RE = re.compile(r"[a-z][A-Z]")          # VoxelTTO / CADSplat / ParticleSplat
TECH_RE = re.compile(r"[-+&]|[0-9]")           # CoRef-GS / GAPrompt++ / 4DGS-Fixer
BENCH_RE = re.compile(r"(bench|leaderboard|testbed)", re.I)


def looks_like_method_name(name):
    """R2b 形态判据：方法名应为专有名词，而非描述性英文短语。"""
    if not name:
        return False
    # 排除 bench 类
    if BENCH_RE.search(name):
        return False
    # R2c 短语型伪名：名称由通用英文形容词/介词构成，而非专有名词
    phrase_words = {"non", "uniform", "situ", "based", "aware", "loss", "locality",
                    "integrated", "rigid", "possible", "inter", "reflective", "packet",
                    "point", "physics", "unified", "towards", "adaptive", "robust",
                    "efficient", "generalizable", "certified", "learning", "online",
                    "real", "scale", "high", "low", "deep", "self", "cross", "multi",
                    "neural", "implicit", "explicit", "sparse", "dense", "open"}
    toks = [t for t in re.split(r"[\s\-]+", name.lower()) if t]
    if toks and all(t in phrase_words for t in toks):
        return False
    # R2d 多词名称必须至少含一个「专有形态」token，否则视为描述性英文短语
    # 例：通过 "Elastic Triangle Splatting"（Splatting 词根）
    #     拒绝 "Capacity-Controlled" / "Single-Event" / "Scene-Level"
    parts = [t for t in re.split(r"[\s\-]+", name) if t]
    if len(parts) > 1 and not any(is_proper_token(t) for t in parts):
        return False
    low = name.lower()
    # 常见英文虚词/通用词开头 → 多半是标题短语而非方法名
    stop = {"the", "a", "an", "on", "in", "of", "for", "to", "and", "with", "from",
            "toward", "towards", "beyond", "learning", "towards", "demonstration",
            "printing", "geometry", "wind", "understanding", "exploring", "rethinking",
            "revisiting", "can", "what", "how", "why", "when", "where", "does", "do",
            "toward", "unleashing", "bridging", "scaling", "efficient", "high-fidelity"}
    first = low.split()[0] if low.split() else ""
    if first in stop:
        return False
    if PROPER_ROOT.search(name):
        return True
    if CAMEL_RE.search(name) or TECH_RE.search(name):
        return True
    # 全大写缩写
    if name.isupper() and 2 <= len(name) <= 8:
        return True
    # 单词且首字母大写（如 VGGT）——需是明显缩写形态：>=4 个大写字母
    if re.fullmatch(r"[A-Z0-9\-]{2,8}", name):
        return True
    return False
EXCLUDE_RE = re.compile(
    r"\b(survey|review|benchmark|dataset|benchmarking|challenge|workshop|tutorial)\b", re.I)
NAME_COLON_RE = re.compile(r"^\s*([A-Za-z][A-Za-z0-9\-\.\+]{1,24}(?:[ -][A-Za-z0-9\-\.\+]{1,18}){0,3})\s*:\s+\S")
DERIVED_RE = re.compile(r"[- ](v\d|V\d|AD|Lite|Plus|II|III)$")


def norm_name(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def contains_fuzzy(hay, needle):
    """容错包含：忽略大小写与非字母数字字符后判断 needle 是否为 hay 的子串。"""
    return norm_name(needle) in norm_name(hay)


def extract_name(p):
    """提取方法名：优先标题冒号前，且必须在摘要中复现（R2 自述名）。"""
    t = p["title"].strip()
    m = NAME_COLON_RE.match(t)
    cands = []
    if m:
        cands.append(m.group(1).strip())
    # 备选：全大写或以 GS- / 3D 开头的首个 token
    else:
        first = re.split(r"[\s,;:]", t)[0]
        if first and len(first) <= 26 and first[0].isupper():
            cands.append(first)
    for c in cands:
        if DERIVED_RE.search(c):
            continue
        if contains_fuzzy(p["abstract"], c) or contains_fuzzy(t, c):
            return c, "title-colon+abstract"
    return (cands[0] if cands else None), "no-self-mention"


def relevance(p):
    """返回 (是否 GS 核心, 判据)"""
    a = p["abstract"].lower()
    has_g = "gaussian" in a
    has_s = ("splat" in a) or ("splatting" in a)
    t = p["title"].lower()
    return (has_g and has_s), {"abs_gaussian": has_g, "abs_splat": has_s,
                               "title gs": ("gaussian" in t and "splat" in t) or "3dgs" in t}


def main():
    d = json.load(io.open(CAND, encoding="utf-8"))
    papers = d["papers"]
    with io.open(JSON, encoding="utf-8") as f:
        jd = json.load(f)
    methods = jd["methods"]
    known_id = {re.sub(r"v\d+$", "", (m.get("arxiv_id") or "")) for m in methods if m.get("arxiv_id")}
    known_name = {norm_name(m["name"]) for m in methods}

    accept, review, reject = [], [], []
    reasons = Counter()

    for p in papers:
        pid = p["id"]
        # LaTeX 标题清洗（$...$ / ^{...} / 转义），保证提取的方法名可直接写入 JSON
        p["title"] = clean_latex(p["title"])
        # R4 ID 去重（抓取时已去，二次确认）
        if pid in known_id:
            reject.append((p, "dup-arxiv-id"))
            reasons["dup-arxiv-id"] += 1
            continue
        # R1 排他类型
        if EXCLUDE_RE.search(p["title"]):
            reject.append((p, "survey/benchmark/dataset"))
            reasons["survey/benchmark/dataset"] += 1
            continue
        # R3 GS 相关性
        ok, why = relevance(p)
        if not ok:
            reject.append((p, "not-gs-core"))
            reasons["not-gs-core"] += 1
            continue
        # R2 自述名
        name, how = extract_name(p)
        if not name:
            review.append((p, "no-method-name", how))
            reasons["no-method-name"] += 1
            continue
        # R6 标题 GS 指向：标题本身须明确提到 GS（否则多半只是借用了 GS 做工具）
        tl = p["title"].lower()
        if not (("gaussian" in tl and ("splat" in tl or "splats" in tl)) or "3dgs" in tl
                or re.search(r"g\w*[- ]?gs\b", tl) or tl.endswith("-gs") or "-gs " in tl
                or PROPER_ROOT.search(name)):
            review.append((p, name, "title-no-gs-mention"))
            reasons["title-no-gs-mention"] += 1
            continue
        if how == "no-self-mention":
            review.append((p, name, "name-not-self-mentioned"))
            reasons["name-not-self-mentioned"] += 1
            continue
        if len(name) < 3 or len(name) > 32:
            review.append((p, name, "name-length-anomaly"))
            reasons["name-length-anomaly"] += 1
            continue
        # R2b 形态判据：排除把论文标题短语误当方法名
        if not looks_like_method_name(name):
            review.append((p, name, "not-proper-noun:" + name))
            reasons["not-proper-noun"] += 1
            continue
        # R4 名称去重
        if norm_name(name) in known_name:
            reject.append((p, "dup-name:" + name))
            reasons["dup-name"] += 1
            continue
        accept.append({"id": pid, "name": name, "title": p["title"],
                       "abstract": p["abstract"], "published": p["published"],
                       "primary": p.get("primary", ""), "categories": p.get("categories", [])})

    # 批次内重名去重
    seen = {}
    for a in list(accept):
        k = norm_name(a["name"])
        if k in seen:
            accept.remove(a)
            reject.append((a, "intra-batch-dup:" + a["name"]))
            reasons["intra-batch-dup"] += 1
        else:
            seen[k] = a

    out_dir = os.path.join(ROOT, "reports", "harvest")
    json.dump(accept, io.open(os.path.join(out_dir, "auto_accept.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    json.dump([{"id": p["id"], "title": p["title"], "name": n, "why": w,
                "abstract": p["abstract"][:400]} for p, n, w in review],
              io.open(os.path.join(out_dir, "need_review.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    json.dump([{"id": p["id"], "title": p["title"], "why": w} for p, w in reject],
              io.open(os.path.join(out_dir, "rejected.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    print(f"候选 {len(papers)}")
    print(f"  自动通过 : {len(accept)}")
    print(f"  需人工审 : {len(review)}")
    print(f"  已排除   : {len(reject)}")
    print("\n排除/待审原因：")
    for k, v in reasons.most_common():
        print(f"  {k:<28} {v}")
    print("\n=== 自动通过 前 20 ===")
    for a in accept[:20]:
        print(f"  {a['id']:<12} {a['name'][:28]:<30} {a['title'][:60]}")


if __name__ == "__main__":
    main()
