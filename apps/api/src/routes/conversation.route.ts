import * as crypto from "node:crypto";
import type { Request, Response } from "express";
import { Router } from "express";
import type { MessageInterface } from "@repo/types/src/Chat";
import { LOGGER } from "@repo/logger";
import Lipsum from "../resources/sample-response.json";
import RAGService from "../services/rag.service.ts";

const router: Router = Router();

// 기존 스레드가 있을 경우

type Content = {
  type: "text" | "file";
  parts: string[];
};

const chunks = Lipsum["Lipsum-KO"][0].split(/\s+/);

// router.post("/:thread", async (req: Request, res: Response) => {
//   const { thread } = req.params;
//   const { query, source }: { query: string; source: string } = req.body;
//
//   LOGGER(`Thread: ${thread}, Query: ${query}, Source: ${source}`);
//   setEventStreamHeaders(res);
//
//   const ragService = new RAGService();
//
//   try {
//     // AsyncGenerator를 사용하여 스트리밍
//     let result = "";
//     for await (const chunk of ragService.askQuery({ query, source })) {
//       result += chunk;
//       res.write(
//         `data: ${JSON.stringify({ type: "chunk", content: result })}\n\n`,
//       );
//       // LOGGER(`Chunk: ${chunk}`);
//     }
//
//     res.write(`data: [DONE]\n\n`);
//   } catch (error) {
//     LOGGER(`Error in RAGService: ${error}`);
//     res.write(`data: [DONE]\n\n`);
//   } finally {
//     res.end();
//   }
//
//   req.on("close", () => {
//     LOGGER("Client disconnected");
//   });
// });

router.get("/123", async (req: Request, res: Response) => {
  const endMessage = createMessage(
    { role: "assistance", name: "Libernex" },
    { contentType: "text", body: "DONE" },
  );
  const connectMessage = createMessage(
    { role: "system", name: "Libernex" },
    { contentType: "text", body: crypto.randomUUID() },
  );

  try {
    setEventStreamHeaders(res);
    setTimeout(() => {}, 5000);

    res.write("event: connect\n");
    res.write(`data: ${JSON.stringify(connectMessage)} \n\n`);

    let result = "";
    for (const chunk of chunks) {
      result += `${chunk} `;

      const message = createMessage(
        { role: "assistance", name: "Libernex" },
        { contentType: "text", body: `${chunk} ` },
      );

      res.write(`event: message\n`);
      res.write(`data: ${JSON.stringify(message)} \n\n`);
      new Promise((resolve) => setTimeout(resolve, 100));
    }

    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(endMessage)} \n\n`);
    res.end();
    LOGGER(result);
  } catch (error) {
    LOGGER("SSE 에러:", error);
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(endMessage)} \n\n`);
    res.end();
  }
});

const createMessage = (
  author: { role: "assistance" | "system" | "user"; name: string },
  content: { contentType: "text" | "file" | "link"; body: string },
): MessageInterface => {
  return {
    id: crypto.randomUUID(),
    author,
    content,
    sentAt: new Date().toLocaleString(),
  };
};

const setEventStreamHeaders = (res: Response): void => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
};

export default router;
