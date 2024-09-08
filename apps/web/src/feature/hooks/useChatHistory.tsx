import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatInterface } from "@repo/types/src";

const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatInterface[]>([]);
  const [lastAnswerMessage, setLastAnswerMessage] = useState<string>("");
  const lastAnswerRef = useRef<ChatInterface | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const updateLastAnswer = useCallback((newMessage: string) => {
    setLastAnswerMessage((prev) => prev + newMessage);
  }, []);

  useEffect(() => {
    if (lastAnswerRef.current && lastAnswerMessage !== "") {
      setChatHistory((prevHistory) =>
        prevHistory.map((chat) =>
          chat.id === lastAnswerRef.current?.id
            ? { ...chat, message: lastAnswerMessage }
            : chat,
        ),
      );
    }
  }, [lastAnswerMessage]);

  const sendQuestion = useCallback(
    async (question: ChatInterface): Promise<void> => {
      const uid = window.crypto.randomUUID();
      const answer: ChatInterface = {
        id: uid,
        sender: {
          nickname: "Libernex",
          avatarSrc: "C-LX-Logo.svg",
        },
        sentAt: new Date().toLocaleString(),
        message: "",
      };
      setChatHistory((prevHistory) => [...prevHistory, question, answer]);
      lastAnswerRef.current = answer;
      setLastAnswerMessage("");

      await fetchAnswer();
    },
    [updateLastAnswer],
  );

  const fetchAnswer = (): void => {
    // 이벤트 소스가 이미 연결되어 있다면 중복 연결 방지
    if (eventSourceRef.current) {
      return;
    }

    eventSourceRef.current = new EventSource("/api/chat/question");

    eventSourceRef.current.addEventListener("message", (event) => {
      updateLastAnswer(event.data as string); // 새 메시지를 마지막 응답으로 업데이트
    });

    // 오류 처리 및 연결 종료 시 클린업
    eventSourceRef.current.onerror = (error) => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null; // 연결 종료 시 eventSourceRef를 null로 설정
    };
  };

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
