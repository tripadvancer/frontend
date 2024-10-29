'use client'

import { useTranslations } from 'next-intl'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { RouteIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { IPlace } from '@/utils/types/place'

export const PlaceSidebarActionsNavigate = ({ place }: { place: IPlace }) => {
    const t = useTranslations()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.location.coordinates)

    const handleClick = () => {
        dialog.open(<ChooseNavigationApp lngLat={lngLat} />)
    }

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={handleClick}>
            <RouteIcon24 />
            {t('common.action.place.navigate')}
        </div>
    )
}
