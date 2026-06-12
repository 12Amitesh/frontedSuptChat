import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authstore.js";
import { useChatStore } from "../store/usechatStore.js";
import { getLastMessagePreview } from "../utils/messagepreview.jsx";
import { useThemeStore } from "../store/usetheme.js";

export default function ChatSidebar() {
  const { theme, toggleTheme } = useThemeStore();
  const { authUser, onlineUsers } = useAuthStore();
  const {
    users,
    getUsers,
    setSelectedUser,
    selectedUser,
    typingUserId,
  } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <aside className="w-full sm:w-80 h-full bg-base-100 border-r border-base-300 flex flex-col min-h-0">
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-base-300">
        <div className="flex items-center gap-3">
          <Link to="/settings">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    authUser?.profilePicture ||
                    "https://i.pravatar.cc/150?img=12"
                  }
                  alt="profile"
                />
              </div>
            </div>
          </Link>
          <h2 className="font-semibold text-lg">Chats</h2>
        </div>

        <button
          onClick={toggleTheme}
          className="btn btn-sm btn-circle btn-ghost"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* 🔥 FIXED scroll list */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isActive = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left
                transition hover:bg-base-200
                ${isActive ? "bg-base-200" : ""}`}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={
                        user.profilePicture ||
                        "https://i.pravatar.cc/150?img=12"
                      }
                      alt={user.fullname}
                    />
                  </div>
                </div>

                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-base-100
                    ${isOnline ? "bg-success" : "bg-neutral"}`}
                />
              </div>

              {/* User info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.fullname}</p>
                <p className="text-sm text-base-content/70 truncate">
                  {typingUserId === user._id ? (
                    <span className="italic">Typing...</span>
                  ) : (
                    "no message yet"
                  )}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
