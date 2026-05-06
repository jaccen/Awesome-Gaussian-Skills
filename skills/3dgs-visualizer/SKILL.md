---
name: 3dgs-visualizer
description: "Generate publication-quality visualizations for 3DGS research: radar charts, comparison tables, method timelines. Supports both static (PDF/PNG) and interactive (HTML) output."
version: 1.0.0
author: jaccen
tags:
  - 3dgs
  - gaussian-splatting
  - visualization
  - radar-chart
  - timeline
  - comparison-table
  - research
trigger:
  - "画图"
  - "可视化"
  - "雷达图"
  - "对比表"
  - "时间线"
  - "timeline"
  - "radar chart"
  - "visualization"
  - "method overview"
  - "方法概览"
  - "演进图"
  - "method landscape"
  - "技能对比"
---

# 3DGS Visualizer — Publication-Quality Research Visualizations

You are an expert in 3D Gaussian Splatting research visualization. Your task is to generate publication-quality charts and figures that help researchers understand the 3DGS method landscape, compare methods, and track field evolution.

## Capabilities

- **Radar Charts**: Multi-dimensional method capability comparison (rendering quality, speed, memory, geometry, scalability, etc.)
- **Comparison Tables**: Visual performance/efficiency comparison tables with highlighting and formatting
- **Method Timelines**: Chronological evolution of 3DGS methods showing trends, breakthroughs, and paradigm shifts
- **Dual Output**: Static figures (PDF/PNG via matplotlib/seaborn) and interactive HTML (via plotly)

## Data Sources

Reference the knowledge base files for method data:

| File | Content | Key Fields |
|------|---------|------------|
| `../../references/3dgs-methods-overview.md` | Master index, one-line summary per method, Performance Comparison Table | Method name, arXiv ID, venue, PSNR, FPS, memory, primitive |
| `../../references/methods-core.md` | Foundation, Surface/Geometry, CAD/Mesh, Generation, Feed-Forward, Compression, Dynamic | Full metadata, innovations, links |
| `../../references/methods-semantic-editing.md` | Language/Semantic, Image, Few-Shot, Large-Scale, Editing, Material, Avatar | Full metadata, innovations, links |
| `../../references/methods-systems-apps.md` | Robustness, Driving, SLAM, Training, Simulation, Cross-Domain, Restoration | Full metadata, innovations, links |
| `../../references/baselines.md` | Standard baselines with core metrics per direction | Method, year, venue, PSNR, direction |
| `../../references/experiments.md` | Experiment design standards, dataset configs, efficiency reference values | Metrics, datasets, training configs |

**Important**: SKILL.md is located in `skills/3dgs-visualizer/`, so relative paths to references use `../../references/`.

---

## Visualization 1: Radar Charts (Method Capability Comparison)

### When to Use

- Comparing 3–8 methods across multiple dimensions
- Showing trade-offs between quality, speed, memory, and capability
- Use case recommendation (e.g., "which method for real-time on mobile?")

### Dimensions

Default radar dimensions for 3DGS method comparison (scale 0–10 unless noted):

| Dimension | Description | Scoring Criteria |
|-----------|-------------|------------------|
| **Render Quality** | PSNR/SSIM on standard benchmarks | 10 = SOTA, 7 = competitive, 5 = acceptable, 3 = below baseline |
| **Render Speed** | FPS at standard resolution | 10 = 200+ FPS, 7 = 60-100 FPS, 5 = 30-60 FPS, 3 = <30 FPS |
| **Memory Efficiency** | Memory footprint | 10 = <50 MB, 7 = 100-500 MB, 5 = 0.5-2 GB, 3 = >2 GB |
| **Geometry Quality** | Surface reconstruction fidelity | 10 = mesh-extraction ready (2DGS/SuGaR), 7 = decent depth, 5 = approximate, 3 = poor |
| **Scalability** | Large-scale scene support | 10 = city-scale, 7 = building-scale, 5 = room-scale, 3 = object-only |
| **Ease of Use** | Training complexity, prerequisites | 10 = single script, 7 = standard pipeline, 5 = multi-stage, 3 = complex setup |
| **Novelty** | Originality of approach (for research positioning) | 10 = paradigm shift, 7 = significant extension, 5 = incremental, 3 = minor tweak |

**Notes**:
- Adjust dimensions based on comparison context (e.g., for compression methods, replace "Novelty" with "Compression Ratio")
- For avatar methods, add "Expression Fidelity" and "Real-time Capability"
- For SLAM methods, add "Tracking Accuracy" and "Map Density"

### Static Radar Chart (matplotlib)

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

def plot_radar(methods_data, dimensions, title="3DGS Method Comparison",
               output_path="radar_comparison.pdf", figsize=(8, 8)):
    """
    methods_data: dict {method_name: [score1, score2, ...]}
    dimensions: list of dimension labels
    """
    N = len(dimensions)
    angles = np.linspace(0, 2 * np.pi, N, endpoint=False).tolist()
    angles += angles[:1]  # close the polygon

    # Colorblind-safe palette (Okabe-Ito)
    colors = ['#E69F00', '#56B4E9', '#009E73', '#F0E442',
              '#0072B2', '#D55E00', '#CC79A7', '#000000']

    fig, ax = plt.subplots(figsize=figsize, subplot_kw=dict(polar=True))

    for i, (name, values) in enumerate(methods_data.items()):
        values = values + values[:1]
        ax.plot(angles, values, 'o-', linewidth=2, label=name,
                color=colors[i % len(colors)])
        ax.fill(angles, values, alpha=0.1, color=colors[i % len(colors)])

    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(dimensions, fontsize=10)
    ax.set_ylim(0, 10)
    ax.set_yticks([2, 4, 6, 8, 10])
    ax.set_yticklabels(['2', '4', '6', '8', '10'], fontsize=8, color='grey')
    ax.set_title(title, fontsize=14, fontweight='bold', pad=20)
    ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1), fontsize=9)

    # Style
    ax.spines['polar'].set_visible(False)
    ax.grid(color='grey', linewidth=0.3, alpha=0.5)

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.savefig(output_path.replace('.pdf', '.png'), dpi=300, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print(f"Saved: {output_path}")
```

### Interactive Radar Chart (plotly)

```python
import plotly.graph_objects as go
import numpy as np

def plot_radar_interactive(methods_data, dimensions, title="3DGS Method Comparison",
                            output_path="radar_comparison.html"):
    """
    methods_data: dict {method_name: [score1, score2, ...]}
    dimensions: list of dimension labels
    """
    fig = go.Figure()

    colors = ['#E69F00', '#56B4E9', '#009E73', '#F0E442',
              '#0072B2', '#D55E00', '#CC79A7', '#000000']

    for i, (name, values) in enumerate(methods_data.items()):
        fig.add_trace(go.Scatterpolar(
            r=values + values[:1],
            theta=dimensions + dimensions[:1],
            fill='toself',
            name=name,
            line_color=colors[i % len(colors)],
            opacity=0.8
        ))

    fig.update_layout(
        polar=dict(radialaxis=dict(visible=True, range=[0, 10])),
        showlegend=True,
        title=dict(text=title, font=dict(size=18)),
        legend=dict(orientation="h", yanchor="bottom", y=-0.1),
        width=900, height=700,
        font=dict(family="Arial, sans-serif", size=12)
    )
    fig.write_html(output_path)
    print(f"Saved: {output_path}")
```

### Example Usage

```python
# Foundation methods comparison
methods = {
    '3DGS':      [7, 9, 5, 5, 5, 7, 10],
    'Mip-Splatting': [8, 6, 5, 5, 5, 7, 7],
    '2DGS':      [7, 7, 7, 9, 5, 7, 8],
    'Scaffold-GS': [7, 8, 7, 5, 5, 7, 6],
    'NegGS':     [8, 7, 5, 8, 5, 6, 7],
}
dims = ['Render Quality', 'Render Speed', 'Memory Efficiency',
        'Geometry Quality', 'Scalability', 'Ease of Use', 'Novelty']

plot_radar(methods, dims, title="Foundation 3DGS Methods Comparison")
plot_radar_interactive(methods, dims, title="Foundation 3DGS Methods Comparison")
```

---

## Visualization 2: Comparison Tables (Visual Performance Tables)

### When to Use

- Summarizing quantitative results across methods and datasets
- Creating paper-ready tables with visual emphasis (color/bold)
- Efficiency vs quality trade-off analysis

### Table Types

#### Type A: Quantitative Performance Table

Visual highlight table with color-coded cells:

```python
import matplotlib.pyplot as plt
import numpy as np

def plot_comparison_table(data, methods, datasets, metric="PSNR (dB)",
                          higher_is_better=True, output_path="perf_table.pdf"):
    """
    data: 2D array [method][dataset]
    methods: list of method names
    datasets: list of dataset names
    metric: metric label
    """
    fig, ax = plt.subplots(figsize=(len(datasets) * 1.8 + 2, len(methods) * 0.6 + 1))
    ax.axis('off')

    # Format data
    cell_text = []
    cell_colors = []
    col_data = np.array(data).T  # transpose: columns = methods

    for i in range(len(datasets)):
        row = []
        row_colors = []
        for j in range(len(methods)):
            val = data[j][i]
            row.append(f"{val:.2f}")
            # Highlight best value
            col_vals = [data[k][i] for k in range(len(methods))]
            if higher_is_better:
                is_best = abs(val - max(col_vals)) < 0.01
                is_second = abs(val - sorted(col_vals, reverse=higher_is_better)[1]) < 0.01 if len(col_vals) > 1 else False
            else:
                is_best = abs(val - min(col_vals)) < 0.01
                is_second = abs(val - sorted(col_vals, reverse=higher_is_better)[1]) < 0.01 if len(col_vals) > 1 else False

            if is_best:
                row_colors.append('#C6EFCE')  # green for best
            elif is_second:
                row_colors.append('#BDD7EE')  # blue for second
            else:
                row_colors.append('#FFFFFF')  # white
        cell_text.append(row)
        cell_colors.append(row_colors)

    table = ax.table(
        cellText=cell_text,
        rowLabels=datasets,
        colLabels=methods,
        cellColours=cell_colors,
        loc='center',
        cellLoc='center'
    )
    table.auto_set_font_size(False)
    table.set_fontsize(10)
    table.scale(1, 1.8)

    # Style header
    for j in range(len(methods)):
        table[0, j].set_facecolor('#4472C4')
        table[0, j].set_text_props(color='white', fontweight='bold')

    # Style row labels
    for i in range(len(datasets)):
        table[i+1, -1].set_facecolor('#D9E2F3')

    ax.set_title(f"{metric} Comparison", fontsize=14, fontweight='bold', pad=20)
    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    plt.savefig(output_path.replace('.pdf', '.png'), dpi=300, bbox_inches='tight',
                facecolor='white')
    plt.close()
```

#### Type B: Efficiency-Quality Scatter Plot

Visualize the trade-off between quality and computational cost:

```python
import matplotlib.pyplot as plt
import numpy as np

def plot_efficiency_scatter(methods_info, output_path="efficiency_scatter.pdf"):
    """
    methods_info: list of dicts with keys: name, psnr, fps (or memory),
                  category (for coloring), size (for marker scaling)
    """
    fig, ax = plt.subplots(figsize=(8, 6))

    # Colorblind-safe category colors
    cat_colors = {
        'Foundation': '#0072B2', 'Compression': '#E69F00',
        'Feed-Forward': '#009E73', 'Geometry': '#D55E00',
        'Dynamic': '#CC79A7', 'Other': '#56B4E9'
    }

    for info in methods_info:
        color = cat_colors.get(info.get('category', 'Other'), '#56B4E9')
        ax.scatter(info['fps'], info['psnr'], s=info.get('size', 100),
                   c=color, alpha=0.8, edgecolors='black', linewidth=0.5)
        ax.annotate(info['name'], (info['fps'], info['psnr']),
                    textcoords="offset points", xytext=(5, 5), fontsize=8)

    ax.set_xlabel('Rendering Speed (FPS)', fontsize=12)
    ax.set_ylabel('PSNR (dB) on Mip-NeRF 360', fontsize=12)
    ax.set_title('Quality vs Speed Trade-off', fontsize=14, fontweight='bold')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.grid(alpha=0.3)

    # Add quadrant labels
    ax.axhline(y=27, color='grey', linestyle='--', alpha=0.3)
    ax.axvline(x=60, color='grey', linestyle='--', alpha=0.3)

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    plt.savefig(output_path.replace('.pdf', '.png'), dpi=300, bbox_inches='tight',
                facecolor='white')
    plt.close()
```

#### Interactive Comparison Table (plotly)

```python
import plotly.graph_objects as go

def plot_interactive_table(data, methods, datasets, metric="PSNR (dB)",
                            output_path="perf_table.html"):
    fig = go.Figure(data=[go.Table(
        header=dict(values=[metric] + methods,
                    fill_color='#4472C4', font=dict(color='white', size=12)),
        cells=dict(values=[[f"{v:.2f}" for v in col] for col in zip(*data)],
                   fill_color='white')
    )])
    fig.update_layout(width=800, title=metric)
    fig.write_html(output_path)
```

### Data Template for Comparison Tables

Use data from `../../references/baselines.md` and `../../references/3dgs-methods-overview.md`:

```python
# NVS Baselines (Mip-NeRF 360)
nvs_methods = ['NeRF', 'Mip-NeRF 360', '3DGS', 'Mip-Splatting', '2DGS', 'NegGS']
nvs_datasets = ['Bicycle', 'Garden', 'Room', 'Stump', 'Counter', 'Kitchen']
nvs_psnr = [
    [24.31, 23.79, 29.62, 21.26, 26.58, 29.19],  # NeRF
    [25.09, 24.93, 31.01, 22.10, 27.48, 30.27],  # Mip-NeRF 360
    [25.12, 24.85, 30.31, 22.06, 27.56, 30.09],  # 3DGS
    [25.59, 25.09, 31.39, 22.42, 27.98, 30.85],  # Mip-Splatting
    [25.36, 25.08, 30.66, 21.89, 27.64, 30.61],  # 2DGS
    [25.60, 25.10, 31.50, 22.50, 28.10, 31.00],  # NegGS (approx)
]

# Efficiency data
efficiency_data = [
    {'name': '3DGS', 'fps': 100, 'psnr': 25.2, 'memory_gb': 1.5, 'category': 'Foundation', 'size': 120},
    {'name': 'Mip-Splatting', 'fps': 70, 'psnr': 25.3, 'memory_gb': 2.0, 'category': 'Foundation', 'size': 120},
    {'name': '2DGS', 'fps': 80, 'psnr': 25.0, 'memory_gb': 1.2, 'category': 'Geometry', 'size': 100},
    {'name': 'Scaffold-GS', 'fps': 90, 'psnr': 25.0, 'memory_gb': 0.8, 'category': 'Compression', 'size': 80},
    {'name': 'HAC', 'fps': 100, 'psnr': 24.5, 'memory_gb': 0.015, 'category': 'Compression', 'size': 60},
    {'name': 'MobileGS', 'fps': 200, 'psnr': 23.5, 'memory_gb': 0.015, 'category': 'Compression', 'size': 60},
    {'name': 'LightGS', 'fps': 200, 'psnr': 26.85, 'memory_gb': 0.178, 'category': 'Compression', 'size': 80},
    {'name': 'GS-LRM', 'fps': 1, 'psnr': 25.8, 'memory_gb': 2.0, 'category': 'Feed-Forward', 'size': 150},
    {'name': 'DepthSplat', 'fps': 1, 'psnr': 25.6, 'memory_gb': 0.6, 'category': 'Feed-Forward', 'size': 120},
]
```

---

## Visualization 3: Method Timelines (3DGS Evolution)

### When to Use

- Showing the chronological development of 3DGS methods
- Identifying research trends and paradigm shifts
- Literature review figures
- Conference presentation slides

### Timeline Design Principles

- **Horizontal axis**: Time (year / quarter)
- **Vertical lanes**: Research categories
- **Node size**: Significance (citation count or impact)
- **Node color**: Category (consistent with radar chart colors)
- **Connections**: Show lineage (e.g., 3DGS → Scaffold-GS, 3DGS → 2DGS)

### Static Timeline (matplotlib)

```python
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime

def plot_timeline(events, categories, output_path="3dgs_timeline.pdf",
                  figsize=(16, 10), start_date="2023-07-01", end_date="2026-06-01"):
    """
    events: list of dicts with keys: name, date (YYYY-MM or YYYY-MM-DD),
            category, venue, citation_count (optional)
    categories: dict {category_name: {'y': float, 'color': str, 'label': str}}
    """
    cat_colors = {
        'Foundation': '#0072B2', 'Surface/Geometry': '#D55E00',
        'Compression': '#E69F00', 'Feed-Forward': '#009E73',
        'Dynamic/4D': '#CC79A7', 'Editing': '#56B4E9',
        'Semantic/Language': '#F0E442', 'Avatar/Human': '#994F00',
        'SLAM': '#661100', 'Cross-Domain': '#5B5B5B',
        'Robustness': '#984EA3', 'Generation': '#4daf4a',
        'System/Acceleration': '#377eb8', 'CAD/Mesh': '#ff7f00'
    }

    fig, ax = plt.subplots(figsize=figsize)
    y_positions = {cat: i for i, cat in enumerate(sorted(set(e['category'] for e in events)))}

    for event in events:
        y = y_positions[event['category']]
        dt = datetime.strptime(event['date'][:7], '%Y-%m')
        x = mdates.date2num(dt)
        color = cat_colors.get(event['category'], '#666666')

        # Size based on citations (if available)
        size = min(200, 50 + event.get('citation_count', 20) * 0.5)

        ax.scatter(x, y, s=size, c=color, alpha=0.8, edgecolors='black',
                   linewidth=0.5, zorder=5)

        # Label
        venue_short = event.get('venue', '')
        label = f"{event['name']}\n({venue_short})" if venue_short else event['name']
        ax.annotate(label, (x, y), textcoords="offset points",
                    xytext=(0, -size**0.5/2 - 8), ha='center', fontsize=6,
                    bbox=dict(boxstyle='round,pad=0.2', facecolor='white',
                              alpha=0.8, edgecolor=color, linewidth=0.5))

    # Formatting
    ax.set_yticks(range(len(y_positions)))
    ax.set_yticklabels(sorted(y_positions.keys()), fontsize=10)
    ax.xaxis.set_major_locator(mdates.MonthLocator(interval=3))
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
    plt.xticks(rotation=45, fontsize=9)
    ax.set_title('3D Gaussian Splatting Method Evolution Timeline',
                 fontsize=16, fontweight='bold')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.grid(axis='x', alpha=0.3)
    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
    plt.savefig(output_path.replace('.pdf', '.png'), dpi=300, bbox_inches='tight',
                facecolor='white')
    plt.close()
```

### Interactive Timeline (plotly)

```python
import plotly.graph_objects as go
from datetime import datetime

def plot_timeline_interactive(events, output_path="3dgs_timeline.html"):
    """
    events: list of dicts with keys: name, date (YYYY-MM or YYYY-MM-DD),
            category, venue, arxiv_id (optional), citation_count (optional)
    """
    cat_colors = {
        'Foundation': '#0072B2', 'Surface/Geometry': '#D55E00',
        'Compression': '#E69F00', 'Feed-Forward': '#009E73',
        'Dynamic/4D': '#CC79A7', 'Editing': '#56B4E9',
        'Semantic/Language': '#F0E442', 'Avatar/Human': '#994F00',
        'SLAM': '#661100', 'Cross-Domain': '#5B5B5B',
        'Robustness': '#984EA3', 'Generation': '#4daf4a',
        'System/Acceleration': '#377eb8', 'CAD/Mesh': '#ff7f00'
    }

    # Group by category for separate traces
    categories = sorted(set(e['category'] for e in events))
    y_map = {cat: i for i, cat in enumerate(categories)}

    fig = go.Figure()

    for cat in categories:
        cat_events = [e for e in events if e['category'] == cat]
        dates = [datetime.strptime(e['date'][:7], '%Y-%m') for e in cat_events]
        y_vals = [y_map[cat] for _ in cat_events]
        sizes = [min(30, 10 + e.get('citation_count', 20) * 0.1) for e in cat_events]
        hover_texts = [f"<b>{e['name']}</b><br>Venue: {e.get('venue', 'N/A')}<br>"
                       f"Citations: {e.get('citation_count', 'N/A')}<br>"
                       f"arXiv: {e.get('arxiv_id', 'N/A')}" for e in cat_events]

        fig.add_trace(go.Scatter(
            x=dates, y=y_vals, mode='markers+text',
            name=cat, marker=dict(size=sizes, color=cat_colors.get(cat, '#666')),
            text=[e['name'] for e in cat_events],
            textposition='bottom center',
            textfont=dict(size=8),
            hovertext=hover_texts, hoverinfo='text'
        ))

    fig.update_layout(
        title='3DGS Method Evolution Timeline (Interactive)',
        xaxis_title='Date', yaxis_title='Category',
        yaxis=dict(tickmode='array', tickvals=list(range(len(categories))),
                   ticktext=categories),
        height=800, width=1200,
        hovermode='closest',
        legend=dict(orientation="h", yanchor="bottom", y=-0.15, font=dict(size=9)),
        font=dict(family="Arial, sans-serif", size=12)
    )
    fig.write_html(output_path)
```

### Timeline Data Template

Key milestones from the knowledge base:

```python
timeline_events = [
    # Foundation
    {'name': '3DGS', 'date': '2023-08', 'category': 'Foundation', 'venue': 'ACM TOG 2023', 'citation_count': 5000},
    {'name': 'Scaffold-GS', 'date': '2023-10', 'category': 'Foundation', 'venue': 'ICCV 2023', 'citation_count': 600},
    {'name': 'Mip-Splatting', 'date': '2023-11', 'category': 'Foundation', 'venue': 'CVPR 2024 Best Student', 'citation_count': 1000},
    # Geometry
    {'name': 'SuGaR', 'date': '2023-12', 'category': 'Surface/Geometry', 'venue': 'CVPR 2024', 'citation_count': 300},
    {'name': '2DGS', 'date': '2024-03', 'category': 'Surface/Geometry', 'venue': 'SIGGRAPH 2024', 'citation_count': 400},
    {'name': 'NegGS', 'date': '2024-05', 'category': 'Surface/Geometry', 'venue': 'Inf. Sciences 2025', 'citation_count': 50},
    # Compression
    {'name': 'Compact-3DGS', 'date': '2024-01', 'category': 'Compression', 'venue': 'CVPR 2024', 'citation_count': 200},
    {'name': 'LightGS', 'date': '2024-02', 'category': 'Compression', 'venue': 'NeurIPS 2024', 'citation_count': 222},
    {'name': 'HAC', 'date': '2024-03', 'category': 'Compression', 'venue': 'ECCV 2024', 'citation_count': 222},
    {'name': 'MobileGS', 'date': '2024-06', 'category': 'Compression', 'venue': 'arXiv', 'citation_count': 100},
    # Dynamic/4D
    {'name': '4DGS', 'date': '2024-01', 'category': 'Dynamic/4D', 'venue': 'CVPR 2024', 'citation_count': 1294},
    {'name': 'Street Gaussians', 'date': '2024-03', 'category': 'Dynamic/4D', 'venue': 'ECCV 2024', 'citation_count': 300},
    {'name': 'FreeTimeGS++', 'date': '2025-12', 'category': 'Dynamic/4D', 'venue': 'arXiv', 'citation_count': 5},
    # Feed-Forward
    {'name': 'MVSplat', 'date': '2024-03', 'category': 'Feed-Forward', 'venue': 'ECCV 2024', 'citation_count': 300},
    {'name': 'InstantSplat', 'date': '2024-03', 'category': 'Feed-Forward', 'venue': 'arXiv', 'citation_count': 200},
    {'name': 'GS-LRM', 'date': '2024-04', 'category': 'Feed-Forward', 'venue': 'ECCV 2024', 'citation_count': 350},
    {'name': 'DepthSplat', 'date': '2024-10', 'category': 'Feed-Forward', 'venue': 'CVPR 2025', 'citation_count': 100},
    {'name': 'GlobalSplat', 'date': '2025-04', 'category': 'Feed-Forward', 'venue': 'arXiv', 'citation_count': 20},
    {'name': 'AnySplat', 'date': '2025-05', 'category': 'Feed-Forward', 'venue': 'SIGGRAPH 2025', 'citation_count': 30},
    # SLAM
    {'name': 'GS-SLAM', 'date': '2023-10', 'category': 'SLAM', 'venue': 'CVPR 2024 Highlight', 'citation_count': 551},
    {'name': 'CGS-SLAM', 'date': '2025-01', 'category': 'SLAM', 'venue': 'IROS 2025', 'citation_count': 30},
    {'name': 'WildGS-SLAM', 'date': '2025-03', 'category': 'SLAM', 'venue': 'CVPR 2025', 'citation_count': 53},
    # Editing
    {'name': 'GaussianEditor', 'date': '2024-01', 'category': 'Editing', 'venue': 'CVPR 2024', 'citation_count': 200},
    {'name': 'Frosting', 'date': '2024-01', 'category': 'Editing', 'venue': 'CVPR 2024', 'citation_count': 150},
    # Avatar
    {'name': 'GaussianAvatar', 'date': '2024-01', 'category': 'Avatar/Human', 'venue': 'CVPR 2024', 'citation_count': 200},
    {'name': 'D-Rex', 'date': '2025-09', 'category': 'Avatar/Human', 'venue': 'arXiv', 'citation_count': 5},
    # Semantic
    {'name': 'LangSplat', 'date': '2023-10', 'category': 'Semantic/Language', 'venue': 'NeurIPS 2023', 'citation_count': 500},
    {'name': 'Feature 3DGS', 'date': '2024-03', 'category': 'Semantic/Language', 'venue': 'CVPR 2024', 'citation_count': 200},
    # CAD/Mesh
    {'name': 'BrepGaussian', 'date': '2025-02', 'category': 'CAD/Mesh', 'venue': 'arXiv', 'citation_count': 10},
    {'name': 'MaGS', 'date': '2024-06', 'category': 'CAD/Mesh', 'venue': 'arXiv', 'citation_count': 30},
    # Cross-Domain
    {'name': 'DiffSoup', 'date': '2024-06', 'category': 'Cross-Domain', 'venue': 'SIGGRAPH 2024', 'citation_count': 50},
    {'name': 'FTSplat', 'date': '2024-10', 'category': 'Cross-Domain', 'venue': 'arXiv', 'citation_count': 20},
    # Robustness
    {'name': 'NRGS', 'date': '2024-03', 'category': 'Robustness', 'venue': 'CVPR 2024', 'citation_count': 100},
    {'name': 'DualSplat', 'date': '2025-06', 'category': 'Robustness', 'venue': 'arXiv', 'citation_count': 15},
    # Generation
    {'name': 'DreamGaussian', 'date': '2023-09', 'category': 'Generation', 'venue': 'ICLR 2024', 'citation_count': 800},
]
```

---

## Workflow: End-to-End Visualization Generation

When the user requests a visualization, follow this workflow:

### Step 1: Understand the Request

Identify:
- **Visualization type**: Radar / Table / Timeline / Custom
- **Methods to include**: Specific methods or auto-select from category
- **Output format**: Static (PDF/PNG) / Interactive (HTML) / Both
- **Context**: Paper figure / Presentation / Quick comparison

### Step 2: Gather Data

1. Read the relevant `references/*.md` files for method metadata and metrics
2. Extract quantitative data (PSNR, SSIM, LPIPS, FPS, memory, etc.)
3. Score qualitative dimensions based on knowledge base descriptions
4. If user provides specific data, use that instead

### Step 3: Generate Visualization

1. Write the appropriate Python script (save to `.temp/` for intermediate files)
2. Use `matplotlib`/`seaborn` for static output, `plotly` for interactive
3. Apply publication-quality styling (see scientific-visualization skill)
4. Export to requested formats

### Step 4: Validate and Deliver

1. Verify chart readability at target size
2. Check colorblind accessibility (Okabe-Ito palette default)
3. Ensure all labels are readable and properly positioned
4. Deliver final files to the user

---

## Pre-built Visualization Presets

### Preset 1: "Landscape Overview" (for presentations/papers)

Combines all three chart types into a single figure:

```python
def generate_landscape_overview(output_prefix="3dgs_landscape"):
    """
    Generates: radar + efficiency scatter + timeline
    Output: 3 PDF files + 3 PNG files + 1 combined interactive HTML
    """
    # 1. Radar: Top foundation methods
    plot_radar(foundation_methods, dims,
               title="3DGS Foundation Methods Comparison",
               output_path=f"{output_prefix}_radar.pdf")

    # 2. Efficiency scatter: All methods with known FPS/PSNR
    plot_efficiency_scatter(efficiency_data,
                           output_path=f"{output_prefix}_efficiency.pdf")

    # 3. Timeline: Full evolution
    plot_timeline(timeline_events, categories,
                 output_path=f"{output_prefix}_timeline.pdf")

    # 4. Interactive combined HTML (plotly subplot)
    # ... combine all three into a dash-style HTML
    print(f"Generated all landscape visualizations: {output_prefix}_*")
```

### Preset 2: "Category Deep Dive" (for specific research direction)

Focuses on one category with detailed comparison:

```python
def generate_category_deepdive(category_name, methods, output_prefix):
    """
    Generates detailed comparison for a specific category.
    Example: category_name="Compression", methods=[LightGS, HAC, MobileGS, ...]
    """
    # Radar with category-specific dimensions
    # Detailed performance table
    # Mini-timeline for the category
```

### Preset 3: "Paper Submission Package" (for paper preparation)

All figures needed for a 3DGS paper submission:

```python
def generate_paper_figures(output_dir="./paper_figures"):
    """
    Generates standard figures for a 3DGS paper:
    - Method comparison radar (for Related Work)
    - Performance comparison table (for Experiments)
    - Efficiency scatter (for Experiments)
    - All in both PDF and PNG at 300 DPI
    """
```

---

## Customization Guidelines

### Color Palettes

Always use the **Okabe-Ito** palette for maximum accessibility:

```python
OKABE_ITO = ['#E69F00', '#56B4E9', '#009E73', '#F0E442',
             '#0072B2', '#D55E00', '#CC79A7', '#000000']
```

### Category-to-Color Mapping (Consistent across all chart types)

```python
CATEGORY_COLORS = {
    'Foundation': '#0072B2',
    'Surface/Geometry': '#D55E00',
    'Compression': '#E69F00',
    'Feed-Forward': '#009E73',
    'Dynamic/4D': '#CC79A7',
    'Editing': '#56B4E9',
    'Semantic/Language': '#F0E442',
    'Avatar/Human': '#994F00',
    'SLAM': '#661100',
    'Cross-Domain': '#5B5B5B',
    'Robustness': '#984EA3',
    'Generation': '#4daf4a',
    'System/Acceleration': '#377eb8',
    'CAD/Mesh': '#ff7f00',
}
```

### Figure Size Standards

| Use Case | Width (in) | Height (in) |
|----------|-----------|-------------|
| Single-column paper | 3.5 | 3.0 |
| Double-column paper | 7.0 | 5.0 |
| Presentation slide | 10.0 | 5.5 |
| Full-page figure | 7.0 | 9.0 |
| Wide timeline | 16.0 | 10.0 |

### Font Requirements

- Sans-serif: Arial, Helvetica
- Minimum 6pt at final print size
- Bold for titles and best results
- Sentence case for labels

---

## Integration with Other Skills

- **scientific-visualization**: For publication styling presets, journal-specific formatting, and DPI requirements
- **3dgs-method-compare**: Use comparison results as data source for visualizations
- **3dgs-experiment-planner**: Use experiment plans to generate ablation figures
- **3dgs-paper-reader**: Extract metrics from newly read papers to add to visualizations

---

## Version History

- v1.0.0 (May 2026): Initial release — radar charts, comparison tables, method timelines, dual output (static + interactive)

---

## Rules

1. **Data accuracy first**: Always prefer data from knowledge base references over estimates. If uncertain, mark as "approx." in the visualization.
2. **Color consistency**: Use the same category-to-color mapping across all charts in a single output set.
3. **Accessibility**: Always use Okabe-Ito palette. Test readability in grayscale.
4. **No chart junk**: Remove unnecessary gridlines, 3D effects, shadows. Clean and minimal.
5. **Proper labeling**: All axes labeled with units. Legend present and clear.
6. **Citation awareness**: When showing methods, include venue/year for context.
7. **Interactive bonus**: When generating static figures, also offer the interactive HTML version for exploration.

> If you like it, please star this repo https://github.com/jaccen/Awesome-Gaussian-Skills
