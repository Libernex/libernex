"use client";
import type {ChangeEvent} from "react";
import {useEffect, useState} from "react";
import Image from "next/image";

interface ChatFormProps {
  onSubmit: (message: string) => void;
  templateText: string;
  setTemplateText: (text: string) => void;
}

function ChatForm({
  onSubmit,
  templateText,
  setTemplateText,
}: ChatFormProps): JSX.Element {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage("");
    }
  };

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (templateText.trim() !== "") {
      setMessage(templateText);
      setTemplateText("");
    }
  }, [templateText]);

  return (
    <div className="w-full p-1 rounded-2xl gradient-border">
      <form
        className="flex items-center bg-white rounded-2xl"
        onSubmit={handleSubmit}
      >
        <textarea
          className="flex-grow p-4 text-lg font-light resize-none outline-none rounded-l-2xl overflow-hidden"
          onChange={handleChangeText}
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
            src="/submit_icon.svg"
            width={75}
          />
        </button>
      </form>
    </div>
  );
}

export default ChatForm;
