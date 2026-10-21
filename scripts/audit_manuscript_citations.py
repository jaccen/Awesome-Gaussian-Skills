#!/usr/bin/env python3
"""Check citation metadata without confusing catalog membership with truth.

Exit 0: requested metadata available; 1: invalid input; 2: unresolved evidence.
Even exit 0 does not verify venue, numerical results, or claim faithfulness.
"""
import argparse
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ID_RE = re.compile(r'\b\d{2}(?:0[1-9]|1[0-2])\.\d{4,5}(?:v[1-9]\d*)?\b')


def norm(value):
    return ''.join(c for c in unicodedata.normalize('NFKC', value).casefold() if c.isalnum())


def name_title_match(name, title, summary=''):
    """A lexical candidate check, never a scientific or bibliographic verdict."""
    if not name or not title:
        return False, 'insufficient-metadata'
    aliases = {'3dgs': '3dgaussiansplatting', 'binocular3dgs': 'binocularguided3dgaussiansplatting'}
    key = aliases.get(norm(name), norm(name))
    if key and key in norm(title + ' ' + summary):
        return True, 'lexical-candidate'
    tokens = re.findall(r'[a-z0-9]+', name.casefold())
    generic = {'3d', 'gaussian', 'gaussians', 'splatting', 'gs', 'for', 'the', 'and', 'with', 'of'}
    tokens = [token for token in tokens if len(token) > 2 and token not in generic]
    if tokens and all(norm(token) in norm(title + ' ' + summary) for token in tokens):
        return True, 'token-candidate'
    return False, 'identity-review-required'


def audit_id(aid, methods, cache):
    aid = re.sub(r'v\d+$', '', aid)
    rows = [row for row in methods if re.sub(r'v\d+$', '', row.get('arxiv_id', '')) == aid]
    meta = cache.get(aid, {})
    title = meta.get('title', '').strip()
    identity = []
    for row in rows:
        ok, reason = name_title_match(row['name'], title, meta.get('summary', ''))
        identity.append({'registered_name': row['name'], 'candidate_match': ok, 'reason': reason})
    unresolved = not title or any(not item['candidate_match'] for item in identity)
    return {'arxiv_id': aid, 'status': 'UNRESOLVED' if unresolved else 'METADATA_ONLY',
        'title': title or None, 'registered_names': [row['name'] for row in rows],
        'identity_candidates': identity, 'source_url': 'https://arxiv.org/abs/' + aid,
        'retrieved_at': meta.get('retrieved_at'),
        'limits': ['Catalog absence is not evidence of fabrication.',
                   'Title matching does not verify venue, scientific claims, or experimental numbers.']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--file', type=Path)
    parser.add_argument('--id')
    parser.add_argument('--name')
    parser.add_argument('--json', type=Path)
    args = parser.parse_args()
    if not any((args.file, args.id, args.name)):
        parser.error('provide --file, --id, or --name')
    data = json.loads((ROOT / 'data/methods.json').read_text(encoding='utf-8-sig'))
    cache = json.loads((ROOT / '.arxiv_cache.json').read_text(encoding='utf-8-sig')) if (ROOT / '.arxiv_cache.json').exists() else {}
    methods = data['methods']
    ids = set()
    if args.id:
        if not ID_RE.fullmatch(args.id):
            print('Invalid arXiv identifier format')
            return 1
        ids.add(args.id)
    if args.file:
        try:
            ids.update(ID_RE.findall(args.file.read_text(encoding='utf-8-sig')))
        except OSError as exc:
            print(str(exc))
            return 1
    name_unresolved = False
    if args.name:
        rows = [row for row in methods if norm(row['name']) == norm(args.name) or
                any(norm(alias) == norm(args.name) for alias in row.get('aliases', []))]
        ids.update(row['arxiv_id'] for row in rows if row.get('arxiv_id'))
        name_unresolved = not rows or any(not row.get('arxiv_id') for row in rows)
    reports = [audit_id(aid, methods, cache) for aid in sorted(ids)]
    result = {'checks': reports, 'unresolved': name_unresolved or not reports or any(row['status'] == 'UNRESOLVED' for row in reports),
              'note': 'This is a metadata check; full citation verification requires a located claim in the primary paper.'}
    rendered = json.dumps(result, ensure_ascii=False, indent=2)
    print(rendered)
    if args.json:
        args.json.write_text(rendered + '\n', encoding='utf-8')
    return 2 if result['unresolved'] else 0


if __name__ == '__main__':
    raise SystemExit(main())
