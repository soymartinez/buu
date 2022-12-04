import { GetServerSideProps } from 'next'
import Layout from 'components/layout'
import { trpc } from 'utils/trpc'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: { id: query.id }
    }
}

export default function Universidad({ id }: { id: string }) {
    const { data } = trpc.useQuery(['university.getOneBySubname', { text: id }])

    const tags = 'text-xs md:text-sm bg-primary hover:bg-opacity-95 whitespace-nowrap text-white rounded-full w-min px-4 py-1 font-bold'

    return (
        <Layout title={`Buu – ${id?.toLocaleString().toUpperCase()}`}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <div className='grid grid-cols-6 mt-4 gap-8'>
                    <section className='col-span-4 rounded-3xl bg-gray-100 px-10 py-8'>
                        <div className='flex justify-between mb-4'>
                            <div className='w-full'>
                                <h1 className='font-bold text-xl md:text-2xl min-w-full'>{data?.name || <Skeleton width={'50%'} />}</h1>
                                <p className='text-sm md:text-base font-medium'>{data?.subname || <Skeleton width={80} />}</p>
                            </div>
                            <div>
                                {data ? <Image src={data?.logo} alt={data?.name} width={70} height={70} objectFit={'contain'} />
                                    : <Skeleton width={70} height={70} />}
                            </div>
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
                            ) : <Skeleton width={300} height={30} borderRadius={50} />}
                        </div>
                    </section>
                    <section className='col-span-2 flex flex-col gap-4'>
                        <h1 className='font-bold text-md md:text-lg text-black/60 mb-2'>Ubicación</h1>
                        <div className='flex gap-4'>
                            <div className='rounded-lg bg-gray-100 w-10 h-10'></div>
                            <div>
                                <h2 className='text-sm text-font font-bold'>Lorem ipsum</h2>
                                <span className='text-xs text-font'>Lorem ipsum dolor sit amet consectetur</span>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='rounded-lg bg-gray-100 w-10 h-10'></div>
                            <div>
                                <h2 className='text-sm text-font font-bold'>Lorem ipsum</h2>
                                <span className='text-xs text-font'>Lorem ipsum dolor sit</span>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='rounded-lg bg-gray-100 w-10 h-10'></div>
                            <div>
                                <h2 className='text-sm text-font font-bold'>Lorem ipsum</h2>
                                <span className='text-xs text-font'>Lorem ipsum dolor sit amet</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='mt-4 text-sm md:text-base'>
                    <h1 className='font-bold text-md md:text-lg text-black/60 mb-2'>Campus</h1>
                    {data ? data.campus.map(({ id, name, subname, direction, contact, universityId, location }) => (
                        <div key={id} className='rounded-3xl bg-gray-100 px-2 py-8'>
                            {name}
                            <div className='font-medium'>
                                <span>Dirección: {direction}</span>
                                <span>{contact}</span>
                            </div>
                        </div>
                    )) : <Skeleton width={'15%'} />}
                </div>
            </div >
        </Layout >
    )
}
