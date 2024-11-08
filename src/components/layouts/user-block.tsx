'use client'
import { useCurrentUser } from '@/hooks/use-current-user'
import { getInitials } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOut } from '../auth/auth-buttons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const UserBlock = () => {
    const { data, isLoading } = useCurrentUser()
    //console.log('user', isLoading, data)
    const pathname = usePathname()
    //console.log('pathname', pathname)

    if (!isLoading) {
        return (
            <>
                {data ? (
                    <>
                        {pathname === '/' ? (
                            <Button>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage
                                                src={data.image}
                                                alt={data.name}
                                            />
                                            <AvatarFallback className="bg-blue-400">
                                                {getInitials(data.name!)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="p-2 text-sm">
                                        <div className="flex flex-col text-xs font-bold">
                                            <div>{data.name}</div>
                                            <div>{data.email}</div>
                                        </div>
                                        <DropdownMenuSeparator />

                                        <SignOut className="w-full" />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                    </>
                ) : (
                    <Button asChild>
                        <Link href="/login">Sign In</Link>
                    </Button>
                )}
            </>
        )
    }

    // Optionally, add a loading indicator if `isLoading` is true
    return null
}
