'use client'

import type { IPlace, IPlaceMeta } from '@/utils/types/place'

import { ChooseNavigate } from '@/components/features/choose-navigate/choose-navigate'
import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { closeMapPopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useFavorite } from '@/utils/hooks/use-favorite'
import { useI18n } from '@/utils/i18n/i18n.client'

type PlacePreviewActionsProps = Pick<IPlace, 'id'> &
    Pick<IPlaceMeta, 'isFavorite'> & {
        coordinates: number[]
    }

export const PlacePreviewActions = (place: PlacePreviewActionsProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const dispatch = useAppDispatch()
    const favorite = useFavorite(place.id, place.isFavorite, () => dispatch(closeMapPopups()))
    const lngLat = arrayToLngLat(place.coordinates)

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={place.isFavorite ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />}
                className="flex-none"
                isLoading={favorite.isLoading}
                onClick={favorite.toggle}
            />
            <FormButton type="stroke" size="small" onClick={() => dialog.open(<ChooseNavigate lngLat={lngLat} />)}>
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
