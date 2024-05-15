'use client'

import type { IRandomPlace } from '@/utils/types/place'

import { PlaceButtonRoute } from '@/components/features/place-buttons/place-button-route'
import { PlaceButtonShowOnMap } from '@/components/features/place-buttons/place-button-show-on-map'

export const WidgetRandomPlaceActions = (place: IRandomPlace) => {
    return (
        <div className="flex gap-x-1">
            <PlaceButtonShowOnMap {...place} />
            <PlaceButtonRoute {...place} />
        </div>
    )
}
