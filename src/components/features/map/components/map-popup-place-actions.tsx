'use client'

import type { IPlacePreview } from '@/utils/types/place'

import { PlaceButtonRoute } from '@/components/features/place-buttons/place-button-route'
import { PlaceButtonSave } from '@/components/features/place-buttons/place-button-save'

export const MapPopupPlaceActions = (place: IPlacePreview) => {
    return (
        <div className="flex gap-x-1">
            <PlaceButtonSave {...place} />
            <PlaceButtonRoute {...place} />
        </div>
    )
}
