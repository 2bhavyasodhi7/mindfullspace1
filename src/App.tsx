
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sleep from "./pages/Sleep";
import Meditation from "./pages/Meditation";
import StressAndAnxiety from "./pages/StressAndAnxiety";
import Journaling from "./pages/Journaling";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Rewards from "./pages/Rewards";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Yoga from "./pages/Yoga";
import AIChat from "./pages/AIChat";
import BackgroundWrapper from "./components/BackgroundWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BackgroundWrapper>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/sleep" element={<Sleep />} />
                  <Route path="/meditation" element={<Meditation />} />
                  <Route path="/stress-and-anxiety" element={<StressAndAnxiety />} />
                  <Route path="/journaling" element={<Journaling />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/article/:id" element={<ArticleDetail />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/yoga" element={<Yoga />} />
                  <Route path="/ai-chat" element={<AIChat />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BackgroundWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
