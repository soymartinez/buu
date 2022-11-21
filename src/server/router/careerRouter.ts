import { createRouter } from './context'
import { z } from 'zod'
import { Level, Modality, Period } from '@prisma/client'

export const careerRouter = createRouter()
    .query('getAllCareers', {
        async resolve({ ctx }) {
            return await ctx.prisma.careers.findMany({
                include: {
                    careers: {
                        include: {
                            campus: true,
                            university: true,
                        }
                    }
                }
            })
        },
    })
    .query('getAllCareersDetails', {
        async resolve({ ctx }) {
            return await ctx.prisma.career.findMany({
                include: {
                    career: true,
                    university: true,
                    campus: true,
                }
            })
        }
    })
    .query('getOne', {
        input: z.object({
            name: z.string(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.careers.findUnique({
                where: {
                    name: input.name,
                },
                include: {
                    careers: true
                }
            })
        },
    })
    .mutation('create', {
        input: z.object({
            career: z.number(),
            university: z.number(),
            campus: z.number(),
            level: z.string(),
            area: z.string(),
            period: z.string(),
            duration: z.number(),
            program: z.string(),
            modality: z.string(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.career.create({
                data: {
                    career: {
                        connect: {
                            id: input.career,
                        }
                    },
                    university: {
                        connect: {
                            id: input.university,
                        }
                    },
                    campus: {
                        connect: {
                            id: input.campus
                        }
                    },
                    level: input.level as Level,
                    area: input.area,
                    period: input.period as Period,
                    duration: input.duration,
                    program: input.program,
                    modality: input.modality as Modality,
                }
            })
        }
    })
