import { Suspense } from 'react'

import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { getPlacesAround } from '@/services/places'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { getI18n } from '@/utils/i18n/i18n.server'

import { PlaceSidebarNearbySkeleton } from './place-sidebar-nearby-skeleton'

export const PlaceSidebarNearby = async ({ id, location }: IPlace) => {
    const t = await getI18n()
    const lngLat = arrayToLngLat(location.coordinates)
    const placesAround = await getPlacesAround(lngLat.lat, lngLat.lng, 30000, [])

    // Filter out the current place
    const placesAroundFiltered = placesAround.filter(place => place.id !== id)

    if (placesAroundFiltered.length === 0) {
        return null
    }

    const getDistance = (distance: number) => {
        return distance < 1000
            ? t('common.distance.m', { distance })
            : t('common.distance.km', { distance: (distance / 1000).toFixed(1) })
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('pages.place.place_nearby.title')}</h3>
            <Suspense fallback={<PlaceSidebarNearbySkeleton />}>
                <div className="flex flex-col gap-4">
                    {placesAroundFiltered.map(place => (
                        <Link
                            key={`place-nearby-${place.id}`}
                            href={`/places/${place.id}`}
                            className="flex-none text-black-100"
                        >
                            <div className="flex flex-row gap-4">
                                <PlacePreviewCover
                                    cover={place.cover}
                                    title={place.title}
                                    size={80}
                                    className="aspect-square w-20 rounded-lg"
                                />
                                <div className="flex flex-col gap-y-1">
                                    <div className="line-clamp-3 font-medium">{place.title}</div>
                                    <div className="text-small text-black-40">{getDistance(place.distance)}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Suspense>
        </section>
    )
}
