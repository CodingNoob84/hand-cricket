'use client'
import { useMatchListsStore } from '@/store/matches-store'
import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

function getDate(timestamp: number): string {
    const date = new Date(timestamp)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return date.toLocaleDateString(undefined, options) // Adjust the locale as needed
}

function getTime(timestamp: number): string {
    const date = new Date(timestamp)
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }
    return date.toLocaleTimeString(undefined, options) // Adjust the locale as needed
}

interface MatchProps {
    _id: string
    _creationTime: number
    toss?: string | undefined
    innings?: number | undefined
    result?: string | undefined
    resultBy?: string | undefined
    userRuns?: number | undefined
    userWickets?: number
    userBalls?: number
    botRuns?: number | undefined
    botWickets?: number
    botBalls?: number
    teamId: string
}

const getTeamScore = (match: MatchProps, innings: number): string => {
    if (match.toss == 'bat') {
        if (innings == 1) {
            return `${match.userRuns}-${match.userWickets} (${match.userBalls})`
        } else {
            return `${match.botRuns}-${match.botWickets} (${match.botBalls})`
        }
    } else if (match.toss == 'bowl') {
        if (innings == 1) {
            return `${match.botRuns}-${match.botWickets} (${match.botBalls})`
        } else {
            return `${match.userRuns}-${match.userWickets} (${match.userBalls})`
        }
    } else {
        return ''
    }
}

export const ListMatches = () => {
    const isLoading = useMatchListsStore((state) => state.isLoading)
    const matches = useMatchListsStore((state) => state.matches)
    console.log('data', matches)
    if (isLoading) {
        return (
            <div className="flex flex-col gap-2">
                {[...Array(2)].map((_, i) => (
                    <Card key={i} className="w-full max-w-md mx-auto">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Skeleton className="w-20 h-4" />
                                </div>
                                <div className="flex items-center">
                                    <Skeleton className="w-14 h-4" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="w-24 h-6" />
                                    <Skeleton className="w-16 h-6" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <Skeleton className="w-24 h-6" />
                                    <Skeleton className="w-16 h-6" />
                                </div>
                            </div>
                            <div className="text-center pt-2 border-t border-gray-200 space-y-2">
                                <Skeleton className="w-48 h-6 mx-auto" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }
    if (matches.length == 0) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="pt-6 space-y-4">
                    <p className="text-gray-500 text-lg">No matches found</p>
                </CardContent>
            </Card>
        )
    }
    if (matches.length > 0)
        return (
            <div className="flex flex-col gap-2">
                {matches.map((match, index) => (
                    <Card key={index} className="w-full max-w-md mx-auto">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{getDate(match._creationTime)}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{getTime(match._creationTime)}</span>
                                </div>
                            </div>

                            <div className="space-y-2 px-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">
                                        {match.toss == 'bat' ? 'User' : 'Bot'}
                                    </span>
                                    <span className="text-lg font-bold">
                                        {getTeamScore(match, 1)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">
                                        {match.toss == 'bowl' ? 'User' : 'Bot'}
                                    </span>
                                    <span className="text-lg font-bold">
                                        {getTeamScore(match, 2)}
                                    </span>
                                </div>
                            </div>

                            <div className="text-center pt-2 border-t border-gray-200 space-y-2">
                                <div
                                    className={`flex items-center justify-center `}
                                >
                                    <span className="text-sm font-semibold">
                                        {match.resultBy}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
}
