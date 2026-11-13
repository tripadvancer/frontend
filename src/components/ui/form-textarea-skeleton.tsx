type FormTextareaSkeletonProps = {
    labeled?: boolean
}

export const FormTextareaSkeleton = ({ labeled }: FormTextareaSkeletonProps) => {
    return (
        <div className="flex w-full flex-col gap-y-2">
            {labeled && <div className="bg-black-5 h-5 w-2/5 rounded-full" />}
            <div className="bg-black-5 h-30 w-full rounded-lg" />
        </div>
    )
}
