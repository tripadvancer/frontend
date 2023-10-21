import { CountryPlaceSkeleton } from './CountryPlaceSkeleton'

export const CountryPlacesLoading = () => {
    return (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <CountryPlaceSkeleton key={i} />
            ))}
        </div>
    )
}
