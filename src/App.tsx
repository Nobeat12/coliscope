
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase, initializeSupabaseDatabase } from "./lib/supabase";
import Index from "./pages/Index";
import Track from "./pages/Track";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Check if Supabase credentials are set
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.");
    } else {
      console.log("Supabase initialized successfully");
      
      // Initialize database structure (optional here, already called in Dashboard)
      // initializeSupabaseDatabase();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/track" element={<Track />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
