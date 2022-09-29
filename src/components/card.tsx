import Image from 'next/image'

export interface CardProps {
    image?: string
    title?: string
    description?: string
    state?: string
}

export default function Card({ image, title, description, state }: CardProps) {
    return (
        <div className='flex items-center justify-between gap-4 p-3 hover:bg-hover transition-colors rounded-xl'>
            <div className='flex items-center gap-4'>
                <div className='w-8 h-8 bg-primary rounded-md' />
                {/* <Image src={image || ''} alt={title} width={100} height={100} /> */}
                <div className='flex flex-col'>
                    <h1 className='text-sm font-bold'>{title}</h1>
                    <p className='text-[14px] text-font font-medium'>{description}</p>
                </div>
            </div>
            <h2 className='text-sm font-bold'>{state}</h2>
        </div>
    )
}
