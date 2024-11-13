'use client'
import { RUNS } from '@/lib/contants'
import { useMatchStore } from '@/store/match-store'
import { useState } from 'react'

export const RunsBlock = () => {
    const isBatting = useMatchStore((state) => state.userTeam.isBatting)
    const handleSelectedNumber = useMatchStore(
        (state) => state.setSelectedNumber
    )
    const resetSystemNumber = useMatchStore((state) => state.resetSystemNumber)
    const handleScore = useMatchStore((state) => state.handleScore)
    const [number, setNumber] = useState(5)

    const handleSelection = (number: number) => {
        resetSystemNumber()
        setNumber(number)
        handleSelectedNumber(number)
    }
    return (
        <div className="h-1/5 flex flex-col items-center justify-center pb-4 space-y-4">
            <div className="flex flex-row items-center space-x-4 px-6">
                {RUNS.map((num) => (
                    <div
                        key={num}
                        className={`${number === num ? 'w-14 h-14' : 'w-12 h-12'} bg-gray-500 text-white rounded-full flex items-center justify-center cursor-pointer`}
                        onClick={() => handleSelection(num)}
                    >
                        {num}
                    </div>
                ))}
            </div>
            <button
                onClick={() => handleScore()}
                className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-48"
            >
                {isBatting ? 'Hit' : 'Bowl'}
            </button>
        </div>
    )
}
