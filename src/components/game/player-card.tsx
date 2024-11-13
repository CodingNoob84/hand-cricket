import { getPlayers, getPlayerScore } from '@/lib/utils'
import { Batting, Bowling, TeamData, useMatchStore } from '@/store/match-store'

export const BattingPlayerCard = ({
    data,
    wickets,
}: {
    data: Batting
    wickets: number
}) => {
    return (
        <div className="w-1/2">
            <div className="relative w-full border border-gray-400 rounded-md p-4 pt-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-black font-semibold border border-black rounded-md">
                    Batting
                </div>
                <div className="flex justify-between text-sm mt-2">
                    <div> {getPlayers(wickets + 1, 'bat')} </div>
                    <div>{getPlayerScore(data.runs, data.balls, 0, 'bat')}</div>
                </div>
            </div>
        </div>
    )
}

export const BowlingPlayerCard = ({
    data,
    overs,
}: {
    data: Bowling
    overs: number
}) => {
    return (
        <div className="w-1/2">
            <div className="relative w-full border border-gray-400 rounded-md p-4 pt-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-black font-semibold border border-black rounded-md">
                    Bowling
                </div>
                <div className="flex justify-between text-sm mt-2">
                    <div> {getPlayers(overs + 1, 'bowl')} </div>
                    <div>
                        {getPlayerScore(
                            data.runs,
                            data.balls,
                            data.wickets,
                            'bowl'
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PlayerCard = ({ teamData }: { teamData: TeamData }) => {
    const isBatting = teamData.isBatting

    if (isBatting) {
        const stats = teamData.batting
        return (
            <BattingPlayerCard
                data={stats[teamData.totalWickets]}
                wickets={teamData.totalWickets}
            />
        )
    } else {
        const stats = teamData.bowling
        const overs = Math.floor(teamData.totalBallsBowled / 6)
        return <BowlingPlayerCard data={stats[overs]} overs={overs} />
    }
}

export const UserPlayerCard = () => {
    const userTeam = useMatchStore((state) => state.userTeam)
    //console.log('userTeam', userTeam)
    return <PlayerCard teamData={userTeam} />
}

export const BotPlayerCard = () => {
    const botTeam = useMatchStore((state) => state.botTeam)
    //console.log('botTeam', botTeam)
    return <PlayerCard teamData={botTeam} />
}
