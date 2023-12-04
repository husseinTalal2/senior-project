import { z } from "zod";
import { t } from "../trpc";
import { getAll, getById, getCourtSchedule } from "../services/court.service";
import { Role } from "@prisma/client";
import { createUser } from "../services/user.service";

const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const userCreateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  role: z.enum(["ADMIN", "USER", "OWNER"]),
  location: locationSchema,
});

export const userRouter = t.router({
  create: t.procedure.input(userCreateSchema).query(({ input }) => {
    return createUser(input);
  }),
});
