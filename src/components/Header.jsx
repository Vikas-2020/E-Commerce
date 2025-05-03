import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaUserCircle,
  FaTimes,
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
  const { cart, wishlist, showMessage } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

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

  const handleLogOut = () => {
    auth.signOut();
    setDropdownOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setDropdownOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
        console.log("vikas");
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [dropdownOpen, menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  function handleBarMenu(e) {
    // e.stopPropagation(); // Prevent event from propagating to parent
    setMenuOpen((prev) => !prev); // Properly toggle the menu state
  
  }

  console.log(menuOpen);

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          🛍️ E-Commerce
        </Link>

        {/* Menu toggle button with 'X' when open */}
        <button
          className="text-yellow-400 text-xl sm:hidden"
          onClick={handleBarMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          ref={menuRef}
          className={`nav-links ${
            menuOpen ? "show" : ""
          } animate__animated animate__slideInRight flex items-center gap-4 transition-all duration-300 ease-in-out sm:flex-row sm:gap-6 sm:items-center sm:static sm:block`}
        >
          <Link to="/" onClick={handleNavClick} className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/about" onClick={handleNavClick} className="hover:text-yellow-400 transition">
            About
          </Link>
          <Link to="/contact" onClick={handleNavClick} className="hover:text-yellow-400 transition">
            Contact
          </Link>

          <Link
            to="/wishlist"
            onClick={handleNavClick}
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
            onClick={handleNavClick}
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
                    <p className="text-sm font-semibold">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={handleNavClick}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={handleNavClick}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={handleNavClick}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/cart"
                    onClick={handleNavClick}
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
            <Link
              to="/login"
              onClick={handleNavClick}
              className="hover:text-yellow-400 transition"
            >
              <FaUser className="text-lg" />
            </Link>
          )}
        </nav>
      </div>

      {showMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg transition-opacity animate-fade-in-out z-[500000] 
            ${
              showMessage.startsWith("❌") || showMessage.startsWith("🗑️")
                ? "bg-red-500"
                : showMessage.startsWith("🧹")
                ? "bg-yellow-500"
                : "bg-green-500"
            }
          text-white`}
        >
          {showMessage}
        </div>
      )}
    </header>
  );
};

export default Header;
