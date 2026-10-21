# -*- coding: utf-8 -*-
"""检测 references 类 Markdown 中 arXiv ID 的时效与正确性。

用法:
    python scripts/check_reference_freshness.py <file.md> [more.md ...]
    python scripts/check_reference_freshness.py <file.md> --months 12

判读:
    NOT_FOUND  ID 在 arXiv 查不到            → P0 必须修
    MISMATCH   返回标题与条目名明显不符      → P0 必须修（可能指向另一篇论文）
    API_ERROR  批次请求失败，未能核验        → 非 ID 问题，加大 --delay 重跑
    WEAK       仅部分词匹配                  → 人工确认
    STALE      发布时间超过 --months 月      → P1 评估是否被超越
    OK         标题匹配且在时效内

退出码: 0 全通过｜1 存在 NOT_FOUND/MISMATCH｜2 因 API 失败结论不确定。
"""
import argparse
import re
import sys
import time
import unicodedata
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date
from pathlib import Path

NS = {"a": "http://www.w3.org/2005/Atom"}
ARXIV_ID = re.compile(r"\b(\d{4}\.\d{4,5})\b")


def norm_key(s):
    """压缩为小写字母数字串，用于子串/前缀判断。"""
    s = unicodedata.normalize("NFKC", s).lower()
    return "".join(ch for ch in s if ch.isalnum())


def tokenize(s):
    s = unicodedata.normalize("NFKC", s).lower()
    for ch in "-_/()（）[]":
        s = s.replace(ch, " ")
    return [t for t in s.split() if len(t) >= 2]


def parse_entries(text):
    """抽取 (expected_name, arxiv_id, line_no)。

    跳过：
    - ``<!-- freshness:ignore-start -->`` 与 ``<!-- freshness:ignore-end -->`` 之间的内容
      （用于核验记录、历史错配说明等"提及但不引用"的段落）
    - 围栏代码块（``` / ~~~）内的示例
    """
    out = []
    in_ignore = False
    in_fence = False
    for i, line in enumerate(text.splitlines(), 1):
        low = line.lower()
        if "freshness:ignore-start" in low:
            in_ignore = True
            continue
        if "freshness:ignore-end" in low:
            in_ignore = False
            continue
        if low.strip().startswith("```") or low.strip().startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_ignore or in_fence:
            continue
        ids = ARXIV_ID.findall(line)
        if not ids:
            continue
        stripped = line.strip()
        name = ""
        if stripped.startswith("|"):
            cells = [c.strip() for c in stripped.strip("|").split("|")]
            if cells:
                name = cells[0]
        elif stripped.startswith(("- ", "* ")):
            body = stripped[2:]
            name = re.split(r"[:：]|\s*https?://", body, maxsplit=1)[0].strip()
        for aid in ids:
            out.append((name, aid, i))
    return out


def dedupe(entries):
    """同一 (ID, 归一化条目名) 只保留首次出现，减少表格+链接列表的重复噪声。"""
    seen, out = set(), []
    for e in entries:
        key = (e[2], norm_key(e[1]))
        if key in seen:
            continue
        seen.add(key)
        out.append(e)
    return out


def fetch(batch, retries=4):
    url = ("https://export.arxiv.org/api/query?id_list=" + ",".join(batch)
           + "&max_results=40")
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (ref-freshness)"})
            raw = urllib.request.urlopen(req, timeout=40).read().decode("utf-8")
            if "<entry" in raw or "<totalResults>0<" in raw:
                return ET.fromstring(raw)
        except Exception as e:
            print("    retry %d/%d: %s" % (attempt + 1, retries, e), file=sys.stderr, flush=True)
            time.sleep(min(10 * (attempt + 1), 30))
    return None


def classify(name, title):
    from audit_manuscript_citations import name_title_match
    if not name:
        return "WEAK"
    matched, _ = name_title_match(name, title)
    return "MATCH" if matched else "WEAK"


def months_between(pub_ym, today):
    y, m = pub_ym
    return (today.year - y) * 12 + (today.month - m)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="+")
    ap.add_argument("--months", type=int, default=18, help="超过多少月提示人工复查（年龄不等于过时）（默认 18）")
    ap.add_argument("--delay", type=float, default=6.0, help="批次间隔秒数（默认 6；被限流时调大）")
    args = ap.parse_args()

    entries = []
    for f in args.files:
        p = Path(f)
        if not p.exists():
            print("文件不存在:", f, file=sys.stderr)
            return 2
        entries.extend((str(p),) + e for e in parse_entries(p.read_text(encoding="utf-8")))
    entries = dedupe(entries)

    if not entries:
        print("未发现 arXiv ID")
        return 0

    ids = sorted({e[2] for e in entries})
    print("文件 %d 个｜条目 %d 条｜唯一 ID %d 个｜STALE 阈值 %d 月"
          % (len(args.files), len(entries), len(ids), args.months))

    meta = {}
    failed = set()
    for start in range(0, len(ids), 5):
        batch = ids[start:start + 5]
        root = fetch(batch)
        if root is None:
            print("  批次请求失败（不是 ID 错误）:", batch, file=sys.stderr)
            failed.update(batch)
            continue
        for e in root.findall("a:entry", NS):
            eid = (e.findtext("a:id", "", NS) or "").rsplit("/abs/", 1)[-1]
            base = eid.rsplit("v", 1)[0] if eid.rsplit("v", 1)[-1].isdigit() else eid
            meta[base] = {
                "title": " ".join(e.find("a:title", NS).text.split()),
                "pub": e.find("a:published", NS).text[:10],
            }
        if start + 5 < len(ids):
            time.sleep(args.delay)

    today = date.today()
    rows, hard = [], 0
    for path, name, aid, ln in entries:
        if aid in failed:
            rows.append(("API_ERROR", aid, name, "-", "-", path, ln))
            continue
        m = meta.get(aid)
        if m is None:
            rows.append(("NOT_FOUND", aid, name, "-", "-", path, ln))
            hard += 1
            continue
        verdict = classify(name, m["title"])
        y, mo = int(m["pub"][:4]), int(m["pub"][5:7])
        age = months_between((y, mo), today)
        if verdict == "MISMATCH":
            hard += 1
        if verdict in ("MISMATCH", "NOT_FOUND"):
            status = verdict
        elif age > args.months:
            status = "STALE" if verdict == "MATCH" else "WEAK+STALE"
        else:
            status = verdict
        rows.append((status, aid, name, m["pub"], "%d月" % age, path, ln))

    order = {"MISMATCH": 0, "NOT_FOUND": 1, "API_ERROR": 2, "WEAK+STALE": 3,
             "WEAK": 4, "STALE": 5, "MATCH": 6}
    rows.sort(key=lambda r: (order.get(r[0], 9), r[1]))

    print("\n%-11s %-11s %-9s %-22s %s" % ("状态", "ID", "年龄", "条目名", "返回标题"))
    print("-" * 118)
    for status, aid, name, pub, age, path, ln in rows:
        t = meta.get(aid, {}) or {}
        print("%-11s %-11s %-9s %-22s %s"
              % (status, aid, age, (name or "-")[:22], (t.get("title") or "查无此ID")[:56]))

    counts = {}
    for r in rows:
        counts[r[0]] = counts.get(r[0], 0) + 1
    print("\n汇总:", "｜".join("%s %d" % (k, counts[k]) for k in sorted(counts, key=lambda x: order.get(x, 9))))
    if hard:
        print("\n[FAIL] 存在 %d 条 P0 问题（MISMATCH/NOT_FOUND），必须修正后再引用。" % hard)
        return 1
    if failed:
        print("\n[INCONCLUSIVE] %d 个 ID 因 API 请求失败未能核验（非 ID 错误）。"
              "请增大 --delay 或稍后重跑，不要据此认定引用有问题。" % len(failed))
        return 2
    print("\n[METADATA ONLY] Lexical matches do not verify technical claims or venue. Age flags prompt review, not rejection of foundational work.")
    if any(row[0] in ("WEAK", "WEAK+STALE") for row in rows):
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
