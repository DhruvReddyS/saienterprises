import { motion } from "framer-motion";
import { WorldMap } from "@/components/ui/map";
import { GlowCard } from "@/components/ui/spotlight-card";
import AnimatedScanLoader from "@/components/ui/animated-scan-loader";

export default function MapDemo() {
  return (
    <div className="w-full bg-white py-40 dark:bg-black">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xl font-bold text-black dark:text-white md:text-4xl">
          Global Network
        </p>
        <p className="mx-auto max-w-2xl py-4 text-sm text-neutral-500 md:text-lg">
          Connect with teams and clients worldwide. Our platform enables seamless
          collaboration across continents, bringing the world to your workspace.
        </p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <WorldMap
          dots={[
            {
              start: { lat: 17.385, lng: 78.4867, label: "Hyderabad HQ" },
              end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
            },
            {
              start: { lat: 17.385, lng: 78.4867, label: "Hyderabad HQ" },
              end: { lat: 19.076, lng: 72.8777, label: "Mumbai" },
            },
            {
              start: { lat: 17.385, lng: 78.4867, label: "Hyderabad HQ" },
              end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" },
            },
          ]}
        />
      </motion.div>
    </div>
  );
}

export function Default() {
  return (
    <div className="flex min-h-screen w-screen flex-row items-center justify-center gap-10 bg-[#f4f8fc] p-10">
      <GlowCard glowColor="blue">
        <div className="rounded-xl bg-white/70 p-4 text-sm text-slate-700">Sai blue glow</div>
      </GlowCard>
      <GlowCard glowColor="purple">
        <div className="rounded-xl bg-white/70 p-4 text-sm text-slate-700">Pre-press glow</div>
      </GlowCard>
      <GlowCard glowColor="green">
        <div className="rounded-xl bg-white/70 p-4 text-sm text-slate-700">Corrugation glow</div>
      </GlowCard>
    </div>
  );
}

export function ScanLoaderDemo() {
  return (
    <div className="flex min-h-[30rem] w-full items-center justify-center bg-[#060A10] p-8">
      <AnimatedScanLoader />
    </div>
  );
}
