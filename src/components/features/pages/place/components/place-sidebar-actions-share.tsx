'use client'

import { useTranslations } from 'next-intl'

import type { IPlace } from '@/utils/types/place'

import { SharePlace } from '@/components/features/dialogs/share-place/share-place'
import { ShareIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'

export const PlaceSidebarActionsShare = ({ place }: { place: IPlace }) => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const handleClick = async () => {
        if (navigator.share) {
            const shareData = {
                title: place.title,
                text: 'Look what place I found on Tripadvancer!',
                url: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/places/${place.id}`,
            }

            try {
                await navigator.share(shareData)
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    toast.error(t('common.error'))
                }
            }

            return
        }

        dialog.open(<SharePlace {...place} />)
    }

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={handleClick}>
            <ShareIcon24 />
            {t('common.action.place.share')}
        </div>
    )
}
