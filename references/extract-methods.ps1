$ErrorActionPreference = 'Stop'
$file    = "C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills\references\3dgs-methods-overview.md"
$outFile = "C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills\references\methods-extracted.txt"

$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$lines   = $content -split "`r?`n"

$results  = New-Object System.Collections.Generic.List[string]
$dedup    = @{}
$emDash   = [char]0x2014
$namePat  = '^[A-Z]\p{Ll}+(?:-[A-Z]\p{Ll}+)?$'

foreach ($line in $lines) {
    # Strip zero-width / BOM / RTL control chars from the WHOLE line first
    # (some entries have steganographic ZW sequences hidden before the method name)
    $line = $line -replace '[\u200B\u200C\u200D\uFEFF\u202A-\u202E]', ''
    if ($line -notmatch '^\s*-\s*\*\*(.+?)\*\*\s+(.*)$') { continue }
    $name = $matches[1]
    $rest = $matches[2]

    # Find separator: em-dash (preferred) or double-hyphen
    $desc = $null
    $emIdx = $rest.IndexOf($emDash)
    $ddIdx = $rest.IndexOf('--')
    if ($emIdx -ge 0) {
        $desc = $rest.Substring($emIdx + 1).Trim()
    } elseif ($ddIdx -ge 0) {
        $desc = $rest.Substring($ddIdx + 2).Trim()
    } else {
        continue
    }

    # Remove markdown links entirely: [text](url)
    $desc = [regex]::Replace($desc, '\s*\[[^\]]*\]\([^)]*\)', '')

    # Remove author parentheticals containing "et al." (allow text between "et al." and ")")
    $desc = [regex]::Replace($desc, '\s*\([^)]*et al\.[^)]*\)', '')

    # Strip zero-width / BOM / RTL control chars that may sneak in
    $desc = $desc -replace '[\u200B\u200C\u200D\uFEFF\u202A-\u202E]', ''

    # Remove trailing comma-separated author name list (no "et al.")
    # Greedy .* ensures we grab the LAST parenthetical at the end of the line.
    $m = [regex]::Match($desc, '^(.*)\(([^)]+)\)\s*$')
    if ($m.Success) {
        $inner = $m.Groups[2].Value
        $parts = $inner -split ','
        $allNames = $true
        $tokenCount = 0
        foreach ($p in $parts) {
            $p = $p.Trim()
            if ($p -eq '') { $allNames = $false; break }
            $words = $p -split '\s+'
            foreach ($w in $words) {
                $tokenCount++
                if ($w -cnotmatch $namePat) { $allNames = $false; break }
            }
            if (-not $allNames) { break }
        }
        if ($allNames -and $tokenCount -ge 2) {
            $desc = $m.Groups[1].Value.Trim()
        }
    }

    $desc = $desc.Trim()
    if ($desc.Length -gt 0) {
        # Dedup by name, keeping the LONGEST description
        if ($dedup.ContainsKey($name)) {
            if ($desc.Length -gt $dedup[$name].Length) {
                $dedup[$name] = $desc
            }
        } else {
            $dedup[$name] = $desc
        }
    }
}

# Build final ordered output list
$results = New-Object System.Collections.Generic.List[string]
foreach ($key in $dedup.Keys) {
    $results.Add("$key|||$($dedup[$key])")
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($outFile, $results, $utf8NoBom)
Write-Output "Total methods extracted (after dedup): $($results.Count)"
Write-Output "Output written to: $outFile"
