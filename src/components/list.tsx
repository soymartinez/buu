import Link from 'next/link'
import { University } from '@prisma/client'
import { trpc } from 'utils/trpc'
import Card from './card'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/router'

export default function List({
    search = '',
    chips = [],
    filter = {},
}: {
    search?: string,
    chips?: string[],
    filter?: object,
}) {
    const { asPath } = useRouter()
    const { data } = trpc.useQuery(['university.get', {
        take: asPath === '/' ? 5 : undefined,
        name: search,
        chips: chips,
        filter: filter,
    }])
    return (
        <div className='flex flex-col gap-4 lg:gap-2 w-full'>
            {asPath === '/' && <h1 className='text-md font-bold bg-white mt-3 leading-none lg:hidden'>Populares</h1>}
            {data
                ? data.length > 0
                    ? data?.map((item: University, index: number) => (
                        <Link href={`/universidades/${item.subname?.toLocaleLowerCase()}`} key={index}>
                            <a>
                                <Card {...item} />
                            </a>
                        </Link>))
                    : <p className='text-font text-sm w-full'>
                        Ninguna universidad encontrada con los filtros seleccionados
                    </p>
                :
                [0, 1, 2, 3, 4].map((_, index) => (
                    <div key={index} className='flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 
                    border md:border-none border-secondary transition-colors rounded-xl'>
                        <div className='flex items-center gap-4'>
                            <Skeleton containerClassName={'skeleton-container'} height={50} width={50} inline={true} />
                            <div className='flex flex-col'>
                                <h1 className='text-base md:text-sm font-bold leading-none'>{<Skeleton width={200} />}</h1>
                                <p className='text-[14px] text-font font-medium'>{<Skeleton width={50} />}</p>
                            </div>
                        </div>
                        <h2 className='text-[16px] md:text-sm font-semibold md:font-bold'>{<Skeleton width={100} />}</h2>
                    </div>
                ))
            }
        </div>
    )
}
