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
          campus: {
            include: {
              region: true,
            }
          },
          careers: true,
          regions: {
            include: {
              campus: {
                where: {
                  university: {
                    subname: input?.text?.toUpperCase(),
                  }
                },
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
  .query('get', {
    input: z.object({
      take: z.number().optional(),
      name: z.string().optional(),
      chips: z.array(z.string()),
      filter: z.object({
        public: z.boolean().optional(),
        private: z.boolean().optional(),
      }),
    }).nullish(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.university.findMany({
        take: input?.take,
        where: {
          OR: [
            {
              name: {
                contains: input?.name,
                mode: 'insensitive',
              },
            },
            {
              subname: {
                contains: input?.name,
                mode: 'insensitive',
              },
            },
          ],
          type: {
            in: [
              input?.filter?.public ? 'Publica' : 'Privada',
              input?.filter?.private ? 'Privada' : 'Publica',
            ],
          },
          careers: {
            some: input?.chips?.length ? {
              name: {
                in: input?.chips,
                mode: 'insensitive',
              }
            } : undefined,
          },
        }
      })
    }
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
      id: z.number().optional(),
      name: z.string(),
      subname: z.string(),
      logo: z.any().optional(),
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
        const { error } = await storage.upload(`logo/${path}`, input.logo, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/png'
        })
        if (error) console.log('Error uploading file: ', error)
        const { data: { publicUrl } } = storage.getPublicUrl(`logo/${path}`)
        return publicUrl
      }

      return await ctx.prisma.university.upsert({
        where: {
          id: input.id === undefined ? -1 : input.id,
        },
        update: {
          name: input.name,
          subname: input.subname,
          logo: await uploadFile(),
          url: input.url,
          description: input.description,
          type: input.type as Type,
          ranking: input.ranking,
          location: input.location,
        },
        create: {
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
  .mutation('delete', {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.university.delete({
        where: {
          id: input.id
        }
      })
    }
  })
