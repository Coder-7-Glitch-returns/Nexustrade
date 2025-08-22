import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleReset(e) {
    setLoading(true);
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!password || !confirmPassword) {
      setTimeout(() => {
        setMessage("Fields Are Required");
        setMessageType("error");
        setLoading(false);
      }, 2000);
      return;
    } else if (password !== confirmPassword) {
      setTimeout(() => {
        setMessage("Password do not match");
        setMessageType("error");
        setLoading(false);
      }, 2000);
      return;
    } else {
      setTimeout(() => {
        console.log("New Password: ", password);
        setMessage("Password Reset Successfully");
        setMessageType("success");
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        navigate("/auth");
      }, 4000);
    }
  }
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
          <form onSubmit={handleReset}>
            <div className="mb-4 relative">
              <label
                className="block text-gray-400 text-sm font-medium mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white pr-10"
                placeholder="Enter your new password"
              />
              <button
                type="button"
                className="absolute right-3 top-[45px]   text-gray-400 hover:text-yellow-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <div className="mb-6 relative">
              <label
                className="block text-gray-400 text-sm font-medium mb-2"
                htmlFor="confirmPassword"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white pr-10"
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                className="absolute right-3 top-[45px] text-gray-400 hover:text-yellow-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
              {loading ? "Reseting Password..." : "Reset Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
