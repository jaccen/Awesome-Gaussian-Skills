#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Real-time citation auditor for 3DGS manuscripts.

Verifies cited arXiv IDs / method names against the verified registry
(data/methods.json) and the arXiv metadata cache (.arxiv_cache.json).
Delegating verification to live data (instead of remembered prose) is what
keeps the review side of cg-paper-writing honest when methods.json updates.

Usage:
  python scripts/audit_manuscript_citations.py --file <manuscript.md>
  python scripts/audit_manuscript_citations.py --id 2402.17427
  python scripts/audit_manuscript_citations.py --name "HybridGS"
"""
import argparse, json, os, re, sys, collections

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
METHODS = os.path.join(ROOT, "data", "methods.json")
CACHE = os.path.join(ROOT, ".arxiv_cache.json")

def load_json(p, what):
    if not os.path.exists(p):
        sys.exit(f"[FATAL] cannot find {what}: {p}")
    return json.load(open(p, encoding="utf-8", newline=""))

def norm(s):
    if not s:
        return ""
    s = s.lower()
    s = re.sub(r"\$", "", s)
    s = re.sub(r"[\^_{}]", "", s)
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def split_camel(name):
    s = re.sub(r"([a-z])([A-Z])", r"\1 \2", name)
    s = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1 \2", s)
    s = re.sub(r"([0-9])([A-Za-z])", r"\1 \2", s)
    s = re.sub(r"([A-Za-z])([0-9])", r"\1 \2", s)
    return s

def name_title_match(name, title, summary):
    """Does the method name plausibly correspond to this paper? (used as advisory)"""
    nn = norm(split_camel(name))
    tn, sn = norm(title), norm(summary)
    if nn and (nn in tn or nn in sn):
        return True, "name-substring"
    toks = [t for t in nn.split() if len(t) >= 2]
    hit = [t for t in toks if t in set(tn.split()) or t in set(sn.split())]
    if toks and len(hit) >= max(1, len(toks) // 2):
        return True, f"token-overlap({len(hit)}/{len(toks)})"
    return False, "no-overlap"

ID_RE = re.compile(r"\b(2\d{3}\.\d{4,5})\b")

def main():
    ap = argparse.ArgumentParser(description="Audit 3DGS manuscript citations against verified registry")
    ap.add_argument("--file", help="manuscript file to audit (md/txt)")
    ap.add_argument("--id", help="audit a single arXiv id")
    ap.add_argument("--name", help="audit a single method name")
    args = ap.parse_args()
    if not (args.file or args.id or args.name):
        ap.error("need one of --file / --id / --name")

    methods = load_json(METHODS, "methods.json")["methods"]
    cache = load_json(CACHE, ".arxiv_cache.json") if os.path.exists(CACHE) else {}

    by_id = collections.defaultdict(list)
    by_name = collections.defaultdict(list)
    for m in methods:
        if m.get("arxiv_id"):
            by_id[m["arxiv_id"]].append(m)
        by_name[(m.get("name") or "").strip().lower()].append(m)

    print(f"registry loaded: {len(methods)} methods, {len(by_id)} distinct arXiv ids, cache {len(cache)} entries\n")

    def audit_id(aid):
        rows = by_id.get(aid, [])
        c = cache.get(aid, {})
        title = (c.get("title") or "").strip()
        # an id only counts as verified if we actually have a real title;
        # the cache deliberately keeps unreachable ids as EMPTY entries
        if not rows and not title:
            print(f"  [RED FLAG] {aid}: NOT in registry (methods.json) and NO verifiable arXiv title "
                  f"→ 编号不可达或为虚构，禁止引用（核查协议第 6 条：不可核实即不引）")
            return
        if not rows:
            print(f"  [WARN] {aid}: not in methods.json, but arXiv cache has it → (未登记方法)")
            print(f"         arXiv title: {title[:90]}")
        else:
            for m in rows:
                ok, how = name_title_match(m.get("name", ""), title, c.get("summary", ""))
                flag = "OK " if ok else "WARN"
                print(f"  [{flag}] {aid}: registry name={m.get('name')!r} venue={m.get('venue')!r} "
                      f"cat={m.get('category')!r}")
                print(f"          arXiv title: {title[:100]}")
                print(f"          name↔title check: {how}")
                if not ok:
                    print(f"          → 方法名与 arXiv 标题无重合，需人工裁定：可能是缩写（可接受）或名/号错配（须修正）")
        print()

    def audit_name(nm):
        rows = by_name.get(nm.strip().lower(), [])
        if not rows:
            # fuzzy contains
            cand = [m for m in methods if nm.strip().lower() in (m.get("name") or "").lower()]
            if cand:
                print(f"  [INFO] no exact match for {nm!r}; {len(cand)} fuzzy candidates:")
                for m in cand[:10]:
                    print(f"         {m.get('name')} / arXiv:{m.get('arxiv_id')} / {m.get('venue')} / {m.get('category')}")
            else:
                print(f"  [RED FLAG] name {nm!r} NOT in registry → 该方法名无法核实，"
                      f"禁止凭记忆编写编号；若为自述方法名请确认论文标题后登记")
            return
        for m in rows:
            aid = m.get("arxiv_id")
            c = cache.get(aid or "", {})
            print(f"  [OK] name={m.get('name')!r} → arXiv:{aid} venue={m.get('venue')} "
                  f"cat={m.get('category')} year={m.get('year')}")
            if c.get("title"):
                print(f"       arXiv: {c['title'][:100]}")
        print()

    if args.id:
        print(f"== single id {args.id} ==")
        audit_id(args.id)
    if args.name:
        print(f"== single name {args.name!r} ==")
        audit_name(args.name)
    if args.file:
        p = args.file
        if not os.path.exists(p):
            sys.exit(f"[FATAL] manuscript not found: {p}")
        txt = open(p, encoding="utf-8", errors="ignore").read()
        ids = ID_RE.findall(txt)
        uniq = sorted(set(ids))
        print(f"== manuscript {p} ==")
        print(f"found {len(ids)} arXiv id occurrences ({len(uniq)} unique)\n")
        problems = 0
        for aid in uniq:
            rows = by_id.get(aid, [])
            c = cache.get(aid, {})
            title = (c.get("title") or "")
            if not rows and not title:
                print(f"  [RED FLAG] {aid}: 不可核实（registry 无此条且 arXiv 无可用标题）→ 疑似虚构编号")
                problems += 1
                continue
            name = rows[0].get("name") if rows else "(未登记)"
            venue = rows[0].get("venue") if rows else "(未登记)"
            title = (c.get("title") or "")
            ok, how = name_title_match(name if name != "(未登记)" else "", title, c.get("summary", ""))
            line = f"  {aid}: {name} | {venue}"
            if rows and not ok:
                line += f"  [WARN name↔title={how}]"
                problems += 1
            print(line)
        print(f"\nsummary: {len(uniq)} unique ids audited, {problems} item(s) need human adjudication")
        print("NOTE: venue shown is the methods.json REGISTERED value and must be re-verified "
              "(several historical venue fields were wrong — see verification-report.md §6).")

if __name__ == "__main__":
    main()
