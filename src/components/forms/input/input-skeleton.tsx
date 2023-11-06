type InputSkeletonProps = {
    labeled?: boolean
}

export const InputSkeleton = ({ labeled }: InputSkeletonProps) => {
    return (
        <div role="status" className="w-full animate-pulse">
            <div className="flex flex-col gap-y-2">
                {labeled && <div className="h-5 w-1/4 rounded-full bg-black-5" />}
                <div className="h-10 w-full rounded-lg bg-black-5" />
            </div>
        </div>
    )
}
