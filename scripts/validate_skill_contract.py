#!/usr/bin/env python3
"""
validate_skill_contract.py — 技能编排层的契约校验器（零依赖 JSON Schema 子集）

校验某技能的产出 JSON 是否符合 skills/_contracts/ 中的契约 schema。
这是跨技能流水线（paper-reader → method-compare → experiment-planner）的
机器可验证交接机制：上游产出必须过校验，下游才能消费。

用法：
  python3 scripts/validate_skill_contract.py paper-insight artifact.json
  python3 scripts/validate_skill_contract.py --example paper-insight   # 生成示例并自校验

支持的 schema 子集：type / required / properties / items / pattern / enum /
minLength / minItems / minimum / maximum。
"""
import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTRACTS = ROOT / "skills" / "_contracts"

TYPE_MAP = {
    "object": dict, "array": list, "string": str,
    "integer": int, "number": (int, float), "boolean": bool, "null": type(None),
}


def check_type(value, spec):
    types = spec if isinstance(spec, list) else [spec]
    for t in types:
        py = TYPE_MAP.get(t)
        if py is None:
            continue
        if isinstance(value, py) and not (t in ("integer", "number") and isinstance(value, bool)):
            return True
    return False


def validate(value, schema, path="$"):
    errors = []
    if "type" in schema and not check_type(value, schema["type"]):
        errors.append(f"{path}: expected type {schema['type']}, got {type(value).__name__}")
        return errors
    if "enum" in schema and value not in schema["enum"]:
        errors.append(f"{path}: value {value!r} not in enum {schema['enum']}")
    if isinstance(value, str):
        if "pattern" in schema and not re.match(schema["pattern"], value):
            errors.append(f"{path}: {value!r} does not match pattern {schema['pattern']}")
        if "minLength" in schema and len(value) < schema["minLength"]:
            errors.append(f"{path}: shorter than minLength {schema['minLength']}")
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        if "minimum" in schema and value < schema["minimum"]:
            errors.append(f"{path}: {value} < minimum {schema['minimum']}")
        if "maximum" in schema and value > schema["maximum"]:
            errors.append(f"{path}: {value} > maximum {schema['maximum']}")
    if isinstance(value, list):
        if "minItems" in schema and len(value) < schema["minItems"]:
            errors.append(f"{path}: fewer than minItems {schema['minItems']}")
        if "items" in schema:
            for i, item in enumerate(value):
                errors.extend(validate(item, schema["items"], f"{path}[{i}]"))
    if isinstance(value, dict):
        for req in schema.get("required", []):
            if req not in value:
                errors.append(f"{path}: missing required field '{req}'")
        for key, sub in schema.get("properties", {}).items():
            if key in value:
                errors.extend(validate(value[key], sub, f"{path}.{key}"))
    return errors


def example(contract: str) -> dict:
    today = date.today().isoformat()
    if contract == "paper-insight":
        return {
            "arxiv_id": "2308.04079",
            "title": "3D Gaussian Splatting for Real-Time Radiance Field Rendering",
            "venue": "SIGGRAPH 2023", "year": 2023, "category": "Foundation",
            "core_innovation": "Anisotropic 3D Gaussians with tile-based differentiable rasterization",
            "representation": {"primitive": "anisotropic Gaussian", "param_count_per_primitive": 59},
            "results": [{"dataset": "Mip-NeRF 360", "metric": "PSNR", "value": 27.21, "iterations": 30000, "table_ref": "Table 1"}],
            "code_url": "https://repo-sam.informatik.uni-halle.de/jkortner/gaussian-splatting/",
            "limitations": ["No explicit surface", "View-dependent effects limited by SH degree"],
            "provenance": {"extracted_by": "3dgs-paper-reader", "extraction_date": today},
        }
    if contract == "comparison-report":
        return {
            "methods": [{"name": "3DGS", "arxiv_id": "2308.04079"}, {"name": "2DGS", "arxiv_id": "2403.17888"}],
            "dimensions": [
                {"name": "primitive", "values": ["3D ellipsoid", "2D disk"]},
                {"name": "surface_quality", "values": ["moderate", "high"]},
            ],
            "recommendation": {"pick": "2DGS", "rationale": "better geometry", "tradeoffs": ["slightly slower"]},
            "generated_at": today,
        }
    if contract == "experiment-plan":
        return {
            "research_question": "Does part-aware alpha compositing reduce color bleeding at articulated joints?",
            "venue_target": "SIGGRAPH",
            "datasets": [{"name": "Mip-NeRF 360", "scenes": ["bicycle", "garden"], "split_protocol": "standard"}],
            "baselines": [{"name": "3DGS", "arxiv_id": "2308.04079", "why": "canonical baseline"}],
            "ablations": [{"name": "no-penetration-penalty", "hypothesis": "bleeding increases without penalty", "removed_component": "omega penalty"}],
            "metrics": ["PSNR", "SSIM", "LPIPS"],
            "compute_budget": {"gpu": "RTX 3090", "gpu_hours_estimate": 48},
        }
    raise ValueError(f"unknown contract: {contract}")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    contract = sys.argv[1]
    schema_path = CONTRACTS / f"{contract}.schema.json"
    if not schema_path.exists():
        print(f"ERROR: contract not found: {schema_path}", file=sys.stderr)
        sys.exit(1)
    schema = json.loads(schema_path.read_text(encoding="utf-8"))

    if "--example" in sys.argv:
        artifact = example(contract)
        print(json.dumps(artifact, ensure_ascii=False, indent=2))
        errors = validate(artifact, schema)
        if errors:
            print(f"[FAIL] example does not satisfy its own contract: {errors}", file=sys.stderr)
            sys.exit(2)
        print(f"[PASS] example artifact satisfies {contract}", file=sys.stderr)
        return

    artifact_path = Path(sys.argv[2])
    artifact = json.loads(artifact_path.read_text(encoding="utf-8"))
    errors = validate(artifact, schema)
    if errors:
        for e in errors:
            print(f"[FAIL] {e}")
        sys.exit(2)
    print(f"[PASS] {artifact_path} satisfies contract {contract}")


if __name__ == "__main__":
    main()
