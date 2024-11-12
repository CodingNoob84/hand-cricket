import { Loader } from 'lucide-react'

export const LoaderPage = () => {
    return (
        <div className=" w-full h-full flex justify-center items-center">
            <Loader className="animate-spin" />
        </div>
    )
}
