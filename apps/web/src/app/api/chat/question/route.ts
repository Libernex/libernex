// app/api/chat/question/route.ts
import type { NextRequest } from "next/server";
import EventSource from "eventsource";
import { LOGGER } from "@repo/logger";
import { MessageInterface } from "@repo/types/src";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    // Next 서버에서 eventsource를 사용하여 외부 SSE 서버에 연결
    const eventSource = new EventSource("http://localhost:5050/question");

    const readableStream = new ReadableStream({
      start(controller) {
        eventSource.addEventListener("connect", (event): void => {
          controller.enqueue(`event: connect\n`);
          controller.enqueue(`data: ${event.data} \n\n`);
        });

        eventSource.onmessage = (event) => {
          // SSE 응답을 클라이언트로 스트리밍
          const message: MessageInterface = JSON.parse(event.data);
          if (message.content.body === "DONE") {
            controller.close();
            eventSource.close();
            return;
          }

          controller.enqueue(`data: ${event.data} \n\n`);
        };

        eventSource.onerror = (error) => {
          console.error("SSE Error:", error);
          controller.error(new Error("SSE connection failed"));
          LOGGER(error);
          eventSource.close();
        };

        req.signal.addEventListener("abort", () => {
          console.log("Request aborted by client");
          controller.close();
          eventSource.close();
        });

        return () => {
          console.log("Stream closed");
          eventSource.close();
        };
      },
    });

    // 클라이언트에 SSE 응답 릴레이
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: unknown) {
    LOGGER("GET /api/chat/question 오류");
    if (error instanceof Error) LOGGER(error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}
