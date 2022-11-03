import { Type } from '@prisma/client'
import Layout from 'components/layout'
import { FormEvent, useState } from 'react'
import { trpc } from 'utils/trpc'

export default function Admin() {
    const { data: region } = trpc.useQuery(['region.getAll'])
    const { mutate } = trpc.useMutation(['university.create'])

    const [status, setStatus] = useState('universidad')

    const handleSaveUniversity = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())
        mutate({
            name: data.name as string,
            subname: data.subname as string,
            logo: data.logo as string,
            url: data.url as string,
            description: data.description as string,
            location: data.location as string,
            ranking: Number(data.ranking),
            type: data.type as Type,
        }, {
            onSuccess() {
                setStatus('region')
            },
        })
    }

    return (
        <Layout title={'Buu – Administrador'}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Administrador</h1>
                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold text-lg md:text-xl text-end'>Nueva {status}</h2>
                    {status === 'universidad' && (
                        <form onSubmit={(e) => handleSaveUniversity(e)} className='flex flex-col gap-1'>
                            <div className='grid grid-cols-2 gap-1'>
                                <span className='text-sm font-bold'>Nombre</span>
                                <span className='text-sm font-bold'>Subnombre</span>
                                <input type={'text'} required name={'name'} className='border border-gray-300 rounded-md px-2 py-1' />
                                <input type={'text'} required name={'subname'} className='border border-gray-300 rounded-md px-2 py-1' />
                            </div>

                            <span className='text-sm font-bold'>Logo</span>
                            <input type={'text'} required name={'logo'} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>URL</span>
                            <input type={'url'} name={'url'} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>Descripción</span>
                            <textarea rows={3} name={'description'} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>Localidad</span>
                            <input type={'text'} required name={'location'} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>Ranking</span>
                            <input type={'number'} name={'ranking'} min={1} max={100} className='border border-gray-300 rounded-md px-2 py-1' />

                            <span className='text-sm font-bold'>Tipo</span>
                            <select required name={'type'} className='border border-gray-300 rounded-md px-2 py-1'>
                                <option value={Type.Publica}>Pública</option>
                                <option value={Type.Privada}>Privada</option>
                            </select>

                            <span className='text-sm font-bold'>Region</span>
                            <select required name={'region'} className='border border-gray-300 rounded-md px-2 py-1'>
                                {region && region.map(({ id, name }) => (
                                    <option key={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>

                            <button className='bg-primary text-white font-bold rounded-full w-min px-4 self-center' type={'submit'}>Guardar</button>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    )
}
