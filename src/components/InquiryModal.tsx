import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  company: z.string().trim().max(100, "Company name too long").optional(),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().trim().max(20, "Phone number too long").optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message too long"),
});

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: string;
}

const serviceOptions = [
  "Trading & Exporting",
  "Modernization",
  "Service & Support",
  "HPM Machines (India)",
  "General Inquiry",
];

const InquiryModal = ({ isOpen, onClose, serviceType }: InquiryModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: serviceType || 'General Inquiry',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = inquirySchema.parse(formData);
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
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

  const handleClose = () => {
    onClose();
    // Reset form after animation
    setTimeout(() => {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'General Inquiry',
        message: '',
      });
      setErrors({});
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[90vh] bg-background border border-border z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Inquiry
                </span>
                <h3 className="font-serif text-xl text-foreground mt-1">
                  Get in Touch
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-serif text-2xl text-foreground mb-3">
                      Thank You
                    </h4>
                    <p className="text-muted-foreground max-w-xs">
                      We've received your inquiry and will respond within 24–48 business hours.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Service Type */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-muted/30 border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                      >
                        {serviceOptions.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-muted/30 border text-foreground focus:outline-none transition-colors ${
                          errors.name ? 'border-destructive' : 'border-border focus:border-primary'
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-muted/30 border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="Company name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-muted/30 border text-foreground focus:outline-none transition-colors ${
                          errors.email ? 'border-destructive' : 'border-border focus:border-primary'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-muted/30 border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="+91 000 000 0000"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 bg-muted/30 border text-foreground focus:outline-none transition-colors resize-none ${
                          errors.message ? 'border-destructive' : 'border-border focus:border-primary'
                        }`}
                        placeholder="Tell us about your requirements..."
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span className="text-sm font-medium tracking-wide">Send Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-muted-foreground">
                      We usually respond within 24–48 business hours.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;
