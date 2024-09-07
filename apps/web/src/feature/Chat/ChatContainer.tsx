"use client";
import WelcomePanel from "@/feature/Chat/WelcomePanel.tsx";
import ChatForm from "@/feature/Chat/ChatForm.tsx";
import useTemplatePrompt from "@/feature/hooks/useTemplatePrompt.tsx";
import {useState} from "react";

function ChatContainer(): JSX.Element {
  const { templateText, setTemplateText } = useTemplatePrompt();
  const [stage, setStage] = useState<"welcome" | "chatting">("welcome");

  const nickname: string = "Lyght";
  const handleSubmit = (message: string): void => {
    console.log("submit!");
  };

  return (
    <div className="h-screen flex pt-16">
      <aside className="hidden md:block w-56 bg-emerald-400 shrink-0">
        사이드바
      </aside>
      <div className="flex-1 flex justify-center">
        <main className="container flex flex-col max-w-screen-md mx-auto px-4 pb-12">
          <div className="flex-grow">
            <WelcomePanel nickname={nickname} setTemplateText={setTemplateText} />
          </div>
          <ChatForm
            onSubmit={handleSubmit}
            templateText={templateText}
            setTemplateText={setTemplateText}
          />
        </main>
      </div>
    </div>
  );
}

export default ChatContainer;
