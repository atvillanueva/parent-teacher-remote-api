import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      if (error?.meta?.target === "homerooms_homeRoomName_key") {
        return res
          .status(400)
          .json({ message: "Home room name already exist" });
      }

      if (error?.meta?.target === "nouns_name_key") {
        return res.status(400).json({ message: "Noun name already exist" });
      }
    }
  }

  res.status(500).json(error);
}

export default errorHandler;
