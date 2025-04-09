import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import Header from "../Header/header"; // Import Header
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Optional: clear search when route changes
  useEffect(() => {
    setSearchQuery("");
  }, [location]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Optionally you can lift and manage per-page context
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      <main className="flex-1 bg-gray-100 overflow-auto transition-all duration-300">
        <Header handleSearch={handleSearch} />
        <div className="p-4 sm:p-6">
          <Outlet context={{ searchQuery }} />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
