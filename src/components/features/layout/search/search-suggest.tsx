'use client'

import { useTranslations } from 'next-intl'

import Image from 'next/image'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { getCountryByCode } from '@/services/countries'
import { internalAPI } from '@/utils/redux/services/internal/internal.api'
import { placesAroundAPI } from '@/utils/redux/services/places-around/places-around.api'

import { SearchItem } from './search-item'
import { SearchSuggestSkeleton } from './search-suggest-skeleton'

type SearchSuggestProps = {
    hideResults: () => void
}

export const SearchSuggest = ({ hideResults }: SearchSuggestProps) => {
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
        return <SearchSuggestSkeleton />
    }

    if (!userCountry) {
        return null
    }

    return (
        <div>
            <hr className="my-1" />
            <div className="mb-1 mt-4 pl-3 text-black-70">{t('component.search.suggestTitle')}</div>

            <SearchItem
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
                <SearchItem
                    key={`search-suggest-item-${place.id}`}
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
