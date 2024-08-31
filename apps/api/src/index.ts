import { LOGGER } from "@repo/logger";
import { createServer } from "./server";

const port = process.env.PORT || 5050;
const server = createServer();

server.listen(port, () => {
  LOGGER(`api running on ${port}`);
});
