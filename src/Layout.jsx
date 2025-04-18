import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}
