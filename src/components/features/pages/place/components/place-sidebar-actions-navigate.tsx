'use client'

import { NavigationIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { useDialog } from '@/components/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { GeoJsonPoint } from '@/utils/types/geo'

type PlaceSidebarActionsNavigateProps = {
    location: GeoJsonPoint
}

export const PlaceSidebarActionsNavigate = ({ location }: PlaceSidebarActionsNavigateProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(location.coordinates)

    const handleClick = () => {
        dialog.open(<ChooseNavigationApp lngLat={lngLat} />)
    }

    return (
        <div className="link flex items-center gap-x-2 align-top" onClick={handleClick}>
            <NavigationIcon />
            {t('common.action.place.navigate')}
        </div>
    )
}
