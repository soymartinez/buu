import { GetServerSideProps } from 'next'
import Layout from 'components/layout'
import { trpc } from 'utils/trpc'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: { id: query.id }
    }
}

export default function Universidad({ id }: { id: string }) {
    const { data, isLoading, isError } = trpc.useQuery(['university.getOne', {
        text: id
    }])

    if (!data || isLoading) return <div>loading...</div>
    if (isError) return <div>error</div>
    
    return (
        <Layout title={`Buu – ${id?.toLocaleString().toUpperCase()}`}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4 uppercase'>{id}</h1>
            </div>
        </Layout>
    )
}
