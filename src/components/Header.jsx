import React, {useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);  
  
  const {cart, wishlist} = useCart();
  const wishlistCount = wishlist.length;
  // const {cart} = useContext(cartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          🛍️ E-Commerce
        </Link>

        {/* Hamburger Icon for mobile */}
        <button
          className="text-yellow-400 text-xl sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        {/* Nav Links */}
        <nav className={`nav-links ${menuOpen ? "show" : ""} animate__animated animate__slideInRight`}>
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>

          <Link to="/wishlist" className="relative hover:text-yellow-400 transition">
            <FaHeart className="text-lg" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative hover:text-yellow-400 transition">
            <FaShoppingCart className="text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/login" className="hover:text-yellow-400 transition">
            <FaUser className="text-lg" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
