import { ChatRoomInterface } from "@repo/types/dist";
import ChatRoomItem from "@/feature/ChatRoom/components/ChatRoomItem.tsx";

interface ChatRoomListProps {
  chatRooms: ChatRoomInterface[];
}

function ChatRoomList({ chatRooms }: ChatRoomListProps): JSX.Element {
  return (
    <div className="flex flex-col w-48 text-gray-900">
      {chatRooms.map((charRoom) => (
        <div key={charRoom.id}>
          <ChatRoomItem chatRoom={charRoom} />
        </div>
      ))}
    </div>
  );
}

export default ChatRoomList;
