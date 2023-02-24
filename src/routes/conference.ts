import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import prisma from "@/prisma/prisma-client";
import { createConference, verifyConference } from "@/src/schema/conference";

const router = Router();

router.post(
  "/conferences/verification",
  validateRequest(createConference),
  async (req, res, next) => {
    try {
      const { studentNumber, homeRoomName, nounIds } = req.body;

      const conferences = await prisma.conference.findMany({
        where: {
          homeRoomName,
        },
      });

      const conference = conferences.find(
        (conference) => conference.studentNumber === studentNumber
      );

      if (!conferences.length) {
        return res.status(400).json({ message: "Invalid home room name" });
      }

      if (!conference) {
        return res.status(400).json({ message: "Invalid student number" });
      }

      if (conference && conference.nouns !== nounIds.join(", ")) {
        return res
          .status(400)
          .json({ message: "Incorrect associated pictures" });
      }

      res.json(conference);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/conferences",
  validateRequest(createConference),
  async (req, res, next) => {
    try {
      const { studentNumber, homeRoomName, nounIds } = req.body;

      const nouns = await prisma.noun.findMany({
        select: {
          id: true,
        },
        where: {
          id: {
            in: nounIds,
          },
        },
      });

      const conference = await prisma.conference.findFirst({
        where: {
          studentNumber,
          homeRoomName,
        },
      });

      if (nouns.length !== nounIds.length) {
        return res.status(400).json({ message: "Some noun id doesn't exist" });
      }

      if (conference) {
        const result = await prisma.conference.update({
          where: {
            id: conference.id,
          },
          data: {
            nouns: nouns.map((noun) => noun.id).join(", "),
          },
        });

        res.json(result);
      } else {
        const result = await prisma.conference.create({
          data: {
            studentNumber,
            homeRoomName,
            nouns: nouns.map((noun) => noun.id).join(", "),
          },
        });

        res.json(result);
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
