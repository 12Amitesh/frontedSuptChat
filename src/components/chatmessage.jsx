import { useChatStore } from "../store/usechatStore.js";
import React, { useEffect, useRef } from "react";
import MessageInput from "./messageInput.jsx";
import ChatHeader from "./chatHeader.jsx";

export default function ChatMessages() {
  const {
    selectedUser,
    getMessages,
    messages,
    subscribeToSocketEvents,
    typingUserId,
  } = useChatStore();

  const messagesEndRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Fetch messages when selected user changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      isInitialLoad.current = true; // Reset on user change
    }
  }, [selectedUser?._id]);

  // Subscribe to socket events
  useEffect(() => {
    subscribeToSocketEvents();
  }, []);

  // Scroll to bottom - INSTANT on load, SMOOTH on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      if (isInitialLoad.current && messages.length > 0) {
        // Force instant scroll to bottom on initial load
        messagesEndRef.current.scrollIntoView({ behavior: "instant" });
        isInitialLoad.current = false;
      } else {
        // Smooth scroll for new messages
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, typingUserId]);

  return (
    <div className="h-full flex flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 bg-base-200">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`chat ${
                msg.senderId === selectedUser?._id ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-bubble chat-bubble-primary">{msg.text}</div>
              <div className="chat-footer opacity-60 text-xs">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typingUserId && typingUserId === selectedUser?._id && (
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-info italic opacity-70">
                {selectedUser.fullname || selectedUser.name} is typing...
              </div>
            </div>
          )}

          {/* Scroll anchor - this is at the BOTTOM */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput />
    </div>
  );
}