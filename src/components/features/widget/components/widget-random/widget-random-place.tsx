'use client'

import { useMap } from 'react-map-gl/maplibre'

import { useDebounceCallback } from 'usehooks-ts'

import Link from 'next/link'

import type { IRandomPlace } from '@/utils/types/place'

import { ChooseNavigate } from '@/components/features/choose-navigate/choose-navigate'
import { FormButton } from '@/components/ui/form-button'
import { PinIcon16 } from '@/components/ui/icons'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { useDialog } from '@/providers/dialog-provider'
import { setAppMode } from '@/redux/features/app-slice'
import { setMapPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { AppMode, ImageVariant } from '@/utils/enums'
import { arrayToLngLat, getMapFlyToOptions } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetRandomPlace = (place: IRandomPlace) => {
    const t = useI18n()
    const dialog = useDialog()
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(place.coordinates)

    const { map } = useMap()

    const debouncedFlyTo = useDebounceCallback(() => map?.flyTo(getMapFlyToOptions(lngLat)), 250)

    const handleShowOnMap = async () => {
        dispatch(setAppMode(AppMode.MAP))
        dispatch(setMapPlacePopupInfo(place))
        debouncedFlyTo()
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
                    <FormButton
                        type="stroke"
                        size="small"
                        onClick={() => dialog.open(<ChooseNavigate lngLat={lngLat} />)}
                        className="flex-none"
                    >
                        {t('common.action.route')}
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
