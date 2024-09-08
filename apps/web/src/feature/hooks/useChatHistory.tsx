import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatInterface } from "@repo/types/src";
import { MessageInterface } from "@repo/types/src";

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
    const eventSourceRef = useRef<EventSource | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const cleanupEventSource = useCallback((): void => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        currentAnswerRef.current = null;
    }, []);

    const abortCurrentQuestion = useCallback((): void => {
        setState("idle");
        cleanupEventSource();
    }, [cleanupEventSource]);

    const sendQuestion = useCallback(
        async (question: ChatInterface): Promise<void> => {
            setState("sending");
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

            cleanupEventSource();

            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            const query = JSON.stringify(question);
            eventSourceRef.current = new EventSource(`/api/chat/question?${query}`);

            setChatHistory((prevHistory) => [...prevHistory, answer]);
            currentAnswerRef.current = answer;

            eventSourceRef.current.addEventListener("connect", (event): void => {
                const message: MessageInterface = JSON.parse(event.data);
                if (currentAnswerRef.current) {
                    currentAnswerRef.current.id = message.content.body;
                    setChatHistory((prevHistory) => [...prevHistory]);
                }
            });

            eventSourceRef.current.addEventListener("message", (event): void => {
                setState("receiving");
                const message: MessageInterface = JSON.parse(event.data);
                if (currentAnswerRef.current) {
                    currentAnswerRef.current.parts.push(message);
                    setChatHistory((prevHistory) => [...prevHistory]);
                }
            });

            eventSourceRef.current.onerror = (error: Event): void => {
                setState("error");
                cleanupEventSource();
            };

            signal.addEventListener("abort", (): void => {
                setState("idle");
                cleanupEventSource();
            });
        },
        [cleanupEventSource]
    );

    useEffect(() => {
        return (): void => {
            cleanupEventSource();
            setState("idle");
        };
    }, [cleanupEventSource]);

    return {
        chatHistory,
        sendQuestion,
        state,
        abortCurrentQuestion,
    };
};

export default useChatHistory;