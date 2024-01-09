type FormTextareaSkeletonProps = {
    labeled?: boolean
}

export const FormTextareaSkeleton = ({ labeled }: FormTextareaSkeletonProps) => {
    return (
        <div role="status" className="w-full animate-pulse">
            <div className="flex flex-col gap-y-2">
                {labeled && <div className="h-5 w-2/5 rounded-full bg-black-5" />}
                <div className="h-[120px] w-full rounded-lg bg-black-5" />
            </div>
        </div>
    )
}
