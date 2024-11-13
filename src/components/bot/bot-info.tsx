'use client'
import { getInitials } from '@/lib/utils'
import { useBotStore } from '@/store/bot-store'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const BotInfo = () => {
    const botData = useBotStore((state) => state.bot)
    console.log(botData)
    return (
        <div className="w-full flex flex-col p-4 justify-center items-center mx-auto rounded-xl border bg-card text-card-foreground shadow">
            <div>You are playing against</div>
            <div className="w-full flex flex-row justify-center items-center my-4 gap-4">
                <Avatar className="h-14 w-14 text-black">
                    <AvatarImage src={botData.botImage} alt={botData.botName} />
                    <AvatarFallback className="text-black">
                        {getInitials(botData.botName)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="text-md">{botData.botName}</div>
                    <p className="text-sm text-muted-foreground">
                        Owner of {botData.botTeamName}
                    </p>
                </div>
            </div>
        </div>
    )
}
