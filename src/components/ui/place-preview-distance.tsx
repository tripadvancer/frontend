'use client'

import { FootprintsIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

type PlacePreviewDistanceProps = {
    distance: number
}

export const PlacePreviewDistance = ({ distance }: PlacePreviewDistanceProps) => {
    const t = useTranslations()

    const getDistance = (distance: number) => {
        return distance < 1000
            ? t('common.distance.m', { distance })
            : t('common.distance.km', { distance: (distance / 1000).toFixed(1).replace(/\.0$/, '') })
    }

    return (
        <div className="flex items-center gap-x-1 text-small text-black-40">
            <FootprintsIcon size={16} /> {getDistance(distance)}
        </div>
    )
}
