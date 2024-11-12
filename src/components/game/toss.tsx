'use client'
import { useMatchStore } from '@/store/match-store'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../ui/button'

export const BatOrBowl = () => {
    const updateToss = useMatchStore((state) => state.updateToss)
    const [selected, setSelected] = useState<'bat' | 'bowl' | null>(null)

    const handleClick = (choice: 'bat' | 'bowl') => {
        setSelected(choice)
        setTimeout(() => {
            updateToss(choice)
        }, 3000)
    }

    return (
        <div className="flex w-full h-full">
            <motion.div
                className="bg-blue-200 flex justify-center items-center"
                initial={{ width: '50%' }}
                animate={{
                    flexGrow:
                        selected === 'bat' ? 1 : selected === 'bowl' ? 0 : 1,
                    opacity: selected === 'bowl' ? 0 : 1,
                    width:
                        selected === 'bat'
                            ? '100%'
                            : selected === 'bowl'
                              ? '0%'
                              : '50%',
                }}
                transition={{ duration: 0.5 }}
                onClick={() => handleClick('bat')}
            >
                <Button disabled={selected !== null}>Bat</Button>
            </motion.div>
            <motion.div
                className="bg-yellow-200 flex justify-center items-center"
                initial={{ width: '50%' }}
                animate={{
                    flexGrow:
                        selected === 'bowl' ? 1 : selected === 'bat' ? 0 : 1,
                    opacity: selected === 'bat' ? 0 : 1,
                    width:
                        selected === 'bowl'
                            ? '100%'
                            : selected === 'bat'
                              ? '0%'
                              : '50%',
                }}
                transition={{ duration: 0.5 }}
                onClick={() => handleClick('bowl')}
            >
                <Button disabled={selected !== null}>Bowl</Button>
            </motion.div>
        </div>
    )
}
