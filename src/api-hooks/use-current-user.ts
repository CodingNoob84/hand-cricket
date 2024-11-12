import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export const useCurrentUser = () => {
    const data = useQuery(api.users.currentUser)
    const isLoading = data === undefined
    return { data, isLoading }
}

export const useTeam = () => {
    const teamData = useQuery(api.teams.getCurrenTeam)
    const userData = useQuery(api.users.currentUser)
    //console.log('userDtaa', userData)
    const isLoading = teamData === undefined || userData === undefined
    return { teamData, userData, isLoading }
}
