'use client'

import { useGetMatches } from '@/api-hooks/use-matches'
import { useMatchListsStore } from '@/store/matches-store'
import { useEffect } from 'react'

export const InitMatches = () => {
    const { data, isLoading } = useGetMatches()
    const initMatches = useMatchListsStore((state) => state.InitMatches)

    useEffect(() => {
        if (data && !isLoading) {
            initMatches(data)
        }
    }, [data, isLoading, initMatches])

    return null // This component doesn't render anything
}
