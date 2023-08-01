'use client'

import { Entity } from '@/types/Entity'
import { useRef, useState } from 'react'

type EntityComponentProps = {
    entity: Entity
}

const EntityComponent: React.FC<EntityComponentProps> = ({ entity }) => {
    const [name, setName] = useState(entity.name)
    const [userInputName, setUserInputName] = useState(name)
    const inputRef = useRef(null)

    /**
     *  Boiletplate for handling Enter key down
     */

    // const handleInputEnterKeyDown = async (
    //     event: React.KeyboardEvent<HTMLInputElement>,
    // ) => {
    //     if (event.key === 'Enter') {
    //         handleTitleChange()
    //     }
    // }

    /**
     * Boilerplate for handling input name change
     */

    const handleNameChange = async () => {
        // Set input to blur
        if (inputRef) {
            inputRef.current.blur()
        }
        // Only when name has changed, submit name change to DB

        if (userInputName !== name) {
            const res = await updateEntityDB(entity.id, userInputName as string)
            setUserInputName(res[0].name)
        }
    }

    /**
     * Boilerplate for deleting an entity in Supabase DB
     */
    const deleteEntityDB = async () => {
        try {
            const data = {
                id: entity.id,
            }

            const res = await fetch(`/api/entity`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error('Failed to delete entity')
            }
        } catch (error) {
            console.error(
                'Error while deleting entity:',
                (error as Error).message,
            )
        }
    }

    /**
     * Boilerplate for updating an entity in Supabase DB
     */
    const updateEntityDB = async (id: number, name: string) => {
        try {
            const data = {
                id: id,
                name: name,
            }
            const res = await fetch(`/api/entity`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error('Failed to update entity')
            }
            // Handle successful response here
            const updatedTodo = await res.json()
            return updatedTodo
        } catch (error) {
            console.error(
                'Error while updating entity:',
                (error as Error).message,
            )
        }
    }

    return (
        <div className="flex flex-row justify-between w-full items-center py-2 ">
            {/* Entity Name */}
            <div className="w-4/5 px-2">
                <input
                    type="text"
                    className="input w-full"
                    ref={inputRef}
                    value={name as string}
                    onChange={handleNameChange}
                />
            </div>
        </div>
    )
}

export default EntityComponent
