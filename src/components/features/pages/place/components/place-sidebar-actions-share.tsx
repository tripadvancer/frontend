'use client'

import { useTranslations } from 'next-intl'

import { ShareIcon24 } from '@/components/ui/icons'
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
            <ShareIcon24 />
            {t('common.action.place.share')}
        </div>
    )
}
