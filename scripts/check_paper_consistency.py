#!/usr/bin/env python3
"""Limited LaTeX source checks on explicitly supplied files; not a TeX compiler.

Exit 0: no detected label problems; 1: duplicate labels; 2: unresolved references.
Use actual compilation for macro expansion, inputs, bibliography and layout.
"""
import argparse
import re
from collections import Counter
from pathlib import Path


def inspect_sources(paths):
    labels, references, warnings = [], [], []
    for path in paths:
        text = path.read_text(encoding='utf-8-sig')
        # Strip ordinary comments; escaped percent signs are retained.
        text = re.sub(r'(?<!\\)%[^\n]*', '', text)
        labels.extend(re.findall(r'\\label\s*\{([^{}]+)\}', text))
        for group in re.findall(r'\\(?:[Cc]?ref|eqref|autoref|[cC]pageref)\*?\s*\{([^{}]+)\}', text):
            references.extend(value.strip() for value in group.split(','))
        if re.search(r'\\(?:input|include|externaldocument)\b', text):
            warnings.append(f'{path.name}: included/external files require compilation or explicit inclusion in this check')
    duplicate = sorted(label for label, count in Counter(labels).items() if count > 1)
    missing = sorted(set(references) - set(labels))
    return {'duplicate_labels':duplicate, 'unresolved_references':missing, 'warnings':warnings,
        'limits':'Lexical check of supplied files only; macros, verbatim, bibliography and layout require TeX compilation.'}


def main():
    import json
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('files', nargs='+', type=Path)
    args = parser.parse_args()
    result = inspect_sources([path for path in args.files if path.suffix.lower() == '.tex'])
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 1 if result['duplicate_labels'] else (2 if result['unresolved_references'] else 0)


if __name__ == '__main__':
    raise SystemExit(main())
