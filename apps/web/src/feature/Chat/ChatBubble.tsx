import Image from "next/image";
import starAvatarImage from "public/Star-Avatar.webp";
import { ChatInterface } from "@repo/types/src";
import { useEffect } from "react";

interface ChatBubbleProps {
  chat: ChatInterface;
}

const combineChatParts = (chat: ChatInterface): string => {
  return chat.parts.map((part) => part.content.body).join("");
};

function ChatBubble({ chat }: ChatBubbleProps): JSX.Element {
  useEffect(() => {
    console.log(chat);
    if (chat.parts.length > 0) {
      console.log("rececive");
    }
  }, [chat]);

  return (
    <div>
      <div className="flex items-start gap-2">
        <Image
          alt={chat.sender.nickname}
          className="w-12 h-12 rounded-full"
          height={48}
          src={
            chat.sender.role === "user"
              ? starAvatarImage
              : chat.sender.avatarSrc
          }
          width={48}
        />
        {chat.parts.length > 0 ? (
          <div className="flex flex-col w-full leading-1.5">
            <p className="text-lg font-normal py-2 text-gray-900">
              {combineChatParts(chat)}
            </p>
            <span className="text-sm font-normal text-gray-500">
              {chat.sentAt}
            </span>
            <span className="text-sm font-normal text-gray-500">
              {chat.status}
            </span>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}

function Skeleton(): JSX.Element {
  return (
      <div role="status" className="w-full animate-pulse mt-4 overflow-hidden">
        <div className="h-2.5 bg-gray-300 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-gray-300 rounded-full max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full max-w-[360px]"></div>
      </div>
  );
}

export default ChatBubble;
