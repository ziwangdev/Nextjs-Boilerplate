'use client'

import TodoItem from '@/components/TodoItem'
import { Todo } from '@/types/Todo'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function ClientComponent() {
    const [todos, setTodos] = useState<Todo[]>([])

    // Create a Supabase client configured to use cookies
    const supabase = createClientComponentClient<Database>()

    // For initial component mount
    useEffect(() => {
        const getTodos = async () => {
            // This assumes you have a `todos` table in Supabase. Check out
            // the `Create Table and seed with data` section of the README 👇
            // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
            const { data } = await supabase.from('todos').select()
            if (data) {
                setTodos(data)
            }
        }
        getTodos()
    }, [supabase, setTodos])

    // return <pre>{JSON.stringify(todos, null, 2)}</pre>
    return (
        <div className="flex flex-col justify-between w-6/12">
            {/* TodoItem */}
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}
