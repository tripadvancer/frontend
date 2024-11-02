'use client'

import { useTranslations } from 'next-intl'

import { SharePlace } from '@/components/features/dialogs/share-place/share-place'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'

interface useSharePlaceInterface {
    sharePlace: () => void
}

type useSharePlaceProps = {
    id: number
    title: string
    countryCode: string | null
}

export function useSharePlace({ id, title, countryCode }: useSharePlaceProps): useSharePlaceInterface {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const sharePlace = async () => {
        if (navigator.share) {
            const shareData = {
                title: title,
                text: 'Look what place I found on Tripadvancer!',
                url: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/places/${id}`,
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

        dialog.open(<SharePlace id={id} title={title} countryCode={countryCode} />)
    }

    return { sharePlace }
}
