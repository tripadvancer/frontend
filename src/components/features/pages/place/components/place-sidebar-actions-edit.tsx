'use client'

import { PencilIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import Link from 'next/link'

type PlaceSidebarActionsEditProps = {
    id: number
}

export const PlaceSidebarActionsEdit = ({ id }: PlaceSidebarActionsEditProps) => {
    const t = useTranslations()

    return (
        <Link href={`/places/${id}/edit`} className="link flex items-center gap-x-2 align-top">
            <PencilIcon />
            {t('common.action.place.edit')}
        </Link>
    )
}
