import React, { useEffect, useState } from "react";
import ChatScreenSidebar from "../chatbox/sidebar";
import ChatScreen from "../../pages/chatbox/chat";

const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 👇 Collapse sidebar automatically on small/medium screens
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleResize = () => setIsSidebarOpen(!mediaQuery.matches);

    handleResize(); // initial check
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <div className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300`}>
        <ChatScreenSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-1">
        <ChatScreen />
      </div>
    </div>
  );
};

export default ChatLayout;
