
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import DevicesPage from "./pages/DevicesPage";
import NetworkPage from "./pages/NetworkPage";
import SecurityPage from "./pages/SecurityPage";
import ThreatsPage from "./pages/ThreatsPage";
import DeviceThreatsPage from "./pages/DeviceThreatsPage";
import MonitoringPage from "./pages/MonitoringPage";
import HelpPage from "./pages/HelpPage";
import SettingsPage from "./pages/SettingsPage";
import { apiService } from "./services/apiService";

// Front website pages
import HomePage from "./pages/front/HomePage";
import AboutPage from "./pages/front/AboutPage";
import FeaturesPage from "./pages/front/FeaturesPage";
import AboutUsPage from "./pages/front/AboutUsPage";
import ContactUsPage from "./pages/front/ContactUsPage";
import PrivacyPolicyPage from "./pages/front/PrivacyPolicyPage";
import TermsPage from "./pages/front/TermsPage";

// Create the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Initialize app settings
const initializeAppSettings = () => {
  // Load scanning settings
  const scanningSettings = localStorage.getItem('scanningSettings');
  if (scanningSettings) {
    const settings = JSON.parse(scanningSettings);
    apiService.setConfig({
      autoScan: settings.autoScan,
      scanInterval: parseInt(settings.scanInterval || '12'),
      deepScan: settings.deepScan,
      scanPorts: settings.scanPorts,
      osDetection: settings.osDetection
    });
  }

  // Load security settings
  const securitySettings = localStorage.getItem('securitySettings');
  if (securitySettings) {
    const settings = JSON.parse(securitySettings);
    apiService.setSecurityConfig({
      autoBlock: settings.autoBlock,
      threatAnalysis: settings.threatAnalysis,
      saveHistory: settings.saveHistory,
      anonymousData: settings.anonymousData
    });
  }

  // Apply display settings to document
  const displaySettings = localStorage.getItem('displaySettings');
  if (displaySettings) {
    const settings = JSON.parse(displaySettings);
    if (settings.compactView) {
      document.body.classList.add('compact-view');
    } else {
      document.body.classList.remove('compact-view');
    }
  }
};

const AppContent = () => {
  useEffect(() => {
    // Initialize app settings when component mounts
    initializeAppSettings();
  }, []);

  return (
    <Routes>
      {/* Front website routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      
      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Index />} />
      <Route path="/dashboard/statistics" element={<Statistics />} />
      <Route path="/dashboard/devices" element={<DevicesPage />} />
      <Route path="/dashboard/network" element={<NetworkPage />} />
      <Route path="/dashboard/security" element={<SecurityPage />} />
      <Route path="/dashboard/threats" element={<ThreatsPage />} />
      <Route path="/dashboard/device-threats" element={<DeviceThreatsPage />} />
      <Route path="/dashboard/monitoring" element={<MonitoringPage />} />
      <Route path="/dashboard/help" element={<HelpPage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
