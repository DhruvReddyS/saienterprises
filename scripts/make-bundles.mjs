/**
 * Packages dist/ into two zips for upload to Turbify.
 *
 * Split deliberately: the catalogue PDFs are ~13MB and almost never change,
 * so there is no reason to re-upload them alongside a CSS fix.
 */
import { rm, mkdir, readdir, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';

const run = promisify(execFile);
const DIST = resolve('dist');
const OUT = resolve('deploy');

try {
  await readdir(DIST);
} catch {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const zip = (file, args) =>
  run('zip', ['-r', '-q', '-X', resolve(OUT, file), ...args, '-x', '.DS_Store', '-x', '*/.DS_Store'], { cwd: DIST });

await zip('01-app-core.zip', ['.', '-x', 'catalogues/*']);
await zip('02-catalogues.zip', ['catalogues']);

const mb = async (f) => ((await stat(resolve(OUT, f))).size / 1024 / 1024).toFixed(0);
console.log(`\ndeploy/01-app-core.zip    ${await mb('01-app-core.zip')} MB   (upload every deploy)`);
console.log(`deploy/02-catalogues.zip  ${await mb('02-catalogues.zip')} MB   (only when PDFs change)`);
console.log('\nSee DEPLOY.md for upload steps.\n');
