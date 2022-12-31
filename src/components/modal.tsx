import { useEffect } from 'react'
import Warning from './icons/warning'

export default function Modal({ title, message, button, background, setModal, setHandler, open }: {
    title: string,
    message: string,
    button: string,
    background?: 'white' | 'primary' | 'warning' | 'error',
    setModal: any,
    setHandler: (status: boolean) => void,
    open: boolean
}) {
    useEffect(() => {
        const container = document.getElementById('container')
        if (container) {
            container.style.opacity = '1'
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setModal(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className={`${open ? '' : 'hidden'} absolute inset-0 opacity-100 transition-opacity duration-500 z-50 h-screen w-screen p-4 flex justify-center items-center bg-black/80`}
            id={'container'}
            onClick={() => setModal(false)}
        >
            <div className={`rounded-lg overflow-hidden w-80 ${background ? `bg-${background}` : 'bg-white'}`}>
                <section className='flex justify-between items-center p-4 bg-error'>
                    <div className='flex items-center gap-2'>
                        {background === 'warning' && <Warning className='text-white w-6 h-6' />}
                        <h1 className='font-bold text-white text-xs'>{title}</h1>
                    </div>
                    <button onClick={() => setModal(false)} className='text-white text-2xl leading-none'>&times;</button>
                </section>
                <section className='px-4 py-6 bg-white'>
                    <p className='text-xs'>{message}</p>
                </section>
                <footer className='flex justify-end p-4 py-2 bg-white border-t'>
                    <button className='px-2 py-1 text-[14px] font-bold text-white bg-error hover:opacity-90 rounded-md' onClick={() => setHandler(true)}>{button}</button>
                </footer>
            </div>
        </ div>
    )
}
