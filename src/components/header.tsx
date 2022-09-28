export default function Header() {
    return (
        <header className='pt-[60px] absolute inset-0 px-4 bg-secondary w-screen h-64 flex flex-col gap-4 justify-center items-start'>
            <h1 className='font-bold text-2xl'>Encuentra La Mejor Universidad Para Ti</h1>
            <div className='flex justify-between pl-4 pr-2 py-2 bg-white rounded-full text-xs w-full'>
                <div className='flex gap-4'>
                    <input type='text' placeholder='Universidad' className='bg-trasparent truncate focus:outline-none' />
                    <div className='w-0.5 h-10 bg-gray-200 hidden md:block' />
                    <input type='text' placeholder='Añadir país o ciudad' className='bg-trasparent truncate focus:outline-none hidden md:block' />
                </div>
                <button className='bg-primary text-white rounded-full px-4 py-2 font-semibold'>Buscar</button>
            </div>
        </header>
    )
}
