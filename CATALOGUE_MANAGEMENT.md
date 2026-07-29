# Machine catalogue workflow

`Catalogue Machine Details/` is the source-of-truth folder for original supplier files. The website serves lightweight copies from `public/catalogues/`; they are never imported into the JavaScript bundle and are transferred only when a visitor chooses View PDF or Download.

To add or replace a catalogue:

1. Put the final PDF in `Catalogue Machine Details/`.
2. Add or update the machine ID and filename in `src/data/catalogueDocuments.ts`.
3. Add a concise, verified `summary`, `highlights`, and `specifications` when the PDF contains useful technical information.
4. Run `npm run sync:catalogues`.
5. Run `npm run build` and open that machine from the machinery catalogue.

Keep filenames stable after publishing so existing links do not break. DOC and DOCX working files can remain in the source folder, but only final PDFs are copied to the public website.

## Deliberately unlinked source files

These files are retained in the source folder but are not shown against a website machine until their identity is confirmed:

- `06 Semi Automatic Three Knife Trimmer QS100M.pdf` - the filename says QS100M, but the document itself repeatedly identifies the machine as QS100C. The verified QS100C file is already linked to the semi-automatic trimmer.
- `27 Rigid Box Wrapping Machine.pdf` - wrapping is a different production stage from the listed automatic rigid-box making machine.
- `80 Hydraulic presses for book binding.pdf` - the current PDF does not expose enough model/title information to verify it as the listed bundling press.

Never link a PDF merely because it is the closest filename. Confirm the machine type and model inside the PDF first.
