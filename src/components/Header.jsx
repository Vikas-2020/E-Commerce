import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { dropdownOpen, setDropdownOpen } = useAuth();

  const { cart, wishlist } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const wishlistCount = wishlist.length;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const db = getFirestore();
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserName(userSnapshot.data().name || "User");
        }
      }
    };
  
    fetchUserName();
  }, [user]);

  function handleLogOut() {
    auth.signOut();
    setDropdownOpen(false);
    navigate("/login");
  }

  // 👇 Close dropdown on route change or page reload
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]); // 👈 triggered on route change

  useEffect(() => {
    const handleBeforeUnload = () => setDropdownOpen(false);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 👇 Optional: Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

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
        <nav
          className={`nav-links ${
            menuOpen ? "show" : ""
          } animate__animated animate__slideInRight flex items-center gap-4`}
        >
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>

          <Link
            to="/wishlist"
            className="relative hover:text-yellow-400 transition"
          >
            <FaHeart className="text-lg" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-yellow-400 transition"
          >
            <FaShoppingCart className="text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-yellow-400 transition flex items-center gap-1"
              >
                <FaUserCircle className="text-lg cursor-pointer" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Cart
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-yellow-400 transition">
              <FaUser className="text-lg" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
