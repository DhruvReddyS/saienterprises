import { GoogleGenerativeAI } from '@google/generative-ai';
import { SAI_KNOWLEDGE_BASE } from './saiKnowledgeBase';
import { getChatbotReply, type ChatbotReply, type ChatbotSessionState } from './chatbotEngine';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

// Once rate-limited, stay offline for the rest of the session
let apiLimitReached = false;

const SYSTEM_PROMPT = `You are the Sai Enterprises sales assistant — an expert machinery consultant who helps customers choose the right machine for their production needs. You think and speak like an experienced salesman: understand the customer's use case, recommend the best-fit machine, and guide them towards an enquiry.

${SAI_KNOWLEDGE_BASE}

## HOW TO RESPOND

**For use-case questions** ("I need a machine for X", "What machine for Y", "suggest machine for Z"):
- First understand their workflow / production type
- Recommend 2-3 specific machines from the catalogue that fit best
- For each machine, mention: what it does, why it fits their need, a key feature
- Close with "I'd recommend you enquire about [Machine Name] — want me to help connect you to our team?"

**For comparison questions** ("compare X vs Y", "X vs Y which is better", "difference between X and Y"):
- Give a clear head-to-head comparison
- Format: Machine A → best for [use case], key strength: [feature]. Machine B → best for [use case], key strength: [feature]
- Give a verdict: "For [customer's context], I'd go with [Machine] because [reason]."

**For general product questions**:
- Answer with specific machine names, sizes, and key features from the knowledge base
- Always suggest 1-2 next machines to explore

**Tone rules**:
- Talk like a helpful expert salesman, not a FAQ page
- Be direct — give a clear recommendation, not "it depends"
- Keep responses to 3-5 sentences unless comparing machines
- End with a clear call to action (enquire, view, get quote)
- If asked about pricing, say "Pricing depends on configuration — our team will give you an exact quote"
- Never be off-topic — redirect politely if asked unrelated things`;

const extractMachineNames = (text: string): string[] => {
  const machineKeywords = [
    'cutter', 'laminator', 'binder', 'binding', 'press', 'corrugation',
    'rigid box', 'foil', 'trimmer', 'stitching', 'sewing', 'punching',
    'coating', 'uv coater', 'spiral', 'wire-o', 'ctp', 'ctcp', 'hpm',
    'folding', 'slitting', 'rewinding', 'perfect binder', 'three knife',
  ];
  return machineKeywords.filter(k => text.toLowerCase().includes(k));
};

export async function getChatbotRAGReply(
  text: string,
  sessionState: ChatbotSessionState
): Promise<ChatbotReply> {
  if (!API_KEY || apiLimitReached) {
    return getChatbotReply(text, sessionState);
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(text);
    const replyText = result.response.text();

    const lower = replyText.toLowerCase();
    const foundMachines = extractMachineNames(lower);
    const suggestions: ChatbotReply['suggestions'] = [];

    const categoryMap: Record<string, string> = {
      cutter: 'post-press', laminator: 'post-press', binder: 'post-press',
      binding: 'post-press', trimmer: 'post-press', stitching: 'post-press',
      sewing: 'post-press', punching: 'post-press', coating: 'post-press',
      'uv coater': 'post-press', spiral: 'post-press', 'wire-o': 'post-press',
      'perfect binder': 'post-press', 'three knife': 'post-press', foil: 'post-press',
      'rigid box': 'post-press', press: 'press', hpm: 'post-press',
      corrugation: 'corrugation', ctp: 'pre-press', ctcp: 'pre-press',
    };

    const addedCategories = new Set<string>();
    for (const machine of foundMachines.slice(0, 2)) {
      const cat = categoryMap[machine];
      if (cat && !addedCategories.has(cat)) {
        suggestions.push({ label: `Browse ${cat.replace('-', ' ')} machines`, categorySlug: cat });
        addedCategories.add(cat);
      }
    }

    if (lower.includes('enquir') || lower.includes('contact') || lower.includes('quote') || lower.includes('connect')) {
      suggestions.push({ label: 'Get a Quote', route: 'contact' as const });
    }
    if (suggestions.length === 0) {
      suggestions.push({ label: 'Browse All Machinery', route: 'machinery' as const });
    }

    return { text: replyText, suggestions: suggestions.length > 0 ? suggestions : undefined };
  } catch (error: unknown) {
    const errMsg = (error instanceof Error ? error.message : String(error)).toLowerCase();
    if (
      errMsg.includes('rate') ||
      errMsg.includes('limit') ||
      errMsg.includes('quota') ||
      errMsg.includes('429') ||
      errMsg.includes('503')
    ) {
      apiLimitReached = true;
    }
    return getChatbotReply(text, sessionState);
  }
}
