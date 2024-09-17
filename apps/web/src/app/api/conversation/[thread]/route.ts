import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { LOGGER } from "@repo/logger";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      thread: string;
    };
  },
) {
  try {
    const { thread } = params;
    const { query }: { query: string } = await req.json();

    const response = await axios({
      method: "POST",
      url: `http://localhost:5050/conversation/${thread}`,
      data: {
        query,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      responseType: "stream",
    });

    let streamClosed = false;
    const stream = new ReadableStream({
      async start(controller) {
        response.data.on("data", (chunk: Buffer) => {
          const str = chunk.toString().trim();
          if (str.startsWith("data: ")) {
            try {
              console.log(str);
              if (str === "data: [DONE]") {
                LOGGER("DONE");
                streamClosed = true;
                controller.close();
                return;
              }
              const json = JSON.parse(str.slice(6));
              if (!streamClosed) {
                controller.enqueue(
                  `data: ${JSON.stringify({ content: json })}\n\n`,
                );
              }
            } catch (error) {
              LOGGER(error);
              controller.error(error);
            }
          }
        });

        response.data.on("end", () => {
          if (!streamClosed) {
            LOGGER("Stream ended");
            streamClosed = true;
            controller.close();
          }
        });

        response.data.on("error", (error: any) => {
          LOGGER("Stream error: " + error);
          if (!streamClosed) {
            streamClosed = true;
            controller.error(error);
          }
        });
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    LOGGER(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
