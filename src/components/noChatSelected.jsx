import React from "react";

function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-base-100 text-center px-6 top-50">

      {/* Icon */}
      <div className="mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.3-3.9A7.9 7.9 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <h2 className="text-xl font-semibold mb-2">
        No chat selected please select a chat to start messaging
      </h2>
      <p className="text-base-content/60 max-w-sm">
        Select a conversation from the sidebar to start chatting.
      </p>

     
    </div>
  );
}

export default NoChatSelected;
