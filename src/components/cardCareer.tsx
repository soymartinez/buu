import { Campus, Career, Careers, University } from '@prisma/client'
import { useState } from 'react'

export default function CardCareer(props: (Careers & {
    careers: (Career & {
        campus: Campus;
        university: University;
    })[];
})) {
    const [hover, setHover] = useState(false)
    const duration = props.careers
        .map((career) => career.duration)
        .sort((a, b) => a - b)
        .reduce((a: any, b) => (a === b ? a : `${a} - ${b}`))

    const period = props.careers
        .map((career) => career.period)
        .sort((a, b) => a.localeCompare(b))
        .reduce((a: any, b) => (a === b ? a : `Semestral - Anual`))

    const type = props.careers
        .map((career) => career.university.type)
        .sort((a, b) => a.localeCompare(b))
        .reduce((a: any, b) => (a === b ? a : `Privada - Pública`))

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            className='grid md:grid-cols-6 md:items-center justify-between gap-4 p-3 
            border md:border-none border-secondary bg-white hover:bg-hover transition-colors rounded-xl overflow-hidden'>
            <div className='md:col-span-3 flex items-center gap-4'>
                <div className='flex flex-col w-full md:truncate'>
                    <h1 className='text-base md:text-sm font-bold leading-none md:truncate'>{props.name}</h1>
                </div>
            </div>
            <div className='sm:col-start-2 md:col-span-2 flex sm:items-center sm:row-span-2 md:row-auto gap-2'>
                <p className={`${hover ? 'bg-white' : 'bg-gray-100'} text-black px-2 py-[3px] rounded-md text-[14px] font-medium`}>{duration} / {period}</p>
                <p className={`${hover ? 'bg-white' : 'bg-gray-100'} text-black px-2 py-[3px] rounded-md text-[14px] font-medium`}>{type}</p>
            </div>
            <h2 className='md:col-span-1 text-xs font-normal line-clamp-3 text-font'>{props.area}</h2>
        </div>
    )
}
