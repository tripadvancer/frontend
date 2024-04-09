'use client'

import Link from 'next/link'

import { DraftToHtml } from '@/components/ui/draft-to-html'
import { internalApi } from '@/redux/services/api-internal'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

import { LandingRandomPlaceActions } from './landing-random-place-actions'

export const LandingRandomPlace = () => {
    const t = useI18n()

    const edgeGeo = internalApi.useGetEdgeGeoQuery()
    const lat = parseFloat(edgeGeo.data?.lat || '0')
    const lng = parseFloat(edgeGeo.data?.lng || '0')
    const radius = parseInt(process.env.NEXT_PUBLIC_RANDOM_PLACE_RADIUS_FOR_LANDING || '10000')

    const {
        data: place,
        isError,
        isSuccess,
    } = placesAroundAPI.useGetRandomPlaceQuery({ lat, lng, radius, categories: [] }, { skip: !edgeGeo.isSuccess })

    if (isError) {
        return null
    }

    if (isSuccess && !place) {
        return null
    }

    if (isSuccess && place) {
        return (
            <section>
                <h2 className="mb-4 text-center text-h3-m sm:text-h3">{t('page.landing.random_place.title')}</h2>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('page.landing.random_place.description')}
                </p>

                <div className="flex flex-col gap-8 rounded-2xl bg-orange-10 px-4 py-8 sm:p-8 md:h-[480px] md:flex-row">
                    <div className="md:w-1/2 md:flex-none lg:flex-1">
                        <Link href={`/places/${place.id}`}>
                            <div
                                style={{
                                    backgroundImage: `url(${makeImageUrl(place.cover, ImageVariant.PUBLIC)})`,
                                }}
                                className="h-[416px] w-full rounded-lg bg-cover bg-center md:h-full"
                            />
                        </Link>
                    </div>
                    <div className="md:w-1/2 lg:w-80">
                        <div className="flex h-full flex-col justify-between gap-y-8">
                            <div className="flex flex-col gap-y-4 sm:gap-y-8">
                                <div className="border-b border-black-70 pb-4 text-h7-m sm:text-h7">
                                    <Link href={`/places/${place.id}`} className="link-black line-clamp-2 break-words">
                                        {place.title}
                                    </Link>
                                </div>
                                <div className="line-clamp-[13] break-words">
                                    <DraftToHtml draft={place.description} />
                                </div>
                            </div>
                            <LandingRandomPlaceActions {...place} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return null
}
