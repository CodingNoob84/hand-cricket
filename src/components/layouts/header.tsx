import Image from 'next/image'
import { UserBlock } from './user-block'

export const Header = () => {
    return (
        <nav className="flex justify-between items-center p-4 border-b-2">
            <div className="flex items-center space-x-2">
                <Image
                    src="/images/hand-cricket-logo.PNG"
                    alt="logo"
                    width={100}
                    height={40}
                />
            </div>
            <div className="flex flex-row gap-4">
                {/* <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img
                        className="aspect-square h-full w-full"
                        alt="User Profile"
                        src="/images/avatars/avatar1.jpg"
                    />
                </span> */}
                <UserBlock />
            </div>
        </nav>
    )
}
