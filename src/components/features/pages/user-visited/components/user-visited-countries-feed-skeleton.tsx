import { UserVisitedCountriesFeedItemSkeleton } from './user-visited-countries-feed-item-skeleton'

export const UserVisitedCountriesFeedSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <UserVisitedCountriesFeedItemSkeleton key={`user-visited-countries-feed-skeleton-${i}`} />
            ))}
        </div>
    )
}
