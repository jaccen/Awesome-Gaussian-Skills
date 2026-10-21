#!/usr/bin/env python3
"""Validate authoritative records and every field of their generated carriers.

Offline consistency is not verification of scientific claims. Optional online
checks report network failures as inconclusive, never as fabricated papers.
"""
import argparse
import csv
import json
import re
import urllib.request
from collections import Counter
from pathlib import Path
from catalog_export import expected_html, export, html_records, load_abstracts

ROOT = Path(__file__).resolve().parents[1]
ARXIV_RE = re.compile(r'^\d{2}(?:0[1-9]|1[0-2])\.\d{4,5}(?:v[1-9]\d*)?$')
FABRICATED_BLACKLIST = {'gs-lrm-v2', 'gs-lrm-full', 'mvsplat-v2', 'gpsgaussian-stereo', 'gaussiancross'}


def validate(root=ROOT):
    errors = []
    try:
        data = json.loads((root / 'data/methods.json').read_text(encoding='utf-8-sig'))
        methods = data['methods']
        if not isinstance(methods, list) or not methods:
            return ['methods must be a non-empty array']
        for index, row in enumerate(methods):
            for key in ('name', 'arxiv_id', 'venue', 'category', 'desc', 'code_url'):
                if not isinstance(row.get(key), str):
                    errors.append(f'methods[{index}].{key} must be a string')
            if not isinstance(row.get('year'), int) or isinstance(row.get('year'), bool):
                errors.append(f'methods[{index}].year must be an integer')
        if errors:
            return errors
        names = [re.sub(r'\s+', '', row['name']).casefold() for row in methods]
        ids = [re.sub(r'v\d+$', '', row['arxiv_id']) for row in methods if row['arxiv_id']]
        for label, values in [('name', names), ('arxiv_id', ids)]:
            errors.extend(f'duplicate {label}: {key}' for key, count in Counter(values).items() if count > 1)
        for row in methods:
            if not row['name'].strip():
                errors.append('Empty method name')
            if row['arxiv_id'] and not ARXIV_RE.fullmatch(row['arxiv_id']):
                errors.append(f"Invalid arXiv ID: {row['name']} {row['arxiv_id']}")
            if re.sub(r'\s+', '', row['name']).casefold() in FABRICATED_BLACKLIST:
                errors.append('Previously adjudicated false alias: ' + row['name'])
        counts = dict(Counter(row['category'] for row in methods))
        if data.get('count') != len(methods) or data.get('categories') != counts or data.get('category_count') != len(counts):
            errors.append('Registry aggregate counts disagree with actual records')
        if any("evidence" in row for row in methods):
            audit = json.loads((root / "data/evidence-audit.json").read_text(encoding="utf-8-sig"))
            checked = [row for row in methods if row.get("evidence", {}).get("metadata") == "checked"]
            pending = [row["name"] for row in methods if row.get("evidence", {}).get("metadata") != "checked"]
            if audit.get("registry_records") != len(methods) or audit.get("metadata_checked") != len(checked) or set(audit.get("primary_source_needed", [])) != set(pending):
                errors.append("Evidence report coverage disagrees with records")
            cache = json.loads((root / ".arxiv_cache.json").read_text(encoding="utf-8-sig"))
            for row in checked:
                metadata = cache.get(row["arxiv_id"], {})
                if row.get("title") != metadata.get("title") or not row["evidence"].get("checked_at"):
                    errors.append("Fresh metadata identity/date missing: " + row["name"])
        cats = json.loads((root / 'data/categories.json').read_text(encoding='utf-8-sig'))
        if set(cats.get('canonical', [])) != set(counts) or cats.get('counts') != counts:
            errors.append('Taxonomy names/counts disagree with registry')
        with (root / '3dgs-methods-overview.csv').open(encoding='utf-8-sig', newline='') as stream:
            csv_rows = list(csv.DictReader(stream))
        expected_csv = [{'method': row['name'], 'arxiv_id': row['arxiv_id'], 'venue': row['venue'],
            'year': str(row['year']) if row['year'] else '', 'category': row['category'],
            'core_innovation': row['desc'], 'code_url': row['code_url']} for row in methods]
        if csv_rows != expected_csv:
            errors.append('CSV fields/order disagree with registry (not just record count)')
        actual_html = html_records((root / 'docs/methods.html').read_text(encoding='utf-8-sig'))
        if actual_html != [expected_html(row) for row in methods]:
            errors.append('Explorer fields/order disagree with registry')
        abstracts = load_abstracts(root / 'docs/abstracts.js')
        if set(abstracts) != {row['name'] for row in methods}:
            errors.append('Abstract keys disagree with registry')
        errors.extend('Generated carrier/snapshot is stale: ' + path for path in export(root, check=True))
    except (OSError, ValueError, KeyError, TypeError, IndexError) as exc:
        errors.append(f'Invalid/missing carrier: {type(exc).__name__}: {exc}')
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check-arxiv', type=int, default=0)
    args = parser.parse_args()
    errors = validate()
    for error in errors:
        print('[FAIL]', error)
    if errors:
        return 1
    data = json.loads((ROOT / 'data/methods.json').read_text(encoding='utf-8-sig'))
    print(f"[PASS] {len(data['methods'])} records: schema, IDs, aggregates, CSV/HTML fields, abstracts, Markdown and router snapshots")
    if args.check_arxiv:
        import random
        import time
        eligible = [row for row in data['methods'] if row['arxiv_id']]
        sample = random.Random(42).sample(eligible, min(args.check_arxiv, len(eligible)))
        for row in sample:
            try:
                request = urllib.request.Request('https://arxiv.org/abs/' + row['arxiv_id'], headers={'User-Agent': 'catalog-ci/1.0'})
                with urllib.request.urlopen(request, timeout=20) as response:
                    if response.status != 200:
                        raise OSError('non-200 response')
            except Exception as exc:
                print('[INCONCLUSIVE] Online check unavailable:', type(exc).__name__)
                return 2
            time.sleep(3.6)
        print('[INFO] Online reachability does not verify method identity, venue, or result claims.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
