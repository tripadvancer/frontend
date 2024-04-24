'use client'

import type { IPlace } from '@/utils/types/place'

import { ChooseNavigate } from '@/components/features/choose-navigate/choose-navigate'
import { RouteIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsNavigate = ({ place }: { place: IPlace }) => {
    const t = useI18n()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.location.coordinates)

    const handleClick = () => {
        dialog.open(<ChooseNavigate lngLat={lngLat} />)
    }

    return (
        <div className="link inline-flex items-center gap-x-2 align-top" onClick={handleClick}>
            <RouteIcon24 />
            {t('place.actions.navigate')}
        </div>
    )
}
