import { router } from "../trpc";
import { courtRouter } from "./court";

export const appRouter = router({
  court: courtRouter,
});

export type AppRouter = typeof appRouter;
