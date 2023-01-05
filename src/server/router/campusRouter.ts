import { createRouter } from './context'
import { z } from 'zod'

export const campusRouter = createRouter()
    .query('getAll', {
        input: z.object({
            name: z.string().optional(),
        }).nullish(),
        async resolve({ ctx, input }) {
            return await ctx.prisma.campus.findMany({
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
                        {
                            location: {
                                contains: input?.name,
                                mode: 'insensitive',
                            },
                        },
                        {
                            university: {
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
                                ]
                            }
                        },
                        {
                            region: {
                                name: {
                                    contains: input?.name,
                                    mode: 'insensitive',
                                },
                            }
                        },
                    ]
                },
                include: {
                    region: true,
                    university: true,
                    careers: true,
                }
            })
        },
    })
    .query('getByCareerId', {
        input: z.object({
            careerId: z.number().optional(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.campus.findMany({
                where: {
                    careers: {
                        some: {
                            career: {
                                id: input?.careerId,
                            }
                        }
                    }
                },
                include: {
                    region: true,
                    university: true,
                    careers: true,
                }
            })
        }
    })
    .mutation('create', {
        input: z.object({
            id: z.number().optional(),
            name: z.string(),
            subname: z.string(),
            direction: z.string(),
            contact: z.string(),
            url: z.string(),
            location: z.string(),
            university: z.number(),
            region: z.number(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.campus.upsert({
                where: {
                    id: input.id === undefined ? -1 : input.id,
                },
                update: {
                    name: input.name,
                    subname: input.subname,
                    direction: input.direction,
                    contact: input.contact,
                    url: input.url,
                    location: input.location,
                    university: {
                        connect: {
                            id: input.university,
                        },
                    },
                    region: {
                        connect: {
                            id: input.region
                        }
                    },
                },
                create: {
                    name: input.name,
                    subname: input.subname,
                    direction: input.direction,
                    contact: input.contact,
                    url: input.url,
                    location: input.location,
                    university: {
                        connect: {
                            id: input.university,
                        },
                    },
                    region: {
                        connect: {
                            id: input.region
                        }
                    },
                }
            })
        },
    })
    .mutation('delete', {
        input: z.object({
            id: z.number(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.campus.delete({
                where: {
                    id: input.id,
                }
            })
        },
    })
