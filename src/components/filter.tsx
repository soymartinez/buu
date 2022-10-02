import { useState } from 'react'

export default function Filter() {

    const [isOpenState, setIsOpenState] = useState(false)

    const Arrow = ({ className }: any) => (
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
        <aside>
            <ul className='flex gap-4'>
                <li className=''>
                    <div onClick={() => setIsOpenState(!isOpenState)} className='flex items-center gap-2 font-bold select-none'>
                        Estados <Arrow className={isOpenState ? '-rotate-90' : '-rotate-180'} />
                    </div>
                    <ul className={`${isOpenState ? 'block' : 'hidden'} transition-all pl-4`}>
                        <li>Veracruz</li>
                        <li>Ciudad de México</li>
                        <li>Nuevo León</li>
                    </ul>
                </li>
                <li>
                    <a href='#'>
                        <div className='flex items-center gap-2 font-bold'>
                            Carreras <Arrow className={'-rotate-180'} />
                        </div>
                    </a>
                    <ul className='hidden pl-4'>
                        <li>Medicina</li>
                        <li>Odontología</li>
                        <li>Enfermería</li>
                    </ul>
                </li>
            </ul>
        </aside>
    )
}
