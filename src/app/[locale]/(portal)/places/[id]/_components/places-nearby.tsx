import { Suspense } from 'react'

import type { IPlace } from '@/utils/types/place'

import { getPlacesNearby } from '@/services/places'
import { getI18n } from '@/utils/i18n/i18n.server'

import { PlaceNearby } from './place-nearby'
import { PlacesNearbySkeleton } from './places-nearby-skeleton'

type PlacesNearbyProps = IPlace

export const PlacesNearby = async ({ id }: PlacesNearbyProps) => {
    const t = await getI18n()
    const placesNearby = await getPlacesNearby(id.toString())

    if (placesNearby.length === 0) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('pages.place.place_nearby.title')}</h3>
            <Suspense fallback={<PlacesNearbySkeleton />}>
                <div className="flex flex-col gap-4">
                    {placesNearby.map(placeNearby => (
                        <PlaceNearby key={placeNearby.id} {...placeNearby} />
                    ))}
                </div>
            </Suspense>
        </section>
    )
}
