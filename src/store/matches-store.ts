import { create } from 'zustand'

interface MatchFromDB {
    _creationTime: number
    _id: string
    botBalls?: number
    botRuns?: number
    botWickets?: number
    innings?: number | undefined
    result?: string
    resultBy?: string
    teamId: string
    toss?: string | undefined
    userBalls?: number
    userId: string
    userRuns?: number
    userWickets?: number
}

interface MatchListsState {
    isLoading: boolean
    matches: MatchFromDB[]
    InitMatches: (matches: MatchFromDB[]) => void
}

export const useMatchListsStore = create<MatchListsState>((set) => {
    //const botData = useBotStore.getState().bot
    //const userData = useUserStore.getState().user

    return {
        isLoading: true,
        matches: [],
        InitMatches: (matches: MatchFromDB[]) =>
            set({ matches, isLoading: false }),
    }
})
