import { z } from "zod";

export const itemSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().nullable(),
  img: z.string(),
  quantityAvailable: z.number(),
  price: z.number(),
  storeId: z.number().nullable(),
  orderId: z.number().nullable(),
});

export const itemCreateInputSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  img: z.string(),
  quantityAvailable: z.number(),
  price: z.number(),
  storeId: z.number(),
});

export const itemUpdateInputSchema = itemCreateInputSchema
  .partial()
  .merge(z.object({ id: z.number() }));

export type ItemUpdateInput = z.infer<typeof itemUpdateInputSchema>;
export type ItemCreateInput = z.infer<typeof itemCreateInputSchema>;
