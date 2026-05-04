import { productCategories, type Product, type ProductCategory } from '@/data/products';
import { getMachineProfile } from '@/lib/machineProfile';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const tokenize = (value: string) => normalize(value).split(' ').filter(Boolean);

const humanizeCategory = (value: string) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const synonymMap: Record<string, string[]> = {
  laminator: ['lamination', 'laminator'],
  lamination: ['lamination', 'laminator'],
  cutter: ['cutter', 'cutting', 'trimmer'],
  cutting: ['cutter', 'cutting', 'trimmer'],
  trimmer: ['trimmer', 'cutter'],
  binder: ['binder', 'binding', 'book'],
  binding: ['binding', 'binder', 'sewing', 'book'],
  rigid: ['rigid', 'box', 'case'],
  box: ['box', 'rigid', 'carton', 'packaging'],
  corrugation: ['corrugation', 'corrugated', 'box', 'carton'],
  corrugated: ['corrugation', 'corrugated', 'box'],
  ctp: ['ctp', 'ctcp', 'plate'],
  ctcp: ['ctp', 'ctcp', 'plate'],
  hpm: ['hpm', 'cutter', 'cutting'],
  spiral: ['spiral', 'wire', 'binding', 'punching'],
  punching: ['punching', 'punch', 'wire', 'spiral'],
  passport: ['passport', 'sewing', 'book'],
  embossing: ['embossing', 'knurling'],
};

const levenshtein = (a: string, b: string) => {
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }

  return dp[a.length][b.length];
};

const expandTokens = (query: string) => {
  const baseTokens = tokenize(query);
  const expanded = new Set(baseTokens);

  baseTokens.forEach((token) => {
    (synonymMap[token] ?? []).forEach((item) => expanded.add(item));
  });

  return [...expanded];
};

export type SearchableMachine = Product & {
  categoryName: string;
  categorySlug: string;
  categoryHeroImage?: string;
  resolvedBrand: string;
  resolvedSubcategory: string;
  brochureSummary: string;
  searchText: string;
  searchTokens: string[];
};

export type MachineSearchResult = {
  machine: SearchableMachine;
  score: number;
};

export const buildMachineSearchText = (
  product: Product,
  categoryName?: string,
  categorySlug?: string,
) => {
  const resolvedCategoryName = categoryName ?? humanizeCategory(product.category);
  const resolvedCategorySlug = categorySlug ?? product.category;
  const profile = getMachineProfile(product, resolvedCategoryName, resolvedCategorySlug);

  const specificationPairs = Object.entries(product.specifications ?? {}).flatMap(([key, val]) => [key, val]);
  const allParts = [
    product.name,
    product.description,
    product.brand ?? '',
    product.subcategory ?? '',
    product.brochureStatus ?? '',
    product.sourceNote ?? '',
    resolvedCategoryName,
    profile.brand,
    profile.subcategory,
    profile.brochureStatus,
    ...(product.features ?? []),
    ...(product.applications ?? []),
    ...(product.sizes ?? []),
    ...specificationPairs,
  ];

  return normalize(allParts.join(' '));
};

export const buildSearchableMachine = (
  product: Product,
  categoryName?: string,
  categorySlug?: string,
  categoryHeroImage?: string,
): SearchableMachine => {
  const resolvedCategoryName = categoryName ?? humanizeCategory(product.category);
  const resolvedCategorySlug = categorySlug ?? product.category;
  const profile = getMachineProfile(product, resolvedCategoryName, resolvedCategorySlug);
  const searchText = buildMachineSearchText(product, resolvedCategoryName, resolvedCategorySlug);

  return {
    ...product,
    categoryName: resolvedCategoryName,
    categorySlug: resolvedCategorySlug,
    categoryHeroImage,
    resolvedBrand: profile.brand,
    resolvedSubcategory: profile.subcategory,
    brochureSummary: profile.brochureStatus,
    searchText,
    searchTokens: tokenize(searchText),
  };
};

export const flattenMachines = (categories: ProductCategory[] = productCategories) =>
  categories.flatMap((category) =>
    category.products.map((product) =>
      buildSearchableMachine(product, category.name, category.slug, category.heroImage),
    ),
  );

const scoreMachineQuery = (query: string, machine: SearchableMachine) => {
  const normalizedQuery = normalize(query);
  const queryTokens = expandTokens(query);
  const normalizedName = normalize(machine.name);

  let score = 0;

  if (normalizedName === normalizedQuery) score += 220;
  if (normalizedName.includes(normalizedQuery)) score += 120;
  if (machine.searchText.includes(normalizedQuery)) score += 80;
  if (normalize(machine.resolvedBrand).includes(normalizedQuery)) score += 34;
  if (normalize(machine.resolvedSubcategory).includes(normalizedQuery)) score += 28;
  if (normalize(machine.categoryName).includes(normalizedQuery)) score += 24;

  queryTokens.forEach((token) => {
    if (normalizedName.includes(token)) score += 22;
    if (machine.searchText.includes(token)) score += 8;

    const closeNameMatch = tokenize(machine.name).some((nameToken) =>
      token.length > 3 && levenshtein(token, nameToken) <= 1,
    );
    if (closeNameMatch) score += 12;
  });

  return score;
};

export const searchMachines = (
  query: string,
  machines: SearchableMachine[] = flattenMachines(),
  limit = 12,
): MachineSearchResult[] => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return machines
    .map((machine) => ({
      machine,
      score: scoreMachineQuery(trimmed, machine),
    }))
    .filter((item) => item.score > 18)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const matchesMachineSearch = (
  product: Product,
  query: string,
  categoryName?: string,
  categorySlug?: string,
) => {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const searchable = buildSearchableMachine(product, categoryName, categorySlug);
  return searchMachines(trimmed, [searchable], 1).length > 0;
};

export const machineSimilarityScore = (source: Product, candidate: Product) => {
  const sourceCategoryName = (source as Partial<SearchableMachine>).categoryName ?? humanizeCategory(source.category);
  const sourceCategorySlug = (source as Partial<SearchableMachine>).categorySlug ?? source.category;
  const candidateCategoryName =
    (candidate as Partial<SearchableMachine>).categoryName ?? humanizeCategory(candidate.category);
  const candidateCategorySlug = (candidate as Partial<SearchableMachine>).categorySlug ?? candidate.category;

  const sourceProfile = getMachineProfile(source, sourceCategoryName, sourceCategorySlug);
  const candidateProfile = getMachineProfile(candidate, candidateCategoryName, candidateCategorySlug);

  const sourceTokens = new Set(tokenize(buildMachineSearchText(source, sourceCategoryName, sourceCategorySlug)));
  const candidateTokens = new Set(tokenize(buildMachineSearchText(candidate, candidateCategoryName, candidateCategorySlug)));

  let overlap = 0;
  for (const token of sourceTokens) {
    if (candidateTokens.has(token)) overlap += 1;
  }

  const sharedFeatures = (source.features ?? []).filter((item) => (candidate.features ?? []).includes(item)).length;
  const sharedApplications = (source.applications ?? []).filter((item) =>
    (candidate.applications ?? []).includes(item),
  ).length;
  const sharedSizes = (source.sizes ?? []).filter((item) => (candidate.sizes ?? []).includes(item)).length;

  let score = overlap;
  if (source.category === candidate.category) score += 18;
  if (sourceProfile.brand === candidateProfile.brand) score += 14;
  if (sourceProfile.subcategory === candidateProfile.subcategory) score += 16;
  score += sharedFeatures * 7;
  score += sharedApplications * 8;
  score += sharedSizes * 6;

  return score;
};

export const recommendMachines = (
  source: Product | SearchableMachine,
  candidates: Array<Product | SearchableMachine>,
  limit = 6,
) =>
  candidates
    .filter((candidate) => candidate.id !== source.id)
    .map((candidate) => ({
      machine:
        'categoryName' in candidate
          ? (candidate as SearchableMachine)
          : buildSearchableMachine(candidate as Product),
      score: machineSimilarityScore(source as Product, candidate as Product),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
