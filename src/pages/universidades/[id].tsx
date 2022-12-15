import { GetServerSideProps } from 'next'
import Layout from 'components/layout'
import { trpc } from 'utils/trpc'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import { useEffect, useState } from 'react'
import Map from 'components/map'
import Link from 'next/link'
import FourOhFour from 'components/404'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: { id: query.id }
    }
}

export default function Universidad({ id }: { id: string }) {
    const { data } = trpc.useQuery(['university.getOneBySubname', { text: id }])
    const [selected, setSelected] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const tags = 'text-xs md:text-xs bg-primary hover:bg-opacity-95 whitespace-nowrap whitespace-nowrap text-white rounded-full w-min px-4 py-1 font-bold'

    const bounds = data?.campus.map(({ latitude, longitude }) => [latitude, longitude]) ?? []
    const marker = data?.campus.map(({ name, direction, latitude, longitude }) => {
        return {
            title: name,
            subname: direction,
            position: [latitude, longitude]
        }
    }) ?? []

    useEffect(() => setSelected(data?.regions[1]?.name ? 'Todos' : data?.regions[0]?.name ?? ''), [data])

    if (data === null) return (
        <FourOhFour
            title='Universidad no encontrada'
            icon='awe'
        >
            Intenta con otra o puedes buscar
            <Link href={'/universidades'}>
                <a className='text-primary font-bold hover:opacity-90 animate-pulse'> aquí </a>
            </Link>
            todas las universidades
        </FourOhFour>
    )
    return (
        <Layout title={`Buu – ${id?.toLocaleString().toUpperCase()}`}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <div className='grid grid-cols-6 mt-4 gap-8'>
                    <section className='col-span-4 rounded-3xl bg-gray-100 px-10 py-8'>
                        <div className='flex justify-between mb-4'>
                            <div className='w-full'>
                                <h1 className='font-bold text-xl md:text-2xl min-w-full'>{data?.name || <Skeleton width={'50%'} />}</h1>
                                <p className='text-sm md:text-base font-medium uppercase'>{data?.subname || <Skeleton width={80} />}</p>
                            </div>
                            {data ? <Image src={data?.logo} alt={data?.name} width={70} height={70} objectFit={'contain'} />
                                : <Skeleton width={70} height={70} containerClassName={'skeleton-container'} />}
                        </div>
                        <p className='text-font text-sm line-clamp-3 w-3/4'>{data?.description || <Skeleton count={3} />}</p>
                        <div className='flex gap-1 flex-wrap mt-10'>
                            {data ? (
                                <>
                                    <p className={`${tags} ${!data.type && 'hidden'}`}>{data?.type}</p>
                                    <p className={`${tags} ${data.ranking === 0 && 'hidden'}`}>{data?.ranking}</p>
                                    <p className={`${tags} ${!data.location && 'hidden'}`}>{data?.location}</p>
                                    <p className={`${tags} ${!data.country && 'hidden'}`}>{data?.country}</p>
                                    <a href={data?.url || ''}
                                        target={'_blank'}
                                        rel={'noreferrer'}
                                        className='text-white'>
                                        <p className={`${tags} ${!data.url && 'hidden'}`}>
                                            Sitio web
                                        </p>
                                    </a>
                                </>
                            ) : <Skeleton height={24} borderRadius={50} />}
                        </div>
                    </section>
                    <section className='col-span-2 flex flex-col gap-2'>
                        {data
                            ? <Map
                                bounds={bounds}
                                marker={marker}
                                className='h-[325px] rounded-3xl z-10'
                            />
                            : <Skeleton height={325} containerClassName={'skeleton-container'} borderRadius={'1.5rem'} inline={true} />}
                    </section>
                </div>

                <div className='grid grid-cols-6 gap-8 mt-4 text-sm md:text-base'>
                    <div className='flex justify-between items-center col-span-4 gap-2'>
                        <h1 className='font-bold text-md md:text-lg text-black/60'>Campus</h1>
                        <div className='relative text-xs text-black/60 font-bold'>
                            <button type={'button'} onClick={() => { data?.regions.length === 1 ? null : setIsOpen(!isOpen) }} className='inline-flex w-full whitespace-nowrap rounded-md text-font bg-hover py-2 px-4' >
                                {data?.regions.length
                                    ? <>
                                        {selected}
                                        <svg className={`ml-2 w-4 h-4 transition-all -rotate-90 ${data.regions.length === 1 && 'hidden'} ${isOpen && 'rotate-0'}`} fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd'></path></svg>
                                    </> : <Skeleton width={70} height={20} containerClassName={'skeleton-container'} inline={true} />}
                            </button>
                            <div className={`${!isOpen ? 'hidden' : ''} absolute bg-white z-20 rounded-lg border min-w-full border-hover shadow-lg mt-1 right-0`}>
                                <ul className='overflow-y-auto p-1'>
                                    {data && data?.regions.length > 1 && <li className='cursor-pointer hover:bg-hover p-2 rounded-md' onClick={() => { setSelected('Todos'); setIsOpen(false) }}>Todos</li>}
                                    {data?.regions.map(({ name }, index) => (
                                        <li key={index} className='flex items-center justify-between hover:bg-hover rounded-md'>
                                            <div className='flex items-center w-full'>
                                                <input hidden onClick={() => { setIsOpen(false); setSelected(name) }}
                                                    readOnly
                                                    id={name}
                                                    type='radio'
                                                    checked={selected === name}
                                                    className='w-3 h-3 cursor-pointer'
                                                />
                                                <label htmlFor={name} className={`whitespace-nowrap cursor-pointer p-2 w-full`}>{name}</label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-6 gap-8 text-sm md:text-base'>
                    <div className='col-span-4 grid grid-cols-4 gap-2'>
                        {data ? data.campus.filter(({ region }) => { return selected === 'Todos' ? true : selected === region.name })
                            .map(({ id, name, location }) => (
                                <div key={id} className={`rounded-3xl bg-gray-100 h-48`}>
                                    <div className='flex flex-col gap-2 justify-end h-full p-4'>
                                        <h1 className='text-xs line-clamp-2'>{name}</h1>
                                        <div className='flex items-center gap-2'>
                                            <svg className='w-3 h-3' x="0px" y="0px" viewBox="0 0 512 512">
                                                <g>
                                                    <path d="M256,31c-77.7,0-140.6,63-140.6,140.6C115.4,312.2,256,481,256,481s140.6-168.8,140.6-309.4C396.6,94,333.7,31,256,31z
                                                        M256,257.8c-47.6,0-86.1-38.6-86.1-86.1s38.6-86.1,86.1-86.1s86.1,38.6,86.1,86.1S303.6,257.8,256,257.8z M201.5,171.6
                                                        c0-30.1,24.4-54.5,54.5-54.5s54.5,24.4,54.5,54.5c0,30.1-24.4,54.5-54.5,54.5S201.5,201.7,201.5,171.6z"/>
                                                </g>
                                            </svg>
                                            <span className='text-xs'>{location}</span>
                                        </div>
                                    </div>
                                </div>
                            )) : <Skeleton className='h-48' inline={true} containerClassName={'skeleton-container'} borderRadius={'1.5rem'} count={4} />}
                    </div>
                </div>
            </div >
        </Layout >
    )
}
