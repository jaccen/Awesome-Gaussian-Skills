param([string]$Path)
# Smart AIGC watermark cleaner v3
# Handles 3 patterns:
#   1. YAML frontmatter AIGC block (---\nAIGC:...\n---)
#   2. Mid-content AIGC blocks (AIGC:\n  ContentProducer: ...\n---)
#   3. Orphan --- on line 1 when followed by non-YAML content (like <div>)
# Also removes "> AI生成" / "> AI" footer lines

$raw = [System.IO.File]::ReadAllText($Path)
$result = $raw

# Step 1: Remove mid-content AIGC blocks (AIGC: ... ---)
# Pattern: line starting with "AIGC:" followed by indented AIGC fields, ending with "---"
$result = $result -replace '(?m)^AIGC:\s*\r?\n(\s+(ContentProducer|ContentPropagator|Label|ProduceID|PropagateID|ReservedCode1|ReservedCode2):[^\r\n]*\r?\n)+---\s*\r?\n', ''

# Step 2: Remove YAML frontmatter AIGC block
$trimmed = $result.TrimStart()
if ($trimmed.StartsWith("---")) {
    $endIdx = $trimmed.IndexOf("`n---", 3)
    if ($endIdx -lt 0) {
        $endIdx = $trimmed.IndexOf("`r`n---", 3)
    }

    if ($endIdx -gt 0) {
        $yamlBlock = $trimmed.Substring(3, $endIdx - 3).Trim()
        $afterYaml = $trimmed.Substring($endIdx)

        $lines = $yamlBlock -split "`n"
        $keptLines = @()
        $inAIGCBlock = $false
        $aigcFound = $false

        foreach ($line in $lines) {
            $tl = $line.Trim()

            if ($tl -match "^AIGC:\s*$") {
                $inAIGCBlock = $true
                $aigcFound = $true
                continue
            }

            if ($inAIGCBlock -and $tl -match "^(ContentProducer|ContentPropagator|Label|ProduceID|PropagateID|ReservedCode1|ReservedCode2):") {
                $aigcFound = $true
                continue
            }

            if ($inAIGCBlock -and $tl -ne "" -and -not $tl.StartsWith("  ") -and -not $tl.StartsWith("`t")) {
                $inAIGCBlock = $false
            }

            if ($tl -match "^(ContentProducer|ContentPropagator|ProduceID|PropagateID|ReservedCode1|ReservedCode2):") {
                $aigcFound = $true
                continue
            }

            $keptLines += $line
        }

        $newYaml = ($keptLines | Where-Object { $_ -ne $null }) -join "`n"
        $newYaml = $newYaml.Trim()

        if ($aigcFound) {
            if ($newYaml.Length -gt 0) {
                $result = "---`n$newYaml`n---`n" + $afterYaml.TrimStart()
            } else {
                # All YAML was AIGC - remove entire frontmatter including orphan ---
                $result = $afterYaml.TrimStart()
                # If result starts with --- alone on a line (orphan), remove it too
                if ($result.StartsWith("---")) {
                    $result = $result.Substring(3).TrimStart()
                }
            }
        }
    }
}

# Step 3: Remove orphan --- at very start of file when next non-empty line is NOT a YAML field
# (e.g., ---\n\n<div align="center">)
$trimmed = $result.TrimStart()
if ($trimmed.StartsWith("---")) {
    $afterDash = $trimmed.Substring(3).TrimStart()
    $firstLine = $afterDash.Split("`n")[0].Trim()
    # If first real line after --- doesn't look like a YAML key:value, it's orphan
    if ($firstLine -notmatch "^[a-zA-Z_][a-zA-Z0-9_]*:" -and $firstLine -ne "" -and $firstLine -ne "---") {
        $result = $afterDash
    }
}

# Step 4: Remove "> AI生成" / "> AI" footer lines
$result = $result -replace '(?m)^>\s*AI.*$\r?\n?', ''

# Final cleanup: no excessive blank lines at start, single trailing newline
$result = $result.TrimStart()
$result = $result.TrimEnd() + "`n"

if ($result -ne $raw) {
    [System.IO.File]::WriteAllText($Path, $result)
    Write-Host "Cleaned: $Path"
} else {
    Write-Host "Already clean: $Path"
}
