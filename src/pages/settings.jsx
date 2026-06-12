import React from "react";
import { useAuthStore } from "../store/authstore";
import { useThemeStore } from "../store/usetheme";

export default function Settings() {
  const { authUser, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
const logoutHandler = () => {
    logout();
  }
  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Page Title */}
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* PROFILE SECTION */}
        <div className="card bg-base-100 shadow">
          <div className="card-body flex flex-row items-center gap-4">
            <div className="avatar">
              <div className="w-20 rounded-full">
                <img
                  src={authUser?.profilePicture || "https://i.pravatar.cc/150"}
                  alt="profile"
                />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {authUser?.fullname}
              </h2>
              <p className="text-sm text-base-content/70">
                {authUser?.email}
              </p>
            </div>

            <button className="btn btn-outline btn-sm">
              Edit Profile
            </button>
          </div>
        </div>

        {/* APPEARANCE */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Appearance</h2>

            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Notifications</h2>

            <div className="flex justify-between items-center">
              <span>Message Notifications</span>
              <input type="checkbox" className="toggle toggle-success" defaultChecked />
            </div>

            <div className="flex justify-between items-center mt-2">
              <span>Sound</span>
              <input type="checkbox" className="toggle toggle-success" />
            </div>
          </div>
        </div>

        {/* PRIVACY */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Privacy</h2>

            <div className="flex justify-between items-center">
              <span>Show Online Status</span>
              <input type="checkbox" className="toggle toggle-info" defaultChecked />
            </div>

            <div className="flex justify-between items-center mt-2">
              <span>Read Receipts</span>
              <input type="checkbox" className="toggle toggle-info" defaultChecked />
            </div>
          </div>
        </div>

        {/* ACCOUNT */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-error">Account</h2>

            <div className="flex flex-col gap-3">
              <button className="btn btn-outline">
                Change Password
              </button>

              <button
                className="btn btn-error"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
