# -*- coding: utf-8 -*-
"""收尾(零删除版): 覆盖式同步安装副本 + 重建 zip + 校验 + 隐私扫描。不做任何删除。

路径均从脚本位置与用户目录动态推导，不含任何本机硬编码；
隐私关键词从本机私有文件 ~/.workbuddy/privacy-keywords.json 读取（该文件不入任何仓库），
因此本脚本可安全公开。
"""
import os, re, sys, io, json, zipfile, subprocess, shutil
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.join(PROJECT_ROOT, 'skills', 'cg-paper-writing')
INST = os.path.join(os.path.expanduser('~'), '.workbuddy', 'skills', 'cg-paper-writing')
DIST = os.path.join(PROJECT_ROOT, 'dist', 'cg-paper-writing.zip')
PKG = os.path.join(os.path.expanduser('~'), 'AppData', 'Local', 'Programs', 'WorkBuddy',
                   'resources', 'app.asar.unpacked', 'resources', 'plugins',
                   'workbuddy-builtin', 'skills', 'skill-creator', 'scripts')
PY = os.path.join(os.path.expanduser('~'), '.workbuddy', 'binaries', 'python',
                  'versions', '3.13.12', 'python.exe')

# 隐私关键词外置：~/.workbuddy/privacy-keywords.json => {"leak": ["kw1", ...]}
KEYWORDS_FILE = os.path.join(os.path.expanduser('~'), '.workbuddy', 'privacy-keywords.json')
if os.path.exists(KEYWORDS_FILE):
    with open(KEYWORDS_FILE, encoding='utf-8') as _fh:
        LEAK = json.load(_fh).get('leak', [])
else:
    print(f'[!] 未找到隐私关键词文件: {KEYWORDS_FILE}')
    print('    请在本机维护 {"leak": [...]}；关键词属敏感指纹，不入任何仓库。本次以空关键词集运行。')
    LEAK = []

def scan_text(name, text):
    low = text.lower()
    return [(name, kw) for kw in LEAK if kw in low]

def scan_tree(base):
    hits = []
    for root, dirs, files in os.walk(base):
        for f in files:
            p = os.path.join(root, f)
            if f.endswith(('.md', '.yaml', '.py')):
                with open(p, encoding='utf-8', errors='replace') as fh:
                    hits += scan_text(p, fh.read())
    return hits

# 1. 安装副本: 纯覆盖/新增, 不删除任何文件
os.makedirs(os.path.join(INST, 'references'), exist_ok=True)
shutil.copy2(os.path.join(ROOT, 'SKILL.md'), os.path.join(INST, 'SKILL.md'))
shutil.copy2(os.path.join(ROOT, 'manifest.yaml'), os.path.join(INST, 'manifest.yaml'))
rd = os.path.join(ROOT, 'references')
for f in sorted(os.listdir(rd)):
    if f.endswith('.md'):
        shutil.copy2(os.path.join(rd, f), os.path.join(INST, 'references', f))
n_inst = len(os.listdir(os.path.join(INST, 'references')))
print(f'[1] 安装副本覆盖式同步完成: references {n_inst} 个文件')

# 2. 重打包 (zipfile 'w' 直接覆盖写, 不先删)
with zipfile.ZipFile(DIST, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(os.path.join(ROOT, 'SKILL.md'), 'cg-paper-writing/SKILL.md')
    z.write(os.path.join(ROOT, 'manifest.yaml'), 'cg-paper-writing/manifest.yaml')
    for f in sorted(os.listdir(rd)):
        if f.endswith('.md'):
            z.write(os.path.join(rd, f), f'cg-paper-writing/references/{f}')
size = os.path.getsize(DIST)
print(f'[2] zip 重建完成: {size/1024:.0f}KB')

# 3. 校验
rv = subprocess.run([PY, os.path.join(PKG, 'quick_validate.py'), ROOT],
                    capture_output=True, text=True)
print('[3] quick_validate:', (rv.stdout or rv.stderr).strip()[:600])

# 4. 隐私扫描
h1 = scan_tree(ROOT)
h2 = scan_tree(INST)
h3 = []
with zipfile.ZipFile(DIST) as z:
    names = z.namelist()
    for n in names:
        if n.endswith(('.md', '.yaml')):
            h3 += scan_text(n, z.read(n).decode('utf-8', errors='replace'))
print(f'[4] 隐私扫描: 主副本 {len(h1)} 命中, 安装副本 {len(h2)} 命中, zip({len(names)}文件) {len(h3)} 命中')
for p, kw in (h1 + h2 + h3)[:20]:
    print('   LEAK:', p, '->', kw)
with zipfile.ZipFile(DIST) as z:
    t = z.read('cg-paper-writing/SKILL.md').decode('utf-8')
    m = re.search(r'version:\s*"([^"]+)"', t)
    print('[5] zip 内 SKILL.md version =', m.group(1) if m else '?')

ok = not (h1 or h2 or h3)
print('RESULT:', 'PASS' if ok else 'FAIL')
sys.exit(0 if ok else 1)
