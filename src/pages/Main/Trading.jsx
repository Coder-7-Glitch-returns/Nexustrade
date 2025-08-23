import React, { useState, useEffect } from "react";

const formatNumber = (num) => {
  if (num === null || num === undefined) return "N/A";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  }).format(num);
};

const formatCurrency = (num) => {
  if (num === null || num === undefined) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: num > 1000 ? 2 : 5,
  }).format(num);
};

const formatPercentage = (num) => {
  if (num === null || num === undefined) return "N/A";
  const color = num >= 0 ? "text-green-500" : "text-red-500";
  return (
    <span className={color}>
      {num >= 0 ? "+" : ""}
      {num.toFixed(2)}%
    </span>
  );
};

// New function to format price with color based on 24h change
const formatPriceWithChange = (price, change) => {
  if (price === null || price === undefined) return "N/A";
  const color = change >= 0 ? "text-green-500" : "text-red-500";
  return (
    <div>
      <div>{formatCurrency(price)}</div>
      <div className={color}>
        {change >= 0 ? "+" : ""}
        {change?.toFixed(2)}%
      </div>
    </div>
  );
};

const Trading = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState({
    key: "market_cap_rank",
    direction: "asc",
  });
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coinDetails, setCoinDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        // Using the public CoinGecko API endpoint for market data.
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const fetchCoinDetails = async (coinId) => {
    try {
      setDetailsLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coin details");
      }
      const data = await response.json();
      setCoinDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
    fetchCoinDetails(coin.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
    setCoinDetails(null);
  };

  const handleSort = (key) => {
    setSortOrder((prevSortOrder) => ({
      key,
      direction:
        prevSortOrder.key === key && prevSortOrder.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const sortedAndFilteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortOrder.key];
      const bValue = b[sortOrder.key];

      if (aValue === null || aValue === undefined)
        return sortOrder.direction === "asc" ? 1 : -1;
      if (bValue === null || bValue === undefined)
        return sortOrder.direction === "asc" ? -1 : 1;

      if (sortOrder.direction === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

  // Pagination logic
  const indexOfLastCoin = currentPage * itemsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - itemsPerPage;
  const currentCoins = sortedAndFilteredCoins.slice(
    indexOfFirstCoin,
    indexOfLastCoin,
  );
  const totalPages = Math.ceil(sortedAndFilteredCoins.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && paginate(page)}
        className={`px-3 py-1 mx-1 rounded-full text-sm font-medium transition-colors duration-200
          ${
            currentPage === page
              ? "bg-yellow-500 text-gray-900"
              : "bg-gray-700 text-gray-300 hover:bg-yellow-600"
          }
          ${typeof page !== "number" && "pointer-events-none bg-transparent"}`}
      >
        {page}
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-4">
        <div className="text-xl font-medium">
          Loading cryptocurrency data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 text-red-400 min-h-screen flex items-center justify-center p-4">
        <div className="text-xl font-medium">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-500 tracking-tight mb-2">
            Crypto Trading Board
          </h1>
          <p className="text-lg sm:text-xl text-gray-400">
            Live market data for top cryptocurrencies
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search coins..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="w-full sm:w-1/2 p-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700"
          />
        </div>

        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="min-w-full bg-gray-800 rounded-xl">
            <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
              <tr>
                <th
                  className="px-6 py-3 text-left font-semibold cursor-pointer rounded-tl-xl"
                  onClick={() => handleSort("market_cap_rank")}
                >
                  #
                  {sortOrder.key === "market_cap_rank" && (
                    <span>{sortOrder.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-left font-semibold">Coin</th>
                <th
                  className="px-6 py-3 text-left font-semibold cursor-pointer"
                  onClick={() => handleSort("current_price")}
                >
                  Price
                  {sortOrder.key === "current_price" && (
                    <span>{sortOrder.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold cursor-pointer"
                  onClick={() => handleSort("price_change_percentage_24h")}
                >
                  24h Change
                  {sortOrder.key === "price_change_percentage_24h" && (
                    <span>{sortOrder.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold cursor-pointer"
                  onClick={() => handleSort("high_24h")}
                >
                  24h High
                  {sortOrder.key === "high_24h" && (
                    <span>{sortOrder.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold cursor-pointer"
                  onClick={() => handleSort("low_24h")}
                >
                  24h Low
                  {sortOrder.key === "low_24h" && (
                    <span>{sortOrder.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold cursor-pointer"
                  onClick={() => handleSort("total_volume")}
                >
                  Volume (24h)
                  {sortOrder.key === "total_volume" && (
                    <span>{sortOrder.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold cursor-pointer rounded-tr-xl"
                  onClick={() => handleSort("circulating_supply")}
                >
                  Circulating Supply
                  {sortOrder.key === "circulating_supply" && (
                    <span>{sortOrder.direction === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentCoins.length > 0 ? (
                currentCoins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleCoinClick(coin)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400">
                      {coin.market_cap_rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                      <img
                        src={coin.image}
                        alt={`${coin.name} logo`}
                        className="w-8 h-8 mr-3 rounded-full"
                      />
                      {coin.name}
                      <span className="text-gray-400 ml-2 uppercase font-light">
                        {coin.symbol}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatCurrency(coin.current_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatPercentage(coin.price_change_percentage_24h)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatCurrency(coin.high_24h)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatCurrency(coin.low_24h)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatCurrency(coin.total_volume)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatNumber(coin.circulating_supply)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-10 text-center text-lg text-gray-400"
                  >
                    No coins found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {sortedAndFilteredCoins.length > 0 && (
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}

        {/* Coin Details Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    {selectedCoin && (
                      <>
                        <img
                          src={selectedCoin.image}
                          alt={`${selectedCoin.name} logo`}
                          className="w-12 h-12 mr-4 rounded-full"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            {selectedCoin.name}
                          </h2>
                          <p className="text-gray-400 uppercase">
                            {selectedCoin.symbol}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    &times;
                  </button>
                </div>

                {detailsLoading ? (
                  <div className="text-center py-8">
                    <div className="text-xl font-medium">
                      Loading details...
                    </div>
                  </div>
                ) : coinDetails ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-yellow-500">
                        Price Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Current Price:</span>
                          <span className="text-white">
                            {formatCurrency(
                              coinDetails.market_data.current_price.usd,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">24h Change:</span>
                          {formatPercentage(
                            coinDetails.market_data.price_change_percentage_24h,
                          )}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">24h High:</span>
                          <span className="text-white">
                            {formatCurrency(
                              coinDetails.market_data.high_24h.usd,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">24h Low:</span>
                          <span className="text-white">
                            {formatCurrency(
                              coinDetails.market_data.low_24h.usd,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">All-Time High:</span>
                          <span className="text-white">
                            {formatCurrency(coinDetails.market_data.ath.usd)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">All-Time Low:</span>
                          <span className="text-white">
                            {formatCurrency(coinDetails.market_data.atl.usd)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-yellow-500">
                        Market Data
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Market Cap:</span>
                          <span className="text-white">
                            {formatCurrency(
                              coinDetails.market_data.market_cap.usd,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Volume (24h):</span>
                          <span className="text-white">
                            {formatCurrency(
                              coinDetails.market_data.total_volume.usd,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">
                            Circulating Supply:
                          </span>
                          <span className="text-white">
                            {formatNumber(
                              coinDetails.market_data.circulating_supply,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Supply:</span>
                          <span className="text-white">
                            {coinDetails.market_data.total_supply
                              ? formatNumber(
                                  coinDetails.market_data.total_supply,
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Max Supply:</span>
                          <span className="text-white">
                            {coinDetails.market_data.max_supply
                              ? formatNumber(coinDetails.market_data.max_supply)
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg md:col-span-2">
                      <h3 className="text-lg font-semibold mb-3 text-yellow-500">
                        About
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {coinDetails.description.en.length > 300
                          ? `${coinDetails.description.en.substring(0, 300)}...`
                          : coinDetails.description.en}
                      </p>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg md:col-span-2">
                      <h3 className="text-lg font-semibold mb-3 text-yellow-500">
                        Links
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {coinDetails.links.homepage.map(
                          (link, index) =>
                            link && (
                              <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-yellow-500 text-gray-900 rounded-md text-sm hover:bg-yellow-600 transition-colors"
                              >
                                Website
                              </a>
                            ),
                        )}
                        {coinDetails.links.blockchain_site.map(
                          (link, index) =>
                            link &&
                            index < 3 && (
                              <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-500 transition-colors"
                              >
                                Explorer {index + 1}
                              </a>
                            ),
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-red-400">
                    Failed to load coin details.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trading;
