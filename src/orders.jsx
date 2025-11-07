import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    }
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-black p-2 rounded-full hover:bg-gray-900"
          >
            <ArrowLeft size={24} className="text-emerald-500" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
        </div>
      </header>

      {/* Orders list */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-bold text-emerald-600 mb-2">
                Order #{index + 1}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mb-3">
                <h3 className="font-semibold mb-1">Items:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name || item.productName} × {item.quantity || 1}
                    </li>
                  ))}
                </ul>
              </div>

              <p><strong>Total:</strong> ${order.pricing.total}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
