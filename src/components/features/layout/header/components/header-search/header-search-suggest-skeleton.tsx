import { HeaderSearchItemSkeleton } from './header-search-item-skeleton'

export const HeaderSearchSuggestSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">
            <hr className="my-1" />
            <div className="mb-1 mt-4 py-0.5 pl-3">
                <div className="h-4 w-2/3 rounded-full bg-black-5" />
            </div>
            <HeaderSearchItemSkeleton />
            <HeaderSearchItemSkeleton />
            <HeaderSearchItemSkeleton />
            <HeaderSearchItemSkeleton />
        </div>
    )
}
