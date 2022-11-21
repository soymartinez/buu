import { createRouter } from './context'
import { z } from 'zod'

export const campusRouter = createRouter()
    .query('getAll', {
        async resolve({ ctx }) {
            return await ctx.prisma.campus.findMany({
                include: {
                    region: true,
                    careers: true,
                }
            })
        },
    })
    .mutation('create', {
        input: z.object({
            name: z.string(),
            subname: z.string(),
            direction: z.string(),
            contact: z.string(),
            url: z.string(),
            location: z.string(),
            region: z.number(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.campus.create({
                data: {
                    name: input.name,
                    subname: input.subname,
                    direction: input.direction,
                    contact: input.contact,
                    url: input.url,
                    location: input.location,
                    region: {
                        connect: {
                            id: input.region
                        }
                    },
                }
            })
        },
    })
