import { Type } from '@prisma/client'
import Layout from 'components/layout'
import { FormEvent, useState } from 'react'
import { trpc } from 'utils/trpc'

export default function Admin() {
    const { data: universities } = trpc.useQuery(['university.getAll'])
    const { data: regions } = trpc.useQuery(['region.getAll'])
    const { data: campus } = trpc.useQuery(['campus.getAll'])
    const { data: carrers } = trpc.useQuery(['carrer.getAll'])

    const { mutate: universityCreate } = trpc.useMutation(['university.create'])
    const { mutate: regionCreate } = trpc.useMutation(['region.create'])

    const [status, setStatus] = useState('universidades')

    const handleSaveUniversity = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())
        // universityCreate({
        //     name: data.name as string,
        //     subname: data.subname as string,
        //     logo: data.logo as string,
        //     url: data.url as string,
        //     description: data.description as string,
        //     location: data.location as string,
        //     ranking: Number(data.ranking),
        //     type: data.type as Type,
        // }, {
        //     onSuccess() {
        //         setStatus('region')
        //     },
        // })
        setStatus('region')
    }

    const handleSaveRegion = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())
        // regionCreate({
        //     name: data.name as string,
        // }, {
        //     onSuccess() {
        //         setStatus('carrer')
        //     },
        // })
        setStatus('carrera')
    }

    const menu = [
        { name: 'universidades', count: universities?.length },
        { name: 'regiones', count: regions?.length },
        { name: 'campus', count: campus?.length },
        { name: 'carreras', count: carrers?.length },
    ]

    return (
        <Layout title={'Buu – Administrador'}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Administrador</h1>
                <section className='grid gap-2'>
                    <div className='flex items-center gap-1 sm:gap-6 bg-[#ececec] rounded-xl px-2 overflow-x-auto'>
                        {menu.map(({ name, count }) => (
                            <>
                                <div key={name} className={`flex md:flex-row items-center justify-between font-bold gap-2 py-2 px-1 md:px-3 transition-colors cursor-pointer 
                                    ${status === name ? 'text-primary hover:text-primary/70' : 'text-font hover:text-font/70'}`} onClick={() => setStatus(name)}>
                                    <h2 className='text-xs capitalize'>{name}</h2>
                                    <div className={`grid place-content-center rounded-full w-6 h-6 ${status === name ? 'bg-primary/20' : 'bg-[#d9d9d9]'}`}>
                                        <h1 className='text-[13px]'>{count}</h1>
                                    </div>
                                </div>
                                <span className='w-[2px] h-5 bg-[#d9d9d9] last:hidden' />
                            </>
                        ))}
                    </div>
                    <div onClick={() => setStatus(status.length > 0 ? '' : 'universidades')}
                        className={`flex gap-3 px-3 md:px-5 py-2 font-semibold text-font hover:opacity-70 cursor-pointer`}>
                        <div className='flex justify-center items-center relative'>
                            <div className='w-[12px] h-[2px] rounded-full bg-font' />
                            <div className='absolute w-[12px] h-[2px] rounded-full bg-font rotate-90' />
                        </div>
                        <h2 className='text-xs select-none'>Agregar <span className='lowercase'>universidad</span></h2>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
