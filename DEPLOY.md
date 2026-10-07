# Deploying

The build output is plain static HTML, JS, CSS and assets, so it runs on any
Apache shared host. `public/.htaccess` is copied into `dist/` on every build
and covers GoDaddy cPanel, Turbify and anything else running Apache.

## Build

```bash
npm ci
npm run bundle
```

`npm run bundle` builds and then packages. The build runs `optimize:machines`
first, so any newly added supplier PNG gets a WebP sibling before Vite bundles
it — without that step the output balloons by ~130MB.

Two zips land in `deploy/`:

| File | Size | Upload |
| --- | --- | --- |
| `01-app-core.zip` | ~46 MB | Every deploy |
| `02-catalogues.zip` | ~13 MB | Only when catalogue PDFs change |

Split on purpose: the catalogue PDFs almost never change, and there is no
reason to re-upload 13MB for a CSS fix.

---

## GoDaddy (cPanel / shared Linux hosting)

> This needs a **cPanel hosting** plan. GoDaddy's *Website Builder* product
> cannot host an uploaded static site — if your plan only shows a drag-and-drop
> site editor, there is nowhere to put these files and you will need to switch
> to Web Hosting.

1. Sign in to GoDaddy → **My Products** → your hosting plan → **cPanel Admin**.
2. Open **File Manager** and go to **`public_html`**. This is the document
   root for your primary domain.
3. If anything is already in there from a previous site, clear it out or move
   it aside first.
4. **Upload** `01-app-core.zip` into `public_html`, then right-click it →
   **Extract**. The contents must land directly in `public_html` — you should
   see `index.html` and `assets/` at that level, **not** a `dist/` folder.
   Delete the zip afterwards.
5. Upload and extract `02-catalogues.zip` the same way, so the PDFs end up at
   `public_html/catalogues/`.
6. **Confirm `.htaccess` is there.** File Manager hides dotfiles by default:
   **Settings** (top right) → tick **Show Hidden Files (dotfiles)** → Save,
   then look again. If it is missing, the site's internal links will work but
   reloading any page except the homepage will 404.

Addon or subdomain instead of the primary domain? Upload into that domain's
own document root (usually `public_html/<subdomain>`) rather than
`public_html`, and see *Subdirectory* below.

### FTP instead of File Manager

Host, username and password are under **cPanel → FTP Accounts**. Upload the
*contents* of `dist/` into `public_html` — not the `dist` folder itself. Make
sure your FTP client is set to show/transfer hidden files, or `.htaccess`
will be silently skipped (FileZilla: Server → Force showing hidden files).

---

## Turbify

Same files, same `.htaccess`. Upload and extract both zips into the document
root via **File Manager** or FTP, and enable hidden files so `.htaccess`
comes across.

---

## Why `.htaccess` matters

- **SPA routing.** React Router owns the URLs. Without the rewrite rules,
  loading `/machinery` or `/contact` directly returns an Apache 404, because
  no such file exists on disk. Only `/` would work. The rules also disable
  `MultiViews`, which GoDaddy enables and which otherwise lets Apache guess at
  extensionless URLs before the rewrites run.
- **Caching.** Asset filenames carry a content hash, so they are cached for a
  year. `index.html` is explicitly *not* cached — otherwise returning visitors
  keep getting the previous deploy's HTML, which points at asset files that no
  longer exist, and the site renders blank.
- **Compression** and correct MIME types for `.webp` and `.woff2`.

---

## Verify after uploading

1. `/` loads and the intro overlay plays.
2. Go to **Machinery**, then **reload the page**. This is the SPA routing
   test and the single most likely thing to be broken. A 404 here means
   `.htaccess` did not upload.
3. Download a catalogue PDF from a machine's "Download PDF" button.
4. Hard-reload and confirm the hashed asset filename in the network panel
   matches the new build — that is the cache-header test.
5. Check one page on a phone.

## Subdirectory deploys

`vite.config.ts` uses the default base of `/`, which assumes the site is
served from the domain root. To deploy into a subfolder, set `base` to that
path, rebuild, and update `RewriteBase` in `public/.htaccess` to match —
otherwise every asset URL 404s.
