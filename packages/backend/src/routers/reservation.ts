import { z } from "zod";
import { t } from "../trpc";
import {
  createNewReservation,
  createNewReservationById,
  getAll,
  getById,
  getByUserId,
} from "../services/reservation.service";

const ReservationCreateInputSchema = z.object({
  from: z.date().or(z.string()), // Either a Date object or a string
  to: z.date().or(z.string()), // Either a Date object or a string
  homeTeamId: z.number(),
  courtId: z.number(),
});

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

  createNewReservation: t.procedure
    .input(ReservationCreateInputSchema)
    .mutation(({ input }) => {
      return createNewReservation(input);
    }),

  createNewReservationById: t.procedure
    .input(z.object({ reservationId: z.number(), awayTeamId: z.number() }))
    .mutation(({ input }) => {
      return createNewReservationById(input.reservationId, input.awayTeamId);
    }),
});
