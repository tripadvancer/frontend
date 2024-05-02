'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { LngLat } from '@/utils/types/geo'

import { navigationProviders } from '@/utils/helpers/navigation'

type ChooseNavigateItemProps = {
    provider: string
    lngLat: LngLat
}

export const ChooseNavigateItem = ({ lngLat, provider }: ChooseNavigateItemProps) => {
    return (
        <Link
            href={navigationProviders[provider](lngLat)}
            className="link-black flex flex-1 flex-col gap-y-2"
            target="_blank"
        >
            <div className="flex-center aspect-square rounded-2xl bg-orange-10 text-small">
                <Image
                    src={`/images/navigators/${provider}.png`}
                    width={56}
                    height={56}
                    className="w-2/3 sm:w-14"
                    alt={provider}
                />
            </div>
            <div className="text-center font-medium capitalize">{provider}</div>
        </Link>
    )
}
