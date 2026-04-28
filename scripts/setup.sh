#!/bin/bash
# Awesome Gaussian Skills - Quick Setup Script
# Compatible with OpenClaw, Claude Code, and Cursor

set -e

echo "========================================"
echo "  Awesome Gaussian Skills - Setup"
echo "========================================"
echo ""

# Detect Agent type
AGENT_TYPE=""
INSTALL_DIR=""

detect_agent() {
    if [ -d "$HOME/.openclaw" ]; then
        AGENT_TYPE="OpenClaw"
        INSTALL_DIR="$HOME/.openclaw/skills"
    elif [ -d "$HOME/.claude" ]; then
        AGENT_TYPE="Claude Code"
        INSTALL_DIR="$HOME/.claude/skills"
    elif [ -d ".cursor/rules" ]; then
        AGENT_TYPE="Cursor"
        INSTALL_DIR=".cursor/rules"
    else
        echo "No supported AI Agent detected."
        echo ""
        echo "Supported agents:"
        echo "  - OpenClaw (https://github.com/openclaw)"
        echo "  - Claude Code (https://claude.ai)"
        echo "  - Cursor (https://cursor.sh)"
        echo ""
        echo "You can also manually copy skills/ to your agent's skill directory."
        exit 1
    fi
}

# Detect or ask for agent
if [ "$1" != "" ]; then
    case "$1" in
        openclaw)
            AGENT_TYPE="OpenClaw"
            INSTALL_DIR="$HOME/.openclaw/skills"
            ;;
        claude)
            AGENT_TYPE="Claude Code"
            INSTALL_DIR="$HOME/.claude/skills"
            ;;
        cursor)
            AGENT_TYPE="Cursor"
            INSTALL_DIR=".cursor/rules"
            ;;
        *)
            echo "Unknown agent type: $1"
            echo "Usage: $0 [openclaw|claude|cursor]"
            exit 1
            ;;
    esac
else
    detect_agent
fi

echo "Detected agent: $AGENT_TYPE"
echo "Install directory: $INSTALL_DIR"
echo ""

# Create install directory if needed
mkdir -p "$INSTALL_DIR"

# Copy all skills
echo "Installing skills..."
SKILLS_DIR="$(cd "$(dirname "$0")/.." && pwd)/skills"
if [ ! -d "$SKILLS_DIR" ]; then
    echo "Error: skills/ directory not found"
    echo "Please run this script from the Awesome-Gaussian-Skills directory"
    exit 1
fi

cp -r "$SKILLS_DIR"/* "$INSTALL_DIR/"
echo "Skills installed successfully!"
echo ""

# List installed skills
echo "Installed skills:"
for skill_dir in "$SKILLS_DIR"/*/; do
    skill_name=$(basename "$skill_dir")
    if [ -f "$skill_dir/SKILL.md" ]; then
        # Extract description from YAML frontmatter
        desc=$(grep "^description:" "$skill_dir/SKILL.md" | head -1 | sed 's/description: *//' | tr -d '"')
        echo "  [OK] $skill_name — $desc"
    fi
done

echo ""
echo "========================================"
echo "  Setup complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Restart your $AGENT_TYPE agent"
echo "  2. Try: '帮我读一下 3DGS 的论文 2308.04079'"
echo "  3. Try: '对比 SignGS 和 NegGS 的核心差异'"
echo ""
echo "Report issues: https://github.com/jaccen/Awesome-Gaussian-Skills/issues"
