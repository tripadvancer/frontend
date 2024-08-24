'use client'

import { useTranslations } from 'next-intl'

import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { EditIcon24 } from '@/components/ui/icons'

export const PlaceSidebarActionsEdit = ({ place }: { place: IPlace }) => {
    const t = useTranslations()

    return (
        <Link href={`/places/${place.id}/edit`} className="link flex items-center gap-x-2 align-top">
            <EditIcon24 />
            {t('common.action.place.edit')}
        </Link>
    )
}
