# Deploying to Turbify

The build output is plain static HTML, JS, CSS and assets. Turbify Web Hosting
serves it from Apache, which is all this site needs. `public/.htaccess` is
copied into `dist/` on every build and carries the routing, caching and
compression rules.

## Build and package

```bash
npm ci
npm run bundle
```

The build runs `optimize:machines` first, so any newly added supplier PNG gets
a WebP sibling before Vite bundles it — skipping that step adds ~130MB to the
output.

Two zips land in `deploy/`:

| File | Size | Upload |
| --- | --- | --- |
| `01-app-core.zip` | ~46 MB | Every deploy |
| `02-catalogues.zip` | ~13 MB | Only when catalogue PDFs change |

Split on purpose: the catalogue PDFs almost never change, so there is no
reason to re-upload 13MB for a CSS fix.

## Upload

1. Sign in to Turbify and open your hosting control panel → **File Manager**.
2. Go to the **document root** — the folder your domain serves from. On
   Turbify this is usually the account root (`/`); some plans use
   `public_html`. It is the folder that already contains your current
   `index.html`.
3. If an older site is in there, clear it out or move it aside first.
4. Upload `01-app-core.zip` and **extract it in place**. The contents must
   land directly in the document root — you should see `index.html` and
   `assets/` at that level, **not** a `dist/` folder. Delete the zip after.
5. Upload and extract `02-catalogues.zip` the same way, so the PDFs end up at
   `/catalogues/`.
6. **Confirm `.htaccess` is present.** File managers hide dotfiles by default;
   look for a "show hidden files" toggle in the settings. If it is missing,
   internal navigation still works but reloading any page other than the
   homepage returns a 404.

### FTP instead of File Manager

Credentials are in your Turbify hosting control panel. Upload the *contents*
of `dist/` into the document root — not the `dist` folder itself. Set your FTP
client to show and transfer hidden files, or `.htaccess` is silently skipped
(FileZilla: Server → Force showing hidden files).

## Verify after uploading

1. `/` loads and the intro overlay plays.
2. Go to **Machinery**, then **reload the page**. This is the SPA routing test
   and the single most likely thing to be broken. A 404 here means
   `.htaccess` did not upload.
3. Download a catalogue PDF from a machine's "Download PDF" button.
4. Hard-reload and confirm the hashed asset filename in the network panel
   matches the new build — that is the cache-header test.
5. Check one page on a phone.

## Why `.htaccess` matters

- **SPA routing.** React Router owns the URLs. Without the rewrite rules,
  loading `/machinery` or `/contact` directly returns an Apache 404, because
  no such file exists on disk. Only `/` would work. The rules also disable
  `MultiViews`, which some shared hosts enable and which otherwise lets Apache
  guess at extensionless URLs before the rewrites run.
- **Caching.** Asset filenames carry a content hash, so they are cached for a
  year. `index.html` is explicitly *not* cached — otherwise returning visitors
  keep getting the previous deploy's HTML, which points at asset files that no
  longer exist, and the site renders blank.
- **Compression** and correct MIME types for `.webp` and `.woff2`.

If your plan does not permit `mod_rewrite`, deep links will 404. The
`ErrorDocument 404 /index.html` line at the end of the file is a fallback that
still loads the app in that case, though the browser sees a 404 status.

## Subdirectory deploys

`vite.config.ts` uses the default base of `/`, which assumes the site is
served from the domain root. To deploy into a subfolder, set `base` to that
path, rebuild, and update `RewriteBase` in `public/.htaccess` to match —
otherwise every asset URL 404s.

## Other Apache hosts

The same two zips and the same `.htaccess` work unchanged on any Apache shared
host, including GoDaddy cPanel. Only the document root differs — on cPanel it
is `public_html`.
