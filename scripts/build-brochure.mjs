import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PDFDocument } from 'pdf-lib';

const imageDirectory = resolve('src/assets/brochure_images');
const output = resolve('src/assets/Sai Enterprises-2026.pdf');
const pageWidth = 314;
const pageHeight = 810;

const images = (await readdir(imageDirectory))
  .filter((file) => file.toLowerCase().endsWith('.jpg'))
  .sort((a, b) => a.localeCompare(b));

if (images.length !== 36) {
  throw new Error(`Expected 36 brochure pages, found ${images.length}.`);
}

const document = await PDFDocument.create();
document.setTitle('Sai Enterprises Machinery Catalogue 2026');
document.setAuthor('Sai Enterprises');
document.setSubject('Printing, packaging and finishing machinery catalogue');
document.setCreator('Sai Enterprises website build');

for (const imageName of images) {
  const image = await document.embedJpg(await readFile(resolve(imageDirectory, imageName)));
  const page = document.addPage([pageWidth, pageHeight]);
  page.drawImage(image, { x: 0, y: 0, width: pageWidth, height: pageHeight });
}

await writeFile(output, await document.save({ useObjectStreams: true }));
console.log(`Built ${images.length}-page brochure: ${output}`);
