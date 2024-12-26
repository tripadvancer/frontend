'use client'

import { Share2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useSharePlace } from '@/utils/hooks/use-share-place'

type PlaceSidebarActionsShareProps = {
    id: number
    title: string
    countryCode: string | null
}

export const PlaceSidebarActionsShare = ({ id, title, countryCode }: PlaceSidebarActionsShareProps) => {
    const t = useTranslations()
    const { sharePlace } = useSharePlace({ id, title, countryCode })

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={sharePlace}>
            <Share2Icon />
            {t('common.action.place.share')}
        </div>
    )
}
