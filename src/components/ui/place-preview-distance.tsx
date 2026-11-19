'use client'

import { FootprintsIcon } from 'lucide-react'

type PlacePreviewDistanceProps = {
    distance: number
}

export const PlacePreviewDistance = ({ distance }: PlacePreviewDistanceProps) => {
    const getDistance = (distance: number) => {
        return distance < 1000 ? `${distance} m` : `${(distance / 1000).toFixed(1).replace(/\.0$/, '')} km`
    }

    return (
        <div className="text-small text-black-40 flex items-center gap-x-1">
            <FootprintsIcon size={16} /> {getDistance(distance)}
        </div>
    )
}
