'use client'

import type { IPlace, IPlaceNearby, IPlacePreview } from '@/utils/types/place'

import { PlacesFeedItem } from './places-feed-item'

export const PlacesFeed = ({ places }: { places: IPlacePreview[] | IPlaceNearby[] }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
            {places.map(place => (
                <PlacesFeedItem key={place.id} {...place} />
            ))}
        </div>
    )
}
