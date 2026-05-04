import { type CSSProperties } from 'react';

interface IconProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

const d = (size = 20, color = 'currentColor', style?: CSSProperties, className?: string) =>
  ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, style, className });

/* ── Search / magnify ── */
export const IconSearch = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/* ── Document / file ── */
export const IconDocument = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

/* ── Gear / settings ── */
export const IconGear = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

/* ── Book ── */
export const IconBook = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

/* ── Lightbulb ── */
export const IconLightbulb = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

/* ── Clipboard / consultancy ── */
export const IconClipboard = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

/* ── Printer ── */
export const IconPrinter = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

/* ── Factory / building ── */
export const IconFactory = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <path d="M2 20h20" /><path d="M5 20V8l5 4V8l5 4V4h3a2 2 0 0 1 2 2v14" /><path d="M8 14h0" /><path d="M13 14h0" />
  </svg>
);

/* ── Rocket / deployment ── */
export const IconRocket = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

/* ── Handshake / partnership ── */
export const IconHandshake = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <path d="M11 17a1 1 0 0 1-1-1 1 1 0 0 1 1-1h2a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2z" />
    <path d="M2 9l4-4 4 4" /><path d="M22 9l-4-4-4 4" /><path d="M6 5v6a6 6 0 0 0 12 0V5" />
  </svg>
);

/* ── Wrench / tool ── */
export const IconWrench = ({ size, color, style, className }: IconProps) => (
  <svg {...d(size, color, style, className)}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

/* ── Bot / assistant ── */
export const IconBot = ({ size = 20, color = 'currentColor', style, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
    <circle cx="8" cy="16" r="1" fill={color} /><circle cx="16" cy="16" r="1" fill={color} />
  </svg>
);

/* ── Message bubble / chat ── */
export const IconChat = ({ size = 20, color = 'currentColor', style, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

/* ── Send / paper-plane ── */
export const IconSend = ({ size = 18, color = 'currentColor', style, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
