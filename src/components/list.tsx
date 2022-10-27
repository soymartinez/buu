import Link from 'next/link'
import { University } from 'pages/api/universidades'
import { trpc } from 'utils/trpc'
import Card from './card'

export default function List() {
    const { data, isLoading } = trpc.useQuery(['university.getAll'])
    if (!data || isLoading) return <div>Loading...</div>

    return (
        <div className='flex flex-col gap-2'>
            {data.map((item: University, index: number) => (
                <Link href={`/universidades/${item.subname?.toLocaleLowerCase()}`} key={index}>
                    <a>
                        <Card {...item} />
                    </a>
                </Link>
            ))}
        </div>
    )
}
