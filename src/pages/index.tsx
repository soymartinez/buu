import Layout from 'components/layout'
import Header from 'components/header'
import List from 'components/list'
import Filter from 'components/filter'

export default function Home() {
  return (
    <Layout title='SIUM'>
      <Header />
      <section className='flex flex-col gap-4'>
        <Filter />
        <List />
      </section>
    </Layout>
  )
}
