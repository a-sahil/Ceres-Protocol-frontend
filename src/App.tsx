import { ThirdwebProvider } from "thirdweb/react"; // 1. Import the provider
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/Listings";
import Register from "./pages/Register";
import WarehouseDetails from "./pages/WarehouseDetails";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  // 2. Wrap your entire application with ThirdwebProvider
  <ThirdwebProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/register" element={<Register />} />
              <Route path="/warehouse/:id" element={<WarehouseDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThirdwebProvider>
);

export default App;