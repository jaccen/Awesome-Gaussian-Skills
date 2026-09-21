# -*- coding: utf-8 -*-
"""以 methods.json 校对 docs/abstracts.js：删除已移除条目的键、同步改名条目。"""
import io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS = os.path.join(ROOT, "docs", "abstracts.js")
JSONP = os.path.join(ROOT, "data", "methods.json")

RENAME = {"GeoGS-SLAM v2": "GeoGS-SLAM (Geometric Priors)",
          "Luminance-GS++": "Luminance-GS"}


def main():
    apply = "--apply" in sys.argv
    names = {m["name"] for m in json.load(io.open(JSONP, encoding="utf-8"))["methods"]}
    js = io.open(JS, encoding="utf-8", newline="").read()
    lines = js.split("\n")

    out, removed, renamed, kept = [], [], [], 0
    for ln in lines:
        m = re.match(r'^  "((?:[^"\\]|\\.)*)":\s*\{', ln)
        if not m:
            out.append(ln)
            continue
        nm = m.group(1).encode().decode("unicode_escape") if "\\" in m.group(1) else m.group(1)
        if nm in names:
            out.append(ln); kept += 1
        elif nm in RENAME and RENAME[nm] in names:
            new = RENAME[nm].replace("\\", "\\\\").replace('"', '\\"')
            out.append(re.sub(r'^  "(?:[^"\\]|\\.)*":', '  "%s":' % new, ln, count=1))
            renamed.append(f"{nm} -> {RENAME[nm]}")
        else:
            removed.append(nm)
    new_js = "\n".join(out)
    print(f"abstracts.js: 保留 {kept} / 改名 {len(renamed)} / 删除 {len(removed)}")
    for r in removed[:15]:
        print("   -", r)
    for r in renamed:
        print("   ~", r)
    if apply and (removed or renamed):
        io.open(JS + ".bak", "wb").write(js.encode("utf-8"))
        io.open(JS, "w", encoding="utf-8", newline="").write(new_js)
        print("[APPLIED] 已写入 " + JS)
    else:
        print("[DRY-RUN] 加 --apply 生效")


if __name__ == "__main__":
    main()
