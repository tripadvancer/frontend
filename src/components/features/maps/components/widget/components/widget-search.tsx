'use client'

export const WidgetSearch = () => {
    return (
        <div className="relative mr-8">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-100"
            >
                <path
                    fillRule="evenodd"
                    d="M2.78565 11.4075C5.16652 13.7884 9.02668 13.7884 11.4075 11.4075C13.7884 9.02668 13.7884 5.16652 11.4075 2.78565C9.02668 0.404782 5.16652 0.404782 2.78565 2.78565C0.404783 5.16652 0.404782 9.02668 2.78565 11.4075ZM4.22263 9.97056C5.80988 11.5578 8.38332 11.5578 9.97056 9.97056C11.5578 8.38332 11.5578 5.80988 9.97056 4.22263C8.38332 2.63539 5.80988 2.63539 4.22263 4.22263C2.63539 5.80988 2.63539 8.38332 4.22263 9.97056Z"
                />
                <path d="M10.6891 9.25207L15 13.563L13.563 15L9.25207 10.6891L10.6891 9.25207Z" />
            </svg>
            <input
                type="text"
                className="hover-animated h-10 w-full rounded-lg border border-blue-20 bg-white px-10 placeholder:text-black-40 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder="Find a place"
            />
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-1/2 -translate-y-1/2 transform text-black-15"
            >
                <path
                    fillRule="evenodd"
                    d="M8 9.48679L3.48679 14L2 12.5132L6.51321 8L2 3.48679L3.48679 2L8 6.51321L12.5132 2L14 3.48679L9.48679 8L14 12.5132L12.5132 14L8 9.48679Z"
                />
            </svg>
        </div>
    )
}
