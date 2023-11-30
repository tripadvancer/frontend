import { PlaceSkeleton } from './place-skeleton'

const PLACES_COUNT = 6

export const PlacesFeedSkeleton = () => {
    return (
        <div className="grid grid-cols-2 gap-4 last:mb-0 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
            {Array.from({ length: PLACES_COUNT }).map((_, i) => (
                <PlaceSkeleton key={i} />
            ))}
        </div>
    )
}
