import { useEffect, useState } from 'react'
import { Normalize } from 'utils/normalize'
import Arrow from './icons/arrow'

export default function Dropdown({ title, object, setStatus, defaultValue, currentValue, disabled }: {
    title: string,
    object: any,
    setStatus: any,
    defaultValue?: string,
    currentValue?: (value: string) => void,
    disabled?: boolean,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(defaultValue || '')
    const [data, setData] = useState<any>(object)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (searchValue) {
            const filteredData = object.filter((item: any) => {
                return Normalize(item.name).includes(Normalize(searchValue))
            })
            setData(filteredData)
        } else {
            setData(object)
        }

        setSelected(defaultValue || '')
    }, [object, searchValue])

    const handleClick = (name: string) => {
        setSelected(name)
        setIsOpen(false)
        currentValue && currentValue(name)
    }

    return (
        <div className='relative'>
            <button
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex whitespace-nowrap items-center transition font-bold bg-hover p-2 w-full text-center ${disabled ? 'text-font cursor-not-allowed' : ''}`}
                type='button'
            >
                {selected ? selected : `Seleccionar ${title}`}
                <Arrow className={`ml-auto transition ${isOpen && 'rotate-0'}`} />
            </button>

            <div className={`${!isOpen ? 'hidden' : 'focus:border-black'} absolute bg-white z-20 rounded-b-md border border-hover shadow-lg w-full`}>
                <div className='flex items-center w-full p-3'>
                    <label className='sr-only'>Buscar</label>
                    <div className='relative w-full'>
                        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                            <svg className='w-5 h-5 text-font' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path></svg>
                        </div>
                        <input
                            onChange={(e) => setSearchValue(e.target.value)}
                            type='text'
                            className='placeholder:text-font block p-2 pl-10 w-full rounded-lg border' placeholder='Buscar por nombre' />
                    </div>
                </div>

                <ul className='overflow-y-auto px-3 pb-3 h-48 space-y-[2px]'>
                    {data && data.map(({ id, name }: { id: string, name: string }) => (
                        <li key={id} className={`flex items-center justify-between text-black rounded-lg ${selected === name ? 'bg-hover' : 'hover:bg-hover'}`}>
                            <div className='flex items-center w-full'>
                                <input
                                    onChange={() => handleClick(name)}
                                    onInvalid={() => setIsOpen(true)}
                                    type='radio'
                                    required
                                    value={id}
                                    defaultChecked={defaultValue === name}
                                    id={id + name}
                                    name={title}
                                    className='w-3 h-3 m-2 cursor-pointer accent-primary' />
                                <label htmlFor={id + name} className='pl-0 p-2 cursor-pointer w-full'>{name}</label>
                            </div>
                        </li>
                    ))}
                </ul>
                <button type={'button'} onClick={() => { setStatus(title); setIsOpen(false) }} className='flex items-center w-full p-3 font-medium border-t border-hover hover:underline'>
                    <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path></svg>
                    Agregar {title}
                </button>
            </div>
        </div>
    )
}
