import React from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { LuChartCandlestick } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCoin } from "react-icons/bs";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 py-3">
      {/* Logo */}
      <div className="px-3 text-center">
        <h1 className="text-3xl font-bold text-yellow-400 font-mono">
          NexusTrade
        </h1>
      </div>
      <hr className="my-7 rounded-full border border-gray-700" />
      {/* NavLinks */}
      <ul className="px-3">
        <NavLink
          to="/main/"
          className="p-3 rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-400/30 hover:text-yellow-400 text-gray-400"
        >
          <MdOutlineDashboard /> Dashboard
        </NavLink>
        <NavLink
          to="/main/market"
          className="p-3 rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-400/30 hover:text-yellow-400 text-gray-400"
        >
          <LuChartCandlestick /> Market
        </NavLink>
        <NavLink
          to="/main/trading"
          className="p-3 rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-400/30 hover:text-yellow-400 text-gray-400"
        >
          <BsCoin /> Trading
        </NavLink>
        <NavLink
          to="/main/favorites"
          className="p-3 rounded-lg flex items-center gap-2 transition-colors hover:bg-yellow-400/30 hover:text-yellow-400 text-gray-400"
        >
          <FaRegHeart /> Favorites
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
