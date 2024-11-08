import { Button } from '@/components/ui/button'
import { Construction, Hammer, Wrench } from 'lucide-react'
import Link from 'next/link'

export default function PlayWithFriendsPage() {
    return (
        <div className="flex-grow flex flex-col overflow-auto lg:overflow-auto lg:h-screen">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-end justify-between px-4">
                    <div className="text-xl font-extrabold">
                        Play with your friends
                    </div>
                    <Button asChild>
                        <Link href="/dashboard">back</Link>
                    </Button>
                </div>
                <div className="h-[100px] w-full flex justify-center items-center">
                    <Construction /> <Hammer /> <Wrench /> Under Construction{' '}
                    <Wrench /> <Hammer />
                    <Construction />
                </div>
            </div>
        </div>
    )
}
