import { companyInfo, consumables, productCategories } from '@/data/products';
import { getMachineEnquiryMessage, getMachineNarrative } from '@/lib/machineContent';
import {
  flattenMachines,
  recommendMachines,
  searchMachines,
  type SearchableMachine,
} from '@/lib/machineSearch';

export type ChatbotSuggestion = {
  label: string;
  categorySlug?: string;
  productId?: string;
  route?: 'machinery' | 'contact' | 'partners' | 'brochure' | 'about';
  contactCategory?: string;
  contactMachine?: string;
  contactMessage?: string;
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

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const hasAny = (text: string, values: string[]) => values.some((value) => text.includes(normalize(value)));

const indexedMachines = flattenMachines(productCategories);

const categoryKeywords: Record<string, string[]> = {
  'pre-press': ['pre press', 'prepress', 'ctp', 'ctcp', 'plate', 'exposure'],
  press: ['press', 'offset', 'variable data', 'card'],
  'post-press': ['post press', 'postpress', 'cutter', 'trimmer', 'lamination', 'binding', 'wire o', 'spiral'],
  corrugation: ['corrugation', 'corrugated', 'box', 'carton', 'flute', 'slotter'],
  allied: ['allied', 'consumables', 'knife', 'kanefusa', 'glue', 'thermal tape'],
};

const machineById = (id?: string) => (id ? indexedMachines.find((machine) => machine.id === id) : undefined);

const suggestionsForMachine = (machine: SearchableMachine): ChatbotSuggestion[] => [
  { label: `View ${machine.name}`, categorySlug: machine.categorySlug, productId: machine.id },
  {
    label: `Enquire about ${machine.name}`,
    route: 'contact',
    contactCategory: machine.categoryName,
    contactMachine: machine.name,
    contactMessage: getMachineEnquiryMessage(machine, machine.categoryName),
  },
  { label: `Open ${machine.categoryName}`, categorySlug: machine.categorySlug },
];

const formatMachineResponse = (machine: SearchableMachine) =>
  getMachineNarrative(machine, machine.categoryName, machine.categorySlug).join('\n');

const parseCompareQuery = (query: string) => {
  const cleaned = query.replace(/^compare\s+/, '');
  const match = cleaned.match(/(.+?)\s+(?:vs|versus|and)\s+(.+)/i);
  if (!match) return null;
  return {
    left: match[1].trim(),
    right: match[2].trim(),
  };
};

const compareMachines = (left: SearchableMachine, right: SearchableMachine) => {
  const leftSize = left.sizes?.slice(0, 2).join(', ') || 'Sizes on request';
  const rightSize = right.sizes?.slice(0, 2).join(', ') || 'Sizes on request';

  return [
    `Comparison: ${left.name} vs ${right.name}`,
    `${left.name}: ${left.resolvedBrand} · ${left.categoryName} · ${leftSize}`,
    `${right.name}: ${right.resolvedBrand} · ${right.categoryName} · ${rightSize}`,
    'Choose based on production stage, size coverage, finishing requirement, and installation fit.',
  ].join('\n');
};

export const getChatbotReply = (query: string, state: ChatbotSessionState = {}): ChatbotReply => {
  const normalized = normalize(query);

  if (!normalized) {
    return {
      text: 'Ask by machine name, category, size, brand, brochure, office location, or enquiry need.',
      state,
    };
  }

  if (hasAny(normalized, ['hi', 'hello', 'hey', 'good morning', 'good evening'])) {
    return {
      text: 'Sai Enterprises assistant. I can help with machine discovery, comparisons, brochure guidance, office network information, and enquiry routing.',
      suggestions: [
        { label: 'Show HPM paper cutters', categorySlug: 'post-press' },
        { label: 'Need 24 inch laminator options' },
        { label: 'Compare HPM cutter vs digital cutter' },
        { label: 'Open E-Brochure', route: 'brochure' },
      ],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['reset', 'clear chat', 'start over'])) {
    return {
      text: 'Chat reset. Ask about machines, category options, brochure content, or contact requirements.',
      suggestions: [
        { label: 'Show Corrugation machines', categorySlug: 'corrugation' },
        { label: 'Best machine for book finishing' },
        { label: 'Contact details', route: 'contact' },
      ],
      state: {},
    };
  }

  if (hasAny(normalized, ['phone', 'contact', 'email', 'call', 'quote', 'enquiry', 'enquire'])) {
    const lastMachine = machineById(state.lastMachineId);

    return {
      text: `Phone: ${companyInfo.phones.join(' / ')}\nEmail: ${companyInfo.emails.join(' / ')}\nBest path: use the contact page so we can map the right machine, size range, and commercial requirement in one enquiry.`,
      suggestions: lastMachine
        ? [
            {
              label: `Enquire about ${lastMachine.name}`,
              route: 'contact',
              contactCategory: lastMachine.categoryName,
              contactMachine: lastMachine.name,
              contactMessage: getMachineEnquiryMessage(lastMachine, lastMachine.categoryName),
            },
            { label: 'Go to Contact Page', route: 'contact' },
          ]
        : [{ label: 'Go to Contact Page', route: 'contact' }],
      state: { ...state, lastIntent: 'contact', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['brochure', 'catalog', 'catalogue', 'pdf', 'reader'])) {
    return {
      text: 'Open the brochure viewer to search brochure-listed machines, jump pages quickly, and move into the right category or contact flow.',
      suggestions: [
        { label: 'Open E-Brochure', route: 'brochure' },
        { label: 'Open Machinery', route: 'machinery' },
      ],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['office', 'location', 'branch', 'service centre', 'service center', 'kenya', 'nairobi', 'hyderabad'])) {
    return {
      text: 'Headquarters: Hyderabad, India.\nKenya office: Nairobi.\nThe site also shows branch offices, service centres, and sales partners across the India support network.',
      suggestions: [
        { label: 'Go to Contact Page', route: 'contact' },
        { label: 'Open About Page', route: 'about' },
      ],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['partner', 'brand', 'hpm', 'paper cutter'])) {
    return {
      text: 'This website now speaks about HPM only in the partner flow. Sai Enterprises is positioned as the sole HPM agent in India with a strong paper cutter and handling-system focus.',
      suggestions: [
        { label: 'Go to Partners Page', route: 'partners' },
        { label: 'Show HPM paper cutters', categorySlug: 'post-press' },
      ],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['consumable', 'allied', 'knife', 'glue', 'thermal tape'])) {
    return {
      text: `Allied and consumable items include ${consumables.map((item) => item.name).join(', ')}.`,
      suggestions: [{ label: 'Open Allied category', categorySlug: 'allied' }],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  const compareQuery = parseCompareQuery(normalized);
  if (compareQuery) {
    const left = searchMachines(compareQuery.left, indexedMachines, 1)[0]?.machine;
    const right = searchMachines(compareQuery.right, indexedMachines, 1)[0]?.machine;

    if (left && right) {
      return {
        text: compareMachines(left, right),
        suggestions: [
          { label: `View ${left.name}`, categorySlug: left.categorySlug, productId: left.id },
          { label: `View ${right.name}`, categorySlug: right.categorySlug, productId: right.id },
        ],
        state: {
          ...state,
          lastIntent: 'machine',
          lastMachineId: left.id,
          lastCategorySlug: left.categorySlug,
          lastQuery: query,
        },
      };
    }
  }

  if (state.lastMachineId && hasAny(normalized, ['similar', 'related', 'alternative', 'recommendation', 'recommend'])) {
    const previousMachine = machineById(state.lastMachineId);
    if (previousMachine) {
      const related = recommendMachines(previousMachine, indexedMachines, 4).map((item) => item.machine);
      return {
        text: `Related options for ${previousMachine.name}: ${related.map((machine) => machine.name).join(', ')}.`,
        suggestions: related.map((machine) => ({
          label: machine.name,
          categorySlug: machine.categorySlug,
          productId: machine.id,
        })),
        state: {
          ...state,
          lastIntent: 'machine',
          lastMachineId: previousMachine.id,
          lastCategorySlug: previousMachine.categorySlug,
          lastQuery: query,
        },
      };
    }
  }

  if (state.lastMachineId && hasAny(normalized, ['more', 'details', 'spec', 'specification', 'features', 'sizes', 'application', 'use case'])) {
    const machine = machineById(state.lastMachineId);
    if (machine) {
      return {
        text: formatMachineResponse(machine),
        suggestions: suggestionsForMachine(machine),
        state: {
          ...state,
          lastIntent: 'machine',
          lastMachineId: machine.id,
          lastCategorySlug: machine.categorySlug,
          lastQuery: query,
        },
      };
    }
  }

  const categoryEntry = Object.entries(categoryKeywords).find(([, terms]) => hasAny(normalized, terms));
  if (categoryEntry && hasAny(normalized, ['show', 'list', 'open', 'machines', 'options', 'range', 'category'])) {
    const category = productCategories.find((item) => item.slug === categoryEntry[0]);
    if (category) {
      return {
        text: `${category.name} includes ${category.products.length} listed machines. Strong starting points include ${category.products
          .slice(0, 5)
          .map((product) => product.name)
          .join(', ')}.`,
        suggestions: [
          { label: `Open ${category.name}`, categorySlug: category.slug },
          ...category.products.slice(0, 3).map((product) => ({
            label: product.name,
            categorySlug: category.slug,
            productId: product.id,
          })),
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

  if (hasAny(normalized, ['best', 'suggest', 'which machine'])) {
    const shortlisted = searchMachines(query, indexedMachines, 4);
    if (shortlisted.length > 0) {
      return {
        text: `Shortlisted options based on your request: ${shortlisted.map((item) => item.machine.name).join(', ')}.`,
        suggestions: shortlisted.map((item) => ({
          label: item.machine.name,
          categorySlug: item.machine.categorySlug,
          productId: item.machine.id,
        })),
        state: { ...state, lastIntent: 'general', lastQuery: query },
      };
    }

    return {
      text: 'Share the machine type, use case, size range, or category. Example: “Need rigid box machine options” or “Need 24 inch laminator options”.',
      suggestions: [
        { label: 'Need rigid box machine options' },
        { label: 'Need 24 inch laminator options' },
        { label: 'Show Corrugation machines', categorySlug: 'corrugation' },
      ],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  const matches = searchMachines(query, indexedMachines, 6);
  if (matches.length > 0) {
    const top = matches[0].machine;

    if (matches[0].score > 105) {
      const related = recommendMachines(top, indexedMachines, 3).map((item) => item.machine);

      return {
        text: `${formatMachineResponse(top)}\nRelated options: ${related.map((machine) => machine.name).join(', ')}.`,
        suggestions: [
          ...suggestionsForMachine(top),
          ...related.map((machine) => ({
            label: machine.name,
            categorySlug: machine.categorySlug,
            productId: machine.id,
          })),
        ].slice(0, 6),
        state: {
          ...state,
          lastIntent: 'machine',
          lastMachineId: top.id,
          lastCategorySlug: top.categorySlug,
          lastQuery: query,
        },
      };
    }

    return {
      text: 'I found relevant Sai Enterprises machines for that requirement. Choose one to open the preview and move into an enquiry if it fits.',
      suggestions: matches.map((item) => ({
        label: `${item.machine.name} (${item.machine.categoryName})`,
        categorySlug: item.machine.categorySlug,
        productId: item.machine.id,
      })),
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['joke', 'funny', 'movie', 'song', 'weather', 'love'])) {
    return {
      text: 'I’m focused on Sai Enterprises machines, brochure guidance, office network visibility, and enquiry support. Ask by product, workflow, size, category, or support requirement.',
      suggestions: [
        { label: 'Open Machinery', route: 'machinery' },
        { label: 'Open E-Brochure', route: 'brochure' },
        { label: 'Go to Contact Page', route: 'contact' },
      ],
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  return {
    text: 'No reliable catalogue match found yet. Try a machine name, category, size, brand, brochure request, or a query like “compare HPM cutter vs digital cutter”.',
    suggestions: [
      { label: 'Open Machinery', route: 'machinery' },
      { label: 'Show HPM paper cutters', categorySlug: 'post-press' },
      { label: 'Open E-Brochure', route: 'brochure' },
      { label: 'Go to Contact Page', route: 'contact' },
    ],
    state: { ...state, lastIntent: 'general', lastQuery: query },
  };
};
