'use client'

import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { PinIcon16 } from '@/components/ui/icons'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { navigateToLocation } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetPlacesRandomPlace = (place: IPlacePreview) => {
    const t = useI18n()
    const dispatch = useAppDispatch()

    const handleShowOnMap = () => {
        dispatch(
            setMapViewState({
                latitude: place.coordinates[1],
                longitude: place.coordinates[0],
                zoom: parseInt(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM || '16', 10),
            }),
        )
        dispatch(setMapPlacePopupInfo(place))
    }

    return (
        <div className="flex flex-col gap-y-2">
            <Link href={`places/${place.id}`} className="link-black flex flex-col gap-y-2" target="_blank">
                <div className="w-full">
                    <PlacePreviewCover {...place} isCover />
                </div>
                <div className="break-words font-medium">{place.title}</div>
            </Link>
            <div className="flex items-center justify-between">
                <PlacePreviewRating {...place} />
                <div className="flex gap-x-1">
                    <FormButton
                        type="stroke"
                        size="small"
                        icon={<PinIcon16 />}
                        className="flex-none"
                        onClick={handleShowOnMap}
                    />
                    <FormButton
                        type="stroke"
                        size="small"
                        onClick={() => {
                            navigateToLocation(place.coordinates[1], place.coordinates[0])
                        }}
                    >
                        {t('common.action.route')}
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
