import express, { type Express, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import ChatRoute from "./routes/chat.route.ts";

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
  return app;
};

const addRoutes = (app: Express) => {
  app.use(ChatRoute);
};
