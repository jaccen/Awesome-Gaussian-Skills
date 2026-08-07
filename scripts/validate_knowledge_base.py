#!/usr/bin/env python3
"""
validate_knowledge_base.py — 知识库数据 CI 校验器（P0）

校验项（任一失败即非零退出）：
  1. data/methods.json 存在且可解析，count 与 methods 数组长度一致
  2. 无重复方法名（大小写不敏感）、无重复非空 arXiv ID
  3. arXiv ID 格式合法（^\d{4}\.\d{4,5}(v\d+)?$）
  4. category 全部属于 data/categories.json 规范集
  5. 伪造黑名单条目不存在于任何数据载体
  6. CSV / docs/index.html METHODS / docs/abstracts.js 三载体计数与 methods.json 一致
  7. （可选 --check-arxiv）抽样在线核验 arXiv ID 可达性

用法：
  python3 scripts/validate_knowledge_base.py            # 离线全量校验
  python3 scripts/validate_knowledge_base.py --check-arxiv 20   # 额外抽样20条在线核验
"""
import csv
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARXIV_RE = re.compile(r"^\d{4}\.\d{4,5}(v\d+)?$")

FABRICATED_BLACKLIST = {
    "gs-lrm-v2", "gs-lrm-full", "mvsplat-v2", "gpsgaussian-stereo", "gaussiancross",
}

errors = []
warnings = []


def check(cond, msg):
    if not cond:
        errors.append(msg)


def main():
    methods_json = ROOT / "data" / "methods.json"
    check(methods_json.exists(), "data/methods.json 不存在（请先运行 scripts/build_knowledge_base.py）")
    if errors:
        finish()

    data = json.loads(methods_json.read_text(encoding="utf-8"))
    methods = data["methods"]

    # 1. count 一致
    check(data.get("count") == len(methods),
          f"methods.json count 字段 ({data.get('count')}) 与数组长度 ({len(methods)}) 不一致")

    # 2. 去重
    names = [m["name"].casefold() for m in methods]
    dup_names = {n for n in names if names.count(n) > 1}
    check(not dup_names, f"重复方法名: {sorted(dup_names)}")
    ids = [m["arxiv_id"] for m in methods if m.get("arxiv_id")]
    dup_ids = {i for i in ids if ids.count(i) > 1}
    check(not dup_ids, f"重复 arXiv ID: {sorted(dup_ids)}")

    # 3. arXiv 格式
    bad_ids = [f"{m['name']}:{m['arxiv_id']}" for m in methods
               if m.get("arxiv_id") and not ARXIV_RE.match(m["arxiv_id"])]
    check(not bad_ids, f"arXiv ID 格式非法: {bad_ids[:10]}")

    # 4. 类别规范集
    cats = json.loads((ROOT / "data" / "categories.json").read_text(encoding="utf-8"))
    canonical = set(cats["canonical"])
    bad_cats = sorted({m["category"] for m in methods} - canonical)
    check(not bad_cats, f"类别超出规范 taxonomy: {bad_cats}")

    # 5. 黑名单
    for m in methods:
        check(re.sub(r"\s+", "", m["name"]).casefold() not in FABRICATED_BLACKLIST,
              f"已证伪伪造条目仍存在: {m['name']}")

    # 6. 三载体计数一致
    n = len(methods)
    with open(ROOT / "3dgs-methods-overview.csv", encoding="utf-8") as f:
        csv_n = sum(1 for _ in csv.DictReader(f))
    check(csv_n == n, f"CSV 行数 {csv_n} != methods.json {n}（请重新运行构建脚本）")

    text = (ROOT / "docs" / "index.html").read_text(encoding="utf-8")
    block = text.split("const METHODS = [", 1)[1].split("\n];", 1)[0]
    html_n = len(re.findall(r"\{ name: ", block))
    check(html_n == n, f"index.html METHODS {html_n} != methods.json {n}")

    ab_text = (ROOT / "docs" / "abstracts.js").read_text(encoding="utf-8")
    ab_n = len(re.findall(r'^  ".+": \{ abstractEn:', ab_text, flags=re.M))
    check(ab_n == n, f"abstracts.js 键数 {ab_n} != methods.json {n}")

    # 覆盖率统计（仅提示）
    with_id = sum(1 for m in methods if m.get("arxiv_id"))
    with_code = sum(1 for m in methods if m.get("code_url"))
    print(f"[info] 总数 {n} | 含 arXiv {with_id} ({with_id*100//n}%) | 含代码链接 {with_code} ({with_code*100//n}%)")

    # 7. 可选在线抽样核验
    if "--check-arxiv" in sys.argv:
        try:
            k = int(sys.argv[sys.argv.index("--check-arxiv") + 1])
        except (IndexError, ValueError):
            k = 10
        import random
        random.seed(42)
        sample = random.sample([m for m in methods if m.get("arxiv_id")], min(k, len(ids)))
        for m in sample:
            url = f"https://arxiv.org/abs/{m['arxiv_id']}"
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "knowledge-ci/1.0"})
                with urllib.request.urlopen(req, timeout=15) as r:
                    ok = r.status == 200
            except Exception as e:
                ok = False
                warnings.append(f"arXiv 不可达 {m['name']} {url}: {e}")
            check(ok, f"arXiv 不可达 {m['name']} {url}")
            print(f"  [arxiv] {m['name']} {m['arxiv_id']} -> {'OK' if ok else 'FAIL'}")

    finish()


def finish():
    for w in warnings:
        print(f"[warn] {w}")
    if errors:
        for e in errors:
            print(f"[FAIL] {e}")
        sys.exit(1)
    print("[PASS] 知识库校验全部通过")
    sys.exit(0)


if __name__ == "__main__":
    main()
