'use client'

import { CloseIcon16, SearchIcon16 } from '@/components/ui/icons'

export const WidgetSearch = () => {
    return (
        <div className="relative mr-12 sm:mr-8">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-100">
                <SearchIcon16 />
            </div>
            <input
                type="text"
                className="hover-animated h-10 w-full rounded-lg border border-blue-20 bg-white px-10 placeholder:text-black-40 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder="Find a place"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 transform text-black-15">
                <CloseIcon16 />
            </div>
        </div>
    )
}
