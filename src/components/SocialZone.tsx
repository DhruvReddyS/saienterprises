import { useState } from 'react';
import { motion } from 'framer-motion';
import { companyInfo } from '@/data/products';

const fallbackSocialHref = 'https://saienterprises.info/';
const whatsappNumber = companyInfo.phones[0].replace(/\D/g, '');
const whatsappMessage = 'Hi, I found your website and want to enquire about graphic machinery.';

const socialItems = [
  {
    label: 'Facebook',
    href: `https://${companyInfo.facebook}`,
    background: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.2v2.3H8V14h2.4v8h3.1z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: fallbackSocialHref,
    background: 'linear-gradient(180deg, #F58529 0%, #DD2A7B 52%, #8134AF 100%)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: fallbackSocialHref,
    background: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M6.4 8.3a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM4.9 19.3V9.8H8v9.5H4.9zm4.9 0V9.8h3v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v5.1h-3.1v-4.5c0-1.1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3v4.6H9.8z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    background: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.52 0 .21 5.3.21 11.84c0 2.09.55 4.13 1.59 5.92L0 24l6.43-1.69a11.78 11.78 0 0 0 5.63 1.43h.01c6.53 0 11.85-5.3 11.85-11.84 0-3.16-1.23-6.13-3.4-8.42Zm-8.47 18.25h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.22-3.82 1 1.02-3.72-.23-.38a9.82 9.82 0 0 1-1.5-5.2c0-5.45 4.44-9.89 9.91-9.89 2.64 0 5.12 1.02 6.99 2.9a9.8 9.8 0 0 1 2.9 6.99c0 5.45-4.45 9.89-9.89 9.89Zm5.43-7.42c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.94 1.18-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.66-.5h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.91 1.23 3.11c.15.2 2.13 3.26 5.16 4.57.72.31 1.29.5 1.73.64.73.23 1.39.2 1.92.12.59-.09 1.78-.73 2.03-1.44.25-.71.25-1.32.18-1.44-.08-.12-.28-.2-.58-.35Z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${companyInfo.emails[0]}`,
    background: '#EA4335',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2.02-.37 6.45 5.17c.31.25.75.25 1.06 0l6.45-5.17a.75.75 0 0 0-.47-.16H5.49c-.17 0-.34.06-.47.16Zm14.48 1.56-5.88 4.71a2.6 2.6 0 0 1-3.24 0L4.5 7.94v9.31c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V7.94Z" />
      </svg>
    ),
  },
];

const SocialZone = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.05, duration: 0.35 }}
      style={{
        position: 'fixed',
        right: 0,
        top: '28%',
        transform: 'translateY(-50%)',
        zIndex: 489,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        filter: 'drop-shadow(-10px 18px 22px rgba(7, 10, 17, 0.16))',
      }}
      className="max-[767px]:!top-auto max-[767px]:!bottom-[120px] max-[767px]:!right-0"
      id="social-zone"
    >
      <motion.button
        type="button"
        aria-label={isOpen ? 'Collapse social links' : 'Expand social links'}
        onClick={() => setIsOpen((open) => !open)}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: 34,
          height: 66,
          border: 'none',
          cursor: 'pointer',
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          background: 'linear-gradient(180deg, #12315d 0%, #0b1e39 100%)',
          color: '#d9e8ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '-4px 0 0 rgba(8,15,28,0.28)',
        }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ display: 'inline-flex' }}
        >
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M12.5 4.5L7 10l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </motion.button>

      <motion.div
        animate={{
          width: isOpen ? 60 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          transformOrigin: 'right center',
        }}
      >
        <div
          style={{
            width: 60,
            height: 84,
            background: 'linear-gradient(180deg, #123866 0%, #0a1b34 100%)',
            color: '#e6f0ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '-5px 0 0 rgba(8,15,28,0.32)',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transform: 'rotate(90deg)',
              whiteSpace: 'nowrap',
            }}
          >
            Social
          </span>
        </div>

        {socialItems.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
            aria-label={item.label}
            title={item.label}
            whileHover={{ x: -6 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: 60,
              height: 78,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              textDecoration: 'none',
              background: item.background,
              boxShadow: index === socialItems.length - 1 ? '-5px 0 0 rgba(17,24,39,0.28)' : 'none',
              borderTop: index !== 0 ? '1px solid rgba(255,255,255,0.18)' : 'none',
              borderBottomLeftRadius: index === socialItems.length - 1 ? 8 : 0,
              borderBottomRightRadius: index === socialItems.length - 1 ? 8 : 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 38%, rgba(9,14,24,0.08) 100%)',
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>{item.icon}</span>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SocialZone;
