import React from "react";
import { FaBars } from "react-icons/fa";
import SidebarImage from "../../assets/Sidebar.svg";
import BackButton from "../../assets/BackBtn.svg";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "AI Agents", path: "/ai-agent" },
    { name: "Document Repository", path: "/document-repository" },
    { name: "Settings", path: "/settings" },
  ];

  const isCollapsed = !isOpen && !isMobile;

  const linkClass = ({ isActive }) =>
    `text-[#AEAEAE] p-3 cursor-pointer transition block ${
      isActive ? "bg-[#393939] ml-2 text-white" : "hover:bg-[#393939]"
    }`;

  return (
    <>
      {isMobile && !isOpen && (
        <button
          className="fixed top-2 left-2 z-50 text-white text-xl bg-black/60 p-2 rounded-full"
          onClick={() => setIsOpen(true)}
          title="Open Menu"
        >
          <FaBars />
        </button>
      )}

      <div
        className={`transition-all duration-300 text-white h-full z-40 ${
          isMobile
            ? isOpen
              ? "fixed top-0 left-0 w-64"
              : "hidden"
            : isOpen
            ? "w-56"
            : "w-16"
        }`}
        style={{
          backgroundImage: `url(${SidebarImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {isCollapsed && (
          <div className="flex flex-col items-center pt-4">
            <button
              className="text-white text-xl cursor-pointer"
              onClick={() => setIsOpen(true)}
              title="Open Sidebar"
            >
              <FaBars />
            </button>
          </div>
        )}

        {isOpen && (
          <div className="p-4">
            <h1 className="font-'Bebas Neue' text-[30px] mt-7">DOCUMIND AI</h1>
            <p className="text-gray-300 mt-2">
              Intelligent Docs, Instant Insights.
            </p>

            <div className="flex items-center mt-10">
              <hr className="w-[130px] border-gray-400 mr-2" />
              <img
                src={BackButton}
                alt="Back"
                className="w-3 h-3 cursor-pointer"
              />
              <button
                className="ml-2 text-sm text-white hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Minimize
              </button>
            </div>

            <nav className="mt-6">
              <ul>
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={linkClass}
                      onClick={() => {
                        if (isMobile) setIsOpen(false);
                      }}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
