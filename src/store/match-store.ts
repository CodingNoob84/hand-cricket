import {
    BALLSPEROVER,
    BOT_RUNS,
    BOT_THINKING,
    TOTALOVERS,
    TOTALWICKETS,
} from '@/lib/contants'
import { create } from 'zustand'
import { Bot } from './bot-store'
import { UserTeamData } from './user-store'

export const getRandomNumber = () => {
    const Numbers = BOT_RUNS
    return Numbers[Math.floor(Math.random() * Numbers.length)]
}

// Helper function to initialize the batting array
const initializeBattingArray = (wickets: number): Batting[] => {
    return Array(wickets).fill({ runs: 0, balls: 0 })
}

// Helper function to initialize the bowling array
const initializeBowlingArray = (overs: number): Bowling[] => {
    return Array(overs).fill({ runs: 0, balls: 0, wickets: 0 })
}

export interface Batting {
    runs: number
    balls: number
}

export interface Bowling {
    runs: number
    balls: number
    wickets: number
}

export interface TeamData {
    teamId: string
    teamName: string
    teamTagline: string
    username: string
    userimage: string
    isBatting: boolean
    totalRuns: number
    totalWickets: number
    totalBallsBatted: number
    totalBallsBowled: number
    batting: Batting[] // Array to store batting data per over/player
    bowling: Bowling[] // Array to store bowling data per over/player
}

export interface DBUpdateData {
    toss: 'bat' | 'bowl' | ''
    result: string
    resultBy: string
    userRuns: number
    userWickets: number
    userBalls: number
    botRuns: number
    botWickets: number
    botBalls: number
}

export interface MatchStore {
    selectedNumber: number
    systemNumber: number
    isSelectionLoading: boolean
    matchId: string
    toss: 'bat' | 'bowl' | ''
    innings: number
    isInningsEnded: boolean
    result: string
    resultBy: string
    userTeam: TeamData
    botTeam: TeamData
    InitMatch: (
        matchId: string,
        userdata: Partial<UserTeamData>,
        botData: Partial<Bot>
    ) => void
    updateToss: (toss: 'bat' | 'bowl' | '') => void
    getTeams: () => { userTeam: TeamData; botTeam: TeamData }
    setSelectedNumber: (number: number) => void
    resetSystemNumber: () => void
    handleScore: () => void
    getRunRate: () => string
    switchInnings: () => void
    toUpdateDB: () => DBUpdateData
}

export const useMatchStore = create<MatchStore>((set, get) => ({
    systemNumber: 5,
    selectedNumber: 5,
    isSelectionLoading: false,
    matchId: '',
    toss: '',
    innings: 0,
    isInningsEnded: false,
    result: '',
    resultBy: '',
    userTeam: {
        teamId: '',
        teamName: '',
        teamTagline: '',
        username: '',
        userimage: '',
        isBatting: false,
        totalRuns: 0,
        totalWickets: 0,
        totalBallsBatted: 0,
        totalBallsBowled: 0,
        batting: initializeBattingArray(TOTALWICKETS),
        bowling: initializeBowlingArray(TOTALOVERS),
    },
    botTeam: {
        teamId: 'bot-team-id',
        teamName: 'Bot Team',
        teamTagline: 'Competing against you!',
        username: 'Bot',
        userimage: '/images/bot-image.png',
        isBatting: false,
        totalRuns: 0,
        totalWickets: 0,
        totalBallsBatted: 0,
        totalBallsBowled: 0,
        batting: initializeBattingArray(TOTALWICKETS),
        bowling: initializeBowlingArray(TOTALOVERS),
    },

    InitMatch: (
        matchId: string,
        userdata: Partial<UserTeamData>,
        botData: Partial<Bot>
    ) => {
        set({
            matchId,
            systemNumber: 5,
            selectedNumber: 5,
            isSelectionLoading: false,
            toss: '',
            innings: 0,
            isInningsEnded: false,
            result: '',
            resultBy: '',
            userTeam: {
                teamId: userdata.teamId || '',
                teamName: userdata.teamName || 'Default Team',
                teamTagline: userdata.teamTagline || 'No tagline provided',
                username: userdata.userName || 'Unknown User',
                userimage: userdata.userImage || '/images/default-user.png',
                isBatting: false,
                totalRuns: 0,
                totalWickets: 0,
                totalBallsBatted: 0,
                totalBallsBowled: 0,
                batting: initializeBattingArray(TOTALWICKETS),
                bowling: initializeBowlingArray(TOTALOVERS),
            },
            botTeam: {
                teamId: botData.botId || '0',
                teamName: botData.botTeamName || 'Dark Devil',
                teamTagline: botData.botTeamTagLine || 'Competing against you!',
                username: botData.botName || 'Xabara Bot',
                userimage: botData.botImage || '/images/bot-image.png',
                isBatting: false,
                totalRuns: 0,
                totalWickets: 0,
                totalBallsBatted: 0,
                totalBallsBowled: 0,
                batting: initializeBattingArray(TOTALWICKETS),
                bowling: initializeBowlingArray(TOTALOVERS),
            },
        })
    },

    updateToss: (toss) => {
        set({
            toss,
            innings: 1,
            userTeam: {
                ...get().userTeam,
                isBatting: toss === 'bat',
            },
            botTeam: {
                ...get().botTeam,
                isBatting: toss === 'bowl',
            },
        })
    },

    getTeams: () => {
        const { userTeam, botTeam } = get()
        return { userTeam, botTeam }
    },
    setSelectedNumber: (number: number) => {
        set({ selectedNumber: number })
    },
    resetSystemNumber: () => {
        set({ systemNumber: 5 })
    },
    handleScore: () => {
        set({ isSelectionLoading: true })

        setTimeout(() => {
            set((state) => {
                const BotNumber = getRandomNumber()

                // Call updateScore and get the modified state
                const updatedState = updateScore(state, BotNumber)

                return {
                    ...updatedState,
                    isSelectionLoading: false,
                    systemNumber: BotNumber,
                }
            })
        }, BOT_THINKING * 1000)
    },
    getRunRate: () => {
        const { innings, userTeam, botTeam } = get()
        const battingTeam = userTeam.isBatting ? userTeam : botTeam
        const bowlingTeam = userTeam.isBatting ? botTeam : userTeam

        if (innings === 1) {
            // Calculate the current run rate for the first innings
            const ballsBatted = battingTeam.totalBallsBatted || 1 // avoid division by zero
            const runRate = (battingTeam.totalRuns / ballsBatted) * BALLSPEROVER
            return `Current run rate : ${runRate.toFixed(2)}` // Convert to string with 2 decimal places
        } else if (innings === 2) {
            // Calculate the required run rate for the second innings
            const remainingBalls =
                TOTALOVERS * BALLSPEROVER - battingTeam.totalBallsBatted
            if (remainingBalls <= 0) return '0.00' // avoid division by zero and return as a string
            const requiredRunRate =
                ((bowlingTeam.totalRuns - battingTeam.totalRuns) /
                    remainingBalls) *
                BALLSPEROVER
            return `Required run rate ${requiredRunRate.toFixed(2)}` // Convert to string with 2 decimal places
        }

        return '0.00' // Default return as a string if conditions are not met
    },
    switchInnings: () => {
        const { innings, isInningsEnded } = get()

        if (innings === 1 && isInningsEnded) {
            set((state) => ({
                selectedNumber: 5,
                systemNumber: 5,
                innings: 2,
                userTeam: {
                    ...state.userTeam,
                    isBatting: !state.userTeam.isBatting,
                },
                botTeam: {
                    ...state.botTeam,
                    isBatting: !state.botTeam.isBatting,
                },
                isInningsEnded: false, // Reset isInningsEnded for the new inning
            }))
        }
    },
    toUpdateDB: () => {
        const { toss, result, resultBy, userTeam, botTeam } = get()

        return {
            toss,
            result,
            resultBy,
            userRuns: userTeam.totalRuns,
            userWickets: userTeam.totalWickets,
            userBalls: userTeam.totalBallsBatted,
            botRuns: botTeam.totalRuns,
            botWickets: botTeam.totalWickets,
            botBalls: botTeam.totalBallsBatted,
        }
    },
}))

const updateScore = (state: MatchStore, BotNumber: number) => {
    const isScoreMatch = state.selectedNumber === BotNumber
    const innings = state.innings
    // Determine which team is batting and which team is bowling
    const battingTeam = state.userTeam.isBatting
        ? state.userTeam
        : state.botTeam
    const bowlingTeam = state.userTeam.isBatting
        ? state.botTeam
        : state.userTeam

    // Update batting team's balls batted and runs if there's a score
    const updatedBattingTeam = {
        ...battingTeam,
        batting: [...battingTeam.batting], // Deep copy of batting array
    }
    const updatedBowlingTeam = {
        ...bowlingTeam,
        bowling: [...bowlingTeam.bowling], // Deep copy of bowling array
    }

    // Calculate current over index
    const BattingIndex = updatedBattingTeam.totalWickets
    const BowlingIndex = Math.floor(updatedBowlingTeam.totalBallsBowled / 6)
    console.log('BowlingIndex', BowlingIndex)

    // If the score matches, update the wicket count
    if (isScoreMatch) {
        updatedBattingTeam.totalWickets += 1
        updatedBattingTeam.batting[BattingIndex] = {
            ...updatedBattingTeam.batting[BattingIndex], // Copy only this specific index
            balls: updatedBattingTeam.batting[BattingIndex].balls + 1,
        }
        updatedBowlingTeam.bowling[BowlingIndex] = {
            ...updatedBowlingTeam.bowling[BowlingIndex], // Copy only this specific index
            balls: updatedBowlingTeam.bowling[BowlingIndex].balls + 1,
            wickets: updatedBowlingTeam.bowling[BowlingIndex].wickets + 1,
        }
    } else {
        // Add runs to batting team and bowler stats if score does not match
        const runsScored = state.userTeam.isBatting
            ? state.selectedNumber
            : BotNumber
        // for runsScored userTeam when isBatting true use selectedNumber
        // for botTeam when isbatting true use BotNumber
        updatedBattingTeam.totalRuns += runsScored
        updatedBattingTeam.batting[BattingIndex] = {
            ...updatedBattingTeam.batting[BattingIndex], // Copy only this specific index
            runs: updatedBattingTeam.batting[BattingIndex].runs + runsScored,
            balls: updatedBattingTeam.batting[BattingIndex].balls + 1,
        }
        updatedBowlingTeam.bowling[BowlingIndex] = {
            ...updatedBowlingTeam.bowling[BowlingIndex], // Copy only this specific index
            runs: updatedBowlingTeam.bowling[BowlingIndex].runs + runsScored,
            balls: updatedBowlingTeam.bowling[BowlingIndex].balls + 1,
        }
    }
    updatedBattingTeam.totalBallsBatted += 1
    updatedBowlingTeam.totalBallsBowled += 1

    // Check if the innings has ended (either all wickets are lost or overs are completed)
    // Check if the innings has ended (either all wickets are lost or overs are completed)
    let isInningsEnded =
        updatedBattingTeam.totalWickets === TOTALWICKETS ||
        updatedBattingTeam.totalBallsBatted >= TOTALOVERS * BALLSPEROVER

    const isTargetChased =
        updatedBattingTeam.totalRuns > updatedBowlingTeam.totalRuns

    // Handle end of innings and determine game result in the second inning
    let result = state.result
    let resultBy = ''

    if (innings === 2) {
        if (isTargetChased) {
            // Determine the match result based on which team is batting
            if (state.toss === 'bat') {
                result = 'defeated'
                resultBy = `lost by ${TOTALWICKETS - updatedBattingTeam.totalWickets} wickets`
            } else {
                result = 'won'
                resultBy = `won by ${TOTALWICKETS - updatedBattingTeam.totalWickets} wickets`
            }
        } else if (isInningsEnded) {
            // Handle the scenario where the innings ends without chasing the target
            const runDifference = Math.abs(
                updatedBattingTeam.totalRuns - updatedBowlingTeam.totalRuns
            )
            if (state.toss === 'bat') {
                result = 'won'
                resultBy = `won by ${runDifference} runs`
            } else {
                result = 'defeated'
                resultBy = `lost by ${runDifference} runs`
            }
        }
    }

    if (innings == 2) {
        isInningsEnded = isInningsEnded || isTargetChased
    }

    // Update state for current inning
    return {
        ...state,
        userTeam: state.userTeam.isBatting
            ? updatedBattingTeam
            : updatedBowlingTeam,
        botTeam: state.userTeam.isBatting
            ? updatedBowlingTeam
            : updatedBattingTeam,
        isInningsEnded,
        result,
        resultBy,
    }
}
