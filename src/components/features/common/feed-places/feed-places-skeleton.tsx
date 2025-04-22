import { FeedPlacesItemSkeleton } from './feed-places-item-skeleton'

const PLACE_COUNT = 6

export const FeedPlacesSkeleton = () => {
    return (
        <div
            role="status"
            className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8"
        >
            {Array.from({ length: PLACE_COUNT }).map((_, i) => (
                <FeedPlacesItemSkeleton key={`feed-place-skeleton-${i}`} />
            ))}
        </div>
    )
}
