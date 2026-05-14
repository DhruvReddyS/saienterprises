import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// world-atlas topojson – 110m resolution (lightweight, accurate)
const GEO_URL = "/world-110m.json";

/* ─── Location data ──────────────────────────────────────────── */

const HQ = { name: "Hyderabad", lng: 78.4867, lat: 17.385, tone: "hq" as const };

const INDIA_OFFICES = [
  { name: "Delhi",       lng: 77.209,  lat: 28.614 },
  { name: "Noida",       lng: 77.391,  lat: 28.535 },
  { name: "Mumbai",      lng: 72.878,  lat: 19.076 },
  { name: "Pune",        lng: 73.857,  lat: 18.520 },
  { name: "Vijayawada",  lng: 80.648,  lat: 16.506 },
];

const OVERSEAS = [
  { name: "Nairobi, Kenya",       lng: 36.822,  lat: -1.292  },
  { name: "Addis Ababa, Ethiopia",lng: 38.758,  lat:  8.981  },
  { name: "Colombo, Sri Lanka",   lng: 79.861,  lat:  6.927  },
];

const REACH = [
  { name: "USA",          lng: -95.71,  lat: 37.09  },
  { name: "UAE",          lng:  55.27,  lat: 25.20  },
  { name: "Oman",         lng:  57.55,  lat: 21.51  },
  { name: "Qatar",        lng:  51.18,  lat: 25.35  },
  { name: "Nepal",        lng:  84.124, lat: 28.394 },
  { name: "Bangladesh",   lng:  90.36,  lat: 23.68  },
  { name: "Malaysia",     lng: 109.70,  lat:  4.21  },
  { name: "Singapore",    lng: 103.82,  lat:  1.35  },
  { name: "South Africa", lng:  22.93,  lat:-30.56  },
  { name: "Nigeria",      lng:   8.68,  lat:  9.08  },
  { name: "Ghana",        lng:  -1.02,  lat:  7.95  },
  { name: "Tanzania",     lng:  34.89,  lat: -6.37  },
  { name: "Australia",    lng: 133.77,  lat:-25.27  },
];

/* ─── Legend (exported for AboutPage) ───────────────────────── */
export const LEGEND = [
  { color: "#FACC15", label: "Headquarters",         desc: "Hyderabad, India" },
  { color: "#ffffff", label: "India Network",         desc: "Delhi · Noida · Mumbai · Pune · Vijayawada" },
  { color: "#60a5fa", label: "Overseas Offices",      desc: "Kenya · Ethiopia · Sri Lanka" },
  { color: "#3b82f6", label: "Machine Installations", desc: "USA · UAE · Singapore · Australia · Nigeria + more" },
];

/* ─── Tone styles ────────────────────────────────────────────── */
const TONES = {
  hq:       { fill: "#FACC15", glow: "rgba(250,204,21,0.5)",  ring: "rgba(250,204,21,0.3)",  r: 6  },
  india:    { fill: "#ffffff", glow: "rgba(255,255,255,0.4)", ring: "rgba(255,255,255,0.2)", r: 4  },
  overseas: { fill: "#60a5fa", glow: "rgba(96,165,250,0.5)",  ring: "rgba(96,165,250,0.25)", r: 5  },
  reach:    { fill: "#3b82f6", glow: "rgba(59,130,246,0.4)",  ring: "rgba(59,130,246,0.2)",  r: 3.5},
};

/* ─── Animated pulsing ring ─────────────────────────────────── */
const PulseRing = ({ cx, cy, color }: { cx: number; cy: number; color: string }) => (
  <>
    <circle cx={cx} cy={cy} r="4" fill="none" stroke={color} strokeWidth="1" opacity="0">
      <animate attributeName="r"       values="4;16;4"   dur="2.6s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
    </circle>
    <circle cx={cx} cy={cy} r="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0">
      <animate attributeName="r"       values="4;12;4"   dur="2.6s" begin="0.4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" begin="0.4s" repeatCount="indefinite" />
    </circle>
  </>
);


export default function WorldPresenceMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", background: "#060A10", overflow: "hidden" }}>
      {/* Edge fade frame */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
        background: [
          "linear-gradient(to right,  #060A10 0%, transparent 4%,  transparent 96%,  #060A10 100%)",
          "linear-gradient(to bottom, #060A10 0%, transparent 5%,  transparent 93%,  #060A10 100%)",
        ].join(", "),
      }} />

      {/* "GLOBAL PRESENCE" title overlay */}
      <div style={{
        position: "absolute", top: 22, left: 32, zIndex: 12, pointerEvents: "none",
        paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px, 2.4vw, 32px)", fontWeight: 700,
          color: "#fff", lineHeight: 1, letterSpacing: "-0.01em",
        }}>
          Machines Across the Globe
        </div>
        <div style={{
          marginTop: 5, fontSize: 9, letterSpacing: "0.28em",
          color: "#3B82F6", textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
        }}>
          4000+ Machines · 20+ Countries · Since 2000
        </div>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.99 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <ComposableMap
          projectionConfig={{ scale: 147, center: [20, 10] }}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <filter id="wm-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="wm-bg" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.07)" />
              <stop offset="100%" stopColor="rgba(6,10,16,0)" />
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <rect x="-800" y="-400" width="2400" height="1200" fill="url(#wm-bg)" />

          {/* Country fills */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none" },
                    hover:   { outline: "none", fill: "rgba(59,130,246,0.08)" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* ── Reach market markers ── */}
          {REACH.map((o) => {
            const t = TONES.reach;
            return (
              <Marker key={`rm-${o.name}`} coordinates={[o.lng, o.lat]}>
                <circle r={t.r} fill={t.fill} filter="url(#wm-glow)" />
                <circle r={1.4} fill="rgba(255,255,255,0.9)" />
              </Marker>
            );
          })}

          {/* ── Overseas office markers ── */}
          {OVERSEAS.map((o) => {
            const t = TONES.overseas;
            return (
              <Marker key={`om-${o.name}`} coordinates={[o.lng, o.lat]}>
                <PulseRing cx={0} cy={0} color={t.ring} />
                <circle r={t.r} fill={t.fill} filter="url(#wm-glow)" />
                <circle r={1.6} fill="rgba(255,255,255,0.92)" />
              </Marker>
            );
          })}

          {/* ── India office markers ── */}
          {INDIA_OFFICES.map((o) => {
            const t = TONES.india;
            return (
              <Marker key={`im-${o.name}`} coordinates={[o.lng, o.lat]}>
                <circle r={t.r} fill={t.fill} filter="url(#wm-glow)" />
                <circle r={1.4} fill="rgba(6,10,16,0.8)" />
              </Marker>
            );
          })}

          {/* ── HQ marker (on top) ── */}
          <Marker coordinates={[HQ.lng, HQ.lat]}>
            <PulseRing cx={0} cy={0} color={TONES.hq.ring} />
            <circle r={TONES.hq.r} fill={TONES.hq.fill} filter="url(#wm-glow)" />
            <circle r={2.2} fill="rgba(6,10,16,0.9)" />
          </Marker>

        </ComposableMap>
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 40, zIndex: 15, pointerEvents: "none",
        background: "linear-gradient(to top, #060A10, transparent)",
      }} />
    </div>
  );
}
