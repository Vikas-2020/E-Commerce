import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Product = ({ product }) => {
  const { handleAddToCart, addToWishlist } = useCart();
  const { title, description, price, image } = { ...product };

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-72 flex flex-col justify-between hover:shadow-lg transition">
      <Link to={`/products/${product.id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      </Link>
      <h3 className="text-lg font-semibold mb-2">{truncateText(title, 24)}</h3>
      <p className="text-gray-600 text-sm mb-2">
        {truncateText(description, 100)}
      </p>
      <p className="text-blue-600 font-bold text-lg mb-3">${price}</p>
      <div className="flex gap-4 flex-wrap justify-center items-center">
        <button onClick={() => addToWishlist(product)} className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-yellow-400 rounded hover:bg-gray-700 transition cursor-pointer">
          <FaHeart /> Wishlist
        </button>
        <button
          onClick={() => handleAddToCart(product)}
          className="flex items-center gap-2 px-3 py-1 bg-yellow-400 text-gray-800 rounded hover:bg-yellow-300 transition cursor-pointer"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
