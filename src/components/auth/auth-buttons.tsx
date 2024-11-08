'use client'
import { useAuthActions } from '@convex-dev/auth/react'
import { ReactNode } from 'react'
import { Button } from '../ui/button'

export const SignIn = ({ children }: { children: ReactNode }) => {
    const { signIn } = useAuthActions()
    return (
        <button
            className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            onClick={() => signIn('google')}
        >
            {children}
        </button>
    )
}

export const SignOut = ({ className }: { className?: string }) => {
    const { signOut } = useAuthActions()
    return (
        <Button className={className} onClick={() => void signOut()}>
            Sign Out
        </Button>
    )
}
