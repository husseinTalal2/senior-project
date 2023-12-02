import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { courtRouter } from "./court";
import { reservationRouter } from "./reservation";

export const appRouter = router({
  court: courtRouter,
  reservation: reservationRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
