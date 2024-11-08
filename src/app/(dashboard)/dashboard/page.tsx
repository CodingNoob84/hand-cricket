import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashBoardPage() {
    return (
        <div className="flex-grow flex flex-col overflow-auto lg:overflow-auto lg:h-screen">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-end justify-between">
                    <Button variant={'secondary'} asChild>
                        <Link href="/">Home</Link>
                    </Button>
                    <Button variant={'secondary'} asChild>
                        <Link href="/dashboard/rules">Rules</Link>
                    </Button>
                </div>
                <div className="flex justify-center">
                    {/* <TeamCard
                userId={'b949a8d3-6609-4420-bbf0-0ac85961bcf1'}
            /> */}
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full max-w-md" asChild>
                        <Link href="/dashboard/bot">Play with our Bot</Link>
                    </Button>
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full max-w-md" asChild>
                        <Link href="/dashboard/friends">
                            Play with your friends
                        </Link>
                    </Button>
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full max-w-md" asChild>
                        <Link href="/dashboard/matchhistory">
                            Match History
                        </Link>
                    </Button>
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full max-w-md" asChild>
                        <Link href="/dashboard/review">Give us a Review</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
