import { UserPlaceSkeleton } from '@/components/user-place/user-place-skeleton'

const PLACES_COUNT = 6

export const UserPlacesFeedSkeleton = () => {
    return Array.from({ length: PLACES_COUNT }).map((_, i) => <UserPlaceSkeleton key={i} />)
}
