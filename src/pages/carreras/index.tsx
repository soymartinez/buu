import Layout from 'components/layout'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import { trpc } from 'utils/trpc'

export default function Carreras() {
    const { data } = trpc.useQuery(['career.getAll'])
    return (
        <Layout title='Buu – Carreras'>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Carreras</h1>
                <div className='flex flex-col gap-2'>
                    {data ? data?.map((carrer) => (
                        <div key={carrer.id} className='flex md:flex-row md:items-center justify-between gap-4 p-3 
                            border md:border-none border-secondary hover:bg-hover transition-colors rounded-xl'>
                            <div>
                                <h2 className='text-base md:text-sm font-semibold md:font-bold'>{carrer.name}</h2>
                                <div className='flex gap-4'>
                                    <p className='text-[14px] md:text-xs text-font'>{carrer.modality}</p>
                                    <p className='text-[14px] md:text-xs text-font'>{carrer.semesters} semestres</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='grid place-content-center w-10 h-10 relative'>
                                    <Image src={carrer.university.logo} alt={carrer.name} layout={'fill'} objectFit={'contain'} />
                                </div>
                                <div className='hidden md:flex flex-col'>
                                    <h1 className='text-[16px] md:text-sm font-semibold md:font-bold leading-none'>{carrer.campus.name}</h1>
                                    <p className='text-[14px] text-font font-medium'>{carrer.university.name}</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className='flex md:flex-row md:items-center justify-between gap-4 p-3 
                            border md:border-none border-secondary transition-colors rounded-xl'>
                            <div>
                                <h2 className='text-base md:text-sm font-semibold md:font-bold'><Skeleton width={200} /></h2>
                                <div className='flex gap-3 md:gap-4'>
                                    <p className='text-[14px] md:text-xs text-font'>{<Skeleton width={75} />}</p>
                                    <p className='text-[14px] md:text-xs text-font'>{<Skeleton width={100} />}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <Skeleton width={50} height={50} containerClassName={'skeleton-container'} inline={true} />
                                <div className='hidden md:flex flex-col'>
                                    <h1 className='text-[16px] md:text-sm font-semibold md:font-bold leading-none'>{<Skeleton width={300} />}</h1>
                                    <p className='text-[14px] text-font font-medium'>{<Skeleton width={100} />}</p>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        </Layout>
    )
}
