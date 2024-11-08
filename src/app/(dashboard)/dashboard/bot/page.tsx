import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { getInitials } from '@/lib/utils'
import { Play } from 'lucide-react'
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
                    <div className="w-full flex justify-center items-center max-w-md mx-auto rounded-xl border bg-card text-card-foreground shadow">
                        <div className="flex flex-row items-center my-4 gap-4">
                            <Avatar className="h-14 w-14 text-black">
                                <AvatarFallback className="text-black">
                                    {getInitials('Chennai Supper Kings')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <CardTitle className="text-xl">
                                    Chennai Supper Kings
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Owned by karthik
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center max-w-md mx-auto rounded-xl border bg-card text-card-foreground shadow">
                        <div className="w-full flex flex-col items-center my-4 gap-4 px-4">
                            <div>Playing 5</div>
                            <div className="border border-b-gray-500 w-full"></div>
                            <div>Player 1</div>
                            <div>Player 2</div>
                            <div>Player 3</div>
                            <div>Player 4</div>
                            <div>Player 5</div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <Button>
                            <Play /> Start
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
