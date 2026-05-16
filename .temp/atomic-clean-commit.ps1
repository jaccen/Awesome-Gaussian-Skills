# Atomic AIGC cleanup + git add + git commit
# Clean files in memory, write them, and immediately git add+commit before framework re-injects

function Clean-AIGC {
    param([string]$Path)
    
    $raw = [System.IO.File]::ReadAllText($Path)
    $result = $raw

    # Step 1: Remove mid-content AIGC blocks
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
                    $result = $afterYaml.TrimStart()
                    if ($result.StartsWith("---")) {
                        $result = $result.Substring(3).TrimStart()
                    }
                }
            }
        }
    }

    # Step 3: Remove orphan --- at very start
    $trimmed = $result.TrimStart()
    if ($trimmed.StartsWith("---")) {
        $afterDash = $trimmed.Substring(3).TrimStart()
        $firstLine = $afterDash.Split("`n")[0].Trim()
        if ($firstLine -notmatch "^[a-zA-Z_][a-zA-Z0-9_]*:" -and $firstLine -ne "" -and $firstLine -ne "---") {
            $result = $afterDash
        }
    }

    # Step 4: Remove AI footer
    $result = $result -replace '(?m)^>\s*AI.*$\r?\n?', ''

    # Final
    $result = $result.TrimStart()
    $result = $result.TrimEnd() + "`n"

    return $result
}

# Files to clean
$files = @(
    "README.md",
    "README_CN.md",
    "references\methods-core.md",
    "references\3dgs-methods-overview.md",
    "references\methods-semantic-editing.md",
    "references\methods-systems-apps.md"
)

$repoRoot = "C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills"

# Clean each file and write immediately
foreach ($f in $files) {
    $fullPath = Join-Path $repoRoot $f
    $cleaned = Clean-AIGC -Path $fullPath
    [System.IO.File]::WriteAllText($fullPath, $cleaned)
    Write-Host "Cleaned: $f"
}

# IMMEDIATELY git add + commit
Set-Location $repoRoot
git add README.md README_CN.md references\methods-core.md references\3dgs-methods-overview.md references\methods-semantic-editing.md references\methods-systems-apps.md .temp\clean-aigc.ps1
git commit -m "chore: remove AIGC watermarks from all reference files + upgrade cleanup script to v3

- Remove AIGC YAML frontmatter from methods-core.md
- Remove mid-content AIGC injection blocks from README.md, README_CN.md
- Remove orphan --- headers from README.md, README_CN.md
- Remove > AI生成 footers
- Upgrade clean-aigc.ps1 to v3: handles 3 patterns (frontmatter, mid-content, orphan ---)"
Write-Host "Done: committed"
