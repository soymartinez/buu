import { ReactNode, useEffect, useRef, useState } from 'react'

export default function ScrollChips({
    children,
    className,
    classNameButtons,
    classNameArrows,
    translateX,
}: {
    children: ReactNode | ReactNode[],
    className?: string,
    classNameButtons?: string,
    classNameArrows?: string,
    translateX?: number | undefined
}) {
    const chips = useRef<HTMLDivElement>(null)
    const [overflow, setOverflow] = useState({ overflow: false, translateX: 0, diff: 0, clientWidth: 0 })

    const handleResize = () => {
        if (chips.current) {
            const { scrollWidth, clientWidth } = chips.current
            setOverflow({
                ...overflow,
                overflow: scrollWidth > clientWidth,
                diff: (scrollWidth - clientWidth) + overflow.translateX,
                clientWidth
            })
            if (overflow.diff < 0) setOverflow({ ...overflow, translateX: 0, diff: 0 })
        }
    }

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize, false)
        return () => window.removeEventListener("resize", handleResize, false)
    }, [children, overflow.translateX])

    return (
        <div className={`flex items-center relative overflow-hidden min-h-[42px] h-full`}>
            <button
                onClick={() => setOverflow({
                    ...overflow,
                    translateX: overflow.translateX + (translateX || overflow.clientWidth) < 0
                        ? overflow.translateX + (translateX || overflow.clientWidth)
                        : 0,
                })}
                hidden={overflow.translateX === 0}
                className={`${classNameButtons} absolute p-1 rounded-full bg-white hover:bg-[#efefef] shadow-[0_0_15px_25px_white] left-0 z-10`}>
                <svg
                    className={`${classNameArrows} text-black cursor-pointer z-10 w-[30px] h-[30px]`}
                    viewBox='0 0 24 24'
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M14.53 7.53a.75.75 0 0 0-1.06-1.06l-5 5a.75.75 0 0 0 0 1.061l5 5a.75.75 0 0 0 1.06-1.061L10.06 12Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
            <div className={'overflow-hidden'}>
                <div
                    ref={chips}
                    style={{
                        scrollBehavior: 'smooth',
                        transform: `translateX(${overflow.translateX}px)`
                    }}
                    className={`${className} flex gap-2 items-center transition duration-300`}
                >
                    {children}
                </div>
            </div>
            <button
                onClick={() => setOverflow({
                    ...overflow,
                    translateX: overflow.diff - (translateX || overflow.clientWidth) < 0
                        ? overflow.translateX - overflow.diff
                        : overflow.translateX - (translateX || overflow.clientWidth),
                })}
                hidden={overflow.diff === 0}
                className={`${classNameButtons} absolute p-1 rounded-full bg-white hover:bg-[#efefef] shadow-[0_0_15px_25px_white] right-0 -scale-x-100`}>
                <svg
                    className={`${classNameArrows} text-black cursor-pointer z-10 w-[30px] h-[30px]`}
                    viewBox='0 0 24 24'
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M14.53 7.53a.75.75 0 0 0-1.06-1.06l-5 5a.75.75 0 0 0 0 1.061l5 5a.75.75 0 0 0 1.06-1.061L10.06 12Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    )
}
