import { Button } from '@/components/ui/button'

export default function DashBoardPage() {
    return (
        <div className="flex-grow flex flex-col overflow-auto lg:overflow-auto lg:h-screen">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-end justify-between">
                    <Button variant={'secondary'}>Home</Button>
                    <Button variant={'secondary'}>Rules</Button>
                </div>
                <div className="flex justify-center">
                    {/* <TeamCard
                userId={'b949a8d3-6609-4420-bbf0-0ac85961bcf1'}
            /> */}
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full max-w-md">
                        Play with our Bot
                    </Button>
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full max-w-md">
                        Play with your friends
                    </Button>
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full max-w-md">Match History</Button>
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full max-w-md">
                        Give us a Review
                    </Button>
                </div>
            </div>
        </div>
    )
}
