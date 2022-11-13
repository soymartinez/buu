import { Type } from '@prisma/client'
import Layout from 'components/layout'
import { NextApiRequest, NextApiResponse } from 'next'
import Image from 'next/image'
import { FormEvent, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { getServerAuthSession } from 'server/common/get-server-auth-session'
import { trpc } from 'utils/trpc'

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    const session = await getServerAuthSession({ req, res })
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    } else if (session.user?.role !== 'ADMIN') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return { props: { session } }
}

export default function Admin() {
    const { data: universities } = trpc.useQuery(['university.getAll'])
    const { data: regions } = trpc.useQuery(['region.getAll'])
    const { data: campus } = trpc.useQuery(['campus.getAll'])
    const { data: carrers } = trpc.useQuery(['carrer.getAll'])

    const { mutate: universityCreate } = trpc.useMutation(['university.create'])
    const { mutate: regionCreate } = trpc.useMutation(['region.create'])

    const [status, setStatus] = useState('universidad')
    const [modal, setModal] = useState(false)
    const [file, setFile] = useState('')

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

    const handleFile = (e: any) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            setFile(URL.createObjectURL(file))
        }
    }

    const menu = [
        { name: 'universidades', active: 'universidad', count: universities?.length },
        { name: 'regiones', active: 'región', count: regions?.length },
        { name: 'campus', active: 'campus', count: campus?.length },
        { name: 'carreras', active: 'carrera', count: carrers?.length },
    ]

    return (
        <Layout title={'Buu – Administrador'}>
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Administrador</h1>
                <section className='grid gap-4'>
                    <div className='flex items-center gap-1 sm:gap-6 bg-[#ececec] rounded-xl px-2 overflow-x-auto'>
                        {menu.map(({ name, active, count }) => (
                            <div key={name} onClick={() => { setStatus(active); setModal(false) }}>
                                <div className={`flex md:flex-row items-center justify-between font-bold gap-2 py-2 px-1 md:px-3 transition-colors cursor-pointer 
                                    ${status === active ? 'text-primary' : 'text-font hover:text-font/70'}`}>
                                    <h2 className='text-xs capitalize'>{name}</h2>
                                    {count ?
                                        <div className={`grid place-content-center rounded-full w-6 h-6 ${status === active ? 'bg-primary/20' : 'bg-[#d9d9d9]'}`}>
                                            <h1 className='text-[13px]'>{count}</h1>
                                        </div>
                                        : <Skeleton circle={true} baseColor={'#d9d9d9'} width={30} containerClassName={'skeleton-container'} inline={true} height={30} />}
                                </div>
                                <span className='w-[2px] h-5 bg-[#d9d9d9] last:hidden' />
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col gap-4 lg:flex-row lg:items-center justify-between'>
                        <div onClick={() => setModal(!modal)}
                            className={`flex gap-3 px-3 md:px-5 py-2 w-min font-semibold text-font hover:opacity-70 cursor-pointer ml-auto lg:m-0`}>
                            <div className='flex justify-center items-center relative'>
                                <div className='w-[12px] h-[2px] rounded-full bg-font' />
                                <div className='absolute w-[12px] h-[2px] rounded-full bg-font rotate-90' />
                            </div>
                            <h2 className='text-xs select-none whitespace-nowrap'>Agregar <span className='lowercase'>{status}</span></h2>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='flex items-center w-full'>
                                <label className='sr-only'>Buscar</label>
                                <div className='relative w-full'>
                                    <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                                        <svg className='w-5 h-5 text-font' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path></svg>
                                    </div>
                                    <input type='text' id='table-search' className='placeholder:text-font block p-2 pl-10 w-full lg:w-80 text-xs rounded-lg border' placeholder='Buscar por nombre' />
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <select className='border rounded-lg text-xs text-font px-2 py-2'>
                                    <option className='py-2' value={''}>Ascendente</option>
                                    <option className='py-2' value={''}>Descendente</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {modal && status === 'universidad' && (
                    <div className='absolute inset-0 bg-white/90 z-50 flex justify-center gap-4 py-[70px] md:py-[80px] px-4 md:px-8 w-full max-w-[1280px] mx-auto'>
                        <form onSubmit={(e) => handleSaveUniversity(e)} className='flex flex-col gap-1 w-full h-min md:w-auto bg-white p-4 border rounded-xl'>
                            <h1 className='font-bold text-xl text-primary md:text-2xl'>Agregar universidad</h1>
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
                            <div className='grid grid-cols-2 gap-4'>
                                <label htmlFor='logo' className='grid place-content-center cursor-pointer hover:bg-hover border rounded-md h-20'>
                                    <span className='text-sm'>Seleccionar archivo</span>
                                </label>
                                <div className='relative'>
                                    {file && (
                                        <Image src={file} alt={'upload'} objectFit={'contain'} layout={'fill'} />
                                    )}
                                </div>
                            </div>
                            <input type={'file'} required id={'logo'} accept={'image/png, image/jpeg'} onChange={handleFile} name={'logo'} className={'sr-only relative left-14'} />

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

                            <div className='flex gap-2'>
                                <button className='bg-primary hover:opacity-90 text-white font-bold rounded-full w-min px-4 mt-2' type={'submit'}>Guardar</button>
                                <button className='bg-white hover:opacity-80 text-back border font-bold rounded-full w-min px-4 mt-2' onClick={() => {setModal(false); setFile('')}} >Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}

                {status === 'universidad' && (
                    <section className='rounded-xl overflow-x-auto'>
                        <table className='table-auto text-font text-xs w-full'>
                            <thead className='bg-primary text-white'>
                                <tr className='text-left'>
                                    <th className='py-3 px-4'>Id</th>
                                    <th className='py-3 px-4'>Nombre</th>
                                    <th className='py-3 px-4'>Localidad</th>
                                    <th className='py-3 px-4'>Ranking</th>
                                    <th className='py-3 px-4'>Tipo</th>
                                    <th className='py-3 px-4'>URL</th>
                                    <th className='py-3 px-4'>Descripción</th>
                                    <th className='py-3 px-4'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universities && universities.map(({ id, name, subname, logo, url, description, location, ranking, type }, index) => (
                                    <tr key={id} className='hover:bg-hover font-semibold'>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{index + 1}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex gap-4'>
                                                <div className='grid place-content-center w-8 h-8 relative'>
                                                    <Image src={logo} alt={name} layout={'fill'} objectFit={'contain'} />
                                                </div>
                                                <div className='flex flex-col justify-center gap-0'>
                                                    <h2 className='text-black text-xs font-bold leading-none whitespace-nowrap'>{name}</h2>
                                                    <h3 className='text-[14px] text-font font-medium'>{subname}</h3>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{location}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{ranking}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{type}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{url}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{description}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex gap-6'>
                                                <button className='font-bold w-min text-primary hover:opacity-80' type={'button'}>Editar</button>
                                                <button className='font-bold w-min text-[#ff0000] hover:opacity-80' type={'button'}>Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {status === 'región' && (
                    <section className='rounded-xl overflow-x-auto'>
                        <table className='table-auto text-font text-xs w-full'>
                            <thead className='bg-primary text-white'>
                                <tr className='text-left'>
                                    <th className='py-3 px-4'>Id</th>
                                    <th className='py-3 px-4'>Nombre</th>
                                    <th className='py-3 px-4'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {regions && regions.map(({ id, name }, index) => (
                                    <tr key={id} className='hover:bg-hover font-semibold'>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{index + 1}</h3>
                                        </td>
                                        <td className='py-3 px-4 w-full'>
                                            <h2 className='text-black text-xs font-bold leading-none whitespace-nowrap'>{name}</h2>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex gap-6'>
                                                <button className='font-bold w-min text-primary hover:opacity-80' type={'button'}>Editar</button>
                                                <button className='font-bold w-min text-[#ff0000] hover:opacity-80' type={'button'}>Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {status === 'campus' && (
                    <section className='rounded-xl overflow-x-auto'>
                        <table className='table-auto text-font text-xs w-full'>
                            <thead className='bg-primary text-white'>
                                <tr className='text-left'>
                                    <th className='py-3 px-4'>Id</th>
                                    <th className='py-3 px-4'>Nombre</th>
                                    <th className='py-3 px-4'>Subnombre</th>
                                    <th className='py-3 px-4'>URL</th>
                                    <th className='py-3 px-4'>Dirección</th>
                                    <th className='py-3 px-4'>Contacto</th>
                                    <th className='py-3 px-4'>Locación</th>
                                    <th className='py-3 px-4'>Región</th>
                                    <th className='py-3 px-4'>Carreras</th>
                                    <th className='py-3 px-4'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campus && campus.map(({ id, name, subname, url, direction, contact, location, region, carrers }, index) => (
                                    <tr key={id} className='hover:bg-hover font-semibold'>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{index + 1}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h2 className='text-black text-xs font-bold leading-none whitespace-nowrap'>{name}</h2>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{subname}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{url}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs w-56'>{direction}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{contact}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{location}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{region.name}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <select className='bg-trasparent'>
                                                {carrers.map(({ id, name }) => (
                                                    <option key={id} className='text-xs whitespace-nowrap'>{name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex gap-6'>
                                                <button className='font-bold w-min text-primary hover:opacity-80' type={'button'}>Editar</button>
                                                <button className='font-bold w-min text-[#ff0000] hover:opacity-80' type={'button'}>Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {status === 'carrera' && (
                    <section className='rounded-xl overflow-x-auto'>
                        <table className='table-auto text-font text-xs w-full'>
                            <thead className='bg-primary text-white'>
                                <tr className='text-left'>
                                    <th className='py-3 px-4'>Id</th>
                                    <th className='py-3 px-4'>Nombre</th>
                                    <th className='py-3 px-4'>Modalidad</th>
                                    <th className='py-3 px-4'>Semestres</th>
                                    <th className='py-3 px-4 whitespace-nowrap'>Plan de estudios</th>
                                    <th className='py-3 px-4'>Campus</th>
                                    <th className='py-3 px-4'>Universidad</th>
                                    <th className='py-3 px-4'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carrers && carrers.map(({ id, name, modality, semesters, curriculum, campus, university }, index) => (
                                    <tr key={id} className='hover:bg-hover font-semibold'>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{index + 1}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h2 className='text-black text-xs font-bold leading-none whitespace-nowrap'>{name}</h2>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{modality}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{semesters}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs'>{curriculum}</h3>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <h3 className='text-xs whitespace-nowrap'>{campus.name}</h3>
                                        </td>
                                        <td className='flex items-center gap-2 py-3 px-4'>
                                            <div className='grid place-content-center w-6 h-6 relative'>
                                                <Image src={university.logo} alt={university.name} layout={'fill'} objectFit={'contain'} />
                                            </div>
                                            <h2 className='text-xs font-bold leading-none whitespace-nowrap'>{name}</h2>
                                        </td>
                                        <td className='py-3 px-4'>
                                            <div className='flex gap-6'>
                                                <button className='font-bold w-min text-primary hover:opacity-80' type={'button'}>Editar</button>
                                                <button className='font-bold w-min text-[#ff0000] hover:opacity-80' type={'button'}>Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </div>
        </Layout>
    )
}
