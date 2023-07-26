import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    // Create a Supabase client configured to use cookies
    const supabase = createRouteHandlerClient({ cookies })
    console.log(req)
    // This assumes you have a `todos` table in Supabase. Check out
    // the `Create Table and seed with data` section of the README 👇
    // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
    const { data: todos } = await supabase.from('todos').select()
    // console.log(todos)
    return NextResponse.json(todos)
}

export async function PUT(req: NextRequest) {
    // Create a Supabase client configured to use cookies
    const supabase = createRouteHandlerClient({ cookies })

    try {
        const { id, is_complete, title } = await req.json()
        // console.log(id, is_complete)

        const { data, error } = await supabase
            .from('todos')
            .update({ is_complete: is_complete, title: title })
            .eq('id', id as string)
            .select()

        // console.log(data)

        if (error) {
            throw new Error(error.message)
        } else if (!data) {
            throw new Error('No data returned from updating todo.')
        } else {
            return NextResponse.json(data)
        }
    } catch (e) {
        // console.log('Error updating todo:', (e as Error).message)
        return NextResponse.json(
            {
                message: (e as Error).message,
            },
            {
                status: 500,
            },
        )
    }
}
