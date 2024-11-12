import { StartGame } from '@/components/bot/start-game'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getInitials } from '@/lib/utils'
import Link from 'next/link'

export default function BotPage() {
    return (
        <div className="flex-grow flex flex-col overflow-auto lg:overflow-auto lg:h-screen">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-end justify-between px-4">
                    <div className="text-xl font-extrabold">
                        Play with our Bot
                    </div>
                    <Button asChild>
                        <Link href="/dashboard">back</Link>
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-full flex flex-col p-4 justify-center items-center mx-auto rounded-xl border bg-card text-card-foreground shadow">
                        <div>You are playing against</div>
                        <div className="w-full flex flex-row justify-center items-center my-4 gap-4">
                            <Avatar className="h-14 w-14 text-black">
                                <AvatarFallback className="text-black">
                                    {getInitials('Xabara Bot')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="text-md">Xabara Bot</div>
                                <p className="text-sm text-muted-foreground">
                                    Owner of Dark Devils
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-10">
                        <StartGame />
                    </div>
                </div>
            </div>
        </div>
    )
}
