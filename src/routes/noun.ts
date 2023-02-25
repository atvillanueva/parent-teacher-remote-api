import path from "path";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import prisma from "@/prisma/prisma-client";
import upload, { UploadOptions } from "@/utils/upload";
import { createNoun, updateNoun } from "@/src/schema/noun";

const router = Router();

const uploadOptions: UploadOptions = {
  filePath: (req) => path.join("nouns", req.body.name),
};

router.get("/nouns", async (_req, res, next) => {
  try {
    const nouns = await prisma.noun.findMany();

    res.json(nouns);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/nouns",
  upload(uploadOptions).single("image"),
  validateRequest(createNoun),
  async (req, res, next) => {
    try {
      const body = req.body;
      const file = req.file as Express.Multer.File;
      const imgSrc = file.path.replace(/\\/g, "/");

      const noun = await prisma.noun.create({
        data: {
          ...body,
          imgSrc,
        },
      });

      res.json(noun);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/nouns/:id",
  upload(uploadOptions).single("image"),
  validateRequest(updateNoun),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const file = req.file as Express.Multer.File;
      const imgSrc = file.path.replace(/\\/g, "/");

      const noun = await prisma.noun.update({
        where: {
          id: Number(id),
        },
        data: {
          ...body,
          imgSrc,
        },
      });

      res.json(noun);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
