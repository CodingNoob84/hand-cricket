'use client'

import { useTeam } from '@/api-hooks/use-current-user'
import { useUserStore } from '@/store/user-store'
import Link from 'next/link'
import { useEffect } from 'react'
import { LoaderPage } from '../common/loader-page'
import { Button } from '../ui/button'
import { CreateTeam } from './create-edit-block'

export const DashboardInitBlock = () => {
    const { teamData, userData, isLoading } = useTeam()
    const initUser = useUserStore((state) => state.initUser)
    const user = useUserStore((state) => state.user)
    useEffect(() => {
        if (!isLoading && userData && teamData) {
            initUser(
                {
                    _id: userData._id,
                    name: userData.name ?? '',
                    image: userData.image ?? '',
                    email: userData.email ?? '',
                },
                {
                    teamId: teamData._id,
                    teamName: teamData.teamName,
                    teamTagline: teamData.teamTagline,
                }
            )
        }
    }, [isLoading, userData, teamData, initUser])

    return (
        <>
            {user ? (
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center">
                        <CreateTeam />
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
                            <Link href="/dashboard/review">
                                Give us a Review
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <LoaderPage />
            )}
        </>
    )
}
