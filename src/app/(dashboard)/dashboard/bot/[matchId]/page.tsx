'use client'

import { LoaderPage } from '@/components/common/loader-page'
import { GameLayout } from '@/components/game/game-layout'
import { BatOrBowl } from '@/components/game/toss'
import { useBotStore } from '@/store/bot-store'
import { useMatchStore } from '@/store/match-store'
import { useUserStore } from '@/store/user-store'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function BotMatchPage() {
    const params = useParams<{ matchId: string }>()
    const toss = useMatchStore((state) => state.toss)
    const Init = useMatchStore((state) => state.InitMatch)
    const userData = useUserStore((state) => state.user)
    const botData = useBotStore((state) => state.bot)

    // Initialize the match when matchId, userData, and botData are available
    useEffect(() => {
        if (params.matchId && userData && botData) {
            Init(params.matchId, userData, botData)
        }
    }, [params.matchId, userData, botData, Init]) // Corrected dependency array

    // Render LoaderPage if matchId, userData, or botData are not available
    if (!params.matchId || !userData || !botData) {
        return <LoaderPage />
    }

    // Render either BatOrBowl component or GameLayout based on toss value
    return <>{toss === '' ? <BatOrBowl /> : <GameLayout />}</>
}
