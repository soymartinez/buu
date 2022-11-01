import { createRouter } from './context'

export const carrerRouter = createRouter()
    .query("getAll", {
        async resolve({ ctx }) {
            return await ctx.prisma.carrer.findMany({
                include: {
                    campus: true,
                    university: true,
                }
            })
        },
    });
