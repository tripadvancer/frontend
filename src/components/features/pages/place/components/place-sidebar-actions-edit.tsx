'use client'

import { useTranslations } from 'next-intl'

import Link from 'next/link'

import { EditIcon24 } from '@/components/ui/icons'

type PlaceSidebarActionsEditProps = {
    id: number
}

export const PlaceSidebarActionsEdit = ({ id }: PlaceSidebarActionsEditProps) => {
    const t = useTranslations()

    return (
        <Link href={`/places/${id}/edit`} className="link flex items-center gap-x-2 align-top">
            <EditIcon24 />
            {t('common.action.place.edit')}
        </Link>
    )
}
