#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""核实四场报告提及工作的 arXiv 可达性与摘要，供知识库更新决策。
仅核实已收录或候选 ID，不臆造编号。批间 >=4s，<=40/批。
"""
import json, time, urllib.request, urllib.parse, sys, os

CANDIDATES = [
    # 已收录，核实描述侧重点（训练加速 vs 重建加速）
    ("TurboGS", "2606.15924"),
]

def fetch_id_list(ids):
    url = "http://export.arxiv.org/api/query?id_list=" + ",".join(ids)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 AGS-verify"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")

def parse_entries(raw):
    # 简易解析，不依赖外部库
    import re
    entries = []
    for m in re.finditer(r"<entry>(.*?)</entry>", raw, re.S):
        block = m.group(1)
        id_m = re.search(r"<id>(.*?)</id>", block, re.S)
        title_m = re.search(r"<title>(.*?)</title>", block, re.S)
        summary_m = re.search(r"<summary>(.*?)</summary>", block, re.S)
        pub_m = re.search(r"<published>(.*?)</published>", block, re.S)
        authors = re.findall(r"<name>(.*?)</name>", block)
        entry = {
            "arxiv_url": id_m.group(1).strip() if id_m else "",
            "title": re.sub(r"\s+", " ", title_m.group(1).strip()) if title_m else "",
            "summary": re.sub(r"\s+", " ", summary_m.group(1).strip()) if summary_m else "",
            "published": pub_m.group(1).strip() if pub_m else "",
            "authors": authors,
        }
        entries.append(entry)
    return entries

def main():
    ids = [c[1] for c in CANDIDATES]
    print("=== 核实 %d 个候选 ID ===" % len(ids))
    raw = fetch_id_list(ids)
    entries = parse_entries(raw)
    for c_name, c_id in CANDIDATES:
        matched = [e for e in entries if c_id in e["arxiv_url"]]
        if not matched:
            print("\n[%s] id=%s -> NOT FOUND (可能编号无效或尚未收录)" % (c_name, c_id))
            continue
        e = matched[0]
        print("\n[%s] id=%s -> FOUND" % (c_name, c_id))
        print("  title:    %s" % e["title"])
        print("  published:%s" % e["published"])
        print("  authors:  %s" % ", ".join(e["authors"][:6]))
        print("  summary:  %s" % (e["summary"][:600] + ("..." if len(e["summary"])>600 else "")))
    # 退避
    time.sleep(4)

if __name__ == "__main__":
    main()
