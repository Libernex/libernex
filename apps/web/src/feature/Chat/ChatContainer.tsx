"use client";
import WelcomePanel from "@/feature/Chat/WelcomePanel.tsx";
import ChatForm from "@/feature/Chat/ChatForm.tsx";
import useTemplatePrompt from "@/feature/hooks/useTemplatePrompt.tsx";
import {useStageStore} from "@/feature/store/stageStore.tsx";
import ChatHistory from "@/feature/Chat/ChatHistory.tsx";
import useChatHistory from "@/feature/hooks/useChatHistory.tsx";

function ChatContainer(): JSX.Element {
  const { templateText, setTemplateText } = useTemplatePrompt();
  const { stage } = useStageStore();
  const { chatHistory, sendQuestion } = useChatHistory();

  const nickname: string = "Lyght";

  return (
    <div className="h-screen flex pt-16">
      <aside className="hidden md:block w-56 bg-emerald-400 shrink-0">
        사이드바
      </aside>
      <div className="flex-1 flex justify-center">
        <main className="container mx-auto max-w-screen-md flex flex-col  px-4 h-full">
          <div className="flex-grow overflow-y-auto mb-4">
            {stage === "welcome" ? (
              <WelcomePanel
                nickname={nickname}
                setTemplateText={setTemplateText}
              />
            ) : (
              <div>
                <ChatHistory chatHistories={chatHistory} />
              </div>
            )}
          </div>
          <div className="pb-12 mt-auto">
            <ChatForm
              templateText={templateText}
              setTemplateText={setTemplateText}
              sendQuestion={sendQuestion}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChatContainer;
