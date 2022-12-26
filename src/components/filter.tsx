import { useEffect, useState } from 'react'
import Arrow from './icons/arrow'

export interface Filter {
    public: boolean,
    private: boolean,
}

export default function Filter({ setFilter }: { setFilter: (filter: Filter) => void, }) {
    const [open, setOpen] = useState(false)
    const [filter, set] = useState<Filter>({
        public: false,
        private: false,
    })

    useEffect(() => {
        setFilter(filter)
    }, [filter])

    return (
        <aside className='hidden lg:flex'>
            <div className='flex flex-col gap-4 w-44'>
                <div className='flex flex-col gap-2'>
                    <h1 className='flex items-center gap-2 text-sm font-bold mt-2'>Filtro</h1>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-2 w-full'>
                            <input
                                onChange={(e) => set({ ...filter, public: e.target.checked })}
                                type={'checkbox'}
                                id={'public'}
                                name={'public'}
                                checked={filter.public}
                                className='w-4 h-4 cursor-pointer accent-primary' />
                            <label htmlFor={'public'} className='text-xs font-medium cursor-pointer w-full'>{'Pública'}</label>
                        </div>
                        <div className='flex items-center gap-2 w-full'>
                            <input
                                onChange={(e) => set({ ...filter, private: e.target.checked })}
                                type={'checkbox'}
                                id={'private'}
                                name={'private'}
                                checked={filter.private}
                                className='w-4 h-4 cursor-pointer accent-primary' />
                            <label htmlFor={'private'} className='text-xs font-medium cursor-pointer w-full'>{'Privada'}</label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='flex items-center gap-2 text-sm font-bold mt-2 select-none cursor-pointer'
                        onClick={() => setOpen(!open)}>
                        Especialidad
                        <Arrow className={`${open ? '-rotate-180' : '-rotate-90'}`} /></h1>
                    <div className={`flex flex-col gap-3 ${open ? 'h-auto' : 'h-0'} overflow-hidden`}>
                        <div className='flex items-center gap-2 w-full'>
                            <input
                                type={'checkbox'}
                                required
                                value={''}
                                id={''}
                                name={''}
                                className='w-4 h-4 cursor-pointer accent-primary' />
                            <label htmlFor={''} className='text-xs font-medium cursor-pointer w-full'>{'Ingeniería de Software'}</label>
                        </div>
                        <div className='flex items-center gap-2 w-full'>
                            <input
                                type={'checkbox'}
                                required
                                value={''}
                                id={''}
                                name={''}
                                className='w-4 h-4 cursor-pointer accent-primary' />
                            <label htmlFor={''} className='text-xs font-medium cursor-pointer w-full'>{'Administración de Empresas'}</label>
                        </div>
                    </div>
                </div>
            </div>
        </aside >
    )
}
