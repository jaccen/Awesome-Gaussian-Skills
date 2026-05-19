---
name: 3dgs-visualizer
description: "Generate publication-quality visualizations for 3DGS research: radar charts, comparison tables, method timelines. Static (PDF/PNG) and interactive (HTML) output."
version: 1.0.2
author: jaccen
tags: ["3dgs", "gaussian-splatting", "visualization", "radar-chart", "timeline", "research"]
---

# 3DGS Visualizer — Publication-Quality Research Visualizations

Generate publication-quality charts for 3DGS method landscape comparison and evolution tracking.

## Capabilities

- **Radar Charts**: Multi-dimensional method capability comparison
- **Comparison Tables**: Visual performance/efficiency tables with highlighting
- **Method Timelines**: Chronological evolution showing trends and paradigm shifts
- **Dual Output**: Static (PDF/PNG via matplotlib) and interactive HTML (via plotly)

## Data Sources

| File | Content |
|------|---------|
| `../../references/3dgs-methods-overview.md` | Master index, metrics summary |
| `../../references/methods-core.md` | Foundation, Geometry, CAD, Generation, Feed-Forward, Compression, Dynamic |
| `../../references/methods-semantic-editing.md` | Semantic, Editing, Avatar, Material methods |
| `../../references/methods-systems-apps.md` | Robustness, Driving, SLAM, Simulation, Cross-Domain |
| `../../references/baselines.md` | Standard baselines with core metrics |
| `../../references/experiments.md` | Dataset configs, efficiency reference values |

---

## Visualization 1: Radar Charts (Method Capability Comparison)

**When to use**: Comparing 3–8 methods across multiple dimensions; showing quality/speed/memory trade-offs; use-case recommendation.

### Dimensions

| Dimension | Scoring Criteria (0–10) |
|-----------|------------------------|
| **Render Quality** | 10=SOTA, 7=competitive, 5=acceptable, 3=below baseline |
| **Render Speed** | 10=200+ FPS, 7=60–100, 5=30–60, 3=<30 |
| **Memory Efficiency** | 10=<50MB, 7=100–500MB, 5=0.5–2GB, 3=>2GB |
| **Geometry Quality** | 10=mesh-ready (2DGS/SuGaR), 7=decent depth, 5=approx, 3=poor |
| **Scalability** | 10=city-scale, 7=building, 5=room, 3=object-only |
| **Ease of Use** | 10=single script, 7=standard pipeline, 5=multi-stage, 3=complex setup |
| **Novelty** | 10=paradigm shift, 7=significant extension, 5=incremental, 3=minor tweak |

Adjust dimensions by context (compression: add "Compression Ratio"; avatar: add "Expression Fidelity"; SLAM: add "Tracking Accuracy").

### API

```python
OKABE_ITO = ['#E69F00', '#56B4E9', '#009E73', '#F0E442',
             '#0072B2', '#D55E00', '#CC79A7', '#000000']

# Static (matplotlib)
def plot_radar(methods_data, dimensions, title="3DGS Method Comparison",
               output_path="radar_comparison.pdf", figsize=(8, 8)):
    """methods_data: {name: [score1, ...]}, dimensions: [label, ...]"""
    N = len(dimensions)
    angles = np.linspace(0, 2*np.pi, N, endpoint=False).tolist()
    angles += angles[:1]
    fig, ax = plt.subplots(figsize=figsize, subplot_kw=dict(polar=True))
    for i, (name, values) in enumerate(methods_data.items()):
        values = values + values[:1]
        ax.plot(angles, values, 'o-', linewidth=2, label=name, color=OKABE_ITO[i%8])
        ax.fill(angles, values, alpha=0.1, color=OKABE_ITO[i%8])
    ax.set_xticks(angles[:-1]); ax.set_xticklabels(dimensions, fontsize=10)
    ax.set_ylim(0, 10); ax.set_yticks([2,4,6,8,10])
    ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1), fontsize=9)
    ax.grid(color='grey', linewidth=0.3, alpha=0.5)
    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    plt.savefig(output_path.replace('.pdf','.png'), dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()

# Interactive (plotly)
def plot_radar_interactive(methods_data, dimensions, title="3DGS Method Comparison",
                           output_path="radar_comparison.html"):
    fig = go.Figure()
    for i, (name, values) in enumerate(methods_data.items()):
        fig.add_trace(go.Scatterpolar(
            r=values+values[:1], theta=dimensions+dimensions[:1],
            fill='toself', name=name, line_color=OKABE_ITO[i%8], opacity=0.8))
    fig.update_layout(polar=dict(radialaxis=dict(visible=True, range=[0,10])),
        showlegend=True, title=dict(text=title), width=900, height=700)
    fig.write_html(output_path)
```

---

## Visualization 2: Comparison Tables (Visual Performance Tables)

**When to use**: Summarizing quantitative results across methods/datasets; paper-ready tables with visual emphasis; efficiency vs quality trade-off.

### Table Types

| Type | Description | Best For |
|------|-------------|----------|
| **A: Quantitative Performance** | Color-coded cells (green=best, blue=second) | Multi-dataset metric comparison |
| **B: Efficiency-Quality Scatter** | FPS vs PSNR scatter with category coloring | Speed/quality trade-off analysis |

### API — Type A: Performance Table

```python
def plot_comparison_table(data, methods, datasets, metric="PSNR (dB)",
                          higher_is_better=True, output_path="perf_table.pdf"):
    """data: 2D array [method][dataset]"""
    fig, ax = plt.subplots(figsize=(len(datasets)*1.8+2, len(methods)*0.6+1))
    ax.axis('off')
    cell_text, cell_colors = [], []
    for i in range(len(datasets)):
        row, row_colors = [], []
        col_vals = [data[k][i] for k in range(len(methods))]
        for j in range(len(methods)):
            val = data[j][i]; row.append(f"{val:.2f}")
            is_best = abs(val - (max if higher_is_better else min)(col_vals)) < 0.01
            is_second = abs(val - sorted(col_vals, reverse=higher_is_better)[1]) < 0.01 if len(col_vals)>1 else False
            row_colors.append('#C6EFCE' if is_best else '#BDD7EE' if is_second else '#FFFFFF')
        cell_text.append(row); cell_colors.append(row_colors)
    table = ax.table(cellText=cell_text, rowLabels=datasets, colLabels=methods,
                     cellColours=cell_colors, loc='center', cellLoc='center')
    table.auto_set_font_size(False); table.set_fontsize(10); table.scale(1, 1.8)
    for j in range(len(methods)):
        table[0,j].set_facecolor('#4472C4'); table[0,j].set_text_props(color='white', fontweight='bold')
    ax.set_title(f"{metric} Comparison", fontsize=14, fontweight='bold', pad=20)
    plt.tight_layout(); plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
```

### API — Type B: Efficiency Scatter

```python
CATEGORY_COLORS = {
    'Foundation': '#0072B2', 'Compression': '#E69F00', 'Feed-Forward': '#009E73',
    'Geometry': '#D55E00', 'Dynamic': '#CC79A7', 'Other': '#56B4E9',
    'Surface/Geometry': '#D55E00', 'Editing': '#56B4E9', 'Semantic/Language': '#F0E442',
    'Avatar/Human': '#994F00', 'SLAM': '#661100', 'Cross-Domain': '#5B5B5B',
    'Robustness': '#984EA3', 'Generation': '#4daf4a', 'System/Acceleration': '#377eb8', 'CAD/Mesh': '#ff7f00',
}

def plot_efficiency_scatter(methods_info, output_path="efficiency_scatter.pdf"):
    """methods_info: [{name, psnr, fps, category, size}]"""
    fig, ax = plt.subplots(figsize=(8, 6))
    for info in methods_info:
        color = CATEGORY_COLORS.get(info.get('category','Other'), '#56B4E9')
        ax.scatter(info['fps'], info['psnr'], s=info.get('size',100),
                   c=color, alpha=0.8, edgecolors='black', linewidth=0.5)
        ax.annotate(info['name'], (info['fps'], info['psnr']),
                    textcoords="offset points", xytext=(5,5), fontsize=8)
    ax.set_xlabel('Rendering Speed (FPS)'); ax.set_ylabel('PSNR (dB)')
    ax.axhline(y=27, color='grey', linestyle='--', alpha=0.3)
    ax.axvline(x=60, color='grey', linestyle='--', alpha=0.3)
    ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
    plt.tight_layout(); plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()

# Interactive table (plotly)
def plot_interactive_table(data, methods, datasets, metric="PSNR (dB)",
                           output_path="perf_table.html"):
    fig = go.Figure(data=[go.Table(
        header=dict(values=[metric]+methods, fill_color='#4472C4', font=dict(color='white', size=12)),
        cells=dict(values=[[f"{v:.2f}" for v in col] for col in zip(*data)], fill_color='white'))])
    fig.update_layout(width=800, title=metric); fig.write_html(output_path)
```

---

## Visualization 3: Method Timelines (3DGS Evolution)

**When to use**: Chronological development; identifying research trends; literature review figures; conference slides.

### Design Principles

- **Horizontal axis**: Time (year/quarter)
- **Vertical lanes**: Research categories
- **Node size**: Significance (citation count)
- **Node color**: Category (use CATEGORY_COLORS, consistent with other charts)
- **Connections**: Show lineage (e.g., 3DGS → Scaffold-GS, 3DGS → 2DGS)

### API — Static Timeline

```python
def plot_timeline(events, output_path="3dgs_timeline.pdf", figsize=(16, 10)):
    """events: [{name, date(YYYY-MM), category, venue, citation_count}]"""
    fig, ax = plt.subplots(figsize=figsize)
    y_positions = {cat: i for i, cat in enumerate(sorted(set(e['category'] for e in events)))}
    for event in events:
        y = y_positions[event['category']]
        dt = datetime.strptime(event['date'][:7], '%Y-%m')
        x = mdates.date2num(dt)
        color = CATEGORY_COLORS.get(event['category'], '#666666')
        size = min(200, 50 + event.get('citation_count', 20) * 0.5)
        ax.scatter(x, y, s=size, c=color, alpha=0.8, edgecolors='black', linewidth=0.5, zorder=5)
        venue = event.get('venue', '')
        label = f"{event['name']}\n({venue})" if venue else event['name']
        ax.annotate(label, (x, y), textcoords="offset points",
                    xytext=(0, -size**0.5/2 - 8), ha='center', fontsize=6,
                    bbox=dict(boxstyle='round,pad=0.2', facecolor='white', alpha=0.8,
                              edgecolor=color, linewidth=0.5))
    ax.set_yticks(range(len(y_positions)))
    ax.set_yticklabels(sorted(y_positions.keys()), fontsize=10)
    ax.xaxis.set_major_locator(mdates.MonthLocator(interval=3))
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
    plt.xticks(rotation=45, fontsize=9)
    ax.set_title('3DGS Method Evolution Timeline', fontsize=16, fontweight='bold')
    ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
    plt.tight_layout(); plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
```

### API — Interactive Timeline

```python
def plot_timeline_interactive(events, output_path="3dgs_timeline.html"):
    categories = sorted(set(e['category'] for e in events))
    y_map = {cat: i for i, cat in enumerate(categories)}
    fig = go.Figure()
    for cat in categories:
        cat_events = [e for e in events if e['category'] == cat]
        dates = [datetime.strptime(e['date'][:7], '%Y-%m') for e in cat_events]
        y_vals = [y_map[cat]] * len(cat_events)
        sizes = [min(30, 10+e.get('citation_count',20)*0.1) for e in cat_events]
        hover = [f"<b>{e['name']}</b><br>Venue: {e.get('venue','N/A')}<br>"
                 f"Citations: {e.get('citation_count','N/A')}" for e in cat_events]
        fig.add_trace(go.Scatter(x=dates, y=y_vals, mode='markers+text', name=cat,
            marker=dict(size=sizes, color=CATEGORY_COLORS.get(cat,'#666')),
            text=[e['name'] for e in cat_events], textposition='bottom center',
            textfont=dict(size=8), hovertext=hover, hoverinfo='text'))
    fig.update_layout(title='3DGS Method Evolution Timeline', height=800, width=1200,
        yaxis=dict(tickmode='array', tickvals=list(range(len(categories))), ticktext=categories),
        hovermode='closest', legend=dict(orientation="h", y=-0.15))
    fig.write_html(output_path)
```

---

## Workflow

1. **Identify**: Visualization type (Radar/Table/Timeline), methods, output format (static/interactive/both), context (paper/presentation/comparison)
2. **Gather Data**: Read `references/*.md` for metrics; score qualitative dimensions from knowledge base; prefer user-provided data when given
3. **Generate**: Write Python script to `.temp/`; apply publication-quality styling; export PDF/PNG + HTML
4. **Validate**: Check readability, colorblind accessibility (Okabe-Ito), label positioning

## Pre-built Presets

- **Landscape Overview**: Radar + scatter + timeline combined (3 PDFs + interactive HTML)
- **Category Deep Dive**: Category-specific radar dimensions + detailed table + mini-timeline
- **Paper Submission Package**: Comparison radar (Related Work) + performance table + efficiency scatter, all at 300 DPI

## Integration

- **scientific-visualization**: Publication styling, journal formatting, DPI
- **3dgs-method-compare**: Comparison results as data source
- **3dgs-experiment-planner**: Ablation figure generation
- **3dgs-paper-reader**: Extract metrics from new papers

## Rules

1. **Data accuracy first**: Prefer knowledge base data over estimates; mark uncertain values as "approx."
2. **Color consistency**: Same category-to-color mapping across all charts in one output
3. **Accessibility**: Okabe-Ito palette default; test grayscale readability
4. **No chart junk**: Remove unnecessary gridlines, 3D effects, shadows
5. **Proper labeling**: All axes with units; clear legends
6. **Citation awareness**: Include venue/year for method context
7. **Interactive bonus**: Always offer interactive HTML alongside static figures
