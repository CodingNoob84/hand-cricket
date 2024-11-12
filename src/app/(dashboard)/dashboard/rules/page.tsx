import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RulesPage() {
    return (
        <div className="flex-grow flex flex-col overflow-auto md:overflow-auto md:h-full">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-end justify-between px-4">
                    <div className="text-xl font-extrabold">Rules</div>
                    <Button asChild>
                        <Link href="/dashboard">back</Link>
                    </Button>
                </div>
                <div>
                    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                                Hand Cricket Game Rules
                            </h1>

                            <p className="text-gray-700 mb-6">
                                <strong>Hand Cricket</strong> is a fun and
                                strategic game where players use numbers to
                                represent cricket scores. This game combines
                                skill, prediction, and strategy, similar to real
                                cricket. Here&apos;s how to play it
                                professionally:
                            </p>

                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Game Overview
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Hand Cricket is played between two players or
                                teams. Players score runs by selecting numbers,
                                and the opposing player must guess these
                                selections to take wickets.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Game Setup
                            </h2>
                            <ul className="list-disc list-inside text-gray-700 mb-4">
                                <li>
                                    <strong>Match Format:</strong> The game has
                                    two innings – one for batting and one for
                                    bowling per team. The goal is to set a
                                    target score and defend it.
                                </li>
                            </ul>

                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                How to Play
                            </h2>

                            <h3 className="text-lg font-semibold text-gray-800 mt-4">
                                1. Choosing to Bat or Bowl
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Start by choosing whether to bat or bowl. The
                                toss winner decides the starting action.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-800 mt-4">
                                2. Batting
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 mb-4">
                                <li>
                                    When batting, choose numbers (0, 1, 2, 3, 4,
                                    or 6) representing runs.
                                </li>
                                <li>
                                    If the bowler guesses the same number, you
                                    lose a wicket.
                                </li>
                                <li>
                                    All 5 players must bat. You have 5 wickets
                                    in hand.
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold text-gray-800 mt-4">
                                3. Bowling
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 mb-4">
                                <li>
                                    When bowling, try to guess the batter&apos;s
                                    chosen number to take a wicket.
                                </li>
                                <li>
                                    All 5 players must bowl at least one over (6
                                    balls each).
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold text-gray-800 mt-4">
                                4. Winning the Game
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 mb-4">
                                <li>
                                    Set a target score while batting and try to
                                    defend it while bowling.
                                </li>
                                <li>
                                    Or, restrict your opponent&apos;s score and
                                    chase it in your batting innings.
                                </li>
                            </ul>

                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Scoring
                            </h2>
                            <p className="text-gray-700">
                                Use hand gestures such as select numbers on
                                screen to represent:
                            </p>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>
                                    <span className="font-semibold">0:</span>
                                    Dot ball (no runs)
                                </li>
                                <li>
                                    <span className="font-semibold">1:</span>
                                    Single run
                                </li>
                                <li>
                                    <span className="font-semibold">2:</span>
                                    Two runs
                                </li>
                                <li>
                                    <span className="font-semibold">3:</span>
                                    Three runs
                                </li>
                                <li>
                                    <span className="font-semibold">4:</span>
                                    Four runs
                                </li>
                                <li>
                                    <span className="font-semibold">6:</span>
                                    Six runs
                                </li>
                            </ul>

                            <h2 className="text-xl font-semibold text-gray-800 mt-6">
                                Additional Tips
                            </h2>
                            <p className="text-gray-700">
                                Make strategic guesses to outsmart your
                                opponent. Play with strategy and enjoy this
                                unique version of cricket with hand gestures or
                                numbers!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
