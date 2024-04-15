'use client'

import { array } from 'prop-types'

import Link from 'next/link'

import type { IRandomPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { PinIcon16 } from '@/components/ui/icons'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { closeWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { ImageVariant } from '@/utils/enums'
import { navigateToLocation } from '@/utils/helpers/common'
import { arrayToLngLat, getFlyToViewState } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetPlacesRandomPlace = (place: IRandomPlace) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(place.coordinates)

    const handleShowOnMap = () => {
        const viewState = getFlyToViewState(lngLat)
        dispatch(setMapViewState(viewState))
        dispatch(setMapPlacePopupInfo(place))
        dispatch(closeWidget())
    }

    return (
        <div className="flex flex-col gap-y-2">
            <Link href={`places/${place.id}`} className="link-black flex flex-col gap-y-2" target="_blank">
                <div className="w-full">
                    <PlacePreviewCover
                        cover={place.cover}
                        title={place.title}
                        imageVariant={ImageVariant.PUBLIC}
                        size={80}
                        className="aspect-video w-full rounded-lg"
                    />
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
                    <FormButton type="stroke" size="small" onClick={() => navigateToLocation(lngLat)}>
                        {t('common.action.route')}
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
