'use client'

import { BookmarkIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSavePlace } from '@/utils/hooks/use-save-place'

type MapPopupPlaceActionsProps = {
    id: number
    isSaved: boolean
    coordinates: number[]
}

export const MapPopupPlaceActions = (place: MapPopupPlaceActionsProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.coordinates)

    const { savePlace } = useSavePlace(place.id)

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={place.isSaved ? <BookmarkIcon size={16} fill="currentColor" /> : <BookmarkIcon size={16} />}
                className="flex-none"
                onClick={savePlace}
            />
            <FormButton type="stroke" size="small" onClick={() => dialog.open(<ChooseNavigationApp lngLat={lngLat} />)}>
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
