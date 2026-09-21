#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
strip-aigc.py — 跨平台 AIGC 痕迹剥离工具（scripts/strip-aigc.ps1 的 Python 等价实现）

用法:
  python scripts/strip-aigc.py scan     # 仅扫描，列出含 AIGC 痕迹的文件
  python scripts/strip-aigc.py apply    # 实际剥离，原始文件备份到 .temp/aigc-backup

覆盖范围:
  文本 (.md/.txt/.json/.yaml/.yml/.toml)
    - YAML frontmatter 中的 AIGC 块（---\nAIGC: ... ---）
    - 文末 "> AI生成" 标记
  JPEG
    - 含 AIGC 关键字的 APPn 元数据段（0xE0-0xEF），按段结构安全移除
  PNG
    - 含 AIGC 关键字的辅助块（ancillary chunk，首字母小写），保证图像仍可解码

安全策略:
  - 应用前统一备份到 .temp/aigc-backup（文件名中的路径分隔符替换为 __）
  - PNG 仅移除"辅助块"（首字母小写），绝不动 IHDR/PLTE/IDAT/IEND 等关键块
  - JPEG 仅移除 APPn 段，不动 SOI/EOI/SOS 与熵编码数据
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKUP_DIR = os.path.join(ROOT, ".temp", "aigc-backup")
EXCLUDE_DIRS = {"node_modules", ".git", ".temp", "dist", ".venv", "_verify",
                "__pycache__", ".workbuddy", "build"}

TEXT_EXT = {".md", ".txt", ".json", ".yaml", ".yml", ".toml"}
IMG_EXT = {".png", ".jpg", ".jpeg"}

# ---- 文本规则 ----
RE_FRONTMATTER = re.compile(r"(?ms)^---\r?\nAIGC:.*?^---\r?\n")
# 兼容缺少收尾 ---：只吃「AIGC: + 后续缩进行」，绝不使用 DOTALL 的 .*
# （否则无收尾 --- 时会一路匹配到文件末尾，把正文全部删掉）
RE_FRONTMATTER_NC = re.compile(r"(?m)^---\r?\nAIGC:(?:\r?\n[ \t]+\S.*)*\r?\n?")
RE_MARK_BLOCK = re.compile(r"\r?\n>\s*AI\s*生成\s*$")
RE_MARK_LINE = re.compile(r">\s*AI\s*生成\s*$")

# ---- 二进制关键字 ----
BIN_KEYS = (b"ContentProducer", b"ContentPropagator", b"ReservedCode1",
            b"ReservedCode2", b"ProduceID", b"PropagateID", b'"AIGC"', b"AIGC:")


def has_aigc_text(text: str) -> bool:
    return bool(RE_FRONTMATTER.search(text) or RE_FRONTMATTER_NC.search(text)
                or RE_MARK_BLOCK.search(text) or RE_MARK_LINE.search(text))


def strip_text(text: str) -> str:
    out = text
    out = RE_FRONTMATTER.sub("", out, count=1)
    out = RE_FRONTMATTER_NC.sub("", out, count=1)
    out = RE_MARK_BLOCK.sub("", out)
    out = RE_MARK_LINE.sub("", out)
    return out


def strip_jpeg(data: bytes):
    """移除含 AIGC 关键字的 APPn 段。返回 (新bytes, 是否改动)。"""
    if len(data) < 4 or data[0] != 0xFF or data[1] != 0xD8:
        return data, False
    out = bytearray(data[:2])
    pos = 2
    changed = False
    while pos < len(data):
        if data[pos] != 0xFF:
            pos += 1
            continue
        while pos < len(data) and data[pos] == 0xFF:   # 填充字节
            pos += 1
        if pos >= len(data):
            break
        marker = data[pos]
        pos += 1
        if marker in (0xD9, 0xDA):                     # EOI / SOS
            out += bytes([0xFF, marker])
            if marker == 0xDA:
                out += data[pos:]                       # 剩余为熵编码数据
            break
        if marker == 0x01 or marker == 0x00 or 0xD0 <= marker <= 0xD7:
            out += bytes([0xFF, marker])
            continue
        if pos + 1 >= len(data):
            break
        seg_len = (data[pos] << 8) | data[pos + 1]
        data_start = pos + 2
        seg_end = data_start + seg_len - 2
        if seg_len < 2 or seg_end > len(data):
            return data, False                          # 结构异常：放弃该文件
        seg = data[data_start:seg_end]
        is_app = 0xE0 <= marker <= 0xEF
        if is_app and any(k in seg for k in BIN_KEYS):
            changed = True                              # 丢弃该 APPn 段
        else:
            out += bytes([0xFF, marker]) + seg
        pos = seg_end
    return bytes(out), changed


def strip_png(data: bytes):
    """移除含 AIGC 关键字的辅助块。返回 (新bytes, 是否改动)。"""
    if len(data) < 8 or not data.startswith(b"\x89PNG\r\n\x1a\n"):
        return data, False
    out = bytearray(data[:8])
    pos = 8
    changed = False
    while pos + 8 <= len(data):
        length = int.from_bytes(data[pos:pos + 4], "big")
        ctype = data[pos + 4:pos + 8]
        data_start = pos + 8
        chunk_end = data_start + length + 4             # data + CRC
        if chunk_end > len(data):
            chunk_end = len(data)
        chunk = data[pos:chunk_end]
        payload = data[data_start:min(data_start + length, len(data))]
        # 仅移除辅助块（首字母小写），关键块一律保留
        is_ancillary = ctype[:1].islower()
        if is_ancillary and any(k in payload for k in BIN_KEYS):
            changed = True
        else:
            out += chunk
        if ctype == b"IEND":
            break
        pos = chunk_end
    return bytes(out), changed


def backup(rel_path: str, data: bytes):
    safe = rel_path.replace("\\", "__").replace("/", "__")
    os.makedirs(BACKUP_DIR, exist_ok=True)
    with open(os.path.join(BACKUP_DIR, safe), "wb") as f:
        f.write(data)


def iter_files():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext in TEXT_EXT or ext in IMG_EXT:
                yield os.path.join(dirpath, fn), ext


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "scan"
    if mode not in ("scan", "apply"):
        print("用法: python scripts/strip-aigc.py [scan|apply]")
        return 1

    text_hits, img_hits = [], []
    cleaned = []
    for path, ext in iter_files():
        try:
            with open(path, "rb") as f:
                raw = f.read()
        except Exception:
            continue
        rel = os.path.relpath(path, ROOT)

        if ext in TEXT_EXT:
            bom = raw.startswith(b"\xef\xbb\xbf")
            try:
                text = raw.decode("utf-8-sig" if bom else "utf-8")
            except UnicodeDecodeError:
                continue
            if not has_aigc_text(text):
                continue
            text_hits.append(rel)
            if mode == "apply":
                new_text = strip_text(text)
                backup(rel, raw)
                out = ("\ufeff" if bom else "") + new_text
                with open(path, "wb") as f:
                    f.write(out.encode("utf-8"))
                cleaned.append(rel)
        else:
            if not any(k in raw for k in BIN_KEYS):
                continue
            img_hits.append(rel)
            if mode == "apply":
                new_bytes, changed = (strip_jpeg(raw) if ext in (".jpg", ".jpeg")
                                      else strip_png(raw))
                if changed:
                    backup(rel, raw)
                    with open(path, "wb") as f:
                        f.write(new_bytes)
                    cleaned.append(rel)

    print("=== 文本文件含 AIGC 标记: %d ===" % len(text_hits))
    for x in sorted(text_hits):
        print("   ", x)
    print()
    print("=== 图片文件含 AIGC 水印: %d ===" % len(img_hits))
    for x in sorted(img_hits):
        print("   ", x)
    print()
    if mode == "apply":
        print("=== 已清理: %d 个文件 ===" % len(cleaned))
        for x in sorted(cleaned):
            print("   [OK]", x)
        print("\n备份目录:", os.path.relpath(BACKUP_DIR, ROOT))
    else:
        print("（scan 模式，未做修改。执行 `apply` 生效）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
