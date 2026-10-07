import { z } from 'zod';

export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  company: z.string().trim().max(120, 'Company name is too long.').optional(),
  phone: z.string().trim().max(30, 'Phone number is too long.').optional(),
  category: z.string().trim().max(100).optional(),
  machine: z.string().trim().max(180).optional(),
  message: z.string().trim().min(10, 'Please add a little more detail (at least 10 characters).').max(3000, 'Message is too long.'),
  website: z.string().max(0, 'Spam check failed.'),
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

const DEFAULT_ENDPOINT = 'https://formsubmit.co/ajax/venkat@saienterprises.info';
const MIN_FORM_FILL_TIME_MS = 1200;
const SUBMISSION_COOLDOWN_MS = 8000;

let lastSubmissionAt = 0;

const getEndpoint = () => {
  const configured = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim();
  const endpoint = configured || DEFAULT_ENDPOINT;
  const url = new URL(endpoint);
  if (url.protocol !== 'https:') throw new Error('Contact endpoint must use HTTPS.');
  return url.toString();
};

export async function submitContactInquiry(
  inquiry: ContactInquiry,
  options: { startedAt: number; signal?: AbortSignal },
) {
  const data = contactInquirySchema.parse(inquiry);
  const now = Date.now();

  if (now - options.startedAt < MIN_FORM_FILL_TIME_MS || now - lastSubmissionAt < SUBMISSION_COOLDOWN_MS) {
    throw new Error('Please wait a moment before submitting.');
  }

  const response = await fetch(getEndpoint(), {
    method: 'POST',
    signal: options.signal,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      _replyto: data.email,
      _cc: 'msrao@saienterprises.info',
      company: data.company || 'Not provided',
      phone: data.phone || 'Not provided',
      category: data.category || 'Not selected',
      machine: data.machine || 'Not selected',
      message: data.message,
      _subject: `New website inquiry from ${data.name}`,
      _template: 'table',
      _honey: data.website,
    }),
  });

  const result = await response.json().catch(() => null) as { success?: boolean; message?: string } | null;
  if (!response.ok || result?.success === false) {
    throw new Error(result?.message || `Submission failed (${response.status}).`);
  }

  lastSubmissionAt = now;
}
