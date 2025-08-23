import React from "react";
import { FaChartLine, FaDollarSign, FaHeart } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";

function Cards() {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  const dashboardStats = [
    {
      title: "Holdings",
      count: 124,
      icon: <FaHandHoldingDollar />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
    },
    {
      title: "Portfolio",
      count: 15600,
      icon: <FaDollarSign />,
      color: "text-green-400",
      bgColor: "bg-green-400/20",
    },
    {
      title: "Trading Volume",
      count: 1200000,
      icon: <FaChartLine />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20",
    },
    {
      title: "Favorites",
      count: 32,
      icon: <FaHeart />,
      color: "text-red-400",
      bgColor: "bg-red-400/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardStats.map((stat, i) => (
        <div
          key={i}
          className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            {/* Content */}
            <div className="flex flex-col gap-2">
              {/* Heading */}
              <div>
                <h1 className="text-sm font-medium text-gray-400 tracking-wide">
                  {stat.title.toUpperCase()}
                </h1>
              </div>

              {/* Count */}
              <div>
                <h1 className={`text-3xl font-bold ${stat.color}`}>
                  {stat.title === "Portfolio" && "$"}
                  {formatNumber(stat.count)}
                </h1>
              </div>
            </div>
            {/* Icons */}
            <div
              className={`grid place-items-center w-14 h-14 ${stat.bgColor} rounded-full text-3xl ${stat.color} shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
