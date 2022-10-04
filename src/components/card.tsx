import Image from 'next/image'
import { useState } from 'react'

export interface CardProps {
    image?: string
    title?: string
    description?: string
    state?: string
}

export default function Card({ image, title, description, state }: CardProps) {
    const [isHovered, setIsHovered] = useState(false)
    
    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} 
            className='flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 hover:text-white md:hover:text-black 
            border md:border-none border-secondary hover:bg-primary md:hover:bg-hover transition-colors rounded-xl'>
            <div className='flex items-center gap-4'>
                <div>
                    <div className={`w-8 h-8 transition-colors ${isHovered ? 'bg-white' : 'bg-primary'} md:bg-primary rounded-md`} />
                    {/* <Image src={image || ''} alt={title} width={100} height={100} /> */}
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-base md:text-sm font-bold leading-none'>{title}</h1>
                    <p className='text-[14px] text-font font-medium'>{description}</p>
                </div>
            </div>
            <h2 className='text-[16px] md:text-sm font-semibold md:font-bold'>{state}</h2>
        </div>
    )
}
