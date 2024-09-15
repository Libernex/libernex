import { Request, Response, NextFunction } from "express";
import HttpError from "./http.error.ts";
import { LOGGER } from "@repo/logger";

const ErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  LOGGER(err.stack);
  LOGGER(err.name);

  if (err instanceof HttpError) {
    res.status(err.httpCode).json({
      result: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};

export default ErrorHandler;
