export const FormFileInputSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-2">
            <div className="h-10 w-full rounded-lg bg-black-5" />
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                <div className="size-16 rounded-lg bg-black-5" />
                <div className="size-16 rounded-lg bg-black-5" />
                <div className="size-16 rounded-lg bg-black-5" />
            </div>
        </div>
    )
}
