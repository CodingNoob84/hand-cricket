'use client'
import { convertToOvers, getInitials } from '@/lib/utils'

import { TeamData, useMatchStore } from '@/store/match-store'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const TeamCard = ({ teamData }: { teamData: TeamData }) => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <Avatar>
                <AvatarImage src={teamData.userimage} alt={teamData.username} />
                <AvatarFallback>
                    {getInitials(teamData.username)}
                </AvatarFallback>
            </Avatar>

            <div className="text-center">
                <p className="font-semibold">{teamData.username}</p>
                <div className="flex items-center justify-center">
                    <p className="text-sm text-muted-foreground flex items-center space-x-1">
                        <span>{teamData.teamName}</span>
                        {teamData.isBatting ? (
                            <Image
                                src="/images/bat.png"
                                alt="bat"
                                width={20}
                                height={20}
                                className="inline-block ml-1"
                            />
                        ) : (
                            <Image
                                src="/images/ball.png"
                                alt="bat"
                                width={20}
                                height={20}
                                className="inline-block ml-1"
                            />
                        )}
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-end gap-2">
                <p className="text-2xl font-bold">
                    {teamData.totalRuns}/{teamData.totalWickets}
                </p>
                <p className="text-sm font-light">
                    ({convertToOvers(teamData.totalBallsBatted)})
                </p>
            </div>
        </div>
    )
}

export const UserTeamCard = () => {
    const userTeam = useMatchStore((state) => state.userTeam)
    return <TeamCard teamData={userTeam} />
}

export const BotTeamCard = () => {
    const botTeam = useMatchStore((state) => state.botTeam)
    return <TeamCard teamData={botTeam} />
}
