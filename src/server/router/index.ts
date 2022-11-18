// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { universityRouter } from './universityRouter'
import { protectedExampleRouter } from "./protected-example-router";
import { careerRouter } from "./careerRouter";
import { regionRouter } from "./regionRouter";
import { campusRouter } from "./campusRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("university.", universityRouter)
  .merge("career.", careerRouter)
  .merge("region.", regionRouter)
  .merge("campus.", campusRouter)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
