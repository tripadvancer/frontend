import { IPlaceNearby } from '@/utils/types/place'

import { PlaceNearby } from './place-nearby'

type PlacesNearbyFeedProps = {
    places: IPlaceNearby[]
}

export const PlacesNearbyFeed = ({ places }: PlacesNearbyFeedProps) => {
    return (
        <div className="flex flex-col gap-4">
            {places.map(place => (
                <PlaceNearby key={place.id} {...place} />
            ))}
        </div>
    )
}
