'use client'

import type { IPlace } from '@/utils/types/place'

import { RouteIcon24 } from '@/components/ui/icons'
import { navigateToLocation } from '@/utils/helpers/common'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsNavigate = ({ place }: { place: IPlace }) => {
    const t = useI18n()
    const lngLat = arrayToLngLat(place.location.coordinates)

    return (
        <div className="link inline-flex items-center gap-x-2 align-top" onClick={() => navigateToLocation(lngLat)}>
            <RouteIcon24 />
            {t('place.actions.navigate')}
        </div>
    )
}
