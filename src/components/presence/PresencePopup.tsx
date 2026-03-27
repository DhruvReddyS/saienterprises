import { AnimatePresence } from 'framer-motion';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import type { PresenceCity } from '@/data/indiaPresence';
import PresenceCityDetailContent from '@/components/presence/PresenceCityDetailContent';

interface PresencePopupProps {
  city: PresenceCity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PresencePopup = ({
  city,
  open,
  onOpenChange,
}: PresencePopupProps) => {
  const isMobile = useIsMobile();

  if (!city || !isMobile) return null;

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerContent className="max-h-[88vh] rounded-t-[28px] border border-border bg-white px-0 pb-0 shadow-[0_-24px_60px_-40px_rgba(15,23,42,0.42)]">
        <DrawerTitle className="sr-only">
          {city.city} presence details
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          Contact and presence details for {city.city}, {city.state}.
        </DrawerDescription>
        <div className="overflow-y-auto px-4 pb-5 pt-3">
          <AnimatePresence mode="wait">
            <PresenceCityDetailContent city={city} />
          </AnimatePresence>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PresencePopup;
