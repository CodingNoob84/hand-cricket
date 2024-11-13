'use client'

import { convertToOvers, getPlayers, getPlayerScore } from '@/lib/utils'
import { TeamData, useMatchStore } from '@/store/match-store'
import { useMutation } from 'convex/react'
import { ChevronsRight, Trophy, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

interface Player {
    runs: number
    balls: number
    wickets?: number | undefined
}

interface InningsSectionProps {
    title: string
    BattingTeam: TeamData
    BowlingTeam: TeamData
}

interface ScoreCardProps {
    title: string
    icon: string
    players: Player[]
}

export default function CricketSummary() {
    const updateMatch = useMutation(api.matches.updateMatch)
    const matchId = useMatchStore((state) => state.matchId)
    const getData = useMatchStore((state) => state.toUpdateDB)
    const data = getData()
    //const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        // Only run if matchId and getData() are available
        if (matchId && data) {
            const updateMatchData = async () => {
                try {
                    await updateMatch({
                        matchId: matchId as Id<'matches'>,
                        data: data,
                    })
                } catch (error) {
                    console.error('Error updating match:', error)
                } finally {
                    setShow(true)
                }
            }

            updateMatchData()
        }
    }, [matchId, data, updateMatch])
    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="h-full">
                <TossBlock />
                <div className="mt-6">
                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="p-6 pt-0 space-y-6 mt-4">
                            <FirstInnings />
                            <hr className="shrink-0 bg-border h-[1px] w-full" />
                            <SecondInnings />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <ResultBlock />
                </div>

                {show && (
                    <div className="flex justify-center mt-6">
                        <Link href="/dashboard" passHref>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 font-semibold text-sm sm:text-base">
                                Back to Dashboard
                                <ChevronsRight className="ml-2 h-4 w-4" />
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

const TossBlock = () => {
    const toss = useMatchStore((state) => state.toss)
    return (
        <div className="rounded-xl border bg-card shadow bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex flex-col space-y-1.5 p-4">
                <div className="tracking-tight text-xl sm:text-2xl font-bold text-center">
                    Match Summary
                </div>
            </div>
            <div className="p-4 pt-0 text-center">
                <p className="text-sm sm:text-lg">
                    You won the toss and elected to {toss} first
                </p>
            </div>
        </div>
    )
}

const FirstInnings = () => {
    const toss = useMatchStore((state) => state.toss)
    const userTeam = useMatchStore((state) => state.userTeam)
    const botTeam = useMatchStore((state) => state.botTeam)
    const BattingTeam = toss == 'bat' ? userTeam : botTeam
    const BowlingTeam = toss == 'bowl' ? userTeam : botTeam
    return (
        <InningsSection
            title="1st Innings"
            BattingTeam={BattingTeam}
            BowlingTeam={BowlingTeam}
        />
    )
}

const SecondInnings = () => {
    const toss = useMatchStore((state) => state.toss)
    const userTeam = useMatchStore((state) => state.userTeam)
    const botTeam = useMatchStore((state) => state.botTeam)
    const BattingTeam = toss != 'bat' ? userTeam : botTeam
    const BowlingTeam = toss != 'bowl' ? userTeam : botTeam
    return (
        <InningsSection
            title="2nd Innings"
            BattingTeam={BattingTeam}
            BowlingTeam={BowlingTeam}
        />
    )
}

const InningsSection = ({
    title,
    BattingTeam,
    BowlingTeam,
}: InningsSectionProps) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 bg-secondary text-secondary-foreground text-md font-extrabold">
                    {BattingTeam.totalRuns} - {BattingTeam.totalWickets} (
                    {convertToOvers(BattingTeam.totalBallsBatted)})
                </div>
            </div>
            <div className="flex flex-row space-x-4 overflow-x-auto pb-2">
                <ScoreCard
                    title="Batting"
                    icon="/images/bat.png"
                    players={BattingTeam.batting}
                />
                <ScoreCard
                    title="Bowling"
                    icon="/images/ball.png"
                    players={BowlingTeam.bowling}
                />
            </div>
        </div>
    )
}

function ScoreCard({ title, icon, players }: ScoreCardProps) {
    const toss = title == 'Batting' ? 'bat' : 'bowl'
    return (
        <div className="border rounded-lg p-3 sm:p-4 min-w-[150px] flex-1">
            <h4 className="flex items-center text-sm sm:text-base font-semibold mb-2">
                <Image src={icon} alt={title} width="20" height="20" />
                <span className="ml-2">{title}</span>
            </h4>
            <div className="space-y-1 sm:space-y-2">
                {players.map((player, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center"
                    >
                        <span className="text-xs sm:text-sm font-medium">
                            {getPlayers(index + 1, toss)}
                        </span>
                        <span className="text-xs sm:text-sm">
                            {getPlayerScore(
                                player.runs,
                                player.balls,
                                player?.wickets ?? 0,
                                toss
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const ResultBlock = () => {
    const result = useMatchStore((state) => state.result)
    return <>{result == 'won' ? <WonResultCard /> : <LostResultCard />}</>
}

const WonResultCard = () => {
    const resultBy = useMatchStore((state) => state.resultBy)
    return (
        <div
            className={`rounded-xl border bg-card shadow bg-gradient-to-r from-green-400 to-emerald-600 text-white w-full max-w-md`}
        >
            <div className="flex items-center justify-center p-4 sm:p-6">
                <Trophy className="w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-4" />
                <p className="text-lg sm:text-2xl font-bold">
                    You have {resultBy}!
                </p>
            </div>
        </div>
    )
}

const LostResultCard = () => {
    const resultBy = useMatchStore((state) => state.resultBy)
    return (
        <div
            className={`rounded-xl border bg-card shadow bg-gradient-to-r from-red-400 to-red-600 text-white w-full max-w-md`}
        >
            <div className="flex items-center justify-center p-4 sm:p-6">
                <XCircle className="w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-4" />
                <p className="text-lg sm:text-2xl font-bold">
                    You have {resultBy}
                </p>
            </div>
        </div>
    )
}
