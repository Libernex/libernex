import { ChatInterface } from "@repo/types/src";
import ChatBubble from "@/feature/Chat/ChatBubble.tsx";

interface ChatHistoryProps {
  chatHistories: ChatInterface[];
}

function ChatHistory({ chatHistories }: ChatHistoryProps) {
  return (
    <div className="flex flex-col gap-4">
      {chatHistories.map((chatHistory: ChatInterface) => (
        <div key={chatHistory.id}>
          <ChatBubble
            sender={chatHistory.sender}
            sentAt={chatHistory.sentAt}
            message={chatHistory.message}
          />
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
