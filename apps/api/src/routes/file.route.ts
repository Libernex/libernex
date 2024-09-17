import { Router } from "express";
import type { Request, Response } from "express";
import fileUploader from "../services/File/file-uploader.ts";
import path from "path";
import fs from "fs";
import FileService from "../services/File/file.service.ts";

const router: Router = Router();

router.post("/upload", async (req: Request, res: Response) => {
  fileUploader(req, res, async (err) => {
    const file = req.file;

    if (err) {
      return res
        .status(400)
        .json({ result: false, message: err?.message || "Failed file upload" });
    }
    if (!file) {
      return res
        .status(400)
        .json({ result: false, message: "No file uploaded" });
    }
    const destPath = path.join("storage");

    // destPath 생성
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }

    const fileService = new FileService();

    const savedFileInfo = await fileService.upload(
      file.path,
      file.filename,
      file.originalname,
      file.size,
    );

    res.status(200).json({
      result: true,
      savedFileInfo,
    });
  });
});

export default router;
