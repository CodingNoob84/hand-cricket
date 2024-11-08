import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function ReviewPage() {
    return (
        <div className="flex-grow flex flex-col overflow-auto lg:overflow-auto lg:h-screen">
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-end justify-end">
                    <Button asChild>
                        <Link href={'/dashboard'}>back</Link>
                    </Button>
                </div>
                <h1 className="text-2xl font-bold mb-4">Write a Review</h1>
                <form className="space-y-4">
                    <div>
                        <Label
                            htmlFor="rating"
                            className="block text-sm font-medium mb-2"
                        >
                            Rating
                        </Label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="sr-only"
                                    />
                                    <Star
                                        className={`w-8 h-8 text-yellow-400 fill-yellow-400`}
                                    />
                                    <span className="sr-only">
                                        {star} stars
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label
                            htmlFor="description"
                            className="block text-sm font-medium mb-2"
                        >
                            Review Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Write your review here..."
                            rows={4}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Submit Review
                    </Button>
                </form>
            </div>
        </div>
    )
}
