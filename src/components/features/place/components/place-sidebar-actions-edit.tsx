'use client'

import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { EditIcon24 } from '@/components/ui/icons'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsEdit = ({ place }: { place: IPlace }) => {
    const t = useI18n()

    return (
        <Link href={`/places/${place.id}/edit`} className="link inline-flex items-center gap-x-2 align-top">
            <EditIcon24 />
            {t('place.actions.edit')}
        </Link>
    )
}
