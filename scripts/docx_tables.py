# -*- coding: utf-8 -*-
"""按行列还原 docx 中的表格内容（docx_dump.py 只做段落流，表格会被压平）。

用法: python docx_tables.py <file.docx> [表格序号,从1起]
"""
import sys, re, zipfile, io


def cell_text(tc):
    return re.sub(r'\s+', ' ', ''.join(re.findall(r'<w:t[^>]*>(.*?)</w:t>', tc, re.S))).strip()


def tables(path):
    xml = zipfile.ZipFile(path).read('word/document.xml').decode('utf-8', 'ignore')
    out = []
    for m in re.finditer(r'<w:tbl[ >].*?</w:tbl>', xml, re.S):
        rows = []
        for tr in re.finditer(r'<w:tr[ >].*?</w:tr>', m.group(0), re.S):
            rows.append([cell_text(tc.group(0)) for tc in re.finditer(r'<w:tc[ >].*?</w:tc>', tr.group(0), re.S)])
        out.append(rows)
    return out


def main():
    path = sys.argv[1]
    want = int(sys.argv[2]) if len(sys.argv) > 2 else None
    ts = tables(path)
    print('表格总数:', len(ts))
    for i, rows in enumerate(ts, 1):
        if want and i != want:
            continue
        print('\n===== 表 %d  (%d 行 x %d 列) =====' % (i, len(rows), max(len(r) for r in rows) if rows else 0))
        for r in rows:
            print(' | '.join(r))


if __name__ == '__main__':
    main()
