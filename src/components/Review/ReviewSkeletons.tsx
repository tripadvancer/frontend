export const ReviewSkeletons = () => {
    return Array.from({ length: 3 }).map((_, i) => (
        <div key={i} role="status" className="w-full animate-pulse border-t border-custom-black-15 py-8 last:pb-0">
            <div className="mb-5 flex flex-col gap-1">
                <div className="h-3.5 w-20 rounded-full bg-custom-black-5" />
                <div className="flex flex-row gap-x-2 text-xs phone:flex-col phone:gap-y-1">
                    <div className="h-3.5 w-40 rounded-full bg-custom-black-5" />
                    <div className="h-3.5 w-40 rounded-full bg-custom-black-5" />
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <div className="h-3.5 w-full rounded-full bg-custom-black-5" />
                <div className="h-3.5 w-full rounded-full bg-custom-black-5" />
                <div className="h-3.5 w-full rounded-full bg-custom-black-5" />
                <div className="h-3.5 max-w-[360px] rounded-full bg-custom-black-5" />
            </div>

            <div className="mt-5 grid grid-cols-9 gap-2 phone:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="sm:w-96 flex aspect-square w-full items-center justify-center rounded bg-custom-black-5"
                    >
                        <svg
                            className="w-10 text-custom-black-15 opacity-30"
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
    ))
}
