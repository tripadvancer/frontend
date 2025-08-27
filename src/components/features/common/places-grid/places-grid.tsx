import { PlacesGridItem } from './places-grid-item'

type PlacesGridProps = {
    places: {
        id: number
        title: string
        cover: string | null
        rating?: {
            avgRating: number | null
            reviewsCount: number
        }
        meta?: {
            countryCode: string | null
            createdAt: Date
        }
        distance?: number
    }[]
}

export const PlacesGrid = ({ places }: PlacesGridProps) => {
    return places.map(place => (
        <PlacesGridItem
            key={`places-grid-item-${place.id}`}
            id={place.id}
            title={place.title}
            cover={place.cover}
            rating={place.rating}
            meta={place.meta}
            distance={place.distance}
        />
    ))
}
