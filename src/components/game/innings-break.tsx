import { useMatchStore } from '@/store/match-store'
import Image from 'next/image'
import { Button } from '../ui/button'

export const InningsBreak = () => {
    const switchInnings = useMatchStore((state) => state.switchInnings)
    return (
        <div className="w-full h-full flex flex-col">
            {/* Top half - Image with Blur Effect */}
            <div className="h-1/2 relative overflow-hidden">
                <Image
                    src="/images/inningsbreak.jpg"
                    alt="Innings Break"
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent"></div>
            </div>

            {/* Bottom half - Scorecard, Commentary, and Restart Button */}
            <div className="h-1/2 bg-gray-100 p-6 flex flex-col justify-between">
                <ScoreCard />

                <Button
                    onClick={() => switchInnings()}
                    className="w-full max-w-md mx-auto mt-6"
                >
                    Start Second Innings
                </Button>
            </div>
        </div>
    )
}

const ScoreCard = () => {
    const toss = useMatchStore((state) => state.toss)
    const userTeam = useMatchStore((state) => state.userTeam)
    const botTeam = useMatchStore((state) => state.botTeam)
    if (toss == 'bat') {
        return (
            <div className="flex flex-col items-center">
                <div className="border border-gray-400 rounded-xl p-6 w-full max-w-md bg-white shadow">
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-400 pb-2 text-center">
                        Scorecard
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between text-lg">
                            <span className="font-semibold">
                                {userTeam.teamName}
                            </span>
                            <span>
                                {userTeam.totalRuns}-{userTeam.totalWickets} (
                                {userTeam.totalBallsBatted} balls)
                            </span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span className="font-semibold">
                                {botTeam.teamName}
                            </span>
                            <span>0-0 (0 balls)</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-gray-700">
                        {userTeam.teamName} has set a target of{' '}
                        {userTeam.totalRuns + 1} runs. Now, you need to defend
                        this.
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center">
            <div className="border border-gray-400 rounded-xl p-6 w-full max-w-md bg-white shadow">
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-400 pb-2 text-center">
                    Scorecard
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                        <span className="font-semibold">
                            {botTeam.teamName}
                        </span>
                        <span>
                            {botTeam.totalRuns}-{botTeam.totalWickets} (
                            {botTeam.totalBallsBatted} balls)
                        </span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span className="font-semibold">
                            {userTeam.teamName}
                        </span>
                        <span>0-0 (0 balls)</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 text-center">
                <p className="text-gray-700">
                    {botTeam.teamName} has set a target of{' '}
                    {botTeam.totalRuns + 1} runs. Now, you need to chase this.
                </p>
            </div>
        </div>
    )
}
