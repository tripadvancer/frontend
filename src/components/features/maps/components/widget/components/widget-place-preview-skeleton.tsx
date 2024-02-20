'use client'

export const WidgetPlacePreviewSkeleton = () => {
    return (
        <div role="status" className="flex flex-col gap-4">
            <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
    )
}
