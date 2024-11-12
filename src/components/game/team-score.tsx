'use client'
import { useMatchStore } from '@/store/match-store'
import { useEffect } from 'react'
import { BotPlayerCard, UserPlayerCard } from './player-card'
import { BotTeamCard, UserTeamCard } from './team-card'

export const TeamScore = () => {
    return (
        <div className="h-2/5 mb-4 flex flex-col gap-2">
            <div className="p-4 rounded-xl border border-gray-400 bg-card text-card-foreground shadow w-full max-w-2xl">
                <InningsBlock />
                <div className="">
                    <div className="flex justify-between items-center">
                        <BotTeamCard />
                        <div className="text-2xl font-bold px-4">VS</div>
                        <UserTeamCard />
                    </div>
                </div>
                <RunRateBlock />
            </div>

            <div className="flex flex-row justify-between gap-1 mt-4">
                <BotPlayerCard />
                <UserPlayerCard />
            </div>
        </div>
    )
}

export const InningsBlock = () => {
    const innings = useMatchStore((state) => state.innings)
    return (
        <div className=" text-center font-semibold text-sm">
            {innings == 1 ? '1st' : '2nd'} Innings
        </div>
    )
}

export const RunRateBlock = () => {
    const getRunRate = useMatchStore((state) => state.getRunRate)
    const userTeam = useMatchStore((state) => state.userTeam)
    const runRate = getRunRate()

    useEffect(() => {}, [userTeam, getRunRate])

    return (
        <div className=" text-center text-sm text-muted-foreground">
            {runRate}
        </div>
    )
}
