import React from "react";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 p-3">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-25 h-25">
          <img src="/assets/Logo.png" alt="IMG" className="w-full" />
        </div>
        <h1 className="">NexusTrade</h1>
      </div>
    </div>
  );
}

export default Sidebar;
