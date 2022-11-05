import { Type } from '@prisma/client'
import Layout from 'components/layout'
import { FormEvent, useState } from 'react'
import { trpc } from 'utils/trpc'

export default function Admin() {
    const { data: regions } = trpc.useQuery(['region.getAll'])
    const { mutate: universityCreate } = trpc.useMutation(['university.create'])
    const { mutate: regionCreate } = trpc.useMutation(['region.create'])

    const [status, setStatus] = useState('universidad')

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

    return (
        <Layout title={'Buu – Administrador'}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Administrador</h1>
                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold text-lg md:text-xl text-end'>Nueva {status}</h2>
                    {status === 'universidad' && (
                        <form onSubmit={(e) => handleSaveUniversity(e)} className='flex flex-col gap-1'>
                            <div className='grid md:grid-cols-2 gap-2'>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-sm font-bold'>Nombre</span>
                                    <input type={'text'} required name={'name'} className='border border-gray-300 rounded-md px-2 py-1' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-sm font-bold'>Subnombre <span className='text-xs text-font'>(opcional)</span></span>
                                    <input type={'text'} name={'subname'} className='border border-gray-300 rounded-md px-2 py-1' />
                                </div>
                            </div>

                            <span className='text-sm font-bold'>Logo</span>
                            <input type={'text'} required name={'logo'} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>URL <span className='text-xs text-font'>(opcional)</span></span>
                            <input type={'url'} name={'url'} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>Descripción <span className='text-xs text-font'>(opcional)</span></span>
                            <textarea rows={3} name={'description'} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>Localidad</span>
                            <input type={'text'} required name={'location'} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>Ranking <span className='text-xs text-font'>(opcional)</span></span>
                            <input type={'number'} name={'ranking'} defaultValue={0} min={0} max={100} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>Tipo</span>
                            <select required name={'type'} className='border border-gray-300 rounded-md px-2 py-1'>
                                <option value={Type.Publica}>Pública</option>
                                <option value={Type.Privada}>Privada</option>
                            </select>

                            <button className='bg-primary text-white font-bold rounded-full w-min px-4 mt-2' type={'submit'}>Guardar</button>
                        </form>
                    )}
                    {status === 'region' && (
                        <>
                            <form onSubmit={(e) => handleSaveRegion(e)} className='flex flex-col gap-1'>
                                <span className='text-sm font-bold'>Nombre</span>
                                <input type={'text'} required name={'name'} className='border border-gray-300 rounded-md px-2 py-1' />

                                <div className='flex gap-2 mt-2'>
                                    <button className='bg-primary text-white font-bold rounded-full w-min px-4' onClick={() => setStatus('universidad')} type={'button'}>Regresar</button>
                                    <button className='bg-primary text-white font-bold rounded-full w-min px-4' type={'submit'}>Guardar</button>
                                </div>
                            </form>
                            <div>
                                <h3 className='font-bold text-lg md:text-xl text-end'>Regiones</h3>
                                <div className='flex flex-col gap-2'>
                                    {regions?.map((region) => (
                                        <div key={region.id} className='flex flex-col gap-1'>
                                            <span className='text-sm font-bold'>{region.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    )
}
