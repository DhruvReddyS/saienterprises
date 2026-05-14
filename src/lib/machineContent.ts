import type { Product } from '@/data/products';
import { getMachineProfile } from '@/lib/machineProfile';

const take = (values: string[] | undefined, count: number) =>
  values?.filter(Boolean).slice(0, count) ?? [];

const categoryPositioning: Record<string, string> = {
  'pre-press':
    'Configured for dependable plate preparation, exposure, and imaging workflows before press production begins.',
  press:
    'Positioned for commercial print output where consistency, throughput, and registration quality matter most.',
  'post-press':
    'Built for downstream finishing, binding, lamination, cutting, and value-added print conversion requirements.',
  corrugation:
    'Designed for corrugated board conversion, laminating, slotting, and packaging-line workflow stability.',
  allied:
    'Supports production continuity through allied equipment and consumables that complement machine installations.',
};

const buildSpecSentence = (product: Product) => {
  if (!product.specifications || Object.keys(product.specifications).length === 0) return '';

  const summary = Object.entries(product.specifications)
    .slice(0, 3)
    .map(([key, value]) => `${key.toLowerCase()} ${value}`)
    .join(', ');

  return `Key brochure-listed references include ${summary}.`;
};

const buildSizeSentence = (product: Product) => {
  if (!product.sizes?.length) return '';
  const joined = take(product.sizes, 4).join(', ');
  return `Working size coverage includes ${joined}.`;
};

export const getMachineNarrative = (
  product: Product,
  categoryName: string,
  categorySlug: string,
) => {
  const profile = getMachineProfile(product, categoryName, categorySlug);

  const lines = [
    product.description,
    `${product.name} is aligned to ${profile.subcategory.toLowerCase()} requirements in ${categoryName.toLowerCase()} production environments.`,
    buildSizeSentence(product),
    buildSpecSentence(product),
    product.features?.length
      ? `Highlighted capabilities include ${take(product.features, 4).join(', ')}.`
      : '',
    product.applications?.length
      ? `Typical output areas include ${take(product.applications, 4).join(', ')}.`
      : categoryPositioning[categorySlug] ?? '',
    `${profile.brand} support is available through Sai Enterprises commercial guidance, installation coordination, and post-sale assistance.`,
  ].filter(Boolean);

  return [...new Set(lines)].slice(0, 6);
};

export const getMachineHighlights = (
  product: Product,
  categoryName: string,
  categorySlug: string,
) => {
  const profile = getMachineProfile(product, categoryName, categorySlug);
  const highlights = [
    ...(product.features ?? []),
    ...(product.applications ?? []).map((item) => `Suitable for ${item}`),
    product.sizes?.length ? `Available across ${take(product.sizes, 3).join(', ')}` : '',
    `Configured for ${profile.subcategory.toLowerCase()} workflows`,
  ].filter(Boolean);

  return [...new Set(highlights)].slice(0, 5);
};

export const getMachinePrimaryStats = (
  product: Product,
  categoryName: string,
  categorySlug: string,
) => {
  const profile = getMachineProfile(product, categoryName, categorySlug);

  const stats: Array<{ label: string; value: string; meta?: string }> = [];

  if (product.specifications) {
    Object.entries(product.specifications)
      .slice(0, 4)
      .forEach(([label, value]) => {
        stats.push({ label, value });
      });
  }

  if (stats.length < 4 && product.sizes?.length) {
    stats.push({
      label: 'Size Range',
      value: product.sizes[0],
      meta: product.sizes.length > 1 ? `${product.sizes.length} options listed` : undefined,
    });
  }

  if (stats.length < 4) {
    stats.push({ label: 'Brand', value: profile.brand });
  }

  if (stats.length < 4) {
    stats.push({ label: 'Segment', value: profile.subcategory });
  }

  if (stats.length < 4) {
    stats.push({ label: 'Category', value: categoryName });
  }

  return stats.slice(0, 4);
};

export const getMachineCommercialTags = (
  product: Product,
  categoryName: string,
  categorySlug: string,
) => {
  const profile = getMachineProfile(product, categoryName, categorySlug);

  const tags = [
    profile.brand,
    profile.subcategory,
    categoryName,
    ...(take(product.sizes, 2) ?? []),
    ...(take(product.features, 2) ?? []),
  ].filter(Boolean);

  return [...new Set(tags)].slice(0, 5);
};

export const getMachineEnquiryMessage = (product: Product, categoryName: string) =>
  `Interested in ${product.name} under ${categoryName}. Please share suitable configuration, size availability, installation guidance, and commercial details.`;

export const getMachinePreviewNote = (
  product: Product,
  categoryName: string,
  categorySlug: string,
) => {
  const narrative = getMachineNarrative(product, categoryName, categorySlug);
  return narrative[1] ?? narrative[0] ?? product.description;
};

export const getRecommendationReason = (
  source: Product,
  sourceCategoryName: string,
  sourceCategorySlug: string,
  candidate: Product,
  candidateCategoryName: string,
  candidateCategorySlug: string,
) => {
  const sourceProfile = getMachineProfile(source, sourceCategoryName, sourceCategorySlug);
  const candidateProfile = getMachineProfile(candidate, candidateCategoryName, candidateCategorySlug);

  if (sourceProfile.subcategory === candidateProfile.subcategory) {
    return `Similar ${candidateProfile.subcategory.toLowerCase()} workflow alignment`;
  }

  const sharedApplications = (source.applications ?? []).filter((item) =>
    (candidate.applications ?? []).includes(item),
  );
  if (sharedApplications.length) {
    return `${sharedApplications[0]} use-case overlap`;
  }

  const sharedSizes = (source.sizes ?? []).filter((item) =>
    (candidate.sizes ?? []).includes(item),
  );
  if (sharedSizes.length) {
    return `Comparable size coverage around ${sharedSizes[0]}`;
  }

  if (sourceProfile.brand === candidateProfile.brand) {
    return `Same ${candidateProfile.brand} brand family`;
  }

  if (sourceCategorySlug === candidateCategorySlug) {
    return `Alternative within ${candidateCategoryName}`;
  }

  return `Adjacent fit for ${candidateCategoryName.toLowerCase()} production needs`;
};
