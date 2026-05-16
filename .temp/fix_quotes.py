import re

with open(
    r"C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills\.temp\gen_paper.js",
    "r",
    encoding="utf-8",
) as f:
    c = f.read()
c = c.replace("\u201c", "\u300e")
c = c.replace("\u201d", "\u300f")
with open(
    r"C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills\.temp\gen_paper.js",
    "w",
    encoding="utf-8",
) as f:
    f.write(c)
print("Done, replacements:", c.count("\u300e"))
