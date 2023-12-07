import { ActionControlSkeleton } from '@/components/action-control/action-control-skeleton'

export const ReviewSkeleton = () => {
    return (
        <div
            role="status"
            className="flex animate-pulse flex-col gap-y-5 border-b border-black-15 py-8 first:border-t last:border-b-0 last:pb-0"
        >
            <div className="flex items-start justify-between sm:items-center">
                <div className="flex flex-col gap-1">
                    <div className="h-3.5 w-20 rounded-full bg-black-5" />
                    <div className="flex flex-col gap-y-1 sm:flex-row sm:gap-x-2">
                        <div className="h-3.5 w-40 rounded-full bg-black-5" />
                        <div className="h-3.5 w-40 rounded-full bg-black-5" />
                    </div>
                </div>
                <ActionControlSkeleton />
            </div>

            <div className="flex flex-col gap-y-2">
                <div className="h-3.5 w-full rounded-full bg-black-5" />
                <div className="h-3.5 w-full rounded-full bg-black-5" />
                <div className="h-3.5 w-full rounded-full bg-black-5" />
                <div className="h-3.5 max-w-[360px] rounded-full bg-black-5" />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex aspect-square w-full items-center justify-center rounded bg-black-5">
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
