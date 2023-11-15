type FileInputSkeletonProps = {
    labeled?: boolean
}

export const FileInputSkeleton = ({ labeled }: FileInputSkeletonProps) => {
    return (
        <div role="status" className="flex w-full animate-pulse flex-col gap-y-2">
            {labeled && <div className="h-5 w-1/4 rounded-full bg-black-5" />}
            <div className="h-10 w-full rounded-lg bg-black-5" />
        </div>
    )
}
