import NavBar from '@/components/NavBar'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center">
            <NavBar />
            {children}
        </div>
    )
}
