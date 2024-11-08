import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export const HeroSection = () => {
    return (
        <div className="flex-grow flex flex-col items-center text-center p-6">
            <h1 className="text-4xl font-extrabold mt-4 text-gray-800 tracking-tight">
                Welcome to <span className="text-blue-600">Hand Cricket</span>
            </h1>
            <p className="mt-2 text-xl text-gray-700 max-w-lg">
                Play the classic hand cricket game with friends or online and
                experience the thrill of cricket using simple number gestures.
                Test your strategy and intuition by predicting your
                opponent&apos;s moves!
            </p>

            <Button
                className="my-6 text-lg font-semibold bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                asChild
            >
                <Link href="/login"> Get Started </Link>
            </Button>

            <Image
                src="/images/hand-cricket-banner.jpg"
                alt="Hand Cricket Banner"
                width={500}
                height={300}
                className="my-8 rounded-xl shadow-lg mb-6 transform hover:scale-105 transition duration-500 ease-in-out"
            />
        </div>
    )
}
