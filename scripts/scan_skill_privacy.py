# -*- coding: utf-8 -*-
"""扫描 cg-paper-writing.zip 与主目录，确认不含未发表稿件相关材料。

隐私关键词从本机私有文件 ~/.workbuddy/privacy-keywords.json 读取（不入仓库），
因此本脚本可安全公开。路径从脚本位置推导。
"""
import io, json, os, sys, zipfile

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEYWORDS_FILE = os.path.join(os.path.expanduser('~'), '.workbuddy', 'privacy-keywords.json')
if os.path.exists(KEYWORDS_FILE):
    with open(KEYWORDS_FILE, encoding='utf-8') as fh:
        KEYWORDS = json.load(fh).get('leak', [])
else:
    print(f'[!] 未找到隐私关键词文件: {KEYWORDS_FILE}')
    print('    请在本机维护 {"leak": [...]}；关键词属敏感指纹，不入任何仓库。本次以空关键词集运行。')
    KEYWORDS = []

def scan_text(name, text):
    hits = 0
    low = text.lower()
    for kw in KEYWORDS:
        start = 0
        while True:
            idx = low.find(kw, start)
            if idx < 0:
                break
            line_no = text.count('\n', 0, idx) + 1
            line_start = text.rfind('\n', 0, idx) + 1
            line_end = text.find('\n', idx)
            line = text[line_start:line_end if line_end > 0 else len(line_start + text)].strip()
            print(f'  [{kw}] {name}:{line_no}: {line[:140]}')
            hits += 1
            start = idx + len(kw)
    return hits

z = zipfile.ZipFile(os.path.join(PROJECT_ROOT, 'dist', 'cg-paper-writing.zip'))
total = 0
print('=== ZIP: dist/cg-paper-writing.zip ===')
for n in z.namelist():
    if n.endswith(('.md', '.yaml', '.py', '.json', '.txt')):
        text = z.read(n).decode('utf-8', errors='replace')
        total += scan_text(n, text)
print(f'--- zip hits: {total}')

print()
print('=== 主目录: skills/cg-paper-writing/ ===')
import os
total2 = 0
for root, dirs, files in os.walk(os.path.join(PROJECT_ROOT, 'skills', 'cg-paper-writing')):
    # 跳过 static（旧目录残留，另查）
    for f in files:
        p = os.path.join(root, f)
        if f.endswith(('.md', '.yaml', '.py', '.json', '.txt')):
            with open(p, encoding='utf-8', errors='replace') as fh:
                text = fh.read()
            total2 += scan_text(p, text)
print(f'--- 主目录 hits: {total2}')
