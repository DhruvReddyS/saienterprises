/* Credibility marquee strip */
const items = [
  '24 Years', 'Hyderabad', '4000+ Machines', '2000+ Clients',
  'Pan-World Reach', 'HPM Sole Agent in India', 'Est. 2000',
  'Pre-Press to Post-Press', 'Corrugation', 'Allied Consumables',
];

const AboutSection = () => (
  <section style={{
    background: '#0D1421',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    overflow: 'hidden', padding: '28px 0 16px',
  }}>
    <div style={{ overflow: 'hidden' }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 18, padding: '0 28px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)', cursor: 'default',
            transition: 'color 0.2s',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#3B82F6'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
          >
            {item}
            <span style={{ color: '#3B82F6', fontSize: 8, opacity: 0.7 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
    <p style={{
      maxWidth: 660, margin: '20px auto 0',
      textAlign: 'center',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 13, fontWeight: 300,
      color: 'rgba(255,255,255,0.35)', lineHeight: 1.8,
      padding: '0 24px 12px',
    }}>
      A trusted name in graphic machinery since 2000 — from pre-press to post-press, we put the right machine in the right hands.
    </p>
  </section>
);

export default AboutSection;
