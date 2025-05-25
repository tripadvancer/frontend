export const PlacesGridItemSkeleton = () => {
    return (
        <div className="flex flex-row gap-4">
            <div className="flex-none">
                <div className="flex-center aspect-square w-32 rounded-2xl bg-black-5 xl:w-40">
                    <svg
                        className="w-12 text-black-15 opacity-30"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-between">
                <div className="flex flex-col gap-1">
                    <div className="h-5 w-full rounded-full bg-black-5" />
                    <div className="h-5 w-3/5 rounded-full bg-black-5" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="h-4 w-2/3 rounded-full bg-black-5" />
                    <div className="h-4 w-1/2 rounded-full bg-black-5" />
                </div>
            </div>
        </div>
    )
}
