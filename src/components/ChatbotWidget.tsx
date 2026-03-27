import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChatbotSessionState, ChatbotSuggestion, getChatbotReply } from '@/lib/chatbotEngine';

type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  suggestions?: ChatbotSuggestion[];
};

const starterPrompts = [
  'Show Post-Press machines',
  'Need 24 inch laminator options',
  'Compare HPM cutter vs digital cutter',
  'Best machine for book finishing',
  'Contact details',
  'Global office locations',
];

const initialMessage: ChatMessage = {
  id: 'bot-welcome',
  role: 'bot',
  text:
    'Hello. I am Sai Enterprises assistant. Ask me about machines, specifications, categories, locations, partners, or contact details.',
  suggestions: [
    { label: 'Show Post-Press machines', categorySlug: 'post-press' },
    { label: 'Show Corrugation machines', categorySlug: 'corrugation' },
    { label: 'Contact details' },
  ],
};

const ChatbotWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [sessionState, setSessionState] = useState<ChatbotSessionState>({});
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
      }
    });
  };

  const sendUserMessage = (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    };

    const reply = getChatbotReply(text, sessionState);
    const botMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      role: 'bot',
      text: reply.text,
      suggestions: reply.suggestions,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setSessionState(reply.state ?? sessionState);
    setInput('');
    scrollToBottom();
  };

  const handleSuggestionClick = (suggestion: ChatbotSuggestion) => {
    if (suggestion.productId && suggestion.categorySlug) {
      navigate(`/machinery/${suggestion.categorySlug}/${suggestion.productId}`);
      setIsOpen(false);
      return;
    }

    if (suggestion.categorySlug) {
      navigate(`/machinery/${suggestion.categorySlug}`);
      setIsOpen(false);
      return;
    }

    const normalized = suggestion.label.toLowerCase();
    if (normalized.includes('contact')) {
      navigate('/contact');
      setIsOpen(false);
      return;
    }

    if (normalized.includes('partner')) {
      navigate('/partners');
      setIsOpen(false);
      return;
    }

    if (normalized.includes('brochure') || normalized.includes('catalogue') || normalized.includes('catalog')) {
      navigate('/brochure');
      setIsOpen(false);
      return;
    }

    if (normalized.includes('machinery') || normalized.includes('machine')) {
      navigate('/machinery');
      setIsOpen(false);
      return;
    }

    sendUserMessage(suggestion.label);
  };

  const visibleMessages = useMemo(() => messages.slice(-16), [messages]);

  const handleReset = () => {
    setMessages([initialMessage]);
    setSessionState({});
    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[120] w-[min(92vw,420px)] overflow-hidden rounded-2xl border border-border/70 bg-background/95 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-border/70 bg-secondary/30 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-serif text-lg leading-tight text-foreground">Sai Assistant</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Advanced Offline Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div ref={scrollerRef} className="max-h-[55vh] space-y-3 overflow-y-auto p-4">
              {visibleMessages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-foreground rounded-bl-md'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {visibleMessages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendUserMessage(prompt)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground hover:border-primary/40 hover:text-primary"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {visibleMessages.length > 0 && visibleMessages[visibleMessages.length - 1].suggestions?.length ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {visibleMessages[visibleMessages.length - 1].suggestions?.slice(0, 6).map((suggestion) => (
                    <button
                      key={suggestion.label}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground hover:border-primary/40 hover:text-primary"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendUserMessage(input);
              }}
              className="border-t border-border/70 p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about machines, specs, features, locations..."
                  className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.3, type: 'spring', stiffness: 220 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-[121] inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-[0_18px_50px_-20px_rgba(0,0,0,0.55)]"
        aria-label="Open chatbot"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </motion.button>
    </>
  );
};

export default ChatbotWidget;
