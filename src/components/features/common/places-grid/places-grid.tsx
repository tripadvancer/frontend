import { PlacesGridItem } from './places-grid-item'

type PlacesGridProps = {
    places: {
        id: number
        title: string
        cover: string | null
        avgRating: number | null
        reviewsCount: number
        distance?: number
    }[]
}

export const PlacesGrid = ({ places }: PlacesGridProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
            {places.map(place => (
                <PlacesGridItem key={`places-grid-item-${place.id}`} {...place} />
            ))}
        </div>
    )
}
