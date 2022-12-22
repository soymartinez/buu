import { useState } from 'react'

export default function Filter() {

    const [open, setOpen] = useState(false)

    const Arrow = ({ className }: {
        className: string
    }) => (
        <svg
            width={12}
            height={12}
            viewBox='0 0 24 24'
            fill='currentColor'
            className={className}
        >
            <path
                d="m16.23 23.58 2.24-2a.5.5 0 0 0 0-.71L10.57 12l7.93-8.87a.5.5 0 0 0 0-.71l-2.24-2a.5.5 0 0 0-.71 0L5.2 12l10.32 11.54a.5.5 0 0 0 .71.04Z"
            />
        </svg>
    )

    return (
        <aside className='hidden lg:flex'>
            <div className='flex flex-col gap-4 w-44'>
                <div className='flex flex-col gap-2'>
                    <h1 className='flex items-center gap-2 text-sm font-bold mt-2'>Filtro</h1>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-2 w-full'>
                            <input
                                type={'checkbox'}
                                required
                                value={''}
                                id={''}
                                name={''}
                                className='w-4 h-4 cursor-pointer accent-primary' />
                            <label htmlFor={''} className='text-xs font-medium cursor-pointer w-full'>{'Pública'}</label>
                        </div>
                        <div className='flex items-center gap-2 w-full'>
                            <input
                                type={'checkbox'}
                                required
                                value={''}
                                id={''}
                                name={''}
                                className='w-4 h-4 cursor-pointer accent-primary' />
                            <label htmlFor={''} className='text-xs font-medium cursor-pointer w-full'>{'Privada'}</label>
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
