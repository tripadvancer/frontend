'use client'

import { useTranslations } from 'next-intl'

import { FeedPlaces } from '@/components/features/common/feed-places/feed-places'
import { ShowAllLink } from '@/components/ui/show-all-link'
import { internalApi } from '@/redux/services/internal.api'
import { placesAroundAPI } from '@/redux/services/places-around.api'
import { getCountryByCode } from '@/services/countries'

export const LandingAroundPlaces = () => {
    const t = useTranslations()

    const edgeGeo = internalApi.useGetEdgeGeoQuery()
    const lat = parseFloat(edgeGeo.data?.lat || '0')
    const lng = parseFloat(edgeGeo.data?.lng || '0')
    const radius = parseInt(process.env.NEXT_PUBLIC_AROUND_ME_RADIUS || '150000')
    const userCountryCode = edgeGeo.data?.countryCode
    const userCountryName = getCountryByCode(userCountryCode)?.name['en']

    const {
        data: places,
        isError,
        isSuccess,
    } = placesAroundAPI.useGetPlacesAroundQuery({ lat, lng, radius, categories: [] }, { skip: !edgeGeo.isSuccess })

    if (isError) {
        return null
    }

    if (isSuccess && places.length === 0) {
        return null
    }

    if (isSuccess && places.length > 0) {
        return (
            <section>
                <h3 className="h3 mb-4 text-center">{t('page.landing.aroundPlaces.title')}</h3>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('page.landing.aroundPlaces.text')}
                </p>
                <div className="flex flex-col gap-y-8">
                    <FeedPlaces places={places} />
                    {userCountryName && (
                        <ShowAllLink href={`/countries/${getCountryByCode(userCountryCode)?.slug}`}>
                            {t('page.landing.aroundPlaces.button', { country: userCountryName })}
                        </ShowAllLink>
                    )}
                </div>
            </section>
        )
    }

    return null
}
