'use client'

import { FeedPlaces } from '@/components/features/feed-places/feed-places'
import { ShowAllLink } from '@/components/ui/show-all-link'
import { internalApi } from '@/redux/services/api-internal'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { getCountryByCode } from '@/services/countries'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LandingAroundPlaces = () => {
    const t = useI18n()

    const edgeGeo = internalApi.useGetEdgeGeoQuery()
    const lat = parseFloat(edgeGeo.data?.lat || '0')
    const lng = parseFloat(edgeGeo.data?.lng || '0')
    const radius = parseInt(process.env.NEXT_PUBLIC_AROUND_ME_RADIUS || '150000')
    const userCountryCode = edgeGeo.data?.countryCode

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
                <h2 className="h3 mb-4 text-center">{t('landing.around_places.title')}</h2>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('landing.around_places.text')}
                </p>
                <div className="flex flex-col gap-y-8">
                    <FeedPlaces places={places} />
                    {userCountryCode && (
                        <ShowAllLink href={`/countries/${getCountryByCode(userCountryCode)?.slug}`}>
                            {t('landing.around_places.button')}
                        </ShowAllLink>
                    )}
                </div>
            </section>
        )
    }

    return null
}
