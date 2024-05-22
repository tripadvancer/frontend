'use client'

import type { IPlace, IPlaceMeta } from '@/utils/types/place'

import { ChooseNavigate } from '@/components/features/choose-navigate/choose-navigate'
import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16, MoreIcon16, PinIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSavePlace } from '@/utils/hooks/use-save-place'
import { useI18n } from '@/utils/i18n/i18n.client'

// prettier-ignore
type MapPopupPlaceActionsProps = Pick<IPlace, 'id'> & Pick<IPlaceMeta, 'isSaved'> & {
    coordinates: number[]
}

export const MapPopupPlaceActions = (place: MapPopupPlaceActionsProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.coordinates)

    const { toggle } = useSavePlace(place.id)

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={place.isSaved ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />}
                className="flex-none"
                onClick={toggle}
            />
            <FormButton type="stroke" size="small" onClick={() => dialog.open(<ChooseNavigate lngLat={lngLat} />)}>
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
