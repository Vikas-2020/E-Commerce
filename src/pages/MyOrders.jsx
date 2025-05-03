import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const db = getFirestore();
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map((doc) => ({ 
        id: doc.id,
        ...doc.data(),
      })).sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() ?? new Date(0);
        const dateB = b.createdAt?.toDate?.() ?? new Date(0);
        return dateB - dateA; // Descending
      });;
      setOrders(userOrders);
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-[73.9vh]">
      <h2 className="text-3xl font-bold mb-6 text-center">📦 My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-6 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">🆔 Order ID: <span className="font-mono">{order.id}</span></p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong>{" "}
                {order.createdAt?.toDate().toLocaleString() || "Unknown"}
              </p>
            </div>

            <div className="border-t pt-3">
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="py-3 flex items-center gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <p className="font-semibold text-green-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Total Items:{" "}
                  <span className="font-semibold">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </p>
                <p className="text-lg font-bold text-green-700">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
              <p className="text-right text-sm mt-2 italic text-gray-500">
                Status: <span className="text-blue-600">Processing</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
