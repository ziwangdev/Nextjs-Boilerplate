'use client'

import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function SettingsPage() {
    // Create a Supabase client configured to use cookies
    const supabase = createClientComponentClient<Database>()

    return (
        <div className="flex flex-col w-6/12 items-center my-5">
            <div>Tab2</div>
        </div>
    )
}
