'use client'

import { useTranslations } from 'next-intl'

import type { IPlace, IPlacePreview } from '@/utils/types/place'

import { SharePlace } from '@/components/features/dialogs/share-place/share-place'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'

interface useSharePlaceInterface {
    sharePlace: () => void
}

export function useSharePlace(place: IPlace | IPlacePreview): useSharePlaceInterface {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const sharePlace = async () => {
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

    return { sharePlace }
}
