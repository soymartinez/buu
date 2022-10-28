import Layout from 'components/layout'
import { trpc } from 'utils/trpc'

export default function Carreras() {
    const { data } = trpc.useQuery(['carrer.getAll'])
    return (
        <Layout title='Buu – Universidades'>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Carreras</h1>
                {data && data?.map((carrer) => (
                    <div>
                        {carrer.name}
                    </div>
                ))}
            </div>
        </Layout>
    )
}
