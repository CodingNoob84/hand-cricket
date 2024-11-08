import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col w-screen h-screen lg:max-w-xl mx-auto">
            <Header />
            {children}
            <Footer />
        </div>
    )
}
