
# Contributing to Awesome Gaussian Skills

Thank you for your interest in contributing! This guide explains how to contribute to this project.

## Ways to Contribute

1. **Add a new skill**: Create a new SKILL.md for an uncovered use case
2. **Improve existing skills**: Fix errors, add knowledge, improve prompts
3. **Expand the knowledge base**: Add new methods to `references/3dgs-methods-overview.md`
4. **Report issues**: Found a bug or inaccuracy? Open an issue
5. **Share use cases**: How do you use these skills? We'd love to know

## Adding a New Skill

### Skill Structure

Each skill follows the SKILL.md standard:

```
skills/
└── your-skill-name/
    └── SKILL.md
```

### SKILL.md Format

```yaml
---
name: your-skill-name
description: One-line description of what this skill does
version: 1.0.0
author: your-github-username
tags:
  - 3dgs
  - relevant-tag
trigger:
  - "trigger phrase 1"
  - "trigger phrase 2"
---

# Skill Title

Description of what this skill does and when it should be activated.

## Capabilities
- Capability 1
- Capability 2

## Workflow
### Step 1: ...
### Step 2: ...

## Output Format
...

## Rules
1. Rule 1
2. Rule 2
```

### Guidelines

1. **YAML frontmatter is required**: Name, description, version, author, tags, trigger phrases
2. **Be specific about when to trigger**: Include both English and Chinese trigger phrases
3. **Include domain knowledge**: Skills should contain expert knowledge, not just generic instructions
4. **Provide output format**: Always specify the expected output structure
5. **Set clear rules**: Define what the skill should and should not do
6. **Keep it focused**: One skill = one capability. Don't create multi-purpose skills
7. **Be factual**: All technical claims (metrics, formulas, methods) must be accurate

### Quality Checklist

Before submitting, verify:
- [ ] YAML frontmatter is valid
- [ ] At least 3 trigger phrases (include both English and Chinese)
- [ ] Domain knowledge is accurate and up-to-date
- [ ] Output format is clearly defined
- [ ] Rules prevent common mistakes
- [ ] No fabricated data or metrics
- [ ] Consistent terminology with other skills

## Expanding the Knowledge Base

When adding a new method to `references/3dgs-methods-overview.md`:

1. Include: Paper title, authors, venue, arXiv ID
2. Describe: Core idea, primitive type, key innovation
3. Add: Performance numbers if available (cite source)
4. Categorize: Place in the correct section
5. Cross-reference: Link to related methods

## Pull Request Process

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/your-skill-name`
3. Make your changes
4. Test your skill with an AI Agent
5. Commit with a clear message
6. Open a Pull Request

## Code of Conduct

- Be respectful and constructive
- Focus on technical accuracy
- Credit original sources
- Welcome newcomers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.