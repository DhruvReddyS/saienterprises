/**
 * Per-page SEO helper.
 * Updates <title>, description, canonical, OG, Twitter, and og:url for SPA route changes.
 */
export interface PageMetaOptions {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'product';
}

const SITE = 'https://saienterprises.in';
const DEFAULT_OG = `${SITE}/og-image.jpg`;

function setMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setMetaByProp(prop: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', prop);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Set per-page meta. Accepts either an options object or legacy positional args.
 */
export function setPageMeta(
  titleOrOpts: string | PageMetaOptions,
  description?: string,
  canonical?: string,
) {
  const opts: PageMetaOptions = typeof titleOrOpts === 'string'
    ? { title: titleOrOpts, description, canonical }
    : titleOrOpts;

  const title       = opts.title;
  const desc        = opts.description ?? '';
  const url         = opts.canonical ?? `${SITE}${window.location.pathname}`;
  const image       = opts.image ?? DEFAULT_OG;
  const type        = opts.type ?? 'website';

  document.title = title;

  if (desc) setMetaByName('description', desc);
  if (opts.keywords) setMetaByName('keywords', opts.keywords);

  // Open Graph
  setMetaByProp('og:title', title);
  if (desc) setMetaByProp('og:description', desc);
  setMetaByProp('og:url', url);
  setMetaByProp('og:image', image);
  setMetaByProp('og:image:alt', `${title}, Sai Enterprises`);
  setMetaByProp('og:type', type);
  setMetaByProp('og:site_name', 'Sai Enterprises');
  setMetaByProp('og:locale', 'en_IN');

  // Twitter
  setMetaByName('twitter:title', title);
  if (desc) setMetaByName('twitter:description', desc);
  setMetaByName('twitter:image', image);
  setMetaByName('twitter:image:alt', `${title}, Sai Enterprises`);
  setMetaByName('twitter:card', 'summary_large_image');

  // Canonical
  setLink('canonical', url);
}

/**
 * Inject JSON-LD structured data for the current page.
 * Replaces any prior page-specific block (keyed by id="page-jsonld").
 */
export function setStructuredData(data: object | object[]) {
  const id = 'page-jsonld';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Build a BreadcrumbList JSON-LD for the current page.
 */
export function setBreadcrumbs(items: { name: string; path: string }[]) {
  setStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  });
}
