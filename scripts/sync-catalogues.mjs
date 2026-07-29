import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('Catalogue Machine Details');
const destination = resolve('public/catalogues');

await mkdir(destination, { recursive: true });
const files = (await readdir(source)).filter((file) => file.toLowerCase().endsWith('.pdf'));

await Promise.all(
  files.map((file) => copyFile(resolve(source, file), resolve(destination, file))),
);

console.log(`Synced ${files.length} machine catalogues to public/catalogues.`);
