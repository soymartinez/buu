import { createRouter } from './context'
import { z } from 'zod'
import { Modality } from '@prisma/client'

export const careerRouter = createRouter()
    .query('getAll', {
        async resolve({ ctx }) {
            return await ctx.prisma.career.findMany({
                include: {
                    campus: true,
                    university: true,
                }
            })
        },
    })
    .mutation('create', {
        input: z.object({
            name: z.string(),
            modality: z.string(),
            semesters: z.number(),
            curriculum: z.string(),
            universityId: z.number(),
            campusId: z.number(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.career.create({
                data: {
                    name: input.name,
                    modality: input.modality as Modality,
                    semesters: input.semesters,
                    curriculum: input.curriculum,
                    university: {
                        connect: {
                            id: input.universityId
                        }
                    },
                    campus: {
                        connect: {
                            id: input.campusId
                        }
                    },
                }
            })
        }
    })
