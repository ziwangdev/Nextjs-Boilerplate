'use client'

import { Todo } from '@/types/Todo'
import { useEffect, useRef, useState } from 'react'

type TodoItemProps = {
    todo: Todo
    onDelete: (id: string) => Promise<void>
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
    const [title, setTitle] = useState(todo.title)
    const [userInputTitle, setUserInputTitle] = useState(todo.title)
    const [isComplete, setIsComplete] = useState(todo.is_complete)
    const inputRef = useRef(null)

    const handleInputEnterKeyDown = async (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            handleTitleChange()
        }
    }

    const handleTitleChange = async () => {
        // Set input to blur
        if (inputRef) {
            inputRef.current.blur()
        }
        // Only when title has changed, submit title change to DB

        if (userInputTitle !== title) {
            const res = await updateTodoDB(
                todo.id as string,
                isComplete as boolean,
                userInputTitle as string,
            )
            setTitle(res[0].title)
        }
    }

    useEffect(() => {
        // setTitle(userInputTitle)
    }, [userInputTitle])

    const handleDeleteButtonClicked = async () => {
        // Delete Todo in database
        deleteTodoDB()
        // Callback to parent to delete todo on client side
        onDelete(todo.id as string)
    }

    const handleIsCompleteChange = async () => {
        const res = await updateTodoDB(
            todo.id as string,
            !isComplete as boolean,
            title as string,
        )
        setIsComplete(res[0].is_complete)
    }

    const deleteTodoDB = async () => {
        try {
            const data = {
                id: todo.id,
            }

            const res = await fetch(`/api/todo`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error('Failed to delete todo')
            }
        } catch (error) {
            console.error(
                'Error updating todo isComplete:',
                (error as Error).message,
            )
        }
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
        <div className="flex flex-row justify-between w-full items-center py-2 ">
            {/* Checkbox */}
            <div>
                <input
                    type="checkbox"
                    checked={isComplete as boolean}
                    className="checkbox checkbox-primary"
                    onChange={handleIsCompleteChange}
                />
            </div>
            {/* Todo Title */}
            <div className="w-4/5 px-2">
                <input
                    type="text"
                    className="input w-full"
                    ref={inputRef}
                    value={userInputTitle as string}
                    onChange={(event) => setUserInputTitle(event.target.value)}
                    onKeyDown={(event) => handleInputEnterKeyDown(event)}
                    onBlur={handleTitleChange}
                />
            </div>
            {/* Delete Button */}
            <div>
                <button
                    className="btn btn-primary"
                    onClick={handleDeleteButtonClicked}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TodoItem
