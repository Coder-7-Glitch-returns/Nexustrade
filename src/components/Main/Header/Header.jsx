import React, { useState } from "react";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header() {
  const [profileToggle, setProfileToggle] = useState(false);
  const UID = 1;
  const [profile, setProfile] = useState({
    name: "Muhammad Ahad",
    avatar: `/assets/user_image_${UID}.jpg`,
  });

  return (
    <header className="bg-gray-900 shadow-lg w-full px-6 py-4 h-[77.5px] flex items-center justify-between border-b-2 border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-extrabold text-yellow-400 font-sans tracking-wide">
          NexusTrade
        </h1>
      </div>

      {/* Profile */}
      <div
        className="flex items-center gap-3 cursor-pointer relative"
        onClick={() => setProfileToggle(!profileToggle)}
      >
        {/* Image */}
        <div className="w-10 h-10 overflow-hidden rounded-full shadow-md">
          <img
            src={profile.avatar}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Name */}
        <h1 className="font-semibold text-yellow-400 text-lg hidden sm:block">
          {profile.name}
        </h1>

        {/* Dropdown Icon */}
        <FaChevronDown
          className={`text-yellow-400 transition-all duration-300 ${
            profileToggle ? "rotate-180" : "rotate-0"
          }`}
        />

        {/* Dropdown Toggle */}
        {profileToggle && (
          <div
            className={`absolute bg-gray-800 top-[60px] right-0 w-52 p-2 rounded-xl shadow-2xl transition-all duration-300 transform origin-top`}
            style={{
              transform: profileToggle ? "scaleY(1)" : "scaleY(0)",
              opacity: profileToggle ? 1 : 0,
            }}
          >
            <ul className="space-y-1">
              <Link to="/main/profile">
                <li className="text-gray-300 flex items-center gap-3 hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors p-3 rounded-lg">
                  <FaUserCircle className="text-xl" />
                  View Profile
                </li>
              </Link>
              <Link to="/main/settings">
                <li className="text-gray-300 flex items-center gap-3 hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors p-3 rounded-lg">
                  <IoSettingsOutline className="text-xl" />
                  Settings
                </li>
              </Link>
              <Link to="/auth">
                <li className="flex items-center gap-3 bg-yellow-400/30 text-yellow-400 p-3 rounded-lg mt-2 hover:bg-yellow-400/40 transition-colors">
                  <FiLogOut className="text-xl" />
                  Log Out
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
