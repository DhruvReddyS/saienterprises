import React, { useEffect, useRef } from 'react';
import { Paperclip, Link as LinkIcon, Code, Mic, Send, Info, Bot, X } from 'lucide-react';

type ToolbarAction = {
  key: string;
  label: string;
  icon: React.ReactNode;
  hoverColor?: string;
  onClick?: () => void;
};

type QuickAction = {
  label: string;
  onClick: () => void;
};

export interface FloatingAiAssistantProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  onMessageChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  charCount: number;
  maxChars?: number;
  body: React.ReactNode;
  quickActions?: QuickAction[];
  attachmentActions?: ToolbarAction[];
  voiceAction?: () => void;
  footerInfo?: React.ReactNode;
  title?: string;
  statusLabel?: string;
  modelLabel?: string;
  badgeLabel?: string;
  placeholder?: string;
  sendDisabled?: boolean;
  minimized?: boolean;
  onToggleMinimized?: () => void;
  onReset?: () => void;
}

const defaultAttachmentActions: ToolbarAction[] = [
  { key: 'file', label: 'Upload files', icon: <Paperclip className="h-4 w-4" />, hoverColor: '#e2e8f0' },
  { key: 'link', label: 'Web link', icon: <LinkIcon className="h-4 w-4" />, hoverColor: '#f87171' },
  { key: 'code', label: 'Code repo', icon: <Code className="h-4 w-4" />, hoverColor: '#4ade80' },
  {
    key: 'design',
    label: 'Design file',
    hoverColor: '#c084fc',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038H8.148zm7.704 0c-2.476 0-4.49 2.015-4.49 4.49s2.014 4.49 4.49 4.49 4.49-2.015 4.49-4.49-2.014-4.49-4.49-4.49zm0 7.509c-1.665 0-3.019-1.355-3.019-3.019s1.355-3.019 3.019-3.019 3.019 1.354 3.019 3.019-1.354 3.019-3.019 3.019zM8.148 24c-2.476 0-4.49-2.015-4.49-4.49s2.014-4.49 4.49-4.49h4.588V24H8.148zm3.117-1.471V16.49H8.148c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.02 3.019 3.02h3.117z" />
      </svg>
    ),
  },
];

const HoverTool = ({
  label,
  hoverColor,
  children,
  onClick,
}: {
  label: string;
  hoverColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative rounded-lg border-none bg-transparent p-2.5 text-zinc-500 transition-all duration-300 hover:bg-zinc-800/80 hover:scale-105"
    style={{ ['--hover-color' as string]: hoverColor ?? '#e5e7eb' }}
  >
    <span className="transition-all duration-300 group-hover:scale-125 group-hover:text-[var(--hover-color)]">{children}</span>
    <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-zinc-700/50 bg-zinc-900/95 px-3 py-2 text-xs text-zinc-200 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
      {label}
      <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-900/95" />
    </div>
  </button>
);

const FloatingAiAssistant = ({
  isOpen,
  onOpenChange,
  message,
  onMessageChange,
  onSend,
  onKeyDown,
  charCount,
  maxChars = 2000,
  body,
  quickActions = [],
  attachmentActions = defaultAttachmentActions,
  voiceAction,
  footerInfo,
  title = 'AI Assistant',
  statusLabel = 'Online',
  modelLabel = 'Sai AI',
  badgeLabel = 'Live',
  placeholder = 'What would you like to explore today?',
  sendDisabled,
  minimized = false,
  onToggleMinimized,
  onReset,
}: FloatingAiAssistantProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!chatRef.current || !target) return;
      if (!chatRef.current.contains(target) && !target.closest('.floating-ai-button')) {
        onOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOpenChange]);

  return (
    <div className="fixed bottom-6 right-6 z-[500]">
      <button
        className={`floating-ai-button relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        onClick={() => onOpenChange(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.82) 0%, rgba(168,85,247,0.82) 100%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30" />
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="relative z-10">{isOpen ? <X className="h-7 w-7 text-white" /> : <Bot className="h-8 w-8 text-white" />}</div>
        <div className="absolute inset-0 rounded-full animate-ping bg-indigo-500 opacity-20" />
      </button>

      {isOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[min(92vw,500px)] origin-bottom-right"
          style={{ animation: 'popInGlow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
        >
          <div className="relative flex flex-col overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(145deg,rgba(10,18,30,0.88),rgba(12,18,28,0.95))] shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-[30px]">
            <div className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] px-6 pb-2 pt-4">
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-xs font-medium text-zinc-400">{statusLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-2xl border border-white/8 bg-white/8 px-2 py-1 text-xs font-medium text-zinc-200">{modelLabel}</span>
                {badgeLabel && <span className="rounded-2xl border border-blue-400/20 bg-blue-500/12 px-2 py-1 text-xs font-medium text-blue-300">{badgeLabel}</span>}
                <button onClick={() => onOpenChange(false)} className="rounded-full p-1.5 transition-colors hover:bg-white/8">
                  <X className="h-4 w-4 text-zinc-400" />
                </button>
              </div>
            </div>
            </div>

            <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] px-6 pb-3 pt-3">
              <div className="text-sm font-semibold text-white">{title}</div>
              {quickActions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      className="rounded-2xl border border-white/8 bg-white/6 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-all duration-200 hover:border-blue-300/18 hover:bg-white/10 hover:text-white"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!minimized && <div className="max-h-[46vh] overflow-y-auto bg-[linear-gradient(180deg,rgba(6,10,16,0.12),rgba(6,10,16,0.28))] px-4 pb-2">{body}</div>}

            {!minimized && (
              <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(9,15,24,0.55),rgba(9,15,24,0.82))] px-4 pb-4 pt-4">
                <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <textarea
                    value={message}
                    onChange={(e) => onMessageChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    rows={4}
                    className="min-h-[120px] w-full resize-none border-none bg-transparent px-6 py-4 text-base font-normal leading-relaxed text-zinc-100 outline-none placeholder:text-zinc-400"
                    placeholder={placeholder}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(96, 165, 250, 0.04), transparent 42%, rgba(255,255,255,0.02))' }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {attachmentActions.length > 0 && (
                    <div className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/6 p-1">
                      {attachmentActions.map((action) => (
                        <HoverTool key={action.key} label={action.label} hoverColor={action.hoverColor} onClick={action.onClick}>
                          {action.icon}
                        </HoverTool>
                      ))}
                    </div>
                  )}

                    <HoverTool label="Voice input" hoverColor="#60A5FA" onClick={voiceAction}>
                      <span className="flex items-center justify-center rounded-lg border border-zinc-700/30 p-2.5 transition-all duration-300 group-hover:border-red-500/30 group-hover:bg-zinc-800/80">
                        <Mic className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover:scale-125 group-hover:text-red-400" />
                      </span>
                    </HoverTool>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs font-medium text-zinc-500">
                      <span>{charCount}</span>/<span className="text-zinc-400">{maxChars}</span>
                    </div>

                    <button
                      onClick={onSend}
                      disabled={sendDisabled}
                      className="group relative rounded-xl bg-gradient-to-r from-red-600 to-red-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:-rotate-2 hover:shadow-xl hover:shadow-red-500/30 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <Send className="h-5 w-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12" />
                      <div className="absolute inset-0 scale-110 rounded-xl bg-gradient-to-r from-red-600 to-red-500 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-6 border-t border-white/8 pt-3 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Info className="h-3 w-3" />
                    <span>
                      Press <kbd className="rounded border border-zinc-600 bg-zinc-800 px-1.5 py-1 font-mono text-xs text-zinc-400 shadow-sm">Shift + Enter</kbd> for new line
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onToggleMinimized && (
                      <button onClick={onToggleMinimized} className="text-zinc-400 transition-colors hover:text-white">
                        {minimized ? 'Expand' : 'Minimise'}
                      </button>
                    )}
                    {onReset && (
                      <button onClick={onReset} className="text-zinc-400 transition-colors hover:text-white">
                        Reset
                      </button>
                    )}
                    {footerInfo ?? (
                      <div className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span>All systems operational</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div
              className="pointer-events-none absolute inset-0 rounded-[30px]"
              style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.06), rgba(255,255,255,0.01) 28%, rgba(147, 51, 234, 0.05))' }}
            />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
          </div>
        </div>
      )}

      <style>{`
        @keyframes popInGlow {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .floating-ai-button:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.9), 0 0 50px rgba(124, 58, 237, 0.7), 0 0 70px rgba(109, 40, 217, 0.5);
        }
      `}</style>
    </div>
  );
};

export { FloatingAiAssistant };
