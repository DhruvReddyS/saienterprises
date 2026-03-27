import type { Product } from '@/data/products';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const tokenize = (value: string) => normalize(value).split(' ').filter(Boolean);

export const buildMachineSearchText = (product: Product, categoryName?: string) => {
  const specificationPairs = Object.entries(product.specifications ?? {}).flatMap(([key, val]) => [key, val]);
  const allParts = [
    product.name,
    product.description,
    product.brand ?? '',
    product.subcategory ?? '',
    product.brochureStatus ?? '',
    product.sourceNote ?? '',
    categoryName ?? '',
    ...(product.features ?? []),
    ...(product.applications ?? []),
    ...(product.sizes ?? []),
    ...specificationPairs,
  ];

  return normalize(allParts.join(' '));
};

export const matchesMachineSearch = (product: Product, query: string, categoryName?: string) => {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const haystack = buildMachineSearchText(product, categoryName);
  const terms = tokenize(trimmed);

  return terms.every((term) => haystack.includes(term));
};

export const machineSimilarityScore = (source: Product, candidate: Product) => {
  const sourceText = buildMachineSearchText(source);
  const candidateText = buildMachineSearchText(candidate);

  const sourceTokens = new Set(tokenize(sourceText));
  const candidateTokens = new Set(tokenize(candidateText));

  let overlap = 0;
  for (const token of sourceTokens) {
    if (candidateTokens.has(token)) overlap += 1;
  }

  const sourceFeatureSet = new Set((source.features ?? []).map((f) => normalize(f)));
  const candidateFeatureSet = new Set((candidate.features ?? []).map((f) => normalize(f)));

  let featureOverlap = 0;
  for (const item of sourceFeatureSet) {
    if (candidateFeatureSet.has(item)) featureOverlap += 1;
  }

  return overlap + featureOverlap * 2;
};
