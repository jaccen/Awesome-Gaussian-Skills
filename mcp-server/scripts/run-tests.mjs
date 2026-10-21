import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const tests = readdirSync(new URL('../test/', import.meta.url)).filter(name => name.endsWith('.test.mjs')).sort();
if (!tests.length) throw new Error('No test files discovered');
const result = spawnSync(process.execPath, ['--test', ...tests.map(name => `test/${name}`)], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
