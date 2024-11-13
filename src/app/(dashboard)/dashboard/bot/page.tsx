import { BotInfo } from '@/components/bot/bot-info'
import { Rules } from '@/components/bot/rules'
import { StartGame } from '@/components/bot/start-game'
import { Button } from '@/components/ui/button'
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
                    <BotInfo />
                    <Rules />
                    <div className="flex justify-center items-center mt-10">
                        <StartGame />
                    </div>
                </div>
            </div>
        </div>
    )
}
