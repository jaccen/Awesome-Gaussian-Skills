#!/usr/bin/env python3
"""
router_load.py — Router 技能的真实加载器（P2-12）

把 Router 架构从"提示词约定"变成"可执行机制"：解析技能的 manifest.yaml，
按给定轴值解析出应加载的 static/ 片段清单，校验文件存在性，并可选地
输出拼接后的上下文（供 agent 注入或人工检查）。

用法：
  python3 scripts/router_load.py skills/3dgs-method-compare --category core --depth standard
  python3 scripts/router_load.py skills/cg-paper-writing --list
  python3 scripts/router_load.py skills/3dgs-method-compare --category all --emit

退出码：0 成功；1 manifest 缺失/损坏；2 片段缺失；3 轴值非法。
"""
import argparse
import re
import sys
from pathlib import Path


def parse_simple_yaml(text: str) -> dict:
    """Minimal YAML subset parser for manifest.yaml (nested maps + lists of scalars)."""
    root: dict = {}
    stack = [(0, root)]
    key_stack = []

    lines = [l.rstrip() for l in text.split("\n") if l.strip() and not l.strip().startswith("#")]
    i = 0
    while i < len(lines):
        line = lines[i]
        indent = len(line) - len(line.lstrip())
        stripped = line.strip()

        while stack and indent < stack[-1][0]:
            stack.pop()
        parent = stack[-1][1]

        if stripped.startswith("- "):
            # list item: attach to last declared key (tracked via key_stack)
            if key_stack:
                target = key_stack[-1]
                if not isinstance(target.get("__list__"), list):
                    target["__list__"] = []
                target["__list__"].append(_scalar(stripped[2:]))
            i += 1
            continue

        m = re.match(r"([\w\-]+):\s*(.*)$", stripped)
        if not m:
            i += 1
            continue
        key, val = m.group(1), m.group(2).strip()
        # pop key_stack entries deeper than current indent
        while key_stack and key_stack[-1].get("__indent__", 0) > indent:
            key_stack.pop()

        if val == "":
            child: dict = {"__indent__": indent}
            parent[key] = child
            stack.append((indent + 2, child))
            key_stack.append(child)
        else:
            parent[key] = _scalar(val)
        i += 1

    return _clean(root)


def _scalar(v: str):
    v = v.strip().strip('"').strip("'")
    return v


def _clean(node):
    """Remove __indent__ markers; convert {'__list__': [...]} to plain lists."""
    if isinstance(node, dict):
        if "__list__" in node and len(node) == 1 or ("__list__" in node and set(node.keys()) <= {"__list__", "__indent__"}):
            return node["__list__"]
        out = {}
        for k, v in node.items():
            if k == "__indent__":
                continue
            cv = _clean(v)
            if isinstance(cv, dict) and "__list__" in cv and set(cv.keys()) <= {"__list__", "__indent__"}:
                cv = cv["__list__"]
            out[k] = cv
        return out
    return node


def load_manifest(skill_dir: Path) -> dict:
    mf = skill_dir / "manifest.yaml"
    if not mf.exists():
        print(f"ERROR: manifest.yaml not found in {skill_dir}", file=sys.stderr)
        sys.exit(1)
    try:
        return parse_simple_yaml(mf.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"ERROR: manifest.yaml parse failed: {e}", file=sys.stderr)
        sys.exit(1)


def resolve(manifest: dict, axis_values: dict, skill_dir: Path) -> list:
    fragments = []
    routing = manifest.get("routing", {})

    for f in routing.get("always_load", []) or []:
        fragments.append(f)

    on_demand = routing.get("on_demand", {})
    for axis, value in axis_values.items():
        if axis not in on_demand:
            continue
        mapping = on_demand[axis]
        if value not in mapping:
            allowed = sorted(k for k in mapping.keys() if not k.startswith("__"))
            print(f"ERROR: invalid value '{value}' for axis '{axis}'. Allowed: {allowed}", file=sys.stderr)
            sys.exit(3)
        frags = mapping[value]
        if isinstance(frags, str):
            frags = [frags]
        fragments.extend(frags)

    # references section (cg-paper-writing style)
    refs = routing.get("references", {})
    for f in refs.get("on_demand", []) or []:
        fragments.append(f)

    # validate existence, dedupe, keep order
    seen = set()
    resolved = []
    missing = []
    for f in fragments:
        if f in seen:
            continue
        seen.add(f)
        p = skill_dir / f
        if p.exists():
            resolved.append(f)
        else:
            missing.append(f)
    if missing:
        print(f"ERROR: fragments declared in manifest but missing on disk: {missing}", file=sys.stderr)
        sys.exit(2)
    return resolved


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("skill_dir")
    ap.add_argument("--list", action="store_true", help="print manifest axes and defaults, then exit")
    ap.add_argument("--emit", action="store_true", help="print concatenated fragment content")
    args, axis_args = ap.parse_known_args()

    skill_dir = Path(args.skill_dir)
    manifest = load_manifest(skill_dir)

    if args.list:
        axes = manifest.get("axes", {})
        for name, spec in axes.items():
            if not isinstance(spec, dict):
                continue
            vals = spec.get("values", [])
            print(f"{name}: default={spec.get('default', '')} values={vals}")
        return

    axes = manifest.get("axes", {})
    axis_values = {}
    for a in axis_args:
        if a.startswith("--") and "=" in a:
            k, v = a[2:].split("=", 1)
            axis_values[k] = v
    # defaults + validation for provided axes
    for name, spec in axes.items():
        if not isinstance(spec, dict):
            continue
        if name not in axis_values:
            axis_values[name] = spec.get("default", "")
        allowed = spec.get("values", [])
        if allowed and axis_values[name] not in allowed:
            print(f"ERROR: invalid value '{axis_values[name]}' for axis '{name}'. Allowed: {allowed}", file=sys.stderr)
            sys.exit(3)

    fragments = resolve(manifest, axis_values, skill_dir)
    print(f"# Router plan for {skill_dir.name}: {axis_values}")
    for f in fragments:
        print(f"  load: {f}")

    if args.emit:
        print("\n===== CONTEXT BEGIN =====")
        for f in fragments:
            print(f"\n<!-- fragment: {f} -->")
            print((skill_dir / f).read_text(encoding="utf-8"))
        print("===== CONTEXT END =====")


if __name__ == "__main__":
    main()
