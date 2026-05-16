import re

p = r"C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills\.temp\gen_paper.js"
with open(p, "r", encoding="utf-8") as f:
    c = f.read()


# Find all p([...]) calls and replace "..." strings inside with `...` template literals
# Replace all inner double-quoted strings containing Chinese with backtick strings
def replace_chinese_strings(m):
    s = m.group(0)
    # If the string contains any CJK character, use backtick
    if any("\u4e00" <= ch <= "\u9fff" for ch in s):
        inner = s[1:-1]  # strip outer quotes
        return "`" + inner + "`"
    return s


# Match double-quoted strings (simplistic regex)
c = re.sub(r'"[^"]*[\u4e00-\u9fff][^"]*"', replace_chinese_strings, c)

with open(p, "w", encoding="utf-8") as f:
    f.write(c)
print("Replaced Chinese strings with backtick template literals")
