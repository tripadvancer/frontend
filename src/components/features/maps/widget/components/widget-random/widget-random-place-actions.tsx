'use client'

import { useTranslations } from 'next-intl'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { FormButton } from '@/components/ui/form-button'
import { PinIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'
import { IRandomPlace } from '@/utils/types/place'

export const WidgetRandomPlaceActions = (place: IRandomPlace) => {
    const t = useTranslations()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.coordinates)

    const { showOnMap } = useShowOnMap(place)

    return (
        <div className="flex gap-x-1">
            <FormButton type="stroke" size="small" icon={<PinIcon16 />} className="flex-none" onClick={showOnMap} />
            <FormButton
                type="stroke"
                size="small"
                onClick={() => dialog.open(<ChooseNavigationApp lngLat={lngLat} />)}
                className="flex-none"
            >
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
