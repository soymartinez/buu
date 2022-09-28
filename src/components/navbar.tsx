import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const menu = [
    { name: 'Universidades', link: '/universidades' },
    { name: 'Cursos', link: '/cursos' },
    { name: 'Carreras', link: '/carreras' },
    { name: 'Nosotros', link: '/nosotros' },
  ]

  const renderMenu = () => {
    return (
      menu.map((item, index) => (
        <Link key={index} href={item.link}>
          {item.name}
        </Link>
      ))
    )
  }

  const renderHamburger = () => {
    return (
      <div className={`w-8 h-8 flex flex-col justify-center items-center md:hidden`}
        onClick={() => setIsOpen(!isOpen)}>
        <div className={`absolute w-5 h-0.5 bg-black transition-all rounded-full ${isOpen ? 'rotate-45' : 'mb-[6px] ml-1'}`}></div>
        <div className={`absolute w-5 h-0.5 bg-black transition-all rounded-full ${isOpen ? '-rotate-45' : 'mt-[6px] mr-1'}`}></div>
      </div>
    )
  }

  return (
    <nav className={`text-sm px-4 py-2 fixed inset-x-0 z-50 w-full transition- ${isOpen ? 'bg-black/60 text-white h-full' : ''}`}>
      <div className='flex flex-col' onClick={() => setIsOpen(!isOpen)}>
        <div className='flex justify-between items-center font-bold'>
          <Link href='/'>SIUM</Link>
          {renderHamburger()}
        </div>
        <div className={`absolute z-40 inset-0 transition-transform py-6 ${isOpen ? 'px-4' : '-translate-x-full'} 
          mt-12 flex flex-col gap-6 w-full h-full`}>
          {renderMenu()}
        </div>
      </div>
    </nav>
  )
}
