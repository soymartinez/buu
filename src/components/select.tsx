import { useState } from 'react'

export default function Select({ object, name }: { object: object, name: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(Object.keys(object)[0])
    return (
        <div className='relative'>
            <button type={'button'} onClick={() => setIsOpen(!isOpen)} className='inline-flex w-full bg-hover py-3 px-4' >
                {selected}
            </button>
            <div className={`${!isOpen ? 'hidden' : ''} absolute bg-white z-20 rounded-b-md border border-hover shadow-lg w-full`}>
                <ul className='overflow-y-auto p-1 text-sm'>
                    {Object.values(object).map((value, index) => (
                        <li key={index} className='flex items-center justify-between text-black hover:bg-hover rounded-lg'>
                            <div className='flex items-center w-full'>
                                <input hidden onChange={() => { setIsOpen(false); setSelected(value) }} checked={selected === value} id={value} type='radio' value={value} name={name} className='w-3 h-3 cursor-pointer accent-primary' />
                                <label htmlFor={value} className={`text-xs cursor-pointer p-2 w-full`}>{value}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
