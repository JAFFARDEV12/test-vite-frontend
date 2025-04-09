import React from "react";
import AuthImage from "../../components/authImage/Authimage";

export default function ResetPassword() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center h-full">
        <div className="" style={{ height: "409px" }}>
          <h2 className="font-['Roboto'] text-2xl font-bold mb-4 text-center text-[#1F1F1F]">
            RESET YOUR PASSWORD
          </h2>
          <p className="font-['Roboto'] text-gray-600 text-center mb-6">
            Please enter your new password.
          </p>

          <div className="mb-4 w-full">
            <label className="block text-[#3F3F3F] font-bold mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-400 rounded-[140px] text-lg text-black placeholder-gray-600"
              />
              <span className="absolute right-3 top-3 cursor-pointer">👁</span>
            </div>
          </div>

          <div className="mb-6 w-full">
            <label className="block text-[#3F3F3F]  font-bold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-400 rounded-[140px] text-lg text-black placeholder-gray-600"
              />
              <span className="absolute right-3 top-3 cursor-pointer">👁</span>
            </div>
          </div>

          <button className="w-full bg-[#1F1F1F] text-white p-3 rounded-[140px] text-lg font-semibold hover:bg-[#1F1F1F] transition">
            Reset Password
          </button>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center h-screen">
        <AuthImage />
      </div>
    </div>
  );
}
