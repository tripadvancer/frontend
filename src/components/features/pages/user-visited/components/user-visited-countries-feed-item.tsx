'use client'

import { useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'

type UserMapCountriesFeedItemProps = {
    name: string
    count: number
    places: any
}

export const UserVisitedCountriesFeedItem = ({ name, count, places }: UserMapCountriesFeedItemProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className="flex flex-col gap-4">
            <div
                className="flex cursor-pointer items-center justify-between rounded-2xl bg-orange-10 p-4"
                onClick={handleToggle}
            >
                <div className="flex items-center gap-x-4">
                    <div className="h6">{name}</div>
                    <div className="h6 text-orange-80">{count}</div>
                </div>

                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>

            {isOpen && <PlacesFeed places={places} paginationLimit={10} />}
        </div>
    )
}
