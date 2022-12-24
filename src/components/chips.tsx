import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { trpc } from 'utils/trpc'
import ScrollChips from './scrollchips'

interface ChipProps {
    label: string
}

export default function Chips() {
    const [chips, setChips] = useState<ChipProps[]>([])
    const { data: careers } = trpc.useQuery(['career.getAllCareers'])

    const Chip = ({ label }: { label: string }) => (
        <div
            onClick={() => {
                setChips((prev) => {
                    const found = prev.find((chip) => chip.label === label)
                    if (found) {
                        return prev.filter((chip) => chip.label !== label)
                    } else {
                        return [...prev, { label }]
                    }
                })
            }}
            className={`flex items-center justify-center border rounded-md px-[11px] py-[3px] cursor-pointer whitespace-nowrap select-none
                ${chips.find((chip) => chip.label === label) ? 'bg-primary border-primary text-white' : 'bg-white text-black'}`}
        >
            <span className='text-[14px] font-medium'>{label}</span>
        </div>
    )


    return (
        <div className='flex justify-center gap-2 w-full px-4 md:px-8'>
            <div className='flex justify-center items-center gap-2 w-full h-[42px]'>
                {careers ?
                    <ScrollChips>
                        {careers && careers.map((career) => (
                            <Chip key={career.id} label={career.name} />
                        ))}
                    </ScrollChips>
                    : <Skeleton height={25} containerClassName={'skeleton-container'} borderRadius={'6px'} inline={true} />
                }
            </div>
        </div>
    )
}