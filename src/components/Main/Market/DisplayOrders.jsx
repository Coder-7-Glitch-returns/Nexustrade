import React from "react";

function DisplayOrders({ orders }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">
        Current Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-4">
          No orders have been placed yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-4 bg-gray-700 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1">
                <span className="font-semibold text-lg text-yellow-400 block">
                  {order.itemName}
                </span>
                <span className="text-sm text-gray-400">ID: {order.id}</span>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="inline-flex items-center rounded-full bg-yellow-800 px-3 py-1 text-sm font-medium text-yellow-200">
                  Quantity: {order.quantity}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayOrders;
