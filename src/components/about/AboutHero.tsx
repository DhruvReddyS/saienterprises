import { motion } from "framer-motion";
import yearsBadge from '@/assets/24-years-badge.png';

type AboutHeroProps = {
  experience: string;
};

const AboutHero = ({ experience }: AboutHeroProps) => {
  return (
    <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-end bg-secondary/30">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative w-full px-5 sm:px-8 md:px-16 lg:px-24 pb-12 sm:pb-16 md:pb-24 pt-28 sm:pt-36 md:pt-44">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.p
              className="caption mb-4 sm:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              About
            </motion.p>
            <h1 className="text-foreground mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif">
              We&apos;ve been here
              <br />
              long enough.
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
              {experience} of excellence in graphic and corrugation machinery. Building long-term
              relationships across India and East Africa.
            </p>
          </motion.div>

          {/* 24 Years Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            className="flex-shrink-0"
          >
            <img 
              src={yearsBadge} 
              alt="24 Years of Excellence in Industry" 
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
