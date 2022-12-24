import Layout from 'components/layout'
import Header from 'components/header'
import List from 'components/list'
import Chips from 'components/chips'
import Filter from 'components/filter'

export default function Home() {
  return (
    <Layout title='Buu – Encuentra la mejor universidad para ti'>
      <Header />
      <Chips />
      <section className='flex gap-4 px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
        <Filter />
        <List />
      </section>
    </Layout>
  )
}
