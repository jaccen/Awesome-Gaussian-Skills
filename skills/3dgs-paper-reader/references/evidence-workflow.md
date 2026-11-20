# Paper reading and evidence

## Resolve identity and editions

1. Use a DOI, versioned arXiv ID, publisher record, or local PDF title page. For title or acronym searches, keep plausible candidates until title, authors and method identity agree. Check venue independently via the proceedings, publisher or DOI record. A reachable ID only establishes that a record exists.
2. Use `python scripts/paper_evidence.py lookup "2DGS"` from the project root to resolve an exact catalog name, title, alias or arXiv ID. On ambiguity, inspect each candidate. Use `primary_abstract` for an abstract brief. For technical claims, use `located_evidence` or open the original. A catalog row is an aid to discovery.
3. Lock the edition for extraction. Record the inspected URI, version and any separate supplements. Treat different editions as separate records. For local PDFs, copy the title and author list from the first page and retain a SHA-256 for reproducibility. Use an appropriate local identifier in the record when the document is private.

## Extract and inspect

- Prefer the canonical PDF or versioned full HTML. For local PDFs, run `python scripts/paper_evidence.py extract-pdf input.pdf --output input.pages.json`. Add `--layout` for table columns. Poppler's `pdftotext` must be on PATH. The resulting pages use one-based physical page numbers.
- Check the title page, section boundaries and ending. A blank page needs visual review. Check visually whenever reading order, symbols, tables, figures or image-only pages are ambiguous. Review OCR against the original if used. Abstract feeds and character-limited text extracts give partial coverage.
- Record concrete input, output and assumptions, the architecture and data flow, the equations or algorithm steps that make the method work, training and inference differences, losses and supervision, and the implementation choices that affect results. For surveys, position papers or theory papers, record the taxonomy, argument, proof assumptions or review protocol in the corresponding scopes.
- Capture each major author contribution independently. For experimental claims, record dataset and split, modality or view count, resolution, training/inference budget, hardware when relevant, metric and unit, exact method variant and paper location. Include relevant baselines, negative outcomes and cost trade-offs. For a delta, extract both cells with identical protocols and compute it explicitly. Capture what an ablation changes and what remains controlled.
- Cite a PDF page plus a section, figure, equation or table locator. For HTML, cite the numbered section or anchor. Mark author claims and reader inferences separately. Describe gaps under their corresponding scopes, including unavailable supplements, unrecovered table cells or uncertainty about baseline comparability.

## Save and use the evidence

In the project checkout, use `skills/_contracts/paper-evidence.schema.json` and the examples in `data/paper-evidence/`. Validate an individual record with `python scripts/paper_evidence.py validate <record.json>`, then save reviewed records under `data/paper-evidence/`. Use `python scripts/paper_evidence.py coverage --inventory` to audit every entry and `coverage --pending` to find papers awaiting technical extraction. In a standalone skill installation, follow the same reading protocol with the primary source, and deliver the notes with their locators in the user's workspace.

Write the prose from the findings. A compact overview should explain the problem, the mechanism that addresses it, the result that tests it and its conditions. A deeper synthesis should identify what prior work already provides, isolate the paper's technical difference, and name the remaining gap as a question with observable failure conditions. Carry the relevant findings and locators into downstream work. Record validation checks structure and link consistency. Claims, transcription and scientific conclusions require inspection of the sources.
