'use client'

import { IPlacePreview, IRandomPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { BookmarkFillIcon16, BookmarkIcon16 } from '@/components/ui/icons'
import { useSavePlace } from '@/utils/hooks/use-save-place'

export const PlaceButtonSave = (place: IPlacePreview | IRandomPlace) => {
    const { onSave } = useSavePlace(place.id)

    return (
        <FormButton
            type="stroke"
            size="small"
            icon={place.isSaved ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />}
            className="flex-none"
            onClick={onSave}
        />
    )
}
