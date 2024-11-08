import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, Frown, Smile } from 'lucide-react'
import Link from 'next/link'

export default function MatchHistory() {
    return (
        <div className="flex-grow flex flex-col overflow-auto lg:overflow-auto lg:h-screen">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-end justify-between px-4">
                    <div className="text-xl font-extrabold">Past Matches</div>
                    <Button asChild>
                        <Link href="/dashboard">back</Link>
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <Card className="w-full max-w-md mx-auto">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>June 15, 2023</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>14:30 GMT</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">
                                        Team B
                                    </span>
                                    <span className="text-lg font-bold">
                                        341-2
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">
                                        Team A
                                    </span>
                                    <span className="text-lg font-bold">
                                        234-5
                                    </span>
                                </div>
                            </div>

                            <div className="text-center pt-2 border-t border-gray-200 space-y-2">
                                <div className="flex items-center justify-center text-green-500">
                                    <Smile className="w-5 h-5 mr-2 " />
                                    <span className="text-sm font-semibold">
                                        Team B won by 107 runs
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full max-w-md mx-auto">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>June 15, 2023</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>14:30 GMT</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">
                                        Team B
                                    </span>
                                    <span className="text-lg font-bold">
                                        341-2
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium">
                                        Team A
                                    </span>
                                    <span className="text-lg font-bold">
                                        234-5
                                    </span>
                                </div>
                            </div>

                            <div className="text-center pt-2 border-t border-gray-200 space-y-2">
                                <div className="flex items-center justify-center text-red-400">
                                    <Frown className="w-5 h-5 mr-2 " />
                                    <span className="text-sm font-semibold">
                                        Team B won by 107 runs
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
