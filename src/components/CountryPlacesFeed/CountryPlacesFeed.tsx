import type { IPlacePreview } from '@/types/place'

import { getScopedI18n } from '@/utils/i18n.server'

import { CountryPlace } from './CountryPlace'
import { CountryPlaceSkeleton } from './CountryPlaceSkeleton'

type CountryPlacesFeedProps = {
    places: IPlacePreview[]
}

export const CountryPlacesFeed = async ({ places }: CountryPlacesFeedProps) => {
    const t = await getScopedI18n('common.places')

    if (places.length === 0) {
        return <div className="text-black-40 text-center">{t('empty')}</div>
    }

    return (
        <div className="sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8 grid grid-cols-1 gap-4">
            <CountryPlaceSkeleton />
            <CountryPlaceSkeleton />
            <CountryPlaceSkeleton />
            {places.map((place, index) => (
                <CountryPlace key={index} {...place} />
            ))}
        </div>
    )
}
