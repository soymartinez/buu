import Image from 'next/image'
import { University } from '@prisma/client'

export default function Card(props: University) {
    return (
        <div
            className='flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 
            border md:border-none border-secondary hover:bg-hover transition-colors rounded-xl'>
            <div className='flex items-center gap-4'>
                <div className='grid place-content-center w-10 h-10 relative'>
                    <Image src={props.logo || ''} alt={props.name} layout={'fill'} objectFit={'contain'} />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-base md:text-sm font-bold leading-none'>{props.name}</h1>
                    <p className='text-[14px] text-font font-medium'>{props.subname}</p>
                </div>
            </div>
            <h2 className='text-[16px] md:text-sm font-semibold md:font-bold'>{props.location}</h2>
        </div>
    )
}
