import Image from 'next/image'
import { University } from '@prisma/client'
import { useState } from 'react'

export default function Card(props: University) {
    const [hover, setHover] = useState(false)
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            className='grid md:grid-cols-6 md:items-center justify-between gap-4 p-3 
            border md:border-none border-secondary bg-white hover:bg-hover transition-colors rounded-xl overflow-hidden'>
            <div className='md:col-span-3 flex items-center gap-4'>
                <div>
                    <div className='w-10 h-10 relative'>
                        <Image src={props.logo || ''} alt={props.name} layout={'fill'} objectFit={'contain'} />
                    </div>
                </div>
                <div className='flex flex-col w-full md:truncate'>
                    <h1 className='text-base md:text-sm font-bold leading-none md:truncate'>{props.name}</h1>
                    <p className='text-[14px] text-font font-medium'>{props.subname}</p>
                </div>
            </div>
            <div className='sm:col-start-2 md:col-span-2 flex sm:items-center sm:row-span-2 md:row-auto gap-2'>
                <p className={`${hover ? 'bg-white' : 'bg-gray-100'} text-black px-2 py-[3px] rounded-md text-[14px] font-medium`}>{props.type}</p>
                <p className={`${hover ? 'bg-white' : 'bg-gray-100'} text-black px-2 py-[3px] rounded-md text-[14px] font-medium`}>{props.country}</p>
            </div>
            <h2 className='md:col-span-1 text-xs font-bold '>{props.location}</h2>
        </div>
    )
}
