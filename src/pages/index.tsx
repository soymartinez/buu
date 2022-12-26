import Layout from 'components/layout'
import Header from 'components/header'
import List from 'components/list'
import Chips from 'components/chips'
import Filter from 'components/filter'
import { useState } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')
  const [chips, setChips] = useState([])
  const [filter, setFilter] = useState({})
  return (
    <Layout title='Buu – Encuentra la mejor universidad para ti'>
      <Header setSearch={setSearch} />
      <Chips setChips={setChips} />
      <section className='flex gap-4 px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
        <Filter setFilter={setFilter} />
        <List search={search} chips={chips} filter={filter} />
      </section>
    </Layout>
  )
}
