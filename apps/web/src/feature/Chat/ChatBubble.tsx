import Image from "next/image";

interface ChatBubbleProps {
  sender: {
    nickname: string;
    avatarSrc: string;
  };
  sentAt: string;
  message: string;
  status?: string;
}

function ChatBubble({
  sender,
  sentAt,
  message,
  status,
}: ChatBubbleProps): JSX.Element {
  return (
    <div>
      <div className="flex items-start gap-2">
        <Image
          alt={sender.nickname}
          className="w-12 h-12 rounded-full"
          height={48}
          src={sender.avatarSrc}
          width={48}
        />
        <div className="flex flex-col w-full leading-1.5">
          <p className="text-lg font-normal py-2 text-gray-900">{message}</p>
          <span className="text-sm font-normal text-gray-500">{sentAt}</span>
          <span className="text-sm font-normal text-gray-500">{status}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
