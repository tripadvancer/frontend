import type { ILocationPreview, IPlace, IPlaceMeta } from '@/utils/types/place'

// prettier-ignore
export type IPlacePopupInfo = Pick<IPlace, 'id' | 'title' | 'cover' | 'avgRating' | 'reviewsCount'> & Pick<IPlaceMeta, 'isSaved'> & {
    coordinates: number[]
}

export type ILocationPopupInfo = ILocationPreview
