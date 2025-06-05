import { UserPlacesItemSkeleton } from './user-places-item-skeleton'

export const UserPlacesSkeleton = () => {
    return (
        <div
            role="status"
            className="grid animate-pulse grid-cols-2 gap-4 last:mb-0 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3"
        >
            {Array.from({ length: 6 }).map((_, i) => (
                <UserPlacesItemSkeleton key={`user-places-item-skeleton-${i}`} />
            ))}
        </div>
    )
}
