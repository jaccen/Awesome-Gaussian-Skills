# -*- coding: utf-8 -*-
"""每日 arXiv 3DGS 论文扫描
- 检索近 N 天 arXiv 上含 gaussian splatting 的新论文（cs.CV/cs.GR 主分类，兼查全库防漏）
- 与 data/methods.json 已收录 ID 去重
- 产出 reports/arxiv-daily/YYYY-MM-DD.md + latest.json；有新论文时以退出码 10 提示
供 .github/workflows/daily-arxiv.yml 每日定时调用。
"""
import io
import json
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NS = {"a": "http://www.w3.org/2005/Atom"}
API = "http://export.arxiv.org/api/query?{}&sortBy=submittedDate&sortOrder=descending&max_results=100"
DAYS_BACK = int(sys.argv[1]) if len(sys.argv) > 1 else 3


def fetch(url: str, retries: int = 3) -> str | None:
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "awesome-gaussian-skills-scan/1.0"})
            return urllib.request.urlopen(req, timeout=40).read().decode("utf-8", "ignore")
        except Exception as e:  # noqa: BLE001
            if i == retries - 1:
                print(f"[warn] fetch fail: {type(e).__name__} {url[:80]}")
                return None
            time.sleep(10)
    return None


def parse_entries(xml: str) -> list[dict]:
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
        out.append({
            "id": aid,
            "title": re.sub(r"\s+", " ", (e.findtext("a:title", "", NS) or "")).strip(),
            "abstract": re.sub(r"\s+", " ", (e.findtext("a:summary", "", NS) or "")).strip(),
            "published": (e.findtext("a:published", "", NS) or "")[:10],
            "primary": (e.find("a:primary_category", NS).get("term", "") if e.find("a:primary_category", NS) is not None else (cats[0] if cats else "")),
            "categories": cats,
        })
    return out


def is_3dgs(p: dict) -> bool:
    txt = (p["title"] + " " + p["abstract"]).lower()
    return ("gaussian" in txt and "splat" in txt) or "3dgs" in txt


def main() -> int:
    # arXiv submittedDate 必须是 YYYYMMDDHHMM（带横杠会返回 400）
    since = (datetime.now(timezone.utc) - timedelta(days=DAYS_BACK)).strftime("%Y%m%d")
    today_str = date.today().strftime("%Y%m%d")
    known = set()
    methods = json.loads(io.open(ROOT / "data" / "methods.json", encoding="utf-8").read())
    entries = methods.get("methods", methods if isinstance(methods, list) else [])
    for m in entries:
        aid = m.get("arxiv_id") or m.get("arxiv")
        if aid:
            known.add(re.sub(r"v\d+$", "", str(aid)))

    today_str = date.today().strftime("%Y%m%d")
    queries = [
        f'cat:cs.CV AND abs:"gaussian splatting" AND submittedDate:[{since}0000 TO {today_str}2359]',
        f'cat:cs.GR AND abs:"gaussian splatting" AND submittedDate:[{since}0000 TO {today_str}2359]',
        f'all:"gaussian splatting" AND submittedDate:[{since}0000 TO {today_str}2359]',
    ]
    found: dict[str, dict] = {}
    for q in queries:
        xml = fetch(API.format(urllib.parse.urlencode({"search_query": q})))
        for p in parse_entries(xml or ""):
            if is_3dgs(p) and p["id"] not in known and p["id"] not in found:
                found[p["id"]] = p
        time.sleep(3.6)

    papers = sorted(found.values(), key=lambda p: p["published"], reverse=True)
    today = date.today().isoformat()
    out_dir = ROOT / "reports" / "arxiv-daily"
    out_dir.mkdir(parents=True, exist_ok=True)

    (out_dir / "latest.json").write_text(
        json.dumps({"date": today, "count": len(papers), "papers": papers}, ensure_ascii=False, indent=1),
        encoding="utf-8")

    lines = [
        f"# arXiv 3DGS 每日扫描 — {today}",
        "",
        f"扫描窗口：近 {DAYS_BACK} 天；检索式：cs.CV / cs.GR / 全库 \"gaussian splatting\"。",
        f"与知识库（{len(known)} 条已收录）去重后，新论文 **{len(papers)}** 篇。",
        "",
    ]
    for p in papers:
        lines.append(f"- **{p['title']}** (`{p['id']}`) — {p['published']} · {p['primary']}")
    lines.append("")
    (out_dir / f"{today}.md").write_text("\n".join(lines), encoding="utf-8")

    print(f"[scan] {today}: {len(papers)} new papers -> {out_dir / (today + '.md')}")
    return 10 if papers else 0


if __name__ == "__main__":
    raise SystemExit(main())
