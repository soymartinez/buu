import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { trpc } from 'utils/trpc'
import ScrollChips from './scrollchips'

export default function Chips({ setChips }: { setChips: (chips: any) => void }) {
    const [chips, set] = useState<string[]>([])
    const { data: careers } = trpc.useQuery(['career.getAllCareers'])

    const handleClick = (name: string) => {
        set((prev) => {
            const found = prev.find((chip) => chip === name)
            if (found) {
                return prev.filter((chip) => chip !== name)
            } else {
                return [...prev, name]
            }
        })
    }

    useEffect(() => {
        setChips(chips)
    }, [chips])

    return (
        <div className='flex justify-center gap-2 w-full px-4 md:px-8'>
            <div className='flex justify-center items-center gap-2 w-full h-[42px]'>
                {careers ?
                    <ScrollChips>
                        {careers && careers.map(({ id, name }) => (
                            <div key={id} onClick={() => handleClick(name)}
                                className={`flex items-center justify-center border rounded-md px-[11px] py-[3px] cursor-pointer whitespace-nowrap select-none
                                ${chips.find((chip) => chip === name) ? 'bg-primary border-primary text-white' : 'bg-white text-black'}`}
                            >
                                <span className='text-[14px] font-medium'>{name}</span>
                            </div>
                        ))}
                    </ScrollChips>
                    : <Skeleton height={25} containerClassName={'skeleton-container'} borderRadius={'6px'} inline={true} />
                }
            </div>
        </div>
    )
}