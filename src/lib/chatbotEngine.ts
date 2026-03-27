import { companyInfo, consumables, partnerBrands, productCategories, Product } from '@/data/products';
import { buildMachineSearchText } from '@/lib/machineSearch';
import { getMachineProfile } from '@/lib/machineProfile';

export type ChatbotSuggestion = {
  label: string;
  categorySlug?: string;
  productId?: string;
};

export type ChatbotSessionState = {
  lastCategorySlug?: string;
  lastMachineId?: string;
  lastIntent?: 'machine' | 'category' | 'contact' | 'general';
  lastQuery?: string;
};

export type ChatbotReply = {
  text: string;
  suggestions?: ChatbotSuggestion[];
  state?: ChatbotSessionState;
};

type IndexedMachine = Product & {
  categoryName: string;
  categorySlug: string;
  searchText: string;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const tokenize = (value: string) => normalize(value).split(' ').filter(Boolean);

const indexedMachines: IndexedMachine[] = productCategories.flatMap((category) =>
  category.products.map((product) => ({
    ...product,
    categoryName: category.name,
    categorySlug: category.slug,
    searchText: buildMachineSearchText(product, category.name),
  }))
);

const categoryKeywords: Record<string, string[]> = {
  'pre-press': ['prepress', 'pre press', 'pre-press', 'ctp', 'ctcp', 'plate'],
  press: ['press', 'offset', 'variable data', 'card'],
  'post-press': ['postpress', 'post press', 'post-press', 'binding', 'lamination', 'trimmer', 'cutter', 'hpm'],
  corrugation: ['corrugation', 'corrugated', 'flute', 'slotter', 'sheet pasting', 'box stitching'],
  allied: ['allied', 'consumables', 'kanefusa', 'thermal tape', 'jelly glue', 'numbering'],
};

const hasAny = (text: string, words: string[]) => words.some((word) => text.includes(normalize(word)));

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

const formatMachineBrief = (machine: IndexedMachine) => {
  const parts: string[] = [];
  if (machine.sizes?.length) parts.push(`Sizes: ${machine.sizes.join(', ')}`);
  if (machine.specifications && Object.keys(machine.specifications).length) {
    const topSpecs = Object.entries(machine.specifications)
      .slice(0, 3)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');
    parts.push(topSpecs);
  }
  return parts.join(' | ');
};

const machineScore = (query: string, machine: IndexedMachine) => {
  const q = normalize(query);
  const qTokens = tokenize(query);

  let score = 0;
  const machineName = normalize(machine.name);

  if (machineName.includes(q)) score += 130;
  if (machine.searchText.includes(q)) score += 80;

  for (const token of qTokens) {
    if (machineName.includes(token)) score += 24;
    if (machine.searchText.includes(token)) score += 10;
  }

  if (q.length >= 4) {
    const distance = levenshtein(q, machineName);
    score += Math.max(0, 48 - distance * 4);
  }

  return score;
};

const findMachines = (query: string, limit = 8) => {
  const ranked = indexedMachines
    .map((machine) => ({ machine, score: machineScore(query, machine) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return ranked;
};

const machineById = (id?: string) => (id ? indexedMachines.find((m) => m.id === id) : undefined);

const machineInsights = (machine: IndexedMachine) => {
  const profile = getMachineProfile(machine, machine.categoryName, machine.categorySlug);
  const lines: string[] = [];

  lines.push(`${machine.name} (${machine.categoryName})`);
  lines.push(machine.description);
  lines.push(`Brand: ${profile.brand} | Segment: ${profile.subcategory}`);

  const brief = formatMachineBrief(machine);
  if (brief) lines.push(brief);

  if (machine.features?.length) lines.push(`Key features: ${machine.features.slice(0, 6).join(', ')}`);
  if (machine.applications?.length) lines.push(`Use cases: ${machine.applications.slice(0, 6).join(', ')}`);

  return lines.join('\n');
};

const categoryCountText = productCategories
  .map((category) => `${category.name}: ${category.products.length}`)
  .join(' | ');

const parseCompareQuery = (normalized: string) => {
  const q = normalized.replace(/^compare\s+/, '');
  const match = q.match(/(.+?)\s+(?:vs|versus|and)\s+(.+)/i);
  if (!match) return null;
  return {
    left: match[1].trim(),
    right: match[2].trim(),
  };
};

const compareMachines = (left: IndexedMachine, right: IndexedMachine) => {
  const leftProfile = getMachineProfile(left, left.categoryName, left.categorySlug);
  const rightProfile = getMachineProfile(right, right.categoryName, right.categorySlug);

  const leftSpecs = left.specifications && Object.keys(left.specifications).length
    ? Object.entries(left.specifications).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join('; ')
    : 'Specs not listed in brochure';

  const rightSpecs = right.specifications && Object.keys(right.specifications).length
    ? Object.entries(right.specifications).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join('; ')
    : 'Specs not listed in brochure';

  return [
    `Comparison: ${left.name} vs ${right.name}`,
    `${left.name} -> ${left.categoryName} | ${leftProfile.brand} | ${leftSpecs}`,
    `${right.name} -> ${right.categoryName} | ${rightProfile.brand} | ${rightSpecs}`,
    'Tip: Choose based on production stage, required size range, and finishing workflow.',
  ].join('\n');
};

export const getChatbotReply = (query: string, state: ChatbotSessionState = {}): ChatbotReply => {
  const normalized = normalize(query);

  if (!normalized) {
    return {
      text: 'Please type your requirement. You can ask by machine name, size, feature, use case, category, or comparison.',
      state,
    };
  }

  if (hasAny(normalized, ['reset chat', 'clear chat', 'start over'])) {
    return {
      text: 'Chat context reset. Ask me anything about machines, categories, specs, or contact details.',
      suggestions: [
        { label: 'Show Post-Press machines', categorySlug: 'post-press' },
        { label: 'Compare HPM cutters' },
        { label: 'Contact details' },
      ],
      state: {},
    };
  }

  if (hasAny(normalized, ['hi', 'hello', 'hey', 'good morning', 'good evening'])) {
    return {
      text:
        'Hello. I can help with machine details, comparisons, category suggestions, specifications, use cases, locations, partner brands, and contact details.',
      suggestions: [
        { label: 'Show Post-Press machines', categorySlug: 'post-press' },
        { label: 'Need 24 inch laminator options' },
        { label: 'Compare HPM cutter and digital cutter' },
        { label: 'Open E-Brochure' },
      ],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['phone', 'contact', 'email', 'call', 'whatsapp'])) {
    return {
      text: `Phone: ${companyInfo.phones.join(' / ')}\nEmail: ${companyInfo.emails.join(' / ')}\nResponse window: 24-48 business hours`,
      suggestions: [{ label: 'Go to Contact Page' }],
      state: { ...state, lastIntent: 'contact', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['location', 'office', 'branch', 'where', 'global coverage', 'country'])) {
    return {
      text: `Headquarters: Hyderabad, India\nKenya Office: Nairobi\nIndia Branches: ${companyInfo.locations.branches
        .map((b) => b.city)
        .join(', ')}\nCoverage: India + Kenya + global partner-backed support`,
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['partner', 'brand', 'collaboration'])) {
    return {
      text: `Partner brands: ${partnerBrands.map((b) => `${b.name} (${b.country})`).join(', ')}`,
      suggestions: [{ label: 'Go to Partners Page' }],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['consumable', 'allied', 'knife', 'kanefusa', 'tape', 'jelly glue'])) {
    return {
      text: `Allied / consumables: ${consumables.map((item) => item.name).join(', ')}`,
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['count', 'how many', 'total machines', 'machine count'])) {
    return {
      text: `Machine counts by category: ${categoryCountText}`,
      suggestions: productCategories.map((c) => ({ label: `Open ${c.name}`, categorySlug: c.slug })),
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  const compareInput = parseCompareQuery(normalized);
  if (compareInput) {
    const leftMatch = findMachines(compareInput.left, 1)[0];
    const rightMatch = findMachines(compareInput.right, 1)[0];

    if (leftMatch?.machine && rightMatch?.machine) {
      return {
        text: compareMachines(leftMatch.machine, rightMatch.machine),
        suggestions: [
          { label: `View ${leftMatch.machine.name}`, categorySlug: leftMatch.machine.categorySlug, productId: leftMatch.machine.id },
          { label: `View ${rightMatch.machine.name}`, categorySlug: rightMatch.machine.categorySlug, productId: rightMatch.machine.id },
        ],
        state: {
          ...state,
          lastIntent: 'machine',
          lastQuery: query,
          lastMachineId: leftMatch.machine.id,
          lastCategorySlug: leftMatch.machine.categorySlug,
        },
      };
    }
  }

  if (state.lastMachineId && hasAny(normalized, ['more', 'details', 'spec', 'specification', 'features', 'sizes', 'use case', 'application'])) {
    const previousMachine = machineById(state.lastMachineId);
    if (previousMachine) {
      return {
        text: machineInsights(previousMachine),
        suggestions: [
          { label: `View ${previousMachine.name}`, categorySlug: previousMachine.categorySlug, productId: previousMachine.id },
          { label: 'Show similar machines' },
        ],
        state: {
          ...state,
          lastIntent: 'machine',
          lastQuery: query,
          lastMachineId: previousMachine.id,
          lastCategorySlug: previousMachine.categorySlug,
        },
      };
    }
  }

  const askedCategory = Object.entries(categoryKeywords).find(([, keys]) => hasAny(normalized, keys));
  if (askedCategory && hasAny(normalized, ['list', 'show', 'machines', 'catalog', 'catalogue', 'options'])) {
    const category = productCategories.find((c) => c.id === askedCategory[0]);
    if (category) {
      return {
        text: `${category.name} has ${category.products.length} machines. Top options: ${category.products
          .slice(0, 8)
          .map((p) => p.name)
          .join(', ')}`,
        suggestions: [
          { label: `Open ${category.name}`, categorySlug: category.slug },
          ...category.products.slice(0, 4).map((p) => ({ label: p.name, categorySlug: category.slug, productId: p.id })),
        ],
        state: {
          ...state,
          lastIntent: 'category',
          lastCategorySlug: category.slug,
          lastQuery: query,
        },
      };
    }
  }

  const matches = findMachines(query, 6);

  if (matches.length > 0) {
    const top = matches[0];

    if (top.score >= 100) {
      return {
        text: machineInsights(top.machine),
        suggestions: [
          { label: `View ${top.machine.name}`, categorySlug: top.machine.categorySlug, productId: top.machine.id },
          ...matches
            .slice(1, 4)
            .map((item) => ({ label: item.machine.name, categorySlug: item.machine.categorySlug, productId: item.machine.id })),
        ],
        state: {
          ...state,
          lastIntent: 'machine',
          lastMachineId: top.machine.id,
          lastCategorySlug: top.machine.categorySlug,
          lastQuery: query,
        },
      };
    }

    return {
      text: `I found ${matches.length} relevant machines. Select one for detailed specs and recommendations:`,
      suggestions: matches.map((item) => ({
        label: `${item.machine.name} (${item.machine.categoryName})`,
        categorySlug: item.machine.categorySlug,
        productId: item.machine.id,
      })),
      state: {
        ...state,
        lastIntent: 'general',
        lastQuery: query,
      },
    };
  }

  if (hasAny(normalized, ['best', 'recommend', 'suggest', 'which machine'])) {
    return {
      text:
        'Share your use case and size requirement. Example: "Need book finishing machine for diaries" or "Need 24 inch laminator for offset jobs". I can then shortlist matching machines.',
      suggestions: [
        { label: 'Need 24 inch laminator options' },
        { label: 'Best machine for book finishing' },
        { label: 'Show corrugation options for box making' },
      ],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  return {
    text:
      'No reliable match found in current catalogue data. Try with machine name, category, size, feature, or compare query like "compare HPM cutter vs digital cutter".',
    suggestions: [
      { label: 'Open Machinery' },
      { label: 'Open E-Brochure' },
      { label: 'Show Post-Press machines', categorySlug: 'post-press' },
      { label: 'Show Corrugation machines', categorySlug: 'corrugation' },
    ],
    state: { ...state, lastIntent: 'general', lastQuery: query },
  };
};
