import { createRouter } from './context'
import { z } from 'zod'

export const regionRouter = createRouter()
    .query('getAll', {
        input: z.object({
            name: z.string().optional(),
            order: z.string().optional(),
        }).nullish(),
        async resolve({ ctx, input }) {
            return await ctx.prisma.region.findMany({
                orderBy: {
                    name: input?.order === 'asc' ? 'asc' : 'desc',
                },
                where: {
                    name: {
                        contains: input?.name,
                        mode: 'insensitive',
                    },
                },
                include: {
                    campus: true,
                    university: true,
                }
            })
        }
    })
    .mutation('create', {
        input: z.object({
            id: z.number().optional(),
            name: z.string()
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.region.upsert({
                where: {
                    id: input.id === undefined ? -1 : input.id,
                },
                update: {
                    name: input.name
                },
                create: {
                    name: input.name
                }
            })
        }
    })
    .mutation('delete', {
        input: z.object({
            id: z.number()
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.region.delete({
                where: {
                    id: input.id
                }
            })
        }
    })
