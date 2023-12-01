import { TypeOf, z } from "zod";
import { itemSchema } from "./itemSchema";
import { userSchema } from "./userSchema";

export const orderItemSchema = z.object({
  itemId: z.number(),
  quantity: z.number(),
});

export const orderInputSchema = z.object({
  items: z.array(orderItemSchema),
  userId: z.number(),
});

export type OrderInput = z.infer<typeof orderInputSchema>;
