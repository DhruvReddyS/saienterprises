import { WorldMap } from "@/components/ui/map";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const headquarters = {
  lat: 17.385, lng: 78.4867, label: "India HQ",
  tone: "hq" as const, pulse: true, labelDx: 18, labelDy: -36, labelWidth: 88,
};

const indiaOffices = [
  { lat: 28.6139, lng: 77.209,  label: "", tone: "india" as const, labelDx: 0, labelDy: 0, labelWidth: 0 },
  { lat: 28.9845, lng: 77.7064, label: "", tone: "india" as const, labelDx: 0, labelDy: 0, labelWidth: 0 },
  { lat: 19.076,  lng: 72.8777, label: "", tone: "india" as const, labelDx: 0, labelDy: 0, labelWidth: 0 },
  { lat: 18.5204, lng: 73.8567, label: "", tone: "india" as const, labelDx: 0, labelDy: 0, labelWidth: 0 },
  { lat: 16.5062, lng: 80.648,  label: "", tone: "india" as const, labelDx: 0, labelDy: 0, labelWidth: 0 },
];

const overseasOffices = [
  { lat: -1.2921, lng: 36.8219, label: "Kenya",     tone: "overseas" as const, labelDx:  38, labelDy:  14, labelWidth: 72  },
  { lat:  8.9806, lng: 38.7578, label: "Ethiopia",  tone: "overseas" as const, labelDx: -44, labelDy: -38, labelWidth: 88  },
  { lat:  6.9271, lng: 79.8612, label: "Sri Lanka", tone: "overseas" as const, labelDx:  36, labelDy: -38, labelWidth: 90  },
];

const globalReach = [
  { lat: 39.5,     lng:  -98.35,   label: "USA",          tone: "reach" as const, labelDx:   8, labelDy: -34, labelWidth: 60  },
  { lat: 24.0,     lng:   54.0,    label: "UAE",          tone: "reach" as const, labelDx:  16, labelDy: -36, labelWidth: 60  },
  { lat: 27.7172,  lng:   85.324,  label: "Nepal",        tone: "reach" as const, labelDx:  48, labelDy: -28, labelWidth: 72  },
  { lat: -29.0,    lng:   25.0,    label: "South Africa", tone: "reach" as const, labelDx:  -4, labelDy: -34, labelWidth: 112 },
  { lat: 35.6762,  lng:  139.6503, label: "Japan",        tone: "reach" as const, labelDx: -22, labelDy: -36, labelWidth: 68  },
  { lat: 35.0,     lng:  103.0,    label: "China",        tone: "reach" as const, labelDx:  -4, labelDy:  28, labelWidth: 68  },
  { lat: -25.0,    lng:  133.0,    label: "Australia",    tone: "reach" as const, labelDx: -18, labelDy: -36, labelWidth: 96  },
];

const routes = [
  ...indiaOffices.map(o => ({ start: headquarters, end: o, color: "rgba(255,255,255,0.55)", strokeWidth: 0.8 })),
  ...overseasOffices.map(o => ({ start: headquarters, end: o, color: "#60a5fa", strokeWidth: 1.1 })),
  ...globalReach.map(o => ({ start: headquarters, end: o, color: "rgba(96,165,250,0.55)", strokeWidth: 0.7 })),
];

const markers = [headquarters, ...indiaOffices, ...overseasOffices, ...globalReach];

const LEGEND = [
  { color: "#f8d24b", label: "Headquarters", desc: "Hyderabad" },
  { color: "#ffffff", label: "India Network", desc: "6 offices" },
  { color: "#60a5fa", label: "Overseas Offices", desc: "Kenya · Ethiopia · Sri Lanka" },

  { color: "#3b82f6", label: "Export Markets", desc: "15+ countries" },
];

const STATS = [
  { val: "15+", label: "Countries" },
  { val: "8",   label: "Office Cities" },
  { val: "3",   label: "Continents" },
];

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
    <div ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      {/* Atmospheric border frame */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
        background: [
          "linear-gradient(to right, #060A10 0%, transparent 5%, transparent 95%, #060A10 100%)",
          "linear-gradient(to bottom, #060A10 0%, transparent 6%, transparent 92%, #060A10 100%)",
        ].join(", "),
      }} />

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.98 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <WorldMap
          dots={routes}
          markers={markers}
          lineColor="#60a5fa"
          animationDuration={1.7}
          labelClassName="text-[10px] tracking-[0.08em] uppercase"
        />
      </motion.div>

      {/* Floating legend — top right inside map */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: on ? 1 : 0, x: on ? 0 : 16 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          position: "absolute", top: 20, right: 20, zIndex: 20,
          background: "rgba(6,10,16,0.82)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "14px 18px",
          display: "flex", flexDirection: "column", gap: 9,
          minWidth: 190,
        }}
        className="hidden md:flex"
      >
        {LEGEND.map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: l.color, flexShrink: 0,
              boxShadow: `0 0 6px ${l.color}80`,
            }} />
            <div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
                lineHeight: 1.2,
              }}>
                {l.label}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 8.5, color: "rgba(255,255,255,0.3)", lineHeight: 1.2,
              }}>
                {l.desc}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating stat pills — bottom inside map */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          position: "absolute", bottom: 20, left: 0, right: 0, zIndex: 20,
          display: "flex", justifyContent: "center", gap: 12, paddingInline: 20,
        }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            style={{
              background: "rgba(6,10,16,0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "10px 20px",
              textAlign: "center",
              minWidth: 90,
            }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 700, color: "#fff",
              lineHeight: 1, letterSpacing: "-0.02em",
            }}>
              {s.val}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 8, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#60A5FA",
              fontWeight: 700, marginTop: 4,
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom fade into dark section */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 48, zIndex: 15, pointerEvents: "none",
        background: "linear-gradient(to top, #060A10, transparent)",
      }} />
    </div>
  );
}
