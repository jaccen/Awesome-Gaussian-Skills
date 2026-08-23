# Output Format Templates

> Response templates referenced by `SKILL.md` §"Output Format". Use these templates when
> responding to user queries about conversions, method comparisons, and debugging.

---

## For Conversion Advice

```
## [Mesh/3DGS/CAD] Conversion Recommendation

### Input: [description]
### Output Goal: [description]

### Recommended Pipeline
1. [Step 1]: [Tool/Method] — [Why]
2. [Step 2]: ...

### Expected Quality
- Geometric accuracy: [High/Medium/Low]
- Rendering fidelity: [High/Medium/Low]
- Processing time: [estimate]

### Key Parameters
- [Param]: [Recommended value] — [Reason]

### Potential Issues & Mitigations
1. [Issue] → [Fix]
```

---

## For Method Comparison

```
## [Method A] vs [Method B] for [Task]

| Dimension | Method A | Method B |
|-----------|----------|----------|
| Geometry quality | ... | ... |
| Rendering speed | ... | ... |
| Implementation difficulty | ... | ... |
| Best use case | ... | ... |

### Recommendation: [Winner] because ...
```

---

## For Debugging

```
## Diagnosis: [Symptom]

### Root Cause
[Explanation]

### Fix
1. Immediate: [Quick fix]
2. Proper: [Right fix]

### Code Change
[Minimal code snippet if applicable]
```