import { createRouter } from "./context";
import { z } from "zod";
import { Type } from "@prisma/client";

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
  })
  .mutation('create', {
    input: z.object({
      name: z.string(),
      subname: z.string(),
      logo: z.string(),
      url: z.string(),
      description: z.string(),
      type: z.string(),
      ranking: z.number().optional(),
      location: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.university.create({
        data: {
          name: input.name,
          subname: input.subname,
          logo: input.logo,
          url: input.url,
          description: input.description,
          type: input.type as Type,
          ranking: input.ranking,
          location: input.location,
        },
      })
    }
  })
