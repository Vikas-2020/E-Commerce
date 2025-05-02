import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const {dropdownOpen, setDropdownOpen} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.email);
      } else {
        setLoggedInUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setDropdownOpen(!dropdownOpen);
    navigate("/login");
  };

  return (
    <div className="min-h-[73.9vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 max-w-md w-full text-center">
        <FaUserCircle className="text-blue-600 text-5xl mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Welcome, <span className="text-blue-700">{loggedInUser}</span>
        </h2>
        <p className="text-gray-500 mb-4">You are logged in!</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/change-password")}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
