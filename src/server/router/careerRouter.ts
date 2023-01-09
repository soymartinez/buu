import { createRouter } from './context'
import { z } from 'zod'
import { Level, Modality, Period } from '@prisma/client'

export const careerRouter = createRouter()
    .query('getAllCareers', {
        input: z.object({
            name: z.string().optional(),
        }).nullish(),
        async resolve({ ctx, input }) {
            return await ctx.prisma.careers.findMany({
                where: {
                    name: {
                        contains: input?.name,
                        mode: 'insensitive',
                    },
                },
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
        input: z.object({
            name: z.string().optional(),
            order: z.string().optional(),
        }).nullish(),
        async resolve({ ctx, input }) {
            return await ctx.prisma.career.findMany({
                orderBy: {
                    name: input?.order === 'asc' ? 'asc' : 'desc',
                },
                where: {
                    OR: [
                        {
                            name: {
                                contains: input?.name,
                                mode: 'insensitive',
                            }
                        },
                        {
                            university: {
                                OR: [
                                    {
                                        name: {
                                            contains: input?.name,
                                            mode: 'insensitive',
                                        }
                                    },
                                    {
                                        subname: {
                                            contains: input?.name,
                                            mode: 'insensitive',
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            campus: {
                                name: {
                                    contains: input?.name,
                                    mode: 'insensitive',
                                },
                            }
                        },
                    ]
                },
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
            id: z.number(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.careers.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    careers: true,
                }
            })
        },
    })
    .mutation('create', {
        input: z.object({
            id: z.number().optional(),
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
            return await ctx.prisma.career.upsert({
                where: {
                    id: input.id === undefined ? -1 : input.id,
                },
                update: {
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
                },
                create: {
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
    .mutation('delete', {
        input: z.object({
            id: z.number(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.career.delete({
                where: {
                    id: input.id,
                }
            })
        },
    })
