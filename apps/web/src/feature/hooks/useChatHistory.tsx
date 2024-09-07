import {useCallback, useEffect, useRef, useState} from "react";
import {ChatInterface} from "@repo/types/src";

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

  const fetchAnswer = async (): Promise<void> => {
    eventSourceRef.current = new EventSource("http://localhost:5050/question");

    eventSourceRef.current.addEventListener("connect", (event) => {
      console.log(event.data);
    });

    eventSourceRef.current.addEventListener("message", (event) => {
      console.log(event.data);
      updateLastAnswer(event.data as string);
    });

    eventSourceRef.current.addEventListener("close", (event) => {
      console.log(event.data);
      eventSourceRef.current?.close();
    });

    eventSourceRef.current.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSourceRef.current?.close();
    };
  };

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  return {
    chatHistory,
    sendQuestion,
  };
};

export default useChatHistory;
