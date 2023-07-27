'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

type NavBarProps = {
    userEmail: string
    onSignOut: () => Promise<void>
}

const NavBar: React.FC<NavBarProps> = ({ userEmail, onSignOut }) => {
    const router = useRouter()
    console.log(userEmail)

    // Create a Supabase client configured to use cookies
    const supabase = createClientComponentClient()

    const signOut = async () => {
        await supabase.auth.signOut()
        onSignOut()
    }

    return (
        <div className="navbar w-full flex flex-row justify-center items-center">
            <div className="px-5">
                <button
                    className="btn btn-ghost"
                    onClick={() => {
                        router.push('/todo')
                    }}
                >
                    Todo
                </button>
                <button
                    className="btn btn-ghost"
                    onClick={() => {
                        router.push('/settings')
                    }}
                >
                    Settings
                </button>
                <button
                    className="btn btn-ghost"
                    onClick={() => {
                        if (userEmail !== '') {
                            signOut()
                        } else {
                            router.push('/login')
                        }
                    }}
                >
                    {userEmail !== '' ? 'Sign out' : 'Login'}
                </button>
            </div>
            <div>{userEmail !== '' ? <div>Hey,{userEmail}!</div> : null}</div>
        </div>
    )
}

export default NavBar
