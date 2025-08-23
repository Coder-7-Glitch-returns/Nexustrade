import React, { useState } from "react";
import DisplayOrders from "../../components/Main/Market/DisplayOrders";
import PlaceOrders from "../../components/Main/Market/PlaceOrders";

function Market() {
  const [orders, setOrders] = useState([]);

  const handleAddOrder = (newOrder) => {
    const orderWithId = { ...newOrder, id: Date.now() };
    setOrders([...orders, orderWithId]);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 font-sans antialiased">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-400 tracking-tight">
          Order Management
        </h1>
        <p className="text-md text-gray-400 mt-2">
          Place new orders and view the order history.
        </p>
      </header>
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        <div className="lg:w-1/2 p-6 bg-gray-800 rounded-lg shadow-xl">
          <PlaceOrders onAddOrder={handleAddOrder} />
        </div>
        <div className="lg:w-1/2 p-6 bg-gray-800 rounded-lg shadow-xl">
          <DisplayOrders orders={orders} />
        </div>
      </div>
    </div>
  );
}

export default Market;
