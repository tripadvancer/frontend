import { UserPlaceSkeleton } from '@/components/UserPlacesFeed/UserPlaceSkeleton'

export default function Loading() {
    return (
        <div className="sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3 mb-8 grid grid-cols-2 gap-4 last:mb-0">
            {Array.from({ length: 6 }).map((_, i) => (
                <UserPlaceSkeleton key={i} />
            ))}
        </div>
    )
}
