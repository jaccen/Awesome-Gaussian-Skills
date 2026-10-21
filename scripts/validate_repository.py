#!/usr/bin/env python3
"""Repository gates for skill discovery, router resolution and shared snapshots.

This checks packaging and consistency, not the validity of scientific claims.
"""
import itertools
import json
import re
from pathlib import Path
import yaml
from router_load import load_manifest, resolve
from validate_knowledge_base import validate

ROOT = Path(__file__).resolve().parents[1]


def main():
    errors = validate(ROOT)
    names = set()
    skills = [folder for folder in (ROOT / 'skills').iterdir() if (folder / 'SKILL.md').is_file()] + [ROOT / 'agent-router']
    routes = 0
    for skill in skills:
        raw = (skill / 'SKILL.md').read_text(encoding='utf-8')
        match = re.match(r'^---\n(.*?)\n---', raw, re.S)
        if not match:
            errors.append(f'{skill.name}: invalid frontmatter/BOM')
            continue
        metadata = yaml.safe_load(match[1])
        name, description = metadata.get('name'), metadata.get('description')
        if not isinstance(name, str) or not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', name):
            errors.append(f'{skill.name}: invalid skill name')
        if name in names:
            errors.append(f'Duplicate skill name: {name}')
        names.add(name)
        if not isinstance(description, str) or not description.strip() or len(description) > 1024:
            errors.append(f'{skill.name}: missing/overlong description')
        if set(metadata) - {'name','description','license','allowed-tools','metadata'}:
            errors.append(f'{skill.name}: nonportable top-level metadata')
        if (skill / 'manifest.yaml').is_file():
            manifest = load_manifest(skill)
            axes = manifest.get('axes', {})
            values = [spec.get('values', [spec.get('default', '')]) for spec in axes.values()]
            for combination in itertools.product(*values):
                try:
                    resolve(manifest, dict(zip(axes, combination)), skill)
                    routes += 1
                except (SystemExit, TypeError, KeyError) as exc:
                    errors.append(f'{skill.name}: unresolved route {combination}: {exc}')
        for file in skill.rglob('*.md'):
            content = file.read_text(encoding='utf-8-sig')
            # Ignore fenced examples so CUDA launch syntax is not a Markdown link.
            content = re.sub(r'(?ms)^\s*(```|~~~).*?^\s*\1\s*$', '', content)
            for target in re.findall(r'\]\(([^)]+)\)', content):
                if re.match(r'^(https?:|mailto:|#)', target):
                    continue
                target = target.split('#')[0]
                if not target or any(char in target for char in '*{}<>'):
                    continue
                if not (file.parent / target).exists():
                    errors.append(f'{file.relative_to(ROOT)}: missing link {target}')
    if errors:
        for error in errors:
            print('[FAIL]', error)
        return 1
    print(json.dumps({'status':'pass', 'skill_entrypoints':len(skills), 'router_combinations':routes,
        'scope':'data consistency, portable metadata, local links and router fragments; not scientific truth'}, ensure_ascii=False))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
