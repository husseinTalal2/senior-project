import { z } from "zod";
import { t } from "../trpc";
import { getTeamById } from "../services/team.service";

export const teamRouter = t.router({
  getTeamById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return getTeamById(input.id);
    }),
});
