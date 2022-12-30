import { ReactNode, useEffect, useRef, useState } from 'react'
import Arrow from './icons/arrow'

export default function ScrollChips({
    children,
    className,
    classNameButtons,
    classNameArrows,
    scrollAmount,
}: {
    children: ReactNode | ReactNode[],
    className?: string,
    classNameButtons?: string,
    classNameArrows?: string,
    scrollAmount?: number,
}) {
    const div = useRef<HTMLDivElement>(null)
    const [scroll, setScroll] = useState({ scrollLeft: 0, scrollRight: 0, clientWidth: 0 })

    const handleScroll = () => {
        if (div.current) {
            const { scrollWidth, clientWidth, scrollLeft } = div.current
            setScroll({ scrollLeft, scrollRight: scrollWidth - scrollLeft - clientWidth, clientWidth })
        }
    }

    useEffect(() => {
        handleScroll()
        window.addEventListener("resize", handleScroll, false)
        return () => window.removeEventListener("resize", handleScroll, false)
    }, [])

    return (
        <div className={`flex items-center relative overflow-hidden min-h-[42px] h-full`}>
            <button onClick={() => div.current?.scroll({ ...div.current, left: scrollAmount || scroll.scrollLeft - scroll.clientWidth * .70, behavior: 'smooth' })}
                className={`transition-all duration-300 absolute p-[7px] rounded-full bg-white hover:bg-[#efefef] border-2 shadow-[0_0_15px_25px_white] -left-4 md:left-0 z-20
                        ${classNameButtons}            
                        ${scroll.scrollLeft === 0 ? 'opacity-0 -left-4 md:-left-8' : 'opacity-100'}
                `}>
                <Arrow className={`${classNameArrows} hidden md:flex`} />
            </button>
            <div className={'overflow-auto scrollbar-hide'} ref={div} onScroll={handleScroll}>
                <div className={`${className} flex gap-2 items-center transition duration-300`}>
                    {children}
                </div>
            </div>
            <button onClick={() => div.current?.scroll({ ...div.current, left: scrollAmount || scroll.scrollLeft + scroll.clientWidth * .70, behavior: 'smooth' })}
                className={`transition-all duration-300 absolute p-[7px] rounded-full bg-white hover:bg-[#efefef] border-2 shadow-[0_0_15px_25px_white] -right-4 md:right-0 -scale-x-100
                        ${classNameButtons}            
                        ${scroll.scrollRight === 0 ? 'opacity-0 -right-4 md:-right-8' : 'opacity-100'}
                `}>
                <Arrow className={`${classNameArrows} hidden md:flex`} />
            </button>
        </div>
    )
}
