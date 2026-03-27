import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send, Building2, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { companyInfo, productCategories } from '@/data/products';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    city: '',
    machinery: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitted(true);
    
    toast({
      title: 'Enquiry Sent!',
      description: 'Our team will contact you shortly with suitable machinery solutions.',
    });

    setTimeout(() => {
      setFormData({
        name: '',
        company: '',
        city: '',
        machinery: '',
        message: '',
      });
      setIsSubmitted(false);
    }, 4000);
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={ref} className="relative py-20 md:py-28 bg-foreground overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Get in Touch
          </span>
          <h2 className="text-background mb-5">
            Let's Start a Conversation
          </h2>
          <p className="text-background/60 max-w-2xl mx-auto">
            Our team provides technical guidance and suitable machinery solutions for your requirements
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Form */}
          <ScrollReveal animation="slideLeft" delay={0.1}>
            <div className="relative bg-background/5 backdrop-blur-sm rounded-2xl border border-background/10 p-6 md:p-8 overflow-hidden">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-serif text-background mb-3"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-background/60 max-w-sm"
                    >
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-serif font-bold text-background mb-6">Enquiry Form</h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-background/80 mb-2">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary h-12 text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-background/80 mb-2">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company"
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary h-12 text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-background/80 mb-2">
                        City *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your city"
                        className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary h-12 text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="machinery" className="block text-sm font-medium text-background/80 mb-2">
                        Machinery Interest *
                      </label>
                      <select
                        id="machinery"
                        name="machinery"
                        required
                        value={formData.machinery}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-md border border-background/20 bg-background/10 text-background text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      >
                        <option value="" className="text-foreground">Select category</option>
                        {productCategories.map((category) => (
                          <option key={category.id} value={category.name} className="text-foreground">
                            {category.name}
                          </option>
                        ))}
                        <option value="Multiple Categories" className="text-foreground">Multiple Categories</option>
                        <option value="Consultation" className="text-foreground">General Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-background/80 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your requirements..."
                        rows={4}
                        className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary resize-none text-base"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Enquiry
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal animation="slideRight" delay={0.2} className="space-y-6">
            {/* Main Contact Card */}
            <div className="bg-primary rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary-foreground">{companyInfo.name}</h3>
                  <p className="text-primary-foreground/80 text-sm">{companyInfo.tagline}</p>
                </div>
              </div>

              <div className="space-y-3">
                {companyInfo.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary-foreground" />
                    <span className="font-medium text-primary-foreground text-base">{email}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Head Office */}
            <div className="bg-background/5 backdrop-blur-sm rounded-2xl border border-background/10 p-6">
              <h4 className="font-serif font-bold text-background mb-4 flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-primary" />
                Head Office
              </h4>
              <p className="text-background/70 text-base">
                {companyInfo.locations.headquarters.city}, {companyInfo.locations.headquarters.state}
                <br />
                {companyInfo.locations.headquarters.country}
              </p>
            </div>

            {/* Other Locations */}
            <div className="bg-background/5 backdrop-blur-sm rounded-2xl border border-background/10 p-6">
              <h4 className="font-serif font-bold text-background mb-4 text-lg">Branch Offices</h4>
              <div className="grid grid-cols-2 gap-4">
                {companyInfo.locations.branches.map((branch) => (
                  <div key={branch.city} className="text-base">
                    <p className="font-medium text-background">{branch.city}</p>
                    <p className="text-background/60 text-sm">{branch.state || branch.country}</p>
                  </div>
                ))}
                <div className="text-base">
                  <p className="font-medium text-primary">{companyInfo.locations.overseas.city}</p>
                  <p className="text-background/60 text-sm">{companyInfo.locations.overseas.country}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
