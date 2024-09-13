import { LOGGER } from "@repo/logger";
import { createServer } from "./server";
import { getRetrievedDocs } from "./services/rag.service.ts";

const port = process.env.PORT || 5050;
const server = createServer();

getRetrievedDocs().then((r) => LOGGER(r));

server.listen(port, () => {
  LOGGER(`api running on ${port}`);
});
