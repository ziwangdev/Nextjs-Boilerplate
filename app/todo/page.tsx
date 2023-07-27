'use client'

import TodoItem from '@/components/TodoItem'
import { Todo } from '@/types/Todo'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function TodoPage() {
    // State
    const [todos, setTodos] = useState<Todo[]>([])

    // Create a Supabase client configured to use cookies
    const supabase = createClientComponentClient<Database>()

    const handleCreateButtonClick = async () => {
        // Create a todo that is at end of array by default
        const data = {
            index: todos.length,
        }
        const res = await fetch(`/api/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const newTodo = await res.json()
        setTodos([...todos, newTodo])
    }

    const handleTodoDelete = async (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const getTodos = async () => {
        const res = await fetch(`/api/todo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (data) {
            setTodos(data)
        }
    }

    // Render todo items upon initial mount
    useEffect(() => {
        getTodos()
    }, [supabase, setTodos, todos.length])

    function sortByIndex(a: Todo, b: Todo) {
        return a.index - b.index
    }

    return (
        <div className="flex flex-col w-6/12 items-center my-5">
            {/* Title */}
            <div className="py-5">
                <h1 className="text-5xl font-bold">Todo</h1>
            </div>

            {/* Todo Board */}
            <div className="flex flex-col justify-between items-center w-full bg-base-200 rounded-md px-10 py-10">
                {/* TodoItem */}
                {todos.sort(sortByIndex).map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={handleTodoDelete}
                    />
                ))}
                {/* Create Button */}
                <div className="py-5">
                    <button
                        className="btn btn-primary btn-wide"
                        onClick={handleCreateButtonClick}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}
