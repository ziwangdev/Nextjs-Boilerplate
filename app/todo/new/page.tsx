import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function ServerAction() {
    const addTodo = async (formData: FormData) => {
        'use server'
        const title = formData.get('title')

        if (title) {
            // Create a Supabase client configured to use cookies
            const supabase = createServerActionClient({ cookies })

            // This assumes you have a `todos` table in Supabase. Check out
            // the `Create Table and seed with data` section of the README 👇
            // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
            await supabase.from('todos').insert({ title })
            revalidatePath('/server-action-example')
        }
    }

    return (
        <div className="flex flex-row justify-between w-2/5 items-center">
            <div>
                <input
                    type="checkbox"
                    checked={false}
                    className="checkbox checkbox-info"
                />
            </div>
            <div className="w-4/5 px-2">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input w-full"
                />
            </div>
            <div>
                <button className="btn btn-info">Delete</button>
            </div>
        </div>
    )
}
