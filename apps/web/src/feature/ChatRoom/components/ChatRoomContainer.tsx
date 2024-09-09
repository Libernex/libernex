"use client";
import ChatRoomList from "@/feature/ChatRoom/components/ChatRoomList.tsx";
import useChatRooms from "@/feature/ChatRoom/hooks/useChatRooms.tsx";
import { useEffect } from "react";

function ChatRoomContainer(): JSX.Element {
  const { loadChatRooms, chatRooms } = useChatRooms();

  useEffect(() => {
    async function fetchChatRooms(): Promise<void> {
      await loadChatRooms();
    }

    fetchChatRooms();
  }, []);

  return (
    <div className="mt-12 mx-4">
      <ChatRoomList chatRooms={chatRooms} />
    </div>
  );
}

export default ChatRoomContainer;
