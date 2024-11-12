'use client'

import { LoaderPage } from '@/components/common/loader-page'
import { GameLayout } from '@/components/game/game-layout'
import { BatOrBowl } from '@/components/game/toss'
import { useMatchStore } from '@/store/match-store'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '../../../../../../convex/_generated/api'

export default function BotMatchPage() {
    const params = useParams<{ matchId: string }>()
    const toss = useMatchStore((state) => state.toss)
    const Init = useMatchStore((state) => state.InitMatch)
    const data = useQuery(api.matches.getMatchData, { matchId: params.matchId })

    // Initialize the match when data and matchId are available
    useEffect(() => {
        if (params.matchId && data) {
            Init(params.matchId, data)
        }
    }, [params.matchId, data, Init]) // Include data in dependency array

    // Render LoaderPage if data is still loading
    if (!data) {
        return <LoaderPage />
    }

    // Render either BatOrBowl component or GameLayout based on toss value
    return <>{toss === '' ? <BatOrBowl /> : <GameLayout />}</>
}
