import { createRouter } from './context'

export const regionRouter = createRouter()
    .query('getAll', {
        async resolve({ ctx }) {
            return await ctx.prisma.region.findMany()
        }
    })