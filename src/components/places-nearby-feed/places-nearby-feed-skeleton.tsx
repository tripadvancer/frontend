import { PlacesNearbySkeleton } from '@/components/place-nearby/place-nearby-skeleton'

const PLACES_COUNT = 2

export const PlacesNearbyFeedSkeleton = () => {
    return Array.from({ length: PLACES_COUNT }).map((_, index) => <PlacesNearbySkeleton key={index} />)
}
