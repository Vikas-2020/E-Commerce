import React from "react";
import { useCart } from "../context/CartContext";
import { MdDelete, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, handleAddToCart } = useCart();

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-[73.9vh]">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Your Wishlist ❤️
      </h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center text-gray-600 mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty Wishlist"
            className="w-40 h-40 mb-4 opacity-60"
          />
          <p className="text-lg font-medium">Your wishlist is empty.</p>
          <Link to="/" className="mt-4 text-blue-600 hover:underline">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col"
            >
              <Link to={`/products/${item.id}`}>
                <img
                  title="Open product"
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-contain mb-4"
                />
              </Link>

              <div className="flex-1 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {item.description || "No description available."}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <span className="font-medium text-gray-700">Category:</span>{" "}
                  {item.category || "General"}
                </p>
                {item.rating && (
                  <p className="text-yellow-600 text-sm mt-1">
                    ⭐ {item.rating.rate} / 5 ({item.rating.count} reviews)
                  </p>
                )}
                <p className="text-blue-600 font-semibold text-base mt-2">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex gap-3 mt-auto flex-wrap flex-col min-[360px]:flex-row">
                <button
                  title="Add to Cart"
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 transition px-3 py-2 rounded-lg text-sm cursor-pointer"
                >
                  <MdShoppingCart className="text-lg" />
                  Add to Cart
                </button>

                <button
                  title="Remove from Wishlist"
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex-1 flex items-center justify-center gap-1 text-white bg-red-500 hover:bg-red-600 transition px-3 py-2 rounded-lg text-sm cursor-pointer"
                >
                  <MdDelete className="text-lg" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
