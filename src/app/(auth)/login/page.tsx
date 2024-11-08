import { SignIn } from '@/components/auth/auth-buttons'
import Image from 'next/image'

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/images/hand-cricket-logo.png"
                        alt="Hand Cricket Logo"
                        width={100}
                        height={40}
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Sign in to continue to Hand Cricket
                </p>
                <SignIn>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="mr-2"
                    >
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
                    </svg>
                    Sign in with Google
                </SignIn>

                <p className="text-center text-gray-400 mt-4 text-sm">
                    By signing in, you agree to our Terms of Service and Privacy
                    Policy.
                </p>
            </div>
        </div>
    )
}
