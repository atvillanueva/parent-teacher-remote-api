import { z } from "zod";

export const createNoun = {
  body: z.object({
    name: z.string().min(1),
  }),
};
