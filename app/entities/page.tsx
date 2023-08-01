'use client'

import EntityComponent from '@/components/EntityComponent'
import { Entity } from '@/types/Entity'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function Page() {
    // State
    const [entities, setEntities] = useState<Entity[]>([])

    // Create a Supabase client configured to use cookies
    const supabase = createClientComponentClient<Database>()

    // Fetch boilerplate
    const getEntities = async () => {
        const res = await fetch(`/api/entities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (data) {
            setEntities(data)
        }
    }

    // Render todo items upon initial mount
    useEffect(() => {
        getEntities()
    }, [supabase, entities.length])

    // Useful function to sort array by its property
    function sortById(a: Entity, b: Entity) {
        return a.id - b.id
    }

    // Example Entities
    const Entity1 = {
        id: 0,
        name: 'Hello',
    }

    const Entity2 = {
        id: 0,
        name: 'Goodbye',
    }

    const ExampleEntities = [Entity1, Entity2]

    return (
        <div className="flex flex-col w-6/12 items-center my-5">
            {/* Title */}
            <div className="py-5">
                <h1 className="text-5xl font-bold">Example Title</h1>
            </div>

            {/* Word Board */}
            <div className="flex flex-col justify-between items-center w-full bg-base-200 rounded-md px-10 py-10">
                {/* Words */}
                {ExampleEntities.sort(sortById).map((entity) => (
                    <EntityComponent key={entity.id} entity={entity} />
                ))}
            </div>
        </div>
    )
}
