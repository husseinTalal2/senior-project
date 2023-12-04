import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { courtRouter } from "./court";
import { reservationRouter } from "./reservation";
import { userRouter } from "./user.router";

export const appRouter = router({
  court: courtRouter,
  reservation: reservationRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
