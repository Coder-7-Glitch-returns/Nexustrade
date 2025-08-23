import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Pop-up Modal Component
const ActionModal = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 transition-opacity">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-96 max-w-sm transform scale-100 transition-transform duration-300">
        <h2 className="text-xl font-bold mb-4 text-red-400">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-600 text-gray-100 font-semibold px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white font-bold px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

function Holdings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
  const [holdings, setHoldings] = useState([
    {
      id: 1,
      coin: "Bitcoin (BTC)",
      buyingPrice: 45000.0,
      currentPrice: 47500.0,
      sellingPrice: 47500.0,
      buyingTime: "2023-10-27",
    },
    {
      id: 2,
      coin: "Ethereum (ETH)",
      buyingPrice: 3200.0,
      currentPrice: 3500.0,
      sellingPrice: 3500.0,
      buyingTime: "2023-10-28",
    },
    {
      id: 3,
      coin: "Ripple (XRP)",
      buyingPrice: 0.55,
      currentPrice: 0.6,
      sellingPrice: 0.6,
      buyingTime: "2023-10-29",
    },
    {
      id: 4,
      coin: "Litecoin (LTC)",
      buyingPrice: 85.0,
      currentPrice: 92.0,
      sellingPrice: 92.0,
      buyingTime: "2023-10-30",
    },
    {
      id: 5,
      coin: "Cardano (ADA)",
      buyingPrice: 0.3,
      currentPrice: 0.32,
      sellingPrice: 0.32,
      buyingTime: "2023-10-31",
    },
  ]);
  const [selectedHoldingId, setSelectedHoldingId] = useState(null);

  // MOCK function to simulate fetching real-time data
  const fetchRealTimePrices = () => {
    // In a real application, you would replace this with an API call
    const newPrices = {
      1: Math.random() * (50000 - 40000) + 40000,
      2: Math.random() * (4000 - 3000) + 3000,
      3: Math.random() * (0.7 - 0.5) + 0.5,
      4: Math.random() * (100 - 80) + 80,
      5: Math.random() * (0.4 - 0.2) + 0.2,
    };

    setHoldings((prevHoldings) =>
      prevHoldings.map((holding) => ({
        ...holding,
        currentPrice: newPrices[holding.id] || holding.currentPrice,
      })),
    );
  };

  // Use useEffect to fetch data on component mount and every 5 seconds
  useEffect(() => {
    fetchRealTimePrices(); // Initial fetch

    const intervalId = setInterval(fetchRealTimePrices, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const openModal = (holding) => {
    setSelectedHoldingId(holding.id);
    setModalContent({
      title: `Sell ${holding.coin}`,
      message: `Are you sure you want to sell your ${holding.coin} holding? This action cannot be undone.`,
    });
    setIsModalOpen(true);
  };

  const handleSellConfirm = () => {
    console.log(`Confirmed sell of holding with ID: ${selectedHoldingId}`);
    setHoldings(holdings.filter((holding) => holding.id !== selectedHoldingId));
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.9 }}
    >
      <div>
        <h1 className="mb-6 text-2xl font-semibold text-gray-300">Holdings</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="flex text-gray-400 text-lg border-b border-gray-600 pb-4">
            <div className="w-12 text-center pr-3">#</div>
            <div className="w-48 px-3">Coin</div>
            <div className="w-48 px-3">Buying Price</div>
            <div className="w-48 px-3">Current Price</div>
            <div className="w-48 px-3">Selling Price</div>
            <div className="w-48 px-3">Buying Time</div>
            <div className="w-48 px-3">Actions</div>
          </div>

          <div className="space-y-4 pt-4">
            {holdings.map((holding, index) => {
              const priceDifference =
                holding.currentPrice - holding.buyingPrice;
              const priceColor =
                priceDifference >= 0 ? "text-green-500" : "text-red-500";
              const sign = priceDifference >= 0 ? "+" : "-";
              const percentageChange = Math.abs(
                (priceDifference / holding.buyingPrice) * 100,
              ).toFixed(2);

              return (
                <div
                  key={holding.id}
                  className={`flex items-center text-sm font-medium transition-colors hover:bg-gray-700 p-2 rounded-lg ${
                    index < holdings.length - 1
                      ? "border-b border-gray-700 pb-4"
                      : ""
                  }`}
                >
                  <div className="w-12 text-center pr-3 text-[#E8F568]">
                    {holding.id}
                  </div>
                  <div className="w-48 px-3 text-[#E8F568]">{holding.coin}</div>
                  <div className="w-48 px-3 text-[#E8F568]">
                    ${holding.buyingPrice.toFixed(2)}
                  </div>
                  <div className={`w-48 px-3 ${priceColor}`}>
                    ${holding.currentPrice.toFixed(2)}
                    <br />
                    <span className="text-xs font-normal">{`${sign}${percentageChange}%`}</span>
                  </div>
                  <div className="w-48 px-3 text-[#E8F568]">
                    ${holding.sellingPrice.toFixed(2)}
                  </div>
                  <div className="w-48 px-3 text-[#E8F568]">
                    {holding.buyingTime}
                  </div>
                  <div className="w-48 px-3">
                    <button
                      onClick={() => openModal(holding)}
                      className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        onConfirm={handleSellConfirm}
      />
    </motion.div>
  );
}

export default Holdings;
