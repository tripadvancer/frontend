'use client'

import { CopyIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
        <div className="flex-center cursor-pointer gap-2 text-big text-white" onClick={handleCopy}>
            {coordinatesString}
            <CopyIcon size={20} />
        </div>
    )
}
