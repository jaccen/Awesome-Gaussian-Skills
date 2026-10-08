#!/usr/bin/env python3
# 全项目论文 arXiv ID 核查：从 methods.json + references/ + reports/ + changelog/ 收集所有 arXiv ID，
# 去重、格式校验，批量调 arXiv API 核验可达性、标题、作者、年份、分类，并产出核查报告。
import json, re, os, time, urllib.request, urllib.parse

ROOT = "C:/Users/Lenovo/Desktop/Project/Awesome-Gaussian-Skills"
ARXIV = "https://export.arxiv.org/api/query?"
CACHE = os.path.join(ROOT, ".arxiv_cache.json")
REPORT = os.path.join(ROOT, "references", "verification-report.md")
ID_RE = re.compile(r"^\d{4}\.\d{4,5}(v\d+)?$")

def norm(i):
    i = (i or "").strip()
    return re.sub(r"v\d+$", "", i)

def collect_ids():
    src = {}  # norm_id -> set(sources)
    def add(i, s):
        i = norm(i)
        if ID_RE.match(i):
            src.setdefault(i, set()).add(s)
    # methods.json
    mp = os.path.join(ROOT, "data", "methods.json")
    if os.path.exists(mp):
        m = json.load(open(mp, encoding="utf-8"))
        for x in m.get("methods", []):
            add(x.get("arxiv_id"), "methods.json")
    # markdown walk
    for base in ["references", "reports", "changelog", "docs"]:
        d = os.path.join(ROOT, base)
        if not os.path.isdir(d):
            continue
        for dp, _, fs in os.walk(d):
            for f in fs:
                if f.endswith((".md", ".js", ".html", ".csv")):
                    try:
                        txt = open(os.path.join(dp, f), encoding="utf-8", errors="ignore").read()
                    except Exception:
                        continue
                    for mm in re.findall(r"2[0-9]{3}\.\d{4,5}(?:v\d+)?", txt):
                        add(mm, base + "/" + f)
    return src

def query_batch(idlist):
    url = ARXIV + "id_list=" + ",".join(idlist) + "&max_results=" + str(len(idlist))
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "research-verify/1.0"})
            data = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
            res = {}
            for e in re.findall(r"<entry>(.*?)</entry>", data, re.S):
                ide = re.search(r"<id>(.*?)</id>", e, re.S)
                if not ide:
                    continue
                mnum = re.search(r"arxiv\.org/abs/(\d{4}\.\d{4,5})", ide.group(1))
                num = mnum.group(1) if mnum else norm(ide.group(1))
                title = re.search(r"<title>(.*?)</title>", e, re.S)
                pub = re.search(r"<published>(.*?)</published>", e, re.S)
                authors = re.findall(r"<name>(.*?)</name>", e, re.S)
                cats = re.findall(r"<category term=\"([^\"]*)\"", e, re.S)
                summ = re.search(r"<summary>(.*?)</summary>", e, re.S)
                res[num] = {
                    "title": title.group(1).strip() if title else "",
                    "authors": [a.strip() for a in authors],
                    "published": pub.group(1).strip() if pub else "",
                    "categories": cats,
                    "summary": re.sub(r"\s+", " ", summ.group(1)).strip() if summ else "",
                }
            return res
        except Exception as ex:
            print("  batch err:", repr(ex), "retry", attempt, flush=True)
            time.sleep(8 * (attempt + 1))
    return {}

def main():
    src = collect_ids()
    allids = sorted(src.keys())
    print("collected unique arxiv ids:", len(allids), flush=True)
    cache = {}
    if os.path.exists(CACHE):
        try:
            cache = json.load(open(CACHE, encoding="utf-8"))
        except Exception:
            cache = {}
    batch = 40
    done = 0
    for i in range(0, len(allids), batch):
        chunk = allids[i:i + batch]
        todo = [c for c in chunk if c not in cache or not cache[c].get("title")]
        if todo:
            res = query_batch(todo)
            for k, v in res.items():
                cache[k] = v
            for c in todo:
                if c not in cache or not cache[c].get("title"):
                    cache[c] = {"title": "", "authors": [], "published": "", "categories": [],
                                "summary": "", "status": "UNRESOLVED"}
        done = min(i + batch, len(allids))
        if (i // batch) % 4 == 0:
            json.dump(cache, open(CACHE, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            print("progress", done, "/", len(allids), flush=True)
        time.sleep(5)
    json.dump(cache, open(CACHE, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("cached entries:", len(cache), flush=True)

    # ---- report ----
    resolved = [k for k, v in cache.items() if v.get("title")]
    unresolved = [k for k, v in cache.items() if not v.get("title")]
    badfmt = [k for k in allids if not ID_RE.match(k)]
    print("resolved", len(resolved), "unresolved", len(unresolved), flush=True)

    # methods.json name<->title match candidates
    m = json.load(open(os.path.join(ROOT, "data", "methods.json"), encoding="utf-8"))
    mism = []
    for x in m.get("methods", []):
        aid = norm(x.get("arxiv_id"))
        if not aid or aid not in cache:
            continue
        t = (cache[aid].get("title") or "").lower()
        name = (x.get("name") or "").lower()
        # token overlap heuristic
        toks = [w for w in re.findall(r"[a-z0-9\+]{3,}", name) if w not in {
            "the", "and", "for", "with", "via", "using", "based", "from", "into", "towards"}]
        if toks and not any(tok in t for tok in toks[:6]):
            mism.append((x.get("name"), aid, cache[aid].get("title", "")[:80]))
    print("name-title mismatch candidates:", len(mism), flush=True)

    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("# 全项目论文 arXiv ID 核查报告\n\n")
        f.write(f"> 生成时间：自动核查 ｜ 数据源：methods.json + references/ + reports/ + changelog/ + docs/\n\n")
        f.write(f"- **去重后唯一 arXiv ID 总数**：{len(allids)}\n")
        f.write(f"- **API 核验可达（有标题）**：{len(resolved)}\n")
        f.write(f"- **未解析 / 疑似失效（UNRESOLVED）**：{len(unresolved)}\n")
        f.write(f"- **格式异常（非标准 arXiv ID）**：{len(badfmt)}\n")
        f.write(f"- **方法名↔标题 疑似不匹配候选**：{len(mism)}（需人工裁定，非必然错误）\n\n")
        f.write("## 1. 未解析 / 疑似失效 ID\n\n")
        if unresolved:
            for k in unresolved:
                f.write(f"- `{k}` ｜ 来源：{', '.join(sorted(src.get(k, [])))[:120]}\n")
        else:
            f.write("_无_\n")
        f.write("\n## 2. 格式异常 ID\n\n")
        for k in badfmt:
            f.write(f"- `{k}`\n")
        f.write("\n## 3. 方法名↔标题 疑似不匹配候选（人工裁定）\n\n")
        for n, a, t in mism:
            f.write(f"- **{n}** (`{a}`) → arXiv 标题疑似：`{t}`\n")
        f.write("\n## 4. 说明\n\n")
        f.write("- 核查仅验证 ID 在 arXiv 的可达性与元数据；方法名与标题的语义一致性由第 3 节候选列表辅助，最终以人工/原论文为准。\n")
        f.write("- 缓存文件：`.arxiv_cache.json`（含标题/作者/年份/分类/摘要，供知识库直接复用）。\n")
    print("report written:", REPORT, flush=True)

if __name__ == "__main__":
    main()
