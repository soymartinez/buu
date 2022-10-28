import Link from 'next/link'
import { University } from '@prisma/client'
import { trpc } from 'utils/trpc'
import Card from './card'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function List() {
    const { data } = trpc.useQuery(['university.getAll'])
    return (
        <div className='flex flex-col gap-2'>
            {data ? data?.map((item: University, index: number) => (
                <Link href={`/universidades/${item.subname?.toLocaleLowerCase()}`} key={index}>
                    <a>
                        <Card {...item} />
                    </a>
                </Link>
            )) : <Skeleton height={80} count={5} containerClassName={'skeleton-container'} baseColor={'#edefef'} borderRadius={'0.75rem'} inline={true} />}
        </div>
    )
}
