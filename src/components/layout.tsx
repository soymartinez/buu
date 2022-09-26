import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Sistema de Información de las Universidades de México' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container mx-auto px-4'>{children}</main>
    </div>
  )
}
