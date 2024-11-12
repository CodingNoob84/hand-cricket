'use client'
import { TeamData, useMatchStore } from '@/store/match-store'
import { useMutation } from 'convex/react'
import Link from 'next/link'
import { api } from '../../../convex/_generated/api'
import { Button } from '../ui/button'

import { useEffect, useState } from 'react'
import { Id } from '../../../convex/_generated/dataModel'

export const ResultPage = () => {
    const updateMatch = useMutation(api.matches.updateMatch)
    const matchId = useMatchStore((state) => state.matchId)
    const getData = useMatchStore((state) => state.toUpdateDB)
    const data = getData()
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        // Only run if matchId and getData() are available
        if (matchId && data) {
            const updateMatchData = async () => {
                setIsLoading(true)
                try {
                    await updateMatch({
                        matchId: matchId as Id<'matches'>,
                        data: data,
                    })
                } catch (error) {
                    console.error('Error updating match:', error)
                } finally {
                    setIsLoading(false)
                    setShow(true)
                }
            }

            updateMatchData()
        }
    }, [matchId, data, updateMatch])

    //console.log('result', matchId, getData())

    return (
        <div className="flex-grow flex flex-col overflow-auto lg:overflow-auto lg:h-screen">
            <div className="mb-4 flex flex-col gap-2 px-4 pt-2">
                <TossBlock />
                <FirstInnings />
                <SecondInnings />
                <ResultBlock />

                <Button asChild className="mt-10" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Result Saved'}
                </Button>
                {show && (
                    <Button asChild className="mt-4">
                        <Link href="/dashboard">Close</Link>
                    </Button>
                )}
            </div>
        </div>
    )
}

const ResultBlock = () => {
    const result = useMatchStore((state) => state.result)
    const resultBy = useMatchStore((state) => state.resultBy)
    return (
        <div
            className={`flex flex-row justify-center items-center px-4 border border-gray-400 rounded-md shadow-md p-4 ${result == 'won' ? 'shadow-green-400' : 'shadow-red-400'} `}
        >
            You have {resultBy}
        </div>
    )
}

const TossBlock = () => {
    const toss = useMatchStore((state) => state.toss)
    return (
        <div className="flex text-center justify-center items-center px-4 border border-gray-400 rounded-md shadow-md p-1">
            {`You won the toss and elected to ${toss} first`}
        </div>
    )
}

const FirstInnings = () => {
    const toss = useMatchStore((state) => state.toss)
    const userTeam = useMatchStore((state) => state.userTeam)
    const botTeam = useMatchStore((state) => state.botTeam)
    const BattingTeam = toss == 'bat' ? userTeam : botTeam
    const BowlingTeam = toss == 'bowl' ? userTeam : botTeam
    return <TeamSummary BattingTeam={BattingTeam} BowlingTeam={BowlingTeam} />
}

const SecondInnings = () => {
    const toss = useMatchStore((state) => state.toss)
    const userTeam = useMatchStore((state) => state.userTeam)
    const botTeam = useMatchStore((state) => state.botTeam)
    const BattingTeam = toss != 'bat' ? userTeam : botTeam
    const BowlingTeam = toss != 'bowl' ? userTeam : botTeam
    return <TeamSummary BattingTeam={BattingTeam} BowlingTeam={BowlingTeam} />
}

const TeamSummary = ({
    BattingTeam,
    BowlingTeam,
}: {
    BattingTeam: TeamData
    BowlingTeam: TeamData
}) => {
    return (
        <>
            <div className="flex flex-row justify-between items-center px-4 border border-gray-400 rounded-md shadow-md p-1">
                <div>
                    {BattingTeam.totalRuns} - {BattingTeam.totalWickets} (
                    {BattingTeam.totalBallsBatted})
                </div>
                <div>1st innings</div>
            </div>
            <div className="flex flex-row gap-1">
                <div className="w-1/2 py-4">
                    <div className="relative w-full border border-gray-400 rounded-md p-2 pt-6">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-black font-semibold border border-gray-400 rounded-md">
                            Batting
                        </div>
                        <div className="flex flex-col space-y-1">
                            {BattingTeam.batting.map((player, i) => {
                                if (player.balls > 0)
                                    return (
                                        <div
                                            className="flex justify-between p-1"
                                            key={i}
                                        >
                                            <div>{i + 1} wicket</div>
                                            <div>
                                                {player.runs} ({player.balls})
                                            </div>
                                        </div>
                                    )
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 py-4">
                    <div className="relative w-full border border-gray-400 rounded-md p-2 pt-6">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-black font-semibold border border-gray-400 rounded-md">
                            Bowling
                        </div>
                        <div className="flex flex-col space-y-1">
                            {BowlingTeam.bowling.map((player, i) => (
                                <div
                                    className="flex justify-between p-1"
                                    key={i}
                                >
                                    <div>{i + 1}</div>
                                    <div>
                                        {player.runs}-{player.wickets}(
                                        {player.balls})
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
