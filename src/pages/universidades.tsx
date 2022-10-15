
import List from 'components/list'
import Layout from 'components/layout'

export default function Universidades() {
    return (
        <Layout title='Buu – Universidades'>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Universidades</h1>
                <List />
            </div>
        </Layout>
    )
}
