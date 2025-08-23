import React from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { LuChartCandlestick } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCoin } from "react-icons/bs";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 shadow-xl py-4 flex flex-col">
      {/* Logo */}
      <div className="px-6 text-center">
        <h1 className="text-3xl font-extrabold text-yellow-400 font-mono tracking-wide">
          NexusTrade
        </h1>
      </div>
      <hr className="my-6 rounded-full border border-gray-700" />
      {/* NavLinks */}
      <nav className="px-4 flex-grow">
        <ul className="space-y-2">
          <NavLink
            to="/main/dashboard"
            className={({ isActive }) =>
              `p-3 rounded-md flex items-center gap-4 transition-all duration-300 ${
                isActive
                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
                  : "text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-300"
              }`
            }
          >
            <MdOutlineDashboard />
            <span className="text-lg font-medium">Dashboard</span>
          </NavLink>
          <NavLink
            to="/main/market"
            className={({ isActive }) =>
              `p-3 rounded-md flex items-center gap-4 transition-all duration-300 ${
                isActive
                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
                  : "text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-300"
              }`
            }
          >
            <LuChartCandlestick />
            <span className="text-lg font-medium">Market</span>
          </NavLink>
          <NavLink
            to="/main/trading"
            className={({ isActive }) =>
              `p-3 rounded-md flex items-center gap-4 transition-all duration-300 ${
                isActive
                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
                  : "text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-300"
              }`
            }
          >
            <BsCoin />
            <span className="text-lg font-medium">Trading</span>
          </NavLink>
          <NavLink
            to="/main/favorites"
            className={({ isActive }) =>
              `p-3 rounded-md flex items-center gap-4 transition-all duration-300 ${
                isActive
                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
                  : "text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-300"
              }`
            }
          >
            <FaRegHeart />
            <span className="text-lg font-medium">Favorites</span>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
