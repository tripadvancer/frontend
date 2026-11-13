'use client'

import { SharePlace } from '@/components/features/dialogs/share-place/share-place'
import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { getPlacePath } from '@/utils/helpers/places'

interface useSharePlaceInterface {
    sharePlace: () => void
}

type useSharePlaceProps = {
    id: number
    title: string
    countryCode: string | null
}

export function useSharePlace({ id, title, countryCode }: useSharePlaceProps): useSharePlaceInterface {
    const dialog = useDialog()
    const toast = useToast()

    const sharePlace = async () => {
        if (navigator.share) {
            const shareData = {
                title: title,
                text: 'Look what place I found on Tripadvancer!',
                url: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}${getPlacePath(id, countryCode)}`,
            }

            try {
                await navigator.share(shareData)
            } catch (error: unknown) {
                if (!(typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError')) {
                    toast.error('An unexpected error has occurred. Please try again later.')
                }
            }

            return
        }

        dialog.open(<SharePlace id={id} title={title} countryCode={countryCode} />)
    }

    return { sharePlace }
}
