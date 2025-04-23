import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { MdDelete } from "react-icons/md";

function Cart() {
  const { cart, reducer } = useCart();

  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-[72.7vh]">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🛒 Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <>
          <p className="text-gray-500 text-center">
            Your cart is currently empty.
          </p>
          <Link
            to="/"
            className="text-blue-500 text-center block mt-2 hover:underline"
          >
            Explore Products
          </Link>
        </>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-lg p-4 rounded-xl transition hover:shadow-xl"
              >
                {/* Left: Image and Info */}
                <div className="flex items-start gap-4 w-full sm:w-2/3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Category: {item.category || "General"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.description || "No description available."}
                    </p>
                    <p className="mt-2 text-gray-700 font-medium">
                      Price: ${item.price} × {item.quantity} ={" "}
                      <span className="text-green-600 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right: Quantity Controls */}
                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold cursor-pointer"
                      onClick={() =>
                        reducer({ type: "DECREASE_QUANTITY", id: item.id })
                      }
                    >
                      −
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold cursor-pointer"
                      onClick={() =>
                        reducer({ type: "INCREASE_QUANTITY", id: item.id })
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 text-2xl mt-2 cursor-pointer"
                    onClick={() =>
                      reducer({ type: "REMOVE_FROM_CART", id: item.id })
                    }
                    title="Remove item"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t pt-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: ${totalCost.toFixed(2)}
            </h3>
            <button
              className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              onClick={() => reducer({ type: "CLEAR_CART" })}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
