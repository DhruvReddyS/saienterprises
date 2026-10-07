import { useEffect, useState, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useScrollToTop } from "./hooks/useScrollToTop";
import PremiumLoader from "./components/PremiumLoader";
import PageSkeleton from "./components/PageSkeleton";
import SocialZone from "./components/SocialZone";
import Index from "./pages/Index";

// Lazy load pages for better performance
const AboutPage = lazy(() => import("./pages/AboutPage"));
const MachineryHub = lazy(() => import("./pages/MachineryHub"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BrochurePage = lazy(() => import("./pages/BrochurePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChatbotWidget = lazy(() => import("./components/ChatbotWidget"));

const queryClient = new QueryClient();

const ProductPreviewRedirect = () => {
  const { categorySlug = "", productId = "" } = useParams();
  return <Navigate replace to={`/machinery?category=${categorySlug}&preview=${productId}`} />;
};

const MachineryCategoryRedirect = () => {
  const { categorySlug = "" } = useParams();
  return <Navigate replace to={`/machinery?category=${categorySlug}`} />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  useScrollToTop();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageSkeleton />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/machinery" element={<MachineryHub />} />
          <Route path="/machinery/:categorySlug" element={<MachineryCategoryRedirect />} />
          <Route path="/machinery/:categorySlug/:productId" element={<ProductPreviewRedirect />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/brochure" element={<BrochurePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const AppContent = () => {
  /* Shown on every full page load. SPA route changes do not remount this,
     so it only appears on a real load or refresh, never on navigation. */
  const [showLoader, setShowLoader] = useState(() => typeof window !== "undefined");
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    const timer = window.setTimeout(() => setShowChatbot(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const handleLoaderComplete = () => setShowLoader(false);

  return (
    <>
      {showLoader && (
        <PremiumLoader onComplete={handleLoaderComplete} />
      )}
      <div 
        style={{ 
          opacity: showLoader ? 0 : 1, 
          transition: 'opacity 0.4s ease',
          visibility: showLoader ? 'hidden' : 'visible'
        }}
      >
        <AnimatedRoutes />
        <SocialZone />
        {showChatbot ? (
          <Suspense fallback={null}>
            <ChatbotWidget />
          </Suspense>
        ) : null}
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
