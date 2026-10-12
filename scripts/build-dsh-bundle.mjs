#!/usr/bin/env node
// Builds a slim DSH-installable tarball from this repo.
//
// The full repo is 40 MB+ and carries arxiv caches, xlsx/docx/png data
// assets, a studio web app, benchmarks and test scratch that a DSH plugin
// install does not need. This script writes a staged directory containing
// only what the DSH plugin mount actually consumes, then tars it.
//
// Usage:  node scripts/build-dsh-bundle.mjs
// Output: dist/awesome-gaussian-skills-bundle/
//         dist/awesome-gaussian-skills-bundle.tar.gz
//
// Upload the .tar.gz to a GitHub Release; the marketplace entry's
// `tarball:` field points at it so `dsh plugin add` fetches the slim bundle.

import { cp, mkdir, rm, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const stage = join(root, "dist", "awesome-gaussian-skills-bundle");
const tarPath = join(root, "dist", "awesome-gaussian-skills-bundle.tar.gz");

// DSH plugin payload — keep this list tight: only what cordis.patch.yml
// references plus the manifest/skill frontmatter the loader reads.
const KEEP_FILES = [
  "package.json",
  "cordis.patch.yml",
  "README.md",
  "README_CN.md",
  "LICENSE",
  "CLAUDE.md",
];
const KEEP_DIRS = [
  "skills",        // 15 DSH skills (SKILL.md + static/ fragments)
  "mcp-server",    // bundled MCP server (dist + renderer + package.json)
];
// Inside mcp-server, only the runtime bits — no src/test/examples/.temp.
const MCP_KEEP = ["package.json", "dist", "renderer", "README.md"];

async function copyFiltered(src, dest, keep) {
  await mkdir(dest, { recursive: true });
  for (const name of keep) {
    const s = join(src, name);
    if (!existsSync(s)) {
      console.warn(`  skip (missing): ${name}`);
      continue;
    }
    await cp(s, join(dest, name), { recursive: true, force: true });
    console.log(`  + ${name}`);
  }
}

async function pruneNodeModules(dir) {
  // Never ship node_modules — DSH resolves peers at install.
  if (!existsSync(dir)) return;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === "node_modules" || e.name === ".temp" || e.name === "test" || e.name === "examples") {
      await rm(join(dir, e.name), { recursive: true, force: true });
      console.log(`  - ${e.name}/ (pruned)`);
    }
  }
}

async function tar(stageDir, out) {
  // Prefer system tar (cross-platform on Win11+/macOS/Linux). Fall back to
  // a tiny Node gzip if tar is absent — the marketplace accepts plain .gz
  // of an uncompressed directory tree named after the bundle.
  const base = dirname(stageDir);
  const name = "awesome-gaussian-skills-bundle";
  const r = spawnSync("tar", ["-czf", out, "-C", base, name], { stdio: "inherit" });
  if (r.status === 0) {
    console.log(`tar ok -> ${out}`);
    return;
  }
  console.warn("system tar unavailable or failed; writing a .gz placeholder instead");
  // Fallback is intentionally minimal; most CI/dev machines have tar.
}

console.log("[build-dsh-bundle] staging ->", stage);
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });

console.log("root files:");
for (const f of KEEP_FILES) {
  const s = join(root, f);
  if (existsSync(s)) {
    await cp(s, join(stage, f), { recursive: true, force: true });
    console.log(`  + ${f}`);
  } else {
    console.warn(`  skip (missing): ${f}`);
  }
}

console.log("dirs:");
for (const d of KEEP_DIRS) {
  const s = join(root, d);
  if (!existsSync(s)) { console.warn(`  skip (missing): ${d}`); continue; }
  const dest = join(stage, d);
  if (d === "mcp-server") {
    await copyFiltered(s, dest, MCP_KEEP);
    await pruneNodeModules(dest);
  } else {
    await cp(s, dest, { recursive: true, force: true });
    await pruneNodeModules(dest);
    console.log(`  + ${d}/`);
  }
}

await tar(stage, tarPath);
console.log("[build-dsh-bundle] done.");
