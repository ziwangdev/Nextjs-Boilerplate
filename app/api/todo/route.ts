import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// CREATE
export async function POST(req: NextRequest) {
    // Create a Supabase client configured to use cookies
    const supabase = createRouteHandlerClient({ cookies })
    try {
        const { index } = await req.json()
        const { data, error } = await supabase
            .from('todos')
            .insert({ title: '', index: index })
            .select()
        if (error) {
            throw new Error(error.message)
        } else if (!data) {
            throw new Error('No data returned from updating todo.')
        }

        return NextResponse.json(data)
    } catch (e) {
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

// READ
export async function GET() {
    // Create a Supabase client configured to use cookies
    const supabase = createRouteHandlerClient({ cookies })

    // Assumes we have a `todos` table in Supabase.
    const { data: todos } = await supabase.from('todos').select()
    return NextResponse.json(todos)
}

// UPDATE
export async function PUT(req: NextRequest) {
    // Create a Supabase client configured to use cookies
    const supabase = createRouteHandlerClient({ cookies })

    try {
        const { id, is_complete, title } = await req.json()
        const { data, error } = await supabase
            .from('todos')
            .update({ is_complete: is_complete, title: title })
            .eq('id', id as string)
            .select()

        if (error) {
            throw new Error(error.message)
        } else if (!data) {
            throw new Error('No data returned from updating todo.')
        } else {
            return NextResponse.json(data)
        }
    } catch (e) {
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

// DELETE

export async function DELETE(req: NextRequest) {
    // Create a Supabase client configured to use cookies
    const supabase = createRouteHandlerClient({ cookies })

    try {
        const { id } = await req.json()

        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id as string)

        if (error) {
            throw new Error(error.message)
        }
        return NextResponse.json(
            {
                message: 'Successfully deleted Todo.',
            },
            {
                status: 500,
            },
        )
    } catch (e) {
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
