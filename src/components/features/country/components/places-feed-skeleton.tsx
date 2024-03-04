import { CountryPlaceSkeleton } from './country-place-skeleton'

const PLACE_COUNT = 6

export const CountryPlacesSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
            {Array.from({ length: PLACE_COUNT }).map((_, i) => (
                <CountryPlaceSkeleton key={i} />
            ))}
        </div>
    )
}
