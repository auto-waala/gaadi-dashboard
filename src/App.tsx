// App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { SilentDataLoader } from "@/components/SilentDataLoader"; // Import this
import Index from "./pages/Index.tsx";
import ListingDetails from "./pages/ListingDetails.tsx";
import Auth from "./pages/Auth.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import SellOnboarding from "./pages/SellOnboarding.tsx";
import SellerDashboard from "./pages/SellerDashboard.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import SectionListing from "./pages/SectionListing.tsx";
import SectionDetails from "./pages/SectionDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicyComponent.tsx";
import TermsOfService from "./pages/TermsConditions.tsx";
import Contact from "./pages/ContactPage.tsx";
import CookiesPolicy from "./pages/CookiePolicy.tsx";
import Careers from "./pages/Careers.tsx";
import AboutUs from "./pages/About.tsx";
import Blog from "./pages/Blog.tsx";
import Press from "./pages/Press.tsx";
import { EnquiryPopup } from "./components/site/EnquiryPopup";
import { GeolocationPrompt } from "./components/site/GeolocationPrompt";
import { VisitorTracker } from "./components/site/VisitorTracker";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <VisitorTracker />
        <AuthProvider>
          <SilentDataLoader />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/sell" element={<SellOnboarding />} />
            <Route path="/dashboard" element={<SellerDashboard />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/:section/cars" element={<SectionListing />} />
            <Route path="/:section/cars/:id" element={<SectionDetails />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <EnquiryPopup />
          <GeolocationPrompt />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;