import { useState, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useScrollToTop } from "./hooks/useScrollToTop";
import PremiumLoader from "./components/PremiumLoader";
import PageSkeleton from "./components/PageSkeleton";
import ChatbotWidget from "./components/ChatbotWidget";
import SocialZone from "./components/SocialZone";
import MobileBottomNav from "./components/MobileBottomNav";
import Index from "./pages/Index";

// Lazy load pages for better performance
const AboutPage = lazy(() => import("./pages/AboutPage"));
const MachineryHub = lazy(() => import("./pages/MachineryHub"));
const MachineryCategory = lazy(() => import("./pages/MachineryCategory"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BrochurePage = lazy(() => import("./pages/BrochurePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ProductPreviewRedirect = () => {
  const { categorySlug = "", productId = "" } = useParams();
  return <Navigate replace to={`/machinery/${categorySlug}?preview=${productId}`} />;
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
          <Route path="/machinery/:categorySlug" element={<MachineryCategory />} />
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
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("sai-loader-seen");
  });

  const handleLoaderComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sai-loader-seen", "1");
    }
    setShowLoader(false);
  };

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
        <ChatbotWidget />
        <MobileBottomNav />
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
