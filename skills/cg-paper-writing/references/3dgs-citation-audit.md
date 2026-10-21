# Citation and claim audit — distinct checks, explicit limits

Reviewed 2026-10-21. The registry indexes research records. Neither inclusion nor
an arXiv API response certifies the scientific statements attached to a record.

## 1. Identify the actual work

Resolve its primary record and compare title, authors and identifier. Record
version and retrieval date. Different papers can share an acronym: the current
catalog disambiguates RxGS and X-Splat by full titles and retains search aliases.
Do not invent version-like suffixes to distinguish papers.

A lexical title/abstract match is a candidate check. It is not a proof of identity
for generic abbreviations and must not be passed by a three-letter prefix or an
arbitrary token-overlap score. Review ambiguous cases against the paper itself.

An unknown catalog entry or unavailable network request is unresolved; neither
establishes fabrication. No-arXiv work may have valid publisher/proceedings
records. Consult those primary sources rather than manufacture an identifier.

## 2. Verify the statement, not just the link

For each citation, record the exact claim, primary URL, page/section/table/figure,
what the source supports, qualifications and unresolved parts. Separate:

- Bibliographic metadata and method-name identity.
- Venue/year/acceptance or retraction status from current official records.
- A technical mechanism from an interpretation or proposed explanation.
- An experimental number from its metric, dataset, split, resolution, hardware,
  prior and training budget.

Do not promote a preprint to an accepted venue without primary evidence. Do not
copy an abstract's performance claim as if it were an independently reproduced
result. Relevant older foundational papers are not invalid merely because of age.

## 3. Local tools and exit states

From the repository root:

```sh
python scripts/audit_manuscript_citations.py --name Mip-Splatting
python scripts/audit_manuscript_citations.py --file manuscript.md
python scripts/check_reference_freshness.py references/papers-collection.md
```

The metadata auditor returns 0 when requested metadata is available, 1 for invalid
input, and 2 for unresolved evidence. Its output is labeled METADATA_ONLY and
states that venues, claims and numerical results remain separate checks. The
freshness tool returns 2 for unresolved/failed checks; age flags prompt review,
not a scientific verdict. Never report that these tools certified full accuracy.

Use `data/evidence-audit.json` for the dated coverage report and per-record
`evidence` fields in `data/methods.json`. Do not overwrite a current source check
with an undated cache or a copied historical note.
