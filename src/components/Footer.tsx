import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { companyInfo, productCategories } from '@/data/products';
import saiLogoCmyk from '@/assets/sai-logo-cmyk.png';
import eCatalogueQr from '@/assets/e-catalogue-qr.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      <motion.div
        className="absolute top-0 right-1/4 w-[500px] h-[300px] rounded-full bg-primary/6 blur-[120px] pointer-events-none"
        animate={{ x: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="py-14 sm:py-18 md:py-20 border-b border-background/10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 flex-shrink-0">
                    <img src={saiLogoCmyk} alt="Sai Enterprises" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="font-serif text-lg text-background block">Sai Enterprises</span>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-primary">Graphic Machinery Suppliers</span>
                  </div>
                </div>

                <p className="text-background/50 text-sm leading-relaxed max-w-sm mb-6">
                  Complete machinery solutions for pre-press, press, post-press, corrugation and specialty converting workflows.
                </p>

                <div className="mb-6 flex flex-wrap gap-2 sm:hidden">
                  <span className="rounded-full border border-background/10 bg-background/[0.05] px-3 py-1.5 text-[11px] font-medium text-background/70">
                    Hyderabad HQ
                  </span>
                  <span className="rounded-full border border-background/10 bg-background/[0.05] px-3 py-1.5 text-[11px] font-medium text-background/70">
                    Nairobi Office
                  </span>
                  <span className="rounded-full border border-background/10 bg-background/[0.05] px-3 py-1.5 text-[11px] font-medium text-background/70">
                    Pan-India Machinery Support
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <a href={`tel:${companyInfo.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-3 text-background/60 hover:text-background transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                    {companyInfo.phones[0]}
                  </a>
                  <a href={`mailto:${companyInfo.emails[0]}`} className="flex items-center gap-3 text-background/60 hover:text-background transition-colors break-all">
                    <Mail className="w-4 h-4 text-primary" />
                    {companyInfo.emails[0]}
                  </a>
                  <div className="flex items-start gap-3 text-background/60">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <span>Hyderabad HQ · New Delhi · Pune · Vijayawada · Nairobi</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:hidden">
                  <Link
                    to="/machinery"
                    className="rounded-2xl bg-primary px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground"
                  >
                    Explore Machinery
                  </Link>
                  <Link
                    to="/brochure"
                    className="rounded-2xl border border-background/10 bg-background/[0.05] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-background/85"
                  >
                    Open Brochure
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-background/10 bg-background/[0.04] p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Machinery Access</p>
                <div className="grid gap-2.5 sm:hidden">
                  {productCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/machinery/${category.slug}`}
                      className="flex items-center justify-between rounded-2xl border border-background/10 bg-background/[0.03] px-4 py-3 text-sm text-background/78 transition-colors hover:border-primary/30 hover:text-background"
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="rounded-full bg-background/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-background/45">
                        {category.products.length}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="hidden gap-3 sm:grid sm:grid-cols-2">
                  {productCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/machinery/${category.slug}`}
                      className="group overflow-hidden rounded-2xl border border-background/10 bg-background/[0.03] hover:border-primary/30 transition-colors"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={category.heroImage}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <span className="font-serif text-lg text-background">{category.name}</span>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-background/35">
                            {category.products.length}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-background/45 line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-background/10 bg-background/[0.04] p-6 sm:p-7 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Catalogue & Contact</p>
                  <h3 className="font-serif text-3xl leading-tight mb-3">
                    Make machinery discovery easier for your buyers.
                  </h3>
                  <p className="text-sm text-background/55 leading-relaxed max-w-md">
                    Direct visitors into the right machine category, then move them into a quote request without friction.
                  </p>
                </div>

                <motion.div whileHover={{ scale: 1.04 }} className="hidden bg-background rounded-2xl p-3 shadow-lg w-fit sm:block">
                  <img src={eCatalogueQr} alt="Scan for complete E-Catalogue" className="w-28 h-28 object-contain" />
                </motion.div>
              </div>

              <div className="mb-6 rounded-2xl border border-background/10 bg-background/[0.03] p-4 sm:hidden">
                <p className="text-[10px] uppercase tracking-[0.16em] text-primary mb-2">Mobile Friendly</p>
                <p className="text-sm text-background/60 leading-relaxed">
                  Open the e-brochure directly or jump into machinery categories without scanning a QR code.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Link
                  to="/machinery"
                  className="group rounded-2xl bg-primary px-5 py-4 text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/70 mb-1">Browse</p>
                      <p className="font-serif text-2xl">All Machinery</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/contact"
                  className="group rounded-2xl border border-background/10 bg-background/[0.03] px-5 py-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-background/35 mb-1">Action</p>
                      <p className="font-serif text-2xl text-background">Request Quote</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-background/60 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-background/25 mb-3">Navigate</p>
                  <div className="space-y-2">
                    <Link to="/" className="block text-background/55 hover:text-background transition-colors">Home</Link>
                    <Link to="/about" className="block text-background/55 hover:text-background transition-colors">About</Link>
                    <Link to="/machinery" className="block text-background/55 hover:text-background transition-colors">Machinery</Link>
                    <Link to="/brochure" className="block text-background/55 hover:text-background transition-colors">E-Brochure</Link>
                    <Link to="/partners" className="block text-background/55 hover:text-background transition-colors">Partners</Link>
                    <Link to="/contact" className="block text-background/55 hover:text-background transition-colors">Contact</Link>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-background/25 mb-3">Machinery</p>
                  <div className="space-y-2">
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/machinery/${category.slug}`}
                        className="block text-background/55 hover:text-background transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-background/25 mb-3">Reach Us</p>
                  <div className="space-y-2 text-background/55">
                    {companyInfo.phones.map((phone) => (
                      <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="block hover:text-background transition-colors">
                        {phone}
                      </a>
                    ))}
                    {companyInfo.emails.map((email) => (
                      <a key={email} href={`mailto:${email}`} className="block break-all hover:text-background transition-colors">
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col items-start gap-3 text-left sm:flex-row sm:justify-between sm:items-center">
          <p className="text-xs text-background/25">
            © {currentYear} {companyInfo.name}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-background/25">
            <span>India</span>
            <span className="w-3 h-px bg-background/15" />
            <span>Kenya</span>
            <span className="w-3 h-px bg-background/15" />
            <span>Graphic Machinery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
