
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
import BibliotecaInvisibile from "./pages/BibliotecaInvisibile";
import VociPassato from "./pages/VociPassato";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  
  // Determine the background class based on the current route
  const getBackgroundClass = () => {
    if (location.pathname === '/') return 'bg-gradient-to-br from-limbus-900 via-purple-900 to-blue-900 text-white';
    if (location.pathname === '/auth') return 'bg-auth';
    if (location.pathname === '/whispers') return 'whispers-page';
    if (location.pathname.startsWith('/filtered')) return 'filtered-page';
    if (location.pathname === '/biblioteca') return 'biblioteca-page';
    if (location.pathname === '/passato') return 'passato-page';
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
          <Route
            path="/biblioteca"
            element={
              <ProtectedRoute>
                <BibliotecaInvisibile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passato"
            element={
              <ProtectedRoute>
                <VociPassato />
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
        <Sonner position="top-right" closeButton theme="light" richColors />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
