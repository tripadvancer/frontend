export const FeedItemSkeleton = () => {
    return (
        <div className="flex animate-pulse flex-col gap-y-5 border-b border-black-15 py-8 first:border-t">
            <div className="flex items-center gap-x-3">
                <div className="bg-black-10 h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-y-2">
                    <div className="bg-black-10 h-4 w-32 rounded" />
                    <div className="bg-black-10 h-3 w-24 rounded" />
                </div>
            </div>
            <div className="grid aspect-[3/2] grid-cols-[2fr_1fr] grid-rows-2 gap-2">
                <div className="bg-black-10 row-span-2 rounded-2xl" />
                <div className="bg-black-10 rounded-2xl" />
                <div className="bg-black-10 rounded-2xl" />
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="bg-black-10 h-6 w-1/2 rounded" />
                <div className="bg-black-10 h-4 w-full rounded" />
                <div className="bg-black-10 h-4 w-4/5 rounded" />
            </div>
        </div>
    )
}
