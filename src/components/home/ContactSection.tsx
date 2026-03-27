import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { companyInfo } from '@/data/products';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      contactSchema.parse(formData);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "We'll respond within 24 to 48 business hours.",
      });
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      setErrors({});
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section ref={containerRef} className="relative py-20 sm:py-28 md:py-36 bg-background overflow-hidden">
      <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-4">
              <motion.span 
                className="w-8 h-px bg-primary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
              />
              Contact
              <motion.span 
                className="w-8 h-px bg-primary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
              />
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4">
              Let's start a <span className="text-primary italic">conversation.</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-base sm:text-lg">
              Ready to elevate your print production? We typically respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Form - Modern Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="order-2 lg:order-1"
            >
              <div className="relative bg-card border border-border p-6 sm:p-8 md:p-10 shadow-lg overflow-hidden">
                {/* Success Animation Overlay */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-background/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                        >
                          <CheckCircle2 className="w-10 h-10 text-primary" />
                        </motion.div>
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="font-serif text-2xl sm:text-3xl text-foreground mb-2"
                      >
                        Message Sent!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-muted-foreground text-center max-w-xs"
                      >
                        Thank you for reaching out. We'll respond within 24-48 hours.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center gap-2 mt-4 text-primary text-sm"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Looking forward to connecting</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                        Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 rounded-sm ${errors.name ? 'border-destructive' : 'border-border'}`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 rounded-sm"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 bg-background border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 rounded-sm ${errors.email ? 'border-destructive' : 'border-border'}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 rounded-sm"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3.5 bg-background border text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 rounded-sm ${errors.message ? 'border-destructive' : 'border-border'}`}
                      placeholder="Tell us about your machinery requirements..."
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm font-semibold tracking-wide rounded-sm"
                  >
                    {isSubmitting ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Sending...
                      </motion.span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 space-y-6"
            >
              {/* Quick Info Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Phone */}
                <div className="group p-5 bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Call Us</h4>
                      <div className="space-y-1">
                        {companyInfo.phones.slice(0, 2).map(phone => (
                          <a 
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="block text-foreground hover:text-primary transition-colors text-sm"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group p-5 bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Mail Us</h4>
                      <div className="space-y-1">
                        {companyInfo.emails.map((email) => (
                          <a 
                            key={email}
                            href={`mailto:${email}`}
                            className="block text-foreground hover:text-primary transition-colors text-sm truncate"
                          >
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Head Office Highlight */}
              <motion.div 
                className="p-6 bg-primary"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-primary-foreground/70 mb-2 font-medium">Head Office</h4>
                    <p className="font-serif text-xl sm:text-2xl text-primary-foreground mb-1">
                      {companyInfo.locations.headquarters.city}
                    </p>
                    <p className="text-primary-foreground/60 text-sm">
                      {companyInfo.locations.headquarters.state}, India
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Experience note */}
              <div className="flex items-center gap-4 p-4 border border-border">
                <span className="font-serif text-3xl text-primary">24+</span>
                <div>
                  <p className="text-foreground font-medium text-sm">Years of Excellence</p>
                  <p className="text-muted-foreground text-xs">Trusted across two continents</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
