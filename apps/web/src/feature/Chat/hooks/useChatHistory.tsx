import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatInterface } from "@repo/types/src/";
import { MessageInterface } from "@repo/types/src";
import { LOGGER } from "@repo/logger";
import { v4 } from "uuid";

type ChatState = "idle" | "sending" | "receiving" | "error";

interface UseChatHistoryReturn {
  chatHistory: ChatInterface[];
  sendQuestion: (question: ChatInterface) => Promise<void>;
  state: ChatState;
  abortCurrentQuestion: () => void;
}

const useChatHistory = (): UseChatHistoryReturn => {
  const [chatHistory, setChatHistory] = useState<ChatInterface[]>([]);
  const [state, setState] = useState<ChatState>("idle");
  const currentAnswerRef = useRef<ChatInterface | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const cleanupRequest = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    currentAnswerRef.current = null;
  }, []);

  const abortCurrentQuestion = useCallback((): void => {
    setState("idle");
    cleanupRequest();
  }, [cleanupRequest]);

  const sendQuestion = useCallback(
    async (question: ChatInterface): Promise<void> => {
      setState("sending");
      setChatHistory((prevHistory) => [...prevHistory, question]);

      const answer: ChatInterface = {
        id: v4(),
        sender: {
          role: "assistance",
          nickname: "Libernex",
          avatarSrc: "C-LX-Logo.svg",
        },
        parts: [],
        sentAt: new Date().toLocaleString(),
      };

      cleanupRequest();

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setChatHistory((prevHistory) => [...prevHistory, answer]);
      currentAnswerRef.current = answer;

      try {
        const response = await fetch(`/api/conversation/123`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ query: question.parts[0].content.body }),
          signal: signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (!response.body) {
          throw new Error("Response body is undefined");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              if (line.trim() === "data: [DONE]") {
                continue;
              }
              try {
                const eventData = JSON.parse(line.slice(6));
                const content = eventData.content.content;
                const message: MessageInterface = {
                  id: v4(),
                  sentAt: new Date().toLocaleString(),
                  author: {
                    role: "assistance",
                    name: "libernex",
                  },
                  content: {
                    contentType: "text",
                    body: content,
                  },
                };
                if (currentAnswerRef.current) {
                  const lastIndex = currentAnswerRef.current.parts.length - 1;
                  if (lastIndex >= 0) {
                    currentAnswerRef.current.parts[lastIndex] = message;
                  } else {
                    currentAnswerRef.current.parts[0] = message;
                  }
                  setChatHistory((prevHistory) => [...prevHistory]);
                }
              } catch (error) {
                LOGGER("Error parsing chunk:", error);
              }
            }
          }
        }

        setState("idle");
      } catch (error) {
        LOGGER(error);
      }
    },
    [cleanupRequest],
  );

  useEffect(() => {
    return (): void => {
      cleanupRequest();
      setState("idle");
    };
  }, [cleanupRequest]);

  return {
    chatHistory,
    sendQuestion,
    state,
    abortCurrentQuestion,
  };
};

export default useChatHistory;
