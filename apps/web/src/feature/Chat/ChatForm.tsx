"use client";
import type { ChangeEvent, KeyboardEventHandler } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useStageStore } from "@/feature/store/stageStore.tsx";
import { ChatInterface } from "@repo/types/src";

interface ChatFormProps {
  templateText: string;
  setTemplateText: (text: string) => void;
  sendQuestion: (chat: ChatInterface) => void;
}

function ChatForm({
  templateText,
  setTemplateText,
  sendQuestion,
}: ChatFormProps): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const { stage, setStage } = useStageStore();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (message.trim() === "") return;

    const question: ChatInterface = {
      id: window.crypto.randomUUID(),
      sender: {
        nickname: "lyght",
        avatarSrc: "Star-Avatar.webp",
      },
      sentAt: new Date().toLocaleString(),
      message: message,
    };

    setMessage("");
    if (stage == "welcome") {
      setStage("chatting");
    }

    await sendQuestion(question);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (templateText.trim() !== "") {
      setMessage(templateText);
      setTemplateText("");
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }
  }, [templateText]);

  return (
    <div className="w-full p-1 rounded-2xl gradient-border">
      <form
        className="flex items-center bg-white rounded-2xl"
        onSubmit={handleSubmit}
      >
        <textarea
          ref={textAreaRef}
          className="flex-grow p-4 text-lg font-light resize-none outline-none rounded-l-2xl overflow-hidden"
          onChange={handleChangeText}
          onKeyDown={handleKeyDown}
          placeholder="질문을 통해 대화를 시작할 수 있어요"
          rows={2}
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
          value={message}
        />
        <button
          aria-label="Send message"
          className="mr-4 w-10 h-10 flex items-center justify-center"
          type="submit"
        >
          <Image
            className="hover-grow w-3/4 h-auto"
            alt="Submit"
            height={75}
            src="Submit-Arrow.svg"
            width={75}
          />
        </button>
      </form>
    </div>
  );
}

export default ChatForm;
