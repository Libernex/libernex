import type { ChatInterface } from "@repo/types/src/Chat";
import ChatBubble from "@/feature/Chat/components/ChatBubble.tsx";

interface ChatHistoryProps {
  chatHistories: ChatInterface[];
}

function ChatHistory({ chatHistories }: ChatHistoryProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      {chatHistories.map((chatHistory: ChatInterface) => (
        <div key={chatHistory.id}>
          <ChatBubble chat={chatHistory} />
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
