import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  MessageSquare,
  Wrench,
  HeadphonesIcon,
  RefreshCw,
  Handshake,
  Shield,
} from 'lucide-react';

const reasons = [
  {
    icon: MessageSquare,
    title: 'Expert Consultancy',
    description: 'We provide thorough consultancy before selling, ensuring you get the right machinery for your specific requirements.',
  },
  {
    icon: Wrench,
    title: 'Professional Installation',
    description: 'Complete installation and commissioning services by experienced technicians for seamless production startup.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: 'Ongoing service and support to keep your machinery running at peak performance throughout its lifecycle.',
  },
  {
    icon: RefreshCw,
    title: 'Refurbished Options',
    description: 'Quality pre-owned machinery with thorough inspection and assurance, offering cost-effective solutions.',
  },
  {
    icon: Handshake,
    title: 'Partnership Mindset',
    description: 'We believe in long-term relationships, growing together with our clients as their trusted machinery partner.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Only genuine products from globally renowned brands, ensuring reliability and consistent performance.',
  },
];

const WhySaiEnterprises = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Sai Enterprises?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            More than machinery suppliers — your trusted partner in print excellence
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySaiEnterprises;
