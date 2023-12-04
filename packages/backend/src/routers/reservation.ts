import { z } from "zod";
import { t } from "../trpc";
import { getAll, getById, getByUserId } from "../services/reservation.service";

export const reservationRouter = t.router({
  getAll: t.procedure.query(() => {
    return getAll();
  }),

  getById: t.procedure
    .input(z.object({ id: z.number(), userId: z.string() }))
    .query(({ input }) => {
      return getById(input.id, input.userId);
    }),

  getByUserId: t.procedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => {
      return getByUserId(input.userId);
    }),
});
