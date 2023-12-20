import { z } from "zod";
import { t } from "../trpc";
import { getAllTeams, getTeamById } from "../services/team.service";

export const teamRouter = t.router({
  getTeamById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return getTeamById(input.id);
    }),

  getAll: t.procedure.query(({ input }) => {
    return getAllTeams();
  }),
});
