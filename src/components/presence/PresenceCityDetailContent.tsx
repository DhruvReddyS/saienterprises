import { motion } from 'framer-motion';
import {
  Building2,
  Briefcase,
  Handshake,
  Mail,
  MapPin,
  Phone,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  type PresenceCity,
  type PresenceType,
  presenceTypeLabels,
} from '@/data/indiaPresence';

interface PresenceCityDetailContentProps {
  city: PresenceCity;
}

const typeMeta: Record<
  PresenceType,
  {
    accentClass: string;
    icon: typeof Building2;
  }
> = {
  headquarters: {
    accentClass:
      'border-[hsl(var(--primary)/0.18)] bg-[hsl(var(--primary)/0.1)] text-primary',
    icon: Building2,
  },
  salesOffice: {
    accentClass:
      'border-[hsl(195_82%_31%/0.18)] bg-[hsl(195_82%_31%/0.1)] text-[hsl(195_82%_31%)]',
    icon: Briefcase,
  },
  serviceCentre: {
    accentClass:
      'border-[hsl(var(--yellow)/0.24)] bg-[hsl(var(--yellow)/0.14)] text-[hsl(var(--yellow-foreground))]',
    icon: Wrench,
  },
  salesPartner: {
    accentClass:
      'border-[hsl(var(--accent)/0.18)] bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--accent))]',
    icon: Handshake,
  },
};

const cleanPhoneHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

const PresenceCityDetailContent = ({
  city,
}: PresenceCityDetailContentProps) => {
  const totalContactPoints = city.entries.reduce(
    (sum, entry) =>
      sum + entry.contacts.length + (entry.companyEmails?.length ?? 0),
    0,
  );

  return (
    <motion.div
      key={city.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <div className="rounded-[26px] border border-border/70 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <MapPin className="h-3.5 w-3.5" />
              Active location
            </div>

            <div>
              <h3 className="text-3xl text-foreground sm:text-4xl">
                {city.city}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {city.state}, India
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:min-w-[180px]">
            <div className="rounded-2xl border border-border/70 bg-secondary/20 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Entries
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {city.entries.length}
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-secondary/20 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Contacts
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {totalContactPoints}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[...new Set(city.entries.map((entry) => entry.type))].map((type) => (
            <span
              key={type}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium',
                typeMeta[type].accentClass,
              )}
            >
              {presenceTypeLabels[type]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:gap-4">
        {city.entries.map((entry) => {
          const Icon = typeMeta[entry.type].icon;
          const hasContacts =
            entry.contacts.length > 0 || (entry.companyEmails?.length ?? 0) > 0;

          return (
            <motion.article
              key={entry.id}
              layout
              className="rounded-[26px] border border-border/70 bg-white p-5 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.22)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border',
                      typeMeta[entry.type].accentClass,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {presenceTypeLabels[entry.type]}
                    </p>
                    <h4 className="mt-1 text-xl text-foreground">
                      {entry.company}
                    </h4>
                    {entry.territory ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Coverage: {entry.territory}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {entry.description}
              </p>

              {entry.companyEmails?.length ? (
                <div className="mt-4 rounded-2xl border border-border/70 bg-secondary/20 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Company email
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.companyEmails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/25 hover:text-primary"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {entry.contacts.length > 0 ? (
                <div className="mt-4 grid gap-3">
                  {entry.contacts.map((contact) => (
                    <div
                      key={`${entry.id}-${contact.name}`}
                      className="rounded-2xl border border-border/70 bg-secondary/20 px-4 py-3"
                    >
                      <p className="font-semibold text-foreground">
                        {contact.name}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {contact.phone ? (
                          <a
                            href={cleanPhoneHref(contact.phone)}
                            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/25 hover:text-primary"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {contact.phone}
                          </a>
                        ) : null}

                        {contact.email ? (
                          <a
                            href={`mailto:${contact.email}`}
                            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/25 hover:text-primary"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {contact.email}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {!hasContacts ? (
                <div className="mt-4 rounded-2xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                  Direct contact details are coordinated through Sai Enterprises
                  for this support point.
                </div>
              ) : null}
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PresenceCityDetailContent;
