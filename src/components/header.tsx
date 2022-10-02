export default function Header() {
    return (
        <header className='bg-secondary w-screen h-64'>
            <div className='flex flex-col gap-4 justify-center items-start pt-[60px] px-4 md:px-8 h-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-2xl'>Encuentra La Mejor Universidad Para Ti</h1>
                <div className='flex justify-between gap-2 pl-6 pr-2 py-2 bg-white rounded-full text-sm w-full'>
                    <div className='flex items-center w-full gap-4'>
                        <input type='text' placeholder='Universidad' className='bg-trasparent truncate focus:outline-none w-full md:w-2/4' />
                        <div className='w-0.5 h-10 bg-gray-200 hidden md:block' />
                        <input type='text' placeholder='Añadir país o ciudad' className='bg-trasparent truncate focus:outline-none w-full hidden md:block' />
                    </div>
                    <button className='bg-primary text-white rounded-full px-4 py-2 md:px-8 lg:px-12 lg:py-4 text-xs font-semibold'>Buscar</button>
                </div>
            </div>
        </header>
    )
}
