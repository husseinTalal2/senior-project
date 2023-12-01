import { z } from "zod";
import { locationSchema } from "./locationSchema";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email().optional(),
  locationId: z.number().optional(),
  location: locationSchema,
});
