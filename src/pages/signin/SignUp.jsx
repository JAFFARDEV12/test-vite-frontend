import React, { useState } from "react";
import AuthImage from "../../components/authImage/Authimage";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users/register", {
        userName: email.split("@")[0], // basic username generation
        email,
        password
      });

      if (response.status === 200) {
        navigate("/"); // redirect to login page
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="overflow-hidden flex flex-col sm:flex-row h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="font-bebas text-4xl mt-[10px] mb-3 text-center text-[#343434]">
            DocuMind AI
          </h2>
          <h3 className="text-xl mb-4 text-center text-black">
            Welcome to DocuMind AI!
          </h3>

          <p className="text-gray-600 text-center mb-6">
            Please enter details to log in to your account
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4 ">
            <label className="mb-[3px] text-lg font-medium text-gray-800 ">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-3 border border-gray-400 rounded-[140px] text-lg text-black placeholder-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full  p-3 border border-gray-400 rounded-[140px] text-lg text-black placeholder-gray-600 pr-10"
              />
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium text-gray-800">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="mb-10 w-full p-3 border border-gray-400 rounded-[140px] text-lg text-black placeholder-gray-600 pr-10"
              />
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            className="w-full bg-[#1F1F1F] text-white p-3 rounded-[140px] text-lg font-semibold hover:bg-[#1F1F1F] transition"
          >
            Sign Up
          </button>

          <div className="ml-[45%] flex items-center  mt-[8px]  space-x-0.1">
            <hr className="w-[5px] border-gray-500" />
            <span className="px-1 text-gray-500">or</span>
            <hr className="w-[5px] border-gray-500" />
          </div>

          <div className="mt-20 text-center">
            <span className="text-gray-600 text-lg">
              Already have an account?{" "}
            </span>
            <Link
              to="/"
              className="text-[#1F1F1F] font-semibold hover:underline"
            >
              login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden sm:Hidden md:flex w-1/2 items-center justify-center">
        <AuthImage />
      </div>
    </div>
  );
}
