// store/useToastStore.js
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useToastStore = create(() => ({
  messageToast: ({ senderName, text, senderImage }) => {
    toast.custom(
      (t) => (
        <div
          className={`flex items-start gap-3 bg-base-200 border border-base-300 p-3 rounded-xl shadow-lg w-80 cursor-pointer
          ${t.visible ? "animate-enter" : "animate-leave"}`}
        >
          {/* Avatar */}
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img
                src={senderImage || "/avatar-placeholder.png"}
                alt={senderName}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="font-semibold text-sm">{senderName}</p>
            <p className="text-sm opacity-80 line-clamp-2">{text}</p>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  },

  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
}));
