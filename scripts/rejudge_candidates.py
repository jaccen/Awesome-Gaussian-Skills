#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Re-adjudicate the 77 name<->title candidates with smarter normalized matching,
using the real arXiv titles/summaries cached in .arxiv_cache.json.

Goal: separate false-positives (method is an abbreviation / alias of the paper)
from genuine suspects (name and title seem to describe different things), and
surface venue-field mismatches worth a human check.
"""
import json, re, collections

ROOT = "."
methods = json.load(open(f"{ROOT}/data/methods.json", encoding="utf-8"))["methods"]
cache = json.load(open(f"{ROOT}/.arxiv_cache.json", encoding="utf-8"))

def norm(s):
    if not s:
        return ""
    s = s.lower()
    # strip latex artifacts
    s = re.sub(r"\$", "", s)
    s = re.sub(r"[\^_{}]", "", s)
    s = s.replace("\\\\", " ")
    # insert space before camelCase boundaries in the NAME only later
    s = re.sub(r"[^a-z0-9]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def split_camel(name):
    # 2DGS, ExpressiveGaussianHuman, DSStyleGaussian -> tokens
    s = re.sub(r"([a-z])([A-Z])", r"\1 \2", name)
    s = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1 \2", s)
    s = re.sub(r"([0-9])([A-Za-z])", r"\1 \2", s)
    s = re.sub(r"([A-Za-z])([0-9])", r"\1 \2", s)
    return s

# ---- Step 1: recompute the candidate set with smart matching ----
report_ids = {}  # arxiv_id -> (name, reported_title_snippet)
with open(f"{ROOT}/references/verification-report.md", encoding="utf-8") as f:
    for line in f:
        m = re.match(r"- \*\*(.+?)\*\* \(`(2\d{3}\.\d{4,5})`\) → arXiv 标题疑似：`(.+?)`", line)
        if m:
            report_ids[m.group(2)] = (m.group(1), m.group(3))

results = []
for x in methods:
    aid = x.get("arxiv_id")
    if not aid or aid not in cache:
        continue
    name = x.get("name", "")
    title = cache[aid].get("title", "") or ""
    summary = cache[aid].get("summary", "") or ""
    # normalized name: camel-split then norm
    name_norm = norm(split_camel(name))
    title_norm = norm(title)
    summ_norm = norm(summary)

    name_toks = [t for t in name_norm.split() if len(t) >= 2]
    # token overlap with title + summary
    title_tokset = set(title_norm.split())
    summ_tokset = set(summ_norm.split())
    matched = [t for t in name_toks if t in title_tokset or t in summ_tokset]
    # also check if whole name_norm is substring of title_norm
    substr_in_title = name_norm and (name_norm in title_norm)
    substr_in_summ = name_norm and (name_norm in summ_norm)

    if substr_in_title or substr_in_summ or (name_toks and len(matched) >= max(1, len(name_toks)//2)):
        status = "OK-abbrev"
    elif matched:
        status = "OK-partial"
    else:
        status = "SUSPECT"

    results.append({
        "name": name, "arxiv_id": aid, "venue": x.get("venue",""),
        "category": x.get("category",""),
        "title": title[:90], "name_norm": name_norm,
        "matched": matched, "status": status,
    })

# ---- Step 2: classify the 77 report candidates ----
print("="*80)
print("RE-ADJUDICATION OF 77 CANDIDATES")
print("="*80)
by_status = collections.Counter()
suspects = []
for r in results:
    if r["arxiv_id"] in report_ids:
        by_status[r["status"]] += 1
        if r["status"] == "SUSPECT":
            suspects.append(r)

print(f"Of the 77 report candidates, re-classified as:")
for k, v in by_status.most_common():
    print(f"  {k:14s} {v}")
print(f"\nGenuine SUSPECTS (name & title/summary share no token): {len(suspects)}")
print("-"*80)
for r in suspects:
    print(f"  {r['name']:22s} ({r['arxiv_id']}) cat={r['category'][:22]:22s}")
    print(f"       title: {r['title']}")
    print(f"       name_norm: {r['name_norm']}")

# ---- Step 3: venue sanity (flag suspicious venue strings) ----
print("\n" + "="*80)
print("VENUE FIELD SANITY CHECK (heuristic)")
print("="*80)
# Known good venue tokens
good = ["CVPR","ICCV","ECCV","NEURIPS","NIPS","ICML","ICLR","AAAI","IJCAI","SIGGRAPH",
        "TOG","TVCG","TPAMI","TRO","RA-L","IROS","ICRA","WACV","BMVC","3DV","PG","ACM MM",
        "RSS","CORL","ICME","VISIGRAPP","ARXIV","PREPRINT","TMLR"]
weird = []
for x in methods:
    v = (x.get("venue") or "").upper()
    if not v:
        weird.append((x.get("name"), x.get("arxiv_id"), "(empty)"))
        continue
    if not any(g in v for g in good) and "ARXIV" not in v and "PREPRINT" not in v:
        weird.append((x.get("name"), x.get("arxiv_id"), x.get("venue")))
print(f"Entries with non-standard / unrecognized venue strings: {len(weird)}")
for n,a,v in weird[:60]:
    print(f"  {n:24s} {a:14s} venue={v}")

# ---- Step 4: alias/collision scan: same arxiv_id used by >1 distinct method name? ----
idmap = collections.defaultdict(list)
for x in methods:
    if x.get("arxiv_id"):
        idmap[x["arxiv_id"]].append(x.get("name"))
dups = {k:v for k,v in idmap.items() if len(v) > 1}
print("\n" + "="*80)
print(f"arxiv_id shared by MULTIPLE method names: {len(dups)}")
print("="*80)
for k,v in dups.items():
    print(f"  {k}: {v}")
