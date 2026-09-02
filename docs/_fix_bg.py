# -*- coding: utf-8 -*-
import io
s = io.open("index.html", "r", encoding="utf-8").read()
# 1. 替换所有 bg-bg-card -> bg-slate-50
s = s.replace("bg-bg-card", "bg-slate-50")
# 2. 替换 bg-bg/50 -> bg-slate-100/50
s = s.replace("bg-bg/50", "bg-slate-100/50")
io.open("index.html", "w", encoding="utf-8").write(s)
print("bg-bg-card count:", s.count("bg-slate-50"))
print("bg-bg/50 count:", s.count("bg-slate-100/50"))
