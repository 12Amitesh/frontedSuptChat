import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authstore.js";
import { useState } from "react";
import React from "react";
export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);
    console.log("Login result:", result);
    if (result?.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body gap-5">

          {/* Title */}
          <h2 className="text-3xl font-bold text-center">
            Welcome Back 👋
          </h2>
          <p className="text-center text-sm text-base-content/70">
            Login to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered input-primary w-full"
                placeholder="email@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label flex justify-between">
                <span className="label-text font-medium">Password</span>
                <span className="label-text-alt link link-hover">
                  Forgot?
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered input-primary w-full"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-error text-sm text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`btn btn-primary w-full mt-2 ${
                isLoading ? "loading" : ""
              }`}
              disabled={isLoading}
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?
            <Link to="/register" className="link link-primary ml-1">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
