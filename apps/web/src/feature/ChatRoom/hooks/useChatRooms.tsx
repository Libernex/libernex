import { useState } from "react";
import { ChatRoomInterface } from "@repo/types/src/ChatRoom";

const useChatRooms = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomInterface[]>([]);

  const loadChatRooms = async (): Promise<void> => {
    const { data } = response;
    const chatRooms = data.chatRooms;
    setChatRooms(chatRooms);
  };

  return {
    loadChatRooms,
    chatRooms,
  };
};

const response: { data: { chatRooms: ChatRoomInterface[] } } = {
  data: {
    chatRooms: [
      {
        id: "111",
        name: "1번방",
        description: "1번방",
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      },
      {
        id: "222",
        name: "2번방",
        description: "2번방",
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      },
      {
        id: "333",
        name: "3번방",
        description: "3번방",
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      },
    ],
  },
};
export default useChatRooms;
