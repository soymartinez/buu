import { createRouter } from './context'
import { z } from 'zod'

export const regionRouter = createRouter()
    .query('getAll', {
        async resolve({ ctx }) {
            return await ctx.prisma.region.findMany({
                include: {
                    campus: true,
                    university: true,
                }
            })
        }
    })
    .mutation('create', {
        input: z.object({
            name: z.string()
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.region.create({
                data: {
                    name: input.name
                }
            })
        }
    })
