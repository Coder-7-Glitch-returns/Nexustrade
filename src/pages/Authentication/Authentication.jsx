import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Authentication() {
  const [activeTab, setActiveTab] = useState("signup");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] =
    useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic Validations
    if (
      !signUpFormData.name ||
      !signUpFormData.email ||
      !signUpFormData.password ||
      !signUpFormData.confirmPassword
    ) {
      setTimeout(() => {
        setMessage("All Fields are required");
        setMessageType("error");
        setLoading(false);
      }, 2000);
    } else if (signUpFormData.confirmPassword != signUpFormData.password) {
      setTimeout(() => {
        setMessage("Password do not match");
        setMessageType("error");
        setLoading(false);
      }, 2000);
    } else {
      console.log("Sign Up Form submitted:", signUpFormData);
      setTimeout(() => {
        setMessage("Account Created. Redirecting to login to verify...");
        setMessageType("success");
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        setActiveTab("login");
      }, 4000);
    }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic Validations
    if (!loginFormData.email || !loginFormData.password) {
      setTimeout(() => {
        setMessage("All Fields are required");
        setMessageType("error");
        setLoading(false);
      }, 2000);
    } else {
      console.log("Sign Up Form submitted:", signUpFormData);
      setTimeout(() => {
        setMessage("Account Login. Redirecting...");
        setMessageType("success");
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        navigate("/main");
      }, 4000);
    }
  };

  return (
    <div className="relative bg-gradient-to-tr min-h-screen from-gray-800 via-gray-700 to-gray-800 p-3">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 bg-[length:60px_60px] opacity-30 md:block hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(252 211 77 / 0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(252 211 77 / 0.10) 1px, transparent 1px)
          `,
        }}
      />

      {/* Decorative Shapes */}
      <div
        className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-yellow-300/40 to-amber-400/30 rounded-full blur-2xl animate-pulse
      md:block hidden"
      />
      <div
        className="absolute bottom-20 right-10 w-56 h-56 bg-gradient-to-br from-amber-300/40 to-orange-400/30 rounded-full blur-3xl animate-pulse
        md:block hidden"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400/30 to-amber-300/30 rounded-full blur-xl animate-pulse
        md:block hidden"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-orange-300/30 to-yellow-300/20 rounded-full blur-lg animate-pulse
        md:block hidden"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Decorative Shapes with borders */}
      <div
        className="absolute top-32 right-20 w-16 h-16 border-2 border-yellow-300/40 rotate-z-180 animate-spin md:block hidden"
        style={{ animationDuration: "5s" }}
      />
      <div
        className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-amber-400/30 to-yellow-300/30 transform rotate-12 animate-bounce
        md:block hidden"
        style={{ animationDelay: "1.5s", animationDuration: "3s" }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-screen items-center justify-center">
        <div className="bg-gray-800 w-full max-w-lg h-auto rounded-xl p-6 shadow-2xl border border-gray-700">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 p-1 mb-6 shadow-lg">
            <div className="w-full h-full rounded-full bg-gray-800 grid place-items-center p-3">
              <img
                src="/assets/Favicon.svg"
                alt="NexusTrade logo"
                className="w-full"
              />
            </div>
          </div>

          {/* NavTabs */}
          <div className="w-full bg-gray-700 rounded-lg p-1 mb-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "signup"
                    ? "bg-gray-900 text-yellow-400 shadow-inner"
                    : "bg-transparent text-gray-300 hover:bg-gray-600"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-gray-900 text-yellow-400 shadow-inner"
                    : "bg-transparent text-gray-300 hover:bg-gray-600"
                }`}
              >
                Login
              </button>
            </div>
          </div>

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignUp}>
              {messageType === "error" && (
                <div className="bg-red-50 text-red-700 my-3 text-center py-3 rounded-md text-lg">
                  {message}
                </div>
              )}
              {messageType === "success" && (
                <div className="bg-green-50 text-green-700 my-3 text-center py-3 rounded-md text-lg">
                  {message}
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={signUpFormData.name}
                  onChange={handleSignUpInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={signUpFormData.email}
                  onChange={handleSignUpInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  className="block text-gray-400 text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showSignUpPassword ? "text" : "password"}
                  value={signUpFormData.password}
                  onChange={handleSignUpInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[45px]   text-gray-400 hover:text-yellow-500"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                >
                  {showSignUpPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              <div className="mb-6 relative">
                <label
                  className="block text-gray-400 text-sm font-medium mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showSignUpConfirmPassword ? "text" : "password"}
                  value={signUpFormData.confirmPassword}
                  onChange={handleSignUpInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[45px] text-gray-400 hover:text-yellow-500"
                  onClick={() =>
                    setShowSignUpConfirmPassword(!showSignUpConfirmPassword)
                  }
                >
                  {showSignUpConfirmPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-lg"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin}>
              {messageType === "error" && (
                <div className="bg-red-50 text-red-700 my-3 text-center py-3 rounded-md text-lg">
                  {message}
                </div>
              )}
              {messageType === "success" && (
                <div className="bg-green-50 text-green-700 my-3 text-center py-3 rounded-md text-lg">
                  {message}
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-medium mb-2"
                  htmlFor="loginEmail"
                >
                  Email Address
                </label>
                <input
                  id="loginEmail"
                  name="email"
                  type="email"
                  value={loginFormData.email}
                  onChange={handleLoginInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-6 relative">
                <label
                  className="block text-gray-400 text-sm font-medium mb-2"
                  htmlFor="loginPassword"
                >
                  Password
                </label>
                <input
                  id="loginPassword"
                  name="password"
                  type={showLoginPassword ? "text" : "password"}
                  value={loginFormData.password}
                  onChange={handleLoginInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[45px] text-gray-400 hover:text-yellow-500"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              <div className="text-end my-4">
                <Link
                  to={"/otp-send"}
                  className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-bold py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-lg"
              >
                Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authentication;
