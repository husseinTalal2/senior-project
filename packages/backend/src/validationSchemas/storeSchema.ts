import { z } from "zod";
import { locationInputSchema, locationSchema } from "./locationSchema";
import { itemSchema } from "./itemSchema";

export const storeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  items: z.array(itemSchema),
  logo: z.string(),
  cover: z.string(),
  discountPercentage: z.number().nullable(),
  locationId: z.number(),
  closed: z.boolean(),
});

export const storeCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  logo: z.string(),
  cover: z.string(),
  discountPercentage: z.number().optional(),
  closed: z.boolean(),
  location: locationInputSchema,
});

export const storeUpdateSchema = storeCreateSchema
  .partial()
  .merge(z.object({ id: z.number() }));

export type StoreCreateInput = z.infer<typeof storeCreateSchema>;
export type StoreUpdateInput = z.infer<typeof storeUpdateSchema>;
