import React from "react";
import { useCart } from "../context/CartContext";
import { MdDelete, MdTitle } from "react-icons/md";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useCart();

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-[72.7vh]">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 bg-white rounded shadow"
            >
              <div className="flex items-center gap-4">
                <Link to={`/products/${item.id}`}><img title="open product" src={item.image} alt={item.name} className="w-16 h-16" /></Link>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>
              </div>
              <button
                className="text-red-500 text-3xl cursor-pointer"
                onClick={() => removeFromWishlist(item.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
