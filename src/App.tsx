
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import FilteredWhispers from "./pages/FilteredWhispers";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  
  // Determine the background class based on the current route
  const getBackgroundClass = () => {
    if (location.pathname === '/') return '';
    if (location.pathname === '/auth') return 'bg-auth';
    if (location.pathname === '/whispers') return 'whispers-page';
    if (location.pathname.startsWith('/filtered')) return 'filtered-page';
    return 'bg-magical';
  };
  
  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/whispers"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filtered/:filter"
            element={
              <ProtectedRoute>
                <FilteredWhispers />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
