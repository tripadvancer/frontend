type FormRatingInputSkeletonProps = {
    labeled?: boolean
}

export const FormRatingInputSkeleton = ({ labeled }: FormRatingInputSkeletonProps) => {
    return (
        <div className="flex w-full flex-col gap-y-2">
            {labeled && <div className="h-5 w-1/4 rounded-full bg-black-5" />}
            <div className="h-8 w-full rounded-lg bg-black-5" />
        </div>
    )
}
