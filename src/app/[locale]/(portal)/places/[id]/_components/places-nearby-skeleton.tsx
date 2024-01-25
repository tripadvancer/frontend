import { PlaceNearbySkeleton } from './place-nearby-skeleton'

const PLACES_COUNT = 2

export const PlacesNearbySkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: PLACES_COUNT }).map((_, index) => (
                <PlaceNearbySkeleton key={index} />
            ))}
        </div>
    )
}
