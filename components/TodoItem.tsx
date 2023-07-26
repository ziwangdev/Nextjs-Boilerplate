'use client'

import { Todo } from '@/types/Todo'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type TodoItemProps = {
    todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    console.log(todo)
    const router = useRouter()
    const [title, setTitle] = useState(todo.title)
    const [userInputTitle, setUserInputTitle] = useState(todo.title)
    const [isComplete, setIsComplete] = useState(todo.is_complete)

    const handleTitleChange = async (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            const res = await updateTodoDB(
                todo.id as string,
                isComplete as boolean,
                userInputTitle as string,
            )
            setTitle(res.title)
        }
    }

    const handleIsCompleteChange = async () => {
        const res = await updateTodoDB(
            todo.id as string,
            !isComplete as boolean,
            title as string,
        )
        setIsComplete(res.is_complete)
    }

    const updateTodoDB = async (
        id: string,
        isComplete: boolean,
        title: string,
    ) => {
        try {
            const data = {
                id: id,
                is_complete: isComplete,
                title: title,
            }

            const res = await fetch(`/api/todo`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error('Failed to update todo')
            }
            // Handle successful response here
            const updatedTodo = await res.json()
            return updatedTodo
        } catch (error) {
            console.error(
                'Error updating todo isComplete:',
                (error as Error).message,
            )
        }
    }

    return (
        <div className="flex flex-row justify-between w-full items-center py-2">
            <div>
                <input
                    type="checkbox"
                    checked={isComplete as boolean}
                    className="checkbox checkbox-info"
                    onClick={handleIsCompleteChange}
                />
            </div>
            <div className="w-4/5 px-2">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input w-full"
                    value={userInputTitle as string}
                    onChange={(event) => setUserInputTitle(event.target.value)}
                    onKeyDown={(event) => handleTitleChange(event)}
                />
            </div>
            <div>
                <button className="btn btn-info">Delete</button>
            </div>
        </div>
    )
}

export default TodoItem
