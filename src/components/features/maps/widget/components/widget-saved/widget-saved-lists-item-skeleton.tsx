export const WidgetSavedListsItemSkeleton = () => {
    return (
        <div
            role="status"
            className="border-black-5 flex animate-pulse items-center justify-between border-t py-3 last-of-type:border-b sm:py-4"
        >
            <div className="flex flex-1 flex-col gap-y-1">
                <div className="bg-black-5 h-5 w-2/3 rounded-full" />
                <div className="bg-black-5 h-4 w-1/3 rounded-full" />
            </div>
            <div className="bg-black-5 h-4 w-4 flex-none rounded" />
        </div>
    )
}
