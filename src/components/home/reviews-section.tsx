import Image from 'next/image'

const REVIEWS = [
    {
        name: 'Virat Kohli',
        image: '/images/avatars/avatar1.jpg',
        quote: 'This game brings back childhood memories! The hand gestures make it so much fun.',
    },
    {
        name: 'Ravi Shastri',
        image: '/images/avatars/avatar2.jpg',
        quote: 'I love the simplicity and nostalgia of Hand Cricket. Great way to pass time!',
    },
    {
        name: 'Don Bradman',
        image: '/images/avatars/avatar3.jpg',
        quote: 'An engaging and fun game. My friends and I play it often, reliving our school days!',
    },
]

export const ReviewsSection = () => {
    return (
        <section className="p-6 bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">
                What Users Say about Game
            </h2>
            <div className="space-y-6">
                {REVIEWS.map((review, i) => (
                    <div
                        key={i}
                        className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-md"
                    >
                        <div className="flex items-start">
                            <Image
                                src={review.image}
                                alt={review.name}
                                width={60}
                                height={60}
                                className="rounded-full mr-4"
                            />
                            <div className="flex flex-col">
                                <blockquote className="text-gray-700 italic">
                                    {review.quote}
                                </blockquote>
                                <span className="mt-2 font-semibold text-gray-900">
                                    - {review.name}.
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
