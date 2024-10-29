'use client'

import { useTranslations } from 'next-intl'

type DistanceProps = {
    distance: number
    className?: string
}

export const Distance = ({ distance, className }: DistanceProps) => {
    const t = useTranslations()

    const getDistance = (distance: number) => {
        return distance < 1000
            ? t('common.distance.m', { distance })
            : t('common.distance.km', { distance: (distance / 1000).toFixed(1) })
    }

    return <div className={className}>{getDistance(distance)}</div>
}
