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
        <header className='bg-secondary h-64 overflow-hidden w-full'>
            <div className='flex flex-col relative gap-4 justify-center items-start pt-[60px] px-4 md:px-8 h-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl z-20 mix-blend-difference text-white mr-24'>Encuentra La Mejor Universidad Para Ti</h1>
                <div className='flex justify-between z-20 gap-2 md:pl-6 pl-4 pr-2 py-2 bg-gradient-to-r from-white to-[#ffffffcc] backdrop-blur-sm rounded-full text-sm w-full'>
                    <div className='flex items-center w-full gap-3 md:gap-4'>
                        <div><svg className='w-5 lg:w-6 text-font' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path></svg></div>
                        <input type='text' placeholder='Universidad' className='bg-trasparent truncate focus:outline-none w-full md:h-10 md:w-2/4' />
                        <div className='w-0.5 h-10 bg-gray-200 hidden lg:block' />
                        <input type='text' placeholder='Añadir país o ciudad' className='bg-trasparent truncate focus:outline-none w-full h-full hidden lg:block' />
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
