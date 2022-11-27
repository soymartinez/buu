import { createRouter } from "./context";
import { z } from "zod";
import { Type } from "@prisma/client";
import { supabase } from "utils/supabase";

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
                  careers: true,
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
      return await ctx.prisma.university.findMany({
        include: {
          regions: true,
          campus: true,
          careers: true,
        }
      })
    },
  })
  .mutation('create', {
    input: z.object({
      name: z.string(),
      subname: z.string(),
      logo: z.any(),
      url: z.string(),
      description: z.string(),
      type: z.string(),
      ranking: z.number().optional(),
      location: z.string(),
    }),
    async resolve({ ctx, input }) {
      const path = input.name.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-')
      const storage = supabase.storage.from('universities')

      const uploadFile = async () => {
        let url = ''
        const { error } = await storage.upload(`logo/${path}`, input.logo)
        if (error) {
          const { data: { publicUrl } } = storage.getPublicUrl(`logo/${path}`)
          url = publicUrl
        } else {
          const { data: { publicUrl } } = storage.getPublicUrl(`logo/${path}`)
          url = publicUrl
        }
        return url
      }

      return await ctx.prisma.university.create({
        data: {
          name: input.name,
          subname: input.subname,
          logo: await uploadFile(),
          url: input.url,
          description: input.description,
          type: input.type as Type,
          ranking: input.ranking,
          location: input.location,
        },
      })
    }
  })
