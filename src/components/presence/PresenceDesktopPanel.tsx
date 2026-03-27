import { MapPin } from 'lucide-react';
import type { PresenceCity } from '@/data/indiaPresence';
import PresenceCityDetailContent from '@/components/presence/PresenceCityDetailContent';

interface PresenceDesktopPanelProps {
  city: PresenceCity | null;
}

const PresenceDesktopPanel = ({ city }: PresenceDesktopPanelProps) => {
  if (!city) {
    return (
      <div className="rounded-[30px] border border-primary/10 bg-white p-5 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.42)]">
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[24px] border border-dashed border-border/80 bg-white px-6 text-center">
          <MapPin className="h-10 w-10 text-primary/60" />
          <h3 className="mt-5 text-3xl text-foreground">Select a city</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Click a city pin on the map to view its offices, service centres,
            and partner contacts in this panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[30px] border border-primary/10 bg-white p-4 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.42)] sm:p-5">
      <div className="max-h-[780px] overflow-y-auto pr-1">
        <PresenceCityDetailContent city={city} />
      </div>
    </div>
  );
};

export default PresenceDesktopPanel;
