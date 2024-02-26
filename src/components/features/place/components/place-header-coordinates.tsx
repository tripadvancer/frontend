'use client'

import type { IPlace } from '@/utils/types/place'

import { CopyIcon24 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceHeaderCoordinates = ({ location }: IPlace) => {
    const t = useI18n()
    const toast = useToast()

    const coordinates = location.coordinates

    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(`${coordinates[1].toFixed(5)}, ${coordinates[0].toFixed(5)}`)
            toast.success(t('success.copy_coordinates'))
        }
    }

    return (
        <div className="inline-flex cursor-pointer gap-2 text-big text-white" onClick={handleCopy}>
            {coordinates[1].toFixed(5)}, {coordinates[0].toFixed(5)}
            <CopyIcon24 />
        </div>
    )
}
