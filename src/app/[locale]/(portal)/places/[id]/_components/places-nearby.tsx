import { Suspense } from 'react'

import { getPlacesNearby } from '@/services/places'
import { getI18n } from '@/utils/i18n/i18n.server'

import { PlaceNearby } from './place-nearby'
import { PlacesNearbySkeleton } from './places-nearby-skeleton'

type PlacesNearbyProps = {
    placeId: string
}

export const PlacesNearby = async ({ placeId }: PlacesNearbyProps) => {
    const t = await getI18n()
    const placesNearby = await getPlacesNearby(placeId)

    if (placesNearby.length === 0) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('pages.place.place_nearby.title')}</h3>
            <Suspense fallback={<PlacesNearbySkeleton />}>
                <div className="flex flex-col gap-4">
                    {placesNearby.map(place => (
                        <PlaceNearby key={place.id} {...place} />
                    ))}
                </div>
            </Suspense>
        </section>
    )
}
