'use client'

import type { IPlace } from '@/utils/types/place'

import { ShareIcon24 } from '@/components/ui/icons'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsShare = ({ place }: { place: IPlace }) => {
    const t = useI18n()

    return (
        <div className="link inline-flex items-center gap-x-2 align-top">
            <ShareIcon24 />
            {t('place.actions.share')}
        </div>
    )
}
