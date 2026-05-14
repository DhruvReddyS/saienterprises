export function setPageMeta(title: string, description?: string, canonical?: string) {
  document.title = title;

  let desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (desc && description) desc.content = description;

  // OG title/desc
  const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
  const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
  if (ogTitle) ogTitle.content = title;
  if (ogDesc && description) ogDesc.content = description;

  // Twitter
  const twTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
  const twDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
  if (twTitle) twTitle.content = title;
  if (twDesc && description) twDesc.content = description;

  // Canonical
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonical ?? `https://saienterprises.in${window.location.pathname}`;
}
