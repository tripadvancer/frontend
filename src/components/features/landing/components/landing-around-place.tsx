'use client'

import { useRouter } from 'next/navigation'

import { PlacesFeed } from '@/components/features/places-feed/places-feed'
import { FormButton } from '@/components/ui/form-button'
import { internalApi } from '@/redux/services/api-internal'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { getCountryByCode } from '@/services/countries'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LandingAroundPlace = () => {
    const t = useI18n()
    const router = useRouter()

    const edgeGeo = internalApi.useGetEdgeGeoQuery()
    const lat = parseFloat(edgeGeo.data?.lat || '0')
    const lng = parseFloat(edgeGeo.data?.lng || '0')
    const radius = parseInt(process.env.NEXT_PUBLIC_RANDOM_PLACE_RADIUS_FOR_LANDING || '10000')
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
                <h2 className="h3 mb-4 text-center">{t('page.landing.random_place.title')}</h2>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('page.landing.random_place.description')}
                </p>
                <div className="flex flex-col gap-y-8">
                    <PlacesFeed places={places} />
                    {userCountryCode && (
                        <FormButton
                            type="stroke"
                            shape="rounded"
                            onClick={() => router.push(`/countries/${getCountryByCode(userCountryCode)?.slug}`)}
                        >
                            {t('common.action.view_all_places')}
                        </FormButton>
                    )}
                </div>
            </section>
        )
    }

    return null
}
