import { PlacesGridItemSkeleton } from './places-grid-item-skeleton'

const PLACE_COUNT = 6

export const PlacesGridSkeleton = () => {
    return (
        <div
            role="status"
            className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8"
        >
            {Array.from({ length: PLACE_COUNT }).map((_, i) => (
                <PlacesGridItemSkeleton key={`places-grid-item-skeleton-${i}`} />
            ))}
        </div>
    )
}
