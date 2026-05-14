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
  const leftSize = left.sizes?.slice(0, 2).join(', ') || 'sizes on request';
  const rightSize = right.sizes?.slice(0, 2).join(', ') || 'sizes on request';
  const leftFeatures = left.features?.slice(0, 2).join(', ') || '';
  const rightFeatures = right.features?.slice(0, 2).join(', ') || '';
  const leftApps = left.applications?.slice(0, 2).join(', ') || '';
  const rightApps = right.applications?.slice(0, 2).join(', ') || '';

  const lines = [
    `Here's a quick comparison to help you decide:`,
    ``,
    `${left.name}`,
    `  Brand: ${left.resolvedBrand} · Category: ${left.categoryName}`,
    `  Sizes: ${leftSize}`,
    ...(leftFeatures ? [`  Key features: ${leftFeatures}`] : []),
    ...(leftApps ? [`  Best for: ${leftApps}`] : []),
    ``,
    `${right.name}`,
    `  Brand: ${right.resolvedBrand} · Category: ${right.categoryName}`,
    `  Sizes: ${rightSize}`,
    ...(rightFeatures ? [`  Key features: ${rightFeatures}`] : []),
    ...(rightApps ? [`  Best for: ${rightApps}`] : []),
    ``,
    left.categorySlug === right.categorySlug
      ? `Both are in the same category — the right pick depends on your production volume and size requirement. Want to enquire about either?`
      : `These serve different stages of your workflow — ${left.name} for ${left.categoryName.toLowerCase()} work, ${right.name} for ${right.categoryName.toLowerCase()} work. Want me to suggest which fits your setup?`,
  ];

  return lines.join('\n');
};

const useCaseMap: Array<{ keywords: string[]; categorySlug: string; reply: string }> = [
  {
    keywords: ['book', 'booklet', 'notebook', 'diary', 'publishing', 'perfect bind', 'hardcover', 'softcover'],
    categorySlug: 'post-press',
    reply: 'For book/publishing work, I\'d recommend looking at our Perfect Binder, Three Knife Trimmer, and Sewing Machine. These three form a complete book finishing line. The Perfect Binder handles spines up to 70mm and runs at 700 books/hour — solid for most print shops.',
  },
  {
    keywords: ['carton', 'box making', 'packaging', 'corrugated', 'flute', 'rigid box'],
    categorySlug: 'corrugation',
    reply: 'For packaging and box work, it depends on the board type. For corrugated cartons, our Double Profile Paper Corrugation Machine with a Flute Laminator is the standard setup. For premium rigid boxes (gift boxes, product packaging), our Automatic Rigid Box Making Machine with Corner Pasting Machine is the right fit.',
  },
  {
    keywords: ['lamination', 'laminating', 'gloss', 'matte', 'pouch', 'cover lamination'],
    categorySlug: 'post-press',
    reply: 'For lamination, we offer Thermal & Water Base Laminators in 24" and 32" sizes. For high-volume cover lamination, the 32" with sheeter attachment is the best choice. If you do both thermal and water-base jobs, I\'d recommend the combo model — more flexibility.',
  },
  {
    keywords: ['ctp', 'plate making', 'pre press', 'prepress', 'ctcp', 'plate exposure'],
    categorySlug: 'pre-press',
    reply: 'For plate making, we stock CTP (Computer-to-Plate) in Violet and Thermal variants as well as the Fully Automatic CTCP which works with conventional plates — no special plate cost. If you\'re already on conventional workflow, CTCP is the more economical upgrade path.',
  },
  {
    keywords: ['cutting', 'paper cutter', 'trim', 'stack cutter', 'hpm'],
    categorySlug: 'post-press',
    reply: 'For paper cutting, we\'re the sole HPM agent in India — 490+ HPM cutters placed across the country. The HPM Programmable Paper Cutter comes in sizes from 920mm to 1880mm. Most print shops go with the 920mm or 1150mm. The 26" heavy-duty digital variant is great for smaller setups.',
  },
  {
    keywords: ['wire o', 'spiral binding', 'coil binding', 'punch bind'],
    categorySlug: 'post-press',
    reply: 'For wire-o and spiral binding, we have the Automatic Wire-O Binding Machine and Automatic Spiral Binding Machine. The wire-o is better for corporate documents and catalogues — cleaner look. Spiral is faster for high-volume notebooks. Want to know which size fits your sheet size?',
  },
  {
    keywords: ['uv coating', 'spot uv', 'aqua coat', 'varnish', 'gloss finish'],
    categorySlug: 'post-press',
    reply: 'For UV/coating, our UV/Aqua Coater with Dryer comes in 24", 30", and 32" widths. It supports both UV and IR drying. For spot UV on packaging, the Two Color UV Conversion unit is the right add-on. Most shops pair this with a laminator for a full finishing line.',
  },
  {
    keywords: ['foil', 'hot foil', 'stamping', 'gold foil', 'emboss'],
    categorySlug: 'post-press',
    reply: 'For foil stamping and embossing, we have the Hot Foil Stamping Machine (300×350mm plate, up to 100mm job height) and the Die Punching unit with optional hot foil. If you\'re doing high-end packaging or stationery, these two together cover most premium finishing needs.',
  },
  {
    keywords: ['offset press', 'sheet fed', 'printing press', 'heidelberg', 'komori'],
    categorySlug: 'press',
    reply: 'For offset presses, we deal in Heidelberg, Komori, and manroland — new and pre-owned. For entry-level, the Mini Offset 16"×22" is a solid starter. For commercial printing at scale, a used Heidelberg or Komori is often the most cost-effective route. What sheet size and colour count are you targeting?',
  },
];

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

  // Use-case detection — salesman-style recommendation
  const useCaseMatch = useCaseMap.find(({ keywords }) => hasAny(normalized, keywords));
  if (useCaseMatch && hasAny(normalized, ['need', 'want', 'looking', 'suggest', 'recommend', 'best', 'for my', 'for our', 'which', 'what machine', 'machine for', 'use case', 'usecase', 'setup', 'unit', 'plant', 'workshop', 'production'])) {
    const category = productCategories.find((c) => c.slug === useCaseMatch.categorySlug);
    return {
      text: useCaseMatch.reply,
      suggestions: [
        ...(category ? [{ label: `Browse ${category.name}`, categorySlug: category.slug }] : []),
        { label: 'Get a Quote', route: 'contact' as const },
        ...(category ? category.products.slice(0, 2).map((p) => ({ label: p.name, categorySlug: category.slug, productId: p.id })) : []),
      ].slice(0, 4),
      state: { ...state, lastIntent: 'general', lastQuery: query },
    };
  }

  if (hasAny(normalized, ['best', 'suggest', 'which machine', 'recommend', 'what should i', 'help me choose'])) {
    const shortlisted = searchMachines(query, indexedMachines, 4);
    if (shortlisted.length > 0) {
      const top = shortlisted[0].machine;
      return {
        text: `Based on your query, here are the best matches from our catalogue:\n${shortlisted.map((item, i) => `${i + 1}. ${item.machine.name} (${item.machine.categoryName})`).join('\n')}\n\nI'd start with ${top.name} — it covers the most common requirements for this type of work. Want me to share more details or connect you to our team?`,
        suggestions: shortlisted.map((item) => ({
          label: item.machine.name,
          categorySlug: item.machine.categorySlug,
          productId: item.machine.id,
        })),
        state: { ...state, lastIntent: 'general', lastQuery: query },
      };
    }

    return {
      text: 'Tell me what you\'re trying to produce — the machine type, your workflow stage (pre-press / press / post-press), or a use case like “book finishing” or “carton packaging”. I\'ll give you a specific recommendation.',
      suggestions: [
        { label: 'Machine for book finishing' },
        { label: 'Machine for carton packaging' },
        { label: 'Machine for cover lamination' },
        { label: 'Compare HPM cutter sizes' },
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
