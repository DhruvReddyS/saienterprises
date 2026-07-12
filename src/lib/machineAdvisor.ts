import type { SearchableMachine } from '@/lib/machineSearch';

export type AdvisorRequirements = {
  application?: string;
  volume?: 'starter' | 'medium' | 'high';
  automation?: 'manual' | 'semi-automatic' | 'automatic';
  sheetSize?: string;
  budgetPriority?: 'economy' | 'balanced' | 'premium';
};

const includesAny = (text: string, terms: string[]) => terms.some((term) => text.includes(term));

export const extractAdvisorRequirements = (
  query: string,
  previous: AdvisorRequirements = {},
): AdvisorRequirements => {
  const text = query.toLowerCase();
  const next = { ...previous };

  const applications: Array<[string, string[]]> = [
    ['book and publishing finishing', ['book', 'publishing', 'notebook', 'diary', 'perfect bind']],
    ['corrugated carton production', ['corrugated', 'corrugation', 'flute', 'shipping carton']],
    ['rigid box production', ['rigid box', 'gift box', 'premium box']],
    ['commercial offset printing', ['offset', 'commercial printing', 'sheet fed', 'heidelberg', 'komori']],
    ['paper cutting and trimming', ['paper cutting', 'paper cutter', 'stack cutting', 'trim sheets']],
    ['lamination and coating', ['lamination', 'laminator', 'uv coating', 'aqua coating']],
    ['wire and spiral binding', ['wire o', 'wire-o', 'spiral', 'coil binding']],
    ['plate making', ['ctp', 'ctcp', 'plate making', 'pre press', 'pre-press']],
    ['paper bag and disposable products', ['paper bag', 'paper cup', 'paper plate', 'napkin']],
  ];
  const application = applications.find(([, terms]) => includesAny(text, terms));
  if (application) next.application = application[0];

  if (includesAny(text, ['small volume', 'low volume', 'starter', 'new setup', 'entry level', 'occasional'])) next.volume = 'starter';
  if (includesAny(text, ['medium volume', 'growing', 'regular jobs', 'one shift'])) next.volume = 'medium';
  if (includesAny(text, ['high volume', 'large volume', 'industrial', 'mass production', 'three shift', '24/7'])) next.volume = 'high';

  if (includesAny(text, ['fully automatic', 'automatic line', 'minimum labour', 'minimal labor'])) next.automation = 'automatic';
  else if (includesAny(text, ['semi automatic', 'semi-auto', 'semi auto'])) next.automation = 'semi-automatic';
  else if (includesAny(text, ['manual', 'low investment'])) next.automation = 'manual';

  const size = query.match(/\b\d{2,4}(?:\.\d+)?\s*(?:mm|cm|inch|inches|\")\b/i)?.[0];
  if (size) next.sheetSize = size;

  if (includesAny(text, ['economy', 'budget', 'lowest cost', 'affordable', 'low investment'])) next.budgetPriority = 'economy';
  if (includesAny(text, ['premium', 'best quality', 'top end', 'maximum automation'])) next.budgetPriority = 'premium';
  if (includesAny(text, ['balanced', 'value for money', 'mid range'])) next.budgetPriority = 'balanced';

  return next;
};

export const getAdvisorQuestion = (requirements: AdvisorRequirements) => {
  if (!requirements.application) {
    return 'What do you produce most often: books, commercial print, corrugated cartons, rigid boxes, labels, or another product?';
  }
  if (!requirements.volume) {
    return 'What is your expected production level: starter/low volume, regular medium volume, or high-volume industrial production?';
  }
  if (!requirements.automation) {
    return 'Do you prefer a lower-investment manual setup, semi-automatic operation, or maximum automation with fewer operators?';
  }
  return null;
};

const findByTerms = (machines: SearchableMachine[], terms: string[]) =>
  machines.find((machine) => includesAny(machine.name.toLowerCase(), terms));

export const getWorkflowDependencies = (
  machine: SearchableMachine,
  machines: SearchableMachine[],
): SearchableMachine[] => {
  const name = machine.name.toLowerCase();
  const dependencies: SearchableMachine[] = [];
  const add = (terms: string[]) => {
    const found = findByTerms(machines, terms);
    if (found && found.id !== machine.id && !dependencies.some((item) => item.id === found.id)) dependencies.push(found);
  };

  if (includesAny(name, ['paper cutter', 'cutting machine'])) {
    add(['pile lifter']); add(['pile turner']); add(['knife grinding']);
  } else if (includesAny(name, ['perfect binder', 'binding machine'])) {
    add(['three knife trimmer']); add(['book back rounding']); add(['nipping']);
  } else if (includesAny(name, ['laminator'])) {
    add(['reel to sheet separator']); add(['uv aqua coater']);
  } else if (includesAny(name, ['flute laminator', 'corrugation machine'])) {
    add(['thin blade slitter']); add(['slotter']); add(['box stitching']);
  } else if (includesAny(name, ['rigid box'])) {
    add(['notching']); add(['corner pasting']); add(['board cutter']);
  } else if (includesAny(name, ['wire-o', 'spiral binding'])) {
    add(['power punching']); add(['wire-o closing']);
  } else if (machine.categorySlug === 'press') {
    add(['ctp']); add(['paper cutter']); add(['laminator']);
  }

  return dependencies.slice(0, 3);
};

export const getMachineFaqAnswer = (query: string) => {
  const text = query.toLowerCase();
  if (includesAny(text, ['warranty', 'guarantee'])) {
    return 'Warranty depends on the machine, manufacturer, and whether it is new or pre-owned. Sai Enterprises confirms the exact warranty scope in the commercial quotation before purchase.';
  }
  if (includesAny(text, ['installation', 'commissioning', 'operator training', 'training'])) {
    return 'Sai Enterprises provides installation and commissioning support, followed by operator handover and practical guidance. Site readiness, electrical requirements, and training scope are confirmed for the selected machine.';
  }
  if (includesAny(text, ['service', 'maintenance', 'spare', 'breakdown', 'repair'])) {
    return 'Support includes technical troubleshooting, spare-parts coordination, preventive maintenance, and on-site service where applicable. The recommended maintenance plan depends on machine type and production intensity.';
  }
  if (includesAny(text, ['delivery', 'lead time', 'shipping', 'dispatch'])) {
    return 'Delivery time depends on stock, configuration, manufacturer, and destination. New, configured, and pre-owned machines can have different lead times, so the sales team confirms this with the quotation.';
  }
  if (includesAny(text, ['power', 'electricity', 'electrical', 'space required', 'floor space'])) {
    return 'Power load, phase, compressed-air needs, machine footprint, and access clearance vary by model. Ask about a specific machine and Sai Enterprises will provide the exact site-readiness requirements.';
  }
  if (includesAny(text, ['new or used', 'new vs used', 'pre owned', 'pre-owned', 'second hand'])) {
    return 'New machinery is best for predictable support, current controls, and long-term production. A verified pre-owned press can reduce investment for experienced teams, but condition, impression count, service history, and parts availability must be checked first.';
  }
  if (includesAny(text, ['price', 'pricing', 'cost', 'quotation', 'quote'])) {
    return 'Pricing depends on size, automation, configuration, accessories, freight, installation, and location. The chatbot can shortlist the right model, then the sales team will provide an exact quotation.';
  }
  return null;
};
