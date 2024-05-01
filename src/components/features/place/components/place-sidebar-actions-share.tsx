'use client'

import type { IPlace } from '@/utils/types/place'

import { SharePlace } from '@/components/features/share-place/share-place'
import { ShareIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsShare = ({ place }: { place: IPlace }) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<SharePlace {...place} />)
    }

    return (
        <div className="link inline-flex items-center gap-x-2 align-top" onClick={handleClick}>
            <ShareIcon24 />
            {t('place.actions.share')}
        </div>
    )
}
