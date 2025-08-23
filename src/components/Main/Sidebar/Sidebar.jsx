import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { LuChartCandlestick } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import { FiX } from "react-icons/fi";

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 md:relative md:translate-x-0 w-64 bg-gray-900 min-h-screen py-3 z-50 transform transition-transform duration-300">
      <div className="flex justify-between items-center px-3">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-yellow-400 font-mono">
          NexusTrade
        </h1>
        {/* Close button for mobile */}
        <FiX className="text-gray-400 hover:text-yellow-400 cursor-pointer text-2xl md:hidden" />
      </div>
      <hr className="my-7 rounded-full border border-gray-700" />
      {/* Links */}
      <ul className="px-3">
        <Link
          to="/main/"
          className="p-3 rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-400/30 hover:text-yellow-400 text-gray-400"
        >
          <MdOutlineDashboard /> Dashboard
        </Link>
        <Link
          to="/main/market"
          className="p-3 rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-400/30 hover:text-yellow-400 text-gray-400"
        >
          <LuChartCandlestick /> Orders
        </Link>
        <Link
          to="/main/trading"
          className="p-3 rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-400/30 hover:text-yellow-400 text-gray-400"
        >
          <BsCoin /> Trading
        </Link>
        <Link
          to="/main/favorites"
          className="p-3 rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-400/30 hover:text-yellow-400 text-gray-400"
        >
          <FaRegHeart /> Favorites
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
