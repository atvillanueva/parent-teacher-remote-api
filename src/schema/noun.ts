import { z } from "zod";

export const createNoun = {
  body: z.object({
    name: z.string().min(1),
  }),
};

export const updateNoun = {
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1),
  }),
};
