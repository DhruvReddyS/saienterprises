import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe2, Mail, MapPin, Phone, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import { useToast } from '@/hooks/use-toast';
import { companyInfo, productCategories } from '@/data/products';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    machinery: '',
    machineOfInterest: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: 'Message sent successfully',
      description: 'Our team will get back to you within 24 to 48 business hours.',
    });

    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', phone: '', machinery: '', machineOfInterest: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <PageTransition>
      <ScrollProgress />
      <Header />

      <main className="bg-gradient-to-b from-primary/[0.1] via-background to-background overflow-hidden">
        <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 px-6 sm:px-8 md:px-16 lg:px-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-[12%] h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute top-16 right-[10%] h-56 w-56 rounded-full bg-cyan-400/12 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary font-semibold mb-5"
            >
              <span className="w-8 h-px bg-primary" />
              Contact
              <span className="w-8 h-px bg-primary" />
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-serif text-[2.3rem] sm:text-[3rem] lg:text-[3.8rem] leading-[0.94] text-foreground"
            >
              Clean communication,
              <span className="text-primary italic"> global support response.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground"
            >
              Share your requirement once and our team will map machine options, specifications, and commercial guidance quickly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="mt-7 flex flex-wrap justify-center gap-3"
            >
              <span className="rounded-full border border-border bg-background/90 px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground">24-48h response</span>
              <span className="rounded-full border border-border bg-background/90 px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground">India + Kenya offices</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground">
                <Globe2 className="w-3.5 h-3.5 text-primary" />
                Global collaborations
              </span>
            </motion.div>
          </div>
        </section>

        <section id="contact-form" className="pb-14 sm:pb-16 px-6 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto rounded-[30px] border border-primary/20 bg-gradient-to-br from-primary/[0.1] via-background to-cyan-400/[0.06] p-4 sm:p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="p-2 sm:p-4">
                <h2 className="font-serif text-3xl text-foreground mb-3">Reach Us Directly</h2>
                <p className="text-sm text-muted-foreground mb-5">Use direct channels or submit the enquiry form for faster machine matching.</p>

                <div className="space-y-4 mb-6">
                  <a href={`tel:${companyInfo.phones[0].replace(/\s/g, '')}`} className="group flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"><Phone className="h-4 w-4 text-primary" /></span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Phone</p>
                      <p className="text-sm sm:text-base">{companyInfo.phones.join(' / ')}</p>
                    </div>
                  </a>
                  <a href={`mailto:${companyInfo.emails[0]}`} className="group flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"><Mail className="h-4 w-4 text-primary" /></span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Email</p>
                      <p className="text-sm sm:text-base break-all">{companyInfo.emails[0]}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-foreground">
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10"><MapPin className="h-4 w-4 text-primary" /></span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Coverage</p>
                      <p className="text-sm sm:text-base">Global customer support with core offices in Hyderabad and Nairobi.</p>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-2">Category Quick Select</p>
                <div className="flex flex-wrap gap-2">
                  {productCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, machinery: category.name })}
                      className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors ${
                        formData.machinery === category.name
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-background/95 p-5 sm:p-6 space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/45"
                    placeholder="Your full name *"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/45"
                    placeholder="Work email *"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/45"
                    placeholder="Company"
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/45"
                    placeholder="Phone"
                  />
                </div>

                <input
                  type="text"
                  value={formData.machinery}
                  onChange={(e) => setFormData({ ...formData, machinery: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/45"
                  placeholder="Machinery category"
                />

                <input
                  type="text"
                  value={formData.machineOfInterest}
                  onChange={(e) => setFormData({ ...formData, machineOfInterest: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/45"
                  placeholder="Machine of interest"
                />

                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none resize-none focus:border-primary/45"
                  placeholder="Tell us your requirement *"
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                      isSubmitted ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Message Sent
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Enquiry
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-sm text-muted-foreground">We usually respond within 24 to 48 business hours.</p>
                </div>
              </motion.form>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-primary/[0.05] py-14 sm:py-16 px-6 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl overflow-hidden border border-border bg-background">
              <iframe
                title="Sai Enterprises Hyderabad"
                src="https://www.google.com/maps?q=Balkampet+Hyderabad&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-background">
              <iframe
                title="Sai Enterprises Nairobi"
                src="https://www.google.com/maps?q=Nairobi+Kenya&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default ContactPage;
