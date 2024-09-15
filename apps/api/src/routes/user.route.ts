import { Router } from "express";
import type { Request, Response } from "express";
import UserService from "../services/user.service.ts";

const router: Router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const {
    username,
    password,
    nickname,
    avatar,
  }: {
    username: string;
    password: string;
    nickname: string;
    avatar?: string;
  } = req.body;

  const { signup } = UserService();

  await signup(username, password, nickname, avatar);

  res.status(201).json({ result: true });
});

router.post("/login", async (req: Request, res: Response) => {
  const {
    username,
    password,
  }: {
    username: string;
    password: string;
  } = req.body;

  const { login } = UserService();

  const user = await login(username, password);

  res.status(200).json({ result: true, user });
});

export default router;
