"use client";
import type { ChangeEvent } from "react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ChatInterface, MessageInterface } from "@repo/types/src/Chat";
import { useStageStore } from "@/feature/Chat/store/stageStore.tsx";
import useFileUploads from "@/feature/Chat/hooks/useFileUploads.tsx";
import UploadedFileWraps from "@/feature/Chat/components/UploadedFileWraps.tsx";

interface ChatFormProps {
  templatePrompt: string;
  setTemplateText: (text: string) => void;
  sendQuestion: (chat: ChatInterface) => void;
  chatState: "idle" | "sending" | "receiving" | "error";
  abortCurrentQuestion: () => void;
}

function ChatForm({
  templatePrompt,
  setTemplateText,
  sendQuestion,
  chatState,
  abortCurrentQuestion,
}: ChatFormProps): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const { stage, setStage } = useStageStore();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileRemove,
    files,
  } = useFileUploads();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (chatState === "sending" || chatState === "receiving") return;
    if (message.trim() === "") return;

    const messageDoc: MessageInterface = {
      author: { name: "lyght", role: "user" },
      content: { body: message, contentType: "text" },
      id: window.crypto.randomUUID(),
      sentAt: new Date().toLocaleString(),
    };
    const question: ChatInterface = {
      id: window.crypto.randomUUID(),
      sentAt: new Date().toLocaleString(),
      sender: {
        nickname: "lyght",
        avatarSrc: "Star-Avatar.webp",
        role: "user",
      },
      parts: [messageDoc],
    };

    setMessage("");
    if (stage === "welcome") {
      setStage("chatting");
    }

    sendQuestion(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (templatePrompt.trim() !== "") {
      setMessage(templatePrompt);
      setTemplateText("");
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }
  }, [setTemplateText, templatePrompt]);

  return (
    <div
      className="w-full p-1 rounded-2xl gradient-border"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <UploadedFileWraps files={files} handleFileRemove={handleFileRemove} />
      <form
        className="flex items-center bg-white rounded-2xl"
        onSubmit={handleSubmit}
      >
        <textarea
          className="flex-grow p-4 text-lg font-light resize-none outline-none rounded-l-2xl overflow-hidden"
          onChange={handleChangeText}
          onKeyDown={handleKeyDown}
          placeholder="질문을 통해 대화를 시작할 수 있어요"
          ref={textAreaRef}
          rows={2}
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
          value={message}
        />
        {chatState === "idle" ? (
          <SubmitButton />
        ) : (
          <StopButton onClick={abortCurrentQuestion} />
        )}
      </form>
    </div>
  );
}

function SubmitButton(): JSX.Element {
  return (
    <button
      aria-label="Send message"
      className="mr-4 w-10 h-10 flex items-center justify-center"
      type="submit"
    >
      <Image
        alt={"Submit"}
        className="hover-grow w-3/4 h-auto"
        height={75}
        src={"Submit-Arrow.svg"}
        width={75}
      />
    </button>
  );
}

function StopButton({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <button
      aria-label="Stop recevice"
      className="mr-4 w-10 h-10 flex items-center justify-center"
      onClick={onClick}
      type="button"
    >
      <Image
        alt={"Stop"}
        className="hover-grow w-4/5 h-auto"
        height={75}
        src={"Stop-Button.svg"}
        width={75}
      />
    </button>
  );
}

export default ChatForm;
