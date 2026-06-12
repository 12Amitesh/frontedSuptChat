import React from 'react'
import ChatSidebar from '../components/chatsidebar.jsx';
import ChatMessages from '../components/chatmessage.jsx';
import { useChatStore } from "../store/usechatStore.js";
import NoChatSelected from '../components/noChatSelected.jsx';
function HomePage() {
  const { selectedUser } = useChatStore();
  // const { theme } = useThemeStore(); // Should be useThemeStore, not useChatStore
  
  return (
    <div className="flex h-screen">
      <ChatSidebar />

      <div className="flex-1 h-full hidden sm:flex flex-col">
        {selectedUser ? (
          <ChatMessages />
        ) : (
          <div className="p-4 text-base-content/60">
            <NoChatSelected />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage