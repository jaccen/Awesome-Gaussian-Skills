#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""补齐 docs/abstracts.js 中相对 data/methods.json 缺失的条目摘要。

来源优先级：
  1. arXiv API 的 summary（以 arxiv_id 为准，分批拉取，批间隔 ≥4s）
  2. 兜底：methods.json 的 desc（标注来源，便于后续人工补齐）
已有条目原样保留，不会覆盖。
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

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS = os.path.join(ROOT, "docs", "abstracts.js")
JSON = os.path.join(ROOT, "data", "methods.json")
NS = {"a": "http://www.w3.org/2005/Atom"}
UA = {"User-Agent": "awesome-gaussian-skills-abstracts/1.0"}


def js_escape(s):
    return (s or "").replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")


def fetch(url, retries=3):
    for i in range(retries):
        try:
            return urllib.request.urlopen(
                urllib.request.Request(url, headers=UA), timeout=45).read().decode("utf-8", "ignore")
        except Exception as e:  # noqa: BLE001
            if i == retries - 1:
                print(f"  [warn] {type(e).__name__}")
                return None
            time.sleep(12 + i * 10)
    return None


def arxiv_batch(ids):
    """按 ID 列表批量取摘要；返回 {id: {'title','abstract'}}"""
    q = "id_list=" + ",".join(ids)
    url = "http://export.arxiv.org/api/query?" + urllib.parse.urlencode({
        "search_query": "", "id_list": ",".join(ids), "max_results": len(ids)})
    xml = fetch(url)
    out = {}
    if not xml:
        return out
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return out
    for e in root.findall("a:entry", NS):
        aid = (e.findtext("a:id", "", NS) or "").rsplit("/", 1)[-1]
        aid = re.sub(r"v\d+$", "", aid)
        out[aid] = {
            "title": re.sub(r"\s+", " ", e.findtext("a:title", "", NS) or "").strip(),
            "abstract": re.sub(r"\s+", " ", e.findtext("a:summary", "", NS) or "").strip(),
        }
    return out


def main(apply=False):
    with io.open(JSON, encoding="utf-8") as f:
        d = json.load(f)
    methods = d["methods"]
    js = io.open(JS, encoding="utf-8", newline="").read()

    have = set(re.findall(r'^  "((?:[^"\\]|\\.)*)":\s*\{', js, re.M))
    missing = [m for m in methods if m["name"] not in have]
    print(f"json {len(methods)} / js 已有 {len(have)} / 待补 {len(missing)}")

    todo = [m for m in missing if (m.get("arxiv_id") or "").strip()]
    noid = [m for m in missing if not (m.get("arxiv_id") or "").strip()]
    print(f"  有 arXiv ID 可拉取: {len(todo)}；无 ID 走 desc 兜底: {len(noid)}")

    abstracts = {}

    # 优先离线取：抓取阶段已落盘的候选池里就有 arXiv 摘要，避免重复请求触发限流
    cache = {}
    cand_path = os.path.join(ROOT, "reports", "harvest", "candidates.json")
    if os.path.exists(cand_path):
        with io.open(cand_path, encoding="utf-8") as f:
            try:
                for p in json.load(f).get("papers", []):
                    if p.get("id") and p.get("abstract"):
                        cache[p["id"]] = p["abstract"]
            except json.JSONDecodeError:
                pass
    cached_hits = sum(1 for m in todo if (m["arxiv_id"] or "").strip() in cache)

    todo_net = [m for m in todo if (m["arxiv_id"] or "").strip() not in cache]
    for m in todo:
        aid = (m["arxiv_id"] or "").strip()
        if aid in cache:
            abstracts[m["name"]] = (cache[aid], "cache")
    print(f"  离线缓存命中 {cached_hits} / 需联网 {len(todo_net)}")

    B = 25
    for s in range(0, len(todo_net), B):
        batch = todo_net[s:s + B]
        got = arxiv_batch([(m["arxiv_id"] or "").strip() for m in batch])
        for m in batch:
            aid = (m["arxiv_id"] or "").strip()
            g = got.get(aid)
            abstracts[m["name"]] = (g["abstract"] if g and g.get("abstract") else "",
                                    "arxiv" if g and g.get("abstract") else "miss")
        print(f"  批次 {s // B + 1}: 请求 {len(batch)} / 命中 {len(got)}")
        if s + B < len(todo_net):
            time.sleep(4.5)

    for m in noid:
        abstracts[m["name"]] = (m.get("desc", ""), "desc")

    # 追加到 js
    lines = []
    for m in missing:
        ab, src = abstracts.get(m["name"], ("", "miss"))
        if not ab:
            ab = m.get("desc", "")
            src = "desc"
        lines.append('  "{name}": {{ abstractEn: "{en}", abstractCn: "" }},'.format(
            name=js_escape(m["name"]), en=js_escape(ab)))
        print(f"    + {m['name']:<40} [{src}] {len(ab)} 字符")

    if not lines:
        print("无需补齐。")
        return

    # 插入到结尾 "};" 之前
    idx = js.rfind("\n};")
    new_js = js[:idx] + "\n" + "\n".join(lines) + "\n};\n"

    if apply:
        bak = JS + ".bak"
        with io.open(bak, "wb") as f:
            f.write(js.encode("utf-8"))
        with io.open(JS, "w", encoding="utf-8", newline="") as f:
            f.write(new_js)
        print(f"\n[APPLIED] 已写入 {JS}（备份 {bak}）")
    else:
        print("\n[DRY-RUN] 未写入（加 --apply 生效）")


if __name__ == "__main__":
    main(apply="--apply" in sys.argv)
