"use client";
import WelcomePanel from "@/feature/Chat/WelcomePanel.tsx";
import ChatForm from "@/feature/Chat/ChatForm.tsx";
import useTemplatePrompt from "@/feature/hooks/useTemplatePrompt.tsx";
import {useStageStore} from "@/feature/store/stageStore.tsx";

function ChatContainer(): JSX.Element {
  const { templateText, setTemplateText } = useTemplatePrompt();
  const { stage } = useStageStore();

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
        <main className="container flex flex-col max-w-screen-md mx-auto px-4 h-full">
          <div className="flex-grow overflow-y-auto mb-4">
            {stage === "welcome" ? (
              <WelcomePanel
                nickname={nickname}
                setTemplateText={setTemplateText}
              />
            ) : (
              <div>
                <div className="h-72 bg-blue-400"></div>
                <div className="h-72 bg-blue-400"></div>
                <div className="h-72 bg-blue-400"></div>
                <div className="h-72 bg-blue-400"></div>
                <div className="h-72 bg-blue-400"></div>
                <div className="h-72 bg-blue-400"></div>
                <div className="h-72 bg-blue-400"></div>
              </div>
            )}
          </div>
          <div className="pb-12 mt-auto">
            <ChatForm
              onSubmit={handleSubmit}
              templateText={templateText}
              setTemplateText={setTemplateText}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChatContainer;
