import { z } from "zod";
import { t } from "../trpc";
import { CourtService } from "../services/court.service";

const courtService = new CourtService();
export const courtRouter = t.router({
  getAll: t.procedure.query(() => {
    return courtService.getAll();
  }),

  getById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return courtService.getById(input.id);
    }),
});
