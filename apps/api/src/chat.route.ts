import { Request, Response, Router } from "express";
import { MessageInterface } from "@repo/types/src/Chat";
import * as crypto from "crypto";

const router: Router = Router();
const chunks = `
군인 또는 군무원이 아닌 국민은 대한민국의 영역 안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄 중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.

법률이 정하는 주요 방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.

이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법 시행에 관한 준비는 이 헌법 시행 전에 할 수 있다.

대통령이 제1항의 기간 내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서 확정된다. 정당은 그 목적·조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에 참여하는 데 필요한 조직을 가져야 한다.
`.split(/\s+/);
router.get("/question", async (req: Request, res: Response) => {
  const endMessage = createMessage(
    { role: "assistance", name: "Libernex" },
    { contentType: "text", body: "DONE" },
  );
  const connectMessage = createMessage(
    { role: "system", name: "Libernex" },
    { contentType: "text", body: crypto.randomUUID() },
  );

  try {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    res.write("event: connect\n");
    res.write(`data: ${JSON.stringify(connectMessage)} \n\n`);

    let result: string = "";
    for (const chunk of chunks) {
      result += chunk + " ";

      const message = createMessage(
        { role: "assistance", name: "Libernex" },
        { contentType: "text", body: chunk + " " },
      );

      res.write(`event: message\n`);
      res.write(`data: ${JSON.stringify(message)} \n\n`);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(endMessage)} \n\n`);
    res.end();
  } catch (error) {
    console.error("SSE 에러:", error);
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

export default router;
