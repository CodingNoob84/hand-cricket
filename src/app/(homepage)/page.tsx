import { AboutMe } from '@/components/home/about-me'
import { HeroSection } from '@/components/home/hero-section'
import { ReviewsSection } from '@/components/home/reviews-section'
import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'

export default function Home() {
    return (
        <div className="flex flex-col w-screen h-screen lg:max-w-xl mx-auto">
            <Header />
            <HeroSection />
            <ReviewsSection />
            <AboutMe />
            <Footer />
        </div>
    )
}
