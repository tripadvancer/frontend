'use client'

import { PencilIcon } from 'lucide-react'

import Link from 'next/link'

type PlaceSidebarActionsEditProps = {
    id: number
}

export const PlaceSidebarActionsEdit = ({ id }: PlaceSidebarActionsEditProps) => {
    return (
        <Link href={`/places/${id}/edit`} className="link flex items-center gap-x-2 align-top">
            <PencilIcon />
            {'Edit place'}
        </Link>
    )
}
