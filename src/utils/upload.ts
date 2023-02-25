import { Request } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import mime from "mime-types";

export type UploadOptions = {
  filePath: (req: Request) => string;
};

const storage = (options: UploadOptions) =>
  multer.diskStorage({
    destination: (req, _file, cb) => {
      const dir = "uploads";
      const destPath = path.join(dir, options.filePath(req));
      const isExists = fs.existsSync(destPath);

      if (!isExists) {
        fs.mkdirSync(destPath, { recursive: true });
      }

      fs.rmSync;

      cb(null, destPath);
    },
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = (options: UploadOptions) =>
  multer({
    storage: storage(options),
    fileFilter: (_req, file, cb) => {
      const type = mime.extension(file.mimetype);
      const extensions = ["png", "jpg", "jpeg", "webp"];

      cb(null, extensions.includes(String(type)));
    },
  });

export default upload;
