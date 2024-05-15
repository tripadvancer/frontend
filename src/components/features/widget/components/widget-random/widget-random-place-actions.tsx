'use client'

import type { IRandomPlace } from '@/utils/types/place'

import { ChooseNavigate } from '@/components/features/choose-navigate/choose-navigate'
import { FormButton } from '@/components/ui/form-button'
import { PinIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetRandomPlaceActions = (place: IRandomPlace) => {
    const t = useI18n()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.coordinates)

    const { showOnMap } = useShowOnMap(place)

    return (
        <div className="flex gap-x-1">
            <FormButton type="stroke" size="small" icon={<PinIcon16 />} className="flex-none" onClick={showOnMap} />
            <FormButton
                type="stroke"
                size="small"
                onClick={() => dialog.open(<ChooseNavigate lngLat={lngLat} />)}
                className="flex-none"
            >
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
