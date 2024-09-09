"use client";
import Image from "next/image";
import type { ChatInterface } from "@repo/types/src/Chat";
import { LOGGER } from "@repo/logger/src";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import WelcomePanel from "@/feature/Chat/components/WelcomePanel.tsx";
import ChatForm from "@/feature/Chat/components/ChatForm.tsx";
import useTemplatePrompt from "@/feature/Chat/hooks/useTemplatePrompt.tsx";
import { useStageStore } from "@/feature/Chat/store/stageStore.tsx";
import ChatHistory from "@/feature/Chat/components/ChatHistory.tsx";
import useChatHistory from "@/feature/Chat/hooks/useChatHistory.tsx";
import ChatRoomContainer from "@/feature/ChatRoom/components/ChatRoomContainer.tsx";

function ChatContainer(): JSX.Element {
  const router = useRouter();

  const { templatePrompt, setTemplatePrompt } = useTemplatePrompt();
  const { stage } = useStageStore();
  const { chatHistory, sendQuestion, state, abortCurrentQuestion } =
    useChatHistory();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const nickname = "Lyght";

  const handleSendQuestion = (question: ChatInterface): void => {
    sendQuestion(question).catch((error) => {
      LOGGER("Error sending question:", error);
    });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="h-screen flex">
      <aside className="hidden md:block w-56 shrink-0 border-r-2 border-gray-200 pt-16">
        <div
          className="flex justify-center"
          onClick={() => {
            router.push("/chat");
          }}
        >
          <Image
            alt="L-LX Logo"
            className="w-3/4 h-auto"
            height={100}
            src="/L-LX-Logo.svg"
            width={100}
          />
        </div>
        <ChatRoomContainer />
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto pt-16" ref={chatContainerRef}>
          <div className="text-base py-[18px] px-3 md:px-4 m-auto w-full lg:px-1 xl:px-5">
            <div className="mx-auto flex flex-col gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
              {stage === "welcome" ? (
                <WelcomePanel
                  nickname={nickname}
                  setTemplateText={setTemplatePrompt}
                />
              ) : (
                <ChatHistory chatHistories={chatHistory} />
              )}
            </div>
          </div>
        </main>
        <div className="shrink-0 p-4 md:px-5 lg:px-1 xl:px-5">
          <div className="mx-auto md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
            <ChatForm
              abortCurrentQuestion={abortCurrentQuestion}
              chatState={state}
              sendQuestion={handleSendQuestion}
              setTemplateText={setTemplatePrompt}
              templatePrompt={templatePrompt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
