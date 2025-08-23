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
    <header className="bg-gray-900 shadow-md w-full border-l-2 border-gray-300 items-center flex justify-between px-1.5 sm:px-3 md:px-6 py-4">
      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold text-yellow-400 font-mono">
          NexusTrade
        </h1>
      </div>

      {/* Profile */}
      <div
        className="flex items-center gap-3 cursor-pointer relative"
        onClick={() => setProfileToggle(!profileToggle)}
      >
        {/* Image */}
        <div className="w-9 h-9">
          <img src={profile.avatar} alt="IMG" className="w-full rounded-full" />
        </div>

        {/* Profile Name */}
        <h1 className="font-semibold text-yellow-400 text-lg">
          {profile.name}
        </h1>

        {/* Dropdown Icon */}
        <FaChevronDown
          className={`text-yellow-400 transition-all ease-in-out duration-300 ${
            profileToggle ? "rotate-180" : "rotate-0"
          }`}
        />

        {/* Dropdown Toggle */}
        {profileToggle && (
          <div
            className={`absolute bg-gray-600 top-[50px] transition-all w-full p-3 rounded-md shadow-xl ${
              profileToggle ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          >
            <ul>
              <Link to={"/main/profile"}>
                <li className="text-gray-300 flex items-center gap-2 hover:bg-yellow-400/30 hover:text-yellow-400 transition-colors p-3 rounded-lg">
                  <FaUserCircle />
                  View Profile
                </li>
              </Link>
              <Link to={"/main/settings"}>
                <li className="text-gray-300 flex items-center gap-2 hover:bg-yellow-400/30 hover:text-yellow-400 transition-colors p-3 rounded-lg">
                  <IoSettingsOutline />
                  Settings
                </li>
              </Link>
              <Link to={"/auth"}>
                <li className="flex items-center gap-2 bg-yellow-400/30 text-yellow-400 p-3 rounded-lg mt-2">
                  <FiLogOut />
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
