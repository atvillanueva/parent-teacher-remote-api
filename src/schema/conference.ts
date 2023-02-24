import { z } from "zod";

export const createConference = {
  body: z.object({
    studentNumber: z.string().min(1),
    homeRoomName: z.string().min(1),
    nounIds: z.array(z.number()).min(2),
  }),
};

export const verifyConference = {
  body: z.object({
    studentNumber: z.string().min(1),
    homeRoomName: z.string().min(1),
    nounIds: z.array(z.number()).min(2),
  }),
};
