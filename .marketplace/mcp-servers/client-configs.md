# MCP Client Configs

Ready-to-paste MCP server configs for the bundled **3DGS MCP Renderer**
(`mcp-server/`), so users of Claude Desktop, Cursor, Cline, and other MCP
clients can connect in seconds.

The server speaks **stdio**. It ships as TypeScript sources and a compiled
`dist/`. Use whichever fits you:

- **Compiled (recommended, no tsx needed):** build once with
  `npm run build -w mcp-server`, then point `args` at `dist/index.js`.
- **Source via tsx:** no build step; requires `tsx` (`npm i -g tsx` or run
  from a clone where `tsx` is a workspace devDep).

Replace `/ABS/PATH/TO` with the absolute path to your clone of
`Awesome-Gaussian-Skills`.

---

## Claude Desktop — `claude_desktop_config.json`

Location:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "3dgs-renderer": {
      "command": "node",
      "args": ["/ABS/PATH/TO/Awesome-Gaussian-Skills/mcp-server/dist/index.js"]
    }
  }
}
```

## Cursor — `.cursor/mcp.json` (project) or global Settings → MCP

```json
{
  "mcpServers": {
    "3dgs-renderer": {
      "command": "node",
      "args": ["/ABS/PATH/TO/Awesome-Gaussian-Skills/mcp-server/dist/index.js"]
    }
  }
}
```

## Cline — `cline_mcp_settings.json`

Location: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
(macOS / VS Code Cline extension).

```json
{
  "mcpServers": {
    "3dgs-renderer": {
      "command": "node",
      "args": ["/ABS/PATH/TO/Awesome-Gaussian-Skills/mcp-server/dist/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Generic stdio (any MCP client)

```
command: node
args:    /ABS/PATH/TO/Awesome-Gaussian-Skills/mcp-server/dist/index.js
transport: stdio
```

---

## Without a build (run from source via tsx)

If you don't want to build, swap the `args` line for:

```json
"args": ["--import", "tsx", "/ABS/PATH/TO/Awesome-Gaussian-Skills/mcp-server/src/index.ts"]
```

## Verify

After configuring, restart your client and look for tools named
`mcp__3dgs-renderer__import_scene`, `…__render_frame`, `…__sculpt_pipeline`,
etc. (21 core tools; 13 more experimental tools appear when the server is
started with `INCLUDE_EXPERIMENTAL=1`).
