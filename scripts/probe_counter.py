# -*- coding: utf-8 -*-
"""抽取电子书里的「阅读量统计」代码段，在模拟 DOM 环境里用 Node 跑一遍。

用途：捕运行时错误（如函数重名互相覆盖、变量未定义）——`node --check` 只查语法，查不出这类问题。
用法：python scripts/probe_counter.py && node _probe_counter.js
注意：会真实 POST 到计数 API，**每次运行使 site_pv +1**，仅诊断时用，不要频繁跑。
"""
import io, os, re

P = os.path.join('docs', 'spatial-embodied-intelligence.html')
s = io.open(P, encoding='utf-8').read()

start = s.index('/* \u2500\u2500 \u9605\u8bfb\u91cf\u7edf\u8ba1')
end = s.index('/* \u2500\u2500 Pager \u52a8\u6001', start)
code = s[start:end].rstrip()
assert '(function(){' in code, 'code block not found'

stub = """
// ---- minimal DOM stub ----
function El(id){ this.id = id; this._t = '\u2014'; this.classList = { _s:new Set(),
  add:function(c){this._s.add(c);}, remove:function(c){this._s.delete(c);},
  contains:function(c){return this._s.has(c);} };
  this.dataset = {}; this.style = {}; this.children = [];
}
Object.defineProperty(El.prototype, 'textContent', {
  get:function(){ return this._t; }, set:function(v){ this._t = String(v); }
});
El.prototype.setAttribute = function(){};
El.prototype.getAttribute = function(){ return null; };
El.prototype.addEventListener = function(){};
El.prototype.getBoundingClientRect = function(){ return {top:9999,bottom:9999}; };
El.prototype.querySelector = function(){ return null; };
El.prototype.querySelectorAll = function(){ return []; };

var REG = {};
['agsStatBar','busuanzi_value_site_pv','busuanzi_value_site_uv','agsCoverRead',
 'agsReadPct','agsReadBar','agsReadTip','agsResume','agsReadReset'].forEach(function(i){ REG[i] = new El(i); });
REG['agsStatBar'].querySelectorAll = function(){ return [REG['busuanzi_value_site_pv'], REG['busuanzi_value_site_uv']]; };

global.document = {
  getElementById: function(id){ return REG[id] || null; },
  querySelectorAll: function(){ return []; },
  cookie: '',
  body: { appendChild: function(){} }
};
global.window = { AbortController: AbortController, addEventListener: function(){}, innerHeight: 900 };
global.localStorage = { _d:{}, getItem:function(k){return this._d[k]||null;},
  setItem:function(k,v){this._d[k]=String(v);} };

// ---- run extracted code ----
%s

// ---- report ----
setTimeout(function(){
  console.log('PV   :', REG['busuanzi_value_site_pv'].textContent);
  console.log('UV   :', REG['busuanzi_value_site_uv'].textContent);
  console.log('已读 :', REG['agsReadPct'].textContent, '|', REG['agsReadTip'].textContent);
  console.log('缓存 :', localStorage.getItem('ags-count-cache'));
  console.log('UV cookie:', document.cookie || '(none)');
}, 7000);
""" % code

io.open('_probe_counter.js', 'w', encoding='utf-8').write(stub)
print('generated _probe_counter.js,', len(stub), 'chars')
