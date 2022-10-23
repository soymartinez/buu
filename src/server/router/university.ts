import { createRouter } from "./context";
import { z } from "zod";
import { getBaseUrl } from 'pages/_app'

export const universityRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      const res = await fetch(`${getBaseUrl()}/api/examples`)
      const data = await res.json()
      return data;
      // return await ctx.prisma.example.findMany();
    },
  });
