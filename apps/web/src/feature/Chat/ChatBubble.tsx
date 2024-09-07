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
        <img
          className="w-12 h-12 rounded-full"
          src={sender.avatarSrc}
          alt={sender.nickname}
        />
        <div className="flex flex-col w-full leading-1.5">
          {/*<div className="flex items-center space-x-2 rtl:space-x-reverse">*/}
          {/*    <span className="text-md font-semibold text-gray-900">{sender.nickname}</span>*/}
          {/*</div>*/}
          <p className="text-lg font-normal py-2 text-gray-900">{message}</p>
          <span className="text-sm font-normal text-gray-500">{sentAt}</span>
          <span className="text-sm font-normal text-gray-500">{status}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
