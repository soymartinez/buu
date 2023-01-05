import CardCareer from 'components/cardCareer'
import Layout from 'components/layout'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { Normalize } from 'utils/normalize'
import { trpc } from 'utils/trpc'

export default function Carreras() {
    const { data } = trpc.useQuery(['career.getAllCareers'])
    return (
        <Layout title='Buu – Carreras'>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Carreras</h1>
                <div className='flex flex-col gap-2 font-semibold md:font-bold'>
                    {data ? data?.map((career) => (
                        <Link key={career.id} href={`/carreras/${Normalize(`${career.id}`)}`}>
                            <a>
                                <CardCareer {...career} />
                            </a>
                        </Link>
                    )) : (
                        [0, 1, 2, 3, 4].map((_, index) => (
                            <div key={index} className='grid md:grid-cols-6 md:items-center justify-between gap-4 p-3 
                                            border md:border-none border-secondary bg-white hover:bg-hover transition-colors rounded-xl overflow-hidden'>
                                <div className='md:col-span-3 flex items-center gap-4'>
                                    <div className='flex flex-col w-full md:truncate'>
                                        <h1 className='text-base md:text-sm font-bold leading-none md:truncate'>{<Skeleton />}</h1>
                                    </div>
                                </div>
                                <div className='sm:col-start-2 md:col-span-2 flex sm:items-center sm:row-span-2 md:row-auto'>
                                    <p className={`text-black px-2 py-[3px] rounded-md text-[14px] font-medium`}><Skeleton width={100} /></p>
                                    <p className={`text-black px-2 py-[3px] rounded-md text-[14px] font-medium`}><Skeleton width={100} /></p>
                                </div>
                                <h2 className='md:col-span-1 text-xs font-normal line-clamp-3 text-font'>{<Skeleton />}</h2>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    )
}
