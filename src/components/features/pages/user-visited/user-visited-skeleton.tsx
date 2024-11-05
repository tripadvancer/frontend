import { UserVisitedCountriesFeedSkeleton } from './components/user-visited-countries-feed-skeleton'
import { UserVisitedMapSkeleton } from './components/user-visited-map-skeleton'

export const UserVisitedSkeleton = () => {
    return (
        <div role="status" className="flex animate-pulse flex-col gap-y-8">
            <UserVisitedMapSkeleton />
            <UserVisitedCountriesFeedSkeleton />
        </div>
    )
}
