import { LOGGER } from "@repo/logger";
import { createServer } from "./server";
import RAGChain from "./services/rag.service.ts";
import * as mongoose from "mongoose";

const port = process.env.PORT || 5050;
const server = createServer();

(async () => {
  await RAGChain({
    query: "2차 등록금 납부 기한이 언제인지 알려줘",
    source:
      "https://board.sejong.ac.kr/boardview.do?bbsConfigFK=333&pkid=165320&siteGubun=19",
  });
})();

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => LOGGER("Success Connection MongoDB"))
  .catch((err: Error) => LOGGER(err.message));

server.listen(port, () => {
  LOGGER(`api running on ${port}`);
});
