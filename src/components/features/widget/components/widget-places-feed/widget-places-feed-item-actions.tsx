'use client'

import type { IPlacePreview } from '@/utils/types/place'

import { PlaceButtonRoute } from '@/components/features/place-buttons/place-button-route'
import { PlaceButtonSave } from '@/components/features/place-buttons/place-button-save'
import { PlaceButtonShowOnMap } from '@/components/features/place-buttons/place-button-show-on-map'

export const WidgetPlacesFeedItemActions = (place: IPlacePreview) => {
    return (
        <div className="flex gap-x-1">
            <PlaceButtonShowOnMap {...place} />
            <PlaceButtonSave {...place} />
            <PlaceButtonRoute {...place} />
        </div>
    )
}
