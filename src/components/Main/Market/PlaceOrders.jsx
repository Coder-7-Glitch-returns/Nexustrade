import React, { useState } from "react";

function PlaceOrders({ onAddOrder }) {
  // State for form inputs.
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName.trim() || quantity <= 0) {
      // Basic validation.
      alert("Please enter a valid item name and quantity.");
      return;
    }
    // Call the parent function to add the new order.
    onAddOrder({
      itemName,
      quantity: parseInt(quantity, 10),
    });
    // Reset the form fields.
    setItemName("");
    setQuantity(1);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">
        Place a New Order
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-400"
          >
            Coin Name
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-yellow-400 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2"
            placeholder="e.g., BTC"
            required
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-400"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0.1"
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-900 text-yellow-400 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2"
            required
            step={0.1}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default PlaceOrders;
