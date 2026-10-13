# -*- coding: utf-8 -*-
"""Dump .docx paragraph structure (style + text) for review. Usage: python _docx_dump.py FILE..."""
import sys, zipfile, re
from collections import Counter

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'


def paras(path):
    z = zipfile.ZipFile(path)
    try:
        xml = z.read('word/document.xml').decode('utf-8', 'ignore')
    except KeyError:
        return []
    out = []
    for pm in re.finditer(r'<w:p[ >].*?</w:p>|<w:p/>', xml, re.S):
        blk = pm.group(0)
        st = re.search(r'<w:pStyle w:val="([^"]+)"', blk)
        txt = ''.join(re.findall(r'<w:t[^>]*>(.*?)</w:t>', blk, re.S))
        txt = re.sub(r'<[^>]+>', '', txt)
        out.append((st.group(1) if st else '', txt.strip()))
    return out


for f in sys.argv[1:]:
    ps = paras(f)
    print('=' * 70)
    print(f, '  段落数', len(ps))
    hist = Counter(s for s, t in ps if t)
    print('  样式分布:', dict(hist.most_common(10)))
    print('  --- 可能的标题 / 短段落 ---')
    n = 0
    for s, t in ps:
        if not t:
            continue
        if len(t) <= 34 and not re.search(r'[。；，,]$', t):
            print('   [%s] %s' % (s or '-', t))
            n += 1
            if n >= 45:
                break
