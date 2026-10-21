#!/usr/bin/env python3
"""Paginated arXiv discovery. Candidates need review before registry admission.

Exit 0: complete, no new candidates; 10: complete, candidates found;
2: incomplete/unavailable (never silently report a successful empty search).
"""
import argparse
import json
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NS = {'a': 'http://www.w3.org/2005/Atom', 'o': 'http://a9.com/-/spec/opensearch/1.1/'}
API = 'https://export.arxiv.org/api/query?'


def fetch(url, retries=2):
    last_error = None
    for attempt in range(retries):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'Awesome-Gaussian-Skills-scan/2.0'})
            with urllib.request.urlopen(request, timeout=30) as response:
                feed = ET.fromstring(response.read())
            if feed.tag != '{http://www.w3.org/2005/Atom}feed':
                raise ValueError('Not an Atom feed')
            return feed
        except (OSError, ET.ParseError, ValueError) as exc:
            last_error = exc
            if attempt + 1 < retries:
                time.sleep(4)
    raise OSError(f'{type(last_error).__name__}: {last_error}')


def parse_entries(feed):
    if isinstance(feed, str):
        feed = ET.fromstring(feed)
    out = []
    for entry in feed.findall('a:entry', NS):
        aid = re.sub(r'v\d+$', '', entry.findtext('a:id', '', NS).rsplit('/abs/', 1)[-1])
        if not re.fullmatch(r'\d{4}\.\d{4,5}', aid):
            raise ValueError('arXiv returned an error or unrecognized identifier')
        out.append({'id': aid, 'title': ' '.join(entry.findtext('a:title', '', NS).split()),
            'abstract': ' '.join(entry.findtext('a:summary', '', NS).split()),
            'published': entry.findtext('a:published', '', NS)[:10],
            'categories': [item.get('term', '') for item in entry.findall('a:category', NS)]})
    for row in out:
        row['primary'] = row['categories'][0] if row['categories'] else ''
    return out


def is_3dgs(row):
    text = (row['title'] + ' ' + row['abstract']).casefold()
    return ('gaussian' in text and 'splat' in text) or '3dgs' in text


def scan(queries, known, fetcher=fetch, delay=3.6, max_pages=10):
    found, query_results = {}, []
    for query in queries:
        query_result = {'query': query, 'status': 'complete', 'pages': 0, 'fetched': 0}
        try:
            for page in range(max_pages):
                params = {'search_query': query, 'sortBy': 'submittedDate', 'sortOrder': 'descending',
                          'start': page * 100, 'max_results': 100}
                feed = fetcher(API + urllib.parse.urlencode(params))
                entries = parse_entries(feed)
                total_text = feed.findtext('o:totalResults', None, NS)
                if total_text is None or not total_text.isdigit():
                    raise ValueError('Missing/invalid totalResults; completeness cannot be established')
                total = int(total_text)
                query_result['pages'] += 1
                query_result['fetched'] += len(entries)
                for row in entries:
                    if is_3dgs(row) and row['id'] not in known:
                        found[row['id']] = row
                if query_result['fetched'] >= total:
                    break
                if not entries:
                    raise ValueError('Empty page before totalResults reached')
                if page + 1 == max_pages:
                    raise ValueError('Pagination cap reached; search incomplete')
                time.sleep(delay)
        except (OSError, ValueError, ET.ParseError) as exc:
            query_result.update(status='failed', error=str(exc))
        query_results.append(query_result)
        time.sleep(delay)
    return sorted(found.values(), key=lambda row: (row['published'], row['id']), reverse=True), query_results


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('days', nargs='?', type=int, default=3)
    parser.add_argument('--output-dir', type=Path, default=ROOT / 'reports/arxiv-daily')
    args = parser.parse_args()
    if args.days < 1 or args.days > 365:
        parser.error('days must be between 1 and 365')
    now = datetime.now(timezone.utc)
    since = (now - timedelta(days=args.days)).strftime('%Y%m%d%H%M')
    until = now.strftime('%Y%m%d%H%M')
    queries = [f'all:"gaussian splatting" AND submittedDate:[{since} TO {until}]',
               f'all:3dgs AND submittedDate:[{since} TO {until}]']
    data = json.loads((ROOT / 'data/methods.json').read_text(encoding='utf-8-sig'))
    known = {re.sub(r'v\d+$', '', row['arxiv_id']) for row in data['methods'] if row.get('arxiv_id')}
    papers, searches = scan(queries, known)
    complete = all(item['status'] == 'complete' for item in searches)
    report = {'date': now.date().isoformat(), 'retrieved_at': now.isoformat(),
        'status': 'complete' if complete else 'incomplete', 'window_days': args.days,
        'known_arxiv_ids': len(known), 'count': len(papers), 'queries': searches, 'papers': papers,
        'note': 'Discovery candidates, not admitted or fully verified methods.'}
    args.output_dir.mkdir(parents=True, exist_ok=True)
    if not complete:
        destination = args.output_dir / (now.strftime('attempt-%Y%m%dT%H%M%SZ') + '.json')
        destination.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print('[INCONCLUSIVE] Search incomplete; previous latest.json preserved. Details:', destination)
        return 2
    (args.output_dir / 'latest.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    lines = [f"# arXiv discovery — {report['date']}", '', f'UTC window: {since} to {until}; complete query pagination.',
             f'{len(papers)} candidates after deduplication against {len(known)} known arXiv IDs.', '',
             'Candidates need primary-source and scope review before admission.', '']
    lines += [f"- [{row['title']}](https://arxiv.org/abs/{row['id']}) — {row['published']}" for row in papers]
    (args.output_dir / (report['date'] + '.md')).write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(f'[COMPLETE] {len(papers)} discovery candidates')
    return 10 if papers else 0


if __name__ == '__main__':
    raise SystemExit(main())
