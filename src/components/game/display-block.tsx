'use client'
import { useMatchStore } from '@/store/match-store'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Define the numbers array as a constant
const numbers: number[] = [0, 1, 2, 3, 4, 6]

export const DisplayBlock = () => {
    console.log('renders')
    return (
        <div className="h-1/5 mb-4 flex justify-evenly items-center">
            <BotDisplayCard />
            <UserDisplayCard />
        </div>
    )
}

export const UserDisplayCard = () => {
    const userNumber = useMatchStore((state) => state.selectedNumber)
    console.log('userNumber', userNumber)
    return (
        <>
            {userNumber === 5 ? (
                <EmptyCard />
            ) : (
                <NumberCard number={userNumber} />
            )}
        </>
    )
}

export const BotDisplayCard = () => {
    const isLoading = useMatchStore((state) => state.isSelectionLoading)
    const botNumber = useMatchStore((state) => state.systemNumber)
    if (isLoading) {
        return <LoadingCard />
    }
    return (
        <>
            {botNumber == 5 ? <EmptyCard /> : <NumberCard number={botNumber} />}
        </>
    )
}

export const EmptyCard = () => {
    return (
        <div className="rounded-xl border border-gray-400 shadow text-6xl font-extrabold bg-zinc-500 w-28 h-28 flex items-center justify-center"></div>
    )
}

export const NumberCard = ({ number }: { number: number }) => {
    return (
        <div className="rounded-xl border border-gray-400 shadow text-6xl font-extrabold bg-zinc-500 w-28 h-28 flex items-center justify-center">
            {number}
        </div>
    )
}

export const LoadingCard = () => {
    const [currentNumber, setCurrentNumber] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNumber((prev) => (prev + 1) % numbers.length)
        }, 300) // Change number every 300ms

        // Cleanup interval on component unmount
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="rounded-xl border border-gray-400 shadow text-6xl font-extrabold bg-zinc-500 w-28 h-28 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentNumber}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                >
                    {numbers[currentNumber]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
