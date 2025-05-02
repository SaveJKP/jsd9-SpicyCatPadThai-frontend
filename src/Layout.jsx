import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "./components/ScrollToTop";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ScrollToTop />
      <div className="flex-1">
        <Outlet />
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}
