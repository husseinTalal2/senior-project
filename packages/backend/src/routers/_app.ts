import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { courtRouter } from "./court";
import { reservationRouter } from "./reservation";
import { userRouter } from "./user.router";
import { teamRouter } from "./team";

export const appRouter = router({
  court: courtRouter,
  reservation: reservationRouter,
  user: userRouter,
  team: teamRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
