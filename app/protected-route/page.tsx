// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import {
    createServerActionClient,
    createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProtectedRoute() {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        // This route can only be accessed by authenticated users.
        // Unauthenticated users will be redirected to the `/login` route.
        redirect('/login')
    }

    const signOut = async () => {
        'use server'
        const supabase = createServerActionClient({ cookies })
        await supabase.auth.signOut()
        redirect('/login')
    }

    return (
        <div className="flex-1 flex flex-col max-w-3xl mt-24">
            Secret stuff for logged in person
            <button className="btn" onClick={signOut}>
                Sign Out
            </button>
        </div>
    )
}
