export const WidgetSavedListsItemSkeleton = () => {
    return (
        <div
            role="status"
            className="flex animate-pulse items-center justify-between border-t border-black-5 py-2 last-of-type:border-b sm:py-4"
        >
            <div className="flex flex-1 flex-col gap-y-1">
                <div className="h-5 w-2/3 rounded-full bg-black-5" />
                <div className="h-4 w-1/3 rounded-full bg-black-5" />
            </div>
            <div className="h-4 w-4 flex-none rounded bg-black-5" />
        </div>
    )
}
