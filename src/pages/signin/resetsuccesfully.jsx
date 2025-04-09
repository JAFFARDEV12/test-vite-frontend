import React from "react";
import AuthImage from "../../components/authImage/Authimage";
import { Link } from "react-router-dom";
import LockImage from "../../components/authImage/lockImage";

export default function ResetSuccessfully() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen overflow-hidden">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center px-6 sm:px-10 h-screen">
        {/* Lock Image - Positioned Above */}
        <LockImage className="w-[100px] sm:w-[133.82px] h-[100px] sm:h-[133px] mb-4" />

        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center">
          WELL DONE!
        </h2>
        <p className="text-gray-600 text-center mt-2 w-74">
          You have successfully changed your password. Please use your new
          password when signing in.
        </p>

        <Link to="/" className="mt-6">
          <button className="bg-[#1F1F1F] text-white px-6 py-3 rounded-lg text-lg font-semibold">
            Sign In to Continue
          </button>
        </Link>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center h-screen">
        <AuthImage />
      </div>
    </div>
  );
}
