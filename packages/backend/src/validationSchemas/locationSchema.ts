import { z } from "zod";

export const locationSchema = z.object({
  id: z.number().optional(),
  longitude: z.number(),
  latitude: z.number(),
});

export const locationInputSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
});
