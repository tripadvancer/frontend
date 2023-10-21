import { CountryPlaceSkeleton } from '@/components/CountryPlacesFeed/CountryPlaceSkeleton'
import { CategoriesEnum } from '@/utils/enums'

export default function Loading() {
    return (
        <>
            <div className="mx-auto mb-16 flex flex-wrap justify-center gap-1 sm:w-2/3">
                {Array.from({ length: Object.keys(CategoriesEnum).length }).map((_, i) => (
                    <div key={i} className="h-8 w-28 animate-pulse rounded-full bg-black-5" />
                ))}
            </div>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <CountryPlaceSkeleton key={i} />
                ))}
            </div>
        </>
    )
}
