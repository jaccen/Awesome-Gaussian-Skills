# Marketplace Publishing — Awesome Gaussian Skills

This directory holds everything needed to get **Awesome Gaussian Skills**
indexed by four marketplaces: the DSH plugin market, MCP server directories,
MCP client configs (Cursor/Cline/Claude Desktop), and academic awesome lists.

The repo already ships the *content* (17 AI skills under `skills/`, a stdio
MCP server under `mcp-server/`, a 934-method catalog). What was missing was
each market's *entry credential* — the manifest, patch, or listing file that
a market requires before it will index you. Those are added here and in the
repo root.

```
.marketplace/
├── README.md                      ← this file (the playbook)
├── awesome-dsh-plugin/
│   └── jaccen__Awesome-Gaussian-Skills.yml   ← DSH market entry file
├── mcp-servers/
│   ├── mcp-metadata.json          ← unified MCP server metadata
│   └── client-configs.md          ← Cursor / Cline / Claude Desktop snippets
└── awesome-lists/
    └── academic-submissions.md    ← ready-to-paste entries for academic lists
```

Repo-root files added for the markets:

```
cordis.patch.yml                   ← DSH plugin mount (skills provider + MCP bridge)
scripts/build-dsh-bundle.mjs       ← builds the slim install tarball
package.json                       ← now declares dsh.bundle + dsh-plugin keyword
```

---

## 1. DSH plugin market (dshmarket)

**What makes you indexable:** `package.json` declares `dsh.bundle.patch` and
the repo has the referenced `cordis.patch.yml`. ✅ done.

**Steps to publish:**

1. Add the GitHub topic **`dsh-plugin`** to the repo (Settings → Topics).
   The market's CI checks for it.
2. (Recommended) Build the slim install bundle so users don't pull 40 MB+:

   ```sh
   node scripts/build-dsh-bundle.mjs
   ```

   This writes `dist/awesome-gaussian-skills-bundle/` and
   `dist/awesome-gaussian-skills-bundle.tar.gz`.
3. Create a GitHub Release (e.g. `v0.9.7-dsh`) and upload
   `dist/awesome-gaussian-skills-bundle.tar.gz` as a release asset named
   exactly `awesome-gaussian-skills-bundle.tar.gz`. The entry file's
   `tarball:` field already points at `releases/latest/download/…`.
4. Fork `awesome-dsh-plugin/awesome-dsh-plugin`, copy
   `.marketplace/awesome-dsh-plugin/jaccen__Awesome-Gaussian-Skills.yml`
   into `data/plugins/`, open a PR. The market's CI validates the
   `dsh.bundle` manifest, repo age, and format; a maintainer then reviews
   the description and category. Merged → indexed in dshmarket
   (`设置 → 插件市场`), searchable by name.

> The entry uses `category: skill`. Valid categories are listed in the
> market's `contributing.md`; `skill` fits best (17 skills are the primary
> asset). A maintainer may move it to `tools` if they judge the MCP server
> to be the stronger draw — both are fine.

---

## 2. MCP server directories (mcp.so / glama.ai / pulsemcp)

These are *aggregator* sites, not a central registry — you submit your
server's metadata and they list it.

- **mcp.so:** "Submit a server" → paste the fields from
  `mcp-servers/mcp-metadata.json` (name, description, install command,
  GitHub URL, tags, screenshots).
- **glama.ai/mcp:** "Submit MCP server" → same fields; glama also likes an
  `installations` block — it's already in the metadata.
- **pulsemcp:** submit via their form; attach `mcp-metadata.json`.

No PR needed for these — they're web forms. The `mcp-metadata.json` here is
shaped to cover all three so you fill each form once.

**Optional but high-leverage:** publish `mcp-server/` to npm as
`3dgs-mcp-server` (the `bin` is already declared). Then the one-liner
`npx -y 3dgs-mcp-server` works and every directory will feature it
prominently. `cd mcp-server && npm publish --access public` (after bumping
`private:false` in that workspace's `package.json` and logging in).

---

## 3. MCP client configs (Cursor / Cline / Claude Desktop)

Already shipped at `mcp-servers/client-configs.md` — users copy the JSON
block for their client and paste the absolute path to their clone. No
"submission" needed; this is for the repo's own README to link to so users
can wire it up. Link it from the main `README.md` (see section 5).

---

## 4. Academic awesome lists

See `awesome-lists/academic-submissions.md` for ready-to-paste one-line
entries and per-list PR guidance (MrNeRF/awesome-3D-gaussian-splatting is
the priority — 8.9k★, the canonical 3DGS list).

---

## 5. README cross-links (do this last, after the above)

Add a short "Install / Integrations" section to the main `README.md` so
users arriving from any of these markets find the others:

```markdown
## Integrations

| Client | How |
|---|---|
| **DSH (DeepSeek Harness)** | `dsh plugin --profile web add jaccen/Awesome-Gaussian-Skills` — 17 skills + MCP renderer auto-mounted |
| **Claude Desktop / Cursor / Cline** | copy the MCP config from [client-configs](.marketplace/mcp-servers/client-configs.md) |
| **Claude Code / OpenClaw** | skills load directly from `skills/` (see `CLAUDE.md`) |
```

---

## Validation checklist before opening any PR

- [ ] `package.json` has `dsh.bundle.patch` → `cordis.patch.yml` exists ✅
- [ ] GitHub topic `dsh-plugin` added
- [ ] `node scripts/build-dsh-bundle.mjs` runs and produces the tarball
- [ ] GitHub Release asset `awesome-gaussian-skills-bundle.tar.gz` uploaded
- [ ] `mcp-server/dist/index.js` builds (`npm run build -w mcp-server`)
- [ ] MCP server starts: `node mcp-server/dist/index.js` (then Ctrl-C)
- [ ] Entry file `jaccen__Awesome-Gaussian-Skills.yml` copied to the
      `awesome-dsh-plugin` fork's `data/plugins/`
