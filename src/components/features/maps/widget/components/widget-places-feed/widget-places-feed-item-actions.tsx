'use client'

import { useTranslations } from 'next-intl'

import type { IPlacePreview } from '@/utils/types/place'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16, PinIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSavePlace } from '@/utils/hooks/use-save-place'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'

export const WidgetPlacesFeedItemActions = (place: IPlacePreview) => {
    const t = useTranslations()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.coordinates)

    const { toggle } = useSavePlace(place.id)
    const { showOnMap } = useShowOnMap(place)

    return (
        <div className="flex gap-x-1">
            <FormButton type="stroke" size="small" icon={<PinIcon16 />} className="flex-none" onClick={showOnMap} />
            <FormButton
                type="stroke"
                size="small"
                icon={place.isSaved ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />}
                className="flex-none"
                onClick={toggle}
            />
            <FormButton type="stroke" size="small" onClick={() => dialog.open(<ChooseNavigationApp lngLat={lngLat} />)}>
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
