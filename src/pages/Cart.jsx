import { useCart } from "../context/CartContext";
import { MdDelete } from "react-icons/md";

function Cart() {
  const { cart, reducer } = useCart();

  // Calculate total cost
  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-[72.7vh]">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-center [@media(min-width:400px)]:justify-between bg-white shadow-md p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Price: ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-2 bg-gray-200 rounded cursor-pointer"
                    onClick={() =>
                      reducer({ type: "DECREASE_QUANTITY", id: item.id })
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 bg-gray-200 rounded cursor-pointer"
                    onClick={() =>
                      reducer({ type: "INCREASE_QUANTITY", id: item.id })
                    }
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-red-500 text-3xl cursor-pointer"
                    onClick={() =>
                      reducer({ type: "REMOVE_FROM_CART", id: item.id })
                    }
                  >
                   <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              Total: ${totalCost.toFixed(2)}
            </h3>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
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
