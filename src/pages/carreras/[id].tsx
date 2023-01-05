import FourOhFour from 'components/404'
import Layout from 'components/layout'
import Map from 'components/map'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { trpc } from 'utils/trpc'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: { id: query.id }
    }
}

export default function CarreraId({ id }: { id: string }) {
    const { data: careerId } = trpc.useQuery(['career.getOne', { id: Number(id) }])
    const { data: university } = trpc.useQuery(['university.getAll', { careerId: careerId?.id }])
    const { data: campus } = trpc.useQuery(['campus.getByCareerId', { careerId: careerId?.id }])

    const bounds = campus?.map(({ latitude, longitude }) => [latitude, longitude]) ?? []
    const marker = campus?.map(({ name, direction, latitude, longitude }) => {
        return {
            title: name,
            subname: direction,
            position: [latitude, longitude]
        }
    }) ?? []

    if (careerId === null) return (
        <FourOhFour
            title='Carrera no encontrada'
            icon='awe'
        >
            Intenta con otra o puedes buscar
            <Link href={'/carreras'}>
                <a className='text-primary font-bold hover:opacity-90 animate-pulse'> aquí </a>
            </Link>
            todas las carreras
        </FourOhFour>
    )
    return (
        <Layout title={`Buu – ${careerId?.name || 'Carreras'}`}>
            <div className='flex flex-col pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <div className='flex flex-col gap-1'>
                    <h1 className='font-bold text-xl md:text-2xl mt-4'>{careerId?.name || <Skeleton />}</h1>
                    <p className='text-font text-sm'>{careerId?.area || <Skeleton />}</p>
                </div>
                <div className='grid grid-cols-10 gap-16 text-[#717171]'>
                    <div className='col-span-6'>
                        <section className=' border-b border-[#dddddd] py-8'>
                            <h2 className='text-black font-semibold text-lg mb-1'>{careerId ? 'Descripción' : <Skeleton />}</h2>
                            <p className='text-sm font-light'>{
                                careerId
                                    ? careerId.description && careerId.description?.length > 0
                                        ? careerId?.description
                                        : 'No hay descripción disponible'
                                    : <Skeleton count={3} />}</p>
                        </section>
                        <section className='col-span-5 border-b border-[#dddddd] py-10'>
                            <h2 className='text-black font-semibold text-lg mb-5'>{careerId ? 'Dónde puedes estudiar' : <Skeleton />}</h2>
                            <div className='grid grid-cols-3 gap-4'>
                                {id && university ? university?.map(({ id, name, subname, logo, location }) => (
                                    <Link key={id} href={`/universidades/${subname?.toLocaleLowerCase()}`}>
                                        <a>
                                            <div className='col-span-1 px-5 py-4 border rounded-lg flex flex-col gap-4 hover:bg-hover transition-colors'>
                                                <div className='w-10 h-10 relative'>
                                                    <Image src={logo} alt={name} objectFit={'contain'} layout={'fill'} />
                                                </div>
                                                <div className='flex flex-col justify-between gap-1'>
                                                    <h3 className='text-black font-semibold leading-4 line-clamp-2 text-sm'>{name}</h3>
                                                    <p className='text-[16px] font-light'>{location}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                )) : <Skeleton height={171} borderRadius={'0.5rem'} inline={true} containerClassName={'skeleton-container'} count={3} />}
                            </div>
                        </section>
                    </div>
                    <section className='col-span-4 border-b border-[#dddddd] py-10'>
                        <div className='px-8 py-2 border h-full rounded-lg'>
                            <h2 className='text-black font-semibold text-lg mb-5'>{careerId ? '' : <Skeleton />}</h2>
                            {careerId?.careers.map((career) => (
                                <div key={career.id} className='flex flex-col'>
                                    <h3 className='text-black font-semibold text-sm'>{career.universityName}</h3>
                                    <div className='flex gap-1 flex-wrap py-5'>
                                        <p className='text-[16px] font-normal bg-gray-100 hover:bg-hover px-2 rounded-md'>{career.duration}</p>
                                        <p className='text-[16px] font-normal bg-gray-100 hover:bg-hover px-2 rounded-md'>{career.period}</p>
                                        <p className='text-[16px] font-normal bg-gray-100 hover:bg-hover px-2 rounded-md'>{career.modality}</p>
                                        <p className='text-[16px] font-normal bg-gray-100 hover:bg-hover px-2 rounded-md'>{career.level}</p>
                                        <p className='text-[16px] font-normal bg-gray-100 hover:bg-hover px-2 rounded-md'>{career.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <section className='border-b border-[#dddddd] py-10'>
                    <h2 className='text-black font-semibold text-lg mb-5'>{careerId ? 'Dónde vas a estudiar' : <Skeleton />}</h2>
                    {id && bounds.length > 0 && marker.length > 0
                        ? <Map
                            bounds={bounds}
                            marker={marker}
                            className='h-44 lg:h-96 rounded-2xl md:rounded-3xl z-10'
                        />
                        : <>
                            <div className={'hidden lg:flex'}>
                                <Skeleton height={480} containerClassName={'skeleton-container'} borderRadius={'1.5rem'} inline={true} />
                            </div>
                            <div className={'lg:hidden'}>
                                <Skeleton height={170} containerClassName={'skeleton-container'} borderRadius={'1rem'} inline={true} />
                            </div>
                        </>}
                </section>
            </div>
        </Layout >
    )
}