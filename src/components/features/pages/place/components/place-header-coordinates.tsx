'use client'

import { useTranslations } from 'next-intl'

import type { IPlace } from '@/utils/types/place'

import { CopyIcon24 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { arrayToString } from '@/utils/helpers/maps'

export const PlaceHeaderCoordinates = ({ location }: IPlace) => {
    const t = useTranslations()
    const toast = useToast()
    const coordinatesString = arrayToString(location.coordinates)

    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(coordinatesString)
            toast.success(t('success.copyCoordinates'))
        }
    }

    return (
        <div className="inline-flex cursor-pointer gap-2 text-big text-white" onClick={handleCopy}>
            {coordinatesString}
            <CopyIcon24 />
        </div>
    )
}
