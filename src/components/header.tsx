import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Header() {
    const [peep, setPeep] = useState(0)

    const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

    async function loop(i = 1) {
        if (i > 11) i = 1
        setPeep(i)
        await timer(2000)
        loop(i + 1)
    }

    useEffect(() => {
        loop()
    }, [])

    return (
        <header className='bg-secondary w-screen h-64 overflow-hidden'>
            <div className='flex flex-col relative gap-4 justify-center items-start pt-[60px] px-4 md:px-8 h-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl z-20 mix-blend-difference text-white mr-24'>Encuentra La Mejor Universidad Para Ti</h1>
                <div className='flex justify-between z-20 gap-2 pl-6 pr-2 py-2 bg-gradient-to-r from-white to-[#ffffffcc] backdrop-blur-sm rounded-full text-sm w-full'>
                    <div className='flex items-center w-full gap-4'>
                        <input type='text' placeholder='Universidad' className='bg-trasparent truncate focus:outline-none w-full h-full md:w-2/4' />
                        <div className='w-0.5 h-10 bg-gray-200 hidden md:block' />
                        <input type='text' placeholder='Añadir país o ciudad' className='bg-trasparent truncate focus:outline-none w-full h-full hidden md:block' />
                    </div>
                    <button className='bg-primary text-white rounded-full px-4 py-2 md:px-8 lg:px-12 lg:py-4 text-xs font-semibold'>Buscar</button>
                </div>
                <div className='absolute -bottom-10 md:-bottom-12 select-none -right-16 lg:right-[10%] xl:right-[16%] -scale-x-100 w-64 md:w-72 lg:w-80'>
                    <Image src={`/peep-${peep}.svg`} alt='OpenPeeps' width={400} height={400} />
                </div>
            </div>
        </header>
    )
}
