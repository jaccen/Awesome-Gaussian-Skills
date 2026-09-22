# -*- coding: utf-8 -*-
"""校验电子书：标签平衡、锚点可达、新增 id、数字口径。"""
import re, io, os
from html.parser import HTMLParser

P = os.path.join('docs', 'spatial-embodied-intelligence.html')
s = io.open(P, encoding='utf-8').read()

# 剥离 script / style，避免其中的 HTML 字符串干扰
body = re.sub(r'<script\b.*?</script>', '', s, flags=re.S)
body = re.sub(r'<style\b.*?</style>', '', body, flags=re.S)

VOID = set('area base br col embed hr img input link meta param source track wbr'.split())

class Check(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []
    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append((tag, self.getpos()[0]))
    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack:
            self.errors.append('line %d: stray </%s>' % (self.getpos()[0], tag))
            return
        if self.stack[-1][0] != tag:
            self.errors.append('line %d: </%s> but open <%s> from line %d'
                               % (self.getpos()[0], tag, self.stack[-1][0], self.stack[-1][1]))
            # 尝试恢复
            for i in range(len(self.stack) - 1, -1, -1):
                if self.stack[i][0] == tag:
                    del self.stack[i:]
                    return
            return
        self.stack.pop()

c = Check()
c.feed(body)
print('== 标签平衡 ==')
if c.errors:
    for e in c.errors[:20]:
        print('  ERR', e)
else:
    print('  OK 无错配')
if c.stack:
    print('  未闭合:', [(t, l) for t, l in c.stack[:10]])
else:
    print('  OK 无未闭合标签')

print('\n== 锚点可达 ==')
ids = set(re.findall(r'\sid="([^"]+)"', s))
hrefs = set(re.findall(r'href="#([^"]+)"', s))
missing = sorted(h for h in hrefs if h and h not in ids)
print('  内部链接数:', len(hrefs), '| 失效:', missing if missing else '无')

print('\n== 目录 ↔ 正文 ↔ 速览卡 三向一致 ==')
# 正文顺序：chapter section 与独立的 ref-section 都算正文块
_pat = re.compile(r'<section class="chapter" id="([^"]+)"|<div class="ref-section" id="([^"]+)"')
doc_order = [m.group(1) or m.group(2) for m in _pat.finditer(s)]
# 正文块的 h2 / sec-title 标题
_sec_re = re.compile(r'<section class="chapter" id="([^"]+)".*?</section>', re.S)
doc_title = {}
for m in _sec_re.finditer(s):
    h = re.search(r'<h2>(.*?)</h2>', m.group(0), re.S)
    if h:
        doc_title[m.group(1)] = re.sub(r'<[^>]+>', '', h.group(1)).strip()
for m in re.finditer(r'<div class="ref-section" id="([^"]+)".*?<div class="sec-title">(.*?)</div>', s, re.S):
    doc_title[m.group(1)] = m.group(2).strip()

_toc = re.search(r'<nav id="toc">(.*?)</nav>', s, re.S)
toc_order = re.findall(r'href="#([^"]+)"', _toc.group(1)) if _toc else []
cards = re.findall(r'<a class="ch-card[^>]*href="#([^"]+)"[^>]*>\s*<span class="tag">[^<]*</span>\s*<h3>(.*?)</h3>', s)
card_order = [c[0] for c in cards]

def diff(a, b, na, nb):
    miss = [x for x in b if x not in a]
    extra = [x for x in a if x not in b]
    print('  %s 缺 %s: %s' % (na, nb, miss if miss else '无'))
    print('  %s 多出（正文已无）: %s' % (na, extra if extra else '无'))
diff(toc_order, doc_order, '侧栏目录', '正文块')
diff(card_order, doc_order, '速览卡', '正文块')
print('  顺序一致:', 'OK' if toc_order == doc_order else '不一致 → TOC %s / 正文 %s' % (toc_order, doc_order))

print('\n== 速览卡标题 vs 正文 h2 ==')
# 正文标题常带「后记 · 」「附录 · 」等前缀，比对时去掉
def _norm(t):
    return re.sub(r'^(后记|附录|引言|引用|实操|索引)\s*[·:：]\s*', '', t).strip()

bad = 0
for cid, ct in cards:
    t = doc_title.get(cid, '')
    if not t:
        continue
    a, b = _norm(ct), _norm(t)
    if a != b and not b.startswith(a) and not a.startswith(b):
        print('  DIFF #%s  卡「%s」 vs 正文「%s」' % (cid, ct, t))
        bad += 1
print('  标题不一致:', bad if bad else '无')

print('\n== 卡片颜色类是否定义 ==')
defined = set(re.findall(r'\.(c\d+|c-intro|c-outro)\s*\{', s))
used = set(re.findall(r'class="ch-card (c\d+|c-intro|c-outro)"', s))
undef = sorted(used - defined)
print('  已定义:', sorted(defined))
print('  未定义(会 fallback 蓝色):', undef if undef else '无')

print('\n== 新增章节 id ==')
for i in ['ch0', 'capture', 'ch12', 'ch13']:
    print('  #%s: %s' % (i, 'OK' if i in ids else 'MISSING'))

print('\n== 交互控件 id ==')
for i in ['agsQ1', 'agsQ2', 'agsQ3', 'agsQ4', 'agsQ5', 'agsPickBtn', 'agsPickOut',
          'agsCkBar', 'agsCkTxt', 'agsSizeIn', 'agsRatio', 'agsCplx', 'agsSizeOut', 'agsRatioTxt',
          # 阅读量统计
          'agsStatBar', 'busuanzi_value_site_pv', 'busuanzi_value_site_uv', 'agsCoverRead',
          'agsSideProg', 'agsReadPct', 'agsReadBar', 'agsReadTip', 'agsResume', 'agsReadReset']:
    print('  #%s: %s' % (i, 'OK' if i in ids else 'MISSING'))
print('  .agsCk 复选框数量:', len(re.findall(r'class="agsCk"', s)))
_nsec = len(re.findall(r'<section class="chapter"', s)) + len(re.findall(r'class="ref-section"', s))
print('  章节块总数（应等于侧栏「已读 N / M 节」的 M）:', _nsec)

print('\n== 内联脚本函数重名（同一 IIFE 内会互相覆盖） ==')
_jsm = re.search(r'<script>(.*?)</script>', s, re.S)
_js = _jsm.group(1) if _jsm else ''
_dup_found = False
for _i, _b in enumerate(re.split(r'\n\}\)\(\);', _js)):
    _names = re.findall(r'function\s+([A-Za-z_$][\w$]*)\s*\(', _b)
    _d = sorted(set(n for n in _names if _names.count(n) > 1))
    if _d:
        print('  ERR 块 %d 重名: %s' % (_i, _d))
        _dup_found = True
print('  ' + ('OK 无重名' if not _dup_found else '发现重名，后者会覆盖前者'))

print('\n== 数字口径 ==')
for pat, label in [(r'872', '方法总数 872'), (r'Categories-23', '分类 23'),
                   (r'AI_Skills-16', '技能 16'), (r'34 个 MCP', 'MCP 工具 34'),
                   (r'Categories-25', '陈旧分类 25(应为0)'), (r'AI_Skills-15', '陈旧技能 15(应为0)')]:
    print('  %-22s %d' % (label, len(re.findall(pat, s))))

print('\n== 占位符残留 ==')
leftover = re.findall(r'@@[A-Z_0-9]+@@', s)
print('  ', leftover if leftover else '无')

print('\n== 规模 ==')
print('  字节:', len(s.encode('utf-8')), '| 行:', s.count('\n') + 1)
print('  section 数:', len(re.findall(r'<section class="chapter"', s)))
print('  Checkpoint 块:', len(re.findall(r'本章工程 Checkpoint', s)))
