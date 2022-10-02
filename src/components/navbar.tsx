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

  const renderHamburger = () => {
    return (
      <div className={`w-8 h-8 flex flex-col justify-center items-center md:hidden`} onClick={() => setIsOpen(!isOpen)}>
        <div className={`absolute w-5 h-0.5 transition-all duration-400 rounded-full ${isOpen ? 'bg-white rotate-45' : 'bg-black mb-[6px] ml-1'}`}></div>
        <div className={`absolute w-5 h-0.5 transition-all duration-400 rounded-full ${isOpen ? 'bg-white -rotate-45' : 'bg-black mt-[6px] mr-1'}`}></div>
      </div>
    )
  }

  return (
    <nav className={`text-xs px-4 py-2 fixed inset-x-0 z-50 w-full transition-all ${isOpen ? 'text-white h-full' : ''}`}>
      <div className='flex flex-col max-w-[1280px] mx-auto h-screen' onClick={() => isOpen ? setIsOpen(false) : null}>
        <div className='flex text-sm justify-between items-center z-50 md:text-black font-bold h-8'>
          <Link href='/'>SIUM</Link>
          {renderHamburger()}
        </div>
        <div className={`absolute z-40 inset-0 transition-transform py-6 px-1 duration-200 bg-black/95 ${isOpen ? '' : 'translate-x-full'} pt-16 md:hidden`}>
          <div className='flex flex-col gap-1 font-semibold text-sm'>
            {menu.map((item, index) => (
              <Link key={index} href={item.link}>
                <a className='transition-colors cursor-pointer px-3 py-1 rounded-md hover:bg-black/80 text-white'>
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
