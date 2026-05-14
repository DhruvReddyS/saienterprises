import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { type ChatbotSessionState, type ChatbotSuggestion } from '@/lib/chatbotEngine';
import { getChatbotRAGReply } from '@/lib/chatbotRAG';

// Browser Speech Recognition shim
const SpeechRecognition =
  (window as typeof window & { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition })
    .SpeechRecognition ??
  (window as typeof window & { webkitSpeechRecognition?: typeof window.SpeechRecognition })
    .webkitSpeechRecognition ??
  null;

type Msg = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  suggestions?: ChatbotSuggestion[];
  ts: Date;
};

const WELCOME: Msg = {
  id: 'welcome',
  role: 'bot',
  ts: new Date(),
  text: "Hi! I'm Sai Enterprises' sales assistant.\n\nTell me what you're producing and I'll recommend the right machine — or ask me to compare any two machines and I'll give you an honest breakdown.",
  suggestions: [
    { label: 'Machine for book finishing' },
    { label: 'Machine for carton packaging' },
    { label: 'Compare HPM cutter vs trimmer' },
    { label: 'Talk to sales', route: 'contact' },
  ],
};

const STARTERS = [
  'Best machine for my print shop',
  'Compare laminator options',
  'HPM cutter which size?',
  'Complete post-press line',
];

const fmt = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const TypingDots = () => (
  <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', padding: '2px 0' }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'rgba(96,165,250,0.7)',
          display: 'inline-block',
          animation: `dot-bounce 1.2s ease-in-out ${i * 0.16}s infinite`,
        }}
      />
    ))}
  </span>
);

const BotIcon = () => (
  <div style={{
    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
    background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
    border: '1px solid rgba(96,165,250,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
  }}>
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4l1.6 4.8L18.4 10.4l-4.8 1.6L12 16.8l-1.6-4.8L5.6 10.4l4.8-1.6L12 4z" fill="white" />
    </svg>
  </div>
);

const ChatbotWidget = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [state, setState] = useState<ChatbotSessionState>({});
  const [responding, setResponding] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, [open, msgs, responding]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text || responding) return;

    setMsgs(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', text, ts: new Date() }]);
    setInput('');
    setResponding(true);

    try {
      const reply = await getChatbotRAGReply(text, state);
      setMsgs(prev => [...prev, {
        id: `b-${Date.now()}`, role: 'bot',
        text: reply.text, suggestions: reply.suggestions, ts: new Date(),
      }]);
      setState(reply.state ?? state);
    } finally {
      setResponding(false);
    }
  }, [responding, state]);

  const handleSuggestion = useCallback((s: ChatbotSuggestion) => {
    if (s.contactMachine && s.route === 'contact') {
      navigate(`/contact?${new URLSearchParams({ category: s.contactCategory ?? '', machine: s.contactMachine, message: s.contactMessage ?? '' })}`);
      setOpen(false); return;
    }
    if (s.productId && s.categorySlug) { navigate(`/machinery/${s.categorySlug}?preview=${s.productId}`); setOpen(false); return; }
    if (s.categorySlug) { navigate(`/machinery/${s.categorySlug}`); setOpen(false); return; }
    const routes: Record<string, string> = { contact: '/contact', machinery: '/machinery', partners: '/partners', about: '/about', brochure: '/brochure' };
    if (s.route && routes[s.route]) { navigate(routes[s.route]); setOpen(false); return; }
    send(s.label);
  }, [navigate, send]);

  const toggleVoice = useCallback(() => {
    if (!SpeechRecognition) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-IN';
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.continuous = false;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);

    rec.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join('');
      setInput(transcript);
      if (e.results[e.results.length - 1].isFinal) {
        rec.stop();
      }
    };

    recognitionRef.current = rec;
    rec.start();
  }, [listening]);

  const visibleMsgs = msgs.slice(-30);
  const lastBotId = [...visibleMsgs].reverse().find(m => m.role === 'bot')?.id;
  const isMultiLine = input.includes('\n') || input.length > 80;

  return (
    <>
      <style>{`
        @keyframes dot-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes bot-ping {
          0%, 100% { transform: scale(1); opacity: 0.18; }
          50% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes mic-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
        }
        .sai-chat-scroll::-webkit-scrollbar { width: 4px; }
        .sai-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .sai-chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      {/* Floating button */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 500 }}>
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute', bottom: 72, right: 0,
                width: 'min(90vw, 380px)',
                background: 'linear-gradient(160deg, rgba(8,14,26,0.97) 0%, rgba(6,10,18,0.99) 100%)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 20,
                boxShadow: '0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(96,165,250,0.06)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '14px 16px 12px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(255,255,255,0.025)',
              }}>
                <BotIcon />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13.5, fontWeight: 700, color: '#fff', lineHeight: 1.2,
                  }}>
                    Sai Enterprises
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 6px #22c55e',
                      display: 'inline-block',
                    }} />
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em',
                    }}>
                      AI Assistant · Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => { setMsgs([WELCOME]); setState({}); setInput(''); }}
                  title="Reset chat"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.28)', padding: '4px 6px',
                    fontSize: 10, fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
                >
                  Reset
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer',
                    width: 28, height: 28, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)', transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Quick starters — only if no user messages yet */}
              {msgs.length <= 1 && (
                <div style={{
                  padding: '10px 12px 8px',
                  display: 'flex', flexWrap: 'wrap', gap: 6,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {STARTERS.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 20, padding: '5px 11px',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11, color: 'rgba(255,255,255,0.6)',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.15)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.color = '#93c5fd'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              <div
                ref={scrollRef}
                className="sai-chat-scroll"
                style={{
                  flex: 1, overflowY: 'auto',
                  padding: '14px 12px',
                  display: 'flex', flexDirection: 'column', gap: 12,
                  maxHeight: '42vh', minHeight: 120,
                }}
              >
                {visibleMsgs.map((msg, idx) => {
                  const isUser = msg.role === 'user';
                  const showSuggestions = !isUser && msg.id === lastBotId && msg.suggestions && msg.suggestions.length > 0;

                  return (
                    <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flexDirection: isUser ? 'row-reverse' : 'row' }}>
                        {!isUser && idx === 0 || (!isUser && visibleMsgs[idx - 1]?.role === 'user') ? <BotIcon /> : <div style={{ width: 32 }} />}
                        <div style={{
                          maxWidth: '80%',
                          padding: '10px 14px',
                          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          background: isUser
                            ? 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)'
                            : 'rgba(255,255,255,0.06)',
                          border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13, lineHeight: 1.6,
                          color: isUser ? '#fff' : 'rgba(255,255,255,0.88)',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          boxShadow: isUser ? '0 6px 20px rgba(37,99,235,0.25)' : 'none',
                        }}>
                          {msg.text}
                        </div>
                      </div>

                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9.5, color: 'rgba(255,255,255,0.2)',
                        paddingInline: isUser ? 4 : 40,
                        letterSpacing: '0.03em',
                      }}>
                        {fmt(msg.ts)}
                      </div>

                      {showSuggestions && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 40, marginTop: 2 }}>
                          {msg.suggestions!.map(s => (
                            <button
                              key={s.label}
                              onClick={() => handleSuggestion(s)}
                              style={{
                                background: 'rgba(59,130,246,0.08)',
                                border: '1px solid rgba(59,130,246,0.25)',
                                borderRadius: 20, padding: '5px 12px',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 11, color: '#93c5fd',
                                cursor: 'pointer', transition: 'all 0.15s',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#2563eb'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.08)'; e.currentTarget.style.color = '#93c5fd'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; }}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {responding && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    <BotIcon />
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: '16px 16px 16px 4px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{
                padding: '10px 12px 12px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(0,0,0,0.2)',
              }}>
                <div style={{
                  display: 'flex', alignItems: isMultiLine ? 'flex-end' : 'center', gap: 8,
                  background: 'rgba(255,255,255,0.055)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14, padding: '8px 8px 8px 14px',
                  transition: 'border-color 0.15s',
                }}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value.slice(0, 1000))}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
                    }}
                    onFocus={e => (e.currentTarget.closest('div')!.style.borderColor = 'rgba(96,165,250,0.4)')}
                    onBlur={e => (e.currentTarget.closest('div')!.style.borderColor = 'rgba(255,255,255,0.1)')}
                    rows={1}
                    placeholder="Ask about machines, pricing, installation..."
                    style={{
                      flex: 1, background: 'none', border: 'none', outline: 'none', resize: 'none',
                      fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                      color: 'rgba(255,255,255,0.88)', lineHeight: 1.5,
                      minHeight: 22, maxHeight: 100,
                      scrollbarWidth: 'none',
                    }}
                  />
                  {SpeechRecognition && (
                    <button
                      onClick={toggleVoice}
                      title={listening ? 'Stop listening' : 'Voice input'}
                      style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                        background: listening ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.07)',
                        border: listening ? '1px solid rgba(239,68,68,0.45)' : '1px solid transparent',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s, border-color 0.2s',
                        animation: listening ? 'mic-pulse 1.2s ease-in-out infinite' : 'none',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="9" y="2" width="6" height="11" rx="3"
                          stroke={listening ? '#f87171' : 'rgba(255,255,255,0.45)'} strokeWidth="2"/>
                        <path d="M5 10a7 7 0 0014 0" stroke={listening ? '#f87171' : 'rgba(255,255,255,0.45)'} strokeWidth="2" strokeLinecap="round"/>
                        <line x1="12" y1="17" x2="12" y2="21" stroke={listening ? '#f87171' : 'rgba(255,255,255,0.45)'} strokeWidth="2" strokeLinecap="round"/>
                        <line x1="9" y1="21" x2="15" y2="21" stroke={listening ? '#f87171' : 'rgba(255,255,255,0.45)'} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}

                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim() || responding}
                    style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      background: input.trim() && !responding
                        ? 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)'
                        : 'rgba(255,255,255,0.07)',
                      border: 'none', cursor: input.trim() && !responding ? 'pointer' : 'default',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s, transform 0.15s',
                      boxShadow: input.trim() && !responding ? '0 4px 12px rgba(37,99,235,0.35)' : 'none',
                    }}
                    onMouseEnter={e => { if (input.trim() && !responding) e.currentTarget.style.transform = 'scale(1.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke={input.trim() && !responding ? 'white' : 'rgba(255,255,255,0.25)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 9.5,
                  color: listening ? '#f87171' : 'rgba(255,255,255,0.18)',
                  textAlign: 'center', marginTop: 7, letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                }}>
                  {listening ? '🎤 Listening… speak now' : 'Enter to send · Shift+Enter for new line'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger button */}
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: open
              ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
              : 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
            border: '2px solid rgba(255,255,255,0.15)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            boxShadow: open
              ? '0 4px 20px rgba(0,0,0,0.4)'
              : '0 4px 24px rgba(37,99,235,0.5)',
            transition: 'background 0.25s, box-shadow 0.25s',
          }}
        >
          {!open && (
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: '#3b82f6',
              animation: 'bot-ping 2.5s ease-out infinite',
            }} />
          )}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </motion.svg>
            ) : (
              <motion.svg key="bot" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="8" width="18" height="12" rx="3" stroke="white" strokeWidth="1.8"/>
                <circle cx="9" cy="14" r="1.5" fill="white"/>
                <circle cx="15" cy="14" r="1.5" fill="white"/>
                <path d="M8 8V6a4 4 0 018 0v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M12 2v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
};

export default ChatbotWidget;
