import { Campus, Career, Careers, Level, Modality, Period, Region, Type, University } from '@prisma/client'
import Dropdown from 'components/dropdown'
import Layout from 'components/layout'
import Modal from 'components/modal'
import Select from 'components/select'
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
    const [success, setSuccess] = useState(0)
    const [status, setStatus] = useState('universidad')
    const [modal, setModal] = useState({
        title: '',
        message: '',
        textButton: '',
        background: 'white' as 'white' | 'primary' | 'warning' | 'error',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handler: () => { },
        open: false,
    })
    const [row, setRow] = useState(false)
    const [prevData, setPrevData] = useState({} as any)
    const [preview, setPreview] = useState('')
    const [selected, setSelected] = useState<{ id: number, index: number }[]>([])

    // GET
    const { data: universities } = trpc.useQuery(['university.getAll'])
    const { data: regions } = trpc.useQuery(['region.getAll'])
    const { data: campus } = trpc.useQuery(['campus.getAll'])
    const { data: careersList } = trpc.useQuery(['career.getAllCareers'])
    const { data: careersDetails } = trpc.useQuery(['career.getAllCareersDetails'])

    // CREATE OR UPDATE
    const { mutate: universityCreate } = trpc.useMutation(['university.create'])
    const { mutate: regionCreate } = trpc.useMutation(['region.create'])
    const { mutate: campusCreate } = trpc.useMutation(['campus.create'])
    const { mutate: careerCreate } = trpc.useMutation(['career.create'])

    // DELETE
    const { mutate: deleteCareer } = trpc.useMutation(['career.delete'])

    // INVALIDATE
    const { invalidateQueries } = trpc.useContext()

    const handleSelected = (id: number, index: number) => {
        selected.some((selectId) => selectId.id === id)
            ? setSelected(selected.filter((selectId) => selectId.id !== id))
            : setSelected([...selected, { id, index }])
    }

    const handleCancel = () => {
        setRow(false)
        setPreview('')
        setPrevData({})
        setSelected([])
    }

    const handleSaveUniversity = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const form = Object.fromEntries(formData.entries())

        universityCreate({
            name: form.name as string,
            subname: form.subname as string,
            logo: form.logo as File,
            url: form.url as string,
            description: form.description as string,
            location: form.location as string,
            ranking: Number(form.ranking),
            type: form.type as Type,
        }, {
            onSuccess({ id }) {
                setSuccess(id)
                invalidateQueries(['university.getAll'])
                setRow(false)
                setPreview('')
            },
        })
    }

    const handleSaveRegion = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())

        regionCreate({
            name: data.name as string,
        }, {
            onSuccess() {
                invalidateQueries(['region.getAll'])
                setRow(false)
            },
        })
    }

    const handleSaveCampus = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())

        campusCreate({
            name: data.name as string,
            subname: data.subname as string,
            direction: data.direction as string,
            contact: data.contact as string,
            url: data.url as string,
            location: data.location as string,
            university: Number(data.universidad),
            region: Number(data.región),
        }, {
            onSuccess({ id }) {
                setSuccess(id)
                invalidateQueries(['campus.getAll'])
                setRow(false)
            }
        })
    }

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())

        switch (status) {
            case 'universidad':
                handleSaveUniversity(e)
                break
            case 'región':
                handleSaveRegion(e)
                break
            case 'campus':
                handleSaveCampus(e)
                break
            case 'carrera':
                return careerCreate({
                    id: selected[0]?.id,
                    career: Number(data.carrera),
                    university: Number(data.universidad),
                    campus: Number(data.campus),
                    level: data.level as Level,
                    area: data.area as string,
                    period: data.period as Period,
                    duration: Number(data.duration),
                    program: data.program as string,
                    modality: data.modality as string,
                }, {
                    onSuccess() {
                        invalidateQueries(['career.getAllCareersDetails'])
                        handleCancel()
                    },
                })
        }
    }

    const handleDelete = () => {
        setModal({ ...modal, open: false })
        switch (status) {
            case 'carrera':
                return selected.map(({ id }) => {
                    deleteCareer({ id }, {
                        onSuccess() {
                            invalidateQueries(['career.getAllCareersDetails'])
                        },
                    })
                })
        }
        setSelected([])
    }

    const handleUpdate = () => {
        switch (status) {
            case 'carrera':
                setPrevData(careersDetails?.find((career) => career.id === selected[0]?.id))
                setRow(true)
                break
        }
    }

    const handleFile = (e: any) => {
        if (e.target.files[0]) {
            const file = e.target.files[0]
            setPreview(URL.createObjectURL(file))
        }
    }

    const menu = [
        { name: 'universidades', active: 'universidad', count: universities?.length },
        { name: 'regiones', active: 'región', count: regions?.length },
        { name: 'campus', active: 'campus', count: campus?.length },
        { name: 'carreras', active: 'carrera', count: careersDetails?.length },
    ]

    return (
        <Layout title={'Buu – Administrador'}>
            <Modal
                title={modal.title}
                message={modal.message}
                button={modal.textButton}
                background={modal.background}
                setModal={(v: boolean) => setModal({ ...modal, open: v })}
                setHandler={modal.handler}
                open={modal.open}
            />
            <div className='flex flex-col gap-4 pt-[70px] md:pt-[80px] px-4 md:px-8 w-full h-screen max-w-[1280px] mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl mt-4'>Administrador</h1>
                <section className='grid gap-4'>
                    <div className='flex items-center gap-1 sm:gap-6 bg-[#ececec] rounded-xl px-2 overflow-x-auto scrollbar-hide'>
                        {menu.map(({ name, active, count }) => (
                            <div key={name} onClick={() => { setStatus(active); handleCancel() }}>
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
                        <div className={`flex gap-5 px-3 md:px-5 text-xs w-min font-semibold text-font ml-auto lg:m-0`}>
                            {row
                                ? <div className='flex gap-5'>
                                    <button type={'submit'} form={`form-${status}`} className='flex gap-2 py-2 text-primary hover:opacity-90'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 3a1 1 0 011-1h8a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V3zm1 2v10h8V5H6z" clipRule="evenodd" />
                                        </svg>
                                        <h2 className='select-none whitespace-nowrap'>Guardar {status}</h2>
                                    </button>

                                    <button onClick={() => handleCancel()} className='flex gap-2 py-2 hover:opacity-90'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <h2 className='select-none whitespace-nowrap'>Cancelar</h2>
                                    </button>
                                </div>
                                : <>
                                    <button onClick={() => setRow(true)} className='flex justify-center items-center gap-2 py-2 hover:opacity-90'>
                                        <div className='flex justify-center w-4 h-4 items-center relative'>
                                            <div className='w-[12px] h-[2px] rounded-full bg-font' />
                                            <div className='absolute w-[12px] h-[2px] rounded-full bg-font rotate-90' />
                                        </div>
                                        <h2 className='select-none whitespace-nowrap'>Agregar <span className='lowercase'>{status}</span></h2>
                                    </button>
                                    {selected.length > 0 &&
                                        <button onClick={() => setModal({
                                            title: `Confirmar borrado de registro`,
                                            message: `Está a punto de eliminar el registro de forma permanente de la base de datos.`,
                                            textButton: 'Eliminar',
                                            background: 'warning',
                                            handler: () => handleDelete(),
                                            open: true,
                                        })} className='flex justify-center items-center gap-2 py-2 hover:opacity-90'>
                                            <div className='flex justify-center w-4 h-4 items-center relative'>
                                                <div className='w-[12px] h-[2px] rounded-full bg-error' />
                                            </div>
                                            <h2 className='select-none whitespace-nowrap text-error'>
                                                Eliminar {selected.length} registros
                                            </h2>
                                        </button>}
                                    {selected.length === 1 &&
                                        <button onClick={() => handleUpdate()} className='flex justify-center items-center gap-2 py-2 hover:opacity-90'>
                                            <h2 className='select-none whitespace-nowrap'>
                                                Modificar
                                            </h2>
                                        </button>
                                    }
                                </>
                            }
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

                {status === 'universidad' && (
                    <section className='rounded-xl overflow-x-auto h-full w-full mb-4'>
                        <form id={`form-${status}`} onSubmit={handleSaveUniversity}>
                            <table className='table-auto text-font text-xs w-full'>
                                <thead className='bg-primary text-white sticky top-0 z-30'>
                                    <tr className='text-left'>
                                        <th className='py-3 px-4'>Id</th>
                                        <th className='py-3 px-4'>Nombre</th>
                                        <th className='py-3 px-4'>Localidad</th>
                                        <th className='py-3 px-4'>Ranking<span className='text-gray-200 ml-1'>?</span></th>
                                        <th className='py-3 px-4'>Tipo</th>
                                        <th className='py-3 px-4'>URL<span className='text-gray-200 ml-1'>?</span></th>
                                        <th className='py-3 px-4'>Descripción<span className='text-gray-200 ml-1'>?</span></th>
                                        <th className='py-3 px-4 whitespace-nowrap'>Regiones<span className='text-gray-200 ml-1'>[ ]</span></th>
                                        <th className='py-3 px-4 whitespace-nowrap'>Campus<span className='text-gray-200 ml-1'>[ ]</span></th>
                                        <th className='py-3 px-4 whitespace-nowrap'>Carreras<span className='text-gray-200 ml-1'>[ ]</span></th>
                                    </tr>
                                </thead>
                                <tbody className='rounded-b-xl overflow-hidden'>
                                    {row && (
                                        <tr className='font-semibold text-black w-full sticky top-10 z-20'>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' disabled />
                                            </td>
                                            <td>
                                                <div className='w-full bg-hover py-1 px-4 flex gap-4'>
                                                    <div className='grid place-content-center w-8 h-8 relative'>
                                                        <label htmlFor='logo' className='bg-secondary rounded-full w-8 cursor-pointer'>
                                                            {!preview
                                                                && <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 text-gray-100' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                </svg>}
                                                            {preview && <Image src={preview} alt={'upload'} objectFit={'contain'} layout={'fill'} />}
                                                        </label>
                                                        <input type={'file'} id={'logo'} className={'sr-only right-4 bottom-0'} accept={'image/png, image/jpeg'} onChange={handleFile} name={'logo'} required />
                                                    </div>
                                                    <div className='w-full flex flex-col justify-center gap-0'>
                                                        <input className='bg-trasparent text-black text-xs font-bold outline-none leading-none whitespace-nowrap' placeholder={'Nombre'} name={'name'} required />
                                                        <input className='bg-trasparent text-[14px] outline-none text-font font-medium' placeholder={'Acrónimo'} name={'subname'} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'location'} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'ranking'} type={'number'} />
                                            </td>
                                            <td>
                                                <Select object={Type} name={'type'} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'url'} type={'url'} />
                                            </td>
                                            <td className='flex items-center'>
                                                <textarea className='w-full bg-hover py-3 px-4 max-w-full resize-none' rows={1} name={'description'} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 cursor-not-allowed text-center' placeholder='--' disabled />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 cursor-not-allowed text-center' placeholder='--' disabled />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 cursor-not-allowed text-center' placeholder='--' disabled />
                                            </td>
                                        </tr>
                                    )}
                                    {universities && universities.map(({ id, name, subname, logo, url, description, location, ranking, type, regions, campus, careers }, index) => (
                                        <tr key={id} className={`hover:bg-hover font-semibold border-b-2 border-hover last:border-none ${id === success && 'animate-[highlight_1s_ease-in-out_1]'}`}>
                                            <td>
                                                <h3 className='py-3 px-4'>{index + 1}</h3>
                                            </td>
                                            <td className='w-full'>
                                                <div className='py-3 px-4 flex gap-4'>
                                                    <div className='grid place-content-center w-8 h-8 relative'>
                                                        <Image src={logo} alt={name} layout={'fill'} objectFit={'contain'} />
                                                    </div>
                                                    <div className='flex flex-col justify-center gap-0'>
                                                        <h2 className='text-black text-xs font-bold leading-none whitespace-nowrap'>{name}</h2>
                                                        <h3 className='text-[14px] text-font font-medium'>{subname}</h3>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{location}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{ranking}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{type}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 w-40 whitespace-nowrap truncate'>{url}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 w-40 whitespace-nowrap truncate'>{description}</h3>
                                            </td>
                                            <td>
                                                <div className='py-3 px-4 flex items-center'>
                                                    <h3 className='px-2 py-1 bg-gray-200 rounded-md rounded-r-none'>{regions.length}</h3>
                                                    <span className='px-2 py-1 bg-hover rounded-md rounded-l-none'>regiones</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='py-3 px-4 flex items-center'>
                                                    <h3 className='px-2 py-1 bg-gray-200 rounded-md rounded-r-none'>{campus.length}</h3>
                                                    <span className='px-2 py-1 bg-hover rounded-md rounded-l-none'>campus</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='py-3 px-4 flex items-center'>
                                                    <h3 className='px-2 py-1 bg-gray-200 rounded-md rounded-r-none'>{careers.length}</h3>
                                                    <span className='px-2 py-1 bg-hover rounded-md rounded-l-none'>carreras</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </form>
                    </section>
                )}

                {status === 'región' && (
                    <section className='rounded-xl overflow-x-auto h-full w-full mb-4'>
                        <form id={`form-${status}`} onSubmit={handleSaveRegion}>
                            <table className='table-auto text-font text-xs w-full'>
                                <thead className='bg-primary text-white sticky top-0 z-30'>
                                    <tr className='text-left'>
                                        <th className='py-3 px-4'>Id</th>
                                        <th className='py-3 px-4'>Nombre</th>
                                        <th className='py-3 px-4'>Universidades<span className='text-gray-200 ml-1'>[ ]</span></th>
                                        <th className='py-3 px-4 whitespace-nowrap'>Campus<span className='text-gray-200 ml-1'>[ ]</span></th>
                                    </tr>
                                </thead>
                                <tbody className='rounded-b-xl overflow-hidden'>
                                    {row && (
                                        <tr className='font-semibold text-black w-full sticky top-10 z-20'>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' disabled />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 font-bold' name={'name'} required />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 cursor-not-allowed text-center' placeholder='--' disabled />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 cursor-not-allowed text-center' placeholder='--' disabled />
                                            </td>
                                        </tr>
                                    )}
                                    {regions && regions.map(({ id, name, university, campus }, index) => (
                                        <tr key={id} className='hover:bg-hover font-semibold border-b-2 border-hover last:border-none'>
                                            <td>
                                                <h3 className='py-3 px-4'>{index + 1}</h3>
                                            </td>
                                            <td className='w-full'>
                                                <h3 className='py-3 px-4 text-black text-xs font-bold leading-none whitespace-nowrap'>{name}</h3>
                                            </td>

                                            <td>
                                                <div className='py-3 px-4 flex items-center'>
                                                    <h3 className='px-2 py-1 bg-gray-200 rounded-md rounded-r-none'>{university.length}</h3>
                                                    <span className='px-2 py-1 bg-hover rounded-md rounded-l-none'>universidades</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='py-3 px-4 flex items-center'>
                                                    <h3 className='px-2 py-1 bg-gray-200 rounded-md rounded-r-none'>{campus.length}</h3>
                                                    <span className='px-2 py-1 bg-hover rounded-md rounded-l-none'>campus</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </form>
                    </section>
                )}

                {status === 'campus' && (
                    <section className='rounded-xl overflow-x-auto h-full w-full mb-4'>
                        <form id={`form-${status}`} onSubmit={handleSaveCampus}>
                            <table className='table-auto text-font text-xs w-full'>
                                <thead className='bg-primary text-white sticky top-0 z-30'>
                                    <tr className='text-left'>
                                        <th className='py-3 px-4'>Id</th>
                                        <th className='py-3 px-4'>Nombre</th>
                                        <th className='py-3 px-4'>Subnombre<span className='text-gray-200 ml-1'>?</span></th>
                                        <th className='py-3 px-4'>Dirección</th>
                                        <th className='py-3 px-4'>Contacto<span className='text-gray-200 ml-1'>?</span></th>
                                        <th className='py-3 px-4'>URL<span className='text-gray-200 ml-1'>?</span></th>
                                        <th className='py-3 px-4'>Locación</th>
                                        <th className='py-3 px-4'>Universidad</th>
                                        <th className='py-3 px-4'>Región</th>
                                        <th className='py-3 px-4'>Carreras<span className='text-gray-200 ml-1'>[ ]</span></th>
                                    </tr>
                                </thead>
                                <tbody className='rounded-b-xl overflow-hidden'>
                                    {row && (
                                        <tr className='font-semibold text-black w-full sticky top-10 z-20'>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' disabled />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 font-bold' name={'name'} required />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'subname'} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'direction'} required />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'contact'} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'url'} type={'url'} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'location'} required />
                                            </td>
                                            <td>
                                                <Dropdown
                                                    title='universidad'
                                                    object={universities}
                                                    setStatus={setStatus}
                                                />
                                            </td>
                                            <td>
                                                <Dropdown
                                                    title='región'
                                                    object={regions}
                                                    setStatus={setStatus}
                                                />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 cursor-not-allowed text-center' placeholder='--' disabled />
                                            </td>
                                        </tr>
                                    )}
                                    {campus && campus.map(({ id, name, subname, url, direction, contact, location, region, careers, university }, index) => (
                                        <tr key={id} className={`hover:bg-hover font-semibold border-b-2 border-hover last:border-none ${id === success && 'animate-[highlight_1s_ease-in-out_1]'}`}>
                                            <td>
                                                <h3 className='py-3 px-4'>{index + 1}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 text-black text-xs font-bold leading-none whitespace-nowrap'>{name}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{subname}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 w-56'>{direction}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 w-32'>{contact}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 w-40 truncate'>{url}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 min-w-[150px] whitespace-nowrap w-full'>{location}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 min-w-[250px] whitespace-nowrap w-full'>{university.name}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 min-w-[250px] whitespace-nowrap w-full'>{region.name}</h3>
                                            </td>
                                            <td>
                                                <div className='py-3 px-4 flex items-center'>
                                                    <h3 className='px-2 py-1 bg-gray-200 rounded-md rounded-r-none'>{careers.length}</h3>
                                                    <span className='px-2 py-1 bg-hover rounded-md rounded-l-none'>carreras</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </form>
                    </section>
                )}

                {status === 'carrera' && (
                    <section className='rounded-xl overflow-x-auto h-full w-full'>
                        <form id={`form-${status}`} onSubmit={handleSave}>
                            <table className='table-auto text-font text-xs w-full'>
                                <thead className='bg-primary text-white sticky top-0 z-30'>
                                    <tr className='text-left'>
                                        <th className='py-3 px-4'></th>
                                        <th className='py-3 px-4'>Id</th>
                                        <th className='py-3 px-4'>Nombre</th>
                                        <th className='py-3 px-4'>Universidad</th>
                                        <th className='py-3 px-4'>Campus</th>
                                        <th className='py-3 px-4'>Nivel</th>
                                        <th className='py-3 px-4'>Área<span className='text-gray-200 ml-1'>?</span></th>
                                        <th className='py-3 px-4'>Periodo</th>
                                        <th className='py-3 px-4'>Duración</th>
                                        <th className='py-3 px-4'>Programa<span className='text-gray-200 ml-1'>?</span></th>
                                        <th className='py-3 px-4'>Modalidad</th>
                                    </tr>
                                </thead>
                                <tbody className='rounded-b-xl overflow-hidden'>
                                    {row && (
                                        <tr className='font-semibold text-black w-full sticky top-10 z-20'>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' disabled />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4 text-font' defaultValue={selected[0]?.index} disabled />
                                            </td>
                                            <td>
                                                <Dropdown
                                                    title='carrera'
                                                    object={careersList}
                                                    setStatus={setStatus}
                                                    defaultValue={prevData?.name}
                                                />
                                            </td>
                                            <td>
                                                <Dropdown
                                                    title='universidad'
                                                    object={universities}
                                                    setStatus={setStatus}
                                                    defaultValue={prevData?.universityName}
                                                />
                                            </td>
                                            <td>
                                                <Dropdown
                                                    title='campus'
                                                    object={campus}
                                                    setStatus={setStatus}
                                                    defaultValue={prevData?.campus?.name}
                                                />
                                            </td>
                                            <td>
                                                <Select object={Level} name={'level'} defaultValue={prevData.level} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'area'} defaultValue={prevData.area} />
                                            </td>
                                            <td>
                                                <Select object={Period} name={'period'} defaultValue={prevData.period} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'duration'} type={'number'} defaultValue={prevData.duration || 8} min={0} max={18} />
                                            </td>
                                            <td>
                                                <input className='w-full bg-hover py-3 px-4' name={'program'} defaultValue={prevData.program} />
                                            </td>
                                            <td>
                                                <Select object={Modality} name={'modality'} defaultValue={prevData.modality} />
                                            </td>
                                        </tr>
                                    )}
                                    {careersDetails && careersDetails.map(({ id, career, university, campus, level, area, period, duration, program, modality }, index) => (
                                        <tr key={id} onClick={() => !row && handleSelected(id, index + 1)} className={`${selected.find((s) => s.id === id) ? 'bg-hover/70' : 'border-hover'} cursor-pointer hover:bg-hover font-semibold border-b last:border-none`}>
                                            <td>
                                                <div className='py-3 px-4 flex items-center justify-center'>
                                                    <input onClick={() => handleSelected(id, index + 1)} type={'checkbox'} className='w-3 h-3 cursor-pointer accent-primary'
                                                        readOnly checked={selected?.some(selectId => selectId.id === id)} name={career.name} disabled={row} />
                                                </div>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{index + 1}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 text-black text-xs font-bold leading-none whitespace-nowrap'>{career.name}</h3>
                                            </td>
                                            <td>
                                                <div className='py-3 px-4 flex items-center gap-2'>
                                                    <div className='grid place-content-center w-6 h-6 relative'>
                                                        <Image src={university.logo} alt={university.name} layout={'fill'} objectFit={'contain'} />
                                                    </div>
                                                    <h2 className='font-bold leading-none whitespace-nowrap'>{university.name}</h2>
                                                </div>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 w-48'>{campus.name}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{level}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 whitespace-nowrap'>{area}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4 w-28'>{period}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{duration}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{program}</h3>
                                            </td>
                                            <td>
                                                <h3 className='py-3 px-4'>{modality}</h3>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </form>
                    </section>
                )}
            </div>
        </Layout>
    )
}
