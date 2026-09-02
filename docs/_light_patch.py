# -*- coding: utf-8 -*-
import io, re

path = "index.html"
s = io.open(path, "r", encoding="utf-8").read()

def rep(old, new, label=""):
    global s
    n = s.count(old)
    s = s.replace(old, new)
    print("  %-34s %d" % (label, n))

# ---- 1. 保护需要保持白色的文本（图片悬停遮罩 / 彩色徽章 / 渐变 logo）----
s = s.replace("text-white text-sm font-semibold", "___KEEP_W___ text-sm font-semibold")
s = s.replace("text-gray-300 text-xs", "___KEEP_G___ text-xs")
s = s.replace('rounded-full text-white" style="background:', 'rounded-full ___KEEP_W___" style="background:')
s = s.replace("text-white bg-[length:200%_200%]", "___KEEP_W___ bg-[length:200%_200%]")

# ---- 2. Tailwind 配置色 ----
rep('bg: { DEFAULT: \'#05060a\', card: \'#0e1018\', hover: \'#171a26\' }',
    'bg: { DEFAULT: \'#f5f7fb\', card: \'#ffffff\', hover: \'#eef1f7\' }', "config.bg")
rep('accent: { blue: \'#6366f1\', purple: \'#a855f7\', cyan: \'#22d3ee\', teal: \'#2dd4bf\', green: \'#34d399\', rose: \'#fb7185\', amber: \'#fbbf24\' }',
    'accent: { blue: \'#6366f1\', purple: \'#a855f7\', cyan: \'#06b6d4\', teal: \'#14b8a6\', green: \'#10b981\', rose: \'#f43f5e\', amber: \'#f59e0b\' }', "config.accent")

# ---- 3. 替换 <style> 块 ----
new_css = io.open("_light_style.css", "r", encoding="utf-8").read()
s2 = re.sub(r'<style>.*?</style>', '<style>\n' + new_css + '</style>', s, count=1, flags=re.S)
print("  style block replaced:", s2 != s)
s = s2

# ---- 4. 全局类替换 ----
rep("text-gray-300", "text-slate-700", "gray-300 -> slate-700")
rep("text-gray-400", "text-slate-600", "gray-400 -> slate-600")
rep("text-gray-500", "text-slate-500", "gray-500 -> slate-500")
rep("text-gray-600", "text-slate-400", "gray-600 -> slate-400")
rep("text-gray-700", "text-slate-300", "gray-700 -> slate-300")
rep("text-white", "text-slate-900", "white -> slate-900")
rep("bg-white/5", "bg-slate-900/5", "bg-white/5 -> slate")
rep("border-white/10", "border-slate-900/10", "border-white/10")
rep("border-white/5", "border-slate-900/5", "border-white/5")
rep("placeholder-gray-500", "placeholder-slate-400", "placeholder")
rep("text-cyan-300", "text-cyan-600", "cyan-300 -> 600")
rep("text-cyan-200", "text-cyan-700", "cyan-200 -> 700")
rep("text-emerald-400", "text-emerald-600", "emerald-400 -> 600")
rep("text-amber-400", "text-amber-600", "amber-400 -> 600")
rep("text-rose-400", "text-rose-600", "rose-400 -> 600")
rep("background:#0a0a0f", "background:#f1f5f9", "canvas bg -> light")
rep("overflow-x-auto text-slate-700 bg-transparent", "overflow-x-auto text-slate-700 bg-slate-50 rounded-b-xl", "install code bg")

# ---- 5. 还原受保护的文本 ----
s = s.replace("___KEEP_W___", "text-white")
s = s.replace("___KEEP_G___", "text-gray-300")

io.open(path, "w", encoding="utf-8").write(s)
print("DONE, new size", len(s))
