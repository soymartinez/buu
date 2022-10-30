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

    const tags = 'text-xs md:text-sm bg-primary hover:bg-opacity-95 text-white rounded-full w-min px-4 py-1 font-bold'

    return (
        <Layout title={`Buu – ${id?.toLocaleString().toUpperCase()}`}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                {(
                    <>
                        <h1 className='font-bold text-xl md:text-2xl mt-4 min-w-full'>{data?.name || <Skeleton width={'50%'} />}</h1>
                        <p className='text-sm md:text-base font-medium'>{data?.subname || <Skeleton width={80} />}</p>
                        <div>
                            {data ?
                                <Image src={data?.logo} alt={data?.name} width={200} height={200} objectFit={'contain'} />
                                : <Skeleton width={200} height={200} />
                            }
                        </div>
                        <div className='grid gap-3 text-sm md:text-base'>
                            <a href={data?.url || ''} target={'_blank'} rel={'noreferrer'}>
                                <h1 className='underline text-primary hover:opacity-95'>
                                    {data?.url || <Skeleton width={150} />}
                                </h1>
                            </a>
                            {data?.description && <p className=''>{data?.description}</p>}
                            <div className='flex gap-1 flex-wrap'>
                                {data ? (
                                    <>
                                        <p className={tags}>{data?.type}</p>
                                        <p className={tags}>{data?.ranking}</p>
                                        <p className={tags}>{data?.location}</p>
                                        <p className={tags}>{data?.country}</p>
                                    </>
                                ) : <Skeleton width={300} height={30} borderRadius={50} />}
                            </div>
                        </div>
                        <div className='text-sm md:text-base'>
                            <p className='font-bold'>{data ? 'Regiones' : <Skeleton width={95} />}</p>
                            {data ? data.regions.map((region) => (
                                <div key={region.id}>
                                    {region.name}
                                    <ul>
                                        {region.campus.map((campus) => (
                                            <li className='list-disc list-inside' key={campus.id}>{campus.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )) : <Skeleton width={'15%'} />}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    )
}
