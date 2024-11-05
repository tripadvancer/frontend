import { FeedPlacesItem } from './feed-places-item'

type FeedPlacesProps = {
    places: {
        id: number
        title: string
        cover: string | null
        avgRating: number | null
        reviewsCount: number
        distance?: number
    }[]
}

export const FeedPlaces = ({ places }: FeedPlacesProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
            {places.map(place => (
                <FeedPlacesItem key={`feed-place-${place.id}`} {...place} />
            ))}
        </div>
    )
}
