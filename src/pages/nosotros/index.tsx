import Layout from 'components/layout'
import Logo from 'components/logo'

export default function Nosotros() {
    return (
        <Layout title='Buu – Nosotros'>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Nosotros</h1>
                <section className='grid place-content-center'>
                    <div className='flex flex-col justify-center items-center -space-y-5 py-12'>
                        <Logo className={'w-28 md:w-32'} fill={'#2524D1'} />
                        <p className='text-font md:text-xl'><strong>bu</strong>scador de <strong>u</strong>niversidades</p>
                    </div>
                    <p className='text-font md:text-lg font-light md:px-10 lg:px-24 xl:px-32 leading-6'>Nosotros te ayudamos a tomar la mejor desición de tu futuro. En <strong className='text-primary font-bold'>buu</strong> puedes encontrar toda la informacion de las
                        universidades, regiones, campus y carreras que nuestro <strong className='text-primary font-bold'>equipo buu</strong> a listado. Nuestro objetivo es centrar toda la información de las
                        universidades en un solo sitio, para que no busques en muchos lados.</p>
                </section>
            </div>
        </Layout>
    )
}
