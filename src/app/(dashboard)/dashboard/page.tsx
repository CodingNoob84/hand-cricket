import { DashboardInitBlock } from '@/components/dashboard/init-block'
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
                <DashboardInitBlock />
            </div>
        </div>
    )
}
