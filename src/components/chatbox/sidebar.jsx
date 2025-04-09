import React from "react";
import { FaBars } from "react-icons/fa";
import SidebarImage from "../../assets/sidebar.svg";
import BackButton from "../../assets/BackBtn.svg";

const ChatScreenSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarItems = ["New Chat", "Search", "Documents", "History"];

  return (
    <div
      className={`transition-all flex flex-col justify-between duration-300 text-white h-full z-40 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
      style={{
        backgroundImage: `url(${SidebarImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isSidebarOpen ? (
        <div className="p-4">
          <h1 className="font-bold text-[28px] mt-7 text-white">DOCUMIND AI</h1>
          <p className="text-gray-300 mt-2 text-sm">Intelligent Docs, Instant Insights.</p>

          <div className="flex items-center mt-6">
            <hr className="w-[130px] border-gray-400 mr-2" />
            <img src={BackButton} alt="Back" className="w-3 h-3 cursor-pointer" />
            <button
              className="ml-2 text-sm text-white hover:underline"
              onClick={() => setIsSidebarOpen(false)}
            >
              Minimize
            </button>
          </div>

          <nav className="mt-6">
            <ul>
              {sidebarItems.map((name, index) => (
                <li
                  key={index}
                  className="text-[#AEAEAE] p-3 rounded cursor-pointer hover:bg-[#393939]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start pt-4 h-full">
          <button className="text-white text-xl mb-4" onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatScreenSidebar;
