import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatInterface } from "@repo/types/src";
import { MessageInterface } from "@repo/types/src";

const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatInterface[]>([]);
    const currentAnswerRef = useRef<ChatInterface | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const sendQuestion = useCallback(
    async (question: ChatInterface): Promise<void> => {
        setChatHistory((prevHistory) => [...prevHistory, question]);

      const answer: ChatInterface = {
        id: window.crypto.randomUUID(),
        sender: {
          role: "assistance",
          nickname: "Libernex",
          avatarSrc: "C-LX-Logo.svg",
        },
        parts: [],
        sentAt: new Date().toLocaleString(),
      };

        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

      const query = JSON.stringify(question);
      eventSourceRef.current = new EventSource(`/api/chat/question?${query}`);

      setChatHistory((prevHistory) => [...prevHistory, answer]);
        currentAnswerRef.current = answer;

        eventSourceRef.current.addEventListener("connect", (event): void => {
            const message: MessageInterface = JSON.parse(event.data);
            if (currentAnswerRef.current) {
                currentAnswerRef.current.id = message.content.body;
                setChatHistory(prevHistory => [...prevHistory]); //이벤트 변화 트리거
            }
        });

        eventSourceRef.current.addEventListener("message", (event): void => {
            const message: MessageInterface = JSON.parse(event.data);
            if (currentAnswerRef.current) {
                currentAnswerRef.current.parts.push(message);
                setChatHistory(prevHistory => [...prevHistory]);
            }
        });

        eventSourceRef.current.onerror = (error) => {
            currentAnswerRef.current = null;
            eventSourceRef.current?.close();
            eventSourceRef.current = null;
        };
    },
    [],
  );

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, []);

  return {
    chatHistory,
    sendQuestion,
  };
};

export default useChatHistory;
