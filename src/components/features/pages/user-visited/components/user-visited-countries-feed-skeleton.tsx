import { UserVisitedCountriesFeedItemSkeleton } from './user-visited-countries-feed-item-skeleton'

export const UserVisitedCountriesFeedSkeleton = () => {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <UserVisitedCountriesFeedItemSkeleton key={`user-visited-countries-feed-skeleton-${i}`} />
            ))}
        </div>
    )
}
