'use client'
import { ListMatches } from '@/components/history/list-matches'
import { Button } from '@/components/ui/button'
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
                <ListMatches />
            </div>
        </div>
    )
}
