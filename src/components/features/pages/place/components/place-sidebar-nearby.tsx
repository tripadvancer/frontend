import { Suspense } from 'react'

import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { Distance } from '@/components/ui/distance'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { getPlacesAround } from '@/services/places'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { GeoJsonPoint } from '@/utils/types/geo'

import { PlaceSidebarNearbySkeleton } from './place-sidebar-nearby-skeleton'

type PlaceSidebarNearbyProps = {
    id: number
    location: GeoJsonPoint
}

export const PlaceSidebarNearby = async ({ id, location }: PlaceSidebarNearbyProps) => {
    const t = await getTranslations()
    const lngLat = arrayToLngLat(location.coordinates)
    const placesAround = await getPlacesAround({
        lat: lngLat.lat,
        lng: lngLat.lng,
        radius: parseInt(process.env.NEXT_PUBLIC_NEARBY_PLACES_RADIUS || '30000', 10),
        categories: [],
    })

    // Filter out the current place
    const placesAroundFiltered = placesAround.filter(place => place.id !== id)

    if (placesAroundFiltered.length === 0) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('page.place.placeNearby')}</h3>
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
                                    className="aspect-square w-20 flex-none rounded-lg"
                                />
                                <div className="flex min-w-0 flex-col gap-y-1">
                                    <div className="line-clamp-3 break-words font-medium">{place.title}</div>
                                    <Distance distance={place.distance} className="text-small text-black-40" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Suspense>
        </section>
    )
}
