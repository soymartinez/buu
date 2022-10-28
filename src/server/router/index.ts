// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { universityRouter } from './universityRouter'
import { protectedExampleRouter } from "./protected-example-router";
import { carrerRouter } from "./carrerRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("university.", universityRouter)
  .merge("carrer.", carrerRouter)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
