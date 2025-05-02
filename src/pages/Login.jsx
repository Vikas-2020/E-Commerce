import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase";
import { useAuth } from "../context/AuthContext";
import Profile from "./Profile";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {user} = useAuth();
  const [showMessage, setShowMessage] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !confirmPwd)) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isLogin && password !== confirmPwd) {
      setError("Passwords do not match.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        setIsLogin(true);
      }

      setEmail("");
      setPassword("");
      setConfirmPwd("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
        navigate("/profile");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (user) {
    return (
      showMessage && (
        <div className="fixed top-4 left-[40%] bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity animate-fade-in-out z-[500000]">
          ✅ You are already logged in.
        </div>
      )
    );
  }

  return (
    <div className="min-h-[73.9vh] flex items-center justify-center bg-white px-4">
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type={showPwd ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="Re-enter your password"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLogin && (
          <div className="text-right text-sm mt-2">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        <div className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setEmail("");
              setPassword("");
              setConfirmPwd("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
