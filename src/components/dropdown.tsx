import { useState } from 'react'

export default function Dropdown({ title, object, setStatus }: { title: string, object: any, setStatus: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState('')
    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className={`inline-flex whitespace-nowrap items-center transition font-bold bg-hover px-4 py-3 w-full text-center text-xs`} type='button'>
                {selected ? selected : `Seleccionar ${title}`}
                <svg className={`ml-auto w-4 h-4 text-black transition-all -rotate-90 ${isOpen && 'rotate-0'}`} fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd'></path></svg>
            </button>

            <div className={`${!isOpen ? 'hidden' : 'focus:border-black'} absolute bg-white z-50 rounded-b-md border border-hover shadow-lg`}>
                <div className='flex items-center w-full p-3'>
                    <label className='sr-only'>Buscar</label>
                    <div className='relative w-full'>
                        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                            <svg className='w-5 h-5 text-font' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path></svg>
                        </div>
                        <input type='text' className='placeholder:text-font block p-2 pl-10 w-full text-xs rounded-lg border' placeholder='Buscar por nombre' />
                    </div>
                </div>

                <ul className='overflow-y-auto px-3 pb-3 h-48 text-sm'>
                    {object && object.map(({ id, name }: { id: string, name: string }) => (
                        <li key={id} className='flex items-center justify-between text-black hover:bg-hover rounded-lg'>
                            <div className='flex items-center w-full'>
                                <input onChange={() => { setSelected(name); setIsOpen(false) }} type='radio' value={id} id={name} name={title} className='w-3 h-3 m-2 cursor-pointer accent-primary' />
                                <label htmlFor={name} className='pl-0 p-2 text-xs cursor-pointer w-full'>{name}</label>
                            </div>
                        </li>
                    ))}
                </ul>
                <button type={'button'} onClick={() => { setStatus(title); setIsOpen(false) }} className='flex items-center w-full p-3 text-xs font-medium border-t border-hover hover:underline'>
                    <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path></svg>
                    Agregar {title}
                </button>
            </div>
        </div>
    )
}
