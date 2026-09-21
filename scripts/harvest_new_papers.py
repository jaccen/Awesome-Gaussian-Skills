#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""多渠道抓取最新 3DGS 论文候选池（去重后写入 reports/harvest/candidates.json）。

渠道：
  1. arXiv API   —— cs.CV / cs.GR 主窗口 + 全库 all:"gaussian splatting" + 3DGS 关键词变体
  2. Semantic Scholar API —— 关键词检索，交叉补充 arXiv 漏收条目
输出候选池，供 verify_new_papers.py 做准确性核验。
"""
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date, datetime, timedelta, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NS = {"a": "http://www.w3.org/2005/Atom"}
ARXIV_API = "http://export.arxiv.org/api/query?{}"
S2_API = "https://api.semanticscholar.org/graph/v1/paper/search?{}"

UA = {"User-Agent": "awesome-gaussian-skills-harvest/1.0 (research aggregation)"}
SLEEP = 4.0


def fetch(url, retries=4, timeout=60, backoff=12):
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            return urllib.request.urlopen(req, timeout=timeout).read().decode("utf-8", "ignore")
        except Exception as e:  # noqa: BLE001
            if i == retries - 1:
                print(f"  [warn] fetch fail {type(e).__name__}: {url[:90]}", flush=True)
                return None
            time.sleep(backoff + i * 8)
    return None


def parse_arxiv(xml):
    out = []
    if not xml:
        return out
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return out
    for e in root.findall("a:entry", NS):
        aid = (e.findtext("a:id", "", NS) or "").rsplit("/", 1)[-1]
        aid = re.sub(r"v\d+$", "", aid)
        if not aid:
            continue
        cats = [c.get("term", "") for c in e.findall("a:category", NS)]
        pc = e.find("a:primary_category", NS)
        out.append({
            "id": aid,
            "title": re.sub(r"\s+", " ", (e.findtext("a:title", "", NS) or "")).strip(),
            "abstract": re.sub(r"\s+", " ", (e.findtext("a:summary", "", NS) or "")).strip(),
            "published": (e.findtext("a:published", "", NS) or "")[:10],
            "updated": (e.findtext("a:updated", "", NS) or "")[:10],
            "primary": pc.get("term", "") if pc is not None else (cats[0] if cats else ""),
            "categories": cats,
        })
    return out


def is_3dgs(p):
    t = (p["title"] + " " + p["abstract"]).lower()
    return ("gaussian" in t and "splat" in t) or "3dgs" in t or "gaussian splatting" in t


def arxiv_search(query, max_pages=3, page_size=100):
    """分页抓取；返回条目列表。"""
    got, seen = [], set()
    for start in range(0, max_pages * page_size, page_size):
        url = ARXIV_API.format(urllib.parse.urlencode({
            "search_query": query,
            "start": start,
            "max_results": page_size,
            "sortBy": "submittedDate",
            "sortOrder": "descending",
        }))
        ents = parse_arxiv(fetch(url))
        if not ents:
            break
        new = [e for e in ents if e["id"] not in seen]
        for e in new:
            seen.add(e["id"])
        got += new
        if len(ents) < page_size:
            break
        time.sleep(SLEEP)
    return got


def s2_search(query, limit=100, year="2026"):
    """Semantic Scholar 交叉源。该 API 常限流/不可达，故短超时、少重试、失败即跳过。"""
    url = S2_API.format(urllib.parse.urlencode({
        "query": query,
        "limit": limit,
        "year": year,
        "fields": "title,abstract,externalIds,year,venue,publicationDate",
    }))
    raw = fetch(url, retries=2, timeout=25, backoff=5)
    if not raw:
        return []
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return []
    out = []
    for it in data.get("data", []):
        ext = it.get("externalIds") or {}
        aid = ext.get("ArXiv")
        if not aid:
            continue
        aid = re.sub(r"v\d+$", "", aid)
        out.append({
            "id": aid,
            "title": re.sub(r"\s+", " ", it.get("title") or "").strip(),
            "abstract": re.sub(r"\s+", " ", it.get("abstract") or "").strip(),
            "published": (it.get("publicationDate") or "")[:10],
            "primary": "",
            "categories": [],
        })
    return out


def main():
    days = int(sys.argv[1]) if len(sys.argv) > 1 else 150
    # arXiv submittedDate 必须是 YYYYMMDDHHMM（不能带横杠，否则 400）
    since = (datetime.now(timezone.utc) - timedelta(days=days)).strftime("%Y%m%d")
    today_s = date.today().strftime("%Y%m%d")
    win = f"submittedDate:[{since}0000 TO {today_s}2359]"

    with io.open(os.path.join(ROOT, "data", "methods.json"), encoding="utf-8") as f:
        d = json.load(f)
    known = set()
    for m in d.get("methods", []):
        a = (m.get("arxiv_id") or "").strip()
        if a:
            known.add(re.sub(r"v\d+$", "", a))
    print(f"[harvest] 窗口 近{days}天 (自 {since})；已收录 {len(known)} 条")

    queries = [
        f'cat:cs.CV AND abs:"gaussian splatting" AND {win}',
        f'cat:cs.GR AND abs:"gaussian splatting" AND {win}',
        f'all:"gaussian splatting" AND {win}',
        f'abs:"3D Gaussian Splatting" AND {win}',
        f'abs:"Gaussian Splatting" AND cat:cs.RO AND {win}',
        f'ti:"Gaussian Splatting" AND {win}',
    ]

    pool = {}
    for i, q in enumerate(queries, 1):
        ents = arxiv_search(q, max_pages=3)
        added = 0
        for p in ents:
            if p["id"] in pool:
                continue
            if p["id"] in known:
                continue
            if not is_3dgs(p):
                continue
            p["src"] = "arxiv"
            pool[p["id"]] = p
            added += 1
        print(f"  [{i}/{len(queries)}] {q[:60]:<60} 抓取 {len(ents)} 新增 {added}")
        time.sleep(SLEEP)

    # 渠道 2：Semantic Scholar 交叉补充（可选，默认关闭——该源常限流）
    if "--s2" in sys.argv:
        print("[harvest] Semantic Scholar 交叉检索 ...", flush=True)
        for q in ["gaussian splatting", "3D gaussian splatting", "gaussian splatting SLAM",
                  "gaussian splatting reconstruction"]:
            ents = s2_search(q, limit=100)
            added = 0
            for p in ents:
                if not p["id"] or p["id"] in known or p["id"] in pool:
                    continue
                if not is_3dgs(p):
                    continue
                p["src"] = "s2"
                pool[p["id"]] = p
                added += 1
            print(f"  s2:{q:<35} 返回 {len(ents)} 新增 {added}", flush=True)
            time.sleep(3)
    else:
        print("[harvest] 跳过 Semantic Scholar（加 --s2 启用）", flush=True)

    papers = sorted(pool.values(), key=lambda p: p.get("published", ""), reverse=True)
    out_dir = os.path.join(ROOT, "reports", "harvest")
    os.makedirs(out_dir, exist_ok=True)
    out = {
        "harvested_at": datetime.now(timezone.utc).isoformat(),
        "window_days": days,
        "since": since,
        "known_count": len(known),
        "count": len(papers),
        "papers": papers,
    }
    path = os.path.join(out_dir, "candidates.json")
    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"\n[harvest] 候选池 {len(papers)} 篇 -> {path}")

    # 简报
    md = [f"# 3DGS 新论文抓取候选池 — {date.today().isoformat()}", "",
          f"窗口：近 {days} 天（自 {since}）；已收录 {len(known)} 条去重后，候选 **{len(papers)}** 篇。", ""]
    for p in papers:
        md.append(f"- `{p['id']}` {p['title'][:100]} — {p.get('published','')} · {p.get('primary','')}")
    with io.open(os.path.join(out_dir, f"candidates-{date.today().isoformat()}.md"), "w",
                 encoding="utf-8", newline="\n") as f:
        f.write("\n".join(md))


if __name__ == "__main__":
    main()
