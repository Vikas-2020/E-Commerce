import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const userEmail = localStorage.getItem('loggedInUser');
    if (isAuthenticated && userEmail) {
      setIsLoggedIn(true);
      setLoggedInUser(userEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !confirmPwd)) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isLogin && password !== confirmPwd) {
      setError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isLogin) {
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!matchedUser) {
        setError('Invalid email or password.');
        return;
      }

      alert('Login successful!');
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('loggedInUser', matchedUser.email);
      setIsLoggedIn(true);
      setLoggedInUser(matchedUser.email);
      navigate('/home');
    } else {
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        setError('Email already registered.');
        return;
      }

      const newUser = { email, password };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert('Account created successfully!');
      setIsLogin(true);
    }

    setEmail('');
    setPassword('');
    setConfirmPwd('');
    setError('');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-[72.7vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 max-w-md w-full text-center">
          <FaUserCircle className="text-blue-600 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Welcome, <span className="text-blue-700">{loggedInUser}</span>
          </h2>
          <p className="text-gray-500 mb-4">You are logged in!</p>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[72.7vh] flex items-center justify-center bg-white px-4">
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {isLogin ? 'Login' : 'Sign Up'}
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
                type={showPwd ? 'text' : 'password'}
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
                type={showPwd ? 'text' : 'password'}
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
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail('');
              setPassword('');
              setConfirmPwd('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
