import { createRouter } from './context'

export const campusRouter = createRouter()
    .query("getAll", {
        async resolve({ ctx }) {
            return await ctx.prisma.campus.findMany({
                include: {
                    region: true,
                    carrers: true,
                }
            })
        },
    })
