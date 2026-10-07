# Deploying to Turbify

Turbify Web Hosting serves static files from Apache, which is all this site
needs — the build output is plain HTML, JS, CSS and assets.

## Build

```bash
npm ci
npm run build
```

`npm run build` runs `optimize:machines` first, so any newly added supplier
PNG gets a WebP sibling before Vite bundles it. Output lands in `dist/`.

## Bundles

```bash
npm run bundle
```

Produces two zips in `deploy/`:

| File | Size | Upload |
| --- | --- | --- |
| `01-app-core.zip` | ~46 MB | Every deploy |
| `02-catalogues.zip` | ~13 MB | Only when catalogue PDFs change |

They are split because the catalogue PDFs almost never change and there is no
reason to re-upload them for a CSS tweak.

## Upload

1. Sign in to Turbify Web Hosting and open **File Manager** (or connect over
   FTP/SFTP with the credentials in your hosting control panel).
2. Upload and extract `01-app-core.zip` into the **document root**
   (usually `/` or `public_html`). The contents go at the root — not inside a
   `dist/` subfolder.
3. Upload and extract `02-catalogues.zip` the same way, so the PDFs land at
   `/catalogues/...`.
4. Confirm `.htaccess` is present at the document root. Some file managers
   hide dotfiles — enable "show hidden files" if you do not see it.

## Why `.htaccess` matters

It is committed at `public/.htaccess`, so it is copied into `dist/` on every
build. It does three things:

- **SPA routing.** React Router owns the URLs. Without the rewrite rules,
  loading `/machinery` or `/contact` directly returns an Apache 404, because
  no such file exists on disk. Only `/` would work.
- **Caching.** Asset filenames carry a content hash, so they are cached for a
  year. `index.html` is explicitly *not* cached, otherwise returning visitors
  keep being served the previous deploy's HTML, which points at asset files
  that no longer exist.
- **Compression** and correct MIME types for `.webp` and `.woff2`.

If Turbify's plan does not permit `mod_rewrite`, deep links will 404. The
`ErrorDocument 404 /index.html` line at the end is a fallback that makes the
app still load in that case, though the browser sees a 404 status.

## Verifying a deploy

After uploading, check:

- `/` loads and the intro overlay plays.
- Navigate to Machinery, then **reload the page** — this is the SPA routing
  test and the thing most likely to be broken.
- A catalogue PDF downloads, e.g. from a machine's "Download PDF" button.
- Hard-reload and confirm you get the new build (check the hashed filename in
  the network panel) — this is the cache-header test.

## Custom domain / subdirectory

The Vite config uses the default base of `/`, which assumes the site is served
from the domain root. If you deploy into a subdirectory, set `base` in
`vite.config.ts` to that path and rebuild, or asset URLs will 404.
