type FormFileInputSkeletonProps = {
    labeled?: boolean
}

export const FormFileInputSkeleton = ({ labeled }: FormFileInputSkeletonProps) => {
    return (
        <div className="flex w-full flex-col gap-y-2">
            {labeled && <div className="h-5 w-1/4 rounded-full bg-black-5" />}
            <div className="h-10 w-full rounded-lg bg-black-5" />
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={`form-file-input-skeleton-${i}`}
                        className="flex-center aspect-square w-full rounded bg-black-5"
                    >
                        <svg
                            className="w-10 text-black-15 opacity-20"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                        >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    )
}
