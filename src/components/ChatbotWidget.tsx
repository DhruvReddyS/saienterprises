import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { type ChatbotSessionState, type ChatbotSuggestion, getChatbotReply } from '@/lib/chatbotEngine';
import saiLogo from '@/assets/sai-logo-cmyk.png';

type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  suggestions?: ChatbotSuggestion[];
  timestamp: Date;
};

const initialMessage: ChatMessage = {
  id: 'bot-welcome',
  role: 'bot',
  timestamp: new Date(),
  text: "Hello! I'm Sai Enterprises Assistant — your graphic machinery guide. I can help you shortlist machines, get HPM guidance, plan installations, or connect you with our sales team.",
  suggestions: [
    { label: 'Suggest machines for my unit', route: 'machinery' },
    { label: 'HPM paper cutters', categorySlug: 'post-press' },
    { label: 'Corrugation machines', categorySlug: 'corrugation' },
    { label: 'Talk to sales', route: 'contact' },
  ],
};

const STARTERS = ['Suggest machines for a new unit', 'HPM paper cutter sizes', 'Post-press finishing line', 'Contact the team'];

const fmt = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const TypingDots = () => (
  <div style={{ display: 'flex', gap: 4, padding: '2px 0', alignItems: 'center' }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{
        display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
        background: '#3B82F6',
        animation: `tdot 1.2s ease-in-out ${i * 0.18}s infinite`,
      }} />
    ))}
  </div>
);

const BotAvatar = ({ size = 28 }: { size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(37,99,235,0.35)',
  }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4.5l1.8 5.1 5.1 1.8-5.1 1.8-1.8 5.1-1.8-5.1-5.1-1.8 5.1-1.8L12 4.5z" fill="white" />
    </svg>
  </div>
);

const ChatbotWidget = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [sessionState, setSessionState] = useState<ChatbotSessionState>({});
  const [responding, setResponding] = useState(false);

  /* Auto-scroll */
  useEffect(() => {
    if (!isOpen || minimized) return;
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, [isOpen, minimized, messages, responding]);

  /* Focus */
  useEffect(() => {
    if (isOpen && !minimized) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen, minimized]);

  const sendMsg = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text || responding) return;
    setMessages((p) => [...p, { id: `u-${Date.now()}`, role: 'user', text, timestamp: new Date() }]);
    setInput('');
    setResponding(true);
    setTimeout(() => {
      const reply = getChatbotReply(text, sessionState);
      setMessages((p) => [...p, { id: `b-${Date.now()}`, role: 'bot', text: reply.text, suggestions: reply.suggestions, timestamp: new Date() }]);
      setSessionState(reply.state ?? sessionState);
      setResponding(false);
    }, 450 + Math.random() * 350);
  }, [responding, sessionState]);

  const handleSuggestion = useCallback((s: ChatbotSuggestion) => {
    if (s.contactMachine && s.route === 'contact') {
      navigate(`/contact?${new URLSearchParams({ category: s.contactCategory ?? '', machine: s.contactMachine, message: s.contactMessage ?? '' }).toString()}`);
      setIsOpen(false); return;
    }
    if (s.productId && s.categorySlug) { navigate(`/machinery/${s.categorySlug}?preview=${s.productId}`); setIsOpen(false); return; }
    if (s.categorySlug) { navigate(`/machinery/${s.categorySlug}`); setIsOpen(false); return; }
    const routes: Record<string, string> = { contact: '/contact', machinery: '/machinery', partners: '/partners', about: '/about', brochure: '/brochure' };
    if (s.route && routes[s.route]) { navigate(routes[s.route]); setIsOpen(false); return; }
    sendMsg(s.label);
  }, [navigate, sendMsg]);

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(input); }
  };

  const msgs = useMemo(() => messages.slice(-30), [messages]);
  const lastBot = msgs.filter((m) => m.role === 'bot').at(-1);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Open Sai Enterprises Assistant"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 490,
          width: 56, height: 56,
          background: isOpen ? '#fff' : 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
          border: isOpen ? '1.5px solid rgba(0,0,0,0.12)' : 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%',
          boxShadow: isOpen
            ? '0 4px 20px rgba(0,0,0,0.15)'
            : '0 8px 28px rgba(29,78,216,0.4), 0 2px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#060A10" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 4.5l1.8 5.1 5.1 1.8-5.1 1.8-1.8 5.1-1.8-5.1-5.1-1.8 5.1-1.8L12 4.5z" fill="white" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div style={{
          position: 'fixed', right: 24, bottom: 92,
          zIndex: 500, width: 'min(94vw, 400px)',
          height: minimized ? 56 : 'min(82vh, 580px)',
          display: 'flex', flexDirection: 'column',
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          transition: 'height 0.35s cubic-bezier(0.16,1,0.3,1)',
          animation: 'copen 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1E3A5F 0%, #0F2040 100%)',
            padding: '14px 16px',
            flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Sai logo + status */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 6,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  }}>
                    <img src={saiLogo} alt="Sai Enterprises" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <span style={{
                    position: 'absolute', bottom: -1, right: -1,
                    width: 9, height: 9, borderRadius: '50%',
                    background: '#22C55E', border: '1.5px solid #0F2040',
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Sai Enterprises</div>
                  <div style={{ fontSize: 9, color: '#86EFAC', display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                    Online · Machinery Expert
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { icon: minimized ? '▲' : '▼', title: 'Toggle', action: () => setMinimized((m) => !m) },
                  { icon: '↺', title: 'Reset', action: () => { setMessages([initialMessage]); setSessionState({}); setInput(''); setResponding(false); } },
                  { icon: '✕', title: 'Close', action: () => setIsOpen(false) },
                ].map((b) => (
                  <button key={b.title} onClick={b.action} title={b.title} style={{
                    width: 26, height: 26, background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
                    borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)', fontSize: 11,
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.16)'; el.style.color = '#fff'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {b.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick starters */}
            {!minimized && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {STARTERS.map((p) => (
                  <button key={p} onClick={() => sendMsg(p)} style={{
                    fontSize: 10, padding: '5px 10px',
                    background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                    borderRadius: 99,
                  }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.18)'; el.style.color = '#fff'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.09)'; el.style.color = 'rgba(255,255,255,0.7)'; }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messages */}
          {!minimized && (
            <>
              <div ref={scrollRef} style={{
                flex: 1, overflowY: 'auto', padding: '16px 14px',
                display: 'flex', flexDirection: 'column', gap: 14,
                scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.08) transparent',
                background: '#F8FAFC',
              }}>
                {msgs.map((msg, idx) => {
                  const isUser = msg.role === 'user';
                  const isLastBot = !isUser && idx === msgs.length - 1;
                  return (
                    <div key={msg.id} style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-end' }}>
                      {!isUser && <BotAvatar size={26} />}
                      <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                          background: isUser
                            ? 'linear-gradient(135deg, #1D4ED8, #3B82F6)'
                            : '#fff',
                          border: isUser ? 'none' : '1px solid rgba(0,0,0,0.07)',
                          padding: '10px 13px',
                          fontSize: 13, lineHeight: 1.65,
                          color: isUser ? '#fff' : '#111827',
                          boxShadow: isUser ? '0 2px 12px rgba(29,78,216,0.2)' : '0 1px 4px rgba(0,0,0,0.05)',
                          whiteSpace: 'pre-wrap',
                          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        }}>
                          {msg.text}
                        </div>
                        <div style={{ fontSize: 9, color: 'rgba(0,0,0,0.25)', letterSpacing: '0.04em' }}>
                          {fmt(msg.timestamp)}
                        </div>
                        {isLastBot && msg.suggestions && msg.suggestions.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
                            {msg.suggestions.map((s) => (
                              <button key={s.label} onClick={() => handleSuggestion(s)} style={{
                                fontSize: 10, padding: '6px 11px',
                                background: '#fff', border: '1px solid rgba(29,78,216,0.25)',
                                color: '#1D4ED8', cursor: 'pointer', transition: 'all 0.2s',
                                borderRadius: 99, fontWeight: 600,
                              }}
                                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#1D4ED8'; el.style.color = '#fff'; el.style.borderColor = '#1D4ED8'; }}
                                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = '#fff'; el.style.color = '#1D4ED8'; el.style.borderColor = 'rgba(29,78,216,0.25)'; }}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {responding && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                    <BotAvatar size={26} />
                    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', padding: '10px 13px', borderRadius: '14px 14px 14px 4px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{
                borderTop: '1px solid rgba(0,0,0,0.07)', background: '#fff',
                padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0,
              }}>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'flex-end', gap: 8,
                  background: '#F1F5F9',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 12,
                  padding: '7px 8px 7px 12px',
                }}>
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                    }}
                    onKeyDown={onKey}
                    placeholder="Ask about machines, sizes, enquiries…"
                    style={{
                      flex: 1, background: 'transparent', border: 'none',
                      fontSize: 13, color: '#111827', outline: 'none',
                      padding: '5px 0', resize: 'none', overflow: 'hidden',
                      lineHeight: 1.5, minHeight: 28,
                    }}
                  />
                  <button
                    onClick={() => sendMsg(input)}
                    disabled={!input.trim() || responding}
                    style={{
                      width: 32, height: 32, flexShrink: 0,
                      background: input.trim() && !responding ? 'linear-gradient(135deg, #1D4ED8, #3B82F6)' : '#E2E8F0',
                      border: 'none', cursor: input.trim() && !responding ? 'pointer' : 'default',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                      borderRadius: '50%',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !responding ? '#fff' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div style={{
                padding: '5px 12px 8px', background: '#fff',
                fontSize: 9, color: 'rgba(0,0,0,0.25)', textAlign: 'center', letterSpacing: '0.04em',
                borderTop: '1px solid rgba(0,0,0,0.04)',
              }}>
                Sai Enterprises Assistant · Machinery guidance · Not a substitute for direct sales
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes copen { from { opacity:0; transform:translateY(12px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes tdot { 0%,60%,100% { transform:translateY(0); opacity:0.4; } 30% { transform:translateY(-5px); opacity:1; } }
      `}</style>
    </>
  );
};

export default ChatbotWidget;
