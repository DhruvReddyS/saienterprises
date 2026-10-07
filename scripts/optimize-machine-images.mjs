/**
 * Converts the machine_png artwork to WebP.
 *
 * These source files are 1.5-2.6MB PNGs straight from suppliers and together
 * account for roughly 150MB of the build output. They are photographic product
 * shots on flat backgrounds, which WebP handles far better than PNG.
 *
 * Originals are left in place; a .webp sibling is written next to each file so
 * `machineAssets` can prefer it. Run: npm run optimize:machines
 */
import { readdir, stat, access } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = 'src/assets/machine_png';
const QUALITY = '82';
const MAX_WIDTH = '1600';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

const exists = async (p) => access(p).then(() => true, () => false);

const files = (await walk(ROOT)).filter((f) =>
  ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()),
);

let before = 0;
let after = 0;
let converted = 0;
let skipped = 0;

for (const file of files) {
  const webp = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const srcSize = (await stat(file)).size;
  before += srcSize;

  if (await exists(webp)) {
    after += (await stat(webp)).size;
    skipped += 1;
    continue;
  }

  try {
    await run('cwebp', [
      '-quiet', '-q', QUALITY, '-resize', MAX_WIDTH, '0',
      '-metadata', 'none',
      file, '-o', webp,
    ]);
    after += (await stat(webp)).size;
    converted += 1;
  } catch (error) {
    // Keep going: a single unreadable source should not stop the batch.
    console.warn(`  ! skipped ${file}: ${error.message.split('\n')[0]}`);
    after += srcSize;
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`\nmachine images: ${files.length} files`);
console.log(`  converted ${converted}, already done ${skipped}`);
console.log(`  ${mb(before)}MB -> ${mb(after)}MB  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
