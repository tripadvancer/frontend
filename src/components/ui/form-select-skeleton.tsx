type FormInputSkeletonProps = {
    labeled?: boolean
}

export const FormSelectSkeleton = ({ labeled }: FormInputSkeletonProps) => {
    return (
        <div className="flex w-full flex-col gap-y-2">
            {labeled && <div className="bg-black-5 h-5 w-1/4 rounded-full" />}
            <div className="bg-black-5 h-10 w-full rounded-lg" />
        </div>
    )
}
