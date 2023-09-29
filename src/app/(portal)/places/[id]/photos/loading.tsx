export default function Loading() {
    const repetitions = 4

    return (
        <div role="status" className="grid animate-pulse grid-cols-4 gap-2 phone:grid-cols-2">
            {Array(repetitions)
                .fill(null)
                .map((_, index) => (
                    <div key={index} className="relative h-full w-full rounded-lg bg-custom-black-15 pt-[100%]">
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 18"
                            fill="currentColor"
                            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white"
                        >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                ))}
        </div>
    )
}
