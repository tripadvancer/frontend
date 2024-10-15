'use client'

import type { IRandomPlace } from '@/utils/types/place'

import { PlaceButtonRoute } from '@/components/features/maps/place-route-button/place-route-button'
import { FormButton } from '@/components/ui/form-button'
import { PinIcon16 } from '@/components/ui/icons'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'

export const WidgetRandomPlaceActions = (place: IRandomPlace) => {
    const { showOnMap } = useShowOnMap(place)

    return (
        <div className="flex gap-x-1">
            <FormButton type="stroke" size="small" icon={<PinIcon16 />} className="flex-none" onClick={showOnMap} />
            <PlaceButtonRoute lngLat={arrayToLngLat(place.coordinates)} />
        </div>
    )
}
