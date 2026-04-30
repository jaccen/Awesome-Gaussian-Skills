import yaml, re

with open(
    r"C:\Users\Lenovo\.local\share\teleai-super-agent\tool-output\tool_dd7e702c6001wbJDEOpPv5xgY4",
    "r",
    encoding="utf-8",
) as f:
    data = yaml.safe_load(f)

papers = data if isinstance(data, list) else [data]

meta_tags = {"Code", "Project", "Video", "Year 2025"}
content_tags = sorted(
    set(t for p in papers if p and "tags" in p for t in p["tags"]) - meta_tags
)


def extract_arxiv_id(url):
    if not url:
        return None
    m = re.search(r"(\d{4}\.\d{4,5})", str(url))
    return m.group(1) if m else None


def extract_github(url):
    if not url:
        return None
    return url if "github.com" in str(url) else None


output = []
for tag in content_tags:
    tag_papers = [p for p in papers if p and "tags" in p and tag in p["tags"]]
    if not tag_papers:
        continue
    sep = "=" * 80
    output.append(f"\n{sep}")
    output.append(f"CATEGORY: {tag} ({len(tag_papers)} papers)")
    output.append(sep)
    for p in tag_papers:
        title = p.get("title", "N/A")
        authors = p.get("authors", "N/A")
        year = p.get("year", "N/A")
        paper_url = p.get("paper", "")
        arxiv_id = extract_arxiv_id(paper_url)
        code = extract_github(p.get("code", ""))
        proj = p.get("project_page", "")
        abstract = p.get("abstract", "")[:200] if p.get("abstract") else ""
        other_tags = [t for t in p.get("tags", []) if t != tag and t not in meta_tags]

        output.append(f"\n- Title: {title}")
        output.append(f"  Authors: {authors}")
        output.append(f"  Year: {year}")
        if arxiv_id:
            output.append(f"  ArXiv: {arxiv_id}")
        if code:
            output.append(f"  Code: {code}")
        if proj:
            output.append(f"  Project: {proj}")
        if paper_url and not arxiv_id:
            output.append(f"  Paper: {paper_url}")
        if other_tags:
            output.append(f"  Tags: {', '.join(other_tags)}")
        if abstract:
            output.append(f"  Key: {abstract.strip()}")

result = "\n".join(output)
with open(
    r"C:\Users\Lenovo\Desktop\Project\Awesome-Gaussian-Skills\mrnerf-awesome-papers-extracted.md",
    "w",
    encoding="utf-8",
) as f:
    f.write(result)
print(f"Written {len(result)} chars, {len(content_tags)} categories to file")
