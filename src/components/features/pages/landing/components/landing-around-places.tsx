'use client'

import { useTranslations } from 'next-intl'

import { PlacesGrid } from '@/components/features/common/places-grid/places-grid'
import { ShowAllLink } from '@/components/ui/show-all-link'
import { getCountryByCode } from '@/services/countries'
import { internalAPI } from '@/utils/redux/services/internal/internal.api'
import { placesAroundAPI } from '@/utils/redux/services/places-around/places-around.api'

export const LandingAroundPlaces = () => {
    const t = useTranslations()

    const edgeGeo = internalAPI.useGetEdgeGeoQuery()
    const lat = parseFloat(edgeGeo.data?.lat || '0')
    const lng = parseFloat(edgeGeo.data?.lng || '0')
    const radius = parseInt(process.env.NEXT_PUBLIC_AROUND_ME_RADIUS || '150000')
    const userCountryCode = edgeGeo.data?.countryCode
    const userCountryName = getCountryByCode(userCountryCode)?.name['en']

    const { data, isError, isSuccess } = placesAroundAPI.useGetPlacesAroundQuery(
        { lat, lng, radius, categories: [], limit: 5 },
        { skip: !edgeGeo.isSuccess },
    )

    if (isError) {
        return null
    }

    if (isSuccess && data.length === 0) {
        return null
    }

    if (isSuccess && data.length > 0) {
        return (
            <section>
                <h3 className="h3 mb-4 text-center">{t('page.landing.aroundPlaces.title')}</h3>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('page.landing.aroundPlaces.text')}
                </p>
                <div className="flex flex-col gap-y-8">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:gap-8">
                        <PlacesGrid
                            places={data.map(item => ({
                                id: item.id,
                                title: item.title,
                                cover: item.cover,
                                distance: item.distance,
                            }))}
                        />
                    </div>
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
