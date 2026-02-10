import { SearchItemSkeleton } from './search-item-skeleton'

export const SearchSuggestSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="mb-1 mt-4 py-0.5 pl-3">
                <div className="h-4 w-2/3 rounded-full bg-black-5" />
            </div>
            <SearchItemSkeleton />
            <SearchItemSkeleton />
            <SearchItemSkeleton />
            <SearchItemSkeleton />
        </div>
    )
}
