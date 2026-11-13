type FormRatingInputSkeletonProps = {
    labeled?: boolean
}

export const FormRatingInputSkeleton = ({ labeled }: FormRatingInputSkeletonProps) => {
    return (
        <div className="flex w-full flex-col gap-y-2">
            {labeled && <div className="bg-black-5 h-5 w-1/4 rounded-full" />}
            <div className="bg-black-5 h-8 w-full rounded-lg" />
        </div>
    )
}
