import React from "react";
import { useChatStore } from "../store/usechatStore.js";
import { useAuthStore } from "../store/authstore.js";
import { Phone, Video } from "lucide-react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser?._id);

  const handleAudioCall = () => {
    if (!selectedUser || !isOnline) return;
  };

  const handleVideoCall = () => {
    if (!selectedUser || !isOnline) return;
  };

  return (
    <div className="relative p-4 border-b border-base-300 flex items-center gap-3">
      {/* Avatar */}
      <div className={`avatar ${isOnline ? "online" : "offline"}`}>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={
              selectedUser?.profilePicture ||
              "https://i.pravatar.cc/150?img=5"
            }
            alt="user"
            className="object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">
          {selectedUser?.fullname || "Amit"}
        </h3>
        <p
          className={
            isOnline
              ? "text-xs text-green-500"
              : "text-xs text-base-content/60"
          }
        >
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Audio */}
        <button
          onClick={handleAudioCall}
          disabled={!isOnline}
          className="btn btn-sm btn-ghost"
          aria-label="Audio call"
        >
          <Phone size={18} />
        </button>

        {/* Video */}
        <button
          onClick={handleVideoCall}
          disabled={!isOnline}
          className="btn btn-sm btn-ghost"
          aria-label="Video call"
        >
          <Video size={18} />
        </button>

        {/* Close */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm btn-ghost"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
