import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import UserImg from "../../assets/userimage.svg";
import { ChevronDown } from "lucide-react";
import { useClerk } from "@clerk/clerk-react";

const Header = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { signOut } = useClerk();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  useEffect(() => {
    if (handleSearch) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch]);

  const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;

  return (
    <header className="w-full flex items-center justify-between flex-wrap gap-4 p-2 sm:p-3 mb-4 shadow-xl">
      {/* Search Bar */}
      <div className="flex-grow max-w-full sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search agents, Documents"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-gray-500 w-full py-2 pl-10 pr-4 rounded-3xl border text-sm sm:text-base border-gray-600"
        />
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="hidden lg:block text-sm text-[#656565]">{formattedTime}</span>
        <FaBell className="text-[#656565] text-xl cursor-pointer" />
        <img
          src={UserImg}
          alt="User"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer"
        />

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-1 text-[#656565] hover:text-gray-800 focus:outline-none mr-4"
          >
            <div className="flex flex-col">
              <p className="text-sm sm:text-base whitespace-nowrap">Welcome</p>
              <p className="text-black font-bold cursor-pointer">Logout</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-32 py-2 z-10">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={signOut}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
