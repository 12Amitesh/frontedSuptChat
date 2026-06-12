import React, { useState } from "react";
import { useChatStore } from "../store/usechatStore.js";

function MessageInput() {
  const [text, setText] = useState("");
  const { sendMessage, selectedUser, emitTyping } = useChatStore();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="p-4 border-t border-base-300">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            emitTyping();
          }}
          className="input input-bordered w-full"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
