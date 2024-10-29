'use client'

import { useTranslations } from 'next-intl'

import { CopyIcon24 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { arrayToString } from '@/utils/helpers/maps'
import { GeoJsonPoint } from '@/utils/types/geo'

type PlaceHeaderCoordinatesProps = {
    location: GeoJsonPoint
}

export const PlaceHeaderCoordinates = ({ location }: PlaceHeaderCoordinatesProps) => {
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
