'use client'

import { useTranslations } from 'next-intl'

import Image from 'next/image'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { internalAPI } from '@/redux/services/internal/internal.api'
import { placesAroundAPI } from '@/redux/services/places-around/places-around.api'
import { getCountryByCode } from '@/services/countries'

import { HeaderSearchItem } from './header-search-item'
import { HeaderSearchSuggestSkeleton } from './header-search-suggest-skeleton'

type HeaderSearchSuggestProps = {
    hideResults: () => void
}

export const HeaderSearchSuggest = ({ hideResults }: HeaderSearchSuggestProps) => {
    const t = useTranslations()
    const edgeGeo = internalAPI.useGetEdgeGeoQuery()

    const lat = parseFloat(edgeGeo.data?.lat || '0')
    const lng = parseFloat(edgeGeo.data?.lng || '0')
    const radius = parseInt(process.env.NEXT_PUBLIC_AROUND_ME_RADIUS || '150000')
    const userCountry = getCountryByCode(edgeGeo.data?.countryCode)

    const places = placesAroundAPI.useGetPlacesAroundQuery(
        { lat, lng, radius, categories: [] },
        { skip: !edgeGeo.isSuccess },
    )

    if (edgeGeo.isFetching || places.isFetching) {
        return <HeaderSearchSuggestSkeleton />
    }

    if (!userCountry) {
        return null
    }

    return (
        <div>
            <hr className="my-1" />
            <div className="mb-1 mt-4 pl-3 text-black-70">{t('component.search.suggestTitle')}</div>

            <HeaderSearchItem
                title={userCountry.name['en']}
                info={`Discover the beauty of ${userCountry.name['en']}`}
                icon={
                    <Image
                        src={`/images/countries/preview/${userCountry.code.toLowerCase()}.jpg`}
                        alt={userCountry.name['en']}
                        width={36}
                        height={36}
                        className="rounded-md"
                    />
                }
                href={`/countries/${userCountry.slug}`}
                hideResults={hideResults}
            />

            {places.data?.slice(0, 3).map(place => (
                <HeaderSearchItem
                    key={`header-search-suggest-item-${place.id}`}
                    title={place.title}
                    info={
                        place.distance
                            ? t('component.search.suggestAway', {
                                  distance: Math.round(place.distance / 1000),
                              })
                            : ''
                    }
                    icon={
                        <PlacePreviewCover
                            cover={place.cover}
                            title={place.title}
                            size={36}
                            className="aspect-square w-9 rounded-md"
                        />
                    }
                    href={`/places/${place.id}`}
                    hideResults={hideResults}
                />
            ))}
        </div>
    )
}
