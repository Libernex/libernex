import express, { type Express, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import ConversationRoute from "./routes/conversation.route.ts";
import ThreadRoute from "./routes/thread.route.ts";
import ErrorHandler from "./global/error/error.handler.ts";
import UserRoute from "./routes/user.route.ts";

export const createServer = (): Express => {
  const app = express();
  app.use(morgan("dev"));
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());
  app.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });
  app.get("/status", (_, res) => {
    return res.json({ ok: true });
  });

  addRoutes(app);

  app.use(ErrorHandler);
  return app;
};

const addRoutes = (app: Express): void => {
  app.use(UserRoute);
  app.use(ConversationRoute);
  app.use(ThreadRoute);
};
