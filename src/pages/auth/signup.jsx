import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authstore.js";
import { useState } from "react";
import React from "react";
export default function Signup() {
  const { register } = useAuthStore();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    await register(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body gap-5">

          <h2 className="text-3xl font-bold text-center">
            Create Account ✨
          </h2>
          <p className="text-center text-sm text-base-content/70">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered input-primary w-full"
                required
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered input-primary w-full"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered input-primary w-full"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
