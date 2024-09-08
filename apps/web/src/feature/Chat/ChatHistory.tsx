import type { ChatInterface } from "@repo/types/src";
import ChatBubble from "@/feature/Chat/ChatBubble.tsx";

interface ChatHistoryProps {
  chatHistories: ChatInterface[];
}

function ChatHistory({ chatHistories }: ChatHistoryProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      {chatHistories.map((chatHistory: ChatInterface) => (
        <div key={chatHistory.id}>
          <ChatBubble
            message={chatHistory.message}
            sender={chatHistory.sender}
            sentAt={chatHistory.sentAt}
          />
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
