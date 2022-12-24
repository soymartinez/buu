import { GetServerSideProps } from 'next'
import Layout from 'components/layout'
import { trpc } from 'utils/trpc'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import { useEffect, useState } from 'react'
import Map from 'components/map'
import Link from 'next/link'
import FourOhFour from 'components/404'
import ScrollChips from 'components/scrollchips'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: { id: query.id }
    }
}

export default function Universidad({ id }: { id: string }) {
    const { data } = trpc.useQuery(['university.getOneBySubname', { text: id }])
    const [selected, setSelected] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [like, setLike] = useState(false)
    const tags = 'flex justify-center items-center gap-1 text-[14px] md:text-xs bg-[#efefef] hover:bg-opacity-95 whitespace-nowrap rounded-full w-min px-2 md:px-4 py-[8px] font-medium md:font-bold'

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
        <Layout title={`Buu – ${id?.toLocaleString().toUpperCase()}`} navbar={false}>
            <div className='flex flex-col gap-4 md:pt-[80px] pxx-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <div className='grid grid-cols-6 md:mt-4 gap-4 md:gap-8'>
                    <section className={`col-span-6 lg:col-span-4 md:rounded-3xl -space-y-3 md:space-y-0 ${data ? 'md:bg-gradient-to-r from-black/70' : ''} md:px-10 md:py-8 relative md:overflow-hidden`}>
                        <div className='hidden md:block'>
                            {data && data?.images[0]
                                ? <div className='inset-0 absolute -z-10'>
                                    <Image src={data.images[0]} alt={data.name} layout={'fill'} objectFit={'cover'} className={'select-none'} />
                                </div>
                                : <div className='bg-gray-100 absolute inset-0 -z-10' />}
                        </div>
                        <div className='md:hidden sticky top-0 h-72 z-0'>
                            <div className='py-8 px-3 bg-gradient-to-b from-black/60 to-trasparent absolute top-0 w-full z-10 flex justify-between items-center'>
                                <svg
                                    onClick={() => window.history.back()}
                                    className='cursor-pointer z-10 text-white w-8 h-8'
                                    viewBox='0 0 24 24'
                                >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M14.53 7.53a.75.75 0 0 0-1.06-1.06l-5 5a.75.75 0 0 0 0 1.061l5 5a.75.75 0 0 0 1.06-1.061L10.06 12Z"
                                        fill="#fff"
                                    />
                                </svg>

                                {like
                                    ? <svg
                                        onClick={() => setLike(false)}
                                        className='cursor-pointer z-10 text-white w-8 h-8 p-1'
                                        viewBox="0 0 24 24"
                                        xmlSpace="preserve"
                                        fill='currentColor'>
                                        <path d="M2.2 9.4c0 1.3.2 3.3 2 5.1 1.6 1.6 6.9 5.2 7.1 5.4.2.1.4.2.6.2s.4-.1.6-.2c.2-.2 5.5-3.7 7.1-5.4 1.8-1.8 2-3.8 2-5.1 0-3-2.4-5.4-5.4-5.4-1.6 0-3.2.9-4.2 2.3C11 4.9 9.4 4 7.6 4 4.7 4 2.2 6.4 2.2 9.4z" />
                                    </svg>
                                    : <svg
                                        onClick={() => setLike(!like)}
                                        className='cursor-pointer z-10 text-white w-8 h-8 p-1'
                                        viewBox="0 0 24 24"
                                        xmlSpace="preserve"
                                        fill='currentColor'>
                                        <path d="M12 20a1 1 0 0 1-.561-.172c-.225-.151-5.508-3.73-7.146-5.371C2.462 12.626 2.25 10.68 2.25 9.375A5.38 5.38 0 0 1 7.625 4c1.802 0 3.398.891 4.375 2.256A5.373 5.373 0 0 1 16.375 4a5.38 5.38 0 0 1 5.375 5.375c0 1.305-.212 3.251-2.043 5.082-1.641 1.641-6.923 5.22-7.146 5.371A1 1 0 0 1 12 20zM7.625 6A3.379 3.379 0 0 0 4.25 9.375c0 1.093.173 2.384 1.457 3.668 1.212 1.212 4.883 3.775 6.293 4.746 1.41-.971 5.081-3.534 6.293-4.746 1.284-1.284 1.457-2.575 1.457-3.668C19.75 7.514 18.236 6 16.375 6S13 7.514 13 9.375a1 1 0 1 1-2 0A3.379 3.379 0 0 0 7.625 6z" />
                                    </svg>}
                            </div>
                            {data && data?.images[0]
                                ? <Image src={data.images[0]} alt={data.name} layout={'fill'} objectFit={'cover'} className={'select-none'} />
                                : <div className={'flex'}><Skeleton height={360} className={'flex'} containerClassName={'skeleton-container'} inline={true} /></div>}
                        </div>
                        <div className='bg-white md:bg-trasparent px-4 pt-6 md:p-0 relative z-10 rounded-t-3xl flex flex-col gap-4 md:gap-0'>
                            <div className='flex justify-between md:mb-4 relative'>
                                <div className='w-full'>
                                    <h1 className='md:text-white font-bold text-xl md:text-2xl min-w-full leading-5 md:leading-none'>{data?.name || <Skeleton width={'50%'} />}</h1>
                                    <p className='text-font md:text-white font-medium uppercase'>{data?.subname || <Skeleton width={80} />}</p>
                                </div>
                                <div className='relative w-[55px] h-[55px] md:w-[60px] md:h-[60px] flex'>
                                    {data ? <Image src={data?.logo} alt={data?.name} objectFit={'contain'} layout={'fill'} />
                                        : <Skeleton width={55} height={55} containerClassName={'skeleton-container'} />}
                                </div>
                            </div>
                            <div className='flex flex-col-reverse gap-4 md:block'>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='text-black font-semibold text-xs md:hidden'>{data?.description ? 'Descripción:' : <Skeleton width={150} />}</h3>
                                    <p className='md:text-white/70 text-font text-xs md:text-sm leading-4 md:leading-normal line-clamp-3 md:w-3/4'>
                                        {data?.description || <Skeleton count={3} />}
                                    </p>
                                </div>
                                {data ? (
                                    <ScrollChips className='md:flex-wrap md:mt-9'>
                                        <p className={`${tags} ${!data.type && 'hidden'}`}>
                                            <svg className='w-3 h-3' viewBox='0 0 24 24'>
                                                <path
                                                    d='M9.99 22.75c-.2 0-.36-.04-.48-.09-.4-.15-1.08-.64-1.08-2.19v-6.45H6.09c-1.34 0-1.82-.63-1.99-1-.17-.38-.32-1.15.56-2.16l7.57-8.6c1.02-1.16 1.85-1.08 2.25-.93.4.15 1.08.64 1.08 2.19v6.45h2.34c1.34 0 1.82.63 1.99 1 .17.38.32 1.15-.56 2.16l-7.57 8.6c-.71.81-1.33 1.02-1.77 1.02Zm3.94-20.01c-.03.04-.24.14-.57.52l-7.57 8.6c-.28.32-.32.52-.32.56.02.01.2.11.62.11h3.09c.41 0 .75.34.75.75v7.2c0 .5.09.72.13.78.03-.04.24-.14.57-.52l7.57-8.6c.28-.32.32-.52.32-.56-.02-.01-.2-.11-.62-.11h-3.09c-.41 0-.75-.34-.75-.75v-7.2c.01-.5-.09-.71-.13-.78Z'
                                                    fill='#000'
                                                />
                                            </svg>
                                            {data?.type}
                                        </p>
                                        <p className={`${tags} ${data.ranking === 0 && 'hidden'}`}>
                                            <svg className='w-3 h-3' viewBox='0 0 24 24'>
                                                <path
                                                    d='M12.15 19.35c-.41 0-.75-.34-.75-.75v-2.1c0-.41.34-.75.75-.75s.75.34.75.75v2.1c0 .41-.34.75-.75.75Z'
                                                    fill='#000'
                                                />
                                                <path
                                                    d='M17.9 22.75H6.4V21c0-1.52 1.23-2.75 2.75-2.75h6c1.52 0 2.75 1.23 2.75 2.75v1.75Zm-10-1.5h8.5V21c0-.69-.56-1.25-1.25-1.25h-6c-.69 0-1.25.56-1.25 1.25v.25Z'
                                                    fill='#000'
                                                />
                                                <path
                                                    d='M18.15 22.75h-12c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75ZM18.43 12.44c-.21 0-.42-.09-.57-.26a.74.74 0 0 1-.12-.79c.34-.78.51-1.61.51-2.48v-3c0-.35-.06-.69-.18-1.05-.01-.03-.02-.07-.03-.11-.03-.15-.04-.3-.04-.44 0-.41.34-.75.75-.75h.6c1.79 0 3.25 1.5 3.25 3.35 0 1.53-.63 3.04-1.72 4.13-.02.02-.08.07-.09.08-.59.49-1.26 1.04-2.16 1.29-.07.02-.13.03-.2.03Zm1.25-7.35c.05.27.07.55.07.82v3c0 .41-.03.8-.09 1.2l.17-.14c.8-.8 1.27-1.92 1.27-3.06 0-.9-.61-1.66-1.42-1.82ZM5.58 12.4a.62.62 0 0 1-.23-.04c-.82-.26-1.59-.74-2.23-1.38C1.97 9.71 1.4 8.32 1.4 6.85c0-1.82 1.43-3.25 3.25-3.25h.65c.25 0 .49.13.63.34.14.21.16.48.06.71-.16.36-.24.77-.24 1.2v3c0 .86.17 1.7.52 2.5.12.27.06.58-.13.8-.15.16-.35.25-.56.25ZM4.3 5.13c-.81.16-1.4.86-1.4 1.72 0 1.09.44 2.14 1.31 3.1.04.05.09.09.14.13-.07-.41-.1-.82-.1-1.23v-3c0-.24.02-.48.05-.72Z'
                                                    fill='#000'
                                                />
                                                <path
                                                    d='M12 16.75c-4.27 0-7.75-3.48-7.75-7.75V6c0-2.62 2.13-4.75 4.75-4.75h6c2.62 0 4.75 2.13 4.75 4.75v3c0 4.27-3.48 7.75-7.75 7.75Zm-3-14C7.21 2.75 5.75 4.21 5.75 6v3c0 3.45 2.8 6.25 6.25 6.25s6.25-2.8 6.25-6.25V6c0-1.79-1.46-3.25-3.25-3.25H9Z'
                                                    fill='#000'
                                                />
                                            </svg>
                                            {data?.ranking}
                                        </p>
                                        <p className={`${tags} ${!data.location && 'hidden'}`}>
                                            <svg className='w-3 h-3' viewBox='0 0 24 24'>
                                                <path
                                                    d='M17.22 9.75H8.96c-.56 0-1.12-.19-1.56-.55L5.21 7.45c-.6-.48-.94-1.19-.94-1.95s.34-1.48.94-1.95L7.4 1.8c.44-.35 1-.55 1.56-.55h8.26a2.5 2.5 0 0 1 2.5 2.5v3.5a2.5 2.5 0 0 1-2.5 2.5Zm-8.26-7c-.23 0-.45.08-.62.22L6.15 4.72a1 1 0 0 0-.38.78c0 .3.14.59.38.78l2.19 1.75c.18.14.4.22.62.22h8.26c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1H8.96ZM15.06 19.75H6.8a2.5 2.5 0 0 1-2.5-2.5v-3.5a2.5 2.5 0 0 1 2.5-2.5h8.26c.57 0 1.12.19 1.56.55l2.19 1.75c.6.48.94 1.19.94 1.95s-.34 1.48-.94 1.95l-2.19 1.75c-.44.36-.99.55-1.56.55Zm-8.26-7c-.55 0-1 .45-1 1v3.5c0 .55.45 1 1 1h8.26c.23 0 .45-.08.62-.22l2.19-1.75a1 1 0 0 0 .38-.78 1 1 0 0 0-.38-.78l-2.19-1.75c-.18-.14-.4-.22-.62-.22H6.8Z'
                                                    fill='#000'
                                                />
                                                <path
                                                    d='M12 12.75c-.41 0-.75-.34-.75-.75V9c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75ZM12 22.75c-.41 0-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75Z'
                                                    fill='#000'
                                                />
                                                <path
                                                    d='M15 22.75H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h6c.41 0 .75.34.75.75s-.34.75-.75.75Z'
                                                    fill='#000'
                                                />
                                            </svg>
                                            {data?.location}
                                        </p>
                                        <p className={`${tags} ${!data.country && 'hidden'}`}>
                                            <svg className='w-3 h-3' viewBox='0 0 24 24'>
                                                <path
                                                    d='M5.15 22.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v20c0 .41-.34.75-.75.75Z'
                                                    fill='#000'
                                                />
                                                <path
                                                    d='M16.35 16.75H5.15c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h11.2c1.09 0 1.6-.29 1.7-.54.1-.25-.05-.81-.83-1.58l-1.2-1.2c-.49-.43-.79-1.08-.82-1.8-.03-.76.27-1.51.82-2.06l1.2-1.2c.74-.74.97-1.34.86-1.6-.11-.26-.68-.52-1.73-.52H5.15a.749.749 0 1 1 0-1.5h11.2c2.19 0 2.89.91 3.12 1.45.22.54.37 1.68-1.19 3.24l-1.2 1.2c-.25.25-.39.6-.38.95.01.3.13.57.34.76l1.24 1.23c1.53 1.53 1.38 2.67 1.16 3.22-.23.53-.94 1.45-3.09 1.45Z'
                                                    fill='#000'
                                                />
                                            </svg>
                                            {data?.country}
                                        </p>
                                        <a href={data?.url || ''}
                                            target={'_blank'}
                                            rel={'noreferrer'}
                                        >
                                            <p className={`${tags} ${!data.url && 'hidden'}`}>
                                                <svg className='w-3 h-3' viewBox='0 0 24 24'>
                                                    <path
                                                        d='M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75Zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75Z'
                                                        fill='#000'
                                                    />
                                                    <path
                                                        d='M12 16.75c-2.62 0-4.75-2.13-4.75-4.75S9.38 7.25 12 7.25s4.75 2.13 4.75 4.75-2.13 4.75-4.75 4.75Zm0-8c-1.79 0-3.25 1.46-3.25 3.25s1.46 3.25 3.25 3.25 3.25-1.46 3.25-3.25S13.79 8.75 12 8.75Z'
                                                        fill='#000'
                                                    />
                                                    <path
                                                        d='M21.17 8.75c-.05 0-.11-.01-.16-.02-2.94-.64-5.91-.64-8.85 0-.41.09-.8-.17-.89-.57-.09-.41.17-.8.57-.89 3.15-.69 6.34-.69 9.49 0 .4.09.66.49.57.89a.74.74 0 0 1-.73.59ZM8.54 14.75c-.21 0-.42-.09-.57-.26a24.762 24.762 0 0 1-4.71-8.12l.69-.31.71-.24.02.06a23.2 23.2 0 0 0 4.43 7.63c.27.31.24.79-.07 1.06-.15.12-.33.18-.5.18ZM10.88 22.69a.746.746 0 0 1-.55-1.25c2-2.2 3.48-4.75 4.4-7.58.13-.39.57-.65.96-.52s.62.51.5.9c-1.01 3.12-2.6 5.86-4.74 8.22-.16.15-.37.23-.57.23Z'
                                                        fill='#000'
                                                    />
                                                </svg>
                                                Sitio web
                                            </p>
                                        </a>
                                    </ScrollChips>
                                ) : <Skeleton className={'md:mt-9'} height={36} borderRadius={9999} />}
                            </div>
                        </div>
                    </section>
                    <section className='h-40 md:hidden flex flex-col gap-1 col-span-6 lg:col-span-2 px-4 md:p-0'>
                        <h3 className='text-black font-semibold text-xs md:hidden'>{data?.description ? 'Ubicación:' : <Skeleton width={130} />}</h3>
                        {data
                            ? <Map
                                bounds={bounds}
                                marker={marker}
                                className='h-full rounded-2xl md:rounded-3xl z-10'
                            />
                            : <>
                                <div className={'hidden lg:flex'}>
                                    <Skeleton height={325} containerClassName={'skeleton-container'} borderRadius={'1.5rem'} inline={true} />
                                </div>
                                <div className={'lg:hidden'}>
                                    <Skeleton height={170} containerClassName={'skeleton-container'} borderRadius={'1rem'} inline={true} />
                                </div>
                            </>}
                    </section>
                    <section className='col-span-6 lg:col-span-2'>
                        <div className='grid row-span-4 h-full px-4 md:px-0 gap-4'>
                            <h1 className='font-bold text-sm md:text-base text-black/60 h-min'>Grado Académico</h1>
                            <div className='flex gap-4 h-min truncate'>
                                <div>
                                    <div className='flex items-center justify-center w-12 h-12 bg-hover rounded-xl'>
                                        <svg
                                            width='30px'
                                            height='30px'
                                            viewBox='0 0 32 32'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <title />
                                            <path d='M11.588,16.369l10.018,10.85a3.869,3.869,0,0,0,2.763,1.271h.1a3.851,3.851,0,0,0,3.846-3.933,3.879,3.879,0,0,0-1.261-2.773L16.2,11.768A7,7,0,0,0,6.493,3.381a1,1,0,0,0-.269,1.607L9.515,8.271,8.1,9.687,4.806,6.4A1,1,0,0,0,3.2,6.676a6.993,6.993,0,0,0,8.389,9.693ZM4.562,8.983l2.832,2.825a1,1,0,0,0,1.413,0l2.83-2.83a1,1,0,0,0,0-1.415L8.8,4.736a5,5,0,0,1,5.308,6.919,1,1,0,0,0,.241,1.129L25.707,23.26a1.853,1.853,0,0,1,.612,1.342,1.827,1.827,0,0,1-.543,1.348l0,0a1.867,1.867,0,0,1-1.353.537,1.844,1.844,0,0,1-1.337-.619L12.6,14.522a1,1,0,0,0-1.131-.24,5,5,0,0,1-6.912-5.3Z' />
                                        </svg>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-around w-full truncate'>
                                    <h1 className='font-bold text-[16px] text-black/60'>Carreras Técnicas</h1>
                                    <span className='font-semibold text-[15px] text-font/70 truncate'>Relacionada con la operación</span>
                                </div>
                            </div>
                            <div className='flex gap-4 h-min truncate'>
                                <div>
                                    <div className='flex items-center justify-center w-12 h-12 bg-hover rounded-xl'>
                                        <svg
                                            width='30px'
                                            height='30px'
                                            viewBox='0 0 32 32'
                                        >
                                            <title />
                                            <path d='M7,26H25a1,1,0,0,0,1-1V19a1,1,0,0,0-1-1H14V7a1,1,0,0,0-1-1H7A1,1,0,0,0,6,7V25A1,1,0,0,0,7,26Zm7-6h2v1a1,1,0,0,0,2,0V20h2v1a1,1,0,0,0,2,0V20h2v4H14ZM8,8h4v2H11a1,1,0,0,0,0,2h1v2H11a1,1,0,0,0,0,2h1v2H8ZM8,20h4v4H8Z' />
                                        </svg>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-around w-full truncate'>
                                    <h1 className='font-bold text-[16px] text-black/60'>Ingenierías</h1>
                                    <span className='font-semibold text-[15px] text-font/70 truncate'>Aplicación de conocimientos científicos</span>
                                </div>
                            </div>
                            <div className='flex gap-4 h-min truncate'>
                                <div>
                                    <div className='flex items-center justify-center w-12 h-12 bg-hover rounded-xl'>
                                        <svg
                                            width='30px'
                                            height='30px'
                                            viewBox='0 0 32 32'
                                        >
                                            <title />
                                            <path d='M21.3,5.54,7.161,19.682c-.01.01-.013.023-.022.033a.99.99,0,0,0-.172.26c-.01.021-.022.041-.03.063s-.013.023-.017.036L4.8,26.437A1,1,0,0,0,6.063,27.7l6.364-2.121c.013,0,.023-.013.036-.017s.041-.02.063-.03a.99.99,0,0,0,.26-.172c.01-.009.023-.012.033-.022L26.96,11.2a4,4,0,0,0,0-5.657A4.1,4.1,0,0,0,21.3,5.54ZM7.328,25.172l.977-2.932,1.955,1.955Zm4.783-1.954L9.282,20.389,21.3,8.368,24.132,11.2ZM25.546,9.783,22.717,6.954a2.048,2.048,0,0,1,2.829,0,2,2,0,0,1,0,2.829ZM21.3,11.2a1,1,0,0,1,0,1.414l-7.778,7.778a1,1,0,0,1-1.414-1.414L19.889,11.2A1,1,0,0,1,21.3,11.2Z' />
                                        </svg>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-around w-full truncate'>
                                    <h1 className='font-bold text-[16px] text-black/60'>Licenciaturas</h1>
                                    <span className='font-semibold text-[15px] text-font/70 truncate'>Grado académico de educación superior</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='grid grid-cols-6 gap-8 mt-4 text-sm md:text-base'>
                    <div className='flex justify-between items-center col-span-6 lg:col-span-4 gap-2 px-4 md:p-0'>
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
                    <h1 className='font-bold text-md md:text-lg text-black/60 hidden xl:flex'>Ubicaciones</h1>
                </div>

                <div className='grid grid-cols-6 gap-8 text-sm md:text-base'>
                    <div className='col-span-6 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-4 md:p-0'>
                        {data ? data.campus.filter(({ region }) => { return selected === 'Todos' ? true : selected === region.name })
                            .map(({ id, name, images, location }) => (
                                <div key={id} className={`rounded-2xl md:rounded-3xl md:h-48 relative border border-gray-100 overflow-hidden`}>
                                    <div className='absolute w-full h-full -z-10'>
                                        {images && images.length
                                            ? <div className='inset-0 absolute -z-10'>
                                                <Image src={images[0] || ''} alt={name} layout={'fill'} objectFit={'cover'} className={'select-none'} />
                                            </div>
                                            : <div className='bg-gray-100 absolute inset-0 -z-10' />}
                                    </div>
                                    <div className='flex items-end h-full'>
                                        <div className={`flex flex-col justify-end md:justify-between h-24 md:h-[75px] w-full text-white bg-black/60 p-4 md:pt-2`}>
                                            <h1 className='text-[14px] font-medium leading-4 line-clamp-1'>{name}</h1>
                                            <div className='flex items-center gap-2'>
                                                <svg className='w-3 h-3' fill='#fff' x='0px' y='0px' viewBox='0 0 512 512'>
                                                    <g>
                                                        <path d='M256,31c-77.7,0-140.6,63-140.6,140.6C115.4,312.2,256,481,256,481s140.6-168.8,140.6-309.4C396.6,94,333.7,31,256,31z
                                                        M256,257.8c-47.6,0-86.1-38.6-86.1-86.1s38.6-86.1,86.1-86.1s86.1,38.6,86.1,86.1S303.6,257.8,256,257.8z M201.5,171.6
                                                        c0-30.1,24.4-54.5,54.5-54.5s54.5,24.4,54.5,54.5c0,30.1-24.4,54.5-54.5,54.5S201.5,201.7,201.5,171.6z'/>
                                                    </g>
                                                </svg>
                                                <span className='text-[13px] leading-4'>{location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <Skeleton className='h-24 md:h-48' inline={true} containerClassName={'skeleton-container'} borderRadius={'1.5rem'} count={4} />}
                    </div>
                    <section className='hidden lg:flex lg:h-full flex-col gap-1 col-span-6 lg:col-span-2 px-4 md:p-0'>
                        <h3 className='text-black font-semibold text-xs md:hidden'>{data?.description ? 'Ubicación:' : <Skeleton width={130} />}</h3>
                        {data
                            ? <Map
                                bounds={bounds}
                                marker={marker}
                                className='min-h-[240px] h-full rounded-2xl md:rounded-3xl z-10'
                            />
                            : <>
                                <div className={'hidden lg:flex'}>
                                    <Skeleton height={240} containerClassName={'skeleton-container'} borderRadius={'1.5rem'} inline={true} />
                                </div>
                                <div className={'lg:hidden'}>
                                    <Skeleton height={170} containerClassName={'skeleton-container'} borderRadius={'1rem'} inline={true} />
                                </div>
                            </>}
                    </section>
                </div>
            </div >
        </Layout >
    )
}
