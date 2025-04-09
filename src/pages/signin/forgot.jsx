import React from "react";
import { Link } from "react-router-dom";
import AuthImage from "../../components/authImage/Authimage";

export default function ForgotPassword() {
  return (
    <div className="flex h-screen">
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center">
        <div className="w-2/3">
          <h1 className="font-['Roboto'] text-4xl mb-6 text-center text-black">
            Forgot Password
          </h1>
          <p className="text-[#616161] text-center mb-6">
            {" "}
            We will send a confirmation message to your email in order to
            recover your password.
          </p>
          <div className="">
            <label className=" text-m font-medium text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-[100%] p-3 border border-gray-400 rounded-[140px] mb-10 text-lg text-black placeholder-gray-600"
            />

            <button className=" w-[100%] bg-[#1F1F1F] text-white p-3 rounded-[140px] text-lg font-semibold hover:bg-[#1F1F1F] transition">
              Submit
            </button>
          </div>
        </div>

        <div className="md:mt-48 mt-20 flex justify-end items-end text-center">
          <span className="text-gray-600 text-lg">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-[#1F1F1F] font-semibold hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <AuthImage />
      </div>
    </div>
  );
}
