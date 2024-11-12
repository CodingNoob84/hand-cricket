'use client'
import { useMutation, useQuery } from 'convex/react'
import { Loader, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { Button } from '../ui/button'

export const StartGame = () => {
    const [isStarting, setIsStarting] = useState(false)
    const data = useQuery(api.teams.getTeamId)
    const InitMatch = useMutation(api.matches.createMatch)
    const router = useRouter()

    const handleStart = async () => {
        if (!data) return

        setIsStarting(true) // Start loading indication
        try {
            const matchId = await InitMatch({
                userId: data.userId,
                teamId: data.teamId,
            })
            console.log('Match ID:', matchId) // Optionally handle the match ID here
            router.push(`/dashboard/bot/${matchId}`) // Redirect to the match page
        } catch (error) {
            console.error('Failed to start match:', error)
        } finally {
            setIsStarting(false) // Stop loading indication
        }
    }

    if (!data) {
        return <Button disabled>Loading...</Button>
    }

    return (
        <Button onClick={handleStart} disabled={isStarting}>
            {isStarting ? <Loader className="animate-spin" /> : <Play />}
            {isStarting ? ' Starting...' : ' Start'}
        </Button>
    )
}
