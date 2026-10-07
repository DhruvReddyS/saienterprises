import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PDFDocument, rgb } from 'pdf-lib';

const source = resolve('Catalogue Machine Details');
const destination = resolve('public/catalogues');

// These supplier PDFs do not contain the Sai Enterprises letterhead. Keeping the
// list explicit prevents us from masking genuine document content near the top.
const alreadyClean = new Set([
  '38 Book Sewing Machine.pdf',
  '65 Hot foil stamping machine Hydraulic.pdf',
  '73 Hydraulic Envelope Die Cutting Press Machine.pdf',
  '95 Sticky note pad making mchine.pdf',
]);

// The repeated letterhead occupies the first ~103 points on the A4 source pages.
// The small safety margin also removes its horizontal rule without touching the
// machine heading, which begins at roughly 108 points.
const letterheadHeight = 107;

await mkdir(destination, { recursive: true });
const files = (await readdir(source))
  .filter((file) => file.toLowerCase().endsWith('.pdf'))
  .sort((a, b) => a.localeCompare(b));

let sanitizedPages = 0;

for (const file of files) {
  const input = await readFile(resolve(source, file));

  if (alreadyClean.has(file)) {
    await writeFile(resolve(destination, file), input);
    continue;
  }

  const document = await PDFDocument.load(input);
  for (const page of document.getPages()) {
    const { width, height } = page.getSize();
    page.drawRectangle({
      x: 0,
      y: Math.max(0, height - letterheadHeight),
      width,
      height: Math.min(letterheadHeight, height),
      color: rgb(1, 1, 1),
      borderWidth: 0,
    });
    sanitizedPages += 1;
  }

  await writeFile(
    resolve(destination, file),
    await document.save({ useObjectStreams: true }),
  );
}

console.log(
  `Published ${files.length} catalogues to public/catalogues; removed letterheads from ${sanitizedPages} pages.`,
);
