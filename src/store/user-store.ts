import { create } from 'zustand'

export interface UserTeamData {
    userId: string
    userName: string
    userEmail: string
    userImage: string
    teamId: string
    teamName: string
    teamTagline: string
}

interface UserData {
    _id: string
    name: string
    image: string
    email: string
}

interface TeamData {
    teamId: string
    teamName: string
    teamTagline: string
}

interface UserStore {
    user: UserTeamData | null
    initUser: (userData: UserData, teamData: TeamData) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    initUser: (userData, teamData) => {
        set({
            user: {
                userId: userData._id,
                userName: userData.name,
                userEmail: userData.email,
                userImage: userData.image,
                teamId: teamData.teamId,
                teamName: teamData.teamName,
                teamTagline: teamData.teamTagline,
            },
        })
    },
}))
