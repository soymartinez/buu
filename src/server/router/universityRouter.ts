import { createRouter } from "./context";
import { z } from "zod";
import { getBaseUrl } from 'pages/_app'

export const universityRouter = createRouter()
  .query("getOne", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input }) {
      const res = await fetch(`${getBaseUrl()}/api/universities/${input?.text}`)
      const data = await res.json()
      return data
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.university.findMany()
    },
  });
