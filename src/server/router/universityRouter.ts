import { createRouter } from "./context";
import { z } from "zod";

export const universityRouter = createRouter()
  .query("getOneBySubname", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.university.findUnique({
        where: {
          subname: input?.text?.toUpperCase(),
        },
        include: {
          regions: {
            include: {
              campus: {
                include: {
                  carrers: true,
                }
              }
            }
          }
        }
      })
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.university.findMany()
    },
  });
