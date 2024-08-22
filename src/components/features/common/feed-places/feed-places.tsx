import type { IPlaceNearby, IPlacePreview } from '@/utils/types/place'

import { FeedPlacesItem } from './feed-places-item'

export const FeedPlaces = ({ places }: { places: IPlacePreview[] | IPlaceNearby[] }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
            {places.map(place => (
                <FeedPlacesItem key={`feed-place-${place.id}`} {...place} />
            ))}
        </div>
    )
}
