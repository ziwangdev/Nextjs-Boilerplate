'use client'

// client side data fetching
// https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NavBar() {
    const router = useRouter()
    const [email, setEmail] = useState('')

    // Create a Supabase client configured to use cookies
    const supabase = createClientComponentClient()

    const signOut = async () => {
        await supabase.auth.signOut()
        setEmail('')
    }

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (user) {
            console.log(user.email)
            setEmail(user?.email as string)
        }
    }

    useEffect(() => {
        // Get user profile
        getUser()
    }, [])

    return (
        <div className="navbar w-full flex flex-row justify-center items-center">
            <div className="px-5">
                <button
                    className="btn btn-ghost"
                    onClick={() => {
                        router.push('/entities')
                    }}
                >
                    Todo
                </button>
                <button
                    className="btn btn-ghost"
                    onClick={() => {
                        router.push('/tab2')
                    }}
                >
                    Settings
                </button>
                <button
                    className="btn btn-ghost"
                    onClick={() => {
                        if (email !== '') {
                            signOut()
                        } else {
                            router.push('/tab3')
                        }
                    }}
                >
                    {email !== '' ? 'Sign out' : 'Login'}
                </button>
            </div>
            <div>{email !== '' ? <div>Hey,{email}!</div> : null}</div>
        </div>
    )
}
