import { IPlace, IPlacePreview } from '@/utils/types/place'

import { FeedPlacesItem } from './feed-places-item'

type FeedPlacesProps = {
    id: IPlace['id']
    title: IPlace['title']
    cover: IPlace['cover']
    avgRating: IPlace['avgRating']
    reviewsCount: IPlace['reviewsCount']
}[]

export const FeedPlaces = ({ places }: { places: FeedPlacesProps }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
            {places.map(place => (
                <FeedPlacesItem key={`feed-place-${place.id}`} {...place} />
            ))}
        </div>
    )
}
