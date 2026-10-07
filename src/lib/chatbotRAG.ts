import { getChatbotReply, type ChatbotReply, type ChatbotSessionState } from './chatbotEngine';

/**
 * Keep the advisor catalogue-grounded and entirely client-side. Browser bundles
 * must never contain paid provider keys; an AI rewrite can be added later behind
 * an authenticated, rate-limited server endpoint.
 */
export async function getChatbotRAGReply(
  text: string,
  sessionState: ChatbotSessionState,
): Promise<ChatbotReply> {
  return getChatbotReply(text, sessionState);
}
