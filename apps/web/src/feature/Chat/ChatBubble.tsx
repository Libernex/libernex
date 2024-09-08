import Image from "next/image";
import starAvatarImage from "public/Star-Avatar.webp";
import { ChatInterface } from "@repo/types/src";
import { useEffect, useRef } from "react";

interface ChatBubbleProps {
  chat: ChatInterface;
}

const combineChatParts = (chat: ChatInterface): string => {
  return chat.parts.map((part) => part.content.body).join("");
};

function ChatBubble({ chat }: ChatBubbleProps): JSX.Element {
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
      </div>
    </div>
  );
}

export default ChatBubble;
