import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export const useGetMatches = () => {
    const data = useQuery(api.matches.getMatches)
    const isLoading = data === undefined
    return { data, isLoading }
}
