import { z } from "zod";
import { t } from "../trpc";
import { getAll, getById, getCourtSchedule } from "../services/court.service";

export const courtRouter = t.router({
  getAll: t.procedure.query(() => {
    return getAll();
  }),

  getById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return getById(input.id);
    }),

  getCourtSchedule: t.procedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return getCourtSchedule(input.id);
    }),
});
