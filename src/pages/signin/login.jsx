import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthImage from "../../components/authImage/Authimage";
import axios from "axios";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);
  
      const response = await axios.post(
        "http://localhost:8000/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="font-bebas text-3xl mt-[15px] mb-5 text-center text-[#343434]">
            DocuMind AI
          </h2>
          <h3 className="text-2xl mt-10 mb-4 text-center text-[#343434]">
            Welcome to DocuMind AI!
          </h3>

          <p className="text-gray-600 text-center mb-6">
            Please enter details to log in to your account
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label className="text-gray-700 text-lg font-semibold block mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-3 border-[1px] border-gray-400 rounded-[140px] text-lg text-black placeholder-gray-600"
            />
          </div>

          <div className="mb-4 relative">
            <label className="text-gray-700 text-lg font-semibold block mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border-[1px] border-gray-400 rounded-[140px] text-lg text-black placeholder-gray-600 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-5 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2 " />
              Remember password
            </label>
            <Link to="/forgot" className="text-[#262626] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="w-full mb-[14px] bg-[#1F1F1F] text-white p-3 rounded-[140px] text-lg font-semibold hover:bg-[#000000] transition"
          >
            Login
          </button>

          <div className="ml-[45%] flex items-center my-2 space-x-0.1">
            <hr className="w-[5px] border-gray-500" />
            <span className="px-1 text-gray-500">or</span>
            <hr className="w-[5px] border-gray-500" />
          </div>

          <div className="mt-20 text-center">
            <span className="text-gray-600 text-lg">
              Don't have an account?{" "}
            </span>
            <Link
              to="/signup"
              className="text-[#1F1F1F] font-semibold hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <AuthImage />
      </div>
    </div>
  );
}
