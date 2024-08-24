export const UserPlacesSkeleton = () => {
    return (
        <div className="grid grid-cols-2 gap-4 last:mb-0 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div role="status" key={`user-place-skeleton-${i}`} className="animate-pulse">
                    <div className="flex-center mb-2 aspect-square w-full rounded-lg bg-black-5">
                        <svg
                            className="w-10 text-black-15 opacity-30"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                        >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="h-3.5 w-full rounded-full bg-black-5" />
                        <div className="h-3.5 w-2/3 rounded-full bg-black-5" />
                    </div>
                </div>
            ))}
        </div>
    )
}
