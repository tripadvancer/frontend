import { SearchItemSkeleton } from './search-item-skeleton'

export const SearchSuggestSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="mt-4 mb-1 py-0.5 pl-3">
                <div className="bg-black-5 h-4 w-2/3 rounded-full" />
            </div>
            <SearchItemSkeleton />
            <SearchItemSkeleton />
            <SearchItemSkeleton />
            <SearchItemSkeleton />
        </div>
    )
}
