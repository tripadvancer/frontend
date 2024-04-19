'use client'

import Image from 'next/image'

import type { LngLat } from '@/utils/types/geo'

import { navigateToLocation } from '@/utils/helpers/common'

type ChooseNavigateItemProps = {
    provider: string
    lngLat: LngLat
}

export const ChooseNavigateItem = ({ lngLat, provider }: ChooseNavigateItemProps) => {
    const handleClick = () => {
        navigateToLocation(lngLat, provider)
    }

    return (
        <div
            className="flex-center aspect-square flex-1 cursor-pointer rounded-lg bg-black-15 text-small"
            onClick={handleClick}
        >
            <Image
                src={`/images/navigators/${provider}.webp`}
                width={98}
                height={98}
                className="h-full w-full rounded-lg"
                alt={provider}
            />
        </div>
    )
}
