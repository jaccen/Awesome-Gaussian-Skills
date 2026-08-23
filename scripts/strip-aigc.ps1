# strip-aigc.ps1 — 从文本/JPEG/PNG 文件中安全剥离 AIGC 痕迹
# 用法: powershell -ExecutionPolicy Bypass -File scripts/strip-aigc.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$backupDir = Join-Path $root ".temp\aigc-backup"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

$excludeDirs = @('node_modules', '.git', '.temp', 'dist', '.venv')

function Get-Files {
  Get-ChildItem -Path $root -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object {
      $p = $_.FullName
      -not ($excludeDirs | Where-Object { $p -match [regex]::Escape("$_") })
    }
}

function Test-ContainsAigc([byte[]]$bytes) {
  $ascii = [System.Text.Encoding]::ASCII.GetString($bytes)
  return ($ascii.Contains('"AIGC"') -or $ascii.Contains('ContentProducer') -or $ascii.Contains('ReservedCode1'))
}

function Test-TextAigc([byte[]]$bytes) {
  return Test-ContainsAigc $bytes
}

function Strip-TextAigc([string]$path) {
  # 读取 UTF-8 文本
  $text = [System.IO.File]::ReadAllText($path, [System.Text.UTF8Encoding]::new($false))
  $orig = $text
  # 1) 移除开头 YAML frontmatter 中的 AIGC 块
  $text = [regex]::Replace($text, '(?m)^---\r?\nAIGC:.*?^---\r?\n', '', 0)
  # 兼容无 --- 结束符的情况
  $text = [regex]::Replace($text, '(?m)^---\r?\nAIGC:.*', '', 0)
  # 2) 移除文末 "> AI生成" 标记
  $text = [regex]::Replace($text, '\r?\n> AI生成\s*$', '')
  $text = [regex]::Replace($text, '> AI生成\s*$', '')
  if ($text -ne $orig) {
    # 保留 CRLF 换行风格（若原文件是 CRLF）
    [System.IO.File]::WriteAllText($path, $text, [System.Text.UTF8Encoding]::new($false))
    return $true
  }
  return $false
}

function Strip-JpegAigc([string]$path, [byte[]]$bytes) {
  # JPEG 段结构: FFD8 ... 每个段 FFxx + len(2, 含自身) + data
  if ($bytes.Length -lt 4 -or $bytes[0] -ne 0xFF -or $bytes[1] -ne 0xD8) { return $false }
  $out = New-Object System.Collections.Generic.List[byte]
  foreach ($b in $bytes[0..1]) { $out.Add([byte]$b) }   # SOI
  $pos = 2
  $changed = $false
  while ($pos -lt $bytes.Length) {
    if ($bytes[$pos] -ne 0xFF) { $pos++; continue }
    # 填充字节 FF FF
    while ($pos -lt $bytes.Length -and $bytes[$pos] -eq 0xFF) { $pos++ }
    if ($pos -ge $bytes.Length) { break }
    $marker = $bytes[$pos]
    $pos++
    if ($marker -eq 0xD9 -or $marker -eq 0xDA) {
      # EOI / SOS: 之后是熵编码数据, 直接拷贝剩余
      $out.Add(0xFF); $out.Add($marker)
      if ($marker -eq 0xDA) {
        # 从当前位置拷贝剩余（含熵编码数据）
        for ($i = $pos; $i -lt $bytes.Length; $i++) { $out.Add($bytes[$i]) }
      }
      break
    }
    if ($marker -eq 0x01 -or ($marker -ge 0xD0 -and $marker -le 0xD7) -or $marker -eq 0x00) {
      # 无长度段的标记 (RSTn/TEM/standalone)
      $out.Add(0xFF); $out.Add($marker)
      continue
    }
    if ($pos + 1 -ge $bytes.Length) { break }
    $segLen = ($bytes[$pos] -shl 8) -bor $bytes[$pos+1]
    $dataStart = $pos + 2
    $segEnd = $dataStart + $segLen - 2
    if ($segLen -lt 2 -or $segEnd -gt $bytes.Length) {
      # 段长度异常: 放弃解析该文件，保留原始内容
      Write-Host "  [WARN] malformed segment len=$segLen at $($pos-2); aborting $path" -ForegroundColor Yellow
      return $false
    }
    # 检查该段是否含 AIGC
    $segBytes = New-Object byte[] ($segEnd - $dataStart)
    [System.Array]::Copy($bytes, $dataStart, $segBytes, 0, $segEnd - $dataStart)
    $isApp = ($marker -ge 0xE0 -and $marker -le 0xEF)
    if ($isApp -and (Test-TextAigc($segBytes))) {
      $changed = $true
      Write-Host "  [JPEG] dropped APP segment 0x$('{0:X2}' -f $marker) at offset $($pos-2) (len $segLen)" -ForegroundColor Gray
    } else {
      $out.Add(0xFF); $out.Add($marker)
      for ($i = $pos; $i -lt $segEnd; $i++) { $out.Add($bytes[$i]) }
    }
    $pos = $segEnd
  }
  if ($changed) {
    [System.IO.File]::WriteAllBytes($path, $out.ToArray())
    return $true
  }
  return $false
}

function Strip-PngAigc([string]$path, [byte[]]$bytes) {
  # PNG: 8 字节签名 + chunks (len4 + type4 + data + crc4)
  if ($bytes.Length -lt 8) { return $false }
  $sig = [System.Text.Encoding]::ASCII.GetString($bytes, 0, 8)
  if (-not $sig.StartsWith([char]0x89 + 'PNG')) { return $false }
  $out = New-Object System.Collections.Generic.List[byte]
  for ($i = 0; $i -lt 8; $i++) { $out.Add($bytes[$i]) }
  $pos = 8
  $changed = $false
  while ($pos + 8 -le $bytes.Length) {
    $len = [System.Net.IPAddress]::NetworkToHostOrder([System.BitConverter]::ToInt32($bytes, $pos))
    $type = [System.Text.Encoding]::ASCII.GetString($bytes, $pos+4, 4)
    $dataStart = $pos + 8
    $crcStart = $dataStart + $len
    $chunkEnd = $crcStart + 4
    if ($chunkEnd -gt $bytes.Length) { $chunkEnd = $bytes.Length }
    $chunkLen = $chunkEnd - $pos
    $chunk = New-Object byte[] $chunkLen
    [System.Array]::Copy($bytes, $pos, $chunk, 0, $chunkLen)
    $dataAscii = [System.Text.Encoding]::ASCII.GetString($bytes, $dataStart, [Math]::Min($len, $bytes.Length - $dataStart))
    $containsAigc = ($dataAscii.Contains('AIGC') -or $dataAscii.Contains('ContentProducer') -or $dataAscii.Contains('ReservedCode1'))
    if ($containsAigc) {
      $changed = $true
      Write-Host "  [PNG] dropping chunk $type (len $len)" -ForegroundColor Gray
    } else {
      foreach ($b in $chunk) { $out.Add($b) }
    }
    if ($type -eq 'IEND') { break }
    $pos = $chunkEnd
  }
  if ($changed) {
    [System.IO.File]::WriteAllBytes($path, $out.ToArray())
    return $true
  }
  return $false
}

# ---- main ----
$cleanCount = 0
foreach ($f in Get-Files) {
  try {
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  } catch {
    Write-Host "  [SKIP] $($f.FullName) (locked/in use)" -ForegroundColor Yellow
    continue
  }
  $ext = $f.Extension.ToLower()
  $has = Test-TextAigc($bytes)
  if (-not $has) { continue }
  # 备份
  $rel = $f.FullName.Substring($root.Length).TrimStart('\','/')
  $bPath = Join-Path $backupDir ($rel -replace '[\\/]', '__')
  [System.IO.File]::WriteAllBytes($bPath, $bytes)
  $done = $false
  if ($ext -in @('.md','.txt','.json','.yaml','.yml','.toml')) {
    $done = Strip-TextAigc $f.FullName
  } elseif ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) {
    $done = Strip-JpegAigc $f.FullName $bytes
  } elseif ([System.Text.Encoding]::ASCII.GetString($bytes, 1, 3) -eq 'PNG') {
    $done = Strip-PngAigc $f.FullName $bytes
  } else {
    Write-Host "  [SKIP] unknown format: $($f.FullName)" -ForegroundColor Yellow
  }
  if ($done) { $cleanCount++; Write-Host "[OK] $($f.FullName.Replace($root,''))" -ForegroundColor Green }
}
Write-Host ""
Write-Host "DONE: $cleanCount files cleaned. Backups in .temp\aigc-backup"