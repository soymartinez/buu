import { GetServerSideProps } from 'next'
import Layout from 'components/layout'
import { trpc } from 'utils/trpc'
import Image from 'next/image'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: { id: query.id }
    }
}

export default function Universidad({ id }: { id: string }) {
    const { data, isLoading } = trpc.useQuery(['university.getOneBySubname', {
        text: id
    }])

    return (
        <Layout title={`Buu – ${id?.toLocaleString().toUpperCase()}`}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                {data && (
                    <>
                        <h1 className='font-bold text-xl md:text-2xl mt-4'>{data.name}</h1>
                        <p className='text-sm md:text-base'>{data.subname}</p>
                        <Image src={data.logo} alt={data.name} width={200} height={200} objectFit={'contain'} />
                        <div>
                            <a href={data.url || ''} target={'_blank'} rel={'noreferrer'} className='text-sm md:text-base'>{data.url}</a>
                            <p className='text-sm md:text-base'>{data.description}</p>
                            <p className='text-sm md:text-base'>{data.type}</p>
                            <p className='text-sm md:text-base'>{data.ranking}</p>
                            <p className='text-sm md:text-base'>{data.location}</p>
                            <p className='text-sm md:text-base'>{data.country}</p>
                        </div>
                        <div>
                            <p className='text-sm md:text-base font-bold'>Regiones</p>
                            <ul>
                                {data.regions.map((region) => (
                                    <>
                                        <li key={region.id}>{region.name}</li>
                                        <ul>
                                            {region.campus.map((campus) => {
                                                return (
                                                    <li className='list-disc list-inside' key={campus.id}>{campus.name}</li>
                                                )
                                            })}
                                        </ul>
                                    </>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
                {isLoading && <p>Loading...</p>}
            </div>
        </Layout>
    )
}
