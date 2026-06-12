import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import HomePage from "./pages/homepage.jsx";
import Login from "./pages/auth/login.jsx";
import Signup from "./pages/auth/signup.jsx";
import Profile from "./pages/profile/profile.jsx";
import { useAuthStore } from "./store/authstore.js";
import './App.css';
import Settings from "./pages/Settings.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  const { authUser, checkAuth, isChecking } = useAuthStore();
  console.log("Auth User from apps jsc file:", authUser?.fullname);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  
  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* 🔐 Protected Route */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* 🌐 Public Routes */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!authUser ? <Signup /> : <Navigate to="/chat" />}
        />
        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
